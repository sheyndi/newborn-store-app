import  jwt  from "jsonwebtoken";
export function generateToken(user) {
    let t = jwt.sign({
        userId: user._id,
        role: user.role,
        username: user.userName
    },
    process.env.SECRET_KEY,
    {
        expiresIn: 60 * 60 * 3
    })
    return t;
}

