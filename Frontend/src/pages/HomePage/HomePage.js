import React, { useEffect } from 'react';
import "./HomePage.css";
import HeaderSlider from "../../components/Slider/HeaderSlider";
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../store/categorySlice';
import ProductList from "../../components/ProductList/ProductList";
import { fetchAsyncProducts, getAllProducts, getAllProductsStatus } from '../../store/productSlice';
import Loader from "../../components/Loader/Loader";
import { STATUS } from '../../utils/status';
import AboutUsSection from '../../components/About-us';
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


const HomePage = () => {
  const dispatch = useDispatch();
  const categories = useSelector(getAllCategories);
  const navigate = useNavigate();

  const {
    setIsLoggedInContext,
    setRoleContext,
    isLoggedInContext,
    roleContext } = useAuth();


  /** Redirection */
  useEffect(() => {
    if (localStorage.getItem("login") !== null) {
      setIsLoggedInContext(true);
      const user = JSON.parse(localStorage.getItem("login"));
      if (user.role === "seller") {
        setRoleContext("seller");
        navigate("/Dashboard");
      }
    }
  }, []);
  /** End of Redirection */

  useEffect(() => {
    dispatch(fetchAsyncProducts(1000));
  }, [dispatch]);

  const products = useSelector(getAllProducts);
  const productStatus = useSelector(getAllProductsStatus);

  // randomizing the products in the list
  const tempProducts = [];
  if (products.length > 0) {
    for (let i in products) {
      let randomIndex = Math.floor(Math.random() * products.length);

      while (tempProducts.includes(products[randomIndex])) {
        randomIndex = Math.floor(Math.random() * products.length);
      }
      tempProducts[i] = products[randomIndex];
    }
  }

  let catProductsOne = products.filter(product => product.category_name === categories[0]);
  let catProductsTwo = products.filter(product => product.category_name === categories[1]);
  let catProductsThree = products.filter(product => product.category_name === categories[2]);
  let catProductsFour = products.filter(product => product.category_name === categories[3]);

  return (
    <main>
      <div className='slider-wrapper'>
        <HeaderSlider />
      </div>
      <div className='main-content bg-whitesmoke'>
        <div className='container'>
          <div className='categories py-5'>
            <div className='categories-item'>
              <div className='title-md grade'>
                <h3 style={{ color: 'white' }}>See our products</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={tempProducts} />}
              {/* <ProductForm></ProductForm> */}
            </div>

            <div className='categories-item'>
              <div className='title-md grade'>
                <h3 style={{ color: 'white' }}>{categories[0]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsOne} />}
            </div>

            <div className='categories-item'>
              <div className='title-md grade'>
                <h3 style={{ color: 'white' }}>{categories[1]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsTwo} />}
            </div>

            <div className='categories-item'>
              <div className='title-md grade'>
                <h3 style={{ color: 'white' }}>{categories[2]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsThree} />}
            </div>

            <div className='categories-item'>
              <div className='title-md grade'>
                <h3 style={{ color: 'white' }}>{categories[3]}</h3>
              </div>
              {productStatus === STATUS.LOADING ? <Loader /> : <ProductList products={catProductsFour} />}
            </div>

              <AboutUsSection />

          </div>
        </div>
      </div>
    </main>
  )
}

export default HomePage;
