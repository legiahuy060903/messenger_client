import React, { memo, useRef, useState } from 'react'
import { Layout, Menu, message, theme, Modal } from 'antd';
const { Sider } = Layout;
import { BiCabinet, BiSolidNotification } from 'react-icons/bi';
import { IoIosSettings, IoMdNotifications, IoMdExit } from 'react-icons/io';
import { BsFillChatFill, BsFillChatDotsFill } from 'react-icons/bs';
import { LuWarehouse } from 'react-icons/lu';
import { MdDarkMode, MdOutlineClose } from 'react-icons/md';
import { FaEarthOceania } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import AvatarCustom from '../Avatar';
import Status from '../Settings/Status';
import Notification from '../Settings/Notification';
import Language from '../Settings/Language';
import Theme from '../Settings/Theme';
import useOnClickOutside from '../../hook/useOnClickOutside';
import { useTranslation } from 'react-i18next';
import { callLogout } from '../../services/api';
import { doLogoutAction } from '../../redux/features/accountSlice';

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label,
    };
}
const items = [
    getItem('item 1', '1', <BsFillChatFill />),
    getItem('item 2', '2', <LuWarehouse />),
    getItem('item 3', '3', <BsFillChatDotsFill />),
    getItem('item 4', '4', <BiCabinet />),
];


const Sidebar = () => {
    const { t } = useTranslation("main");
    const refModalSeting = useRef();
    const [showSetting, setShowSetting] = useState(false);
    const [showModalSetting, setShowModalSetting] = useState(false);
    const [settingChoose, setSettingChoose] = useState();
    const dispatch = useDispatch();
    const { dark_mode } = useSelector(state => state.account);
    const [messageApi, contextHolder] = message.useMessage();

    const status = {
        on: t("setting.status.on"),
        off: t("setting.status.off"),
        vi: t("setting.status.vi"),
        en: t("setting.status.en"),
        light: t("setting.status.light"),
        dark: t("setting.status.dark"),
    };
    const options = [
        {
            key: 0,
            label: (
                <span className='lg:flex flex-col justify-center gap-y-1 xs:hidden text-mode'>
                    <h2 className='text-sm font-medium w-full leading-5'>{t("setting.active_status")}</h2>
                    <h6 className='text-xs'>{status.on}</h6>
                </span>
            ),
            icon: <span className='flex-center h-10 w-10 bg-lime-400 rounded-full'> <BiSolidNotification className='text-white' size={20} /></span >,
            children: <Status />
        },
        {
            key: 1,
            label: (
                <span className='lg:flex flex-col justify-center xs:hidden gap-y-1 text-mode'>
                    <h2 className='text-sm font-medium'>{t("setting.notifications")}</h2>
                    <h6 className='text-xs'>{status.on}</h6>
                </span>
            ),
            icon: <span className='flex-center h-10 w-10 bg-yellow-500 rounded-full'> <IoMdNotifications size={20} className='text-white' /> </span>,
            children: <Notification />
        },
        {
            key: 2,
            label: (
                <span className='lg:flex flex-col justify-center xs:hidden gap-y-1 text-mode'>
                    <h2 className='text-sm font-medium'>{t("setting.appearance")}</h2>
                    <h6 className='text-xs'>{status.dark}</h6>
                </span>
            ),
            icon: <span className='flex-center h-10 w-10  rounded-full setting_theme_mode' > <MdDarkMode className='icon ' size={20} /> </span>,
            children: <Theme />
        },
        {
            key: 3,
            label: (
                <span className='lg:flex flex-col justify-center xs:hidden gap-y-1 text-mode'>
                    <h2 className='text-sm font-medium'>{t("setting.language")}</h2>
                    <h6 className='text-xs'>{status.vi}</h6>
                </span>
            ),
            icon: <span className='flex-center h-10 w-10 bg-blue-700 rounded-full'> <FaEarthOceania size={20} className='text-white' /> </span>,
            children: <Language />
        },
        {
            key: 4,
            label: (
                <span className='lg:flex flex-col justify-center xs:hidden gap-y-1 text-mode'>
                    <h2 className='text-sm font-medium'>{t("setting.logout")}</h2>
                </span>
            ),
            icon: <span className='flex-center h-10 w-10 bg-iconColor rounded-full'> <IoMdExit size={20} className='text-white' /> </span>,
        }
    ];

    const handleShowModalSetting = (val) => {
        setShowModalSetting(val);
        setSettingChoose(options[0])
    }
    const handleSelectSetting = async (key) => {
        setSettingChoose(options[key]);
        if (key == 4) {
            await callLogout();
            dispatch(doLogoutAction());
            messageApi.open({
                type: 'success',
                content: 'This is a success message',
            });
        }
    }

    return (
        <div className='sider_area flex flex-col justify-between items-center'>
            {contextHolder}
            <Sider collapsed={true} className='mt-2' collapsedWidth={60}>
                <Menu defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <span className='mb-4 relative' onClick={() => setShowSetting(!showSetting)}>
                <AvatarCustom size={35} />
                {showSetting && (
                    <div className='absolute top-[-4rem] left-[-5px]  w-56 flex items-center p-3 z-50 cursor-pointer text-mode'
                        onClick={() => handleShowModalSetting(true)}
                    >
                        <IoIosSettings size={25} /> <span className='ms-4 text-base'>{t("preferences")}</span>
                    </div>
                )}
            </span>

            <Modal open={showModalSetting} footer={null}
                title={<div className=' w-1/6 flex-center'>
                    <div className='xs:hidden  md:block '>{t("preferences")}</div>
                    <div className='xs:block  md:hidden '><IoIosSettings size={25} /></div>
                </div>}
                onCancel={() => handleShowModalSetting(false)} width={700}
                className={`${dark_mode}-mode modal-setting`} >
                <div className=' flex  h-96'>
                    <div className="h-full br xs:w-2/12  lg:w-4/12  ">
                        <div className='flex flex-col gap-y-1 lg:ps-3 xs:items-center lg:items-start '>
                            {options && options.map((item, i) => (
                                <div className='h-14 flex justify-start gap-x-2 items-center cursor-pointer'
                                    key={item.key} onClick={() => handleSelectSetting(item.key)}>
                                    {item.icon}
                                    {item.label}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className=" h-full overflow-y-auto xs:w-10/12 lg:w-8/12 px-3">
                        <div>
                            {settingChoose?.children}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default memo(Sidebar)