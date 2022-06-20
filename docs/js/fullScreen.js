// // // // // // // // // // // // // // // // // // // 
// 
// Switch full screen mode
// 
// // // // // // // // // // // // // // // // // // // 
// https://gray-code.com/javascript/display-the-page-in-full-screen/
function switchFullScreen() {
  if( checkFullScreen() ) { document.exitFullscreen(); }
  else                    { document.body.requestFullscreen(); }
}
function checkFullScreen() {
  var fullscreen_flag = false;
  if(document.fullscreenElement) { fullscreen_flag = true; }
  return fullscreen_flag;
}
