// Data for default settings
//    data.setting_plot_default;
//    data.setting_occ_default;
//    data.input_occ_exam01;
// 
// arrange JSON https://tools.m-bsys.com/development_tooles/json-beautifier.php
// csv2JSON https://www.site24x7.com/ja/tools/csv-to-json.html
// JSON2csv https://qiita.com/_s_/items/79c24b62cebb02e9304a
const data_test = {
  test: {
    plot: {
      biss_c_names: ["item","type","value","DELETE"],
      biss_d_types: ["text","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["Invest","DATE","Loc","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Alt"],
        type:   ["fixed","auto","text","auto","auto","auto","button","number"],
        value:  ["fixed_text","","","","","","",""],
        DELETE: [""          ,"","","","","","",""]
      }
    },
    occ: {
      biss_c_names: ["item","type","value","DELETE"],
      biss_d_types: ["text","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DELETE" ,"DATE","NO"  ,"LOC_LAT","UPDATE_TIME_GPS","Species","Layer","Cover" ,"Sampled" ,"Memo"],
        type:   ["button","auto","auto","auto"   ,"button"         ,"text"   ,"list" ,"number","checkbox","text"],
        value:  ["","","","","","","T1:T2:S1:S2:H","","","",""],
        DELETE: ["","","","","","",""             ,"","","",""]
      }
    },
  },
}

const data_settings = {

  default: {
    plot: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["text","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Photo","Memo"],
        type:   ["auto","fixed"       ,"text"        ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"   ,"number"   ,"number"   ,"number"   ,"number"  ,"number"  ,"number"  ,"number"  ,"number"  ,"number" ,"text" ,"text"],
        value:  [""    ,""            ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
        DELETE: [""    ,""            ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["text","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DELETE","DATE","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Layer"        ,"Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
        type:   ["button","auto","auto"   ,"auto"   ,"auto"   ,"button"         ,"list"         ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
        value:  [""      ,""    ,""       ,""       ,""       ,""               ,"T1:T2:S1:S2:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
        DELETE: [""      ,""    ,""       ,""       ,""       ,""               ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
      }
    },
  },

  empty: {
    plot: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["text","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["",],
        type:   ["",],
        value:  [""    ,],
        DELETE: [""    ,]
      }
    },
    occ: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["text","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["",],
        type:   ["",],
        value:  [""    ,],
        DELETE: [""    ,]
      }
    },
  },

  // "PLOT" and "NO" are inserted automatically.
  full: {
    plot: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Photo","Memo"],
        type:   ["auto","fixed"       ,"text"        ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"   ,"number"   ,"number"   ,"number"   ,"number"  ,"number"  ,"number"  ,"number"  ,"number"  ,"number" ,"text" ,"text"],
        value:  [""    ,""            ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
        DELETE: [""    ,""            ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DELETE","DATE","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Layer"        ,"Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
        type:   ["button","auto","auto"   ,"auto"   ,"auto"   ,"button"         ,"list"         ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
        value:  [""      ,""    ,""       ,""       ,""       ,""               ,"T1:T2:S1:S2:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
        DELETE: [""      ,""    ,""       ,""       ,""       ,""               ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
      }
    },
  },

  _5_layers: {
    plot: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Photo","Memo"],
        type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"   ,"number"   ,"number"   ,"number"   ,"number"  ,"number"  ,"number"  ,"number"  ,"number"  ,"number" ,"text" ,"text"],
        value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
        DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DELETE","Layer"        ,"Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
        type:   ["button","list"         ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
        value:  [""      ,"T1:T2:S1:S2:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
        DELETE: [""      ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
      }
    },
  },

  _3_layers: {
    plot: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T_height","S_height","H_height","T_cover","S_cover","H_cover","Photo","Memo"],
        type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"  ,"number"  ,"number"  ,"number" ,"number" ,"number" ,"text" ,"text"],
        value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""        ,""        ,""        ,""       ,""       ,""       ,""     ,""    ],
        DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""        ,""        ,""        ,""       ,""       ,""       ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DELETE","Layer","Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
        type:   ["button","list" ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
        value:  [""      ,"T:S:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
        DELETE: [""      ,""     ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
      } 
    },
  },

  no_layers: {
    plot: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","Height","Cover" ,"Photo","Memo"],
        type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number","number","text" ,"text"],
        value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""      ,""      ,""     ,""    ],
        DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""      ,""      ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DELETE","Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
        type:   ["button","text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
        value:  [""      ,""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
        DELETE: [""      ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
      }
    },
  },

  flora: {
    plot: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Location","Memo"],
        type:   ["auto","fixed"       ,"text"    ,"text"],
        value:  [""    ,""            ,""        ,""    ],
        DELETE: [""    ,""            ,""        ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item" ,"type","value","DELETE"],
      biss_d_types: ["fixed","list","text","button"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null],
      biss_inputs :{
        item:   ["DELETE","Species","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Sampled" ,"Identified" ,"Photo","Memo"],
        type:   ["button","text"   ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"checkbox","checkbox"   ,"text" ,"text"],
        value:  [""      ,""       ,""       ,""       ,""       ,""               ,""        ,""           ,""     ,""    ],
        DELETE: [""      ,""       ,""       ,""       ,""       ,""               ,""        ,""           ,""     ,""    ]
      }
    },
  },
}

const data_settings_part = {
  plot:{
    date_GPS:{
      item: ["DATE","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS"],
      type: ["auto","auto"   ,"auto"   ,"auto"   ,"button"         ],
    },
    altitude_etc:{
      item: ["Altitude","Aspect","Inclination"],
      type: ["number"  ,"text"  ,"number"     ],
    },
    
    _5_layers:{
      item: ["T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover"],
      type: ["number"   ,"number"   ,"number"   ,"number"   ,"number"  ,"number"  ,"number"  ,"number"  ,"number"  ,"number" ],
    },
    
    _3_layers:{
      item: ["T_height","S_height","H_height","T_cover","S_cover","H_cover"],
      type: ["number"  ,"number"  ,"number"  ,"number" ,"number" ,"number" ],
    },
    memo:{
      item: ["Photo","Memo"],
      type: ["text" ,"text"],
    },
  },

  occ:{
    date_GPS:{
      item: ["DATE","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS"],
      type: ["auto","auto"   ,"auto"   ,"auto"   ,"button"         ],
    },
    delete_button:{
      item: ["DELETE"],
      type: ["button"],
    },
    _5_layers:{
      item: ["Layer"        ,"Species","Cover" ],
      type: ["list"         ,"text"   ,"number"],
      value:["T1:T2:S1:S2:H",""       ,""      ]
    },
    _3_layers:{
      item: ["Layer","Species","Cover" ],
      type: ["list" ,"text"   ,"number"],
      value:["T:S:H",""       ,""      ]
    },
    cover_rank:{
      item: ["Rank"         ],
      type: ["list"         ],
      value:["5:4:3:2:1:+:r"]
    },
    sampled_identified:{
      item: ["Sampled" ,"Identified"],
      type: ["checkbox","checkbox"  ],
    },
    memo:{
      item: ["Photo","Memo"],
      type: ["text" ,"text"],
    },
  }
}
