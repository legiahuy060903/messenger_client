
import React, { useRef, useState } from 'react'
import { Switch } from 'antd';
const Status = () => {

    const [status, setStatus] = useState(true)
    const onChange = (checked) => {
        setStatus(checked)
    };
    return (
        <div className='flex flex-col gap-y-4'>
            <span className='text-xl'>Trạng thái hoạt động</span>
            <span className='text-base'>Hiển thị trạng thái hoạt động</span>
            <span>
                <Switch defaultChecked={status} onChange={onChange} />
            </span>
            <span className='text-base'>Trạng thái hoạt động : {status ? 'Đang bật' : 'Tắt'}</span>
            <div className='bb'></div>
            <span className='leading-5 text-sm text-zinc-600'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto minima excepturi illo,\
                culpa dignissimos distinctio dolore modi voluptas saepe expedita nulla autem, blanditiis p
                orro odit dolorem adipisci vel quam in!
            </span>

        </div>
    )
}

export default Status