import React from "react";
import "./style.scss";
function Footer() {
  return (
    <div className="Footer">
      <div className="Footer__container">
        <div className="Footer__cell">
          <ul className="Footer__list">
            <p className="Footer__title">Cofounders</p>
            <li>Andrea Manca</li>
            <li>Luis Ruiz Fernández</li>
          </ul>
        </div>
        <div className="Footer__cell">
          <ul className="Footer__list">
            <p className="Footer__title" >About Codiant</p>
            <li>Pricing</li>
            <li>Courses</li>
            <li>Learn as entertainment</li>
          </ul>
        </div>
        <div className="Footer__cell">
          <ul className="Footer__list">
            <p className="Footer__title">About Codiant</p>
            <li>Help</li>
            <li>Privacy Policy</li>
            <li>Legal Notice</li>
          </ul>
        </div>
      </div>
      <p className="Footer__last">© Codiant 2020</p>
    </div>
  );
}
export default Footer;
