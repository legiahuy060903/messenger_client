import { Segmented, Select } from 'antd'
import React, { useState } from 'react'
import { AiFillLike } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../redux/features/accountSlice';
import { useTranslation } from 'react-i18next';
import { updateTheme } from '../../redux/action/user';

const Theme = () => {
    const { t } = useTranslation("main");
    const dispatch = useDispatch();
    const { _id } = useSelector(s => s.account.account)
    const { dark_mode } = useSelector(state => state.account);

    const handleChange = (value) => {
        dispatch(updateTheme({ dark_mode: value, _id }));
    };
    return (
        <div className='flex flex-col gap-y-4'>
            <div className='text-xl'>Giao diện</div>
            <div className='text-base'>Chủ đề</div>
            <Select
                defaultValue={dark_mode}
                onChange={handleChange}
                options={[
                    {
                        value: 'light',
                        label: t("setting.status.light")
                    },
                    {
                        value: 'dark',
                        label: t("setting.status.dark")
                    }
                ]}
            />
            <div className='bb'></div>
            <div>Màu sắc của biểu tượng cảm xúc</div>
            <Segmented
                className='segmented_center'
                options={[
                    {
                        value: '1',
                        label: <div className=' py-3'><AiFillLike className='text-amber-800 ' size={16} /></div>,
                    },
                    {
                        value: '2',
                        label: <div className='py-3'><AiFillLike className='text-neutral-160' size={16} /></div>,
                    },
                    {
                        value: '3',
                        label: <div className='py-3'><AiFillLike className='text-amber-400' size={16} /></div>,
                    },
                    {
                        value: '4',
                        label: <div className=' py-3'><AiFillLike className='text-blue-700' size={16} /></div>,
                    },
                ]}
            />

        </div>

    )
}

export default Theme