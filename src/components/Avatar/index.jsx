import { Avatar } from 'antd';
import React from 'react';
const anh = 'https://icon-library.com/images/avatar-png-icon/avatar-png-icon-15.jpg';

const AvatarCustom = ({ activeUser, size, src }) => {
    return (
        <div className={activeUser ? 'isActiveUser' : ''}>
            <Avatar shape='circle' size={size || 50} src={src || anh} />
        </div>
    )
}

export default AvatarCustom