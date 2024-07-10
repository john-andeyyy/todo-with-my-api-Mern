const bcrypt = require("bcryptjs");
const User = require("../model/User.Model");
const jwt = require("jsonwebtoken");


//! future .env
const Secret_token = "secret_ko_to"
const Secret_Ref = "secret_Ref"

exports.login = async (req, res) => {
  console.log(`login page`);
  // ! getting the value
  const { email, password } = req.body;
  try {
    // ! find the Email in db
    const checkUser = await User.findOne({ email }).exec();

    if (!checkUser) {
      return res.status(400).json({
        content: "No found user",
      });
    }
    // ! check the password if corrent
    const passwordMatch = await bcrypt.compare(password, checkUser.password);
    if (!passwordMatch) {
      return res.status(400).json({
        content: "Password is incorrect",
      });
    }
    // ! generating a token
    const accessToken = jwt.sign(
      { id: checkUser._id },
      Secret_token,
      {
        expiresIn: "10sec",
      }
    );

    // ! set the value of token in the cookie name jwt
    // console.log(accessToken)
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none'
    });
    

    const Refresh_Token = jwt.sign(
      { id: checkUser._id },
      Secret_Ref, {
      expiresIn: '30days'
    }
    )
    res.cookie("Refresh_Token", Refresh_Token, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: 'none'
    });


    return res.status(200).json({
      token: accessToken,
      // id: checkUser._id,

    });
  } catch (err) {
    res.status(400).json({ message: err });
    console.log(`error ${err}`);
  }
};


exports.RegisterUser = async (req, res) => {

  const { email, password } = req.body;
  try {
    const user = new User({ email, password });
    await user.save();
    res.json({ message: "User registered successfully", user });
    console.log(`User registered successfully`);
  } catch (err) {
    res.status(400).json({ message: "Error registering user", error: err });
  }
};


exports.Logout = async (req, res) => {
  console.log('logout fire');
  res.clearCookie('jwt', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  res.status(200).json({ message: "Logged out successfully" });
};