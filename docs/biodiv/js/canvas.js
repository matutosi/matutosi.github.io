function downloadCanvas(){
  canvas = document.getElementById('canvas');
  var url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.download = "canvas.png";
  a.href = url;
  a.click();
  URL.revokeObjectURL(url);
}

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var moveflg = 0;
var Xpoint;
var Ypoint;
 
//line color and width
lineColor = "#000000";
lineWidth = 1
function changeColor(col){ lineColor = col;}
function changeWidth(w)  { lineWidth = w;  }

// fill canvas
ctx.fillStyle = 'rgb(255,255,255)';
ctx.fillRect(0, 0, 500, 300);

// initialize storage
var myStorage = sessionStorage;
window.onload = initLocalStorage();
 
// PC
canvas.addEventListener('mousedown', startPoint, false);
canvas.addEventListener('mousemove', movePoint,  false);
canvas.addEventListener('mouseup',   endPoint,   false);
// smart phone
canvas.addEventListener('touchstart', startPoint, false);
canvas.addEventListener('touchmove',  movePoint,  false);
canvas.addEventListener('touchend',  endPoint,    false);

var canvasLeft = canvas.getBoundingClientRect().left;
var canvasTop = canvas.getBoundingClientRect().top;

function startPoint(e){
  e.preventDefault();
  ctx.beginPath();
  Xpoint = e.layerX
  Ypoint = e.layerY
  ctx.moveTo(Xpoint, Ypoint);
}

function movePoint(e){
  if(e.buttons === 1 || e.witch === 1 || e.type == 'touchmove'){
    Xpoint = e.layerX;
    Ypoint = e.layerY;
    moveflg = 1;
    ctx.lineTo(Xpoint - canvasLeft, Ypoint - canvasTop);
    ctx.lineCap = "round";
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = lineColor;
    ctx.stroke();  
  }
}
 
function endPoint(e){
    if(moveflg === 0){
       ctx.lineTo(Xpoint, Ypoint);
       ctx.lineCap = "round";
       ctx.lineWidth = lineWidth * 2;
       ctx.strokeStyle = lineColor;
       ctx.stroke();
    }
    moveflg = 0;
    setLocalStoreage();
}
 
function clearCanvas(){
    if(confirm('Clear image?')){
        initLocalStorage();
        temp = [];
        resetCanvas();
    }
}
 
function resetCanvas() {
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
    ctx.fillStyle = 'rgb(255,255,255)';
}
 
function initLocalStorage(){
    myStorage.setItem("__log", JSON.stringify([]));
}

function setLocalStoreage(){
    var png = canvas.toDataURL();
    var logs = JSON.parse(myStorage.getItem("__log"));
    setTimeout(function(){
        logs.unshift({png:png});
        myStorage.setItem("__log", JSON.stringify(logs));
        temp = [];
    }, 0);
}
 
function prevCanvas(){
    var logs = JSON.parse(myStorage.getItem("__log"));
    if(logs.length > 0){
        temp.unshift(logs.shift());
        setTimeout(function(){
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
}
 
function nextCanvas(){
    var logs = JSON.parse(myStorage.getItem("__log"));
    if(temp.length > 0){
        logs.unshift(temp.shift());
        setTimeout(function(){
            myStorage.setItem("__log", JSON.stringify(logs));
            resetCanvas();
            draw(logs[0]['png']);
        }, 0);
    }
}

function draw(src){
    var img = new Image();
    img.src = src;
    img.onload = function() {
        ctx.drawImage(img, 0, 0);
    }
}
