const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require("dotenv").config();

const uploadImage = require("./utils/uploadimage");


const app = express()
const port = process.env.PORT || 4000;



// middleware

app.use(express.json({ limit: "25mb" }));
// app.use(express.urlencoded({ limit: "25mb" }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));  


app.use(cors({ 
    origin: 'http://localhost:5173',
    credentials: true,
  }));
  


//   routes

const authRoutes = require('./src/users/user.route');
const productRoutes = require('./src/products/products.route');
const reviewRoutes = require('./src/reviews/reviews.route');
const statsRoutes = require('./src/stats/stats.route');
const cartRoutes = require('./src/cart/cart.route');
const dealRoutes = require('./src/deals/deals.route');

app.use('/api/auth', authRoutes);
app.use('/api/product', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/stats', statsRoutes);

app.use('/api/cart', cartRoutes);
app.use('/api/deal', dealRoutes);










main().then(() => console.log('Mongodb connected successfully!')).catch(err => console.log(err));



// mongoose dox

async function main() {
    await mongoose.connect(process.env.DB_URL);
  
 
  }



app.get('/', (req, res) => {
  res.send('Hello World!')
})




// upload image routes
app.post("/uploadImage", (req, res) => {
  uploadImage(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
});







app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})