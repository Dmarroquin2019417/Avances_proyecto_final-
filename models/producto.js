const { Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre del producto es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción del producto es obligatoria']
    },
    precio: {
        type: Number,
        required: [true, 'El precio del producto es obligatorio'],
        min: [0, 'El precio no puede ser negativo']
    },
    cantidadDisponible: {
        type: Number,
        default: 0, 
        min: [0, 'La cantidad disponible no puede ser negativa'] 
    },
    creadoEn: {
        type: Date,
        default: Date.now 
    }
});

module.exports = model('Producto', ProductoSchema);

