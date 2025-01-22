const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');
const app = express();
const PORT = 5000;
const cors = require('cors');
require('dotenv').config();


// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

//Create a Default User

const createDefaultAdmin = async () => {
    try {
        const existingAdmin = await User.findOne({ userName: 'admin' });
        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash('admin', 10); // Hash the default password
            const defaultAdmin = new User({
                userName: 'admin',
                role: 'admin',
                age: 19,
                password: hashedPassword,
            });

            await defaultAdmin.save();
            console.log('Default admin user created successfully');
        } else {
            console.log('Default admin user already exists');
        }
    } catch (err) {
        console.error('Error creating default admin user:', err);
    }
};



// MongoDB Connection
mongoose.connect( process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');
    await createDefaultAdmin()
});

// Schemas and Models

// User Schema
const userSchema = new mongoose.Schema({
    userName: { type: String, required: true, unique: true },
    role: { type: String, required: true, enum: ['admin', 'cashier', 'kitchen'] },
    age: { type: Number, required: true },
    password: { type: String, required: true },
});
const User = mongoose.model('User', userSchema);

// Menu Item Schema
const menuItemSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    itemCategory: { type: String, required: true },
    itemPrice: { type: Number, required: true },
    itemSrc: { type: String, required: true },
});
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Order Schema
const orderSchema = new mongoose.Schema({
    customerName: { type: String, required: true },
    status: { type: String, required: true, enum: ['Pending', 'In Progress', 'Completed', 'Cancelled'] },
    type: { type: String, required: true },
    table: { type: String },
    time: { type: String, required: true },
    items: [
        {
            item: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    createdBy: { type: String, required: true }
});
const Order = mongoose.model('Order', orderSchema);

// Routes

// User Routes

// Get all registered users
app.get('/users', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    try {
        const users = await User.find({}, 'userName role age');
        res.status(200).json(users);
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

// Register a User
app.post('/register', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    try {
        const { userName, role, age, password } = req.body;

        if (!userName || !role || !age || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ userName, role, age, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error registering user' });
    }
});

app.put('/users/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    const { userName, role, age, password } = req.body;

    if (!userName || !role || !age) {
        return res.status(400).json({ message: 'All fields except password are required' });
    }

    try {
        const updatedData = { userName, role, age };

        if (password) {
            updatedData.password = await bcrypt.hash(password, 10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            updatedData,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Error updating user' });
    }
});


app.delete('/users/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Error deleting user' });
    }
});



app.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;
        const user = await User.findOne({ userName });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '4h' });

        res.cookie('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: 'Login successful', id: user._id, role: user.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error logging in' });
    }
});

app.post('/logout', authenticateToken, (req, res) => {
    try {
        res.clearCookie('authToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (err) {
        console.error('Error during logout:', err);
        res.status(500).json({ message: 'Error during logout' });
    }
});

//Role Route
app.get('/auth/role', authenticateToken, (req, res) => {
    res.status(200).json({ role: req.user.role });
});


// Menu Routes
app.get('/menu', authenticateToken, async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching menu items' });
    }
});

app.post('/menu', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    try {
        const newItem = new MenuItem(req.body);
        await newItem.save();
        res.status(201).json({ message: 'Menu item added successfully', item: newItem });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding menu item' });
    }
});

app.patch('/menu/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    try {
        const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedItem);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating menu item' });
    }
});

app.delete('/menu/:id', authenticateToken, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admins only' });
    }

    try {
        await MenuItem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting menu item' });
    }
});

// Order Routes
app.get('/orders', authenticateToken, async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('items.item', 'itemName itemPrice itemCategory')

        res.status(200).json(orders);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error fetching orders' });
    }
});


app.post('/orders', authenticateToken, async (req, res) => {
    try {
        const { customerName, status, type, table, time, items } = req.body;

        // Validate that all items exist in the MenuItem collection
        const itemIds = items.map((item) => item.item);
        const existingItems = await MenuItem.find({ _id: { $in: itemIds } });

        if (existingItems.length !== items.length) {
            return res.status(400).json({ message: 'One or more items are invalid' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newOrder = new Order({
            customerName,
            status,
            type,
            table,
            time,
            items,
            createdBy: user.userName,
        });

        await newOrder.save();
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating order' });
    }
});


app.patch('/orders/:id/status', authenticateToken, async (req, res) => {
    try {
        const { status } = req.body;

        if (!['Completed', 'Cancelled', 'In Progress'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }

        const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(200).json(updatedOrder);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating order status' });
    }
});


app.get('/health', async(req, res) => {
    res.status(200).json({ message: 'Server is running' });
})

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
