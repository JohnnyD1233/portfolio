import React, { useEffect, useState } from "react";
import fetchItems from "../js/fetchItems";
import EditItem from "./edit";
import "../css/catalog.css";

const Catalog = ({ activeCategory }) => {
  const [tvSeriesData, setTvSeriesData] = useState([]);
  const [moviesData, setMoviesData] = useState([]);
  const [gamesData, setGamesData] = useState([]);

  // Toggle edit menu visibility
  const toggleEditMenu = (event) => {
    const editMenu = event.currentTarget
      .closest(".details")
      .querySelector(".edit-closed");
    const toggleItems = event.currentTarget
      .closest(".details")
      .querySelectorAll(".toggle-edit");
    const isEditMenuHidden =
      editMenu.style.display === "none" || editMenu.style.display === "";
    editMenu.style.display = isEditMenuHidden ? "block" : "none";
    toggleItems.forEach((item) => {
      item.style.display = isEditMenuHidden ? "none" : "block";
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchItems(activeCategory);
      if (activeCategory === "Movies") {
        setMoviesData(data);
      } else if (activeCategory === "Video-Games") {
        setGamesData(data);
      } else {
        setTvSeriesData(data);
      }
    };
    fetchData();
  }, [activeCategory]);

  const dataSources = {
    Movies: moviesData,
    "TV-Series": tvSeriesData,
    "Video-Games": gamesData,
  };
  const dataToDisplay = dataSources[activeCategory];

  // Toggle submenu visibility
  const openMenu = (event) => {
    const clickedImage = event.currentTarget;
    const detailsDiv = clickedImage.nextElementSibling;
    if (detailsDiv) {
      detailsDiv.style.display =
        detailsDiv.style.display === "block" ? "none" : "block";
    }
  };
  // Closing all menus
  const closeAllMenus = () => {
    const menus = document.querySelectorAll(".details");
    menus.forEach((menu) => {
      menu.style.display = "none";
    });
  };

  const RenderItems = (items) => {
    return items.map((item) => (
      <div key={item._id} className="item-container">
        <img
          className="previewImage"
          src={item.image}
          onClick={openMenu}
          alt={item.title}
        />
        <div className="closed details" style={{ display: "none" }}>
          <span className="closeMenu" onClick={closeAllMenus}>
            X
          </span>
          <h2 className="detailsTitle toggle-edit">{item.title}</h2>
          <img className="detailsImg" src={item.image} alt={item.title} />

          {item.releaseYear ? (
            <h3 className="pDlc toggle-edit">
              Release Year: {item.releaseYear}
            </h3>
          ) : (
            <h3 className="pDlc toggle-edit">DLC None/Not added</h3>
          )}

          {item.description ? (
            <p className="pDetails toggle-edit">{item.description}</p>
          ) : (
            <p className="pDetails toggle-edit">Add Details</p>
          )}

          {item.trailer ? (
            <a className="pTrailer toggle-edit" href={item.trailer}>
              Link to Trailer
            </a>
          ) : (
            <a className="pTrailer toggle-edit" href="#">
              Add Trailer
            </a>
          )}
          <button className="editOne" onClick={toggleEditMenu}>
            Edit
          </button>
          <div>
            <EditItem item={item} />
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="main">
      {dataToDisplay && dataToDisplay.length > 0 ? (
        <div className="container">{RenderItems(dataToDisplay)}</div>
      ) : (
        <h1 className="categoryTitle">Nothing to display!</h1>
      )}
    </div>
  );
};

export default Catalog;
