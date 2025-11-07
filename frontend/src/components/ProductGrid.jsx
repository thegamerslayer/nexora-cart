import React from 'react';
import { addToCart } from '../api';

function ProductGrid({ products, refreshCart }) {
  const handleAdd = async (productId) => {
    await addToCart(productId, 1); // default qty = 1
    refreshCart(); // update cart in parent
  };

  return (
    <div>
      <h2>Products</h2>
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', width: '150px' }}>
            <h4>{product.name}</h4>
            <p>₹{product.price}</p>
            <button onClick={() => handleAdd(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductGrid;