import { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

export default function StorePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = async (formData) => {
    try {
      const response = await axios.post("http://localhost:5005/api/products/new", {
        name: formData.get("name"),
        description: formData.get("description"),
        image: formData.get("image"),
        rentalPrice: parseFloat(formData.get("rentalPrice")),
        stock: parseInt(formData.get("stock")),
      });

      console.log("Product Created:", response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div style={{ paddingTop: "95PX" }}>
      <p>Store</p>
      <button onClick={handleButtonClick}>Add Product</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleFormSubmit(formData);
              }}
            >
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
              <label htmlFor="description">Description</label>
              <input type="text" id="description" name="description" required />
              <label htmlFor="image">Image</label>
              <input type="text" id="image" name="image" />
              <label htmlFor="rentalPrice">Rental Price</label>
              <input type="number" id="rentalPrice" name="rentalPrice" required />
              <label htmlFor="stock">Stock</label>
              <input type="number" id="stock" name="stock" required />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
