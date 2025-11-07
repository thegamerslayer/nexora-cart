import React, { useEffect, useState } from 'react';
import ProductGrid from './components/ProductGrid';
import CartView from './components/CartView';
import CheckoutForm from './components/CheckoutForm';
import { getProducts, getCart } from './api';

function App() {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const refreshCart = () => {
        getCart().then(res => {
            setCart(res.data.items);
            setTotal(res.data.total);
        });
    };
    useEffect(() => {
        getProducts().then(res => setProducts(res.data));
        refreshCart();
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Nexora E-Com Cart</h1>
            <ProductGrid products={products} refreshCart={refreshCart} />
            <CartView cart={cart} refreshCart={refreshCart} total={total} />
            <CheckoutForm cart={cart} />
        </div>
    );

}

export default App;