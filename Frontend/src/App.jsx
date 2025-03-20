import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import HeroPage from './pages/HeroPage'
import SignUpPage from './pages/SignUpPage'
import StudentDashboard from './pages/student/StudentDashboard'
import Protected from './components/Protected'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public pages */}
        <Route index element={<HeroPage />} />
        <Route path='signup' element={<SignUpPage />} />

        {/* protected pages */}
        <Route element={<Protected page_for_role={'student'} />}>
          <Route path='dashboard' element={<StudentDashboard/>}/>
        </Route>

      </Route>
    </Routes>
  )
}  

export default App

