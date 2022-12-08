const { User, UserProfil, Item, Order} = require('../models')

  class UserController {

    static showHome(req, res){
        res.render('home')

      }

      static registerForm(req, res) {
        res.render('register-form')
        
      }
      
      static postRegister(req, res) {
        // console.log(req.body);
        const {name, password, email, role} = req.body
        const dataUser = {name, password, email, role}
        
        User.create(dataUser)
        .then(_ => {
          res.redirect('/login')
        })
        .catch(err => {
          res.send(err)
        })
        
      }
      static loginForm(req, res) {
          res.render('login-form')
      } 
      
      static listItem(req, res) {
        Item.findAll({
          include: Order,
          order: [
            ['createdAt', 'DESC']
          ]
        })
        .then(dataItem => {
          // console.log(dataItem);
          res.render('listItem', {dataItem})
        })
        .catch(err => {
          res.send(err)
        })
      }
}
      
      

module.exports = UserController