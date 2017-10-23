$(function() {
    var socket = io();




    $("#btn_limpiar").click(function(){

        location.href="http://10.10.11.150:3000/emergencia.html";

        //comprobar campos



    });


    $("#btn").click(function()
            {
              var fecha_nacimiento=  $("#fecha_nac").val();
              var sexo_o =$("#sexo").val();
              var lugar_de_nacimiento =$("#lugar_nacimiento").val();
              if(fecha_nacimiento==''||sexo_o==null||lugar_nacimiento=='')
              {
                alert("Campos invalidos revise los campos en rojo! NO DEBEN DE ESTAR VACIOS");

              }
              else
              {




              var data = $("#fecha_nac").val();

              var jsondata={nombre1:$("#nombre1").val(),nombre2:$("#nombre2").val(),
              apellido1:$("#apellido1").val(),apellido2:$("#apellido2").val(),
              no_expediente:$("#numero_expediente").val(),
              fecha_nac:$("#fecha_nac").val(),
              edad:$("#edad").val(),lugar_nac:$("#lugar_nacimiento").val(),
              sexo:$("#sexo").val(),
              estado_civil:$("#estado_civil").val(),ocupacion:$("#ocupacion").val(),
              nacionalidad:$("#nacionalidad").val(),
              dpi:$("#documento_identificacion").val(),
              contacto_emergencia:$("#caso_emergencia").val(),
              parentesco:$("#parentesco").val(),
              direccion_contacto:$("#direccion").val(),
              telefono_contacto:$("#telefono").val(),
              fecha_asistencia:$("#fecha_asistencia").val(),hora:$("#hora").val(),
              area_urgencia:$("#area_urgencia").val(),
              tipo_consulta:$("#tipo_consulta").val(),
              motivo_consulta:$("#motivo_consulta").val(),
              historia_enfermedad:$("#historia_enfermedad").val(),
              examen_fisico:$("#examen_fisico").val(),




            };
              $("#btn").text("TRABAJANDO ESPERE");
              $("#btn").attr("disabled", true);
              socket.emit('pruebainsertar',jsondata);

}
            });


            $("#btn_consulta").click(function()
                    {

                      var jsondata={apellido1:$("#c_apellido1").val(),
                      apellido2:$("#c_apellido2").val(),no_cedula:$("#c_documento_identificacion").val()

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

                          socket.emit('imprimir_anterior_emergencia',mostrar);
                          alert("ESPERE! En unos segundos se abrira el documento.");

                      });



                    });

    socket.on('respuesta', function () {
        console.log("respuesta");


      });





      socket.on('limpiar', function (data) {

        alert("Guardado")
          location.href="http://10.10.11.150:3000/emergencia.html";
          window.open("http://10.10.11.150:3000/reportes/"+data+".pdf");


        });
        socket.on('impresion_consulta', function (data) {

          window.open("http://10.10.11.150:3000/reportes/RI"+data+".pdf");


          });

});
