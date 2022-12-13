const userDL= require ("../DL/user.controller")
async function creatNewUser(data){

    if (!data.email || !data.password) throw "missing data"

let user = await userDL.readOne({email:data.email})
if(user) throw "user exist"

let res = await userDL.creat(data)
return res

}


module.exports= creatNewUser()