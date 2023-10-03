import React, { memo, useState } from 'react';
import './conversation.scss';
import { Avatar, Col, Row } from 'antd';
import AvatarCustom from '../Avatar';
import { handleTimeChat } from '../../utils/format';

const Conversation = ({ isActive, dataFriend, row }) => {
    const isRow = row === true ? 'px-4 py-2' : 'flex-col ';
    console.log(dataFriend)
    return (
        <div className={`conversation__box ${isRow}`}>
            <AvatarCustom activeUser={isActive} src={dataFriend?.avatar} />
            <Row className='box__info' justify={'space-between'} gutter={[0, 8]} >
                <Col xs={24} className={row ? 'info__name__row' : 'info__name__col'}>{dataFriend?.name || ''}</Col>
                {
                    dataFriend?.text && <>
                        <Col lg={row ? 19 : 0} xs={0} className='box__info__mes' >
                            {dataFriend?.text || ""}
                        </Col>
                        <Col lg={row ? 4 : 0} xs={0} className="box__info__time">
                            {handleTimeChat(dataFriend?.updatedAt) || ""}
                        </Col>
                    </>
                }

            </Row>
        </div>
    )
}

export default memo(Conversation)