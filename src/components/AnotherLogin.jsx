import React from 'react'
import { FaFacebook,FaInstagram,FaGoogle,FaTwitter } from 'react-icons/fa'

export const AnotherLogin = () => {
    return (
        <div className="flex justify-center gap-x-7 mt-5 text-xl border-t-teal-50 items-center text-pink-500">
            <div className="box-border size-8 border-2 p-0 flex justify-center items-center">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
            </div>
            <div className="box-border size-8 border-2 p-0 flex justify-center items-center">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaFacebook />
                </a>
            </div>
            <div className="box-border size-8 border-2 p-0 flex justify-center items-center">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaGoogle />
                </a>
            </div>
            <div className="box-border size-8 border-2 p-0 flex justify-center items-center">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <FaTwitter />
                </a>
            </div>
        </div>
    )
}

export default AnotherLogin
