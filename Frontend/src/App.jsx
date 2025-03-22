import { SignedIn, SignedOut, SignIn, UserButton } from '@clerk/clerk-react'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import HeroPage from './pages/HeroPage'
import SignUpPage from './pages/SignUpPage'
import StudentDashboard from './pages/StudentDashboard'
import Protected from './components/Protected'
import SignInPage from './pages/SignInPage'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        {/* public pages */}
        <Route index element={<HeroPage />} />
        <Route path='signup' element={<SignUpPage />} />
        <Route path='signin' element={<SignInPage />} />

        {/* protected pages */}
        <Route element={<Protected page_for_role={'student'} />}>
          <Route path='dashboard' element={<StudentDashboard />} />
        </Route>
        <Route element={<Protected page_for_role={'admin'} />}>
          <Route path='dashboard-admin' element={<StudentDashboard />} />
        </Route>
      </Route>
    </Routes>
  )
}

export default App

