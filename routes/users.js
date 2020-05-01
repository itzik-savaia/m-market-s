var express = require('express');
var router = express.Router();
var Users_Controller = require('../controllers/users');
var Chack_user = require('../controllers/services/chack_user.model');
var token = require('../controllers/services/verify_token')
////////////////////////////////////////Users////////////////////////////////////////

/* GET */
router.get('/token', [token.verifyToken], Users_Controller.GET_UserTOKEN_ID);
/* POST */
router.post('/chack', Users_Controller.POST_ChackUser)
router.post('/new', [Chack_user.Chack_Email, Chack_user.Chack_ID_Card, Chack_user.Chack_UserName, Users_Controller.POST_New_User]);
router.post('/', Users_Controller.POST_User);

module.exports = router;