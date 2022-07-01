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

  meta_setting_json: [{"item":"Project","type":"fixed","value":" ","option":"Biodiv","hide":" ","delButton":" "},{"item":"Investigator","type":"text"},{"item":"delButton","type":"button","option":"Don't change"},{"item":"Date","type":"auto","option":"Don't change"},{"item":"No","type":"auto","option":"Don't change"},{"item":"Location","type":"text"}],

  plot_setting_json: [{"item":"Investigator","type":"text","value":" ","option":" ","hide":" ","delButton":" "},{"item":"delButton","type":"button","option":"Don't change"},{"item":"Date","type":"auto","option":"Don't change"},{"item":"No","type":"auto","option":"Don't change"},{"item":"Location","type":"text"},{"item":"Plot","type":"text"},{"item":"locLat","type":"auto","option":"Don't change"},{"item":"locLon","type":"auto","option":"Don't change"},{"item":"locAcc","type":"auto","option":"Don't change"},{"item":"Altitude","type":"number"},{"item":"Aspect","type":"text"},{"item":"Inclination","type":"number"},{"item":"B1Height","type":"number"},{"item":"B1Cover","type":"number"},{"item":"B2Height","type":"number"},{"item":"B2Cover","type":"number"},{"item":"S1Height","type":"number"},{"item":"S1Cover","type":"number"},{"item":"S2Height","type":"number"},{"item":"S21Cover","type":"number"},{"item":"K1Hieght","type":"number"},{"item":"K1Cover","type":"number"},{"item":"Memo","type":"text"}],

  occ_setting_json: [{"item":"Date","type":"auto","value":" ","option":"Don't change","hide":" ","delButton":" "},{"item":"locLat","type":"auto","option":"Don't change"},{"item":"locLon","type":"auto","option":"Don't change"},{"item":"locAcc","type":"auto","option":"Don't change"},{"item":"delButton","type":"button","option":"Don't change"},{"item":"No","type":"auto"},{"item":"Identified","type":"checkbox"},{"item":"Sampled","type":"checkbox"},{"item":"Plot","type":"fixed","value":"Plot_01"},{"item":"Layer","type":"list","value":"B1:B2:S1:S2:K"},{"item":"Species","type":"text"},{"item":"Cover","type":"number"},{"item":"Memo","type":"text"}],


  bis_occ_input_example_01: '{"sys_c_names":["Date","locLat","locLon","locAcc","delButton","No","Identified","Sampled","Plot","Layer","Species","Cover","Memo"]};{"sys_d_types":["fixed","fixed","fixed","fixed","button","fixed","checkbox","checkbox","fixed","select-one","text","number","text"]};{"sys_selects":[null,null,null,null,null,null,null,null,null,["B1","B2","S1","S2","K",""],null,null,null]};{"Date":["2022_05_30_16_15_32","2022_05_30_16_15_36","2022_05_30_16_15_36","2022_05_30_16_15_36","2022_05_30_16_15_40","2022_05_30_16_15_40","2022_05_30_16_15_40","2022_05_30_16_16_13","2022_05_30_16_16_13","2022_05_30_16_16_13"],"locLat":["34.7346808","34.7346808","34.7346808","34.7346808","34.7346808","34.7346808","34.7346808","34.7346808","34.7346808","34.7346808"],"locLon":["135.2872356","135.2872356","135.2872356","135.2872356","135.2872356","135.2872356","135.2872356","135.2872356","135.2872356","135.2872356"],"locAcc":["15.792","15.792","15.792","15.792","15.792","15.792","15.792","15.792","15.792","15.792"],"delButton":[null,null,null,null,null,null,null,null,null,null],"No":["1","2","3","4","5","6","7","8","9","10"],"Identified":[true,true,false,false,true,false,true,false,true,false],"Sampled":[false,true,true,false,false,true,true,false,false,true],"Plot":["Plot_01","Plot_01","Plot_01","Plot_01","Plot_01","Plot_01","Plot_01","Plot_01","Plot_01","Plot_01"],"Layer":["B1","B1","B2","B2","S1","S2","K","K","K","K"],"Species":["abc","bbbbbb","ccccccccccccc","dd","e e","dd sp.","eeee","fffffffffff","gg gg gg","hhhhhhh"],"Cover":["75","10","7","12","14","6","0.01","0.1","0.001","0.1"],"Memo":["memo","","","","???","","","","",""]}',

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
