$(function() {
    var socket = io();
    $("#btn").click(function()
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
              socket.emit('pruebainsertar',jsondata);
            });

    socket.on('respuesta', function () {
        console.log("respuesta");


      });
      socket.on('limpiar', function () {
        alert("Guardado")
          location.href="http://10.10.11.150:3000/emergencia.html";


        });

});
