import React from 'react';
import { useSnapshot } from 'valtio';
import state from "../store";
import {getContrastingColor} from "../config/helpers"

const CustomButton = ({type,title,customStyles,handleClick}) => {
  const snap=useSnapshot(state)

  const genrateStyle=(type)=>{
    if(type=='filled'){
      return {
        backgroundColor:snap.color,
        color:getContrastingColor(snap.color)
      }
    }
   else if(type=='outline'){
      return {
        borderWidth:'1px',
        color:snap.color,
        borderColor:snap.color
      }
    }
  }
  return (
   <button onClick={handleClick}
   style={genrateStyle(type)}
   className={`px-2 py-1.5 flex-1 rounded-md ${customStyles}`} >
    {title}
   </button>
  )
}

export default CustomButton