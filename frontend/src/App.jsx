


import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import HomePage from './pages/home/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Route, Routes } from 'react-router-dom'
import { userAuthStore } from './store/authUser'
import { useEffect } from 'react'
// import Footer from './components/Footer'

function App() {
  const { user, isCheckingAuth, authCheck } = userAuthStore()
  console.log("auth user is here:", user);

  useEffect(() => {
    authCheck();
  }, []);
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
      <Footer />
      <Toaster />
    </>


  )
}

export default App
