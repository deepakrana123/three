import React,{useRef} from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from "../store";

const CameraGig = ({children}) => {
  const group = useRef()
   const snap=useSnapshot(state)
  //  set model rotation easliy

  useFrame((state,delta)=>{
    const isBreakpoint=window.innerWidth<=1260;
    const isMobile=window.innerWidth<=600

    let targetPosititon=[-0.4,0,2];
    if(snap.intro){
      if(isBreakpoint) targetPosititon=[0,0,2]
      if(isMobile) targetPosititon=[0,0.2,2.5]

    }
    else{
      if(isMobile) targetPosititon=[0,0,2.5]
      else targetPosititon=[0,0,2]
    }

    easing.damp3(state.camera.position , targetPosititon , 0.25,delta)
    easing.dampE(
      group.current.rotation,
      [state.pointer.y/10,-state.pointer.x/5,0],
      0.25,
      delta
    )
  })

 
  return <group ref={group}>
    {children}
    
    </group>
}

export default CameraGig