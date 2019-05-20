const express =  require('express')
const bodyPasser =  require('body-parser')
const path = require('path')

const exp = express();
exp.use(bodyPasser.json())
exp.use(bodyPasser.urlencoded({extended:false}))

exp.use(express.static(__dirname));

exp.get("/",(req,res)=>{
    res.send("ok")
})

require('./controllers/authController')(exp); // passando instancia do express..
require('./controllers/projectController')(exp); // passando instancia do express..
require('./controllers/HomeController')(exp); // passando instancia do express..



exp.listen(3000,()=>{
    console.log("Server is listening on port 3000");
});
