var express = require('express');
var router = express.Router();

var SUB_Category_Controoler = require('../controllers/subcategory');


////////////////////////////////////////SUB_Category////////////////////////////////////////

/* GET */
router.get('/', SUB_Category_Controoler.GET_SUB_Category);
/* PUT */
router.put('/:id', SUB_Category_Controoler.PUT_SUB_Category);
/* POST */
router.post('/', SUB_Category_Controoler.POST_SUB_Category);

module.exports = router;
