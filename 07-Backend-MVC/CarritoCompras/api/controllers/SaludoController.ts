/**
 * Created by USRDEL on 19/6/17.
 */

declare var module;
declare var sails;
declare var Usuario;
declare var Articulo;
declare var MiArticulo;

// /Saludo/crearMiArticulo

module.exports = {

  welcome:(req,res)=>{

    sails.log.info(req.method);

    if(req.method=="POST"){
      return res.json({saludo:"hola"})
    }else{
      return res.send("Error")
    }



  },
  bienvenido:(req,res)=>{

    //PUT

    return res.send("Hola")

  },
  crearMiArticulo:(req, res)=>{

    let parametros = req.allParams();

    let nuevoArticulo = { //obtenemos los datos a guardar del artículo
      title:parametros.title,
      country:parametros.country,
      number:parametros.number,
      volume:parametros.volume,
      year:parametros.year,
      journal:parametros.journal,
      editorial:parametros.editorial,
      abstract:parametros.abstract,
      issns:parametros.issns,
      language:parametros.language,
      keywords:parametros.keywords,
      link:parametros.link,
      authors:parametros.authors,
      category:parametros.category,
      pages:parametros.pages,
      notas:parametros.notas

    };

    MiArticulo.create(nuevoArticulo)//funcion para guradar el articulo
      .exec(
        (error,articuloCreado)=> {
          function aticuloCreated(err, articulo) {
            if (err) {
              req.flash = {//para controlar que los camos necesarios sean llenados
                err: err
              }
             return res.redirect('/crearMisArticulos');//si no se guarda lo redirige a la vista de crearMiArticulo
            } else
            {
              res.redirect('/VerMisArticulo');//Si no ocurre error lo redirige a su biblioteca personal
            }
          }
        }
      )},
  VerMisArticulos:(req,res)=>{

    let parametros = req.allParams();

    sails.log.info("Parametros",parametros);

    if(!parametros.mibiblioteca){
      parametros.mibiblioteca ='';
    }
    MiArticulo
      .find()
      .where({
        title:{
          contains:parametros.mibiblioteca
        }
      })
      .exec((err,Miarticulo)=>{
        if(err) return res.negotiate(err);
        sails.log.info("Miarticulo",Miarticulo);

        return res.view('MisArticulos',{
          MiArticulo:Miarticulo
        })
      })
  },
  eliminarmiArticulo: (req, res) => {

    let params = req.allParams();
    sails.log.info("Parametros", params);

    if (req.method == "POST" && params.id) {

      MiArticulo.destroy({
        id: params.id
      }).exec((err, articuloBorrado) => {
        if (err) return res.serverError(err);
        return res.redirect("/MisArticulos")
      })

    } else {
      return res.badRequest();
    }

  },
  VerMiArticulo:(req,res)=>{

    let parametros = req.allParams();

    if(parametros.id){
      MiArticulo.findOne({
        id:parametros.id
      })

        .exec((err,articuloEditado)=>{
          if(err) return res.serverError(err);
          if(articuloEditado){
            //Si encontro
            return res.view('verMisArticulos',{
              Miarticulo:articuloEditado
            })
          }else{
            //No encontro
            return res.redirect('/')
          }
        })
    }else{
      return res.redirect('/')
    }

  }
};
