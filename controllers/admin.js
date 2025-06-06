const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editing:false 
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  req.user.createProduct({
    title:title,
    price:price,
    imageUrl:imageUrl,
    description:description
   })
 .then(result=>{
  console.log(result);
  res.redirect('/admin/products');
 }).catch(err=>{
  console.log(err);
 })
 
};

exports.getEditProduct = (req, res, next) => {
  const editMode=req.query.edit;
  
 
  if(!editMode)
  {
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  

  req.user.getProducts({where:{id:prodId}})
 // Product.findByPk(prodId)
  .then(products=>{
    const product=products[0];
         if(!product){
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/add-product',
         editing:true,
         product:product
    })
  }).catch(err=>{
    console.log(err);
  })
};

exports.postEditProduct=(req,res,next)=>{
  console.log(req.body);
  const prodId =req.body.productId;
  const updatedTitle=req.body.title;
  const updatedPrice=req.body.price;
  const updatedImageUrl=req.body.imageUrl;
  const updateddesc=req.body.description;
  Product.findByPk(prodId).then(product=>{
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.description=updateddesc;
    product.imageUrl=updatedImageUrl;
    return product.save();
  }).then(result=>{
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  })
    
}

exports.getProducts = (req, res, next) => {
  req.user.getProducts().then(products=>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(err=>{
    console.log(err);
  })
   

};

exports.postDeleteProduct=(req,res,next)=>{
  const prodID=req.body.productId;
  
  Product.findByPk(prodID).then(product=>{
      return product.destroy();
    }).then(result=>{
      res.redirect('/admin/products')
    })
   .catch(err=>{
    console.log(err);
  });
 

}