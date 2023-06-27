const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }))


const axios = require('axios')

app.post('/apiCall', async (req, res) => {



  let data = {
    username: "Chrome.Extension",
    password: "Chrome@2023!"
  }

  try {
    let { username, password, url } = req.body;


    const token = `${username}:${password}`;
    const encodedToken = Buffer.from(token).toString('base64');
    const session_url = url;

    var config = {
      method: 'post',
      url: session_url,
      headers: { 'Authorization': 'Basic ' + encodedToken }
    };

    let response = await axios(config);
    console.log(response);
    if (response.status == 200) {
      return res.status(200).send({ data: response.data })
    }
    else {
      return res.status(400).send({ data: { HttpCode: 500, message: "Worng Credentials" } })
    }


    //    const token = `username:password`;
    //     const encodedToken = Buffer.from(token).toString('base64');
    //     console.log('encodedToken', encodedToken)

  }
  catch (error) {
    return res.status(400).send({ data: { HttpCode: 500, message: "Worng Credentials" } })
  }
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})