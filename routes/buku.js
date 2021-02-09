const express = require('express')
const router = express.Router()
const Buku = require('../models/Buku')

//CREATE
router.post('/', async (req, res) => {
    const bukuPost = new Buku({
        judul: req.body.judul,
        penerbit: req.body.penerbit,
        tglterbit: req.body.tglterbit,
        volume: req.body.volume
    })
    try{
        const buku = await bukuPost.save()
        res.json(buku)
    }catch (err) {
        res.json({message: err})
    }
})

//READ
router.get('/', async (req, res)=>{
    try{
        const buku = await Buku.find()
        res.json(buku)
    }catch (err) {
        res.json({message: err})
    }
})

//READ SATU
router.get('/:bukuId', async (req, res)=>{
    try{
        const buku = await Buku.findOne({_id: req.params.bukuId})
        res.json(buku)
    }catch (err) {
        res.json({message: err})
    }
})

//UPDATE
router.put('/:bukuId', async (req, res) =>{
    try{
        const bukuUpdate = await Buku.updateOne({_id: req.params.bukuId},{
            judul: req.body.judul,
            penerbit: req.body.penerbit,
            tglterbit: req.body.tglterbit,
            volume: req.body.volume
        })
        res.json(bukuUpdate)
    }catch(err) {
        res.json({message: err})
    }
})

//DELETE
router.delete('/:bukuId', async (req, res) =>{
    try{
        const bukuUpdate = await Buku.deleteOne({_id: req.params.bukuId})
        res.json(bukuUpdate)
    }catch(err) {
        res.json({message: err})
    }
})

module.exports = router