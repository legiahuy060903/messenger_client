import React, { useState } from 'react';
import './conversation.scss';
import { Avatar, Col, Row } from 'antd';
import AvatarCustom from '../Avatar';

const Conversation = ({ isActive, dataFriend }) => {
    const isRow = isActive ? 'row_cus' : 'column_cus';
    return (
        <div className={`conversation__box ${isRow}`}>
            <AvatarCustom activeUser={isActive} src={dataFriend?.avatar} />
            <Row className='box__info' justify={'space-between'} align={'stretch'} gutter={[0, 8]} >
                <Col xs={24} className='info__name'>{dataFriend?.name}</Col>
                <Col xs={20} className='info__mes' >
                    drge5y5yasrgetgteathathfffffffffffffffffffff
                </Col>
                <Col xs={4} className="info__time">
                    CN
                </Col>
            </Row>
        </div>
    )
}

export default Conversation