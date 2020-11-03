const jwt = require('jsonwebtoken');

function verify(req, res, next){
    if(!req.headers.access_token){
        return res.status(401).send("no autorizado")
    }
    const token = req.headers.access_token.split(' ')[1];
    if(token === 'null'){
        return res.status(401).send("no autorizado")
    }
    const payload = jwt.verify(token,'secret');
    console.log('payload '+payload._id);
    req.userId = payload._id;
    next();
}
module.exports = verify;