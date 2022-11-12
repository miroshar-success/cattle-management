import React from "react";
import { Link } from "react-router-dom";

export default function NavbarLink({ divStyle, path, text }) {
  return (
    <div className={divStyle}>
      <Link  to={path}>
        {text}
      </Link>
    </div>
  );
}
