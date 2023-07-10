import React from "react";
import './style1.css'

export default function Footer() {
  return (
    <footer>
      <div className="foot">
      <div className="copyright text-center">
        <h5>
        &copy; {new Date().getFullYear()} Beleaf. All rights reserved.
        </h5></div>
        </div>
    </footer>
  );
}
