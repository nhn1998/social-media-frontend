import React from 'react';
// import './ActiveFriends.css'

const ActiveFriends = ({active}) => {
    return (
        <div>
            <div className='flex gap-4 truncate scrollbar '>
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img src={active?.loginUser?.img} alt=''/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ActiveFriends;