const express = require('express');

const router = express.Router();

const passport = require('passport');

const userController = require('../controllers/users_controllers');

router.get('/profile/:id', passport.checkAuthentication,userController.profile);

router.post('/update/:id', passport.checkAuthentication,userController.update);

router.get('/sign-up',userController.signUp);

router.get('/sign-in',userController.signIn);

router.post('/create',userController.create);

router.get('/sign-out',userController.destroySession);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {
        failureRedirect: '/user/sign-in',
    },
),userController.create_session);


router.get('/auth/google',passport.authenticate('google',{scope: ['profile','email']}));

router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect: '/user/sign-in'}), userController.create_session);

module.exports = router;