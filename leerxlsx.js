var Excel = require('exceljs');
var workbook = new Excel.Workbook();

workbook.xlsx.readFile('old.xlsx')
    .then(function() {
        var worksheet = workbook.getWorksheet(1);
        var row = worksheet.getRow(5);
        row.getCell(1).value = 5; // A5's value set to 5
        row.commit();
        return workbook.xlsx.writeFile('new.xlsx');
    })

















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
