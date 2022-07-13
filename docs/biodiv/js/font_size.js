function larger(){
  if(document.documentElement.style.getPropertyValue('--font-size') === ''){
    document.documentElement.style.setProperty('--font-size', '16px');
  }
  var f_size = document.documentElement.style.getPropertyValue('--font-size');
  var size = Number(f_size.replace('px', '')) * 1.2;
  document.documentElement.style.setProperty('--font-size', size + 'px');
}
function smaller(){
  if(document.documentElement.style.getPropertyValue('--font-size') === ''){
    document.documentElement.style.setProperty('--font-size', '16px');
  }
  var f_size = document.documentElement.style.getPropertyValue('--font-size');
  var size = Number(f_size.replace('px', '')) / 1.2;
  document.documentElement.style.setProperty('--font-size', size + 'px');
}
