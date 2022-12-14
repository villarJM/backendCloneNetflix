const { request, response } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/connection")
const {modelsCloneNetflix, querySearch} = require("../models/clonenetflix")

const SignUp = async (req = request, res = response) => {
    const {Email, Password, Phone, Active, Subscription} = req.body

    if(!Email || !Password || !Active || !Subscription){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    const salt = bcryptjs.genSaltSync()
    const EncryptedPasword = bcryptjs.hashSync(Password, salt)
    let conn, sub;
    try {
        conn = await pool.getConnection()

        const [checkUser] = await conn.query(modelsCloneNetflix.queryCheckUser, [Email], (error) => {if(error) throw error})
        
        if(checkUser){
            res.status(404).json({msg: `Email '${Email}' ya está registrado.`})
            return
        }
        const [level] = await conn.query(modelsCloneNetflix.queryCheckTypeSubs, [Subscription])
        for (const key in level) {
            sub = level[key]
        }
        register = await conn.query(modelsCloneNetflix.queryRegisterUser, [sub, Email, EncryptedPasword, Phone, Active])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el usuario con el Email: ${Email}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el usuario con Email ${Email}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const Login = async (req = request, res = response) => {
    const {Email, Password} = req.body

    if(!Email || !Password){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn, sub;
    try {
        conn = await pool.getConnection()

        const [checkUser] = await conn.query(modelsCloneNetflix.queryCheckUser, [Email], (error) => {if(error) throw error})
        
        if(!checkUser){
            res.status(404).json({msg: `Email o Contraseña son Inválidos.`})
            return
        }
        const ValidPassword = bcryptjs.compareSync(Password, checkUser.Pass)

        if (!ValidPassword) {
            res.status(403).json({msg:"El usuario o contraseña que se ingresó no son válidos."})
            return
        }
        res.json({msg:`El usuario se ha autenticado correctamente.`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const ChangePass = async (req = request, res = response) => {
    const {Email, Password, NewPassword} = req.body

    if(!Email || ! Password){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [changepass] = await conn.query(modelsCloneNetflix.queryCheckEmail, [Email], (error) => {if(error) throw error})
        
        if(!changepass){
            res.status(404).json({msg: `la usuario no está registrado.`})
            return
        }
        const passValid = bcryptjs.compareSync(Password, changepass.Pass)
        const salt = bcryptjs.genSaltSync()
        const passwordCifrada = bcryptjs.hashSync(NewPassword, salt)

        if(!passValid){
            res.status(403).json({msg:"La contraseña que se ingresó no son válidos."})
            return
        }
        register = await conn.query(modelsCloneNetflix.queryChangePass, [passwordCifrada, Email])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo actualizar la cuenta.`})
            return
        }
        res.json({msg:`Se Actualizó satisfactoriamente la cuenta.`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const DisableUser = async (req = request, res = response) => {
    const {ID} = req.params

    if(!ID){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }

    let conn;
    try {
        conn = await pool.getConnection()

        const result = await conn.query(modelsCloneNetflix.queryDisableUserID,[ID], (error) => {if(error) throw error})
        
        if (result.affectedRows === 0) {//En caso de no haber resgistros lo informamos
            res.status(404).json({msg: `No exiten usuarios registrados con el ID ${ID}`})
            return
        }

        res.json({msg:`Se eliminó satisfactoriamente el usuario con ID ${ID}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const AddProfile = async (req = request, res = response) => {
    const {Email, Password, Name, UnderAge, Active} = req.body

    if(!Email || !Password || !Name || !UnderAge || !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn, ID;
    try {
        conn = await pool.getConnection()

        const [checkProfile] = await conn.query(modelsCloneNetflix.queryCheckProfile, [Name, Email], (error) => {if(error) throw error})
        
        if(checkProfile){
            res.status(404).json({msg: `Perfil '${Name}' ya está Registrado.`})
            return
        }
        const [checkid] = await conn.query(modelsCloneNetflix.queryCheckUserID, [Email, Password], (error) => {if(error) throw error})
        for (let I in checkid){
            ID = checkid[I]
        }
        register = await conn.query(modelsCloneNetflix.queryRegisterProfile, [ID, Name, UnderAge, Active])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el Perfil con el Email: ${Email}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el perfil con ${Name} con Email ${Email}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const ManageUsers = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection()

        const checkUser = await conn.query(modelsCloneNetflix.queryCheckAllUser, (error) => {if(error) throw error})

        if(!checkUser){
            res.status(404).json({msg: `Ningún Usuario Registrado.`})
            return
        }
        res.json({checkUser})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const AddGender = async (req = request, res = response) => {
    const {Gender, Active} = req.body

    if(!Gender || !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [checkgender] = await conn.query(modelsCloneNetflix.queryCheckGender, [Gender], (error) => {if(error) throw error})
        
        if(checkgender){
            res.status(404).json({msg: `Género '${Gender}' ya está registrado.`})
            return
        }
        register = await conn.query(modelsCloneNetflix.queryRegisterGender, [Gender, Active])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar el Género con el nombre: ${Gender}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente el Género: ${Gender}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const ManageGenders = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection()

        const checkgender = await conn.query(modelsCloneNetflix.queryCheckAllGender, (error) => {if(error) throw error})

        if(!checkgender){
            res.status(404).json({msg: `Ningún Usuario Registrado.`})
            return
        }
        res.json({checkgender})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const AddMovies = async (req = request, res = response) => {
    const {Name, Description, Year, Genders, Active} = req.body

    if(!Name || !Description || !Year || !Genders || !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [checkgender] = await conn.query(modelsCloneNetflix.queryCheckMovie, [Name], (error) => {if(error) throw error})
        
        if(checkgender){
            res.status(404).json({msg: `La Pelicula '${Name}' ya está registrado.`})
            return
        }
        register = await conn.query(modelsCloneNetflix.queryRegisterMovie, [Name, Description, Year, Genders, Active])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar la película con el nombre: ${Name}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente la Película: ${Name}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const AddSerie = async (req = request, res = response) => {
    const {SerieName, Description, Gender, Year, Active} = req.body

    if(!SerieName || !Description  || !Gender || !Year || !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [checkserie] = await conn.query(modelsCloneNetflix.queryCheckSerie, [SerieName], (error) => {if(error) throw error})
        if(checkserie){
        
        } 
        
        register = await conn.query(modelsCloneNetflix.queryRegisterSerie, [SerieName, Description, Gender, Year, Active])
        res.json({msg:`Se agregó satisfactoriamente la Serie ${SerieName}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const ManageSerie = async (req = request, res = response) => {
    
    let conn, result;
    try {
        conn = await pool.getConnection()

        const checkserie = await conn.query(`SELECT Name FROM Series`, (error) => {if(error) throw error})
        
        if(!checkserie){
            res.status(404).json({msg: `Ninguna Serie registrado.`})
            return
        }

        
        res.json({checkserie})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const ManageMovies = async (req = request, res = response) => {
    
    let conn;
    try {
        conn = await pool.getConnection()

        const [checkmovie] = await conn.query(modelsCloneNetflix.queryCheckAllMovies, (error) => {if(error) throw error})
        
        if(!checkmovie){
            res.status(404).json({msg: `Ninguna Película registrado.`})
            return
        }
        res.json({checkmovie})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const AddAccount = async (req = request, res = response) => {
    const {Name, CardNumber, ExpirationDateMonthYear, SecurityCode, Active} = req.body

    if(!Name || !CardNumber || !ExpirationDateMonthYear || !SecurityCode || !Active){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [checkaccount] = await conn.query(modelsCloneNetflix.queryCheckAccount, [Name, CardNumber], (error) => {if(error) throw error})
        
        if(checkaccount){
            res.status(404).json({msg: `Nombre '${Name}' ya está registrado.`})
            return
        }
        register = await conn.query(modelsCloneNetflix.queryRegisterAccount, [Name, CardNumber, ExpirationDateMonthYear, SecurityCode, Active])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo agregar la Cuenta con el nombre: ${Name}`})
            return
        }
        res.json({msg:`Se agregó satisfactoriamente la Cuenta.`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const ManageAccount = async (req = request, res = response) => {
    
    let conn;
    try {
        conn = await pool.getConnection()

        const checkaccount = await conn.query(modelsCloneNetflix.queryCheckAllAccount, (error) => {if(error) throw error})
        
        if(!checkaccount){
            res.status(404).json({msg: `Ninguna Cuenta registrado.`})
            return
        }
        res.json({checkaccount})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const EditAccount = async (req = request, res = response) => {
    const {Name, CardNumber, ExpirationDateMonthYear, SecurityCode, Active} = req.body

    if(!Name || !CardNumber || !ExpirationDateMonthYear || !SecurityCode){
        res.status(400).json({msg: "Faltan Datos"})
        return
    }
    let conn;
    try {
        conn = await pool.getConnection()

        const [checkaccoun] = await conn.query(modelsCloneNetflix.queryCheckAccount, [Name, CardNumber], (error) => {if(error) throw error})
        
        if(!checkaccoun){
            res.status(404).json({msg: `la Cuenta no está registrado.`})
            return
        }
        register = await conn.query(modelsCloneNetflix.queryEditAccount, [CardNumber, ExpirationDateMonthYear, SecurityCode, Active, Name])
        
        if (register.affectedRows === 0) {
            res.status(404).json({msg: `No se pudo actualizar la cuenta.`})
            return
        }
        res.json({msg:`Se Actualizó satisfactoriamente la cuenta.`})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const ManageSubscription = async (req = request, res = response) => {
    let conn;
    try {
        conn = await pool.getConnection()

        const checksubs = await conn.query(modelsCloneNetflix.queryCheckSubs, (error) => {if(error) throw error})

        if(!checksubs){
            res.status(404).json({msg: `Ningúna Subscripción Registrada.`})
            return
        }
        res.json({checksubs})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
const Search = async (req = request, res = response) => {
    const {Search} = req.body
    let conn, estado;
    try {
        conn = await pool.getConnection()

        const found = await conn.query(querySearch(Search), (error) => {if(error) throw error})
        
        if(!found){
            res.status(404).json({msg: `Ningún Resultado Encontrado.`})
            return
        }
        res.json({found})

    } catch (error) {
        console.log(error)
        res.status(500).json({msg: error})
    } finally {
        if (conn) conn.end()
    }
}
module.exports = {SignUp, ManageUsers, AddProfile, AddGender, ManageGenders, AddSerie, AddMovies, ManageSerie, ManageMovies, AddAccount, ManageAccount, EditAccount, ManageSubscription, Login, DisableUser, Search, ChangePass}
