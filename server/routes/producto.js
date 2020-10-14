
const express = require('express')

const {verificaToken,verificaAdmin_Role} = require('../middlewares/autenticacion');
const producto = require('../models/producto');

let app = express();
let Producto = require('../models/producto');


// ======================
// Obtener productos
// ======================

app.get('/productos',verificaToken, (req, res) => {
    //trae todos los productos
    //populate: usuario categoria
    //paginado
    let body = req.body;
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({disponible: true})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('cateogria', 'descripcion')
        .exec((err, productos) => {
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                productos
            })
        })
});

// ======================
// Obtener productos por id
// ======================
app.get('/productos/:id',(req,res) => {
    //populate: usuario categoria
    //paginado
    let id = req.params.id;

    Producto.findById(id)
    .populate('usuario', 'nombre email')
    .populate('categoria', 'nombre')
    .exec((err, productoDB) => {
        if(err){
            return res.status(500).json({
            ok: false,
            err
        });
        }
        if(!productoDB){
            return res.status(400).json({
            ok: false,
            err
        });
        }
        res.json({
            ok:true,
            producto:productoDB
        })
    });

});
// ======================
// Buscar productos
// ======================
app.get('/productos/buscar/:termino', verificaToken,(req, res) => {

    let termino = req.params.termino;
    //Es una expresion regular RegExp es una funcion nativa de js, la 'i' es para que no entienda de mayus
    let regex = new RegExp(termino, 'i');

    Producto.find({nombre: regex})
    .populate('categoria', 'nombre')
    .exec((err, productos) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        res.json({
            ok:true,
            productos

        })
    })

});



// ======================
// Crear un nuevo producto
// ======================
app.post('/productos',verificaToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
    let body = req.body;
    let producto = new Producto({
        usuario: req.usuario._id,
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria:body.categoria
    });

    producto.save((err, productoDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }if(!productoDB){
            return res.status(400).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            producto: productoDB
        })
    })

});

// ======================
// Actualizar producto
// ======================
app.put('/productos/:id', (req, res) => {
    let id = req.params.id;
    let body = req.body;

    //AMBAS FORMAS TANTO DE PRODUCTO COMO DE CATEGORIA SON VALIDAS

    Producto.findById(id, (err, productoDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'El ID no existe'
                }
            })
        }
        productoDB.nombre = body.nombre;
        productoDB.precioUni = body.precioUni;
        productoDB.categoria = body.categoria;
        productoDB.disponible = body.disponible;
        productoDB.descripcion = body.descripcion;

        productoDB.save((err, productoGuardado) => {
            if(err){
                return res.status(500),json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                producto: productoGuardado
            });
        });

    });
});

// ======================
// Borrar producto
// ======================
app.delete('/productos/:id',verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id, (err, productoDB) => {
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!productoDB){
            return res.status(400).json({
                ok:false,
                err:{
                    message: 'ID no existe'
                }
            })
        }
        productoDB.disponible = false;
        productoDB.save((err, productoBorrado) => {
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            res.json({
                ok:true,
                productoBorrado,
                mensaje: 'Producto no disponible'
            })
        })
    })

})
module.exports = app;