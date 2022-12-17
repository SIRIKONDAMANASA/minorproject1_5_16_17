var jwt = require('jsonwebtoken');
const JWT_SECRET = 'sweat4FitAPI';

const authUser = (req, res, next)=>{
    // Get the user from the JWT Token and add id to req object

    const authtoken = req.header('authorization');
    const token = authtoken.replace('Bearer ','');
    // const TokenSplit = authtoken.split(" ");
    // const token = TokenSplit[1];

    console.log("token =" + token);
    if(!token){
        res.status(401).send({
            error: "Please authenticate using a valid token"
        })
    }
    try {
        console.log("inside try");
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.id;
        console.log(req.user);
        next();
    }
    catch (error) {
        res.send(401).send({
            error: "No token"
        })
    }
   

}

module.exports = authUser;