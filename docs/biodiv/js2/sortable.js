// Set table sortable
//    Inspired by https://blog.ver001.com/javascript-table-sort/
//    Click th, and sort table by its th order.
//    The same th clicked again, sort by descending order.
//    "" in number will be converted into null for sorting in last element.
//    "" in string keep "" (NOT null) for sorting in last element.
//    setSortable() should be executed after a table is created, 
//    If executed before creation, a table will not be sortable.
//    
function setSortable(id_table){
  // console.log(id_table);
  // console.log( document.querySelectorAll('#' + id_table + ' th') );
  // var id_table = "occ_input_table_example_01";
  // var id_table = "comp_table";
  document.querySelectorAll('#' + id_table + ' th').forEach(elm => {
    elm.onclick = function (){
      // settings
      var table = document.getElementById(id_table);
      column_no = this.cellIndex; // now clicked
      // sort direction: clicked: sort reverse
      if(column_no_prev !== column_no) {
        dir = "asc"; 
      } else if(column_no_prev === column_no && dir === "desc") {
        dir = "asc"; 
      } else if(column_no_prev === column_no && dir === "asc"){
        dir = "desc"; 
      } 
      column_no_prev = column_no;
      var col_name = getColNames(table)[column_no];
      var elements = getColData(table, col_name, list_with_index = true);
  //       elements.shift() // delete hide button
  // console.log("elements in sort: " + elements);
      var rank_index = rank(elements, dir);  // rank_index: sorting order
      // sort table
      var trs = table.rows;
      for(let i = 0; i < rank_index.length; i++){ 
        rank_index[i]++;  // add 2 (colnames and hide button)
        rank_index[i]++;
      }
      rank_index.unshift(0, 1);  // 0: colnames, 1: hide button
      var new_trs = sortByOrder(trs, rank_index);
      for(let i = 0; i < new_trs.length; i++){
        table.appendChild(new_trs[i]);
      }
    }
  })
}

// Convert string array to numeric array
//    Available when all element of array can be convert to numeric by Number().
//    Some element can NOT be converted, return input array.
//    "" in number will be converted into null for sorting in last element.
//    "" in string keep "" (NOT null) for sorting in last element.
function string2Numeric(array){
  new_array = blank2Null(array);  // keep original for return in string
  var res_array = [];
  for(let i=0; i<array.length; i++){
    if(isNaN(Number(new_array[i]))){ return array; } // string: return original array
    if(new_array[i] === null){ res_array[i] = null;                }
    else                     { res_array[i] = Number(new_array[i]); }
  }
  return res_array;
}

// Convert blank ("") string in array to null.
function blank2Null(array){
  var res_array = [];
  for(let i=0; i<array.length; i++){
    if(array[i] === ""){ res_array[i] = null;     }
    else               { res_array[i] = array[i]; }
  }
  return res_array;
}

// Rank of each element in an array (1st version)
//    
//    Rank starts with 0, because rank will be used to sort arrays.
//    In case of tie, return former element with a smaller index.
//    null return as the last element.
//    "" in number will be converted into null, and return as the last element.
//    "" in string keep "" (NOT null), and return as the last element.
//      rank([5, 3, 2, 4, null, 1, 3])
//      >>   [5, 2, 1, 4, 6,    0, 3]
function rank(array, dir = "asc"){
// var array = ["3","1","","", "2"];
// var array = [3,2,"","", 2];
// var array = ["c","","a","", "b", "c"];
// 
// string MUST keep "", do NOT convert into null 
//    in string2Numeric
    array = string2Numeric(array);
    var rank = [];
    var n_array = array.length;
    for (let i = 0; i < n_array; i++) { rank[i] = 0; }
    if(dir === "desc"){
      for (let i=1; i<n_array; i++) {
          for (let j=0; j<i; j++) {
              if( array[j]  <  array[i]) { rank[j]++; }
              if( array[j]  >  array[i]) { rank[i]++; }
              if( array[j] === array[i]) { rank[j]++; }
          }
      }
    } else {
      for (let i = 1; i < n_array; i++) {
          for (let j = 0; j < i; j++) {
              if( array[j] > array[i]){
                  if( array[i] === null || array[i] === "" ){ rank[i]++; }
                  else                                      { rank[j]++; }
              }
              if( array[j] < array[i]){
                  if(array[j] === null || array[j] === "" ) { rank[j]++; }
                  else                                      { rank[i]++; }
              }
              if( array[j] === array[i])                    { rank[i]++; }
          }
      }
    }
    return rank;
}

// Sort array with rank_array
function sortByOrder(array, rank_array){
  const n = array.length;
  if(n !== rank_array.length){
    alert("Length of array and rank_array must be same!");
    return array;
  }
  var sorted_array = [];
  for(let Ni = 0; Ni < n; Ni++){
    sorted_array[rank_array[Ni]] = array[Ni];
  }
  return sorted_array;
}
