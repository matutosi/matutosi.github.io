// Switch full screen mode
// https://gray-code.com/javascript/display-the-page-in-full-screen/
function switchScreenShow(id){
  var button = document.getElementById(id);
  if( checkFullScreen() ) {
    document.exitFullscreen(); 
    button.setAttribute("value", "FULL SCREEN");
  } else {
    document.body.requestFullscreen(); 
    button.setAttribute("value", "normal show");
  }
}
function checkFullScreen(){
  var fullscreen_flag = false;
  if(document.fullscreenElement) { fullscreen_flag = true; }
  return fullscreen_flag;
}
