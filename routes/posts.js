//This was made to test the middleware and verify the jwt token

const router = require('express').Router();
const verifyToken = require('../verify-token');

router.get('/', verifyToken, async (req, res) => {
	userId = req.user.id;
	//With the id we can search the user like User.findById() and do something
	res.json({
		posts: { title: 'My Post', description: 'Many words in here' },
		idUser: userId
	});
});

module.exports = router;
