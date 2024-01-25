import { query } from 'express';
import { Router } from 'express';
import pool from '../cnxBd.js';
import productosRoutes from './productos.routes.js';

const router = Router();



/* ACCEDER LOGIN */
router.post('/checkLogin', async (req, res) => {
    try {
        const { txtIdentity, txtPassword} = req.body;

        // Verifica si hay un usuario con la combinación de usuario/contraseña proporcionada
        const [queryResult] = await pool.query('SELECT * FROM tblclientes WHERE (vchCorreo = ? OR vchUsuario = ?) AND vchPassword = ?;', [txtIdentity, txtIdentity, txtPassword]);


        if (queryResult.length == 0){
            //document.getElementById("txtWarning").removeAttribute("hidden");
            res.json({ showWarning: true, message: "Usuario no encontrado o contraseña incorrecta" });
        }
        else if (queryResult.length > 0) {
            // Si hay resultados, significa que el usuario existe y la contraseña es correcta
            console.log(queryResult.length);
            console.log(req.body);
            //document.getElementById("txtWarning").removeAttribute("hidden");

            /* FUNCIONA SOLO SI COLOCO EL PARA METRO POR DEFAULT */
            const [result] = await pool.query('SELECT * FROM tblproductos');
            res.render('productos/list', {productos:result}); 
        } else {
            // Si no hay resultados, el usuario no fue encontrado o la contraseña es incorrecta
            res.json({ "message": "Usuario no encontrado o contraseña incorrecta" });
        }
    } catch (err) {
        // Código de estado y un objeto json con el error
        res.status(500).json({ message: err.message });
    }
});





/* AGREGAR CLIENTE NUEVO */

router.get('/registro', (req, res)=>{
    res.render('login-registro/registro')
});

router.post('/registrarCliente', async(req, res)=>{
    try{
        //Descomponer body (todo lo que llega por post)
        const {txtNombre, txtApepat, txtApemat, txtUsuario, txtEdad, txtTelefono, txtCorreo, txtPassword, rdbSexo} = req.body;
        const newClient={
            vchNombre: txtNombre,
            vchApepat: txtApepat,
            vchApemat: txtApemat,
            vchUsuario: txtUsuario,
            intEdad: txtEdad,
            vchTelefono: txtTelefono,
            vchCorreo: txtCorreo,
            vchPassword: txtPassword,
            vchSexo: rdbSexo
        }
        await pool.query('INSERT INTO tblclientes SET ?', [newClient]);
        res.redirect('/login')
    }
    catch(err){
        //Codigo de estado y un objeto json con el error
        res.status(500).json({message:err.message})
    }
});


export default router;
