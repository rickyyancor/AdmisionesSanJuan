var msopdf = require('node-msoffice-pdf');

msopdf(null, function(error, office) {

    if (error) { 
      console.log("Init failed", error);
      return;
    }

   /*
     There is a queue on the background thread, so adding things is non-blocking.
   */

   office.excel({input: "infile.xlsx", output: "outfile.pdf"}, function(error, pdf) {
       if (error) {
           console.log("Woops", error);
       } else {
           console.log("Saved to", pdf);
       }
   });


   /*
     Word/PowerPoint/Excel remain open (for faster batch conversion)

     To clean them up, and to wait for the queue to finish processing
   */

   office.close(null, function(error) {
       if (error) {
           console.log("Woops", error);
       } else {
           console.log("Finished & closed");
       }
   });
});
