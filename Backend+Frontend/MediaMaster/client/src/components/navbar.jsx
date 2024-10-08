import React from "react";
import "../css/navbar.css";

const Navbar = ({ onCategorySelect }) => {
  const categories = ["Movies", "TV-Series", "Video-Games"];

  return (
    <nav className="navbar">
      <ul className="menu-bar">
        {categories.map((category, index) => (
          <li key={index} onClick={() => onCategorySelect(category)}>
            {category}
          </li>
        ))}
        <li><a className="link-add" href="/add">Add New</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
