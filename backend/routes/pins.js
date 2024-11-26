const router = require("express").Router();
const Pin = require("../models/Pin");
const multer = require('multer');
//create a pin
router.post('/', async (req, res) => {
    try {
        const newPin = new Pin(req.body);
        const savedPin = await newPin.save();
        res.status(200).json(savedPin);
    } catch (err) {
        res.status(500).json(err);
    }
})

// get all pins
router.get('/', async (req, res) => {
    try {
        const pins = await Pin.find();
        res.status(200).json(pins);
    } catch (error) {
        res.status(500).json(error);
    }
})



module.exports = router