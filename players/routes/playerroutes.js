const express = require('express');
const { addplayer,
        getallplayer,
        getplayer,
        updateplayer,
        deleteplayer
    } = require('../controllers/playercontroller');

const router = express.Router();

router.post('/player', addplayer);
router.get('/players', getallplayer);
router.get('/player/:id',getplayer);
router.put('/player/:id',updateplayer);
router.delete('/player/:id',deleteplayer);

module.exports = {
    routes: router
}
