var express = require('express');
var app = express();
fs = require('fs');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var Connection = require('tedious').Connection;
var Request = require('tedious').Request;
var Excel = require('exceljs');
var workbook = new Excel.Workbook();
var msopdf = require('node-msoffice-pdf');



require('console-stamp')(console, '[HH:MM:ss]');
app.use('/mdl', express.static(__dirname + '/html/mdl'));
app.use('/materialize', express.static(__dirname + '/html/materialize'));

app.use('/reportes', express.static(__dirname + '/reportes'));

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
      res.sendFile(__dirname + '/imp.pdf');
});
app.get("/consulta", function (req, res) {
      res.sendFile(__dirname + '/html/consulta.html');
});


app.get('/download',
  function sendResponse(req,res)
  {
    var file = __dirname + '/imp.pdf';

    //archivoObjeto();
  res.download(file); // Set disposition and send it.
  }
);
app.get('/downloademe',
  function sendResponse(req,res)
  {
    var file = __dirname + '/impEME.pdf';

    //archivoObjeto();
  res.download(file); // Set disposition and send it.
  }
);

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


socket.on('Error',function(err){console.log(err);});

  socket.on('prueba', function (data) {
    var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;
    var cliente=clientIp.substring(7, 19);


  });





  socket.on('imprimir_anterior_emergencia', function (cadenaconsulta) {
    var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;
    var cliente=clientIp.substring(7, 19);
    var idusuario=cliente;

    var datos =cadenaconsulta.toString().split('*');
    console.log("Solicitud desde : "+cliente);
    console.log("Imprimiendo expediente no: "+datos[4]);





    var connection = new Connection(config);
    connection.on('connect', function(err) {if (err) {console.log(err);}

    var data={};
    var results = [];
    var cadena ="SELECT * FROM provisional.dbo.Expediente ";
    var whereselect="where apellido1 = '"+datos[0]+"' and apellido2 ='"+datos[1]+"' and no_cedula='"+datos[5]+"';";
    cadena+=whereselect;
    request = new Request(cadena,function(err, rowcount) { if (err) {console.log(err);} if (rowcount) {
          datarespuesta = {}           //console.log(rowcount);
              }
    });

    request.on('row', function (columns) {
      console.log(columns[0].value.toString());
      data.apellido1=columns[0].value.toString();
      data.apellido2=columns[1].value.toString();
      data.nombre1=columns[2].value.toString();
      data.nombre2=columns[3].value.toString();
      data.no_expediente=columns[4].value.toString()+"/"+columns[40].value.toString();
      data.fecha_nac=columns[15].value.toString();
      data.edad=columns[16].value.toString();
      data.lugar_nac=columns[17].value.toString();
      data.sexo=columns[18].value.toString();
      data.estado_civil=columns[19].value.toString();
      data.ocupacion=columns[20].value.toString();
      data.nacionalidad=columns[21].value.toString();
      data.dpi=columns[22].value.toString();
      data.contacto_emergencia=columns[27].value.toString();
      data.parentesco=columns[28].value.toString();
      data.direccion_contacto=columns[29].value.toString();
      data.telefono_contacto=columns[30].value.toString();
      data.fecha_asistencia=columns[36].value.toString();
      data.hora=columns[37].value.toString();
      data.area_urgencia=columns[38].value.toString();
      data.tipo_consulta=columns[39].value.toString();1
      data.motivo_consulta='';
      data.historia_enfermedad='';
      data.examen_fisico='';

    });
    request.on('doneProc', function (rowCount, more, rows) {

      var currentdate = new Date();
      var datetime = "" + currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/"+ currentdate.getFullYear() + "";
      data.fecha_asistencia=datetime;
      data.hora = ""+ currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();


      workbook.xlsx.readFile('reportes/Libro2.xlsx')
          .then(function() {
            var worksheet = workbook.getWorksheet(1);
            var row = worksheet.getRow(6);
            row.getCell(1).value = data.apellido1+"  "+data.apellido2+"  "+data.nombre1+"  "+data.nombre2; // A5's value set to 5
            row.getCell(7).value=data.no_expediente;
            row.commit();
            row=worksheet.getRow(9);
            row.getCell(1).value = data.fecha_nac; // A5's value set to 5
            row.getCell(4).value=data.edad;
            row.getCell(5).value=data.lugar_nac;
            row.getCell(7).value=data.sexo;
            row.commit();
            row=worksheet.getRow(11);
            row.getCell(1).value = data.estado_civil; // A5's value set to 5
            row.getCell(3).value=data.ocupacion,
            row.getCell(5).value=data.nacionalidad;
            row.getCell(7).value=data.dpi;
            row.commit();
            row=worksheet.getRow(13);
            row.getCell(1).value = data.contacto_emergencia; // A5's value set to 5
            row.getCell(4).value=data.parentesco,
            row.getCell(5).value=data.direccion_contacto;
            row.getCell(7).value=data.telefono_contacto;
            row.commit();
            row=worksheet.getRow(15);
            row.getCell(1).value = data.fecha_asistencia; // A5's value set to 5
            row.commit();
            row=worksheet.getRow(14);
            row.getCell(4).value = "Hora: "+data.hora;
            row.getCell(5).value="Area de urgencia: "+data.area_urgencia;
            row.commit();
            row=worksheet.getRow(16);
            row.getCell(4).value = data.tipo_consulta;
            row.commit();
            row=worksheet.getRow(19);
            row.getCell(1).value = data.motivo_consulta;
            row.commit();
            row=worksheet.getRow(22);
            row.getCell(1).value = data.historia_enfermedad;
            row.commit();
            row=worksheet.getRow(25);
            row.getCell(1).value = data.examen_fisico;
        return workbook.xlsx.writeFile(__dirname + '/reportes/RI'+ idusuario+".xlsx");
            }).then(function(){


              msopdf(null, function(error, office) {

                  if (error) {
                    console.log("Init failed", error);
                    return;
                  }

                 office.excel({input: __dirname + '/reportes/RI'+ idusuario+".xlsx", output: __dirname + '/reportes/RI'+ idusuario+".pdf"}, function(error, pdf) {
                     if (error) {
                         console.log("Woops", error);
                     } else {
                         console.log("Saved to", pdf);
                         //socket.emit("limpiar");
                     }
                 });
               office.close(null, function(error) {
                     if (error) {
                         console.log("Woops", error);
                     } else {
                         console.log("Finished & closed");
                         socket.emit('impresion_consulta',idusuario);
                     }
                 });
              })








          })



      //socket.emit('resultado_consulta',(respuestatabla+"</table>"));
    });


    connection.execSql(request);
    });



  });










  socket.on('imprimir_anterior', function (cadenaconsulta) {
    var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;
    var cliente=clientIp.substring(7, 19);
    var idusuario=cliente;

    var datos =cadenaconsulta.toString().split('*');
    console.log("Solicitud desde : "+cliente);
    console.log("Imprimiendo expediente no: "+datos[4]);





    var connection = new Connection(config);
    connection.on('connect', function(err) {if (err) {console.log(err);}

    var data={};
    var results = [];
    var cadena ="SELECT * FROM provisional.dbo.Expediente ";
    var whereselect="where apellido1 = '"+datos[0]+"' and apellido2 ='"+datos[1]+"' and no_cedula='"+datos[5]+"';";
    cadena+=whereselect;
    request = new Request(cadena,function(err, rowcount) {
     if (err) {console.log(err);}
        if (rowcount)
        {
          datarespuesta = {}
          i=0;
          //console.log(rowcount);
        }
    });

    request.on('row', function (columns) {
      console.log(columns[0].value.toString());
      data.n1=columns[0].value.toString();
      data.n2=columns[1].value.toString();
      data.n3=columns[2].value.toString();
      data.n4=columns[3].value.toString();
      data.n5=columns[4].value.toString()+"/"+columns[40].value.toString();
      data.n6=columns[5].value.toString();
      data.n7=columns[6].value.toString();
      data.n8=columns[7].value.toString();
      data.n9=columns[8].value.toString();
      data.n10=columns[9].value.toString();
      data.n11=columns[10].value.toString();
      data.n12=columns[11].value.toString();
      data.n13=columns[12].value.toString();
      data.n14=columns[13].value.toString();
      data.n15=columns[14].value.toString();
      data.n16=columns[15].value.toString();
      data.n17=columns[16].value.toString();
      data.n18=columns[17].value.toString();
      data.n19=columns[18].value.toString();
      data.n20=columns[19].value.toString();
      data.n21=columns[20].value.toString();
      data.n22=columns[21].value.toString();
      data.n23=columns[22].value.toString();
      data.n24=columns[23].value.toString();
      data.n25=columns[24].value.toString();
      data.n26=columns[25].value.toString();
      data.n27=columns[26].value.toString();
      data.n28=columns[27].value.toString();
      data.n29=columns[28].value.toString();
      data.n30=columns[29].value.toString();
      data.n31=columns[30].value.toString();
      data.n32=columns[31].value.toString();
      data.n33=columns[32].value.toString();
      data.n34=columns[33].value.toString();
      data.n35=columns[34].value.toString();
      data.n36=columns[35].value.toString();



    });
    request.on('doneProc', function (rowCount, more, rows) {
      var currentdate = new Date();
      var datetime = "" + currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/"+ currentdate.getFullYear() + "";
      data.n34=datetime;
      data.n35 = ""+ currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();



      workbook.xlsx.readFile('reportes/Libro1.xlsx')
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
        return workbook.xlsx.writeFile(__dirname + '/reportes/RI'+ idusuario+".xlsx");
            }).then(function(){


              msopdf(null, function(error, office) {

                  if (error) {
                    console.log("Init failed", error);
                    return;
                  }

                 office.excel({input: __dirname + '/reportes/RI'+ idusuario+".xlsx", output: __dirname + '/reportes/RI'+ idusuario+".pdf"}, function(error, pdf) {
                     if (error) {
                         console.log("Woops", error);
                     } else {
                         console.log("Saved to", pdf);
                         //socket.emit("limpiar");
                     }
                 });
               office.close(null, function(error) {
                     if (error) {
                         console.log("Woops", error);
                     } else {
                         console.log("Finished & closed");
                         socket.emit('impresion_consulta',idusuario);
                     }
                 });
              })








          })



      //socket.emit('resultado_consulta',(respuestatabla+"</table>"));
    });


    connection.execSql(request);
    });











  });


  socket.on('consultar', function (data) {

      var socketId = socket.id;
      var clientIp = socket.request.connection.remoteAddress;
      console.log("Consulta desde : "+clientIp);

      var connection = new Connection(config);
      connection.on('connect', function(err) {

        if (err) {
          console.log(err);
        }


var results = [];
      var cadena ="SELECT  apellido1,apellido2,nombre1,nombre2,no_expediente,no_cedula,nombre_padre,nombre_madre , id_expediente FROM provisional.dbo.Expediente ";
      var whereselect="where apellido1 like '"+data.apellido1+"%' and apellido2 like '"+data.apellido2+"%' and no_cedula like '"+data.no_cedula+"%';";
      cadena+=whereselect;
      request = new Request(cadena,function(err, rowcount) {
       if (err) {
          console.log(err);}
          if (rowcount)
          {
            datarespuesta = {}
            i=0;
            console.log(rowcount);
          }
      });
      var respuestatabla="<table id='tabla_consulta'><tr><th>Apellido 1</th><th>Apellido 2</th><th>Nombre 1</th><th>Nombre 2</th><th><font color=\"red\">No. Expediente</font></th><th>DPI</th><th>Contacto/Padre</th><th>Contacto/Madre</th></tr>";
      var datarespuesta = {} // empty Object
      var i=0;
      var key = 'Datos_Consulta';
      datarespuesta[key] = []; // empty Array, which you can push() values into

      request.on('row', function (columns) {

        //console.log(columns[22].metadata.colName+columns[22].value);
        var a2="<td>"+columns[0].value.toString()+"</td>";
        var a3="<td>"+columns[1].value.toString()+"</td>";
        var a4="<td>"+columns[2].value.toString()+"</td>";
        var a5="<td>"+columns[3].value.toString()+"</td>";
        var a6='<td><font color="red">'+columns[4].value.toString()+"/"+columns[8].value.toString()+"<font></td>";
        var a7="<td>"+columns[5].value.toString()+"</td>";
        var a8="<td>"+columns[6].value.toString()+"</td>";
        var a9="<td>"+columns[7].value.toString()+"</td><td class=\"boton_imprimir\"><img src=\"materialize/impresora.png\" alt=\"Imprimir\" width=\"50px\" height=\"50px\"/></td>";

        var a1 ={apellido1:a2, apellido2:a3, nombre1:a4, nombre2:a5, no_expediente:a6,dpi:a7,infocontacto:a8,infocontacto2:a9};
        datarespuesta[key].push(a1);
        respuestatabla+="<tr>"+a2+a3+a4+a5+a6+a7+a8+a9+"</tr>";

      });
      request.on('doneProc', function (rowCount, more, rows) {
        socket.emit('resultado_consulta',(respuestatabla+"</table>"));
      });


      connection.execSql(request);
});

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
    var socketId = socket.id;
      var clientIp = socket.request.connection.remoteAddress;
      var currentdate = new Date();
      var datetime = "" + currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/"+ currentdate.getFullYear() + "";
      data.fecha_asistencia=datetime;
      data.hora = ""+ currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();

      console.log("Registro Emergencia desde : "+clientIp);
    var s="','";
    console.log(s);
 var cadena="INSERT into Expediente (apellido1,apellido2,nombre1,nombre2,no_expediente,fecha_nac,edad,lugar_nac,sexo,estado_civil,ocupacion,nacionalidad,no_cedula,contacto_emergencia,parentesco,direccion_contacto_emergencia,telefono_contacto_emergencia,fecha_asistencia,hora_asistencia,area_urgencia,tipo_consulta) OUTPUT INSERTED.id_expediente, INSERTED.fecha_asistencia values('"+data.apellido1+s+data.apellido2+s;
 cadena+=data.nombre1+s+data.nombre2+s+data.no_expediente+s;
 cadena+=data.fecha_nac+s+data.edad+s+data.lugar_nac+s+data.sexo+s+data.estado_civil+s+data.ocupacion+s+data.nacionalidad;
 cadena+=s+data.dpi+s+data.contacto_emergencia+s+data.parentesco+s+data.direccion_contacto+s+data.telefono_contacto+s+data.fecha_asistencia+s+data.hora+s+data.area_urgencia+s+data.tipo_consulta;
 cadena+="')";



 console.log("nuevo registro emergencia "+datetime);
    request = new Request(cadena,


    function(err) {
     if (err) {
        console.log(err);}
    });

    request.on('row', function (columns) {
      console.log(columns[0].value.toString());
    data.no_expediente+="/"+columns[0].value.toString();


    });
    connection.execSql(request);
    var fs = require('fs');
fs.appendFile('log_Emergencia.txt', JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('Saved!');
});
var socketId = socket.id;
var clientIp = socket.request.connection.remoteAddress;
var cliente=clientIp.substring(7, 19);
var idusuario=cliente;

request.on('doneProc', function (rowCount, more, rows) {

  workbook.xlsx.readFile(__dirname + '/reportes/Libro2.xlsx')
      .then(function() {
          var worksheet = workbook.getWorksheet(1);
          var row = worksheet.getRow(6);
          row.getCell(1).value = data.apellido1+"  "+data.apellido2+"  "+data.nombre1+"  "+data.nombre2; // A5's value set to 5
          row.getCell(7).value=data.no_expediente;
          row.commit();
          row=worksheet.getRow(9);
          row.getCell(1).value = data.fecha_nac; // A5's value set to 5
          row.getCell(4).value=data.edad;
          row.getCell(5).value=data.lugar_nac;
          row.getCell(7).value=data.sexo;
          row.commit();
          row=worksheet.getRow(11);
          row.getCell(1).value = data.estado_civil; // A5's value set to 5
          row.getCell(3).value=data.ocupacion,
          row.getCell(5).value=data.nacionalidad;
          row.getCell(7).value=data.dpi;
          row.commit();
          row=worksheet.getRow(13);
          row.getCell(1).value = data.contacto_emergencia; // A5's value set to 5
          row.getCell(4).value=data.parentesco,
          row.getCell(5).value=data.direccion_contacto;
          row.getCell(7).value=data.telefono_contacto;
          row.commit();
          row=worksheet.getRow(15);
          row.getCell(1).value = data.fecha_asistencia; // A5's value set to 5
          row.commit();
          row=worksheet.getRow(14);
          row.getCell(4).value = "Hora: "+data.hora;
          row.getCell(5).value="Area de urgencia: "+data.area_urgencia;
          row.commit();
          row=worksheet.getRow(16);
          row.getCell(4).value = data.tipo_consulta;
          row.commit();
          row=worksheet.getRow(19);
          row.getCell(1).value = data.motivo_consulta;
          row.commit();
          row=worksheet.getRow(22);
          row.getCell(1).value = data.historia_enfermedad;
          row.commit();
          row=worksheet.getRow(25);
          row.getCell(1).value = data.examen_fisico;








          return workbook.xlsx.writeFile(__dirname + '/reportes/'+ idusuario+".xlsx");
        }).then(function(){


          msopdf(null, function(error, office) {

              if (error) {
                console.log("Init failed", error);

              }

             office.excel({input:__dirname + '/reportes/'+ idusuario+".xlsx", output:__dirname + '/reportes/'+ idusuario+".pdf"}, function(error, pdf) {
                 if (error) {
                     console.log("Woops", error);
                 } else {
                     console.log("Saved to", pdf);



                 }
             });
           office.close(null, function(error) {
                 if (error) {
                     console.log("Woops", error);
                 } else {
                     console.log("Finished & closed");
                     socket.emit('limpiar',idusuario);

                 }
             });

          })





});



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
  var socketId = socket.id;
    var clientIp = socket.request.connection.remoteAddress;
    var currentdate = new Date();
    var datetime = "" + currentdate.getDate() + "/"+ (currentdate.getMonth()+1)  + "/"+ currentdate.getFullYear() + "";
    data.n34=datetime;
    data.n35 = ""+ currentdate.getHours() + ":"+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
    console.log("Registro Ingreso  desde : "+clientIp);
  var s="','";
  console.log(s);
var cadena="INSERT into EXPEDIENTE OUTPUT INSERTED.id_expediente values('"+data.n1+s+data.n2+s+data.n3+s+data.n4+s+data.n5+s+data.n6+s+data.n7+s+data.n8+s+data.n9+s+data.n10+s+data.n11+s+data.n12+s+data.n13+s+data.n14+s+data.n15+s+data.n16;
cadena+=s+data.n17+s+data.n18+s+data.n19+s+data.n20+s+data.n21+s+data.n22+s+data.n23+s+data.n24+s+data.n25+s+data.n26+s+data.n27+s+data.n28+s+data.n29+s+data.n30+s+data.n31+s+data.n32;
cadena+=s+data.n33+s+data.n34+s+data.n35+s+data.n36+"','','','',''";
cadena+=")";
console.log("nuevo registro ingresos");
  request = new Request(cadena,


  function(err) {
   if (err) {
      console.log(err);}
  });

  request.on('row', function (columns) {
    console.log(columns[0].value.toString());
  data.n5=data.n5+"/"+columns[0].value.toString();


  });


  connection.execSql(request);

  var fs = require('fs');
  fs.appendFile('log_ingresos.txt', JSON.stringify(data), function (err) {
  if (err) throw err;
  console.log('Saved!');
  });
  var socketId = socket.id;
  var clientIp = socket.request.connection.remoteAddress;
  var cliente=clientIp.substring(7, 19);
  var idusuario=cliente;

  request.on('doneProc', function (rowCount, more, rows) {
    workbook.xlsx.readFile('reportes/Libro1.xlsx')
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









            return workbook.xlsx.writeFile(__dirname + '/reportes/I'+ idusuario+".xlsx");
          }).then(function(){


            msopdf(null, function(error, office) {

                if (error) {
                  console.log("Init failed", error);
                  return;
                }

               office.excel({input: __dirname + '/reportes/I'+ idusuario+".xlsx", output: __dirname + '/reportes/I'+ idusuario+".pdf"}, function(error, pdf) {
                   if (error) {
                       console.log("Woops", error);
                   } else {
                       console.log("Saved to", pdf);
                       //socket.emit("limpiar");
                   }
               });
             office.close(null, function(error) {
                   if (error) {
                       console.log("Woops", error);
                   } else {
                       console.log("Finished & closed");
                       socket.emit('limpiar',idusuario);
                   }
               });
            })








        });
  });







});




});














});
