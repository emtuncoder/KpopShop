import React from 'react'
import {UserProfileComponent} from "../components/UserProfileComponent";
import {NavBar} from "../components/NavbarComponent";
import {FooterSection} from "../components/FooterSection";
const UserProfile = () => {
    return (
        <div>
            <NavBar />
            <div>
                <UserProfileComponent/>
            </div>
            <FooterSection />
        </div>
    )
}

export default UserProfile
