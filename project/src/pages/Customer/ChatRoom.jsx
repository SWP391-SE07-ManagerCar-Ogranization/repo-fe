import { message } from "antd";
import React, { useState } from "react";
// import {  } from '@stomp/stompjs'
import SockJS from "sockjs-client";
import { list } from "postcss";

var stompClient = null
const ChatRoom = () => {
    const [publicChats, setPublicChats] = useState([])
    const [privateChats, setPrivateChats] = useState(new Map());
    const [tab, setTab] = useState("CHATROOM")
    const [userData, setUserData] = useState({
        username: "",
        receivername: "",
        connected: false,
        message: ""
    })

    const handleValue = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, [name]: value })
    }

    const handleMessage = (event) => {
        const { value } = event.target;
        setUserData({ ...userData, "message": value })
    }

    const registerUser = () => {
        let Sock = new SockJS('http://localhost:8080/chat')
        // stompClient = (Sock);
        stompClient.connect({}, onConected, onError)

    }

    const onConected = () => {
        setUserData({ ...userData, "connected": true });
        stompClient.subscribe('/chatroom/public', onPublicMessageReceived)
        stompClient.subscribe('/user/' + userData.username + '/private', onPrivateMessageReceived)
        userJoin()
    }
    if (stompClient) {
        let chatMessage = {
            senderName: userData.username,
            status: "JOIN"
        }
        stompClient.send('app/message', JSON.stringify(chatMessage))
        setUserData({ ...userData, "message": "" })
    }


const onPublicMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload.body);
    switch (payloadData.status) {
        case "JOIN":
            if (!privateChats.get(payloadData)) {
                privateChats.set(payloadData.senderName, []);
                setPrivateChats(new Map(privateChats))
            }
            break;
        case "MESSAGE":
            publicChats.push(payloadData);
            setPublicChats([...publicChats]);
            break;
    }
}

const onError = (err) => {
    console.log(err);
}

const onPrivateMessageReceived = (payload) => {
    let payloadData = JSON.parse(payload);
    if (privateChats.get(payloadData.senderName)) {
        privateChats.get(payloadData.senderName).push(payloadData);
        setPrivateChats(new Map(privateChats));

    } else {
        let list = [];
        list.push(payloadData)
        privateChats.get(payloadData.senderName, list);
        setPrivateChats(new Map(privateChats))
    }
}

const sendPublicMessage = () => {
    if (stompClient) {
        let chatMessage = {
            senderName: userData.username,
            message: userData.message,
            status: "MESSAGE"
        }
        stompClient.send('app/message', JSON.stringify(chatMessage))
        setUserData({ ...userData, "message": "" })
    }
}

const sendPrivateMessage = () => {
    if (stompClient) {
        let chatMessage = {
            senderName: userData.username,
            receivername: tab,
            message: userData.message,
            status: "MESSAGE"
        };
        if (userData.username !== tab) {
            privateChats.set(tab).push(chatMessage)
            setPrivateChats(new Map(privateChats))
        }
        stompClient.send('app/private-message', JSON.stringify(chatMessage))
        setUserData({ ...userData, "message": "" })
    }
}



return (
    <div className="container">
        {userData.connected ?
            <div className="chat-box">
                <div className="member-list">
                    <ul>
                        <li onClick={() => { setTab("CHATROOM") }} className={`member ${tab === "CHATROOM" && "active"}`}>Chatroom</li>
                        {[...privateChats.keys()].map((name, index) => {
                            <li onClick={() => { setTab(name) }} className={`member ${tab === "CHATROOM" && "active"}`} key={index}> {name} </li>
                        })}
                    </ul>

                </div>
                {tab === "CHARROOM" && <div>
                    <ul className="chat-message">
                        {publicChats.map((chat, index) => {
                            <li key={index}>
                                {chat.senderName !== userData.username && <div>{chat.senderName}</div>}
                                <div> {chat.message} </div>
                                {chat.senderName === userData.username && <div>{chat.senderName}</div>}
                            </li>
                        })}
                    </ul>
                    <div className="send-message">
                        <input type="text" className="input-message" placeholder="enter public message" value={userData.message}
                            onChange={handleValue}
                        />
                        <button type="button" className="send-button" onClick={sendPublicMessage}>send</button>
                    </div>
                </div>}
                {tab !== "CHATROOM" && <div className="chat-content">
                    <ul className="chat-messages">
                        {[...privateChats.get(tab)].map((chat, index) => {
                            <li key={index}>
                                {chat.senderName !== userData.username && <div>{chat.senderName}</div>}
                                <div> {chat.message} </div>
                                {chat.senderName == userData.username && <div> {chat.senderName} </div>}
                            </li>
                        })}
                    </ul>

                    <div className="send-message">
                        <input type="text" className="input-message" name="message" placeholder={`enter private message for ${tab}`} value={userData.message}
                            onChange={handleValue}
                        />
                        <button type="button" className="send-button" onClick={sendPrivateMessage}>send</button>
                    </div>
                </div>}

            </div>
            :
            <div className="register">
                <input
                    id='user-name'
                    name="username"
                    placeholder="Enter the user name"
                    value={userData.username}
                    onChange={handleUserName}
                >
                </input>
                <button type="button" onClick={resisterUser}>
                    connect
                </button>
            </div>}
    </div>
)
}



export default ChatRoom;