import React from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { headContainerAnimation,slideAnimation,headContentAnimation,headTextAnimation} from "../config/motion";
import { useSnapshot } from 'valtio';
import state from "../store";
import { CustomButton } from '../components';
const Home = () => {
  const snap=useSnapshot(state)
  return (
    <AnimatePresence>
        {snap?.intro  && (
            <motion.section className='home' {...slideAnimation('left')}>
                <motion.header {...slideAnimation('down')}>
                    <img 
                    src='./threejs.png'
                    alt="logo"
                    className="w-8 h-8 object-contain"
                />
                </motion.header>
                <motion.div className="home-content" {...headContentAnimation}>
                    <motion.div {...headTextAnimation}>
                        <h1 className='head-text'>
                            Let's <br className='xl:block hidden'/> Do It
                        </h1>
                    </motion.div>
                    <motion.div {...headContentAnimation} className='flex flex-col gap-5'>
                    <p className='max-w-md font-normal text-gray-600 text-base'>
                            Create your unqiue and excuslive shirts with our brand new 3d customiztion tool
                            <strong> Unleash your imagination</strong> {" "} define your style
                        </p>
                    <CustomButton type="filled" title="customize" handleClick={() => state.intro = false}
                    customStyles="w-fit py-2.5 px-4 font-bold text-sm"/>
                    </motion.div>

                </motion.div>

            </motion.section>
        )}

    </AnimatePresence>
  )
}

export default Home