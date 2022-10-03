import { createPrivateKey } from 'crypto';
import express from 'express'
const jwt = require('jsonwebtoken');
const port = 3000;

/**
 * On créé une nouvelle "application" express
 */
 const app = express()

 const users = [
  {
  name:'terry', 
  password:'root'
 }
]
app.use(express.json())
 app.get('/', (req, res) => {
    res.send('Hello World!');
  });
  
app.post('/auth', (req, res)=>{
  const {name, password} =req.body
  const valid = users.some((user)=>user.name === name && user.password === password)
  //const token = jwt.sign({name}, createPrivateKey,{algorithm: 'RS256'} )
  if(valid)
  {
     res.send(valid)
  } else 
  {
    res.send("erreur")
  }
 
})
  app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
  });
 

 
 
 
 
