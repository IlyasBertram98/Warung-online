const { User, UserProfile, Item, Order} = require('../models')
const bcryptjs = require('bcryptjs')


class UserController {
  
    // SEBELUM LOGIN

    static showHome(req, res){
        res.render('home')

      }

    static loginForm(req, res) {
        const {error} = req.query
        res.render('login-form', { error })
    } 

    static postLogin(req, res){

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

              req.session.userId = data.id
              
              res.redirect('/list') //nanti redirect ke setelah login

            } else {
              const error = 'invalid name / password'
              res.redirect(`/login?error=${error}`)
            }
          } else {
            const error = 'invalid name / password'
            res.redirect(`/login?error=${error}`)
          }
        })
        .catch(err=>{
          res.send(err)
        }) 
    }


    static logout(req, res){
      req.session.destroy((err) =>{

        if (!err) {
          res.redirect(`/login`)
        } else {
          res.send(err)
        }

      })
    }

    static registerForm(req, res) {
      const { errors } = req.query
      res.render('register-form', { errors })
      
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

        // console.log(err);
        if (err.name == 'SequelizeValidationError' || err.name == 'SequelizeUniqueConstraintError') {

          const errors = err.errors.map(el =>  el.message )
          res.redirect(`/register?errors=${errors}`)
        
        }else{

          res.send(err)
        
        }

      })
      
    }
    


    //SETELAH LOGIN

    
    static listItem(req, res) {
      Item.findAll()
      .then(dataItem => {
        // console.log(dataItem);
        res.render('listItem', {dataItem})
      })
      .catch(err => {
        res.send(err)
      })
    }

    static showUserProfile(req, res){

      User.findOne({
        where: {
          id: req.session.userId
        },
        include:{
          model : UserProfile
        }
      })
      .then(user => {
        // res.send(user)
        res.render('usersProfile', { user })
      })
      .catch(err => {
        res.send(err)
      })

    }

    static showAddUserProfile(req, res){
      res.render('addUserProfile')
    }

    static postAddUserProfile(req, res){
      const { adress, phone } = req.body

      UserProfile.create({
        UserId: req.session.userId,
        adress: adress,
        phone: phone
      })
      .then(
        res.redirect('/users')
      )
      .catch(err => {
        res.send(err)
      })
    }


}
      
      

module.exports = UserController