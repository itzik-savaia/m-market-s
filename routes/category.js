var express = require('express');
var router = express.Router();

var Category_Controoler = require('../controllers/category');


////////////////////////////////////////Category////////////////////////////////////////

/* GET */
router.get('/', Category_Controoler.GET_Category);
/* PUT */
router.put('/:id', Category_Controoler.PUT_Category);
/* POST */
router.post('/', Category_Controoler.POST_Category);

module.exports = router;
