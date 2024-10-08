import React , { useState } from "react";
import Catalog from "./catalog";
import Navbar from "./navbar";



const Main = () => {
    const categories = ["Movies", "TV Series", "Video Games", "Add New"];
    const [activeCategory, setActiveCategory] = useState(categories[0]);

    return(
        <div>
        <Navbar categories={categories} onCategorySelect={setActiveCategory} />
        <Catalog activeCategory={activeCategory} />
      </div>
    )
}

export default Main