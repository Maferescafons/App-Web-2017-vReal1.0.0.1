// /Saludo/crearMiArticulo
module.exports = {
    homepage: function (req, res) {
        sails.models.MiArticulo.find().exec(function (err, MiArticuloEncontrados) {
            if (err)
                return res.serverError(err);
            return res.view('MisArticulos', { MiArticulo: MiArticuloEncontrados });
        });
    },
    editanota: function (req, res) {
        var parametros = req.allParams();
        if (parametros.title &&
            parametros.country &&
            parametros.number &&
            parametros.volume &&
            parametros.year &&
            parametros.journal &&
            parametros.editorial &&
            parametros.abstract &&
            parametros.issns &&
            parametros.language &&
            parametros.keywords &&
            parametros.link &&
            parametros.authors &&
            parametros.category &&
            parametros.pages &&
            parametros.notas &&
            parametros.id) {
            MiArticulo.update({ //funcion para actualizar datos del articulo creado por el usuario
                id: parametros.id//obtenemos el id del articulo que queremos actualizar
            }, {
                title: parametros.title,  //obtenemos los datos del articulo que vamos a actualizar
                country: parametros.country,
                number: parametros.number,
                volume: parametros.volume,
                year: parametros.year,
                journal: parametros.journal,
                editorial: parametros.editorial,
                abstract: parametros.abstract,
                issns: parametros.issns,
                language: parametros.language,
                keywords: parametros.keywords,
                link: parametros.link,
                authors: parametros.authors,
                pages: parametros.pages,
                notas: parametros.notas
            })
                .exec(function (err, Editado) {
                if (err)
                    return res.serverError(err);
                if (Editado) {
                    //Si encontro
                    return res.redirect("/");
                }
                else {
                    //No encontro
                    return res.notFound();
                }
            });
        }
        else {
            return res.badRequest();
        }
    }
};
