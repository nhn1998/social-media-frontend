import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsThreeDots, } from "react-icons/bs";
import { FaRegEdit } from "react-icons/fa";
import ActiveFriends from '../ActiveFriends/ActiveFriends';
import Friends from '../ActiveFriends/Friends/Friends';
import { authContext } from '../AuthProvider/AuthProvider';
import ChatItem from '../ChatItem/ChatItem';
import FriendInfo from './FriendInfo/FriendInfo';


const Home = () => {
    const { user } = useContext(authContext)
    const [isOpen, setIsOpen] = useState(true)
    const [uInfo, setUInfo] = useState([])
    const [information, setInformation] = useState('')
    // console.log(activeUser)
    

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUInfo(data))
            .then(err=>console.log(err))
    }, [])
    
    const HandleClick = id => {
        setInformation(id)
    }
    useEffect(()=>{
        if(uInfo && uInfo.length >0){
            setInformation(uInfo[0])
            
        }
    },[uInfo])
    return (
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-2 '>
            <div className='h-100vh'>
                <div className='flex justify-between'>
                    {
                        uInfo && uInfo.filter(info => info.email === user.email).map(info => <div key={info._id} className='flex'>
                            <div className="avatar-group -space-x-6">
                                <div className="avatar">
                                    <div className="w-12">
                                        <img src={info?.img} alt='' />
                                    </div>
                                </div>
                            </div>
                            <div className='grid items-center'>
                                <p className='font-bold'>{info.FirstName} {info.LastName}</p>
                            </div>
                        </div>)
                    }
                    <div className='flex gap-2'>
                        <BsThreeDots className='hover:bg-green-200 p-1 rounded-2xl' size={30}></BsThreeDots>
                        <FaRegEdit className='hover:bg-green-200 p-1 rounded-2xl' size={30}></FaRegEdit>
                    </div>
                </div>
                <div className='mt-5'>
                    <input type="text" placeholder='Search' className="input input-bordered input-success w-full max-w-xs rounded-xl" />
                </div>
                <div className='mt-5 mb-2 flex gap-4 truncate scrollbar'>
                    <ActiveFriends></ActiveFriends>
                </div><hr />
                <div className='mt-10 h-48 lg:h-80 truncate scrollbar '>
                    {
                        uInfo && uInfo.filter(info => info.email !== user.email).map(info => <Friends key={info._id} info={info} HandleClick={HandleClick}></Friends>)
                    }
                </div>
            </div>
            {/* another item will added here */}
            <div className='col-span-3 grid lg:grid-cols-3'>
                <div className={`${isOpen ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                    {
                        information ? <ChatItem setIsOpen={setIsOpen} isOpen={isOpen} information={information} uInfo={uInfo}></ChatItem> : <div className='text-center grid content-center h-48 lg:h-full text-3xl font-bold bg-green-50 '>Please Select a person to do Chat</div>
                    }
                </div>
                <div className={`${isOpen ? 'visible' : 'hidden'}`}>
                    <div>
                        <FriendInfo information={information} uInfo={uInfo}></FriendInfo>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;