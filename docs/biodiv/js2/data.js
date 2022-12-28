// Data for default settings
//    data.setting_plot_default;
//    data.setting_occ_default;
//    data.input_occ_exam01;
// 
// arrange JSON https://tools.m-bsys.com/development_tooles/json-beautifier.php
// csv2JSON https://www.site24x7.com/ja/tools/csv-to-json.html
// JSON2csv https://qiita.com/_s_/items/79c24b62cebb02e9304a
const data_settings = {
  empty: {
    plot: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["",],
        type:   ["",],
        value:  [""    ,],
        DELETE: [""    ,],
        memo  : [""    ,]
      }
    },
    occ: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["",],
        type:   ["",],
        value:  [""    ,],
        DELETE: [""    ,],
        memo  : [""    ,]
      }
    },
  },

  // "PLOT" and "NO" are inserted automatically.
  full: {
    plot: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DATE","Investigator_f","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Photo","Memo"],
        type:   ["auto","fixed"         ,"text"        ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"   ,"number"   ,"number"   ,"number"   ,"number"  ,"number"  ,"number"  ,"number"  ,"number"  ,"number" ,"text" ,"text"],
        value:  [""    ,""              ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
        DELETE: [""    ,""              ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
        memo  : [""    ,""              ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DELETE","DATE","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Layer"        ,"Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo","SameAs"],
        type:   ["button","auto","auto"   ,"auto"   ,"auto"   ,"button"         ,"list"         ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text","auto"  ],
        value:  [""      ,""    ,""       ,""       ,""       ,""               ,"T1:T2:S1:S2:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,"checked"    ,""     ,""    ,""      ],
        DELETE: [""      ,""    ,""       ,""       ,""       ,""               ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ,""      ],
        memo  : [""      ,""    ,""       ,""       ,""       ,""               ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ,""      ]
      }
    },
  },

  _5_layers: {
    plot: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T1_height","T2_height","S1_height","S2_height","H_height","T1_cover","T2_cover","S1_cover","S2_cover","H_cover","Photo","Memo"],
        type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"   ,"number"   ,"number"   ,"number"   ,"number"  ,"number"  ,"number"  ,"number"  ,"number"  ,"number" ,"text" ,"text"],
        value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
        DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ],
        memo  : [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""         ,""         ,""         ,""         ,""        ,""        ,""        ,""        ,""        ,""       ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DELETE","Layer"        ,"Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo","SameAs"],
        type:   ["button","list"         ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text","auto"  ],
        value:  [""      ,"T1:T2:S1:S2:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,"checked"    ,""     ,""    ,""      ],
        DELETE: [""      ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ,""      ],
        memo  : [""      ,""             ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ,""      ]
      }
    },
  },

  _3_layers: {
    plot: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","T_height","S_height","H_height","T_cover","S_cover","H_cover","Photo","Memo"],
        type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number"  ,"number"  ,"number"  ,"number" ,"number" ,"number" ,"text" ,"text"],
        value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""        ,""        ,""        ,""       ,""       ,""       ,""     ,""    ],
        DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""        ,""        ,""        ,""       ,""       ,""       ,""     ,""    ],
        memo  : [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""        ,""        ,""        ,""       ,""       ,""       ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DELETE","Layer","Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo","SameAs"],
        type:   ["button","list" ,"text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text","auto"  ],
        value:  [""      ,"T:S:H",""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,"checked"    ,""     ,""    ,""      ],
        DELETE: [""      ,""     ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ,""      ],
        memo  : [""      ,""     ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ,""      ]
      } 
    },
  },

  no_layers: {
    plot: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Location","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Altitude","Aspect","Inclination","Height","Cover" ,"Photo","Memo"],
        type:   ["auto","fixed"       ,"text"    ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"number"  ,"text"  ,"number"     ,"number","number","text" ,"text"],
        value:  [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""      ,""      ,""     ,""    ],
        DELETE: [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""      ,""      ,""     ,""    ],
        memo  : [""    ,""            ,""        ,""       ,""       ,""       ,""               ,""        ,""      ,""           ,""      ,""      ,""     ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DELETE","Species","Cover" ,"Abundance","Rank"         ,"Sampled" ,"Identified" ,"Photo","Memo","SameAs"],
        type:   ["button","text"   ,"number","number"   ,"list"         ,"checkbox","checkbox"   ,"text" ,"text","auto"  ],
        value:  [""      ,""       ,""      ,""         ,"5:4:3:2:1:+:r",""        ,"checked"    ,""     ,""    ,""      ],
        DELETE: [""      ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ,""      ],
        memo  : [""      ,""       ,""      ,""         ,""             ,""        ,""           ,""     ,""    ,""      ]
      }
    },
  },

  flora: {
    plot: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DATE","Investigator","Location","Memo"],
        type:   ["auto","fixed"       ,"text"    ,"text"],
        value:  [""    ,""            ,""        ,""    ],
        DELETE: [""    ,""            ,""        ,""    ],
        memo  : [""    ,""            ,""        ,""    ]
      }
    },
    occ: {
      biss_c_names: ["item","type" ,"value","DELETE","memo"],
      biss_d_types: ["text","list" ,"text" ,"button","text"],
      biss_selects: [null,["auto","button","checkbox","fixed","list","text","number"],null,null,null],
      biss_inputs :{
        item:   ["DELETE","Species","LOC_LAT","LOC_LON","LOC_ACC","UPDATE_TIME_GPS","Sampled" ,"Identified" ,"Photo","Memo"],
        type:   ["button","text"   ,"auto"   ,"auto"   ,"auto"   ,"button"         ,"checkbox","checkbox"   ,"text" ,"text"],
        value:  [""      ,""       ,""       ,""       ,""       ,""               ,""        ,"checked"    ,""     ,""    ],
        DELETE: [""      ,""       ,""       ,""       ,""       ,""               ,""        ,""           ,""     ,""    ],
        memo  : [""      ,""       ,""       ,""       ,""       ,""               ,""        ,""           ,""     ,""    ]
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
      item: ["Layer"        ],
      type: ["list"         ],
      value:["T1:T2:S1:S2:H"]
    },
    _3_layers:{
      item: ["Layer"],
      type: ["list" ],
      value:["T:S:H"]
    },
    species:{
      item: ["Species"],
      type: ["text"   ],
      value:[""       ]
    },
    cover_rank:{
      item: ["Cover" ,"Rank"         ],
      type: ["number","list"         ],
      value:[""      ,"5:4:3:2:1:+:r"]
    },
    sampled_identified:{
      item: ["Sampled" ,"Identified"],
      type: ["checkbox","checkbox"  ],
      value:[""        ,"checked"   ]
    },
    memo:{
      item: ["Photo","Memo","SameAs"],
      type: ["text" ,"text","auto"  ],
    },
  }
}
