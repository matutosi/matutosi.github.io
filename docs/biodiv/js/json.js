// Convert csv to json format
//    can convert from tsv using by sep="\t"
//    @example
//    var csv = `item	type	value	option
//    Project	fixed		Biodiv
//    Investigator	text		
//    DELETE	button		Don't change
//    Date	auto		Don't change
//    No	auto		Don't change
//    Location	text		`
//    var json = csv2json(csv, sep="\t");
//    var json_2 = JSON.parse(json);
//    jsonKeys(json_2);
//    extractJson(json_2);
//    json2Array(json_2, "item")
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
  return JSON.stringify(json_array);
}

// Extract all data from JSON data
//    Can extract data from simple JSON ()
//    @param json A JSON data.
function extractJson(json){
  const keys = jsonKeys(json);
  var arr = [];
  for(let k of keys){ arr[k] = []; }
  for(let k of keys){
    for(let j of json){ 
      if(j[k] === void 0) arr[k].push("")
      else                arr[k].push(j[k]);
    }
  }
  return arr;
}

// Extract JSON data with key
//    @param json A JSON data.
//    @param key  A key string.
function json2Array(json, key){
  var arr = [];
  for(let j of json){ 
    if(j[key] === void 0) arr.push("")
    else                  arr.push(j[key]);
  }
  return arr;
}

// Extract keys from JSON data
function jsonKeys(json){
  var arr = [];
  for(let j of json){ arr = arr.concat(Object.keys(j)); }
  return uniq(arr);
}

// Unique array
function uniq(array){
  return Array.from(new Set(array));
}
