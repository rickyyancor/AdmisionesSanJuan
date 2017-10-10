var express = require('express');
var app = express();
fs = require('fs');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;

app.use('/mdl', express.static(__dirname + '/html/mdl'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.get("/jquery.js", function (req, res) {
      res.sendFile(__dirname + '/html/jquery.js');
});
app.get("/script.js", function (req, res) {
      res.sendFile(__dirname + '/html/script.js');
});
app.get("/script0.js", function (req, res) {
      res.sendFile(__dirname + '/html/script0.js');
});
app.get("/socket.io.js", function (req, res) {
      res.sendFile(__dirname + '/html/socket.io.js');
});



app.get("/emergencia.html", function (req, res) {
      res.sendFile(__dirname + '/html/emergencia.html');
});
app.get("/ingreso", function (req, res) {
      res.sendFile(__dirname + '/html/ingreso_egreso.html');
});
server.listen(3000);










var Connection = require('tedious').Connection;
   var config = {
     userName: 'usuarioprovi',
     password: 'Uprovision@l0',
       server: '10.10.2.88',
       // If you are on Azure SQL Database, you need these next options.
       options: { database: 'provisional'}
   };


   var Request = require('tedious').Request
   var TYPES = require('tedious').TYPES;













io.on('connection', function (socket) {

  socket.on('prueba', function (data) {

    var fs = require('fs');
fs.appendFile('log.txt', JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('Saved!');
});

    console.log(data);
    socket.emit("respuesta");
  });

  socket.on('pruebainsertar',function(data){
console.log("Inicio base");


var connection = new Connection(config);
connection.on('connect', function(err) {

  if (err) {
    console.log(err);
  }
    // If no error, then good to proceed.
    console.log("Connected");
    var s="','";
    console.log(s);
 var cadena="INSERT into Emergencia values('"+data.apellido1+s+data.apellido2+s;
 cadena+=data.nombre1+s+data.nombre2+s+data.no_expediente+s;
 cadena+=data.fecha_nac+s+data.edad+s+data.lugar_nac+s+data.sexo+s+data.estado_civil+s+data.ocupacion+s+data.nacionalidad;
 cadena+=s+data.dpi+s+data.contacto_emergencia+s+data.parentesco+s+data.direccion_contacto+s+data.telefono_contacto+s+data.fecha_asistencia+s+data.hora+s+data.area_urgencia+s+data.tipo_consulta+s+data.motivo_consulta+s+data.historia_enfermedad+s+data.examen_fisico;
 cadena+="')";
 console.log("nuevo registro emergencia");
    request = new Request(cadena,


    function(err) {
     if (err) {
        console.log(err);}
    });


    connection.execSql(request);
    var fs = require('fs');
fs.appendFile('log_Emergencia.txt', JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
socket.emit("limpiar");


});




  });






// hoja ingreso

socket.on('insertar_ingreso',function(data){
console.log("Inicio base");


var connection = new Connection(config);
connection.on('connect', function(err) {

if (err) {
  console.log(err);
}
  // If no error, then good to proceed.
  console.log("Connected");
  var s="','";
  console.log(s);
var cadena="INSERT into Ingresos values('"+data.n1+s+data.n2+s+data.n3+s+data.n4+s+data.n5+s+data.n6+s+data.n7+s+data.n8+s+data.n9+s+data.n10+s+data.n11+s+data.n12+s+data.n13+s+data.n14+s+data.n15+s+data.n16;
cadena+=s+data.n17+s+data.n18+s+data.n19+s+data.n20+s+data.n21+s+data.n22+s+data.n23+s+data.n24+s+data.n25+s+data.n26+s+data.n27+s+data.n28+s+data.n29+s+data.n30+s+data.n31+s+data.n32;
cadena+=s+data.n33+s+data.n34+s+data.n35+s+data.n36;
cadena+="')";
console.log("nuevo registro ingresos");
  request = new Request(cadena,


  function(err) {
   if (err) {
      console.log(err);}
  });


  connection.execSql(request);

  var fs = require('fs');
  fs.appendFile('log_ingresos.txt', JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('Saved!');
  });

socket.emit("limpiar");


});




});














});
