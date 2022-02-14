const Product = require('../models/products');
const User = require('../models/user');
const userModel = require('../models/user');
const productModel = require('../models/products');
const Follows = require('../models/followtb');
const followsModel = require('../models/followtb');
const e = require('express');

exports.creatFollow = (req,res, next) =>{
    const _email = req.body.email;
    const _id_user_follow = req.body.id_user_follow
    followsModel.findOne({where:{ email:_email, id_user_follow: _id_user_follow}}).then(follows =>{
        if(follows){
            follows.destroy()
            res.status(200).json({
                status: false,
                message: "Đã bỏ theo dõi"
            });
        }else{
            followsModel.create({email:_email, id_user_follow: _id_user_follow});
            res.status(200).json({
                status: true,
                message: "Follow success"
            });
        }
    })
}
exports.notification = (req,res,next) =>{
    const _email = req.body.email;  
    followsModel.findAll({where:{email:_email}}).then(idfollow =>{
        res.status(200).json(
            idfollow,
        )
    })
}

exports.totalFl = (req, res, next) =>{
    const _id_user_follow =req.body.id_user_follow;
    followsModel.findAll({where:{id_user_follow:_id_user_follow}}).then(idfollowme =>{
        res.status(200).json(
            idfollowme,
        )
    })
    
}
