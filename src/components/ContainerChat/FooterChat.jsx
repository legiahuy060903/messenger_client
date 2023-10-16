
import './mes.scss';
import { Dropdown } from 'antd';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import DataEmoji from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { BsFillPlusCircleFill, BsFillEmojiSmileFill, BsFillMicFill } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';
import { BiSolidLike } from 'react-icons/bi';
import { MdAttachFile } from 'react-icons/md';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import useOnClickOutside from '../../hook/useOnClickOutside';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../redux/action/message';
import { imageUpload } from '../../utils/upload';
var accept = ".jpg,.jpeg,.png,.video";




const FooterChat = ({ id, account, setLoading, scrollBottom }) => {
    const dispatch = useDispatch();
    const [text, setText] = useState('');
    const [media, setMedia] = useState([])
    const refModalEmoji = useRef();
    const refFile = useRef();
    const textareaRef = useRef(null);
    const [showEmoji, setShowEmoji] = useState(false);
    useOnClickOutside(refModalEmoji, () => togglePopup(false))
    const clickFile = () => {
        refFile.current.click();
    }

    useEffect(() => {
        setText("")
        setMedia([])
    }, [id])

    const togglePopup = (params) => {
        setShowEmoji(params)
    }
    const handleFileChange = () => {
        const selectedFiles = refFile.current.files;
        const selectedFilesArray = Array.from(selectedFiles);
        let newMedia = [];
        selectedFilesArray.forEach(file => {
            console.log(file);
            newMedia.push(file);
        });
        setMedia([...media, ...newMedia]);
    };


    const sendMessage = async () => {
        if (id) {
            scrollBottom()
            let newArr = [];
            if (media.length > 0) {
                setLoading(true);
                newArr = await imageUpload(media)
            }
            const msg = {
                sender: account._id,
                recipient: id,
                text,
                media: newArr
            }
            dispatch(addMessage({ data: msg, method: "send" }));
            handleHeightInput(37)
            setText('');
            setMedia([])
            media.length > 0 && setLoading(false)
        }
    }
    const handleDeleteMedia = (index) => {
        const newArr = [...media]
        newArr.splice(index, 1)
        setMedia(newArr)
    }
    const handMessage = (e) => {
        handleHeightInput();
        setText(e.target.value);
    };
    const submitChat = (e) => {
        if (e.key === "Enter" && text.length > 0 && id && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }
    const handleHeightInput = (reset) => {
        const scrollHeight = textareaRef.current.scrollHeight;
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = scrollHeight > 90 ? '90px' : reset || textareaRef.current.scrollHeight + 'px';
    }
    return (
        <div className='h-full'>
            <div className={media.length > 0 ? "flex pt-2 ps-16 gap-2" : "hidden"} >
                {
                    media.map((item, index) => (
                        <div key={index} className="relative">
                            {
                                item.type.match(/video/i)
                                    ? <video controls src={URL.createObjectURL(item)} className='w-[70px] h-[70px] object-contain aspect-[4/3]' />
                                    : <img src={URL.createObjectURL(item)} className='w-[70px] h-[70px] object-cover rounded-md' />
                            }
                            <span className='absolute top-1 right-1 text-red-500' onClick={() => handleDeleteMedia(index)} ><AiOutlineCloseCircle size={15} /></span>
                        </div>
                    ))
                }
            </div>
            <div className='flex justify-between items-end'>
                <div className='flex-center mb-4 w-16'>
                    <Dropdown
                        overlayClassName='dropdown_custom'
                        trigger={['click']}
                        menu={{
                            items: [
                                {
                                    key: '1',
                                    label: <div className='flex items-center gap-2'><BsFillMicFill />
                                        <input className='border-0 ' placeholder='Mic thu âm' />
                                    </div>
                                },
                                {
                                    key: '2',
                                    label: <div className='flex items-center gap-2' onClick={clickFile}>
                                        <MdAttachFile />
                                        <div className='text-[#888]'>Thêm file đính kèm</div>
                                        <input className='hidden' type='file' accept={accept} ref={refFile} onChange={handleFileChange} max={7} multiple />
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
                    <textarea
                        ref={textareaRef}
                        placeholder='Nhập tin nhắn'
                        className='chatbox__input textarea_chat'
                        rows={1}
                        onChange={handMessage}
                        onKeyDown={submitChat}
                        value={text}
                    />
                    <span className='chatbox__button '>
                        <BsFillEmojiSmileFill className='text-blue-600' size={17} onClick={() => togglePopup(true)} />
                    </span>
                </div>
                <div className='flex-center mb-4 w-16'>
                    {
                        text.length > 0 || media.length > 0 ?
                            <IoSend className='text-blue-600' size={20} onClick={sendMessage} />
                            :
                            <BiSolidLike className='text-blue-600' size={20} />
                    }
                </div>
            </div>
            <div className={`${showEmoji ? 'block' : 'hidden'} absolute right-[8%] bottom-[100%] `} ref={refModalEmoji} >
                <Picker data={DataEmoji} onEmojiSelect={(e) => setText(pre => pre + e.native)} />
            </div>
        </div>

    )
}

export default FooterChat