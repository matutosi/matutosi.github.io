// get elements
var tabs = document.getElementById('tabcontrol').getElementsByTagName('a');
var pages = document.getElementById('tabbody').getElementsByTagName('div');

function changeTab() {
  // get id
  var targetid = this.href.substring(this.href.indexOf('#')+1,this.href.length);
  // show delected tab
  for(var i=0; i<pages.length; i++) {
    if( pages[i].id != targetid ) {
      pages[i].style.display = "none";
    }
    else {
      pages[i].style.display = "block";
    }
  }
  // show front
  for(var i=0; i<tabs.length; i++) {
    tabs[i].style.zIndex = "0";
  }
  this.style.zIndex = "10";

  // needs not to move tab
  return false;
}

// when clicked, enable to run changeTab() in all tab
for(var i=0; i<tabs.length; i++) {
  tabs[i].onclick = changeTab;
}

// tab at first 
tabs[0].onclick();
