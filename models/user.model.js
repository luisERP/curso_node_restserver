const { Schema, model} = require("mongoose");

const UserSchema = Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es obligatorio"]
    },
    correo: {
        type: String,
        required: [true, "El correo es obligatorio"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria"]
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
        emun: ['ADMIN_ROL', 'USER_ROL']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default : false
    }
})

UserSchema.methods.toJSON = function(){
    const { __v, password, _id, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( "User", UserSchema );
// {
//     nombre : "Nombre de usuario",
//     correo : "email@asda.com",
//     password : "contrasenna",
//     imagen : "ruta/imagen.jpg",
//     rol: "Rol",
//     estado : false,
//     google : false
// };