import React, { useEffect, useState } from 'react';


const Friends = ({ info, HandleClick }) => {

  return (
    <div className='grid '>
      <ul onClick={() => HandleClick(info)} role="list" className="p-3 divide-y divide-slate-200 cursor-pointer">
        <li className="flex first:pt-0 last:pb-0 hover:bg-blue-200 p-3 pt-2 rounded-xl">
          <img className="h-10 w-10 rounded-full hover:w-12" src={info?.img} alt="" />
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-medium text-slate-900">{info?.FirstName} {info?.LastName}</p>
            <p className="text-sm text-slate-500 truncate">{info?.email}</p>
          </div>
        </li>
        <hr />
      </ul>
    </div>
  );
};

export default Friends;