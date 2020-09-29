const express = require('express')
const app = express()
let meas_router = require('./routers/measure')
const port = 2020

app.get('/', (req, res) => {
  res.send('정밀측정장비를 원격으로 다루기 위한 node.js express 기반 REST API 서버 입니다.')
})
app.use('/meas',meas_router)
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
