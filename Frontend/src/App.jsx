import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import HeroPage from './pages/HeroPage'
import SignUpPage from './pages/SignUpPage'
import StudentDashboard from './pages/StudentDashboard'
import Protected from './components/Protected'
import SignInPage from './pages/SignInPage'
import AdminDashboard from './pages/AdminDashboard'
import Management from './pages/Management'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div>
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
            <Route path='dashboard-admin' element={<AdminDashboard />} />
          </Route>
          <Route element={<Protected page_for_role={'admin'} />}>
            <Route path='management' element={<Management />} />
          </Route>

        </Route>
      </Routes>
      <Toaster position="top-right"  reverseOrder={false}/>
    </div>
  )
}

export default App

