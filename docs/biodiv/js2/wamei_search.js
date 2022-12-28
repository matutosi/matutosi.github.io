// 
function createSearchFloraSpan(name = 'wamei'){
  var note_search = ' "aaa bbb" matches texts including both "aaa" and "bbb".';
  var note_wamei  = `Wamei (Japanese plant names) is obtained from <br>
                     Yamanouchi, T., Shutoh, K., Osawa, T., Yonekura, K., Kato, S., Shiga, T. 2019. <br>
                     A checklist of Japanese plant names. <br>
                     https://www.gbif.jp/v2/activities/wamei_checklist.html`;
  var main = crEl({ el:'span', ats:{id: 'flora'} });
  main.appendChild( createReplaceFloraButton()                                    );
  main.appendChild( crEl({ el:'br'                                             }) );
  main.appendChild( createSearchShowInput('flora_input')                          );
  main.appendChild( createSearchFloraButton(name)                                 );
  main.appendChild( crEl({ el:'span', ih: note_search                          }) );
  main.appendChild( createSpecieUlModule({ species: '', ns: 'flora',
                                           show_select_plot: true,
                                           show_select_options: true           }) );
  main.appendChild( crEl({ el:'span', ih: note_wamei, ats:{id : 'note_wamei'}  }) );
  return main;
}

function createSearchFloraButton(name){
  var value = "Search " + name;
  var id    = "search_flora_button";
  return crEl({ el:'input', ats:{ type: "button", id: id, value: value, onclick: "searchFlora(this)" } });
}

function searchFlora(obj){
  var parent    = obj.parentNode;
  var input     = document.getElementById('flora_input').value;
  if(input === ''){
    var species = '';
  }else{
    var reg_exp   = makeLookAheadReg(input);
    var species   = grepArray(flora, reg_exp);
  }
  var limits = 200;
  if(species.length > limits){
    alert('Over ' + limits + ' matches, showing ' + limits + ' matches');
    species.splice(limits);
  }
  var new_flora  = createSpecieUlModule({ species             : species,
                                          ns                  : 'flora',
                                          show_select_plot    : true   ,
                                          show_select_options : true    });
  var old_flora = document.getElementById('sp_list_module-flora');
  old_flora.replaceWith(new_flora);
}
function createReplaceFloraButton(){
  var id = '';
  var span = crEl({el:'span', ih: "Replace <b>flora</b>" });
  var file_input = crEl({ el:'input', ats:{ type: "file", id: id, onchange: "replaceFlora(this)" } });
  span.appendChild(file_input);
  return span;
}
async function replaceFlora(obj){
  var name = obj.files[0].name.split("\.")[0];
  var text = await readFile(obj.files[0]);
  flora = uniq(text.split('\n'));
  removeEmptyInArray(flora);
  flora.sort();

  var old_button = document.getElementById('search_flora_button');
  var new_button = createSearchFloraButton(name);
  old_button.replaceWith(new_button);
  
  var note_wamei = document.getElementById('note_wamei');
  note_wamei.style.display = "none";
}
