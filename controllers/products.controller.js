const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Producto = require('../models/producto');

const productosGet = async (req, res = response) => {
    try {
        const { limite, desde } = req.query;
        const productos = await Producto.find()
            .skip(Number(desde))
            .limit(Number(limite));
        const total = await Producto.countDocuments();

        res.status(200).json({
            total,
            productos
        });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los productos', error: error.message });
    }
};

const obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el producto', error: error.message });
    }
};

const productosPut = async (req, res) => {
    try {
        const { id } = req.params;
        const productoActualizado = await Producto.findByIdAndUpdate(id, req.body, { new: true });
        if (!productoActualizado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto actualizado exitosamente', producto: productoActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el producto', error: error.message });
    }
};

const productosDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const productoEliminado = await Producto.findByIdAndDelete(id);
        if (!productoEliminado) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json({ mensaje: 'Producto eliminado exitosamente', producto: productoEliminado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el producto', error: error.message });
    }
};

const productosPost = async (req, res) => {
    try {
        const { nombre, descripcion, precio, cantidadDisponible } = req.body;
        const producto = new Producto({ nombre, descripcion, precio, cantidadDisponible });
        await producto.save();
        res.status(201).json({ mensaje: 'Producto creado exitosamente', producto });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el producto', error: error.message });
    }
};

module.exports = {
    productosGet,
    obtenerProductoPorId,
    productosPut,
    productosDelete,
    productosPost
};
