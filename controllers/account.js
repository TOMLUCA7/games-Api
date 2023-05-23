import express from 'express';
const router = express.Router();
import mongoose from 'mongoose';
import Account from '../models/account.js';
import bcryptjs from 'bcryptjs'; //Password crypt
import jwt from 'jsonwebtoken'; //Manage TOKENS


router.post('/createAccount', async(req,res) => {

    const user = req.body.user;
    const id = new mongoose.Types.ObjectId();

    Account.findOne({email: user.email})
    .then(async account => {
        if(account){
            return res.status(401).json({
                message: 'Account is not available'
            })
        } else {
            const hash = await bcryptjs.hash(user.password, 10);

            const _account = new Account({
                _id: id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: hash,
                verficationCode: generateRandomIntegerInRange(1000,9999),
                mobile: user.mobile
            })
            _account.save()
            .then(accountCreated => {
                return res.status(200).json({
                    message: accountCreated
                })
            })
            .catch(error => {
                return res.status(500).json({
                    message: error.message
                })
            })
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

router.post('/login', async(req,res) => {

    const user = req.body.user;
    Account.findOne({email: user.email})
    .then(async account => {
        if(account){

            const isMatch = await bcryptjs.compare(user.password, account.password);
            if(isMatch && account.isVerified){

                const dataTotoken = {
                    _id: account._id,
                    firstName: account.firstName,
                    lastName: account.lastName,
                    email: account.email
                }
                const token = await jwt.sign({dataTotoken}, process.env.JWT_KEY);
                return res.status(200).json({
                    message: token
                })
            } else {
                return res.status(401).json({
                    message: 'Password not match or account not verified yet'
                })
            }
        } else {
            return res.status(401).json({
                message: 'Account not exist'
            })
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})

router.put('/verifyAccount', async(req,res) => {

    const verify = req.body.verify;

    console.log(verify);

    Account.findOne({email: verify.email, verficationCode: verify.verficationCode})
    .then(account => {
        if(account){
            account.isVerified = true;
            account.save()
            .then(account_updated => {
                return res.status(200).json({
                    message: account_updated
                })
            })
        } else {
            return res.status(401).json({
                message: 'Something went wrong...'
            })
        }
    })
    .catch(error => {
        return res.status(500).json({
            message: error.message
        })
    })
})



function generateRandomIntegerInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default router;