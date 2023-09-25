import './mes.scss';
import { Row, Col, Button, Dropdown } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import DataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
    BsTelephoneFill, BsFillCameraVideoFill, BsSearch,
    BsThreeDots, BsFillPlusCircleFill, BsFillEmojiSmileFill, BsFillMicFill
} from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import { BiSolidLike } from 'react-icons/bi';
import { MdAttachFile } from 'react-icons/md';
import { RiFile4Fill } from 'react-icons/ri';
import AvatarCustom from '../Avatar';
import Message from './ItemMessenger';
import useOnClickOutside from '../../hook/useOnClickOutside';
const anh = 'https://icon-library.com/images/avatar-png-icon/avatar-png-icon-15.jpg';
const data = [{ own: true, l: 123 }, { own: false, l: 213 }, { own: true, l: 90 }, { own: false, l: 123 }, { own: true, l: 400 }];
var accept = ".jpg,.jpeg,.png,.json,.video,.text,.pdf,.xlsx,.doc";
const Messenger = () => {
    const refModalEmoji = useRef();
    const refFile = useRef();
    const [showEmoji, setShowEmoji] = useState(false);
    const [inputFile, setInputFile] = useState();
    useOnClickOutside(refModalEmoji, () => togglePopup(false));

    const [message, setMessage] = useState('')
    const handMessage = (e) => {
        const scrollHeight = e.target.scrollHeight;
        e.target.style.height = '100%';
        e.target.style.height = scrollHeight > 90 ? '90px' : e.target.scrollHeight + 'px';
        setMessage(e.target.value);
    }


    const togglePopup = (params) => {
        setShowEmoji(params)
    }
    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const fileData = reader.result;
            const fileType = fileData.split(',')[0].split(':')[1].split(';')[0];

            if (fileType.startsWith('image')) {
                console.log('Đây là một tệp hình ảnh.');
                // Thực hiện xử lý cho tệp hình ảnh ở đây
            } else {
                console.log('Đây là một tệp khác.');
                // Thực hiện xử lý cho tệp khác ở đây
            }
        };
        reader.readAsDataURL(file);
    };
    const handleFileChange = () => {
        const selectedFile = refFile.current.files[0];
        if (selectedFile) {
            handleFileUpload(selectedFile)
        }
    };
    const clickFile = () => {
        refFile.current.click();
    }
    const mergeMessage = (params) => {
        setMessage(pre => pre + params)
    }

    return (
        <div className=' h-screen relative flex flex-col' >
            <Row className='h-20 px-4 bb' justify={'space-between'} align={'middle'}>
                <Col xs={10} className='flex items-center h-full gap-x-2'>
                    <span className='p-1'>
                        <AvatarCustom size={40} activeUser={true} />
                    </span>
                    <div className='xs:hidden md:flex flex-col  p-1 justify-start h-full' >
                        <div className='text-mode font-medium text-base h-1/2'>Thỏ con xinh xắn</div>
                        <div className='text-mode text-xs font-normal h-1/2'>Hoat dong 24 phut truoc</div>
                    </div>
                </Col>
                <Col xs={10} className='flex justify-end items-center gap-x-4' >
                    <div><BsTelephoneFill className='text-iconColor text-lg' /></div>
                    <div><BsFillCameraVideoFill className='text-iconColor text-lg' /></div>
                    <div><BsSearch className='text-iconColor text-lg' /></div>
                    <div><BsThreeDots className='text-iconColor text-lg' /></div>
                </Col>
            </Row>
            <div className='overflow-y-auto flex-grow p-4 w-full flex flex-col gap-4 smooth-scroll' >

                {data.map((item, i) => (
                    <Message own={item.own} l={item.l} i={i} key={i} />
                ))}
            </div>
            <div className='max-h-[16%] relative bt' >
                <div className='flex justify-between items-end'>
                    <div className='flex-center mb-4 w-16'>
                        <Dropdown
                            overlayClassName='dropdown_custom'
                            trigger={['click']}
                            menu={{
                                items: [
                                    {
                                        key: '1',
                                        label: <div className='flex items-center gap-2'><BsFillMicFill /> <input className='border-0' placeholder='Mic thu âm' /></div>
                                    },
                                    {
                                        key: '2',
                                        label: <div className='flex items-center gap-2'>
                                            <MdAttachFile />
                                            <div onClick={clickFile}>Thêm file đính kèm</div>
                                            <input className='hidden' type='file' accept={accept} ref={refFile} onChange={handleFileChange} max={1} />
                                        </div>
                                    }
                                ]
                            }}
                            placement="bottomLeft"
                        >
                            <button> <BsFillPlusCircleFill className='text-blue-600' size={20} /></button>
                        </Dropdown>


                    </div>
                    <div className='chatbox flex-grow'>
                        <div>

                        </div>
                        <textarea
                            placeholder='Nhập tin nhắn'
                            className='chatbox__input textarea_chat'
                            rows={1}
                            onChange={(e) => handMessage(e)}
                            value={message}
                        />
                        <span className='chatbox__button '>
                            <RiFile4Fill className='text-blue-600' size={20} />
                            <BsFillEmojiSmileFill className='text-blue-600' size={17} onClick={() => togglePopup(true)} />
                        </span>
                    </div>
                    <div className='flex-center mb-4 w-16'>

                        {
                            message.length > 0 ? <IoSend className='text-blue-600' size={20} /> : <BiSolidLike className='text-blue-600' size={20} />
                        }
                    </div>
                </div>
                <div className={`${showEmoji ? 'block' : 'hidden'} absolute right-[8%] bottom-[100%] `} ref={refModalEmoji} >
                    <Picker data={DataEmoji} onEmojiSelect={(e) => mergeMessage(e.native)} />
                </div>
            </div>
        </div>
    )
}

export default Messenger