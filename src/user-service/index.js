
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());


mongoose.connect('mongodb://mongo:27017/users').then(() => {
    console.log('connected to database')
}).catch((err) => {
    console.log('error connecting to database', err)
})


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


const User = mongoose.model('User', userSchema)

app.post('/register', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', user: user });
    } catch (error) {
        // next(error);
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.get('/users', async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        // next(error);
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/users/:id', async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);    
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        // next(error);
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

app.get('/', (req, res, next) => {
    // res.send('Hello word...!')
    res.status(200).json({
        "message": "server running",
        "status": "ok"
    })
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})