const router = require('express').Router();
let class_model = require('../models/class');
const timestamp = require('time-stamp');

router.route('/addClass').post((req,res) => {
    
    const teacherName = req.body.teacherName;
    const subject = req.body.subject;
    const grade = req.body.grade;
    const day = req.body.day;
    const classDuration = req.body.classDuration;
    const timeStamp = timestamp('YYYY/MM/DD:mm:ss')

    const class_saving = new class_model({teacherName, subject,grade, day,timeStamp,classDuration});

    class_saving.save()
        .then(() => res.json('Class Done!'))
        .catch(err => res.status(400).json('Error: '+err));
});
  
router.route("/allClass").get((req,res) => {
    
    class_model.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/allClass/:teacher").get((req,res) => {
    var teacher = req.params.teacher; 
    class_model.find({teacherName : {'$regex': '.*'+teacher+'.*'}}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/deleteClass/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    class_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Class Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

router.route('/updateClass').put((req, res)=>{
    
    const id = req.body.id;
    const subject = req.body.subject;
    const grade = req.body.grade;
    const day = req.body.day;
    const classDuration = req.body.classDuration;

    const updateClass={subject, grade , day , classDuration}
    const update1 =  class_model.findByIdAndUpdate(id,updateClass).then(() => {       
        res.status(200).send({status :"Class updated"});    
    }).catch((err) => {
        console.log(err);
        res.status(400).send({status: "Error with Updating Data",error: err.message});
    });
          
});

module.exports = router;