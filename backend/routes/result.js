const router = require('express').Router();
let result_model = require('../models/result');
const timestamp = require('time-stamp');

router.route('/addResult').post((req,res) => {
    
    const studentId = req.body.studentId;
    const subjectCode = req.body.subjectCode;
    const subject = req.body.subject;
    const result = req.body.result;
    const timeStamp = timestamp('YYYY/MM/DD:mm:ss')

    const newResult_Reg = new result_model({studentId, subjectCode, subject, result,  timeStamp});

    newResult_Reg.save()
        .then(() => res.json('Result Adding Success!'))
        .catch(err => res.status(400).json('Error: '+err));
});
  
router.route("/allResult/:studentId").get((req,res) => {
    
    const studentId = req.params.studentId;
    result_model.find({studentId : studentId}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/deleteresult/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    result_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Result Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

module.exports = router;