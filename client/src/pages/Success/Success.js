import React from 'react';
import "./success.css";
// import { TUTOR_BY_ID } from '../../utils/queries';

import Auth from "../../utils/auth"

export default function Success() {

    return (
        <div className="success-main">
            <h1>Thank you {Auth.getProfile().data.firstName},</h1>
            <h2>Your Payment has been reveived!</h2>
            <h3>Please check your emails the confirmation!</h3>
        </div>
    )
}
