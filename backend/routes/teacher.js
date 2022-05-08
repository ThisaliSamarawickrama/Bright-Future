const router = require('express').Router();
let teacher_model = require('../models/teacher');
const timestamp = require('time-stamp');

router.route('/addTeacher').post((req,res) => {
  
    const teacherName = req.body.teacherName;
    const teacherId = req.body.teacherId;
    const teacherTel = req.body.teacherTel;
    const teacherEmail = req.body.teacherEmail;
    const teacherGrade = req.body.teacherGrade;
    const teacherCenter = req.body.teacherCenter;
    const teacherSubject = req.body.teacherSubject;
    const classType = req.body.classType;
    const classOrganization = req.body.classOrganization;
    const timeStamp = timestamp('YYYY/MM/DD:mm:ss')

    const newResult_Reg = new teacher_model({teacherName, teacherId, teacherTel, teacherEmail, teacherGrade, teacherCenter, teacherSubject, classType, classOrganization, timeStamp});

    newResult_Reg.save()
        .then(() => res.json('Result Adding Success!'))
        .catch((err) => {
            console.log(err);
        });
});

router.route("/allTeacher").get((req,res) => {
    
    teacher_model.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});  
  

router.route("/deleteTeacher/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    teacher_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Teacher Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

router.route('/updateTeacher').put((req, res)=>{
    const teacherName = req.body.teacherName;
    const teacherId = req.body.tID;
    const teacherTel = req.body.teacherTel;
    const teacherEmail = req.body.teacherEmail;
    const teacherGrade = req.body.teacherGrade;
    const teacherCenter = req.body.teacherCenter;
    const teacherSubject = req.body.teacherSubject;
    const classType = req.body.classType;
    const classOrganization = req.body.classOrganization;

    const updateTeacher={teacherName, teacherTel, teacherEmail, teacherGrade, teacherCenter, teacherSubject, classType, classOrganization}
       const update1 =  teacher_model.findByIdAndUpdate(teacherId,updateTeacher).then(() => {       
            res.status(200).send({status :"Teacher updated"});    
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        });
          
});
module.exports = router;