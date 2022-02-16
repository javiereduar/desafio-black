//importando expres
const { ChildProcess } = require('child_process');
const express = require('express');
//importando yargs
const yargs = require('yargs')


const jimp = require('jimp')

//crear app
const app = express();
//archivos estaticos
app.use(express.static('static'));


//ruta por defecto
app.get('/', function (req, res) {
    res.send('Hola desde Express');
    });

//ruta procesar

app.get('/procesar', async function (req, res) {
  const img = req.query.url1

  const newImg = await jimp.read(img)
  await newImg.resize(350, jimp.AUTO).quality(60).greyscale().writeAsync("static/imgs/newImg.jpg");


  res.redirect('/imgs/newImg.jpg');
});




/*
    // funcion yargs

yargs.command(
    'retoque',
    "Este comando nos sirve para retocar una fotografía",
    {
      foto: {
        describe: 'El archivo fotográfico que vamos a retocar',
        demand: true,
        alias: 'f'
      }
    },
    function (args) {
      const archivo = args.foto;
      // primero recuperamos la extension del archivo, y la
      // pasamos a minúsculas
      let extension = archivo.split('.')
      extension = extension[extension.length - 1].toLowerCase()
  
      const extensiones_validas = ['jpg', 'png', 'jpeg', 'gif']
  
      // verificamos que la extension del archivo sea una de las extensiones válidas
      if (!extensiones_validas.includes(extension)) {
        console.log(`La extensión del archivo "${archivo}" no es válida`);
        return
      }
  
      // si llegamos acá, entonces estamos listos para editar la imagen
      child.exec(`node process_img.js ${archivo}`, (err, data) => {
        console.log(data);
      })
  
    }
  ).help().argv
*/

// 4. Ejecuto el servidor

yargs.command(
  'start',
  'ejecutar server con key', 
  {
    key:{
      describe:'clave secreta',
      demand: true,
      alias: 'k'
    }
    
  },

  function(args) {
    if (args.key != '123') {
      console.log('contraseña incorrecta')
      return 1;
    };

    app.listen(3000, function () {
      console.log('Servidor andando en el puerto 3000');
    })
  }

).help().argv
