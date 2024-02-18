const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Estudiante = require('../models/usuario')

const validarCampos = (req, res, next) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json(error);
    }

    next();
}

const validarRolCliente = async (req, res, next) => {
    const { cliente } = req.body;

    try {
        const existeUsuario = await Usuario.findById(cliente);

        if (!existeUsuario) {
            return res.status(400).json({
                msg: 'El ID del usuario proporcionado no existe'
            });
        }

        if (existeUsuario.role === "CLIENTE_ROLE") {
            req.body.role = "CLIENTE_ROLE";
            next();
        } else {
            return res.status(400).json({
                msg: 'Un Cliente no puede modificar eliminar productos'
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: 'Eyy, Error interno del servidor'
        });
    }
};


module.exports = {
    validarCampos,
    validarRolCliente
}