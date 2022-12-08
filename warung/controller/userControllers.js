const { User, UserProfil, Item, Order} = require('../models')
const bcryptjs = require('bcryptjs')


class UserController {

    static showHome(req, res){
        res.render('home')

      }

    static loginForm(req, res) {
        const {errorPass, errorName} = req.query
        res.render('login-form', { errorPass, errorName })
    } 

    static postLogin(req, res){
      let errorPass
      let errorName
      const {name, password} = req.body
        // res.send(req.body)

        User.findOne({
          where: {
            name: name
          }
        })
        .then(data =>{
          
          if (data) {
            const isValid = bcryptjs.compareSync(password, data.password)

            if (isValid) {
              res.redirect('/list') //nanti redirect ke setelah login
              res.send(data)
            } else {
              errorPass = 'invalid password'
              res.redirect(`/login?errorPass=${errorPass}`)
            }
          } else {
            errorName = 'invalid username'
            res.redirect(`/login?errorName=${errorName}`)
          }
        })
        .catch(err=>{
          res.send(err)
        }) 
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