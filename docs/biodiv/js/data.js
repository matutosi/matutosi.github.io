// Data for default settings
//    
//    data_types: input data types in setting table.
//    plot-setting-json : plot settings.
//    occ_json  : occurrence settings.
//    @examples
//    data.data_types;
//    data.plot-setting-json[0].item;
//    data.occ_json;
const data = {
  data_types: ["auto", "button", "checkbox", "fixed", "list", "text", "number"],

  input_occ_exam01: '{"sys_c_names":["Plot","Date","locLat","locLon","locAcc","delButton","updateButton","No","Layer","Species","Cover","Identified","Sampled","Memo"]};{"sys_d_types":["fixed","fixed","fixed","fixed","fixed","button","button","fixed","select-one","text","number","checkbox","checkbox","text"]};{"sys_selects":[null,null,null,null,null,null,null,null,["B1","B2","S1","S2","K",""],null,null,null,null,null]};{"Plot":["exam01","exam01","exam01","exam01","exam01","exam01","exam01","exam01"],"Date":["2022_07_08_14_47_27","2022_07_08_14_47_26","2022_07_08_14_48_21","2022_07_08_14_47_29","2022_07_08_14_47_31","2022_07_08_14_47_30","2022_07_08_14_47_30","2022_07_08_14_47_27"],"locLat":["34.734","34.734","34.734","34.734","34.734","34.734","34.734","34.734"],"locLon":["135.287","135.287","135.287","135.287","135.287","135.287","135.287","135.287"],"locAcc":["16.8","16.8","16.8","16.8","16.8","16.8","16.8","16.8"],"delButton":["DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE"],"updateButton":["Update Time & GPS","Update Time & GPS","Update Time & GPS","Update Time & GPS","Update Time & GPS","Update Time & GPS","Update Time & GPS","Update Time & GPS"],"No":["2","1","8","4","7","6","5","3"],"Layer":["B1","B1","K","B2","K","S1","S2","B2"],"Species":["bbbb","abc","hhhh sp","dddddddddddd sp","ggg","fff","eeee","ccccccccc"],"Cover":["53","29","9","11","13","9","0.2",".1"],"Identified":[true,true,false,true,true,true,true,true],"Sampled":[false,false,true,true,false,false,false,false],"Memo":["","","","maybe","","","",""]}',

  setting_plot_default: '{"sys_c_names":["item","type","value","delButton"]};{"sys_d_types":["text","select-one","text","button"]};{"sys_selects":[null,["auto","button","checkbox","fixed","list","text","number"],null,null]};{"item":["Plot","Investigator","delButton","Date","No","Location","locLat","locLon","locAcc","updateButton","Altitude","Aspect","Inclination","B1Height","B2Height","S1Height","S2Height","K1Hieght","B1Cover","B2Cover","S1Cover","S21Cover","K1Cover","Memo"],"type":["text","text","button","auto","auto","text","auto","auto","auto","button","number","text","number","number","number","number","number","number","number","number","number","number","number","text"],"value":[" ","","","","","","","","","","","","","","","","","","","","","","",""],"delButton":["DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE"]}',

  setting_occ_default: '{"sys_c_names":["item","type","value","delButton"]};{"sys_d_types":["text","select-one","text","button"]};{"sys_selects":[null,["auto","button","checkbox","fixed","list","text","number"],null,null]};{"item":["Date","locLat","locLon","locAcc","delButton","updateButton","No","Layer","Species","Cover","Identified","Sampled","Memo"],"type":["auto","auto","auto","auto","button","button","auto","list","text","number","checkbox","checkbox","text"],"value":[" ","","","","","","","B1:B2:S1:S2:K","","","","",""],"delButton":["DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE"]}',
  };



// arrange JSON https://tools.m-bsys.com/development_tooles/json-beautifier.php
// csv2JSON https://www.site24x7.com/ja/tools/csv-to-json.html
// JSON2csv https://qiita.com/_s_/items/79c24b62cebb02e9304a
// 
// meta_tsv
// item	type	value	option	hide	delButton
// Project	fixed	 	Biodiv	 	 
// Investigator	text				
// delButton	button		Don't change		
// Date	auto		Don't change		
// No	auto		Don't change		
// Location	text				
// 
// plot_tsv
// item	type	value	option	hide	delButton
// Investigator	text	 	 	 	 
// delButton	button		Don't change		
// Date	auto		Don't change		
// No	auto		Don't change		
// Location	text				
// Plot	text				
// locLat	auto		Don't change		
// locLon	auto		Don't change		
// locAcc	auto		Don't change		
// Altitude	number				
// Aspect	text				
// Inclination	number				
// B1Height	number				
// B1Cover	number				
// B2Height	number				
// B2Cover	number				
// S1Height	number				
// S1Cover	number				
// S2Height	number				
// S21Cover	number				
// K1Hieght	number				
// K1Cover	number				
// Memo	text				
// 		 	 	 	 
// 
// occ_csv
// item	type	value	option	hide	delButton
// Date	auto	 	Don't change	 	 
// locLat	auto		Don't change		
// locLon	auto		Don't change		
// locAcc	auto		Don't change		
// delButton	button		Don't change		
// No	auto				
// Identified	checkbox				
// Sampled	checkbox				
// Plot	fixed	Plot_01			
// Layer	list	B1;B2;S1;S2;K			
// Species	text				
// Cover	number				
// Memo	text				
