const jwt = require('jsonwebtoken');
const JWT_SECRET = 'Kingisagoodb$oy';

const fetchuser = (req,res,next)=>{
    // Get the user from jwt token and add it to req object
    const token = req.header('auth-token');
    // console.log(token);
    if(!token){
        return res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        // console.log("Hello");
        const data = jwt.verify(token, JWT_SECRET);
        // console.log(data);
        req.user = data;
        next();
    } catch (error) {
        return res.status(401).send({error: "Please authenticate using a valid token error",error});
    }
}

module.exports = fetchuser;