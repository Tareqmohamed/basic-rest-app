const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



const User = require("../model/db")




exports.signUp= async (req, res) => {
    try {
        const { name, age, phone, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name: name,
            age: age,
            phone: phone,
            email: email,
            password: hashedPassword
        });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




exports.signIn=async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_secret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




exports.home = (req, res) => {
    res.status(200).json({ message: 'Welcome to the home page' });
};