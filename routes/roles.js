var express = require('express');
var router = express.Router();
var Roles_Controller = require('../controllers/roles')

////////////////////////////////////////Roles////////////////////////////////////////

/* GET */
router.get('/', Roles_Controller.GET_Role);
/* PUT */
router.put('/', Roles_Controller.PUT_Role);
/* POST */
router.post('/', Roles_Controller.POST_Role);

module.exports = router;
