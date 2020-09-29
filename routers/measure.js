var express = require('express');
const router = express.Router(); // 새로 생겼어요!


let voltages = [
    {volt: 100},
    {volt: 200},
    {volt: 300},
    {volt: 400},
    {volt: 500},
    {volt: 600},
    
]

let currents = [
    {curr: 20},
    {curr: 30},
    {curr: 40},
    {curr: 50},
    {curr: 60},
    {curr: 70},
]
router.get('/volt/ac', (req, res)=>{
    res.json(voltages[Math.floor(Math.random()*voltages.length)])
})
router.get('/volt/dc', (req, res)=>{
    res.json(voltages[Math.floor(Math.random()*voltages.length)])
})
router.get('/curr/ac', (req, res)=>{
    res.json(currents[Math.floor(Math.random()*currents.length)])
})
router.get('/curr/dc', (req, res)=>{
    res.json(currents[Math.floor(Math.random()*currents.length)])
})
module.exports = router 
