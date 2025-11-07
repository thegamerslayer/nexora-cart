const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = [
    { id: 1, name: 'T-shirt', price: 499 },
    { id: 2, name: 'Sneakers', price: 1299 },
    { id: 3, name: 'Backpack', price: 899 },
    { id: 4, name: 'Watch', price: 1999 },
    { id: 5, name: 'Sunglasses', price: 799 }
];

let cart = [];


app.get('/', (req, res) => {
  res.send('API is running 🚀');
});



//GET/api/products

app.get('/api/products', (req, res) => {
    res.json(products);
});

//POST/api/cart
app.post('/api/cart', (req, res) => {
    const { productId, qty } = req.body;
    const product = products.find(p => p.id === productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const item = {
        id: Date.now(),
        productId,
        name: product.name,
        price: product.price,
        qty
    };
    cart.push(item);
    res.json(item);
});

//DELETE/api/cart/:id
app.delete('/api/cart/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    cart=cart.filter(item=>item.id !== id);
    res.json({success:true});
});

//GET/api/cart
app.get('/api/cart', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  res.json({ items: cart, total });
});

//POST/api/checkout
app.post('/api/checkout', (req, res) => {
  const timestamp = new Date().toISOString();
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const receipt = { total, timestamp };
  cart = []; // Clear cart after checkout
  res.json(receipt);
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));