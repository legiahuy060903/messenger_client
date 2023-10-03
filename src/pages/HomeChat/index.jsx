import React, { useEffect, useRef, useState } from 'react';
import Conversation from '../../components/conversation';
import { Col, Row } from 'antd';
import { FaEdit } from 'react-icons/fa';
import { AiOutlineSearch } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { getConversations } from "../../redux/action/message.js";
import { callSearchUser } from '../../services/api';
import { addUserToMessage } from '../../redux/features/messageSlice';
import DisplayChat from '../../components/ContainerChat';
const HomeChat = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user: { account }, message } = useSelector(state => state);
    const refInputSeacrch = useRef('');
    const { t } = useTranslation("main");
    const [searchUsers, setSearchUsers] = useState([]);

    useEffect(() => {
        if (message.firstLoad) return;
        dispatch(getConversations());
    }, [dispatch, message.firstLoad])

    const handFindUser = async () => {
        let name = refInputSeacrch.current.value;
        const data = await callSearchUser(name);
        setSearchUsers(data)
        refInputSeacrch.current.value = "";
    }

    const handFetchUser = (user) => {
        setSearchUsers([])
        refInputSeacrch.current.value = "";
        dispatch(addUserToMessage({ ...user, text: '', media: [] }));
        // dispatch({ type: MESS_TYPES.CHECK_ONLINE_OFFLINE, payload: online })
        navigate(`/chat/` + user._id);
    }

    return (
        <section>
            <Row>
                <Col xs={5} md={3} lg={5} className='br'>
                    <div className='text-mode h-screen overflow-hidden flex flex-col pt-2'>
                        <div className=' min-h-[60px] px-4 flex lg:justify-between xs:justify-center items-center'>
                            <div className='xs:hidden lg:block w-1/12  text-xl font-medium'>Chat</div>
                            <div className='xs:full lg:w-1/12 text-xl h-10  font-medium flex-center'><FaEdit size={18} /></div>
                        </div>
                        <div className='w-full min-h-[60px]  px-4 relative xs:hidden lg:flex justify-center items-center '>
                            <input type="text" placeholder={t("home.pla_search")} ref={refInputSeacrch}
                                className=' w-full h-[70%] border-none ps-3 text-base input_search' />
                            <span className='absolute right-[10%] top-[38%]'><AiOutlineSearch onClick={handFindUser} /> </span>
                        </div>
                        <div className='lg:my-3 xs:mt-0  cursor-pointer'>
                            <div className='overflow-hidden px-4'>
                                <Row className=' w-full overflow-x-scroll  scrollX' wrap={false} justify="start" >
                                    <Col xs={0} lg={8} xl={6} className='user_active'>
                                        <Conversation isActive={true} />
                                    </Col>
                                    <Col xs={0} lg={8} xl={6} className='user_active'>
                                        <Conversation isActive={true} />
                                    </Col>
                                    <Col xs={0} lg={8} xl={6} className='user_active'>
                                        <Conversation isActive={true} />
                                    </Col>

                                </Row>
                            </div>
                            {
                                searchUsers.length !== 0 ?
                                    searchUsers?.map(item => (
                                        <div key={item._id} className={`${item._id == id && 'activeConversation'}`} onClick={() => handFetchUser(item)}>
                                            <Conversation dataFriend={item} row={true} />
                                        </div>
                                    )) :
                                    <>
                                        {message.users && message.users.map(item => {
                                            return (
                                                <div key={item?._id} className={`${item?._id == id && 'activeConversation'}`} onClick={() => handFetchUser(item)}>
                                                    <Conversation dataFriend={item} row={true} />
                                                </div>
                                            )
                                        })}
                                    </>
                            }
                        </div>
                    </div>

                </Col>

                <Col xs={19} md={21} lg={19} >
                    <DisplayChat id={id} />
                </Col>
            </Row>
        </section>

    )
}

export default HomeChat