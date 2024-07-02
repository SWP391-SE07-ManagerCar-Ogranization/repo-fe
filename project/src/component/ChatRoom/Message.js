import { Avatar, Typography } from 'antd'
import React from 'react'


export default function Message({ isTargetUser, text, name, createdAt, avatar }) {
    return (
        <>
            {
                isTargetUser
                    ?
                    <div className='mb-[10px]'>
                      
                        <div className='flex justify-end items-center'>
                            <Typography.Text className='mr-[10px] text-[11px]'>{createdAt}</Typography.Text>
                            <Typography.Text className='mr-[5px] font-bold'>me</Typography.Text>
                            <Avatar className='mr-[10px]' src={avatar}>A</Avatar>
                        </div>
                        <div className='flex justify-end mr-[30px]'>
                            <Typography.Text className='ml-[30px] bg-gray-200 p-1.5 border rounded-xl text-white' style={{ backgroundColor: 'rgb(72, 142, 241)' }}>{text}</Typography.Text>
                        </div>

                    </div>
                    :
                    <div className='mb-[10px]'>
                        <div>
                            <Avatar src={avatar}>A</Avatar>
                            <Typography.Text className='ml-[5px] font-bold'>{name}</Typography.Text>
                            <Typography.Text className='ml-[10px] text-[11px] text-gray-500'>{createdAt}</Typography.Text>
                        </div>
                        <div>
                            <Typography.Text className='ml-[30px] bg-gray-200 p-1.5 border rounded-xl'>{text}</Typography.Text>
                        </div>
                    </div>

            }



        </>
    )
}