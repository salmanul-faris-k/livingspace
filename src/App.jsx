
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Loginpege from './pages/Loginpege'
import Home from './pages/Home'
import Beem from './pages/Beem'
import UserLayout from './components/UserLayout'
import Pile from './pages/Pile'
import Lintel from './pages/lintel'
import Sunshade from './pages/Sunshade'
import BlockWallCalculator from './pages/BlockLength'
import Plastering from './pages/Plastering'
import DevelopmentMenu from './pages/ConstructionMenu'
import Rubble from './pages/Rubble'
import Demo from './pages/Demo'

function App() {

  return (
    <>

      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<Home />} />
          <Route path="beem" element={<Beem />} />
          <Route path="pile" element={<Pile />} />
          <Route path="lintel" element={<Lintel />} />
          <Route path="sunshade" element={<Sunshade />} />
          <Route path="BlockWork" element={<BlockWallCalculator/>} />
          <Route path="menu" element={<DevelopmentMenu />} />
          <Route path="Plastering" element={<Plastering />} />
                    <Route path="Rubble" element={<Rubble />} />
                    <Route path="demo" element={<Demo />} />


        </Route>

        <Route path="login" element={<Loginpege />} />


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>


    </>
  )
}

export default App
