const internModel = require("../models/internModel")
const validator = require('validator')
const { default: mongoose } = require("mongoose")
const collegeModel = require("../models/collegeModel")
const isValidObjectId = (ObjectId) =>{return mongoose.Types.ObjectId.isValid(ObjectId)}
let isValid= /\d/
const createIntern = async function(req,res){
    try{
    const data = req.body

    if(Object.keys(data).length == 0){
        return res.status(400).send({ status: false, message: "Invalid request parameters please provide Intern details" })
    }

    if(!data.name){
        return res.status(400).send({ status: false, msg: "Please Provide name"})

    }
    if (!data.email){
      return res.status(400).send({ status: false, msg: " Please Provide email" });
    }

    const validEmail = validator.isEmail(data.email);
    if (validEmail === false){
      return res.status(400).send({ status: false, msg: "Please enter valid email"})
    }


    const checkEmail = await internModel.findOne({ email:data.email });
    if (checkEmail){
      return res.status(409).send({ status: false, msg: "This email already exist"})
    } 
    if(data.mobile.length !== 10) return res.status(400).send({status:false ,msg:"enter valid mobile no"})
  
   
    if ( !isValid.test(data.mobile)){
      return res.status(400).send({ status: false, msg: "no. should be a digit"})
    }
    let uniqueNo = await internModel.findOne({ mobile: data.mobile });
     if(uniqueNo) return res.status(400).send({status:false ,msg:"mobileNo. already exist"})

    
    if(!data.collegeId){
        return res.status(400).send({ status: false, msg: "Please Provide collegeId"})  
    }

    let collegedata = await collegeModel.findById(data.collegeId)
    if(!(isValidObjectId(data.collegeId) && collegedata)) {
      return res.status(400).send({ status: false, msg: "Please Provide valid CollegeId" });
    }

    const internCreation = await internModel.create(data)
    return res.status(201).send({ status: true, data: internCreation });
    }
    
catch(err){
return res.status(500).send({satus:false,error:err.message})
 
}
}

  module.exports.createIntern = createIntern

  
 