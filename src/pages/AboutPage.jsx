import React from 'react'
import AboutComponent from '../components/AboutComponent'
import { NavBar } from '../components/NavbarComponent'
import { FooterSection } from '../components/FooterSection'

const AboutPage = () => {
    return (
        <div>
            <NavBar />
            <AboutComponent />
            <FooterSection />
        </div>
    )
}

export default AboutPage
