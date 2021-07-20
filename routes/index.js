const express = require('express');

const router = express.Router();

const homeController=require('../controllers/home_controllers');

console.log('router loaded');

router.get('/',homeController.home);
router.use('/user',require('./user'));
router.use('/post',require('./post'));
router.use('/comment',require('./comment'));
//for any further routes acess from here
//router.use('/routerName',require('./routerfile'))

module.exports = router;

