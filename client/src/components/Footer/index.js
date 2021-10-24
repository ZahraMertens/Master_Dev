import React from "react";
import "./footer.css";

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wrapper">
        <div className="row justify-content-center align-middle">
          <div className="col">
              <h1 className="footer-header">Follow Us</h1>
              <FaInstagram size={42} className="footer-icon"/>
              <FaTwitter size={42} className="footer-icon" />
              <FaFacebook size={42} className="footer-icon" />
          </div>
          <div className="col">
              <h1 className="footer-header">Help</h1>
              <p className="p-footer">Help centre</p>
              <p className="p-footer">Contact</p>
          </div>
          <div className="col">
                <h1 className="footer-header">About Us</h1>
                <p className="p-footer">About Us</p>
                <p className="p-footer">Terms and Conditions</p>
                <p className="p-footer">Privacy Policy</p>
          </div>
        </div>
        <div className="row">
            <div className="col">
                <h1 className="copyright">© 2021 Master Dev</h1>
            </div>
        </div>
      </div>
    </footer>
  );
}
