const router = require('express').Router();
let user_model = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



router.route('/register').post((req, res, next)=>{
    bcrypt.hash(req.body.pass, 10,function(err,hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

         let systemreg = new user_model({
            username : req.body.user,
            password : hashedPass,
        })
        systemreg.save()
        .then(systemreg =>{
            res.json({
                message:'User Added'
            })
        }).catch(error=>{
            console.log(error);
        })

    })
});

router.route('/login').post((req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;

    user_model.findOne({$or: [{username:username}]})
    .then(systemreg =>{
        if(systemreg){
                bcrypt.compare(password, systemreg.password, function(err, result){
                    if(err){
                        res.json({
                            error:err
                        })
                    }
                    if(result){
                        console.log(err);
                        res.json({
                            message: true
                        })      
                    }else{
                        console.log(err);
                         res.json({
                            message: false
                        })    
                    }
                })

        }else{
            res.json({
                message: false
            })
        }
    })
});

module.exports = router;