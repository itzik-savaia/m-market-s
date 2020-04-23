var express = require('express');
var router = express.Router();

var Oreder_Controller = require('../controllers/order')
////////////////////////////////////////Order////////////////////////////////////////

/* GET */
router.get('/', Oreder_Controller.GET_Order);
/* POST */
router.post('/', Oreder_Controller.POST_Order);



module.exports = router;
