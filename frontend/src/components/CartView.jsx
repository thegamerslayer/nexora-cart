import React from 'react';
import { removeFromCart } from '../api';

function CartView({ cart, refreshCart, total }) {
  const handleRemove = async (id) => {
    await removeFromCart(id);
    refreshCart();
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ borderBottom: '1px solid #ccc', padding: '10px' }}>
              <strong>{item.name}</strong> — ₹{item.price} × {item.qty}
              <button style={{ marginLeft: '10px' }} onClick={() => handleRemove(item.id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ₹{total}</h3>
        </div>
      )}
    </div>
  );
}

export default CartView;