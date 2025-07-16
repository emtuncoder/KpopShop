import React from 'react'
import { RegisterComponent } from '../components/RegisterComponent'
import { NavBar } from '../components/NavbarComponent'
import { FooterSection } from '../components/FooterSection'
export const RegisterPage = () => {
  return (
    <div>
      <NavBar/>
      <RegisterComponent/>
      <FooterSection/>
    </div>
  )
}

export default RegisterPage
