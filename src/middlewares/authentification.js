const jwt=require('jsonwebtoken');

// function existToken(req,res,next) {
//     const bearerHeader=req.headers["authorization"];
//     if (typeof bearerHeader !== 'undefined') {
//         const bearer = bearerHeader.split(" ");
//         req.token=bearer[1];
//         next();
//     }else{
//         res.sendStatus(403);
//         throw new Error("no token");
//     }
// }

function verifyToken(req,res,next) {
    try {
        const employe=jwt.verify(req.cookies.token,process.env.SECRET_KEY);
        next();
    } catch (error) {
        res.clearCookie("token");
        res.sendStatus(403).send({ message: error.message });
    }
 
}

module.exports={verifyToken};