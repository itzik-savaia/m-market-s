var express = require('express');
var router = express.Router();
var Item_Controller = require('../controllers/item')
var Cart_Controller = require('../controllers/cart')
////////////////////////////////////////Item////////////////////////////////////////

/* GET */
router.get('/', Item_Controller.GET_Item);
/* POST */
router.post('/', [Cart_Controller.POST_Cart], Item_Controller.POST_Item);

module.exports = router;
