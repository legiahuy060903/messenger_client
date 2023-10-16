import './mes.scss';
import React, { useEffect, memo } from 'react';
import { BsFillEmojiSmileFill, BsFillCameraVideoFill, } from 'react-icons/bs';
import { BiSolidShare, BiSolidVideoOff, BiSolidPhoneCall } from 'react-icons/bi';
import {
    HiPhoneMissedCall
} from 'react-icons/hi';
import { formatByTime, handleTimeChat } from '../../utils/format';
import _ from "lodash"
const handleReply = () => {
    return (
        <div className="icon_rep_wrapper xs:flex-col md:flex-row">
            <span className='icon_rep__btn' ><BsFillEmojiSmileFill size={15} /></span>
            <span className='icon_rep__btn'><BiSolidShare size={15} /> </span>
        </div>
    )
}
const Message = ({ own, data }) => {
    const { call, media, text, updatedAt } = data;
    const iscall = _.isEmpty(call);
    const isMedia = _.isEmpty(media);
    const isText = _.isEmpty(text);
    const show = iscall && isMedia && isText === true ? false : true;

    const renderCall = () => {
        const { video, times } = call
        return <>
            <div className="call_area ">
                {video
                    ?
                    <>
                        <button className={times > 0 ? "icon_accept" : "icon_reject"}>{times > 0 ? <BsFillCameraVideoFill size={20} /> : <BiSolidVideoOff size={20} />}</button>
                        <div className='info_call'>
                            <span className='font-medium'>{times > 0 ? "Cuộc gọi video" : "Đã bỏ lỡ cuộc gọi video"}</span>
                            <span className='text-gray-500'>{times > 0 ? formatByTime(times) : handleTimeChat(updatedAt)}</span>
                        </div>

                    </>
                    :
                    <>
                        <button className={times > 0 ? "icon_accept" : "icon_reject"}>{times > 0 ? <BiSolidPhoneCall size={20} /> : <HiPhoneMissedCall size={20} />}</button>
                        <div className=' info_call'>
                            <span className='font-medium'>{times > 0 ? "Cuộc hội thoại" : "Đã bỏ lỡ cuộc hội thoại"}</span>
                            <span className='text-gray-500'>{times > 0 ? formatByTime(times) : handleTimeChat(updatedAt)}</span>
                        </div>
                    </>
                }

            </div>
            {handleReply()}
        </>

    }

    return (
        <>
            {show && <div className='text-center'> {handleTimeChat(updatedAt)}</div>}
            <div className={`${own ? 'flex-row-reverse mes_box' : " mes_box "}`}>
                {
                    !isMedia && <>
                        <div className="flex flex-col gap-2">
                            {
                                !isMedia && media.map((item, index) => (
                                    <div key={index}>
                                        {
                                            item.url.match(/video/i)
                                                ? <video controls src={item.url} className=' max-w-xs rounded-sm' />
                                                : <img src={item.url} className='max-w-xs rounded-sm' />
                                        }

                                    </div>
                                ))
                            }
                        </div>
                        {handleReply()}
                    </>
                }

                {
                    !isText && <>
                        <div className={`mes_box_text xs:max-w-[80%] md:max-w-[40%] ${own ? "text_message_send" : "text_message_recipient"}`}>
                            {text}
                        </div>
                        {handleReply()}
                    </>
                }
                {
                    !iscall && renderCall()
                }

            </div>
        </>

    )
}

export default memo(Message);