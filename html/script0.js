$(function() {
    var socket = io();
    $("#btn").click(function()
            {
              var data = $("#fecha_nac").val();

              var jsondata={n1:$("#n1").val(),
              n2:$("#n2").val(),n3:$("#n3").val(),n4:$("#n4").val(),n5:$("#n5").val(),n6:$("#n6").val(),
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
              socket.emit('insertar_ingreso',jsondata);
            });

    socket.on('respuesta', function () {
        console.log("respuesta");


      });
      socket.on('limpiar', function () {
        window.open("http://10.10.11.150:3000/download");
        alert("Guardado")

          location.href="http://10.10.11.150:3000/ingreso";



        });

});
