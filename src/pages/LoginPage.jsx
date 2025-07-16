import React from 'react'
import { NavBar } from '../components/NavbarComponent'
import { FooterSection } from '../components/FooterSection'
import {LoginComponent} from'../components/LoginComponent'
export const LoginPage = () => {
  return (
    <div>
    <NavBar/>
      <LoginComponent/>
      <FooterSection/>
    </div>
  )
}

export default LoginPage
