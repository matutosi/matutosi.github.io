// wamei
function createWameiSpan(){
  var note_search = ' "aaa bbb" matches texts including both "aaa" and "bbb".';
  var note_wamei  = `Wamei (Japanese plant names) is obtained from <br>
                     Yamanouchi, T., Shutoh, K., Osawa, T., Yonekura, K., Kato, S., Shiga, T. 2019. <br>
                     A checklist of Japanese plant names. <br>
                     https://www.gbif.jp/v2/activities/wamei_checklist.html`;
  var main = crEl({ el:'span', ats:{id: 'wamei'} });
  main.appendChild( createSearchShowInput('wamei_input')               );
  main.appendChild( createSearchWameiButton()                          );
  main.appendChild( crEl({ el:'span', ih: note_search               }) )
  main.appendChild( createSpecieUlModule({ species: '', ns: 'wamei' }) );
  main.appendChild( crEl({ el:'span', ih: note_wamei                }) )
  return main;
}

function createSearchWameiButton(){
  return createInput({ type: "button", value: "Search wamei", onclick: "searchWamei(this)" });
}

function searchWamei(obj){
  var parent    = obj.parentNode;
  var input     = document.getElementById('wamei_input').value;
  if(input === ''){
    var species = '';
  }else{
    var reg_exp   = makeLookAheadReg(input);
    var species   = grepArray(wamei, reg_exp);
  }
  var limits = 200;
  if(species.length > limits){
    alert('Over ' + limits + ' matches, showing ' + limits + ' matches');
    species.splice(limits);
  }
  var new_wamei  = createSpecieUlModule({ species: species, ns: 'wamei',
                                          show_select_plot     : true, show_select_layer   : true });
  var old_wamei = document.getElementById('sp_list_module-wamei');
  old_wamei.replaceWith(new_wamei);
}
