const jwt = require('jsonwebtoken');
const JWT_SECRET =  process.env.JWT_SECRET;

function authenticateToken(req,res,next) {
    const authHeader = req.header('Authorization');
    
    if(!authHeader) return res.status(401).json({message: "Forbidden: Missing Token!"});

    const [bearer, token] = authHeader.split(" ");
    if(bearer !== "Bearer" && !token) return res.status(401).json({message: "Forbidden: Invalid Token format!"});

    jwt.verify(token, JWT_SECRET, (error, user) => {
        if(error) return res.status(403).json({message: "Forbidden: Invalid Token!"});
        req.user = user;
        next();
    })
}

module.exports = {authenticateToken};