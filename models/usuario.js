const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'La password es obligatorio']
    },
    role:{
        type: String,
        required: true,
        enum: ["ADMIN_ROLE", "CLIENTE_ROLE"],
        default: "CLIENTE_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    }
});

UsuarioSchema.methods.toJSON = function(){
    const { __v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', UsuarioSchema);