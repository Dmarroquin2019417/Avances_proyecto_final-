const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { productosGet, obtenerProductoPorId, productosPut, productosDelete, productosPost } = require('../controllers/products.controller');
const { validarJWT } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get("/", productosGet);

router.get(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], obtenerProductoPorId);

router.put(
    "/:id",
    [
        validarJWT,
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], productosPut);

router.delete(
    "/:id",
    [
        validarJWT,
        tieneRole('ADMIN_ROLE'), // Solo los usuarios con rol 'ADMIN_ROLE' pueden eliminar productos
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        validarCampos
    ], productosDelete);

router.post(
    "/",
    [
        validarJWT,
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("descripcion", "La descripción es obligatoria").not().isEmpty(),
        check("precio", "El precio es obligatorio").not().isEmpty(),
        check("cantidadDisponible", "La cantidad disponible es obligatoria").not().isEmpty(),
        validarCampos,
    ], productosPost);

module.exports = router;
