const userModel=require("../models/user.model")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const tokenBlacklistModel = require("../models/blacklist.model")



/**
 * @route POST/api/auth/register
 * @description Register a new User,expects username,email and password
 * @access Public
 */

async function registerUserController(req,res){
  const {username,email,password}=req.body

  if(!username || !email || !password){
    return res.status(400).json({
      message : "Please Provid username ,email and Password"
    })
  }
  const isUserAlredayExists =await userModel.findOne({
    $or :[{username},{email}]
  })
  if(isUserAlredayExists){
    return res.status(400).json({
      message:"Account already exists with this email address or username"
    })
  }
  const hash= await bcrypt.hash(password,10)

  const user=await userModel.create({
    username,
    email,
    password:hash
  })

  const token=jwt.sign(
    {id:user._id,username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )

  res.cookie("token",token)

  res.status(201).json({
    message:"User registered successfully",
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })
}



/**
 * @name loginUserController
 * @description login a user ,expects email and password in the request body
 * @access Public
 */
async function loginUserController(req,res){
  const{email, password} =req.body

  const user=await userModel.findOne({email})

  if(!user){
    return res.status(400).json({
      message:"Invalid email or Password"
    })
  }
  const isPasswordValid =await bcrypt.compare(password,user.password)

  if(!isPasswordValid){
    return res.status(400).json({
      message:"Invalid Password or Email"
    })
  }
   const token=jwt.sign(
    {id:user._id,username:user.username},
    process.env.JWT_SECRET,
    {expiresIn:"1d"}
  )
  res.cookie("token",token)
  res.status(200).json({
    message:"User Logged in Successfully",
    user:{
      id:user._id,
      username:user.username,
      email:user.email
    }
  })
}


/**
 * @name logoutUserController
 * @description logout a user succesfully by blacklisting their token
 * @access public
 */
async function logoutUserController(req, res) {
  try {
    const token = req.cookies.token;

    console.log("Token from cookie:", token);   // 👈 add this

    if (token) {
      await tokenBlacklistModel.create({ token });
      console.log("Token saved to blacklist");
    }

    res.clearCookie("token");

    res.status(200).json({
      message: "User logged out successfully"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Logout failed",
      error: err.message
    });
  }
}

/**
 * @name getmeController
 * @description get the current logged in user details,
 * @private 
 */
async function getMeController(req, res) {
  const user = await userModel.findById(req.user.id)

  res.status(200).json({
    message: "User details fetched successfully",
    user: {
      id: user._id,
      username: user.username,
      email: user.email
    }
  })
}

module.exports={
  registerUserController,
  loginUserController,
  logoutUserController,
  getMeController
}