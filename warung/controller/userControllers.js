const { User } = require('../models')

class UserController{

    static showHome(req, res){
        res.render('home')
    }
    
    // login
    static showLogin(req, res){
      res.render('login')      

    }

    static postLogin(req, res){
      const { name, password } = req.body

      // res.send(req.body)

      User.findOne({
        where :{
          name : name
        }
      })
        .then(data => {
          res.send(data)
        })
        .catch(err =>{
          res.send(err)
        })

    }

    static showRegister(req, res){
      res.render('usersProfile')
    }

    static showItems(req, res){
      
    }

}

module.exports = UserController