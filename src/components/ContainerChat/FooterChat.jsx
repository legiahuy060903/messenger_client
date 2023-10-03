
import './mes.scss';
import { Dropdown } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BsFillPlusCircleFill, BsFillEmojiSmileFill, BsFillMicFill } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import { BiSolidLike } from 'react-icons/bi';
import { MdAttachFile } from 'react-icons/md';
import { RiFile4Fill } from 'react-icons/ri';
import useOnClickOutside from '../../hook/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../redux/action/message';
var accept = ".jpg,.jpeg,.png,.json,.video,.text,.pdf,.xlsx,.doc";



const handleHeightInput = (e) => {
    const scrollHeight = e.target.scrollHeight;
    e.target.style.height = '100%';
    e.target.style.height = scrollHeight > 110 ? '110px' : e.target.scrollHeight + 'px';
}
const FooterChat = ({ id, account }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('')
    const refModalEmoji = useRef();
    const refFile = useRef();
    const [showEmoji, setShowEmoji] = useState(false);
    useOnClickOutside(refModalEmoji, () => togglePopup(false))
    const clickFile = () => {
        refFile.current.click();
    }

    useEffect(() => {
        setText("")
    }, [id])
    const handMessage = useCallback((e, type) => {
        handleHeightInput(e);
        setText(e.target.value)
    }, [])
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
    const sendMessage = () => {
        if (id) {
            let newArr = [];
            // if (media.length > 0) newArr = await imageUpload(media)
            const msg = {
                sender: account._id,
                recipient: id,
                text,
                media: newArr
            }
            dispatch(addMessage({ data: msg, method: "send" }))
            setText('');
        }
    }
    return (
        <>
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
                        onChange={(e) => handMessage(e, 'text')}
                        value={text}
                    />
                    <span className='chatbox__button '>
                        <RiFile4Fill className='text-blue-600' size={20} />
                        <BsFillEmojiSmileFill className='text-blue-600' size={17} onClick={() => togglePopup(true)} />
                    </span>
                </div>
                <div className='flex-center mb-4 w-16'>
                    {
                        text.length > 0 ?
                            <IoSend className='text-blue-600' size={20} onClick={sendMessage} />
                            :
                            <BiSolidLike className='text-blue-600' size={20} />
                    }
                </div>
            </div>
            <div className={`${showEmoji ? 'block' : 'hidden'} absolute right-[8%] bottom-[100%] `} ref={refModalEmoji} >
                <Picker data={DataEmoji} onEmojiSelect={(e) => setText(pre => pre + e.native)} />
            </div>
        </>

    )
}

export default FooterChat