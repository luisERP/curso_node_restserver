

const validarArchivo = (req, res, next) =>{
    if(!req.files || Object.keys(req.files) === 0 || !req.files.archivo){
        return res.status(400).json({
            msg: "El archivo no esta siendo enviado -validarArchivo"
        });
    }
    next();
}


module.exports = {
    validarArchivo
}