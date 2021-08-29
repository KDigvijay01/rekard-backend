const router = require('express').Router();
const userController = require('./index');



router.get('/test', async (req, res) => {
    const testResp  = await  userController.test();
    res.send(testResp);

});


module.exports = router;