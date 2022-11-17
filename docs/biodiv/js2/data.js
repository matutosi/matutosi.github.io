// Data for default settings
//    data.setting_plot_default;
//    data.setting_occ_default;
//    data.input_occ_exam01;
// 
// arrange JSON https://tools.m-bsys.com/development_tooles/json-beautifier.php
// csv2JSON https://www.site24x7.com/ja/tools/csv-to-json.html
// JSON2csv https://qiita.com/_s_/items/79c24b62cebb02e9304a
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
}

const data_test = {
  setting_plot: {
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
  setting_occ: {
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

  // "PLOT" and "NO" are inserted automatically.
  setting_plot_full: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DATE","Investigator","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Photo","Memo"],
      type:   ["auto","fixed"       ,"text"        ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"   ,"number"   ,"number"   ,"number"   ,"number"  ,"number"  ,"number"  ,"number"  ,"number"  ,"number" ,"text" ,"text"],
      value:  [""    ,""            ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
      DELETE: [""    ,""            ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ]
    }
  },
  setting_occ_full: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DELETE","DATE","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Layer"        ,"Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
      type:   ["button","auto","auto"   ,"auto"   ,"auto"   ,"button"         ,"list"         ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
      value:  [""      ,""    ,""       ,""       ,""       ,""               ,"T1:T2:S1:S2:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
      DELETE: [""      ,""    ,""       ,""       ,""       ,""               ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
    }
  },

  setting_plot_5_layers: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Photo","Memo"],
      type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"   ,"number"   ,"number"   ,"number"   ,"number"  ,"number"  ,"number"  ,"number"  ,"number"  ,"number" ,"text" ,"text"],
      value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
      DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ]
    }
  },
  setting_occ_5_layers: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DELETE","Layer"        ,"Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
      type:   ["button","list"         ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
      value:  [""      ,"T1:T2:S1:S2:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
      DELETE: [""      ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
    }
  },

  setting_plot_3_layers: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T_height","S_height","H_height","T_cover","S_cover","H_cover","Photo","Memo"],
      type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"  ,"number"  ,"number"  ,"number" ,"number" ,"number" ,"text" ,"text"],
      value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""        ,""        ,""        ,""       ,""       ,""       ,""     ,""    ],
      DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""        ,""        ,""        ,""       ,""       ,""       ,""     ,""    ]
    }
  },
  setting_occ_3_layers: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DELETE","Layer","Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
      type:   ["button","list" ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
      value:  [""      ,"T:S:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
      DELETE: [""      ,""     ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
    } 
  },

  setting_plot_no_layers: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","Height","Cover" ,"Photo","Memo"],
      type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number","number","text" ,"text"],
      value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""      ,""      ,""     ,""    ],
      DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""      ,""      ,""     ,""    ]
    }
  },
  setting_occ_no_layers: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DELETE","Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo"],
      type:   ["button","text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text"],
      value:  [""      ,""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,""           ,""     ,""    ],
      DELETE: [""      ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ]
    }
  },

  setting_plot_flora: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DATE","Investigator","Location","Memo"],
      type:   ["auto","fixed"       ,"text"    ,"text"],
      value:  [""    ,""            ,""        ,""    ],
      DELETE: [""    ,""            ,""        ,""    ]
    }
  },
  setting_occ_flora: {
    biss_c_names: ["item" ,"type","value","DELETE"],
    biss_d_types: ["fixed","fixed","text","button"],
    biss_selects: [null,null,null,null],
    biss_inputs :{
      item:   ["DELETE","Species","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Sampled" ,"Identified" ,"Photo","Memo"],
      type:   ["button","text"   ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"checkbox","checkbox"   ,"text" ,"text"],
      value:  [""      ,""       ,""       ,""       ,""       ,""               ,""        ,""           ,""     ,""    ],
      DELETE: [""      ,""       ,""       ,""       ,""       ,""               ,""        ,""           ,""     ,""    ]
    }
  },
}

const data_settings = {
  default: {
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
