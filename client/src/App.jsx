import Home from './pages/Home'
import Customize from './pages/Customize'
import Canvas from './canvas'
function App() {
  return (
    <main className='app transition-all ease-in'>
      <Home/>
      <Customize/>
      <Canvas/>
      {/* 
      <Customize/> */}
    </main>
  )
}

export default App
