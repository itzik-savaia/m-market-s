var express = require('express');
var router = express.Router();
var Cart_Controller = require('../controllers/cart')

////////////////////////////////////////Cart////////////////////////////////////////

/* GET */
router.get('/:id', Cart_Controller.GET_Cart);
/* PUT */
router.put('/:id', Cart_Controller.PUT_Cart);
/* POST */
router.post('/', Cart_Controller.POST_Cart);

module.exports = router;
