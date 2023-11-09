import React, { useContext, useEffect, useRef, useState } from 'react';
import { FaPhone, FaVideo } from "react-icons/fa";
import { BsThreeDots } from 'react-icons/bs';
import InsideChat from './InsideChat/InsideChat';
import './InsideChat/InsideChat.css'
import MessegeBox from './MessegeBox/MessegeBox';
import { authContext } from '../AuthProvider/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import { io } from 'socket.io-client';



const ChatItem = ({setIsOpen,isOpen,information,uInfo}) => {
    const {user}=useContext(authContext)

    const login = uInfo.filter(info=>info.email===user.email)
        const currentUser=login[0];
        const singleUser=information;
    const {_id,img,FirstName,LastName}=information;
    const {data:messageData=[],refetch}=useQuery({
        queryKey:['messageData',currentUser?._id,singleUser?._id],
        queryFn:()=>fetch(`http://localhost:5000/getMessages/${currentUser._id}/${singleUser?._id}`)
            .then(res=>res.json())
    })
    // console.log(messageData)
    
    return (
        <div>
            <div className='flex justify-between bg-slate-100 p-3 rounded-xl'>
                <div className='flex'>
                    <div className="avatar-group -space-x-6 mr-2">
                        <div className="avatar">
                            <div className="w-12">
                                <img src={img} alt='' />
                            </div>
                        </div>
                    </div>
                    <div className='grid items-center'>
                        <p className='font-bold'>{FirstName} {LastName}</p>
                    </div>
                </div>
                <div className='flex gap-3'>
                    <div className='grid items-center hover:bg-stone-400 p-1 rounded-full'>
                        <FaPhone size={20}></FaPhone>
                    </div>
                    <div className='grid items-center hover:bg-stone-400 p-1 rounded'>
                        <FaVideo size={20}></FaVideo>
                    </div>
                    <div className='grid items-center hover:bg-stone-400 rounded-full p-1'>
                        <BsThreeDots size={20} onClick={()=>setIsOpen(!isOpen)}></BsThreeDots>
                    </div>
                </div>

            </div>
                <div className=' height truncate scrollbar' >
                    {
                        messageData && messageData?.map(messages=><InsideChat key={messages._id} messages={messages} currentUser={currentUser} information={information} refetch={refetch}></InsideChat>)
                    }
                </div>
                <div>
                    <MessegeBox isOpen={isOpen} setIsOpen={setIsOpen} uInfo={uInfo} information={information} refetch={refetch}></MessegeBox>
                </div>
        </div>
    );
};

export default ChatItem;