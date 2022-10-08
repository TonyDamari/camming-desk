import React from "react";
// import { version as appVersion } from "../../package.json";

const Footer = () => {
    return (
        <footer>
            <p> &copy; Conceptual Life {new Date().getFullYear()}</p>
            {/* <p>V {appVersion}</p> */}
        </footer>
    );
};

export default Footer;
