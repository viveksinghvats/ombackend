const Product = require("../models/product");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const { query } = require("express");
const { filter } = require("lodash");
const category = require("../models/category");
const { error } = require("console");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
      if (err) {
        return res.status(400).json({
          error: "Product not found"
        });
      }
      req.product = product;
      next();
    });
};
exports.createProduct=(req,res)=>{
  let form=new formidable.IncomingForm();
  form.keepExtensions=true;
  form.parse(req,(err,fields,file)=>{
      if(err)
      {
          return res.status(404).json({
              error:"Bad Extension format"
          })
      }
      //destructuring feilds
      const {name, description,category,price,stock}=fields;
      //putting restrictions here 
      if(!name||!description||!category||!price||!stock)
      {
          return res.status(400).json({
              error:"Please include all fields"
          })
      }
      let product=new Product(fields);
      //handling file here
      if(file.photo)
      {
          if(file.photo.size>3000000)
          {
              return res.json({
                  error:"File is to big"
              })
          }
          product.photo.data=fs.readFileSync(file.photo.path);
          product.photo.contentType=file.photo.type;
      }
      product.save((err,product)=>{
          if(err)
          {
              return res.status(400).json({
                  error:"Saving product in db failed"
              })
          }
          res.json(product);
      })
  })
}
exports.getProduct=(req,res)=>
{
    req.product.photo=undefined;
    return res.json(req.product);
}
exports.photo=(req,res,next)=>{
    if(req.product.photo.data)
    {
        res.set("Content-type",req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}
exports.removeProduct=(req,res)=>{
    let product=req.product;
    product.remove((err,product)=>{
        if(err)
        {
            return req.status(404).json({
                error:"Not able to remove product"
            })
        }
        res.json({
            message:"Succesfully removed Product",
            product
        })
    })
}
exports.updateProduct=(req,res)=>{
    let form=new formidable.IncomingForm();
    form.keepExtensions=true;
    form.parse(req,(err,fields,file)=>{
        if(err)
        {
            return res.status(404).json({
                error:"Bad Extension format"
            })
        }
        let product=req.product;
        product=_.extend(product,fields);
        //handling file here
        if(file.photo)
        {
            if(file.photo.size>3000000)
            {
                return res.json({
                    error:"File is to big"
                })
            }
            product.photo.data=fs.readFileSync(file.photo.path);
            product.photo.contentType=file.photo.type;
        }
        product.save((err,product)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"Saving product in db failed"
                })
            }
            res.json(product);
        })
    })
}
exports.getAllProducts=(req,res)=>{
      let limit=req.query.limit?parseInt(req.query.limit):8;
      let sortBy=req.query.sortBy?req.query.sortBy:"_id";
      Product.find().
      select("-photo").
      populate("category").
      limit(limit).
      sort([[sortBy,"asc"]]).
      exec((err,products)=>{
          if(err){
              return res.status(400).json({
                  error:"Not able to fetch products"
              })
          }
         res.json(products); 
      })
}
exports.updateStock=(req,res,next)=>{
    let myOperations=req.body.order.product.map(prod=>{
        return {
            updateOne:{
                filter:{_id:prod._id},
                update:{$inc:{stock:-prod.count,sold:+prod.count}}
            }
        }
    });
    Product.bulkWrite(myOperations,{},(err,products)=>
    {
        if(err)
        {
           error:"Not able to BulkWrite"
        }
    })
}
exports.getAllUniqueCategory=(req,res)=>{
    Product.distinct("category",{},(err,category)=>{
        if(err)
        {
           return res.status(400).json({
               error:"Cannot fetch unique category"
           })
        }
        res.json(category);
    })
}
