import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import productsData from './seedData';
import './cart.css';

const Cart = ({ isOpen, onClose, removeFromCart, setCartCount }) => {
    const [cartItems, setCartItems] = useState(productsData);
    // const [cartItems, setCartItems] = useState([]);
    const navigate = useHistory();

    const removeItem = (itemId) => {
        setCartItems(cartItems.filter((item) => item.id !== itemId));
        setCartCount(cartItems.length)
        removeFromCart()
    };

    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    const handleItemClick = (itemId) => {
        // send user to the single product view route and display that
        // navigate();
        console.log(`View item with ID: ${itemId}`);
    };

    useEffect(() => {
        setCartCount(cartItems.length)
    }, []);

    if (!isOpen) {
        return null;
    }

    return ReactDOM.createPortal(
        <div className="cart-modal">
            <div className="cart-content">
                <h2 className="cart-title">Cart</h2>
                {cartItems.length === 0 ? (
                    <p>No items in the cart.</p>
                ) : (
                    <ul className='cart-list'>
                        {cartItems.map((item) => (
                            <li className='single-item' key={item.id}>
                                <span className='item-image' onClick={() => handleItemClick(item.id)}>
                                    <img src={item.image} alt={item.name} />
                                </span>
                                <span>{item.name}</span>
                                <span>${item.price}</span>
                                <button className='remove-button' onClick={() => removeItem(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
                <p>Total: ${calculateTotalCost()}</p>
            </div>
            <button className="close-button" onClick={onClose}>
                Close
            </button>
        </div>,
        document.getElementById('cart-root')
    );
};

export default Cart;
