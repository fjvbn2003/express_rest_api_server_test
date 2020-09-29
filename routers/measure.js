var express = require('express');
const router = express.Router(); // 새로 생겼어요!


let voltages = [
    {volt: 100},
    {volt: 200},
    {volt: 300}
]

let currents = [
    {curr: 20},
    {curr: 30},
    {curr: 40}
]
router.get('/volt/ac', (req, res)=>{
    res.json(voltages)
})
router.get('/volt/dc', (req, res)=>{
    res.json(voltages)
})
router.get('/curr/ac', (req, res)=>{
    res.json(currents)
})
router.get('/curr/dc', (req, res)=>{
    res.json(currents)
})
module.exports = router 
