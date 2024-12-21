import React from 'react'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import MarkAttendence from './components/MarkAttendence'
import EmployeeDocuments from './components/EmployeeDocuments'
import HomePage from './pages/HomePage'
import Deined from './pages/Deined'
import AdminDashboard from './AdminDashboard/AdminDashboard'
import RequireAuth from './Helpers/Auth/RequireAuth'
import NotRequireAuth from './Helpers/Auth/NotRequireAuth'
import Profile from './pages/users/Profile'
import EditProfile from './pages/users/EditProfile'
import Error from './pages/NotFound'
import CreateEmployee from './AdminDashboard/CreateEmployee'

function App() {
  return (
    <div className='App h-[100vh]  flex justify-center items-center'>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/contactus' element={<Contact />} />
        <Route path='/denied' element={<Deined />} />
        {/* Authenticated Routes */}
        <Route element={<NotRequireAuth />}>
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
          <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
          <Route path='/profile/me' element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path='/markAttendence' element={<MarkAttendence />} />
          <Route path='/documents' element={<EmployeeDocuments />} />

        </Route>
        {/* Admin Dashboard */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path='/add' element={<CreateEmployee/>} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div >
  )
}

export default App