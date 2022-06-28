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

  occ_setting_json: [{"item":"Date","type":"auto","value":" ","option":"Don't change","hide":" ","delButton":" "},{"item":"locLat","type":"auto","option":"Don't change"},{"item":"locLon","type":"auto","option":"Don't change"},{"item":"locAcc","type":"auto","option":"Don't change"},{"item":"delButton","type":"button","option":"Don't change"},{"item":"No","type":"auto"},{"item":"Identified","type":"checkbox"},{"item":"Sampled","type":"checkbox"},{"item":"Plot","type":"fixed","value":"Plot_01"},{"item":"Layer","type":"list","value":"B1;B2;S1;S2;K"},{"item":"Species","type":"text"},{"item":"Cover","type":"number"},{"item":"Memo","type":"text"}],
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
