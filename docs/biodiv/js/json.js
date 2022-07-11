// Convert csv to json format
//    can convert from tsv using by sep="\t"
//    @example
//    var csv = `item  type  value  option
//    Project  fixed    Biodiv
//    Investigator  text    
//    delButton  button    Don't change
//    Date  auto    Don't change
//    No  auto    Don't change
//    Location  text    `
//    csv2json(csv, sep="\t")
//    
function csv2json(csv, sep=","){
  var json_array = [];
  var csv_array = [];
  csv_array = csv.split('\n');
  var items = csv_array[0].split(sep);
    for (var i = 1; i < csv_array.length; i++) {
      var line = new Object;
      var tmp_array = csv_array[i].split(sep);
      for (var j = 0; j < items.length; j++) {
        if(tmp_array[j] !== ''){ line[items[j]] = tmp_array[j]; }
      }
      json_array.push(line);
  }
  JSON.stringify(json_array);
  console.log(json_array);
  return JSON.stringify(json_array);
}

// Extract all data from JSON data
//    Can extract data from simple JSON ()
//    @params json A JSON data.
//    @examples
//    extractJson(data.stand_json);
function extractJson(json){
  const keys = jsonKeys(json);
  var arr = [];
  for(k of keys){ arr[k] = []; }
  for(k of keys){
    for(j of json){ 
      if(j[k] === void 0) arr[k].push("")
      else                arr[k].push(j[k]);
    }
  }
  return arr;
}

// Extract JSON data with key
//    @params json A JSON data.
//    @params key  A key string.
//    @examples
//    json2Array(data.stand_json, "item");
//    json2Array(data.test, "item");
function json2Array(json, key){
  var arr = [];
  for(j of json){ 
    if(j[key] === void 0) arr.push("")
    else                  arr.push(j[key]);
  }
  return arr;
}

// Extract keys from JSON data
//    @params json A JSON data.
//    @examples
//    jsonKeys(data.stand_json)
//  
function jsonKeys(json){
  var arr = [];
  for(j of json){ arr = arr.concat(Object.keys(j)); }
  return uniq(arr);
}
