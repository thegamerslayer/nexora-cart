import React, { useState } from 'react';
import { checkout } from '../api';

function CheckoutForm({ cart }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [receipt, setReceipt] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert('Cart is empty!');
    const res = await checkout();
    setReceipt({ ...res.data, name, email });
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      {receipt && (
        <div style={{ marginTop: '20px', border: '1px solid green', padding: '10px' }}>
          <h3>Receipt</h3>
          <p><strong>Name:</strong> {receipt.name}</p>
          <p><strong>Email:</strong> {receipt.email}</p>
          <p><strong>Total:</strong> ₹{receipt.total}</p>
          <p><strong>Timestamp:</strong> {receipt.timestamp}</p>
        </div>
      )}
    </div>
  );
}

export default CheckoutForm;