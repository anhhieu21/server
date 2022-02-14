const { Sequelize } = require('sequelize');

const db = new Sequelize('chototuser', 'root', '', {
  host: 'localhost',
  dialect:'mysql'
});
db.authenticate().then(()=>{
    console.log('connect server!!')
})

module.exports = db;