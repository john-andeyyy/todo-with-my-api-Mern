const jwt = require("jsonwebtoken");

const Secret_token = "secret_ko_to";
const Secret_Ref = "secret_Ref";

function generateAndSetTokens(user, res) {
    // Generate access token
    const accessToken = jwt.sign(
        { id: user.id },
        Secret_token,
        { expiresIn: "10s" }
    );

    // Set access token in cookie
    res.cookie("jwt", accessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        sameSite: 'none'
    });

    // Generate refresh token
    const refreshToken = jwt.sign(
        { id: user.id },
        Secret_Ref,
        { expiresIn: '30d' }
    );

    // Set refresh token in cookie
    res.cookie("Refresh_Token", refreshToken, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        sameSite: 'none'
    });

    return { accessToken, refreshToken };
}

exports.generateAndSetTokens = generateAndSetTokens;
