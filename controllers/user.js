const User = require('../models/user');
const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const nodemailer = require('nodemailer');
const e = require('express');
const session = require('express-session');
const multer = require('multer');
const Product = require('../models/products');
const productModel = require('../models/products');





var codeRegister = null;
var codeforgotpass = null;
var email_fake = null;
var email_changepass = null;


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'solomonares@gmail.com',
    pass: 'rxmfzwxeauhrbkwu'
  }
});



exports.getUser = (req,res, next) =>{
    userModel.findAll().then(listUser =>{
        res.status(200).json({listUser:listUser});
        }).catch(err =>{
        if(!err.statusCode){
            err.statusCode = 500
        }
        next(err);
    });
}

exports.getUserByEmail = (req, res, next)=>{
    const email = req.body.email; 
    userModel.findOne({ where: { email: email } }).then(user =>{
        res.status(200).json({
            status: true,
            message: "Thanh cong",
            user: user,
        })
    });
}
exports.getUserById = (req, res, next)=>{
    const id = req.body.id; 
    userModel.findOne({ where: { id: id } }).then(user =>{
        res.status(200).json({
            status: true,
            message: "Thanh cong",
            user: user,
        })
    });
}
exports.createfb = (req,res,next) =>{
    const _email = req.body.email;
    const _name = req.body.name;
    userModel.findOne({where:{email:_email}}).then(user =>{
        if(user){
            res.status(200).json({
                status: true,
                message: "da co tai khoan",
                user: user
            })
        } else{
            const _user = new userModel({
                email: _email,
                password: "facebook",
                name: _name,
                status: 'active',
            });
             _user.save();
            res.status(201).json({
                status: true,
                message: "Đăng ký thành công",
                user: _user,
        })
        }
    })
}

exports.creategg = (req,res,next) =>{
    const _email = req.body.email;
    const _name = req.body.name;
    userModel.findOne({where:{email:_email}}).then(user =>{
        if(user){
            res.status(200).json({
                status: true,
                message: "da co tai khoan",
                user: user
            })
        } else{
            const _user = new userModel({
                email: _email,
                password: "google",
                name: _name,
                status: 'active',
            });
             _user.save();
            res.status(201).json({
                status: true,
                message: "Đăng ký thành công",
                user: _user,
        })
        }
    })
}

exports.sendmailcreateuser = (req,res,next) =>{
    const _email = req.body.email;
    userModel.findOne({where:{email:_email}}).then(user =>{
        if(user){
            return res.status(202).json({
                status: false,
                message: 'email da ton tai!!!',
            })
        } else{
            const a = Math.floor(Math.random() * 9999);
            var mailOptions = {
            from: 'solomonares@gmail.com',
            to: _email,
            subject: 'Thank you for register my app!!!',
            text: 'Your number: ' +a,
            };
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
            });
            codeRegister = a;
            email_fake = _email;
            return res.status(202).json({
                status: true,
                message: "Vào mail để lấy mã",
            })
        }
    })
}
exports.checkcode = (req,res, next)=>{
    if(req.body.maso == codeRegister){
        res.status(201).json({
            status: true,
            message: "Mã đúng rồi!!",
        })
    } else{
        res.status(505).json({
            status: false,
            message: "Mã sai rồi!",
        })
    }
}
exports.createUser = (req,res,next)=>{  
    userModel.findOne({where:{email:email_fake}}).then(user =>{
        if(user){
            return res.status(202).json({
                status: false,
                message: 'email da ton tai!!!',
            })
        } else{
            const _pass = req.body.password;
            const _name = req.body.name;
            const _phone = req.body.phone;
            const _address = req.body.address;
            const _user = new userModel({
                email: email_fake, 
                password:_pass,
                name: _name,
                phone: _phone,
                address: _address,
                status: 'active',
        });
        _user.save();
        res.status(201).json({
            status: true,
            message: "Đăng ký thành công"
        })
    }})
}
exports.sendmailchangepass = (req,res,next)=>{
    const _email = req.body.email;
    userModel.findOne({where:{email:_email}}).then(user =>{
         if(!user){
            res.status(202).json({
                status: false,
                message :"Email chưa đăng ký!!!",
            });
        }else{
            const b = Math.floor(Math.random() * 9999);
             var mailOptions = {
            from: 'solomonares@gmail.com',
            to: _email,
            subject: 'Change your new pass!!!',
            text: 'Your code to change pass: ' +b,
            };
            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
            console.log('Email sent: ' + info.response);
            }
            });
            res.status(200).json({
                status: true,
                message: "Vào mail để lấy code change pass mới!!"
            });
            codeforgotpass = b;
            email_changepass = _email;
        }
    });
}
exports.checkcodeforgotpass = (req,res,next)=>{
    if(req.body.passchange == codeforgotpass){
            res.status(202).json({
                status: true,
                message :"Mã đúng",
            });
        } else{
            res.status(202).json({
                status: true,
                message :"Mã sai",
            });
        }
}
exports.forgotpass = (req,res,next) =>{
    userModel.findOne({where:{email: email_changepass}}).then(user =>{
        const _password = req.body.password;
        user.update({
        password: _password
        })
        res.status(200).json({
        status : true,
        message: "Đổi mật khẩu thành công",
        })
    }) 
}
exports.checkLogin = (req, res, next) =>{
    const _email = req.body.email; 
    const _password = req.body.password
    userModel.findOne({ where: { email: _email } }).then(user =>{
        if(!user){
            res.status(201).json({
                status: false,
                message: 'Không tìm thấy email!!!'

            });
        }else if(user.status == 'pending'){
            res.status(201).json({
                status: false,
                message: 'chưa active!!!'
            });
        }
        return user;
    }).then(user =>{
        if(_password != user.password ){
            return res.status(201).json({
                status: false,
                message: 'Password sai!!!'
            });
        }else{
        res.status(200).json({
            status : true,
            message : 'Đăng nhập thành công!!!',
            user: user
        })
    }
    }).catch(err =>{
        return res.status(500).json({
            status: false,
            message: "Đăng nhập thất bại!!"
        });
    })
}
exports.updateUsers = (req, res, next)=>{
    
    const file = req.file;
    const _name = req.body.name;
    const _email = req.body.email;
    const _phone = req.body.phone;
    const _address = req.body.address;
    user = userModel.findOne({ where: { email: _email } });
    var _avatar = null;
    if(!file){
        _avatar = user.avatar;
    }else{
        _avatar =  "http://192.168.0.106:2004/images/"+file.filename;
    }
    const _user = new Object({
         name:_name, 
         phone:_phone,
         email: _email,
         address:_address,
         avatar: _avatar
    });
    userModel.update(_user,{
        where:{email: _user.email}
    })
    res.status(200).json({
        status: true,
        message: "Cập nhật thành công!!",
        user : _user
    })
    
}
exports.followUser = (req, res, next)=>{
    const _email = req.body.email;
    const _id = req.body.id_user;
    productModel.findAll({where:{id_user: _id}}).then(listProduct=>{
        if(listProduct){
            res.status(200).json({
                listProduct: listProduct,
            })
        }
    })
}
exports.followUser1 = (req, res, next)=>{
    const _id = req.body.id_user;
    productModel.findAll({where:{id_user: _id}}).then(listProduct=>{
        if(listProduct){
            res.status(200).json(
                listProduct
            )
        }
    })
}