import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { io } from "socket.io-client";
import { addMessage } from '../redux/action/message';
import { addUserToMessage } from '../redux/features/messageSlice';
const URL = import.meta.env.VITE_APP_API_URL;

export const socket = io(URL);
const SocketClient = () => {
    const { user, notify, online, call } = useSelector(state => state)
    const dispatch = useDispatch()

    const audioRef = useRef()

    // joinUser
    useEffect(() => {
        socket.emit('joinUser', { user: user.account })
    }, [socket, user])

    // Message
    useEffect(() => {
        socket.on('addMessageToClient', ({ message, user }) => {
            dispatch(addUserToMessage(user))
            dispatch(addMessage({ data: message, method: "receive" }));

        })
        return () => socket.off('addMessageToClient')
    }, [socket, dispatch])

    // Check User Online / Offline
    // useEffect(() => {
    //     socket.emit('checkUserOnline', auth.user)
    // }, [socket, auth.user])

    // useEffect(() => {
    //     socket.on('checkUserOnlineToMe', data => {
    //         data.forEach(item => {
    //             if (!online.includes(item.id)) {
    //                 dispatch({ type: GLOBALTYPES.ONLINE, payload: item.id })
    //             }
    //         })
    //     })
    //     return () => socket.off('checkUserOnlineToMe')
    // }, [socket, dispatch, online])

    // useEffect(() => {
    //     socket.on('checkUserOnlineToClient', id => {
    //         if (!online.includes(id)) {
    //             dispatch({ type: GLOBALTYPES.ONLINE, payload: id })
    //         }
    //     })
    //     return () => socket.off('checkUserOnlineToClient')
    // }, [socket, dispatch, online])

    // // Check User Offline
    // useEffect(() => {
    //     socket.on('CheckUserOffline', id => {
    //         dispatch({ type: GLOBALTYPES.OFFLINE, payload: id })
    //     })
    //     return () => socket.off('CheckUserOffline')
    // }, [socket, dispatch])

    return (
        <>
            <audio controls ref={audioRef} style={{ display: 'none' }} >
                {/* <source src={audiobell} type="audio/mp3" /> */}
            </audio>
        </>
    )
}

export default SocketClient
