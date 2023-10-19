 src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js"></script>
function myPopup2() {
               window.open( "Soberbot/sbot.html", "myWindow", 
                   "status = 1, height = 600, width = 400, resizable = 0" )
            }
       
$(document).ready(function(){
  $("button").click(function(){
    $("p").hide();
  });
});
