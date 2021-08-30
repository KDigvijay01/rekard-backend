const router = require('express').Router();
const studentsController = require('./index');
const studentsValidator = require('./validator')

router.post('/', async (req, res) => {
    const validateStudentsEntryResp = studentsValidator.validateStudentsEntry(req.body);
    if (validateStudentsEntryResp.status === 'error') {
        return res.send(validateStudentsEntryResp);
    }
    const studentEntryResp = await studentsController.addStudent(validateStudentsEntryResp.value);
    res.send(studentEntryResp);
});



router.post('/entry', async (req, res) => {
    
})


module.exports = router;