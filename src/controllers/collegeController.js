const collegeModel = require("../models/collegeModel")

const validator = require('validator')


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


module.exports.createColleges = createColleges
