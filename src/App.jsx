import React, { Suspense, lazy } from 'react'
import Login from './pages/Login'
import { Navigate, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
const HomePage = lazy(() => import("./pages/HomePage"))
import Deined from './pages/Deined'
const AdminDashboard = lazy(() => import('./AdminDashboard/AdminDashboard'))
import RequireAuth from './Helpers/Auth/RequireAuth'
import NotRequireAuth from './Helpers/Auth/NotRequireAuth'
import Profile from './pages/users/Profile'
import EditProfile from './pages/users/EditProfile'
import Error from './pages/NotFound'
import Contact from "./pages/Contact"
import EmployeeManagementApp from './EmployeeDashboard/employeeData/EmployeeManagement'
import EmployeeDetails from './EmployeeDashboard/employeeData/EmployeeDetails'
import Checkout from './AdminDashboard/Payment/Checkout'
import ForgetPassword from './pages/Password/FrogetPassword'
import ResetPassword from './pages/Password/ResetPassword'
const EmployeeSidebar = lazy(() => import('./EmployeeDashboard/Sidebar/EmployeeSidebar'))

function App() {
  const Loading = () => (
    <div id="loader-wrapper">
      <div className="loader">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
  return (
    <div className='w-[100%] flex justify-center items-center select-none'>
      <Routes>
        <Route
          path='/'
          element=
          {<Suspense fallback={<Loading />}>
            <HomePage />
          </Suspense>}
        />
        <Route path='/contactus' element={<Contact />} />
        <Route path='/denied' element={<Deined />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        {/* Authenticated Routes */}
        <Route element={<NotRequireAuth />}>
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route element={<RequireAuth allowedRoles={["USER", "ADMIN"]} />}>
          <Route path='/profile/me' element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route
            path='/employees/*' element=
            {<Suspense fallback={<Loading />}>
              <EmployeeSidebar />
            </Suspense>}
          />
        </Route>
        {/* Admin Dashboard */}
        <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
          <Route
            path="/admin/*"
            element=
            {
              <Suspense fallback={<Loading />}>
                <AdminDashboard />
              </Suspense>
            } />
          <Route path='/checkout' element={<Checkout />} />
          <Route path="/" element={<Navigate to="employee" />} />
          <Route path="/employee" element={<EmployeeManagementApp />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </div >
  )
}

export default App
