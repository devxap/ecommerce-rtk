import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, clearCart } from './CartSlice';
import './ShoppingCart.css'; 

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const totalAmount = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  const handleRemoveItem = itemId => {
    dispatch(removeItemFromCart(itemId));
  };

  const handleClearItem = () => {
    dispatch(clearCart());
  };

  const handleIncreaseItem = itemId => {
    dispatch(increaseItemQuantity(itemId));
  };

  const handleDecreaseItem = itemId => {
    dispatch(decreaseItemQuantity(itemId));
  };

  return (
    <section className="shopping-cart-section">
      <h2 className="shopping-cart-title">Your Shopping Cart</h2>
      {cartItems.length > 0 ? (
        <>
          <ul className="cart-items">
            {cartItems.map(item => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <span className="cart-item-name">{item.name}</span>
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                </div>
                <div className="quantity-controls">
                  <button className="quantity-control-btn" onClick={() => handleDecreaseItem(item.id)}>-</button>
                  <span className="item-quantity">{item.quantity}</span>
                  <button className="quantity-control-btn" onClick={() => handleIncreaseItem(item.id)}>+</button>         
                </div>
                <button className="remove-item-btn" onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <span className="total-label">Total Amount:</span>
            <span className="total-amount">${totalAmount.toFixed(2)}</span>
          </div>
          <button className="clear-cart-btn" onClick={handleClearItem}>Clear Cart</button>
        </>
      ) : (
        <p className="empty-cart-message">Your cart is empty. Start shopping now!</p>
      )}
    </section>
  );
};

export default ShoppingCart;
