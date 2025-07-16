import React from "react";
import { ArtistsComponent } from '../components/ArtistsComponent'
import { NavBar } from "../components/NavbarComponent";
import FooterSection from "../components/FooterSection";

export const CollectionPage = () => {
  return (
    <div>
      <NavBar/>
      <div className="pt-10 font-extrabold text-5xl text-pink-300">
        All Artist
      </div>
      <div className="w-full h-full">
        <ArtistsComponent />
      </div>
      <FooterSection/>
    </div>
  )
}

export default CollectionPage
