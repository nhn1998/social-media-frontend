import React, { useContext, useEffect, useRef, useState } from 'react';
import { AiOutlinePlusCircle, AiFillGift } from 'react-icons/ai';
import { IoMdSend } from 'react-icons/io';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { BiEdit } from 'react-icons/bi';
import { BsFillEmojiSmileFill } from 'react-icons/bs';
import './MessegeBox.css'
import { authContext } from '../../AuthProvider/AuthProvider';

const MessegeBox = ({isOpen, uInfo,information,refetch}) => {
    const [message,setMessage]=useState('')
    const [img,setImg]=useState('')
    const {user}=useContext(authContext)
    const inputRef = useRef(null)

    // set message in db
    const HandleClick=(e)=>{
        console.log(message)
        const login = uInfo.filter(info=>info.email===user.email)
        const sender=login[0]._id;
        const senderEmail = login[0].email
        const senderFName = login[0].FirstName
        const senderLName = login[0].LastName
        const reciever= information._id
        const userMessage={
            message,
            senderFName,
            senderLName,
            senderEmail,
            sender,
            time:new Date(),
            reciever,
        }
        fetch('http://localhost:5000/message',{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(userMessage)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.acknowledged)
            console.log(data)
            refetch()
            setMessage('')    
            
        })
    }
    // send img as message
    const HandleImg=(e)=>{
        const selectedImg=e.target.files[0]
        const login = uInfo.filter(info=>info.email===user.email)
        const currentUser=login[0]._id;
        const reciever= information._id
        setImg(selectedImg)
        const formData= new FormData();
        formData.append('image',selectedImg)
        fetch('https://api.imgbb.com/1/upload?key=5da252869bb0313bcea6da6b65d7a4f1',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                console.log(data)
                const pic={
                    image:data?.data?.url,
                    sender:currentUser,
                    reciever:reciever,
                    time:new Date()
                }
                fetch(`http://localhost:5000/images`,{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(pic)
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    refetch()
                })
            }
        })
    }

    

    const handleKeypress = e => {
        //it triggers by pressing the enter key
      if (e.keyCode === 13) {
        HandleClick();
      }
    };
    return (
        <div className='flex justify-between'>
            <div className='flex '>
                <div title='Plus' className='grid items-center hover:text-white hover:bg-slate-500 p-3 rounded-xl'>
                    <AiOutlinePlusCircle size={30}></AiOutlinePlusCircle>
                </div>
                <div title='attach photo' className=' grid items-center hover:bg-slate-500 p-3 rounded-xl hover:text-white'>
                    <label htmlFor="photo"><HiOutlinePhotograph size={30}></HiOutlinePhotograph></label>
                    <input onChange={HandleImg} className='hidden' type="file" name="img" id="photo" />
                </div>
                <div title='edit' className='grid items-center hover:bg-slate-500 p-3 rounded-xl hover:text-white'>
                    <BiEdit size={30}></BiEdit>
                </div>
                <div title='Gift' className='grid items-center hover:bg-slate-500 p-3 rounded-xl hover:text-white'>
                    <AiFillGift size={30}></AiFillGift>
                </div>
            </div>
            <div className='flex'>  
                <input ref={inputRef} value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={handleKeypress} type="text" name='write' placeholder="Aa" className={`input input-bordered mt-2 input-black rounded-2xl font-bold ${isOpen?'lg:w-96':'inbox'}`} />
                <div className='grid items-center ml-1'>
                    <BsFillEmojiSmileFill size={30}></BsFillEmojiSmileFill>
                </div>
                <div className={`text-slate-600 hover:bg-slate-500 p-2 rounded-xl hover:text-white grid items-center ml-1`}>
                    <button title='Send' type='submit' onClick={HandleClick}><IoMdSend size={30}></IoMdSend></button>
                </div>
            </div>


        </div>
    );
};

export default MessegeBox;