// import React,{useState,useEffect} from 'react'
import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';

import config from '../config/config';
import state from '../store';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIpicker,ColorPicker,FilePicker,CustomButton,Tab} from '../components';

const Customize = () => {
  const snap=useSnapshot(state)
  const [prompt,setPrompt]=useState("")
  const [file , setFile]=useState(" ")
  const [genratingImg , setGenratingImg] =useState(false)
  const [activeEditorTab , setActiveEditorTab]=useState("")
  const [activeFilterTab,setActiveFilterTab]=useState({
    logoShirt: true,
    stylishShirt: false,
    })
    const generateTabContent=()=>{
      switch(activeEditorTab){
        case "colorpicker":
          return <ColorPicker/>
        case "aipicker":
          return <AIpicker
           prompt={prompt}
           setPrompt={setPrompt}
           genratingImg={genratingImg}
           handleSubmit={handleSubmit}
          />
        case "filepicker":
          return <FilePicker
          file={file}
          setFile={setFile}
          readFile={readFile} />
        default:
            return null
      }
    }
    const handleDecals=(type,result)=>{
      const decalType=DecalTypes[type];
      state[decalType.stateProperty]=result

      if(!activeFilterTab[decalType.filterTab]){
        handleActiveFilterTab(decalType.filterTab)
      }
    }

    const handleActiveFilterTab=(tabName)=>{
      console.log(tabName,"handleActiveFilterTab")
      switch(tabName){
        case "logoShirt":
          state.isLogoTexture=!activeFilterTab[tabName];
          break;
        case "stylishShirt":
          state.isFullTexture=!activeFilterTab[tabName]
          
        default:
          state.isFullTexture=false;
          state.isLogoTexture=true;
          break;   
      }

      setActiveFilterTab((prevState)=>{
        return {
          ...prevState,
          [tabName]:!prevState[tabName]
        }
      })
    }

    const readFile=(type)=>{
         reader(type).then((result)=>
         handleDecals(type,result))
         setActiveEditorTab("")
    }


    const handleSubmit= async(type)=>{
         if(!prompt) return alert("Please enter the prompt")
         try{
          setGenratingImg(true)
          const response = await fetch('http://localhost:5000/openai/generateimage',{
               method:'POST',
               headers:{
                'Content-Type':'application/json'
               },
               body:JSON.stringify({
                  prompt,
               })   
          })

          const data =await response.json()
          if(data.status==400){
            alert(data.error.code)
          }
          handleDecals(type, `data:image/png;base64,${data.photo}`)
        }
        catch(error){
          alert(error)
        }
        finally{
          setGenratingImg(false);
          setActiveEditorTab("")
        }
    }
  return (
    // <div>Customize</div>
    <AnimatePresence>
      {!snap.intro && (
        <>
        <motion.div
        key="custom"
        className="absolute top-0 left-0 z-10"
        {...slideAnimation('left')}
        >
          <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
                </div>
                </div>

        </motion.div>
        <motion.div className="absolute z-10 top-5 right-5"
            {...fadeAnimation}>
        <CustomButton 
              type="filled"
              title="Go Back"
              handleClick={() => state.intro = true}
              customStyles="w-fit px-4 py-2.5 font-bold text-sm"
            />
        </motion.div>
        <motion.div className="filtertabs-container" {...slideAnimation('up')}>
        {FilterTabs.map((tab) => (
                  <Tab 
                    key={tab.name}
                    tab={tab}
                    isFilterTab
                    isActiveTab={activeFilterTab[tab.name]}
                    handleClick={() => handleActiveFilterTab(tab.name)}
                  />
                ))}
        </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customize