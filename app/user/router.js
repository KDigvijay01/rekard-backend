const router = require('express').Router();
const userController = require('./index');




router.get('/test', async (req, res) => {
    const testResp  = await  userController.test();
    res.send(testResp);

});


router.post('/login', async (req, res) => {
    const params = req.body;
    const loginResp = await userController.login(params);
    console.log(loginResp);
    res.send(loginResp);
})


module.exports = router;