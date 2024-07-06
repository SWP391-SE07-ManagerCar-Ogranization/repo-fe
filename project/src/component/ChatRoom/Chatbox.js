    import React, { useEffect, useState, useRef, useContext } from 'react'
    import SockJS from 'sockjs-client';
    import { over } from 'stompjs';
    import {
        Button,
        Avatar,
        Tooltip,
        Input,
        Typography,
        message,
    } from 'antd'
    import {
        SearchOutlined
    } from '@ant-design/icons'
    import Message from './Message'
    import avt from '../../assets/avt.jpg'
    import {
        getAllMessageByGroupCarId
    } from '../../service/MessageService'
    import {
        getAllCustomersByGroupCarId
    } from '../../service/CustomerService'

    import './Chatbox.module.css'
    import {
        ChatRoomContext
    } from '../../context/ChatRoomContext'



    let stompClient = null;


    export default function Chatbox({ group }) {
        
        const {theme, setTheme} = useContext(ChatRoomContext)

        const [messages, setMessages] = useState([])
        const [customers, setCustomers] = useState([])

        const [userData, setUserData] = useState({
            userId: group.customerId,
            groupCarId: group.groupCarId,
            senderName: "",
            connected: false,
            message: "",
            createdAt: ""
        });

        const chatMessagesRef = useRef(null); // Ref for chat-messages element
        const inputMess = useRef()

        useEffect(()=> {
            setTheme((prev)=> ({
                ...prev,
                customers,
                setCustomers,
                userData,
                setUserData
            })
            )
        }, [setTheme, customers, userData, setCustomers, setUserData])

        const getAllMessagesByGroupCarId_ = async (id) => {
            try {
                const data = await getAllMessageByGroupCarId(id)
                setMessages(data)

            } catch (error) {
                console.error(error)
            }
        }

        const getAllCustomersByGroupCarId_ = async (id) => {
            try {
                const data = await getAllCustomersByGroupCarId(id)
                setCustomers(data)
            } catch (error) {
                console.error(error)
            }

        }

        useEffect(() => {
            // Call registerUser() immediately on component mount
            registerUser();
        }, [group]); // Empty dependency array ensures this runs once on mount
        


        useEffect(() => {
            getAllMessagesByGroupCarId_(group.groupCarId)
        }, [group])

        useEffect(() => {
            getAllCustomersByGroupCarId_(group.groupCarId)
        }, [group])

        useEffect(() => {
            // Scroll chat-messages to bottom when publicChats or privateChats change
            scrollToBottom();
        }, [messages]);

        const scrollToBottom = () => {
            // Scroll chat-messages to bottom
            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
            }
        };


        const formatDate = (string) => {
            const date = new Date(string)
            return date.toLocaleString()
        }

        //ws

        const registerUser = () => {
            let Sock = new SockJS("http://localhost:8080/public/ws")
            stompClient = over(Sock)
            stompClient.connect({}, onConnected, onError)
        }

        const onConnected = () => {
            setUserData({ ...userData, "connected": true });
            if (stompClient && stompClient.connected) {
                stompClient.subscribe(`/chatroom/${userData.groupCarId}/public`, onPublicMessageReceived);
                console.log("Successfully subscribed!");
            } else {
                console.error('WebSocket connection is not established yet.');
            }
        }
    

        const onError = (err) => {
            console.log(err);
        };

        const handleMessage = (event) => {
            const { value } = event.target;
            console.log({ value });
            setUserData({ ...userData, "message": value });
        };

        // const onPublicMessageReceived = (payload) => {
        //     console.log("PAYLOAD>>>>>>: ", payload.body);
        //     let payloadData = JSON.parse(payload.body);
        //     console.log("PAYLOAD-DATA>>>>>>: ", payloadData);

        //     const status = payloadData.status
        //     const message = payloadData.message

        //     switch (status) {

        //         case "MESSAGE":
        //             getAllMessagesByGroupCarId_(message.groupCar)
        //             break;

        //         default:
        //             console.log("???");
        //             break;
        //     }
        // };

        
        const onPublicMessageReceived = (payload) => {
        console.log("Payload:",payload);
        getAllMessagesByGroupCarId_(group.groupCarId)
        inputMess?.current?.focus()
        };

        

        const sendPublicMessage = () => {

            if (stompClient && stompClient.connected) {
                let chatMessage = {
                    userId: userData.userId,
                    message: userData.message,
                    groupCarId: userData.groupCarId,
                    status: "MESSAGE"
                };
                stompClient.send('/app/message', {}, JSON.stringify(chatMessage));
                setUserData({ ...userData, "message": "" });
                // console.log("UserData", userData);
            } else {
                console.error('WebSocket connection is not established yet.');
            }
        }

        // console.log("All_Message>>>>", messages)
        // console.log("All_Customer>>>>", customers)
        // console.log("Theme>>>>:", theme);

        return (
            <>
                <div className='h-[100vh] border-l '>
                    {/* <header className='flex justify-between h-[56px] pl-3 pr-3 items-center border-b border-black'>
                        <div className='flex flex-col justify-center'>
                            <div className='m-0 font-bold'>{group.groupName}</div>
                            <p className='text-[12px]'>This is room {group.groupCarId}</p>
                        </div>
                        <div className='flex items-center'>
                            <Button type='text'>Invite</Button>
                            <Avatar.Group size='small' maxCount={2}>
                                {customers.map((customer, index) => (
                                    <Tooltip key={index} title={customer.name}>
                                        <Avatar>{customer.name} </Avatar>
                                    </Tooltip>

                                ))}

                            </Avatar.Group>

                        </div>

                    </header> */}
                    <div className=' content flex flex-col p-[11px] justify-end relative' style={{
                        height: 'calc(100% - 200px)'
                        }}>
                            <div style={{display: 'none'}} className='absolute top-0 left-[30%] right-[30%] '><Input /><Button><SearchOutlined /></Button></div>
                        <div
                            className='message-list max-h-[100%] flex-1 overflow-auto pr-20 pl-20 mb-[11px]'
                            style={{

                            }}
                            ref={chatMessagesRef}
                        >
                            {messages?.map((message, index) => {

                                const customer = customers.find(customer => customer.accountId === message.customer || (message.customer && customer.accountId === message.customer.id));
                                const customerName = customer ? customer.name : 'Unknown Customer';
                                let isTargetUser = false
                                if(typeof message.customer == 'object' && message.customer !== null){
                                    if (message?.customer?.id == group.customerId){
                                        isTargetUser = true
                                    }
                                }else{
                                    if (message?.customer == group?.customerId) {
                                        isTargetUser = true
                                    }
                                }

                                // console.log(message?.customer +" <<<<< >>>>>  "+group?.customerId);

                                // console.log("isTargetUser>>>", isTargetUser);



                                return (
                                    <div
                                        key={index}
                                        className={
                                            isTargetUser
                                            ?
                                            'flex justify-end'
                                            :
                                            ''
                                            }
                                    >
                                        <Message
                                            isTargetUser = {isTargetUser}
                                            text={message.content}
                                            avatar={customerName == 'Do Lar' ? avt : null}
                                            name={customerName}
                                            createdAt={formatDate(message.createdAt).split(",")[1]} />
                                    </div>

                                )

                            })}

                            {/* <div className='mb-[10px]'>

                                <div>
                                    <Typography.Text className='ml-[30px] bg-gray-200 p-1.5 border rounded-xl'>Hello</Typography.Text>
                                </div>
                            </div> */}



                        </div>
                        <div className='form flex justify-between items-center pt-1 pr-1 pb-1 mr-24 ml-24 border border-solid rounded-md bg-gradient-to-r from-gray-200 box-border to-white'>
                            <div className='form-item flex-1 mb-0 '>
                                <Input
                                    ref={inputMess}
                                    className='bg-transparent border-none focus:outline-none focus:bg-transparent focus:ring-0 hover:bg-transparent rounded-md'
                                    autoComplete='off'
                                    placeholder='Enter the message'
                                    value={userData.message}
                                    onChange={handleMessage}
                                />
                            </div>
                            <Button type='primary' className='font-bold' onClick={userData.message===''?null: sendPublicMessage}>Send</Button>
                        </div>
                    </div>
                </div>
            </>
        )
    }