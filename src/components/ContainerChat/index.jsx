import './mes.scss';
import FooterChat from './footerChat';
import { Row, Col, Drawer } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
    BsTelephoneFill, BsFillCameraVideoFill, BsSearch,
    BsThreeDots, BsFacebook
} from 'react-icons/bs';
import { MdAttachFile, MdNotifications } from 'react-icons/md';
import AvatarCustom from '../Avatar';
import Message from './ItemMessenger';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getMessage } from '../../redux/action/message';
import { handleTimeChat } from '../../utils/format';
const anh = 'https://icon-library.com/images/avatar-png-icon/avatar-png-icon-15.jpg';
//{ own: true, l: 90 }, { own: false, l: 123 }, { own: true, l: 400 }
const data = [{ own: true, l: 123 }, { own: false, l: 213 }];



const DisplayChat = ({ id }) => {
    const dispatch = useDispatch()
    const { user: { dark_mode, account }, message } = useSelector(state => state);
    const [openDraw, setOpenDraw] = useState(false);
    const refDisplay = useRef()
    const toggleDraw = (params) => {
        setOpenDraw(params);
    };

    const scrollBottom = () => {
        if (refDisplay.current) {
            refDisplay.current.scrollIntoView({ behavior: "smooth" });
        }
    }

    useEffect(() => {

        const getMessagesData = async () => {
            if (message.data.every(item => item._id !== id) && id) {
                await dispatch(getMessage({ id }));
            }
        }
        getMessagesData();
        scrollBottom()
    }, [id, message])

    return (
        <>
            <div className='text-mode h-screen relative flex flex-col' >
                <Row className='min-h-[60px] px-4 bb' justify={'space-between'} align={'middle'}>
                    <Col xs={10} className='flex items-center h-full gap-x-2'>
                        <span className='p-1'>
                            <AvatarCustom size={40} activeUser={true} />
                        </span>
                        <div className='xs:hidden md:flex flex-col  p-1 justify-start ' >
                            <div className='text-mode font-medium text-base '>{account?.name}</div>
                            <div className='text-mode text-xs font-normal '>Hoat dong 24 phut truoc</div>
                        </div>
                    </Col>
                    <Col xs={10} className='flex justify-end items-center gap-x-4' >
                        <div><BsTelephoneFill className='text-iconColor text-lg' /></div>
                        <div><BsFillCameraVideoFill className='text-iconColor text-lg' /></div>
                        <div><BsSearch className='text-iconColor text-lg' /></div>
                        <div onClick={() => toggleDraw(true)}><BsThreeDots className='text-iconColor text-lg' /></div>
                    </Col>
                </Row>
                <div className='overflow-y-auto flex-grow p-4 w-full flex flex-col gap-4 min-h-[70vh] ' >
                    {message.data && message.data.map((item, i) => {
                        if (item._id === id) {
                            return item.messages.map(mes => (
                                <div key={uuidv4()} >
                                    <div className='text-center'> {handleTimeChat(mes?.updatedAt)}</div>
                                    <Message own={mes.sender === account._id} text={mes.text} />
                                </div>
                            ))
                        }
                    })}
                    <div ref={refDisplay} />
                </div>
                <div className='max-h-[16%] relative bt' >
                    <FooterChat id={id} account={account} />
                </div>
            </div>
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

export default DisplayChat