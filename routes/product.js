var express = require('express');
var router = express.Router();

//Controolers
var Product_Controoler = require('../controllers/product');
////////////////////////////////////////Products////////////////////////////////////////

/* GET */
router.get('/', Product_Controoler.GET_Product);
/* GET */
router.get('/category/:id', Product_Controoler.GET_CategoryID);
/* GET */
router.get('/category/name/:name', Product_Controoler.GET_CategoryName);
/* PUT */
router.put('/:id', Product_Controoler.PUT_Product);
/* POST */
router.post('/', Product_Controoler.POST_Product);


module.exports = router;
