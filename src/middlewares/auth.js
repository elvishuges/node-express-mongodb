const jwt = require('jsonwebtoken')
const authConfig = require('../config/auth')
// esse middleware interceptará a requisição e verificará o token do header...
module.exports = (req,res,next) =>{

    const authHeader = req.headers.authorization;
    
    /**
     * fazer verificações simples antes de fazer a verificação mais pesada para a máquina
     */
    if(!authHeader)
        return res.status(401).send({Error:"No token provider"});

    const parts = authHeader.split(' ');

    if(!parts.lenght === 2)    
        return res.status(401).send({Error:"Token Erro"});

    const [scheme,token] = parts;

    // regex para verificar se existe a palavra Bearer 
    if(!/^Bearer$/i.test(scheme))
         return res.status(401).send({Error:"Token mal formado"});
    
    // caso o token não bata com o config o callback é chamado 
    // esse parametro decoded tem o atributo id, oassado para jwb.sign()..
    jwt.verify(token,authConfig.secret,(err,decodec) =>{
        if(err) return res.status(401).send({Error:"Token invalido"}); // caso o teoken nao bata
        
        req.userId = decodec.id;
        return next();
    })
    
    
}