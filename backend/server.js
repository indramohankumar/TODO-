const express = require('express');
const cors = require('cors');
const app = express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const dns = require('dns');

dotenv.config();

const port = process.env.PORT || 3000;
const MONGODB_URI=process.env.MONGODB_URI;
//create express app

//middleware
app.use(cors());
app.use(express.json());
    app.use((req, res, next) => {
        console.log(req.path,req.method);
        next();
    });
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });

// Mount routes
const userRoutes = require('./routes/user');
const todoRoutes = require('./routes/todo');
app.use('/api/user', userRoutes);
app.use('/api/todos', todoRoutes);

if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI in .env');
    process.exit(1);
}

// Some networks block SRV DNS lookups; use public resolvers for Atlas discovery.
dns.setServers(['8.8.8.8', '1.1.1.1']);

//connect to mongodb
mongoose.connect(MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

