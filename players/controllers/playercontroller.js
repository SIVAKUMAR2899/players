const firebase = require('../db');
const playersmodel = require('../models/players');
const firestore = firebase.firestore();

const addplayer = async (req,res) => {
    try {
        const data = req.body;
        await firestore.collection('players').doc().set(data);
        res.send('Player added successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getallplayer = async (req,res,next) => {
    try {
        const players = await firestore.collection('players');
        const data = await players.get();
        const playersArray = [];
        if(data.empty) {
            res.status(404).send('no player record found');
        }else {
            data.forEach(doc => {
                const players = new playersmodel(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().age,
                    doc.data().gender,
                    doc.data().contact,
                    doc.data().email,
                    doc.data().address
                );
                playersArray.push(players);
            });
            res.send(playersArray);
           
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const getplayer = async (req,res,next) => {
    try{
        const id = req.params.id;
        const players = await firestore.collection('players').doc(id);
        const data = await players.get();
        if(!data.exists) {
            res.status(404).send('player not found');
        }else {
            res.send(data.data());
        }
    }catch(error) {
        res.status(400).send(error.message);
    }
}

const updateplayer = async (req,res,next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const players = await firestore.collection('players').doc(id);
        await players.update(data);
        res.send('Player updated successfully');
    }catch(error){
        res.status(404).send(error.message);
    }
}

const deleteplayer = async (req,res,next) => {
    try{
        const id = req.params.id;
        await firestore.collection('players').doc(id).delete();
        res.send('Player deleted successfully')
    }catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    addplayer,
    getallplayer,
    getplayer,
    updateplayer,
    deleteplayer
    
}