const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize= require('./util/database');
const Product=require('./models/product');
const User=require('./models/user');
const Cart=require('./models/cart');
const CartItem=require('./models/cart-item');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');





app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req,res,next)=>{
    User.findByPk(1).then(user=>{
        req.user=user;
        next(); 
    }).catch(err=>{
        console.log(error);
    })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);


Product.belongsTo(User,{constrains:true,onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product,{through:CartItem});
Product.belongsToMany(Cart,{through:CartItem});




sequelize.sync().then(result=>{
    return User.findByPk(1);
}).then(user=>{
    if(!user)
    {
        User.create({name:'Max',email:'test@gmail.com'});
    }
    return user;
}).then(user=>{
    //console.log(user);
   return  user.createCart();
}).then(cart=>{
    //console.log(user);
    app.listen(3000);
}) .catch(err=>{
    console.log(err);
});