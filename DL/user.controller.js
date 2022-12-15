const userData = require("./user.model")


async function creat (data){
   return await userData.create(data)
 
}

async function read (filter){
    return await userData.find(filter)
  }

  async function readOne (filter){
    let res = await read(filter)
    return res[0]
  }
async function update (id, newData){
    return await userData.updateOne({_id: id, newData})

}

async function del (id){
    return await update (id, {isActive: false})
 
}


module.exports= ({creat, read, update, del, readOne})