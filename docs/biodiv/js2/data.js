// Data for default settings
//    data.setting_plot_default;
//    data.setting_occ_default;
//    data.input_occ_exam01;
// 
// arrange JSON https://tools.m-bsys.com/development_tooles/json-beautifier.php
// csv2JSON https://www.site24x7.com/ja/tools/csv-to-json.html
// JSON2csv https://qiita.com/_s_/items/79c24b62cebb02e9304a
const data = {
  setting_plot_default: '{"biss_c_names":["item","type","value","DELETE"]};{"biss_d_types":["text","list","text","button"]};{"biss_selects":[null,["auto","button","checkbox","fixed","list","text","number"],null,null]};{"item":["PLOT","Investigator","DELETE","DATE","NO","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Memo"],"type":["text","text","button","auto","auto","text","auto","auto","auto","button","number","text","number","number","number","number","number","number","number","number","number","number","number","text"],"value":["","","","","","","","","","","","","","","","","","","","","","","",""],"DELETE":["DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE"]}',

  setting_occ_default: '{"biss_c_names":["item","type","value","DELETE"]};{"biss_d_types":["text","list","text","button"]};{"biss_selects":[null,["auto","button","checkbox","fixed","list","text","number"],null,null]};{"item":["DATE","LOC_LAT","LOC_LON","LOC_ACC","DELETE","UPDATE_TIME_GPS","NO","Layer","Species","Cover","Identified","Sampled","Memo"],"type":["auto","auto","auto","auto","button","button","auto","list","text","number","checkbox","checkbox","text"],"value":["","","","","","","","T1:T2:S1:S2:H","","","","",""],"DELETE":["DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE"]}',

  input_occ_exam01: '{"biss_c_names":["PLOT","DATE","LOC_LAT","LOC_LON","LOC_ACC","DELETE","UPDATE_TIME_GPS","NO","Layer","Species","Cover","Identified","Sampled","Memo"]};{"biss_d_types":["fixed","fixed","fixed","fixed","fixed","button","button","fixed","list","text","number","checkbox","checkbox","text"]};{"biss_selects":[null,null,null,null,null,null,null,null,["","T1","T2","S1","S2","H"],null,null,null,null,null]};{"PLOT":["exam01","exam01","exam01","exam01","exam01","exam01","exam01","exam01"],"DATE":["2022_07_08_14_47_27","2022_07_08_14_47_26","2022_07_08_14_48_21","2022_07_08_14_47_29","2022_07_08_14_47_31","2022_07_08_14_47_30","2022_07_08_14_47_30","2022_07_08_14_47_27"],"LOC_LAT":["34.734","34.734","34.734","34.734","34.734","34.734","34.734","34.734"],"LOC_LON":["135.287","135.287","135.287","135.287","135.287","135.287","135.287","135.287"],"LOC_ACC":["16.8","16.8","16.8","16.8","16.8","16.8","16.8","16.8"],"DELETE":["DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE","DELETE"],"UPDATE_TIME_GPS":["UPDATE_TIME_GPS","UPDATE_TIME_GPS","UPDATE_TIME_GPS","UPDATE_TIME_GPS","UPDATE_TIME_GPS","UPDATE_TIME_GPS","UPDATE_TIME_GPS","UPDATE_TIME_GPS"],"NO":["2","1","8","4","7","6","5","3"],"Layer":["T1","T1","H","T2","H","S1","S2","T2"],"Species":["bbbb","abc","hhhh sp","dddddddddddd sp","ggg","fff","eeee","ccccccccc"],"Cover":["53","29","9","11","13","9","0.2",".1"],"Identified":[true,true,false,true,true,true,true,true],"Sampled":[false,false,true,true,false,false,false,false],"Memo":["","","","maybe","","","",""]}',
};

const data_00 = {
  setting_plot_01: {
    biss_c_names: ["item","type","value","DELETE"],
    biss_d_types: ["text","list","text","button"],
    biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
    biss_inputs: {
      item: ["PLOT","Investigator","DELETE","DATE","NO","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Memo"],
      type: ["text","text","button","auto","auto","text","auto","auto","auto","button","number","text","number","number","number","number","number","number","number","number","number","number","number","text"],
      value: ["","","","","","","","","","","","","","","","","","","","","","","",""],
      DELETE: ["","","","","","","","","","","","","","","","","","","","","","","",""]
    }
  },

  setting_occ_default: {
    biss_c_names: ["item","type","value","DELETE"],
    biss_d_types: ["text","list","text","button"],
    biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
    biss_inputs: {
      item: ["DATE","LOC_LAT","LOC_LON","LOC_ACC","DELETE","UPDATE_TIME_GPS","NO","Layer","Species","Cover","Identified","Sampled","Memo"],
      type: ["auto","auto","auto","auto","button","button","auto","list","text","number","checkbox","checkbox","text"],
      value: ["","","","","","","","T1:T2:S1:S2:H","","","","",""],
      DELETE: ["","","","","","","","","","","","",""],
    }
  },

  input_occ_exam01: {
    biss_c_names: ["PLOT","DATE","LOC_LAT","LOC_LON","LOC_ACC","DELETE","UPDATE_TIME_GPS","NO","Layer","Species","Cover","Identified","Sampled","Memo"],
    biss_d_types: ["fixed","fixed","fixed","fixed","fixed","button","button","fixed","list","text","number","checkbox","checkbox","text"],
    biss_selects: [null,null,null,null,null,null,null,null,["","T1","T2","S1","S2","H"],null,null,null,null,null],
    biss_inputs: {
      plot: ["exam01","exam01","exam01","exam01","exam01","exam01","exam01","exam01"],
      DATE: ["2022_07_08_14_47_27","2022_07_08_14_47_26","2022_07_08_14_48_21","2022_07_08_14_47_29","2022_07_08_14_47_31","2022_07_08_14_47_30","2022_07_08_14_47_30","2022_07_08_14_47_27"],
      LOC_LAT: ["34.734","34.734","34.734","34.734","34.734","34.734","34.734","34.734"],
      LOC_LON: ["135.287","135.287","135.287","135.287","135.287","135.287","135.287","135.287"],
      LOC_ACC: ["16.8","16.8","16.8","16.8","16.8","16.8","16.8","16.8"],
      DELETE: ["","","","","","","",""],
      UPDATE_TIME_GPS: ["","","","","","","",""],
      NO: ["2","1","8","4","7","6","5","3"],
      Layer: ["T1","T1","H","T2","H","S1","S2","T2"],
      Species: ["bbbb","abc","hhhh sp","dddddddddddd sp","ggg","fff","eeee","ccccccccc"],
      Cover: ["53","29","9","11","13","9","0.2",".1"],
      Identified: [true,true,false,true,true,true,true,true],
      Sampled: [false,false,true,true,false,false,false,false],
      Memo: ["","","","maybe","","","",""]
    }
  }
};

const data_test = {
  setting_plot: {
    biss_c_names: ["item","type","value","DELETE"],
    biss_d_types: ["text","list","text","button"],
    biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
    biss_inputs: {
      item:   ["Invest","DATE","Loc","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Alt"],
      type:   ["fixed","auto","text","auto","auto","auto","button","number"],
      value:  ["fixed_text","","","","","","",""],
      DELETE: [""          ,"","","","","","",""]
    }
  },
  setting_occ: {
    biss_c_names: ["item","type","value","DELETE"],
    biss_d_types: ["text","list","text","button"],
    biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
    biss_inputs: {
      item:   ["DELETE" ,"DATE","NO"  ,"LOC_LAT","UPDATE_TIME_GPS","Species","Layer","Cover" ,"Sampled" ,"Memo"],
      type:   ["button","auto","auto","auto"   ,"button"         ,"text"   ,"list" ,"number","checkbox","text"],
      value:  ["","","","","","","T1:T2:S1:S2:H","","","",""],
      DELETE: ["","","","","","",""             ,"","","",""]
    }
  },
}
