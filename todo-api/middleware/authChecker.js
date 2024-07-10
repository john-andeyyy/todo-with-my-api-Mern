const jwt = require("jsonwebtoken");

// put in the .env just for hard coded
const Secret_token = "secret_ko_to";
const Secret_Ref = "secret_Ref";

// Function to generate and set tokens
const generateAndSetTokens = (user, res) => {
  const accessToken = jwt.sign(
    { id: user.id },
    Secret_token,
    { expiresIn: "10s" }
  );

  res.cookie("jwt", accessToken, {
    httpOnly: true,
    secure: true,
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    sameSite: 'none'
  });

  const refreshToken = jwt.sign(
    { id: user.id },
    Secret_Ref,
    { expiresIn: '30d' }
  );

  res.cookie("Refresh_Token", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    sameSite: 'none'
  });

  return { accessToken, refreshToken };
};

exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies['jwt'];
    const refreshToken = req.cookies['Refresh_Token'];

    if (!token) {
      return res.status(401).json({ message: "Access denied. No token provided." });
    }

    jwt.verify(token, Secret_token, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          if (refreshToken) {
            jwt.verify(refreshToken, Secret_Ref, (err, user) => {
              if (err) {
                return res.status(401).json({ message: "Invalid refresh token." });
              }
              // Generate new tokens and set them in cookies
              generateAndSetTokens(user, res);
              req.user = user;
              next();
            });
          } else {
            return res.status(401).json({ message: "No refresh token provided." });
          }
        } else {
          return res.status(401).json({ message: "Invalid token." });
        }
      } else {
        req.user = user;
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ message: "Access denied." });
  }
};
