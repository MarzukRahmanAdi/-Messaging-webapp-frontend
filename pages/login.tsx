import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Form from '../components/Form'

const login: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    const User = localStorage.getItem("User")
    if(User){
      router.push("/")
    }

  },[])
  
  return (
    <div className='Login_Page'><Form/></div>
  )
}

export default login