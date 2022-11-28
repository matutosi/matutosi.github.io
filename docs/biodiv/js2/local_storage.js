// 
// 
//    @param sp_list An array.
//    @examples
//    console.log(removeSLinLS());
//    console.log(getLSKeys());
//    console.log(getSLinLS());
//    console.log(addSLinLS([1,2,3]));
//    console.log(getSLinLS());
//    console.log(addSLinLS([1,2,5,6,7]));
//    console.log(uniq(getSLinLS()));
function addSLinLS(sp_list, ns='base'){
  if(getSLinLS(ns) === ''){
    var new_list = sp_list;
  }else{
    var old_list = getSLinLS(ns);
    var new_list = old_list.concat(sp_list);
  }
  var new_list = uniq(new_list.sort());
  localStorage.setItem('biss_sl-' + ns, new_list);
}
function getSLinLS(ns='base'){
  if(localStorage['biss_sl-' + ns] === void 0){
    return '';
  }else{
    return localStorage['biss_sl-' + ns].split(',');
  }
}
function removeSLinLSAll(){ removeSLinLS('all_remove'); }
function removeSLinLS(ns='base'){
  if(ns === 'all_remove'){
    var keys = getKeysOfSLinLS();
    for(let key of keys){ localStorage.removeItem(key); }
  }else{
    localStorage.removeItem('biss_sl-' + ns);
  }
}
function getLSKeys(){
  return Object.keys(localStorage);
}
function getKeysOfSLinLS(){
  var keys = getLSKeys();
  // var keys = ['biss_sl-2', 'biss_sl-1', 'bis_sl-1', 'abiss_sl-1'];
  return grepArray(keys, /^biss_sl-/);
}
function grepArray(array, regex){
  var matched = [];
  for(let a of array){
    if(regex.test(a)){
      matched.push(a);
    }
  }
  return matched;
}
function replaceArrayAll(array, search, replace){
  var replaced = [];
  for(let a of array){
    replaced.push(a.replaceAll(search, replace));
  }
  return replaced;
}
