/**
 * Created by USRDEL on 19/6/17.
 */
// /Saludo/crearMiArticulo
module.exports = {
    welcome: function (req, res) {
        sails.log.info(req.method);
        if (req.method == "POST") {
            return res.json({ saludo: "hola" });
        }
        else {
            return res.send("Error");
        }
    },
    bienvenido: function (req, res) {
        //PUT
        return res.send("Hola");
    },
    crearMiArticulo: function (req, res) {
        var parametros = req.allParams();
        var nuevoArticulo = {//obtenemos los datoa del artculo a guradar
            title: parametros.title,
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
            category: parametros.category,
            pages: parametros.pages,
            notas: parametros.notas
        };
        MiArticulo.create(nuevoArticulo) //funcion para guardar el articulo
            .exec(function (error, articuloCreado) {
            function aticuloCreated(err, articulo) {
                if (err) {
                    req.flash = {
                        err: err
                    };
                    return res.redirect('/crearMisArticulos'); //si no se guarda lo redirige a la vista de crearMiArticulo
                }
                else {
                    res.redirect('/VerMisArticulo'); //Si no ocurre error lo redirige a su biblioteca personal
                }
            }
        });
    },
    VerMisArticulos: function (req, res) {
        var parametros = req.allParams();
        sails.log.info("Parametros", parametros);
        if (!parametros.mibiblioteca) {
            parametros.mibiblioteca = '';
        }
        MiArticulo
            .find()
            .where({
            title: {//sirve para buscar un articulo dentro de la biblioteca personal
                contains: parametros.mibiblioteca
            }
        })
            .exec(function (err, Miarticulo) {
            if (err)
                return res.negotiate(err);
            sails.log.info("Miarticulo", Miarticulo);
            return res.view('MisArticulos', {
                MiArticulo: Miarticulo    //nos muestra los articulos
            });
        });
    },
    eliminarmiArticulo: function (req, res) { //funcion eliminar articulo
        var params = req.allParams();
        sails.log.info("Parametros", params);
        if (req.method == "POST" && params.id) {
            MiArticulo.destroy({
                id: params.id//obtenemos el id del articulo a eliminar
            }).exec(function (err, articuloBorrado) {
                if (err)
                    return res.serverError(err);
                return res.redirect("/MisArticulos");
            });
        }
        else {
            return res.badRequest();
        }
    },
    VerMiArticulo: function (req, res) {
        var parametros = req.allParams();
        if (parametros.id) {//obtenemos el id del articulo que queremos visualizar
            MiArticulo.findOne({
                id: parametros.id
            })
                .exec(function (err, articuloEditado) {
                if (err)
                    return res.serverError(err);
                if (articuloEditado) {
                    //Si encontro
                    return res.view('verMisArticulos', {
                        Miarticulo: articuloEditado
                    });
                }
                else {
                    //No encontro
                    return res.redirect('/');
                }
            });
        }
        else {
            return res.redirect('/');
        }
    }
};
