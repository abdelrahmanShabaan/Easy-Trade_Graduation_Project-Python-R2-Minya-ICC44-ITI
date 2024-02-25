
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SlideBarBuyer from "../Home Panel/SlideBarBuyer";

function EditBuyerProducts(){

        
    

  const { id } = useParams();

  const [formData, setFormData] = useState();

  const [errors, setErrors] = useState({});
  const [product, setProduct] = useState({});

  const navigate = useNavigate(); // Initialize the useNavigate hook




  const validateFormData = (data) => {
    // Your validation logic goes here
    // Return an object with validation errors, if any
    return {};
  };

  const handleEditProduct = () => {
    const validationErrors = validateFormData(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios.put(`https://api-generator.retool.com/Vn5ZGU/data/${id}`, formData)
        .then((response) => {
          setProduct(response.data);
          navigate('/HomePanelBuyers')
        })
        .catch((error) => {
          console.error('Error updating product:', error);
          setErrors({ server: 'Error updating product. Please try again later.' });
        });
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get(`https://api-generator.retool.com/Vn5ZGU/data/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    getProduct();
  }, [id]);

    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)
    }
  
  
    return (
      <>
        
    <div className='grid-container'>
    <SlideBarBuyer openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>


    <form className="formclss">
        <label>ID:
          <input type="text" name="id" value={product.id} readOnly />
        </label>
        <br />
        <label>name:
          <input type="text" name="name" placeholder={product.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </label>
        <br />
        <label>Brand:
          <input type="text"placeholder="brand" name="brand" value={product.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
        </label>
        <br />
        <label>Price:
          <input type="text" name="price" placeholder={product.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        </label>
        <br />
        <label>Category:
          <input type="text" name="category" placeholder={product.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
        </label>
        <br />
        <label>Seller ID:
          <input type="number" name="sellerid" placeholder={product.sellerid} onChange={(e) => setFormData({ ...formData, sellerid: e.target.value })} />
        </label>
        <br />
        <label>Inventory:
          <input type="text" name="inventory" placeholder={product.inventory} onChange={(e) => setFormData({ ...formData, inventory: e.target.value })} />
        </label>
        <br />
        <label>Product ID:
          <input type="number" name="productid" placeholder={product.productid} onChange={(e) => setFormData({ ...formData, productid: e.target.value })} />
        </label>
        <br />
        <label>Customer ID:
          <input type="number" name="customerid" placeholder={product.customerid} onChange={(e) => setFormData({ ...formData, customerid: e.target.value })} />
        </label>
        <br />
        <button type="button" className="add-product-button" onClick={handleEditProduct}>
          Update Product
        </button>
      </form>
   

    </div>  
        
        </>
    )

}


export default EditBuyerProducts