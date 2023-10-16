import './mes.scss';
import FooterChat from './FooterChat';
import { Row, Col, Drawer } from 'antd';
import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    BsTelephoneFill, BsFillCameraVideoFill, BsSearch,
    BsThreeDots, BsFacebook
} from 'react-icons/bs';
import { MdAttachFile, MdNotifications } from 'react-icons/md';
import AvatarCustom from '../Avatar';
import Message from './ItemMessenger';
import { useDispatch, useSelector } from 'react-redux';
import { getMessage } from '../../redux/action/message';
import { handleTimeChat, pic } from '../../utils/format';
import { modalCall } from '../../redux/features/callSlice';
import { socket, peer } from '../../services/socketClient';
import DotLoading from '../Loading/dot';
const anh = 'https://icon-library.com/images/avatar-png-icon/avatar-png-icon-15.jpg';
//{ own: true, l: 90 }, { own: false, l: 123 }, { own: true, l: 400 }
const data = [{ own: true, l: 123 }, { own: false, l: 213 }];

const getInfo = (user) => {
    const { avatar, name, email } = user;
    return { avatar, name, email };
}

const DisplayChat = ({ id }) => {
    const dispatch = useDispatch()
    const { user: { dark_mode, account }, message, online } = useSelector(state => state);
    const [openDraw, setOpenDraw] = useState(false);
    const [recipient, setRecipient] = useState(null);
    const [loading, setLoading] = useState(false);
    const toggleDraw = (params) => {
        setOpenDraw(params);
    };

    const scrollBottom = useCallback((time) => {
        setTimeout(() => {
            const lastMessage = document.getElementById('lastMessage');
            if (lastMessage) {
                lastMessage.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
        }, time || 0);
    }, [id])

    useEffect(() => {
        const getMessagesData = async () => {
            if (message.data.every(item => item._id !== id) && id) {
                await dispatch(getMessage({ id }));

            }
        }
        getMessagesData();
        scrollBottom(50);
    }, [id, message.data]);
    useEffect(() => {
        if (message.users.length > 0) {
            const foundUser = message.users.find((user) => user._id === id);
            if (foundUser) {
                const isOnline = online.includes(id);
                const updatedUser = { ...foundUser, online: isOnline };
                setRecipient(updatedUser);
            }
        }
    }, [id, message.users, online]);

    const handleCall = (video) => {

        const dataLocal = {
            sender: account._id,
            recipient: id,
            video: true,
            camera1: video,
            camera2: video,
            ...getInfo(recipient)
        }
        const dataSend = {
            sender: account._id,
            recipient: id,
            video: true,
            camera1: video,
            camera2: video,
            ...getInfo(account)
        }
        if (peer.open) dataSend.peerId = peer._id
        dispatch(modalCall({ info: dataLocal }));
        socket.emit('callUser', dataSend)
    }

    return (
        <>
            {id
                ? <div className='text-mode h-screen overflow-hidden relative flex flex-col' >
                    <Row className='min-h-[60px] px-4 bb' justify={'space-between'} align={'middle'}>
                        <Col xs={10} className='flex items-center h-full gap-x-2'>
                            <span className='p-1'>
                                <AvatarCustom size={40} activeUser={recipient?.online} />
                            </span>
                            <div className='xs:hidden md:flex flex-col  p-1 justify-start ' >
                                <div className='text-mode font-medium text-base '>{recipient?.name} {recipient?._id}</div>
                                <div className={` ${recipient?.online === true ? "text-mode text-xs font-normal" : "hidden"}`}>Đang hoạt động</div>
                            </div>
                        </Col>
                        <Col xs={10} className='flex justify-end items-center gap-x-4' >
                            <div onClick={() => handleCall(false)}> <BsTelephoneFill className='text-iconColor text-lg' /></div>
                            <div onClick={() => handleCall(true)}><BsFillCameraVideoFill className='text-iconColor text-lg' /></div>
                            <div><BsSearch className='text-iconColor text-lg' /></div>
                            <div onClick={() => toggleDraw(true)}><BsThreeDots className='text-iconColor text-lg' /></div>
                        </Col>
                    </Row>
                    <div
                        className='overflow-y-auto flex-grow p-4 w-full flex flex-col gap-4 min-h-[60vh]'
                    >

                        {message.data && message.data.map((item, i) => {
                            if (item._id === id) {
                                return item.messages.map((mes, index) => (
                                    <div key={uuidv4()} id={index === +(item.messages.length - 1) ? 'lastMessage' : undefined}>
                                        <Message own={mes.sender === account._id} data={mes} />
                                    </div>
                                ))
                            }
                        })}
                        {loading && <DotLoading />}
                    </div>

                    <div className='max-h-[40%] bt' >
                        <FooterChat id={id} account={account} setLoading={setLoading} scrollBottom={scrollBottom} />
                    </div>
                </div>
                :
                <div className='h-full w-full flex justify-center items-center'><img src={pic} className='max-w-[10rem]' /></div>}

            <Drawer
                openDraw
                onClose={() => toggleDraw(false)}
                open={openDraw}
                className={`${dark_mode}-mode`}
            >
                <div className='drawer_setting_chat mt-4'>
                    <Row className='' justify={'center'} align={"middle"} gutter={[0, 24]}>
                        <Col> <AvatarCustom size={80} activeUser={true} /></Col>
                        <Col xs={24} className='text-center text-2xl text font-bold'> Lee Gia HUy</Col>
                        <Col xs={24} className='text-base font-bold flex-center gap-3'>
                            <span className=' flex-col flex-center'>
                                <BsFacebook className='icon_mode' color='black' />
                                <p className='text'>Profile</p>
                            </span>
                            <span className=' flex-col flex-center'>
                                <MdNotifications className='icon_mode' />
                                <p className='text'>Mute</p>
                            </span>
                        </Col>
                    </Row>
                </div>
            </Drawer>

        </>
    )
}

export default memo(DisplayChat)