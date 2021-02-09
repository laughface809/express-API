const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const flags = db.get('flags');

const schema = Joi.object({
    question: Joi.string().trim().required(),
    answer: Joi.string().trim().required(),
    video_url: Joi.string().uri(),
});
const router = express.Router();

//BACA SEMUA
router.get('/', async (req, res, next) => {
    try {
        const items = await flags.find({});
        res.json(items);
    }catch (error){
        next(error);
    }
});

//BACA SATU
router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const item = await flags.findOne({
            _id: id,
        });
        if (!item) return next();
        return res.json(item);
    }catch (error){
        next(error);
    }
});

//BUAT SATU
router.post('/', async (req, res, next) => {
    try {
        console.log(req.body);
        const value = await schema.validateAsync(req.body);
        const inserted = await flags.insert(value);
        res.json(inserted);
    }catch (error){
        next(error);
    }
});

//UPDATE SATU
router.put('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await flags.findOne({
            _id: id,
        });
        if (!item) return next();
        await flags.update({
            _id: id,
        },{
            $set: value,
        });
        res.json(value);
    }catch (error){
        next(error);
    }
});

//HAPUS SATU
router.delete('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        await flags.remove({
            _id: id,
        });
        res.json({
            message: 'Successfully deleted',
        })
    }catch (error){
        next(error);
    }
});

module.exports = router;