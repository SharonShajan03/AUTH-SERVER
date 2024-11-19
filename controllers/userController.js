const users = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// register
exports.registerController =async(req,res)=>{
    console.log("inside register controller");
    console.log(req.body);
    const {id,firstName,secondName,email,password,phoneNum} = req.body
    try {
        const existingUser = await users.findOne({ id, email })

        if (existingUser) {
            res.status(406).json("You are already registered!!!")
        } else {
            const hashPassword = await bcrypt.hash(password, 10)
            // console.log(hashPassword);
            const newUser = new users({
                id, firstName, secondName, email, password: hashPassword, phoneNum
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (err) {
        res.status(401).json(err)
    }
} 
// login
exports.loginController = async (req, res) => {
    console.log("inside login controller");
    const { email, password } = req.body  
    // console.log(email, password);
      
    try {
        const existingUser = await users.findOne({email})
        if (existingUser) {
        const token = jwt.sign({ userId: existingUser.id }, process.env.JWTPASSWORD)
        const isMatch = await bcrypt.compareSync(password, existingUser.password)
            if (isMatch) {
                res.status(200).json({
                    users: existingUser, token
                })
            } else {
                res.status(404).json("Incorrect Password")
            }
        } else {
            res.status(404).json("Incorrect Email/Password!!!")
        }

    } catch (err) {
       console.log(err);
    }
    }
                        
// view all users

exports.allUserController = async(req,res)=>{
    console.log("inside allUserController");
    try{
        const allUser = await users.find()
         // console.log(allUser);
        res.status(200).json(allUser.map(users => ({ firstName: users.firstName, email: users.email })));


    }catch(err){
        res.status(401).json(err)
    }    
}


// userDeatils view
exports.userDetailViewController = async (req, res) => {
    console.log("inside userDetailViewController");
    const email = req.body.email

    try {
        const userDetails = await users.find({ email })
        
        if (userDetails) {
            res.status(200).json(userDetails.map(Details => ({ firstName: Details.firstName, secondName: Details.secondName, email: Details.email, phoneNum: Details.phoneNum })))
        } else {
            res.status(404).json("User Not Found")
        }
    } catch (err) {
        console.log(err);

    }

}

