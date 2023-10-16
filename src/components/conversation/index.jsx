import React, { memo, useEffect, useState } from 'react';
import './conversation.scss';
import { Avatar, Col, Row } from 'antd';
import AvatarCustom from '../Avatar';
import { handleTimeChat } from '../../utils/format';
import _ from "lodash";
const Conversation = ({ isActive, dataFriend, row }) => {
    const isRow = row === true ? 'px-4 py-2' : 'flex-col ';
    const { call, media, text, updatedAt, name, avatar } = dataFriend;
    const iscall = _.isEmpty(call);
    const isMedia = _.isEmpty(media);
    const isText = _.isEmpty(text);
    const show = iscall && isMedia && isText === true ? false : true;



    const render = () => {
        const { video, times } = call;
        const callType = times > 0 ? "Cuộc" : "Đã bỏ lỡ cuộc";
        return <span className="font-medium">{callType} {video ? "gọi video" : "hội thoại"}</span>
    }
    return (
        <div className={`conversation__box ${isRow} `}>
            <AvatarCustom activeUser={isActive} src={avatar} />
            <Row className='box__info' justify={'space-between'} gutter={[0, 8]} >
                <Col xs={24} className={row ? 'info__name__row' : 'info__name__col'}>{name}</Col>
                {
                    show && <>
                        <Col lg={row ? 16 : 0} xs={0} className='box__info__mes text_cover' >
                            {!isText && text}
                            {!isMedia && `đã gửi ảnh ${media.length}`}
                            {!iscall && render()}

                        </Col>
                        <Col lg={row ? 8 : 0} xs={0} className="box__info__time text_cover">
                            {handleTimeChat(updatedAt)}
                        </Col>
                    </>
                }

            </Row>
        </div>
    )
}

export default memo(Conversation)