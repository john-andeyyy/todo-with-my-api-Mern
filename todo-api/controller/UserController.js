const User = require("../model/User.Model");

exports.getProfile = async (req, res) => {
  console.log(req.user);
  const { email } = req.user;
  try {
    const currentUser = await User.findOne({ email }).exec();
    res.status(200).json({
      content: currentUser.email,
    });
  } catch (err) {
    res.status(401).json({
      content: err,
    });
  }
  // destructuring the object so only the email will show
};
