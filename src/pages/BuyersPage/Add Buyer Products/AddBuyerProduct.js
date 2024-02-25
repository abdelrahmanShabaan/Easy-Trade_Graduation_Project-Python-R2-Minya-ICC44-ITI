
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddBuyerProducts.css'
import { useNavigate } from 'react-router-dom';
import SlideBarBuyer from '../Home Panel/SlideBarBuyer';

function AddBuyerProduct(){

        
 
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        brand: '',
        price: '',
        category: '',
        sellerid: '',
        inventory: '',
        productid: '',
        customerid: '',
      });
    
      const [errors, setErrors] = useState({});
      const [products, setProducts] = useState([]);
    
    
      const navigate = useNavigate(); // Initialize the useNavigate hook
    
    
      
      useEffect(() => {
        // Fetch the list of products using Axios
        axios.get('https://api-generator.retool.com/PvW26v/data')
          .then(response => setProducts(response.data))
          .catch(error => console.error('Error fetching products:', error));
      }, []); // Empty dependency array ensures the effect runs only once, similar to componentDidMount
    
      const validateFormData = (data) => {
        // Your validation logic goes here
        // Return an object with validation errors, if any
        return {};
      };
      const handleAddProduct = () => {
        const validationErrors = validateFormData(formData);
      
        if (Object.keys(validationErrors).length === 0) {
          axios.post('https://api-generator.retool.com/Vn5ZGU/data', formData)
            .then(response => {
              setProducts([...products, response.data]);
              setFormData({
                id: '',
                name: '',
                brand: '',
                price: '',
                category: '',
                sellerid: '',
                inventory: '',
                productid: '',
                customerid: '',
              });
            })
            loadData()
            navigate('/ShowBuyerProducts')
            .catch(error => {
              if (error.response) {
                // The request was made, but the server responded with an error
                console.error('Server Error:', error.response.data);
              } else if (error.request) {
                // The request was made but no response was received
                console.error('No response from server');
              } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
              }
              setErrors({ server: 'Error adding product. Please try again later.' });
            });
        } else {
            console.log("success")
    
          setErrors(validationErrors);
        }
      };

      
  
    const loadData = async () => {
        try {
          const res = await axios.get("https://api-generator.retool.com/Vn5ZGU/data");
          setProducts(res.data);
        } catch (error) {
          console.error("Error loading data:", error);
        }
      };
  
      
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
    const OpenSidebar = () => {
        setOpenSidebarToggle(!openSidebarToggle)  }


return(
    <>
    
    <div className='grid-container'>
    <SlideBarBuyer openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>


    <form className='formclss' method="POST">
        <label className='labels'>ID:
            <input type="text" name="id" value={formData.id} onChange={(e) => setFormData({ ...formData, id: e.target.value })} />
        </label>
        <br />
        <label className='labels'>name:
            <input type="text" name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </label>
        <br />
        <label className='labels'>Brand:
            <input type="text" name="brand" value={formData.brand} onChange={(e) => setFormData({ ...formData, brand: e.target.value })} />
        </label>
        <br />
        <label className='labels'>Price:
            <input type="number" name="price" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} />
        </label>
        <br />
        <label className='labels'>Category:
            <input type="text" name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} />
        </label>
        <br />
        <label className='labels'>Seller ID:
            <input type="text" name="sellerid" value={formData.sellerid} onChange={(e) => setFormData({ ...formData, sellerid: e.target.value })} />
        </label>
        <br />
        <label className='labels'>Inventory:
            <input type="text" name="inventory" value={formData.inventory} onChange={(e) => setFormData({ ...formData, inventory: e.target.value })} />
        </label>
        <br />
        <label className='labels'>Product ID:
            <input type="text" name="productid" value={formData.productid} onChange={(e) => setFormData({ ...formData, productid: e.target.value })} />
        </label>
        <br />
        <label className='labels'>Customer ID:
            <input type="text" name="customerid" value={formData.customerid} onChange={(e) => setFormData({ ...formData, customerid: e.target.value })} />
        </label>
        <br />
        <button type="button" className="add-product-button" onClick={handleAddProduct}> Add Product </button>
        </form> 

      

    </div>
        
        </>
    )

}


export default AddBuyerProduct