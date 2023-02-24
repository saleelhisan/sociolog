import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// import Token from '../models/token'
// import sendEmail from '../utils/sendEmail'
// import crypto, { verify } from 'crypto'
// import router from "../routes/users.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {

    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;
    console.log(req.body);
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    });

    // const token = await new Token({
    //   userId:newUser._id,
    //   token: crypto.randomBytes(32).toString("hex")
    // }).save()
    // const url = `${process.env.BASE_URL}users/${newUser._id}/verify/${token.token}`
    // await sendEmail(newUser.email, "Verify Email", url)

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    // res.status(200).json({ msg: "An email send to your account please verify" });
  } catch (err) {
    res.status(500).json({ error: 'User already exists!' });
  }
};

// router.get("/:id/verify/:token", async (req, res) => {
//   try{
//     const user = await User.findOne({_id:req.params.id})
//     if(!user) return res.status(400).send({message:"invalid link"})

//     const token = await Token.findOne({
//       userId:user._id,
//       token:req.params.token
//     })
//     if(!token)return res.status(400).send({message:"invalid link"})

//     await User.updateOne({_id:user._id,verified:true})
//     await token.remove()

//     res.status(200).send({message:'email verified succesfully'})
//   }catch(error){
//     res.status(500).send({message:"internal server error"})
//   }
// })


/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    const msg = "User does not exist."
    if (!user) return res.status(400).json({ msg });

    const isBlocked = await User.findOne({ email: email, isBlocked: true });

    if (isBlocked) {
      res.status(500).json({ msg: "You are blocked" })
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password " });

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      delete user.password;
      res.status(200).json({ token, user });
    }


  } catch (err) {
    res.status(500).json({ msg: "something went wrong!!" });
  }
};


// module.exports = router