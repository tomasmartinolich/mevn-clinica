const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    console.log("entra middleware");
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        console.log("user data:");
        console.log(req.userData);
        next();
    } catch(error) {
        return res.status(401).json({
            message: 'Autenticación fallida'
        })
    }
    next();
};