const firebase = require('../db');
const users = require('../models/users');
const usersmodel = require('../models/users');
const firestore = firebase.firestore();

const adduser = async (req,res) => {
    try {
        const data = req.body;
        await firestore.collection('users').doc().set(data);
        res.status(200).json({
            status:200,
            message:"User saved successfully"
        });
    } catch (error) {
        res.status(400).json({
           status:400,
           message:(error.message)
        });
    }
}

const getalluser = async (req,res,next) => {
    try {
        const users = await firestore.collection('users');
        const data = await users.get();
        const usersArray = [];
        if(data.empty) {
            res.status(404).json({
                status:404,
                message:"no players have"
            });
        }else {
            data.forEach(doc => {
                const users = new usersmodel(
                    doc.id,
                    doc.data().firstname,
                    doc.data().lastname,
                    doc.data().age,
                    doc.data().gender,
                    doc.data().contact,
                    doc.data().email,
                    doc.data().address,
                    doc.data().password
                );
                usersArray.push(users);
            });
            res.send(usersArray);
           
        }
    } catch (error) {
        res.status(400).json({
            status:400,
            message:(error.message)
        })
    }
}

const getuser = async (req,res,next) => {
    try{
        const id = req.params.id;
        const users = await firestore.collection('users').doc(id);
        const data = await users.get();
        if(!data.exists) {
            res.status(404).json({
                status:404,
                message:"player not found"
            });
        }else {
            res.send(data.data());
        }
    }catch(error) {
        res.status(400).json({
            staus:400,
            message:(error.message)
        });
    }
}

const updateuser = async (req,res,next) => {
    try{
        const id = req.params.id;
        const data = req.body;
        const users = await firestore.collection('users').doc(id);
        await users.update(data);
        res.status(200).json({
            status:200,
            message:"user update successully"
        });
    }catch(error){
        res.status(404).send(error.message);
    }
}

const deleteuser = async (req,res,next) => {
    try{
        const id = req.params.id;
        await firestore.collection('users').doc(id).delete();
        res.status(200).json({
            status:200,
            message:"user delete successully"
        });
    }catch(error){
        res.status(400).json({
            status:400,
            message:(error.message)
        });
    }
}

module.exports = {
    adduser,
    getalluser,
    getuser,
    updateuser,
    deleteuser
    
}