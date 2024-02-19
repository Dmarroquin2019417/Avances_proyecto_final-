const Usuario = require('../models/usuario');
const Role = require('../models/role');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

const existenteEmail = async (correo = '') => {
    const existeEmail = await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const existeUsuarioById = async ( id = '') => {
    const existeUsuario = await Usuario.findOne({id});
    if(existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

const existeProductoPorId = async (id = '') => {
    const existeProducto = await Producto.findById(id);
    if (!existeProducto) {
        throw new Error(`El producto con el ID ${id} no existe.`);
    }
};

const existeCategoriaPorId = async (id = '') => {
    const existeCategoria = await Categoria.findById(id);
    if (!existeCategoria) {
        throw new Error(`La categoría con el ID ${id} no existe.`);
    }
};


module.exports = {
    existenteEmail,
    existeUsuarioById,
    esRolValido,
    existeCategoriaPorId,
    existeProductoPorId
}