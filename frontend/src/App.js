import LandingPage from './pages/landing/LandingPage'
import HttpCodePage from './pages/http-code/HttpCodePage'
import { Routes, Route, Navigate, useParams, Outlet } from 'react-router-dom'
import LoginPage from './pages/login/LoginPage'
import SignupPage from './pages/signup/SignupPage'
import DashboardPage from './pages/dashboard/DashboardPage'
import ProfilePage from './pages/profile/ProfilePage'
import { useSelector } from 'react-redux'
import { logout } from './actions/auth'
import { useDispatch } from 'react-redux'
import React from 'react'
import CategoryListPage from './pages/category/CategoryListPage'
import CategoryResultsPage from './pages/category-results/CategoryResultsPage'
import CategoryPage from './pages/category-page/CategoryPage'

function App() {
  function ChildTwo() {
    let { id, word_id } = useParams()
    return (
      <div>
        <h3>ID: {id}</h3>
        <h3>Word ID: {word_id}</h3>
      </div>
    )
  }

  const { isLoggedIn } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const ProtectedRoute = ({ isLoggedIn, redirectPath = '/' }) => {
    if (!isLoggedIn) {
      return <Navigate to={redirectPath} replace />
    }
    return <Outlet />
  }

  const LogoutPage = (isLoggedIn) => {
    if (isLoggedIn) {
      dispatch(logout())
      return <Navigate to="/" />
    }
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login/" element={<LoginPage />} />
      <Route path="/register/" element={<SignupPage />} />
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
        <Route path="/dashboard/" element={<DashboardPage />} />
        <Route path="/profile/:id/" element={<ProfilePage />} />
        <Route path="/category/" element={<CategoryListPage />} />
        <Route path="/category/:category_id/" element={<CategoryPage />} />
        <Route
          path="/category/results/:category_id/"
          element={<CategoryResultsPage />}
        />
        <Route path="/category/:id/word/:word_id/" element={<ChildTwo />} />
        <Route
          path="/logout/"
          element={<LogoutPage isLoggedIn={isLoggedIn} />}
        />
      </Route>
      <Route path="*" element={<HttpCodePage />} />
    </Routes>
  )
}

export default App
