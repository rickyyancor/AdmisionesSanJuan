var msopdf = require('node-msoffice-pdf');

msopdf(null, function(error, office) {

    if (error) {
      console.log("Init failed", error);
      return;
    }

   office.excel({input: "Admision.xlsx", output: "outfile.pdf"}, function(error, pdf) {
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
       }
   });
});
