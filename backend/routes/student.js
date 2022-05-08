const router = require('express').Router();
let student_model = require('../models/student');
const timestamp = require('time-stamp');

router.route('/add').post((req,res) => {
    
    const name = req.body.name;
    const studentId = req.body.studentNum;
    const studentAddress = req.body.studentAddress;
    const contactNumber = req.body.contactNumber;
    const grade = req.body.grade;
    const parentContactNumber = req.body.parentContactNumber;
    const timeStamp = timestamp('YYYY/MM/DD:mm:ss')

    const newStudent_Reg = new student_model({name, studentId, studentAddress, contactNumber, grade, parentContactNumber , timeStamp});

    newStudent_Reg.save()
        .then(() => res.json('Student Registered!'))
        .catch(err => res.status(400).json('Error: '+err));
});
  

router.route("/allStudent").get((req,res) => {
    student_model.find().then((doctors) => {
        res.json(doctors);
    }).catch((err) => {
        console.log(err);
    });
});    

router.route('/updateStudent').put((req, res)=>{
    const studentId = req.body.sID;   
    const name = req.body.name;
    const studentAddress = req.body.studentAddress;
    const contactNumber = req.body.contactNumber;
    const grade = req.body.grade;
    const parentContactNumber = req.body.parentContactNumber;

    const updateStudent={name, studentAddress,contactNumber, grade , parentContactNumber }
       const update1 =  student_model.findByIdAndUpdate(studentId,updateStudent).then(() => {       
            res.status(200).send({status :"Student updated"});    
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        });
          
});

router.route("/deleteStudent/:sID").delete(async (req, res) => {
        var sID = req.params.sID; 
        student_model.findByIdAndDelete(sID)
        .then(() => {
            res.status(200).send({status :"Student Deleted"});
        }).catch((err) => {
            console.log(err);
            res.status(500).send({status: "Error with Deleting Data",error: err.message});
        });
});

module.exports = router;