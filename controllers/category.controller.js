const { response } = require('express');
const bcryptjs = require('bcryptjs');
const Categoria = require('../models/categoria');

const categoriasGet = async (req, res = response) => {
    try {
        const categorias = await Categoria.find();
        res.json(categorias);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener las categorías', error: error.message });
    }
};

const obtenerCategoriaPorId = async (req, res) => {
    try {
        const categoria = await Categoria.findById(req.params.id);
        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        res.json(categoria);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la categoría', error: error.message });
    }
};

const categoriasPut = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, req.body, { new: true });
        if (!categoriaActualizada) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        res.json({ mensaje: 'Categoría actualizada exitosamente', categoria: categoriaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la categoría', error: error.message });
    }
};

const categoriasDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const categoriaEliminada = await Categoria.findByIdAndDelete(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        res.json({ mensaje: 'Categoría eliminada exitosamente', categoria: categoriaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la categoría', error: error.message });
    }
};

const categoriasPost = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const categoria = new Categoria({ nombre, descripcion });
        await categoria.save();
        res.status(201).json({ mensaje: 'Categoría creada exitosamente', categoria });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la categoría', error: error.message });
    }
};

module.exports = {
    categoriasGet,
    obtenerCategoriaPorId,
    categoriasPut,
    categoriasDelete,
    categoriasPost
};
