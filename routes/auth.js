const bcrypt = require('bcryptjs');
const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../validations');

router.post('/register', async (req, res) => {
	//Lets validate the user to create
	const { error } = registerValidation(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	//Checking if the user is already in the DB
	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) {
		return res.status(400).send('Email already exists');
	}

	//Hash the passwords
	const hashedPassword = await bcrypt.hash(req.body.password, 10);
	//Create a new user
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		password: hashedPassword
	});

	try {
		return res.send({ user: user._id });
	} catch (error) {
		return res.status(400).send(error);
	}
});

router.post('/login', async (req, res) => {
	//Lets validate the user to create
	const { error } = loginValidation(req.body);

	if (error) {
		return res.status(400).send(error.details[0].message);
	}

	//Checking if the user is already in the DB
	const user = await User.findOne({ email: req.body.email });
	if (!user) {
		return res.status(400).send('Email or password is wrong');
	}
	//Password is correct
	const validPassword = await bcrypt.compare(req.body.password, user.password);
	if (!validPassword) {
		return res.status(400).send('Email or password is wrong');
	}

	const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
	res.header('auth-token', token).send(token);

	res.send('Logged in');
});

module.exports = router;
