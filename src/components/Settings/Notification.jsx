
import React, { useState } from 'react'
import { Divider, Switch } from 'antd';
const Notification = () => {
    const [status, setStatus] = useState(true)
    const onChange = (checked) => {
        setStatus(checked)
    };
    return (
        <div className='flex flex-col gap-y-6'>
            <div className='text-lg font-medium'>Thông báo</div>
            <div className='text-base font-light'>Tắt tất cả thông báo</div>
            <div><Switch defaultChecked={status} onChange={onChange} /></div>
            <div className='bb'></div>
            <div className='leading-6 text-base'>Hiển thị bản xem trước tin nhắn khi bạn không dùng ứng dụng</div>
            <div className='bb'></div>
            <div>Cho phép thông báo khi đóng ứng dụng</div>
            <div><Switch defaultChecked={status} onChange={onChange} /></div>
        </div>
    )
}

export default Notification