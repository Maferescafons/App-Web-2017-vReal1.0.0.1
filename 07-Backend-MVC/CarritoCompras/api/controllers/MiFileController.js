/**
 * MiFileController
 *
 * @description :: Server-side logic for managing mifiles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  upload: function  (req, res) {
    var parametros = req.allParams();
    sails.log.info("Parametros", parametros);

    req.file('avatar') // this is the name of the file in your multipart form
      .upload({
        // optional
        // dirname: [SOME PATH TO SAVE IN A CUSTOM DIRECTORY]
      }, function(err, uploads) {
        // controlar errores
        if (err) { return res.serverError(err) }
        // uploads is an array of files uploaded
        // so remember to expect an array object
        if (uploads.length === 0) { return res.badRequest('No file was uploaded') }
        // si el archivo se subio crear un nuevo registro en la base de datos
        // at this point the file is phisicaly available in the hard drive

        MiFile.create({ //funcion para crear un nuevo registro en la base de datos

          path: uploads[0].fd,
          filename: uploads[0].filename,
          fkIdMiArticulo:parametros.id
        }).exec(function(err, file) {
          if (err) { return res.serverError(err) }
          //si ue exitoso retornar el registro
          return res.json(file)
        })
      })
  },
  download: function(req, res) {
    var mifileID = req.param('id')//se obtiene el id del archivo a descargar
    MiFile
      .findOne({ id: mifileID })//busca el archivo en la base por medio del id
      .exec(function(err, file){
        if (err) { return res.serverError(err) }
        if (!file) { return res.notFound() }

        res.download(file.path, function (err) {//funcion para descargar el archivo
          if (err) {
            return res.serverError(err)
          } else {
            return res.ok()
          }
        })
      })
  },

  verArchivo:function  (req, res) {

    MiFile.find().exec(function (err, miarticulo) {
      if (err)
        return res.negotiate(err);
      sails.log.info("MiArticulo", miarticulo);
      res.attachment('tmp/uploads/15c26377-1310-4778-9926-322b1c8a34f7.pdf');
    });
  }
};

