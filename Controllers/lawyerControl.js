const Lawyer= require('../Models/lawyermodels');

const verify = async (req,res)=>{
   const { title,firstName,lastName,phoneNumber,country,address,city,otherName,email } = req.body
    if(!title,!email,!firstName,!lastName,!phoneNumber,!country,!address,!email,!city,!otherName){
        res.status(400).json({message:"All fields are required"})
    }
    try {
        const findUser = Lawyer.findOne({email: email});
        if (!findUser) {
            res.status(404).json({msg:"user does not exist"})
        }else{
            const newLawyer =await Lawyer.create(req.body)
            console.log(newLawyer)
            res.send("Great job! Let us move on to the next stage")
        }
    } catch (error) {
        console.log(error)
    }

}


module.exports = { verify }