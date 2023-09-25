import React, { useEffect, useState } from 'react';
import Conversation from '../../components/conversation';
import { Col, Row } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import Messenger from '../../components/Mes';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
const HomeChat = () => {
    const { account } = useSelector(state => state.account)
    const [userOnline, setUserOnline] = useState([])
    const { t } = useTranslation("main");
    // useEffect(() => {

    // }, [])

    return (
        <Row className=' h-screen'>
            <Col xs={5} md={3} lg={5} className='w-full text-mode h-full overflow-hidden flex flex-col'>
                <Row justify={"space-between"} align={'middle'} className='h-[10%] px-4'>
                    <Col xs={0} xl={5} className='text-xl font-medium'>Chat</Col>
                    <Col xs={24} xl={2} className='text-xl font-medium flex lg:justify-end xs:justify-center'><FaEdit size={18} /></Col>
                </Row>
                <div className='w-full h-[5%] px-4 relative xs:hidden lg:block'>
                    <input type="text" placeholder={t("home.pla_search")}
                        className='w-full h-11 border-none ps-3 text-base  input_search' />
                    <span className='absolute right-[10%] top-[38%]'><AiOutlineSearch /> </span>
                </div>
                <div className='w-full xs:h-[90%] lg:h-[80%]  xs:mt-0 lg:mt-5 overflow-y-auto px-4'>
                    <div>
                        <Row className='flex w-full overflow-x-scroll cursor-pointer scrollX' wrap={false} >
                            <Col xs={0} lg={8} className='user_active'>
                                <Conversation isActive={true} />
                            </Col>
                            <Col xs={0} lg={8} className='user_active'>
                                <Conversation isActive={true} />
                            </Col>


                        </Row>
                    </div>
                    {account && account.friends.map(item => (
                        <div key={item._id}>
                            <Conversation dataFriend={item} />
                        </div>
                    ))}
                    <div>

                        {/* <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation />
                        <Conversation /> */}
                    </div>


                </div>
            </Col>

            <Col xs={19} md={21} lg={19}>
                <Messenger />
            </Col>
        </Row>
    )
}

export default HomeChat