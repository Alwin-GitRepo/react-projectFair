const Users = require("../Models/userSchema");

// jwt
const jwt = require("jsonwebtoken");

//  to define registration
exports.register = async (req, res) => {
    console.log("Inside the register function");

    const { username, email, password } = req.body;
    try {
        const existingUser = await Users.findOne({ email });
        if (existingUser) {
            return res.status(406).json("User already registered");
        } else {
            const newUser = new Users({
                username,
                email,
                password,
                github: "",
                linkedin: "",
                profile: "",
            });
            await newUser.save(); // Data is saved in the database
            // Send response with the new user object
            res.status(200).json(newUser);
        }
    } catch (error) {
        res.status(500).json('Register API failed'+error.message);
    }
};

// to define login function
exports.login = async (req, res) => {
    console.log( " inside login function");
    const {email,password} = req.body;
    
    try {
        const existingUser = await Users.findOne({ email });
        if(existingUser){
            if(existingUser.password === password) {
                // generate token
                const token = jwt.sign({userId:existingUser._id},"SectretPFair")
                res.status(200).json({existingUser,token})
            }else{
                res.status(401).json('wrong password')
            }
        }else{
            res.status(404).json("No user found with this email")
        }
    } catch (error) {
        res.status(500).json('Register API failed'+error.message);
    }
}
