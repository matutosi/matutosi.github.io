
function getNs(button_id){
  return button_id.split("-")[0];
}

function setNs(ns){
  return function(id_name){
    return ns + "-" + id_name;
  };
}
  // var tf = setNs("test")
