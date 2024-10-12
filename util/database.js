const Sequelize=require("sequelize")

const sequelize = new Sequelize('node-complete','root','F1@mysql',{
    dialect : 'mysql',
    host : 'localhost'
})

module.exports=sequelize