import React, { useEffect, useRef } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { format } from 'timeago.js';
const InsideChat = ({ messages, currentUser, information }) => {
    const { message, sender, senderFName, image } = messages;

    const chatRef = useRef(null)


    useEffect(() => {
        chatRef.current.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <PhotoProvider>
            <div>
                {
                    currentUser?._id === sender ? <div ref={chatRef} className="chat chat-end">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">

                            </div>
                        </div>
                        <div className="chat-header">
                            <time className="text-xs opacity-50">{format(messages.time)}</time>
                        </div>
                        {
                            messages?.message ? <div className="chat-bubble font-bold">{message}</div> : <div className="chat-bubble w-80 bg-transparent"><PhotoView src={image}><img className='h-48 w-80 rounded-xl' src={image} alt="" /></PhotoView></div>
                        }

                        <div className="chat-footer opacity-50">
                            Seen at 12:46
                        </div>
                    </div> : <div ref={chatRef} className="chat chat-start">
                        <div className="chat-image avatar">
                            <div className="w-10 rounded-full">
                                <img src={information?.img} alt='' />
                            </div>
                        </div>
                        <div className="chat-header">
                            {senderFName}
                            
                        </div>
                        {
                            messages?.message ? <div className="chat-bubble bg-slate-300 text-black font-bold">{message}
                            </div> : <div className="chat-bubble bg-transparent w-80"><PhotoView src={image}><img className='h-48 w-80 rounded-xl' src={image} alt="" /></PhotoView>
                            </div>
                        }

                        <div className="chat-footer">
                            <time className="text opacity-50">{format(messages.time)}</time>
                        </div>
                    </div>
                }


            </div>
        </PhotoProvider>
    );
};

export default InsideChat;