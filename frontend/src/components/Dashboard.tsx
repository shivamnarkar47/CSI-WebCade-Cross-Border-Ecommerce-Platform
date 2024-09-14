import { getCookie } from '@/lib/getUser'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const Dashboard = () => {
  const user = getCookie('user')
  const navigate = useNavigate();
  if (user!==null) {
    return (
      <div>Dashboard</div>
    )
  }else{
    return <Navigate to={"/"} replace/>
  }
}

export default Dashboard
