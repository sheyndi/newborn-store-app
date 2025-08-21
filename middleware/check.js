import jwt from "jsonwebtoken"
export function checkUser(req, res, next) {
    let token = req.headers.authorization;
    if (!token)
        return res.status(401).json({ title: "ראשית בצע כניסה", message: "unauthorized" })

    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        req.user = result;
        next()
    }
    catch (err) {
        return res.status(502).json({ title: "ראשית בצע כניסה", message: "unauthorized" + err.message })
    }
}

export function checkManeger(req, res, next) {
    let token = req.headers.authorization;
    
    if (!token){
        return res.status(401).json({ title: "ראשית בצע כניסה", message: "unauthorized" })}

    try {
        let result = jwt.verify(token, process.env.SECRET_KEY);
        if (result.role != 'admin')
            return res.status(401).json({ title: "אין לך הרשאת גישה", message: "unauthorized" })
        req.user = result;
        next()
    }
    catch (err) {
        
        return res.status(401).json({ title: "ראשית בצע כניסה", message: "unauthorized" + err.message })
    }
}

