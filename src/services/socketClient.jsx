import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { io } from "socket.io-client";
import { addMessage } from '../redux/action/message';
import { addUserToMessage } from '../redux/features/messageSlice';
import { handleUserOnline, handleUserOffline } from '../redux/features/onlineSlice';
const URL = import.meta.env.VITE_APP_API_URL;
import Peer from 'peerjs';
import { modalCall } from '../redux/features/callSlice';
import { notification } from 'antd';

export const socket = io(URL);
export const peer = new Peer(undefined, {
    path: '/', secure: true
})
const SocketClient = () => {
    const [api, contextHolder] = notification.useNotification();
    const { user, call, online, message } = useSelector(state => state)
    const dispatch = useDispatch();

    const openNotification = () => {
        api.info({
            message: `Thông báo`,
            description:
                'User đang bận',
            placement: "topRight"
        });
    };
    // joinUser
    useEffect(() => {
        socket.emit('joinUser', { user: user.account })
    }, [dispatch, socket, user])

    // Message
    useEffect(() => {
        socket.on('addMessageToClient', ({ message, user }) => {
            dispatch(addUserToMessage(user))
            dispatch(addMessage({ data: message, method: "receive" }));
        })
        return () => socket.off('addMessageToClient')
    }, [socket, dispatch])

    // Check User Online / Offline
    useEffect(() => {
        if (message.users.length > 0) {
            socket.emit('checkUserOnline', { user: user.account, listUserChat: message.users })
        }
    }, [dispatch, socket, user.account, message.users])

    useEffect(() => {
        socket.on('checkUserOnlineToMe', data => {
            data.forEach(item => {
                if (!online.includes(item.id)) {
                    dispatch(handleUserOnline(item.id))
                }
            })
        })
        return () => socket.off('checkUserOnlineToMe')
    }, [socket, dispatch, online])

    useEffect(() => {
        socket.on('checkUserOnlineToClient', id => {
            if (!online.includes(id)) {
                dispatch(handleUserOnline(id))
            }
        })
        return () => socket.off('checkUserOnlineToClient')
    }, [socket, dispatch, online])

    // Check User Offline
    useEffect(() => {
        socket.on('CheckUserOffline', id => {
            dispatch(handleUserOffline(id))
        })
        return () => socket.off('CheckUserOffline')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('callUserToClient', data => {
            dispatch(modalCall({
                info: data,
                isCall: true,
            }))
        })

        return () => socket.off('callUserToClient')
    }, [socket, dispatch])

    useEffect(() => {
        socket.on('userBusy', data => {
            openNotification()
        })
        return () => socket.off('userBusy')
    }, [socket, dispatch, call])

    return (
        <>
            {contextHolder}
        </>
    )
}

export default SocketClient
