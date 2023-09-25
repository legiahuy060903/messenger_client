import { Select, Switch } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '../../redux/features/accountSlice';
import { useTranslation } from 'react-i18next';
const Language = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation("main");
    const lang = useSelector(s => s.account.language);
    const [status, setStatus] = useState(false);
    const onChangeCheck = (checked) => {
        setStatus(checked)
    };
    const handleChangeLanguage = (value) => {
        dispatch(changeLanguage(value))
    };
    return (
        <div className='flex flex-col gap-y-4'>
            <span className='text-xl'>{t("setting.language")}</span>
            <Select
                defaultValue={lang}
                onChange={handleChangeLanguage}
                options={[
                    {
                        value: 'vi',
                        label: t("setting.status.vi")
                    },
                    {
                        value: 'en',
                        label: t("setting.status.en")
                    }
                ]}
            />
            <span className='text-xs font-normal'>Thay đổi ngôn ngữ hiển thị của Messenger. Bạn phải khởi động lại ứng dụng để các thay đổi có hiệu lực</span>
            <div className='bb'></div>
            <div>Kiểm tra chính tả và tự động sửa văn bản nhập</div>
            <div>
                <Switch defaultChecked={status} onChange={onChangeCheck} />
            </div>
        </div>
    )
}

export default Language