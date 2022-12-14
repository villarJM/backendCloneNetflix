//http://localhost:4000/api/v1/clonenetflix
const {Router} = require('express')
const router = Router()
const { SignUp, ManageUsers, AddProfile, AddGender, ManageGenders, AddSerie, AddMovies, ManageSerie, ManageMovies, AddAccount, ManageAccount, EditAccount, ManageSubscription, Login, DisableUser, Search, ChangePass } = require('../controllers/clonenetflix')
///POST///
router.post("/signup", SignUp)
router.post("/addprofile", AddProfile)
router.post("/addgender", AddGender)
router.post("/addserie", AddSerie)
router.post("/addmovies", AddMovies)
router.post("/addaccount", AddAccount)
router.post("/login", Login)
///GET///
router.get("/manageusers", ManageUsers)
router.get("/managegenders", ManageGenders)
router.get("/manageseries", ManageSerie)
router.get("/managemovie", ManageMovies)
router.get("/manageaccount", ManageAccount)
router.get("/managesubs", ManageSubscription)
router.get("/search", Search)
///PUT///
router.put("/editaccount", EditAccount)
router.put("/changepass", ChangePass)
///DELETE//
router.delete("/disableuser/id/:ID", DisableUser)

module.exports = router