$(function() {
    var socket = io();

    $("#btn_limpiar").click(function(){

        location.href="http://10.10.11.150:3000/ingreso";
    });
    $("#btn_stickers").click(function(){

        window.open("http://10.10.11.150:3080/stickers.html");

    });
    $("#btn").click(function()
            {


              var fecha_nacimiento=  $("#n16").val();
              var sexo_o =$("#n19").val();
              var lugar_de_nacimiento =$("#n18").val();
              var edad=$("#n17").val();
              var nombremadre=$("#27").val();
              var nombrepadre=$("#26").val();
              console.log(sexo_o);
              if(fecha_nacimiento==''||sexo_o==null||lugar_de_nacimiento==''||edad==''||nombrepadre==''||nombremadre=='')
              {
                alert("Campos invalidos revise los campos en rojo! NO DEBEN DE ESTAR VACIOS");

              }
              else
              {
              var data = $("#fecha_nac").val();

              var jsondata={n1:$("#n1").val(),
              n2:$("#n2").val(),n3:$("#n3").val(),n4:$("#n4").val(),n5:$("#n5").val(),n6:$("#n6").val().toString().substring(0,46),
              n7:$("#n7").val(),
              n8:$("#n8").val(),
              n9:$("#n9").val(),
              n10:$("#n10").val(),
              n11:$("#n11").val(),
              n12:$("#n12").val(),
              n13:$("#n13").val(),
              n14:$("#n14").val(),
              n15:$("#n15").val(),
              n16:$("#n16").val(),
              n17:$("#n17").val(),
              n18:$("#n18").val(),
              n19:$("#n19").val(),
              n20:$("#n20").val(),
              n21:$("#n21").val(),
              n22:$("#n22").val(),
              n23:$("#n23").val(),
              n24:$("#n24").val(),
              n25:$("#n25").val(),
              n26:$("#n26").val(),
              n27:$("#n27").val(),
              n28:$("#n28").val(),
              n29:$("#n29").val(),
              n30:$("#n30").val(),
              n31:$("#n31").val(),
              n32:$("#n32").val(),
              n33:$("#n33").val(),
              n34:$("#n34").val(),
              n35:$("#n35").val(),
              n36:$("#n36").val(),


            };
            console.log("aca");
            $("#btn").text("TRABAJANDO ESPERE");
            $("#btn").attr("disabled", true);
              socket.emit('insertar_ingreso',jsondata);}

            });
            $("#btn_consulta").click(function()
                    {

                      var jsondata={apellido1:$("#c_apellido1").val(),
                      apellido2:$("#c_apellido2").val(),no_cedula:$("#c_documento_identificacion").val(),
                      nombre1:$("#c_nombre1").val(),nombre2:$("#c_nombre2").val()

                    };
                      socket.emit('consultar',jsondata);
                      console.log('emit de consultar')


                    });

                    socket.on('resultado_consulta',function(data){
                      console.log("resultado_consulta");
                      console.log((data));
                      //var datos=data.Datos_Consulta[0];
                      //console.log(JSON.stringify(datos));

                      $("#paratabla").html(data);


                      $(".boton_imprimir").click(function(){

                          var valores="";
                          var registro=$(this).parents("tr").find("td");

                          $(this).parents("tr").find("td").each(function(){
                              valores+=$(this).html()+"*";
                              console.log($(this).html());
                          });
                          var mostrar=valores.toString().replace("<img src=\"materialize/impresora.png\" alt=\"Imprimir\" width=\"50px\" height=\"50px\">","").replace('<font color="red">','').replace('<font></font></font>','');

                          socket.emit('imprimir_anterior',mostrar);
                          alert("ESPERE! En unos segundos se abrira el documento.");

                      });



                    });





    socket.on('respuesta', function () {
        console.log("respuesta");


      });
      socket.on('limpiar', function (data) {

        alert("Guardado")

          location.href="http://10.10.11.150:3000/ingreso";
          window.open("http://10.10.11.150:3000/reportes/I"+data+".pdf");


        });
        socket.on('impresion_consulta', function (data) {

          window.open("http://10.10.11.150:3000/reportes/RI"+data+".pdf");


          });
});
