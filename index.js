const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
app.use(cors());
app.use(bodyParser.json({limit: "100mb"}))


const axios=require('axios')

app.post('/apiCall', async(req, res) => {



    let data={
        username : "Chrome.Extension",
        password : "Chrome@2023!"
    }

    try{
        let {username,password} = req.body;


    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const session_url = 'https://app.orcanos.com/orcanosdemo/api/v2/Json/QW_Login';

    var config = {
      method: 'post',
      url: session_url,
      headers: { 'Authorization': 'Basic '+ encodedToken }
    };

     let response = await axios(config);
     if(response.status == 200){
        return res.status(200).send({data:response.data})
     }
     else{
        return res.status(400).send({error:"Wrong Credentials"})
     }


//    const token = `username:password`;
//     const encodedToken = Buffer.from(token).toString('base64');
//     console.log('encodedToken', encodedToken)

}
  catch(error){
    console.log(error)
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})