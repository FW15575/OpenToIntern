const collegeModel = require("../models/collegeModel")

const validator = require('validator')
const internModel = require("../models/internModel")


const createColleges = async function (req, res) {
    try {
        const data = req.body
        if (Object.keys(data).length == 0) {
            return res.status(400).send({ status: false, message: "Invalid request parameters please provide Collage details" })
        }
        if (!data.name){
            return res.status(400).send({ status: false, msg: " Please Provide  name" });
        }
 
        if (!data.fullName) {
            return res.status(400).send({ status: false, msg: " Please Provide  fullName" });
        }

        if (!data.logoLink) {
            return res.status(400).send({ status: false, msg: " Please Provide  logolink" });
        }

        const collegeCreation = await collegeModel.create(data)
         return res.status(200).send({ status: true, data: collegeCreation })



    }
    catch (err){
    return res.status(500).send({ status: false, error: err.message })
    }
}


const getCollegeDetails = async function(req,res){
     try{
         let data =req.query.collegeName

         if(!data) return res.status(400).send({status:true,msg:"please provide query"})

         let saveId = await collegeModel.findOne({name:data,isDeleted:false}).select({name:1,fullName:1,logoLink:1})
         if(!saveId) return res.status(404).send({status:false,msg:"college Not Found"})
        
        let intrested = await internModel.find({collageId:saveId._id, isDeleted:false}).select({name:1,email:1,mobile:1})
        if(!intrested) return res.status(404).send({status:false,msg:"Intern Not Found"})
         return res.status(200).send({status:true ,data:saveId,intrested})


     }catch(err){
         return res.status(500).send({status:false , error:err.message})
     }
     
}












module.exports.createColleges = createColleges
module.exports.getCollegeDetails =getCollegeDetails