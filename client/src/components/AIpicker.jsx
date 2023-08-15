import React from 'react'
import CustomButton from './CustomButton'

const AIpicker = ({prompt,setPrompt,genratingImg,handleSubmit}) => {
  return (
   <div className='aipicker-container'>
    <textarea 
    placeholder="Mahakal sab batayega"
    rows={5}
    value={prompt}
    className='aipicker-textarea'
    onChange={(e)=>setPrompt(e.target.value)}/>
    <div className="flex flex-wrap gap-3">
    {genratingImg ? (
          <CustomButton 
            type="outline"
            title="Asking AI..."
            customStyles="text-xs"
          />
        ) : (
          <>
            <CustomButton 
              type="outline"
              title="AI Logo"
              handleClick={() => handleSubmit('logo')}
              customStyles="text-xs"
            />

            <CustomButton 
              type="filled"
              title="AI Full"
              handleClick={() => handleSubmit('full')}
              customStyles="text-xs"
            />
          </>
        )}

    </div>
   </div>
  )
}

export default AIpicker