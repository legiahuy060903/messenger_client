import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import AvatarCustom from '../Avatar';
import { Modal, notification } from "antd";
import { socket, peer } from '../../services/socketClient';
import { useDispatch, useSelector } from 'react-redux'
import { modalCall } from '../../redux/features/callSlice';
import { BsFillCameraVideoFill, BsFillCameraVideoOffFill, BsFillMicFill, BsMicMuteFill } from 'react-icons/bs';
import { PiPhoneDisconnectFill } from 'react-icons/pi';
import { AiOutlineTeam, AiOutlineClose } from 'react-icons/ai';
import { formatByTime, playStream, openStream, playAudio, pauseAudio } from '../../utils/format';
import { addMessage } from '../../redux/action/message';
import tdk from "../../assets/tayduky.mp3";

const ModalCall = () => {

    const dispatch = useDispatch();
    const youVideo = useRef();
    const otherVideo = useRef();
    const [api, contextHolder] = notification.useNotification();
    const { call: { info, isCall, idPeer }, user: { account } } = useSelector(s => s);
    const [total, setTotal] = useState(0);
    const [answer, setAnswer] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const [tracks, setTracks] = useState(null);
    const [newCall, setNewCall] = useState(null);
    const [isMic, setIsMic] = useState(true)
    // Set Time
    const intervalFunction = useMemo(() => {
        return () => {
            setTotal((prevTotal) => prevTotal + 1);
        };
    }, [total]);

    useEffect(() => {
        const interval = setInterval(intervalFunction, 1000);
        return () => clearInterval(interval);
    }, [intervalFunction]);

    useEffect(() => {
        let newAudio = new Audio(tdk)
        if (answer) {
            pauseAudio(newAudio)
        } else {
            playAudio(newAudio)
        }
        return () => pauseAudio(newAudio)
    }, [answer])


    const handActionCall = (action) => {
        const url = window.location.href;
        const id = url.substring(url.lastIndexOf('/') + 1);
        if (action === "camera") {
            if (id) {
                let clone = { ...info, camera1: !info.camera1 };
                dispatch(modalCall({ info: clone }));
                const data = { recipient: id, camera2: !info.camera1 };
                socket.emit("camera", data)
            }
        } else {
            if (id) {
                setIsMic(!isMic);
                mediaStream.getAudioTracks()[0].enabled = !isMic;
            }
        }
    }


    const addCallMessage = useCallback((call, times, disconnect) => {
        if (call.recipient !== account._id || disconnect) {
            const msg = {
                sender: call.sender,
                recipient: call.recipient,
                text: '',
                media: [],
                call: { video: call.video, times },
                createdAt: new Date().toISOString()
            }
            dispatch(addMessage({ data: msg, method: "send" }))
        }
    }, []);
    const handleEndCall = () => {
        tracks && tracks.forEach(track => track.stop())
        if (newCall) newCall.close();
        let times = answer ? total : 0;
        socket.emit('endCall', { ...info, times });
        addCallMessage(info, times)
        dispatch(modalCall({ info: null }));
    };

    useEffect(() => {
        if (answer) {
            setTotal(0)
        } else {
            const timer = setTimeout(() => {
                socket.emit('endCall', { ...info, times: 0 })
                addCallMessage(info, 0)
                dispatch(modalCall({ info: null }));
            }, 15000)
            return () => clearTimeout(timer)
        }
    }, [dispatch, answer, info, socket, addCallMessage]);

    // Answer Call
    const handleAnswer = () => {
        setAnswer(true)
        setNewCall(newCall)
        openStream(info.video).then(stream => {
            playStream(youVideo.current, stream);
            setMediaStream(stream)
            const track = stream.getTracks();
            setTracks(track);
            const newCall = peer.call(info.peerId, stream);
            newCall.on('stream', function (remoteStream) {
                playStream(otherVideo.current, remoteStream)
            });
            dispatch(modalCall({ isCall: false }))
        })
    };

    useEffect(() => {
        socket.on("updateActionCall", (data) => {
            let clone = { ...info, camera2: data };
            dispatch(modalCall({ info: clone }));
        })
    }, [socket, dispatch, info])
    useEffect(() => {
        peer.on('call', newCall => {
            openStream(info.video).then(stream => {
                setMediaStream(stream);
                if (youVideo.current) {
                    playStream(youVideo.current, stream)
                }
                const track = stream.getTracks();
                setTracks(track)
                newCall.answer(stream);
                newCall.on('stream', function (remoteStream) {
                    if (otherVideo.current) {
                        playStream(otherVideo.current, remoteStream)
                    }
                });
                setAnswer(true)
                setNewCall(newCall)
            })
        })
        return () => peer.removeListener('call')
    }, [peer, info.video, setMediaStream, setTracks, youVideo, playStream])

    // Disconnect
    useEffect(() => {
        socket.on('callerDisconnect', () => {
            tracks && tracks.forEach(track => track.stop())
            if (newCall) newCall.close()
            let times = answer ? total : 0;
            addCallMessage(info, times, true);
            dispatch(modalCall({ info: null }));
        })
        return () => socket.off('callerDisconnect');
    }, [socket, tracks, dispatch, info, addCallMessage, answer, total, newCall])

    useEffect(() => {
        socket.on('endCallToClient', data => {
            tracks && tracks.forEach(track => track.stop());
            if (newCall) newCall.close();
            addCallMessage(data, data.times)
            dispatch(modalCall({ info: null }));
        })
        return () => socket.off('endCallToClient')
    }, [socket, dispatch, tracks, addCallMessage, newCall])
    return (
        <>
            {contextHolder}
            <div className={`${answer || (info && !isCall) ? "flex-center" : "hidden"} modal_call fixed w-[70vw] h-[90vh] top-1/2 left-1/2 z-20 transform-center 
            text-mode  flex-col overflow-hidden`}>
                <div className='w-full flex-grow flex-center flex-col '>

                    <div className={answer && info.video ? "w-full flex gap-2 p-2" : "hidden"} >
                        <span className='w-2/12 text-center font-bold text-[#888]'>{formatByTime(total)}</span>

                        <video ref={youVideo} className={`w-8/12 rounded-sm ${!info.camera1 ? "hidden" : "flex-center"}`} playsInline muted />
                        <div className={`w-8/12  flex-col gap-4 ${info.camera1 ? "hidden" : "flex-center"}`}><div>
                            <AvatarCustom size={180} src={account.avatar} /></div>
                            <h2 className='font-medium text-xl '>{account.name}</h2>
                        </div>



                        <video ref={otherVideo} className={info.camera2 ? "w-2/12 rounded-sm self-start" : "hidden"} playsInline />
                        <div className={!info.camera2 ? 'w-2/12 rounded-sm self-start flex-center flex-col gap-4' : "hidden"} >
                            <div> <AvatarCustom size={80} src={info.avatar} /></div>
                            <h2 className='font-medium text-xl '>{info.name}</h2>
                        </div>



                    </div>



                    {(info && !info.video) &&
                        <div className='flex gap-4 flex-col items-center'>
                            <div> <AvatarCustom size={100} src={info.avatar} /></div>
                            <h2 className='font-medium text-xl '>{info.name}</h2>
                            {
                                answer
                                    ? <span className=' font-bold text-[#888]'>{formatByTime(total)}</span>
                                    : <p>Đang liên hệ</p>
                            }
                        </div>
                    }
                    {(info && info.video && !answer) &&
                        <div className='flex gap-4 flex-col items-center'>
                            <div> <AvatarCustom size={100} src={info.avatar} /></div>
                            <h2 className='font-medium text-xl '>{info.name}</h2>
                            <p>Đang liên hệ</p>

                        </div>
                    }

                </div>


                <footer className='w-[90%] h-12 flex justify-between items-start'>
                    <div className='flex items-center gap-2'>
                        <span className='bg-[#515151] py-2 px-3 rounded-lg text-white' onClick={() => handActionCall("camera")}>
                            {
                                info?.camera1 ? <BsFillCameraVideoFill size={16} />
                                    : <BsFillCameraVideoOffFill size={16} />
                            }
                        </span>
                        <span className='bg-[#515151] py-2 px-3 rounded-lg' onClick={() => handActionCall("mic")} >
                            {
                                isMic ? <BsFillMicFill size={16} />
                                    : <BsMicMuteFill size={16} />
                            }
                        </span>
                    </div>

                    <div className='flex items-center gap-2'>
                        <span className='bg-[#515151] py-2 px-3 rounded-lg text-white'><AiOutlineTeam size={16} /></span>
                        <span className='text-white py-2 px-3 rounded-lg bg-red-500' onClick={handleEndCall} ><PiPhoneDisconnectFill size={16} /></span>
                    </div>
                </footer>
            </div >

            <Modal width={350} centered open={isCall} className='modal_call ' footer={null} closable={false}>
                <div className='flex-center flex-col gap-5 h-[50vh] '>
                    <AvatarCustom size={60} />
                    <h3 className='text-xl text-center'>Thỏ con xinh xắn đang gọi cho bạn</h3>
                    <h6 className='text-neutral-500'>Cuộc gọi sẽ bắt đầu khi bạn chấp nhận</h6>
                    <div className='flex justify-evenly w-full'>
                        <div className='flex-center flex-col gap-2' onClick={handleEndCall}>
                            <div className='bg-red-500 text-white w-12 h-12 rounded-full flex-center'><AiOutlineClose size={20} /></div>
                            <span>Từ chối</span>
                        </div>
                        <div className='flex-center flex-col gap-2' onClick={handleAnswer}>
                            <div className='bg-green-500 text-white w-12 h-12 rounded-full flex-center'><BsFillCameraVideoFill size={20} /></div>
                            <span>Chấp nhận</span>
                        </div>

                    </div>
                </div>
            </Modal>
        </>
    )
}

export default ModalCall