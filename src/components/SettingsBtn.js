import React from 'react'
import { IoSettingsSharp } from "react-icons/io5";
import "./SettingsBtn.css"

function SettingsBtn({ onClick }) {
    return (

        <button className="settingsBtn" onClick={onClick}><IoSettingsSharp /></button>

    )
}

export default SettingsBtn
