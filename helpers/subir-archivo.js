const { v4: uuidv4 } = require('uuid');
const path = require('path');

const subirArchivo = ( files, extensionesPermitidas = ['jpg', 'png', 'gif', 'jpeg'], carpeta = "" ) => {

    return new Promise( (resolve, reject) =>{

        const { archivo } = files;
        // Validar extensiones
        const nombreCortado = archivo.name.split('.');
        const extension = nombreCortado[ nombreCortado.length - 1];
        
        if( !extensionesPermitidas.includes(extension) ){
           return reject( `La extension ${extension} no es permitida, ${extensionesPermitidas}`)
        }
        
        const nombreFinal = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads', carpeta, nombreFinal);
        
        archivo.mv(uploadPath, (err) =>{
            if(err){
                console.log(err);
                return reject("Error al subir el archivo");
            }
            return resolve( nombreFinal );
        });

    });
}

module.exports = {
    subirArchivo
}