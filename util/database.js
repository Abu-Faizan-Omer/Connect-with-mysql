const Sequelize=require("sequelize")

const sequelize = new Sequelize('e_commerce','root','F1@mysql',{
    dialect : 'mysql',
    host : 'localhost'
})

module.exports=sequelize