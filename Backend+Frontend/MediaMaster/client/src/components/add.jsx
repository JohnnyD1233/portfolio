import React, { useState } from "react";
import "../css/AddItem.css";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [done, setDone] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(title);
      const response = await fetch("http://localhost:5001/api/add/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          releaseYear,
          category,
          description,
          image,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add movie");
      }
      setDescription("");
      setTitle("");
      setReleaseYear("");
      setImage("");
      setDone(`${title}  Has been Added to ${category}`);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="add-item-container">
      <h2 className="add-item-title">Add a New Item</h2>
      <form name="addForm" className="add-item-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Capture the selected category
            required
            className="form-input"
          >
            <option value="">Select Category</option>
            <option value="Movies">Movies</option>
            <option value="TV-Series">TV Series</option>
            <option value="Video-Games">Video Games</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Deadpool and Wolverine"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="releaseYear">Release Date:</label>
          <input
            id="releaseYear"
            name="releaseYear"
            type="number"
            placeholder="2024"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
            max="2025"
            min="1990"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Epic Fight ...."
            className="form-textarea"
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="image">Image URL:</label>
          <input
            id="image"
            name="image"
            value={image}
            type="text"
            placeholder="https://m.media-amazon.com/images.jpg"
            onChange={(e) => setImage(e.target.value)}
            required
            className="form-input"
          />
        </div>

        {error && <p className="error-message">{error}</p>}
        {done && <p className="done-message">{done}</p>}
        <button type="submit" className="submit-button">
          Add Item
        </button>
      </form>
      <a href="/" className="back-link">
        Go Back
      </a>
    </div>
  );
};

export default AddItem;
