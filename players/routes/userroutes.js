const express = require('express');
const { adduser,
    getalluser,
    getuser,
    updateuser,
    deleteuser
    } = require('../controllers/usercontroller');

const router = express.Router();

router.post('/player', adduser);
router.get('/players', getalluser);
router.get('/player/:id',getuser);
router.put('/player/:id',updateuser);
router.delete('/player/:id',deleteuser);

module.exports = {
    routes: router
}
