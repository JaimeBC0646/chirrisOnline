import { Router } from 'express';
import pool from '../cnxBd.js';

const router = Router();

/* AGREGAR PRODUCTO */
router.get('/add', (req, res)=>{
    res.render('productos/add')
});


router.post('/add', async(req, res)=>{
    try{
        //Descomponer body (todo lo que llega por post)
        const {txtNombre, txtDescripcion, fltPrecio} = req.body;
        const newProduct={
            vchNombre: txtNombre,
            vchDescripcion: txtDescripcion,
            fltPrecio: fltPrecio
        }
        await pool.query('INSERT INTO tblproductos SET ?', [newProduct]);
        /*await pool.query('INSERT INTO tblproductos (vchNombre, vchDescripcion, fltPrecio) VALUES (',vchNombre,',',vchDescripcion,',',fltPrecio,')');*/
        res.redirect('/list')
    }
    catch(err){
        //Codigo de estado y un objeto json con el error
        res.status(500).json({message:err.message})
    }
});


/* LISTAR PRODUCTOS */
router.get('/list', async(req, res)=>{
    try{
        //peticion con funcion asincrona
        const [result] = await pool.query('SELECT * FROM tblproductos');
        res.render('productos/list', {productos:result});

    }
    catch(err){
        //Codigo de estado y un objeto json con el error
        res.status(500).json({message:err.message})
    }
});


/* EDITAR PRODUCTO */
router.get('/edit/:id', async(req, res)=>{
    try{
        //peticion UPDATE
        const {id} = req.params;
        const [producto] = await pool.query('SELECT * FROM tblproductos WHERE idProducto = ?', [id]);
        const productEdit = producto[0];
        res.render('productos/edit', {producto: productEdit});
    }
    catch(err){  
        //Codigo de estado y un objeto json con el error
        res.status(500).json({message:err.message});
    }
});


router.post('/edit/:id', async(req, res)=>{
    try{
        //peticion UPDATE
        const {txtNombre, txtDescripcion, fltPrecio} = req.body;
        const {id} = req.params;
        const editProduct = {
            vchNombre: txtNombre,
            vchDescripcion: txtDescripcion,
            fltPrecio: fltPrecio
        };
        await pool.query('UPDATE tblproductos SET ? WHERE idProducto = ?', [editProduct, id]);
        res.redirect('/list');
    }
    catch(err){
        //Codigo de estado y un objeto json con el error
        res.status(500).json({message:err.message})
    }
});



/* ELIMINAR PRODUCTO */
router.get('/delete/:id', async(req, res)=>{
    try{
        const {id} = req.params;
        await pool.query('DELETE FROM tblproductos WHERE idProducto = ?', [id]);
        res.redirect('/list');
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
});


export default router;