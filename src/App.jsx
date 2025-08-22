
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Loginpege from './pages/Loginpege'
import Home from './pages/Home'
import UserLayout from './componetns/userLayout'
import Beem from './pages/Beem'

function App() {

  return (
    <>

  <Routes>
          <Route path='/' element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="beem" element={<Beem  />} />

          </Route>

 <Route path="login" element={<Loginpege  />} />

         
 <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

       
    </>
  )
}

export default App
