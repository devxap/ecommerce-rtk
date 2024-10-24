import React from 'react';
import './ProductList.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from './CartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);

  const products = [
    { id: 1, name: 'Product A', price: 60, image: 'https://via.placeholder.com/150?text=Product+A' },
    { id: 2, name: 'Product B', price: 75, image: 'https://via.placeholder.com/150?text=Product+B' },
    { id: 3, name: 'Product C', price: 30, image: 'https://via.placeholder.com/150?text=Product+C' },
  ];

  const isProductInCart = (productId) => {
    return cartItems.some(item => item.id === productId);
  };

  const handleAddToCart = product => {
    dispatch(addItemToCart(product));
  };

  return (
    <section className="product-section">
      <h2 className="product-list-title">Shop Our Products</h2>
      <div className="product-cards">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <span className="product-name">{product.name}</span>
              <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
            <button
              className={`add-to-cart-btn ${isProductInCart(product.id) ? 'disabled' : ''}`}
              onClick={() => handleAddToCart(product)}
              disabled={isProductInCart(product.id)}
            >
              {isProductInCart(product.id) ? 'Added to cart' : 'Add to cart'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductList;
