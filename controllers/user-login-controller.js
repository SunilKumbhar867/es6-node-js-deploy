import express from 'express';
import User from "../models/user-schema.js";
import bcrypt from 'bcryptjs';
import { generateToken } from '../util.js'


export const register = async (req, res) => {
    // console.log(bcrypt.hashSync(req.body.password, 8));
    try {
        //use Schema for validation
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });

        const createdUser = await user.save();
        res.send({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            isSeller: user.isSeller,
            token: generateToken(createdUser),
        });
    } catch (error) {
        console.log(`Error :- ${error}`)
    }

};


export const signIn = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    isSeller: user.isSeller,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'Invalid email or password' });
    } catch (error) {
        console.log(`Error :- ${error}`)
    }

}


export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
        console.log(users);
    } catch (error) {
        console.log(`Error :- ${error}`)
    }

}

