import bodyParser from 'body-parser';
import express from 'express';
import mongoose from 'mongoose';
import Form from './formModel.js';

const formRouter = express.Router();
formRouter.use(bodyParser.json());

formRouter.route('/')
.get((req, res, next) => {
    Form.find(req.query)
    .then(formDetails => {
        // res.statusCode(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(formDetails);
    })
    .catch(err => next(err));
})
.post((req, res,next) => {
    Form.create(req.body)
    .then(formDetails => {
        // res.statusCode(200);
        res.setHeader('Content-Type', 'application/json');
        res.json(formDetails);
    })
    .catch(err => next(err));
});

export default formRouter;