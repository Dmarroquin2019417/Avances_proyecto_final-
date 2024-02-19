const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { categoriasGet, obtenerCategoriaPorId, categoriasPut, categoriasDelete, categoriasPost } = require('../controllers/category.controller');

const router = Router();

router.get("/", categoriasGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], obtenerCategoriaPorId);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], categoriasPut);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], categoriasDelete);

router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        validarCampos,
    ], categoriasPost);

module.exports = router;
