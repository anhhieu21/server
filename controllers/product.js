const Product = require('../models/products');
const User = require('../models/user');
const userModel = require('../models/user');
const productModel = require('../models/products');

exports.getAll = (req,res,next) =>{
    productModel.findAll().then(listProduct =>{
        // const listProduct = Object.assign({},product);
        
        res.status(200).json(
            listProduct,
        );
    })
}

exports.createProduct = (req, res, next) =>{
    const file = req.file;
    const _name_product = req.body.name_product;
    const _price_product = req.body.price_product;
    const _detail_product = req.body.detail_product;
    const _type1_product = req.body.type1_product;
    const _type2_product = req.body.type2_product;
    const _status_product = req.body.status_product;
    const _id_user = req.body.id_user;
    if(!file){
        res.status(400).json({
            status: false,
            message: "chưa đăng ảnh",
        })
    } else{
        _image_product = "http://192.168.0.106:2004/images/"+file.filename;
        const _product = new Object({
            name_product: _name_product,
            price_product: _price_product,
            detail_product: _detail_product,
            type1_product: _type1_product,
            type2_product: _type2_product,
            status_product: _status_product,
            image_product: _image_product,
            id_user: _id_user,
        });
        productModel.create(_product);
        res.status(200).json({
            status: true,
            message: "Thêm thành công!",
        })
        
    }
}
exports.getUserbyID = (req, res, next) =>{
    const _idUser = req.body.id_user;
    userModel.findOne({where:{ id:_idUser }}).then(user =>{
        res.status(200).json({
            status: true,
            message: "hello",
            user: user,
        })
    })
}
exports.getProductbyId = (req,res,next)=>{
    const _id_product = req.body.id_product;
    productModel.findOne({where:{id_product:_id_product}}).then(product =>{
        res.status(200).json({
            status: true,
            message: "true",
            product: product
        })
    })
}
exports.search = (req,res,next) =>{
    const _name_product = req.query.name_product;
    productModel.filter((product)=>{
        res.status(200).json({
            product,
        })
    })
}