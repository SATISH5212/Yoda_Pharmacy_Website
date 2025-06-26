import { useState } from 'react'
import Login from './login'
import SignIn from './signin'

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)

  return (
    <>
      {isLogin ? (
        <Login onSwitch={() => setIsLogin(false)} />
      ) : (
        <SignIn onSwitch={() => setIsLogin(true)} />
      )}
    </>
  )
}



