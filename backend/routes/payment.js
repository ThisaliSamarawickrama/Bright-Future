const router = require('express').Router();
let Payment_model = require('../models/payment');
const timestamp = require('time-stamp');

router.route('/addPayment').post((req,res) => {
    
    const cardName = req.body.cardName;
    const cardNumber = req.body.cardNumber;
    const studentID = req.body.studentID;
    const Holder = req.body.Holder;
    const cvv = req.body.cvv;
    const amount = req.body.amount;
    const expireDate = req.body.expireDate;
    const name = req.body.name;
    const grade = req.body.grade;
    const month = req.body.month;
    const timeStamp = timestamp('YYYY/MM/DD:mm:ss')

    const payment_saving = new Payment_model({cardName, cardNumber,studentID, Holder, cvv, expireDate,amount,name,grade, month,timeStamp});

    payment_saving.save()
        .then(() => res.json('Payment Done!'))
        .catch(err => res.status(400).json('Error: '+err));
});
  
router.route("/allPayment").get((req,res) => {
    
    Payment_model.find().then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});   
router.route("/allPayment/:id").get((req,res) => {
    
    Payment_model.find({studentID : req.params.id}).then((result) => {
        res.json(result);
    }).catch((err) => {
        console.log(err);
    });
});   

router.route("/deletePayment/:ID").delete(async (req, res) => {
    var ID = req.params.ID; 
    Payment_model.findByIdAndDelete(ID)
    .then(() => {
        res.status(200).send({status :"Payment Deleted"});
    }).catch((err) => {
        console.log(err);
        res.status(500).send({status: "Error with Deleting Data",error: err.message});
    });
});

router.route('/updatePayment').put((req, res)=>{
    const id = req.body.id;   
    const name = req.body.name;
    const grade = req.body.grade;
    const month = req.body.month;

    const updatePayment={name, grade , month}
       const update1 =  Payment_model.findByIdAndUpdate(id,updatePayment).then(() => {       
            res.status(200).send({status :"Payment updated"});    
        }).catch((err) => {
            console.log(err);
            res.status(400).send({status: "Error with Updating Data",error: err.message});
        });
          
});

module.exports = router;