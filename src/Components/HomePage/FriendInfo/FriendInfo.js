import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { authContext } from '../../AuthProvider/AuthProvider';


const FriendInfo = ({information,uInfo}) => {

    const {user}=useContext(authContext)
    const [isCollapse,setIsCollapse]=useState(false)


    const login = uInfo.filter(info=>info?.email===user?.email)
        const currentUser=login[0];
        const singleUser=information

        const {data:messageData=[],refetch}=useQuery({
            queryKey:['messageData',currentUser?._id,singleUser?._id],
            queryFn:()=>fetch(`http://localhost:5000/getMessages/${currentUser?._id}/${singleUser?._id}`)
                .then(res=>res.json())
        })
    return (
        <PhotoProvider>
            <div className=''>
            <div className='avatar flex justify-center items-center'>
                <div className='rounded-full mt-5 w-16'>
                    <img src={information?.img} alt="" />
                </div>
            </div>
            <h1 className='text-center text-green-600 font-bold'>Active</h1>
            <h1 className='font-bold text-center text-xl'>{information?.FirstName} {information?.LastName}</h1>
            <div className='mt-5 flex justify-between'>
                <h1 className='font-bold'>Customise Chat</h1>
                <div className='grid items-center font-bold hover:bg-slate-300 p-2 hover:rounded-full'>
                <AiOutlineDown></AiOutlineDown>
                </div>
            </div>
            <div className='mt-2 flex justify-between'>
                <h1 className='font-bold'>Privacy and Policy</h1>
                <div className='grid items-center font-bold hover:bg-slate-300 p-2 hover:rounded-full'>
                <AiOutlineDown></AiOutlineDown>
                </div>
            </div>
            <div className='mt-2 flex justify-between' id='this'>
                <h1 className='font-bold'>Shared Media</h1>
                <div onClick={()=>setIsCollapse(!isCollapse)} className='grid items-center font-bold hover:bg-slate-300 p-2 hover:rounded-full'>
                    {
                        isCollapse ? <AiOutlineDown></AiOutlineDown>:<AiOutlineUp></AiOutlineUp>
                    }

                </div>
            </div>
            <div className={`grid grid-cols-3 gap-2 mt-4 truncate scrollbar h-64 transition duration-700 ease-in-out ${isCollapse ? 'visible':'hidden'}`}>
                {
                    messageData && messageData?.map(messages=>messages?.image?<PhotoView key={messages?.image} src={messages?.image}><img key={messages?._id} className='h-32 w-32 rounded-xl' src={messages?.image} alt="" /></PhotoView>:<div key={messages?._id} className='hidden'></div> )
                }
            </div>
            
        </div>
        </PhotoProvider>
    );
};

export default FriendInfo;