var express = require('express');
var app = express();
fs = require('fs');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var Excel = require('exceljs');
var workbook = new Excel.Workbook();

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
app.get("/Admision", function (req, res) {
      res.sendFile(__dirname + '/newAdmision.xlsx');
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

workbook.xlsx.readFile('Libro1.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet(1);
        var row = worksheet.getRow(6);
        row.getCell(1).value = data.n1; // A5's value set to 5
        row.getCell(3).value=data.n2;
        row.getCell(5).value=data.n3;
        row.getCell(7).value=data.n4;
        row.getCell(9).value=data.n5;

        row.commit();
        row=worksheet.getRow(8);
        row.getCell(1).value = data.n6; // A5's value set to 5
        row.getCell(4).value=data.n7,
        row.getCell(6).value=data.n8;
        row.getCell(8).value=data.n9;
        row.getCell(10).value=data.n10;
        row.commit();
        row=worksheet.getRow(10);
        row.getCell(1).value = data.n11; // A5's value set to 5
        row.getCell(4).value=data.n12,
        row.getCell(6).value=data.n13;
        row.getCell(8).value=data.n14;
        row.getCell(10).value=data.n15;
        row.commit();
        row=worksheet.getRow(12);
        row.getCell(1).value = data.n16; // A5's value set to 5
        row.getCell(6).value=data.n17,
        row.getCell(8).value=data.n18;
        row.getCell(10).value=data.n19;
        row.commit();
        row=worksheet.getRow(14);
        row.getCell(1).value = data.n20; // A5's value set to 5
        row.getCell(4).value=data.n21,
        row.getCell(6).value=data.n22;
        row.getCell(8).value=data.n23;
        row.commit();
        row=worksheet.getRow(16);
        row.getCell(1).value = data.n24;
        row.getCell(6).value=data.n25;
        row.commit();
        row=worksheet.getRow(18);
        row.getCell(1).value = data.n26;
        row.getCell(6).value=data.n27;
        row.commit();
        row=worksheet.getRow(20);
        row.getCell(1).value = data.n28;
        row.getCell(6).value=data.n29;
        row.getCell(8).value=data.n30;
        row.getCell(10).value=data.n31;
        row.commit();
        row=worksheet.getRow(22);
        row.getCell(1).value = data.n32;
        row.getCell(6).value=data.n33;
        row.commit();
        row=worksheet.getRow(24);
        row.getCell(1).value = data.n34; // A5's value set to 5
        row.getCell(3).value=data.n35,
        row.getCell(4).value=data.n36;









        return workbook.xlsx.writeFile('newAdmision.xlsx');
      }).then(function(){
      socket.emit("limpiar");
    })


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

  workbook.xlsx.readFile('Libro1.xlsx')
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = data.n1; // A5's value set to 5
          row.getCell(3).value=data.n2;
          row.getCell(5).value=data.n3;
          row.getCell(7).value=data.n4;
          row.getCell(9).value=data.n5;

          row.commit();
          row=worksheet.getRow(8);
          row.getCell(1).value = data.n6; // A5's value set to 5
          row.getCell(4).value=data.n7,
          row.getCell(6).value=data.n8;
          row.getCell(8).value=data.n9;
          row.getCell(10).value=data.n10;
          row.commit();
          row=worksheet.getRow(10);
          row.getCell(1).value = data.n11; // A5's value set to 5
          row.getCell(4).value=data.n12,
          row.getCell(6).value=data.n13;
          row.getCell(8).value=data.n14;
          row.getCell(10).value=data.n15;
          row.commit();
          row=worksheet.getRow(12);
          row.getCell(1).value = data.n16; // A5's value set to 5
          row.getCell(6).value=data.n17,
          row.getCell(8).value=data.n18;
          row.getCell(10).value=data.n19;
          row.commit();
          row=worksheet.getRow(14);
          row.getCell(1).value = data.n20; // A5's value set to 5
          row.getCell(4).value=data.n21,
          row.getCell(6).value=data.n22;
          row.getCell(8).value=data.n23;
          row.commit();
          row=worksheet.getRow(16);
          row.getCell(1).value = data.n24;
          row.getCell(6).value=data.n25;
          row.commit();
          row=worksheet.getRow(18);
          row.getCell(1).value = data.n26;
          row.getCell(6).value=data.n27;
          row.commit();
          row=worksheet.getRow(20);
          row.getCell(1).value = data.n28;
          row.getCell(6).value=data.n29;
          row.getCell(8).value=data.n30;
          row.getCell(10).value=data.n31;
          row.commit();
          row=worksheet.getRow(22);
          row.getCell(1).value = data.n32;
          row.getCell(6).value=data.n33;
          row.commit();
          row=worksheet.getRow(24);
          row.getCell(1).value = data.n34; // A5's value set to 5
          row.getCell(3).value=data.n35,
          row.getCell(4).value=data.n36;









          return workbook.xlsx.writeFile('newAdmision.xlsx');
        }).then(function(){
        socket.emit("limpiar");
      })


});




});














});
