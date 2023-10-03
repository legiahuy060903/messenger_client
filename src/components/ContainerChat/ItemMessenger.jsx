import './mes.scss';
import React, { useEffect, memo } from 'react';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import { BiSolidShare } from 'react-icons/bi';

const Message = ({ own, text }) => {
    return (
        <div className={`${own ? 'flex-row-reverse mes_box ' : " mes_box "} `}>
            <div className={`mes_box_text xs:max-w-[80%] md:max-w-[40%] ${own ? "text_message_send" : "text_message_recipient"}`}> {text}</div>
            <div className="icon_rep_wrapper xs:flex-col md:flex-row">
                <span className='icon_rep__btn' ><BsFillEmojiSmileFill size={15} /></span>
                <span className='icon_rep__btn'><BiSolidShare size={15} /> </span>
            </div>
        </div>
    )
}

export default memo(Message);