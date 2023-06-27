# stringrで文字列操作 {#stringr}

<!--
-->

## はじめに

stringrはstringiパッケージのラッパーである．
stringiは文字列操作のパッケージで，文字コードの変換などを含む多様な関数を含んでいる．
通常のユーザの文字列操作なら，stringrで大丈夫なことが多い．
万が一，込み入った文字列操作が必要なときは，stringiの関数を探してみると良いだろう．

stringrには，

少なくとも自分の経験では，stringrだけで操作が完結することはほとんどない．
逆に，パッケージ開発をしていてstringr(やdplyr)を使わずに一日が終わることもあまりない．
つまり，stringrはかなり便利で必要不可欠なツールである．
もちろんbaseパッケージの同様の関数を使っても機能上は問題ないことが多い．
しかし，引数の指定方法に一貫性があると，コードを綺麗に書くことができる．
綺麗なコードは，汚いコードよりも書きやすく，見た目が良く，何よりもバグが入りにくい(入らないわけではない)．

## 準備



```r
install.packages("stringr")
```


```r
library(tidyverse)
```

```
## Warning: package 'tidyverse' was built under R version 4.3.1
```

```
## Warning: package 'stringr' was built under R version 4.3.1
```

```r
library(stringr)  # 本来は不要
library(fs)
```

```
## Warning: package 'fs' was built under R version 4.3.1
```


<!--
## stringrとbase
https://heavywatal.github.io/rstats/stringr.html
https://rstudio-pubs-static.s3.amazonaws.com/92478_6704b96865e449b4bad7acb71443c8bc.html

### baseパッケージ

### stringrパッケージ
-->


## stringrの主な関数

stringrでは主な関数は`str_`で始まるようになっている．
これらの一覧は次のとおりである．
ちなみに，`str_subset()`で正規表現に合致した要素だけを返している．


```r
ls("package:stringr") %>%
  stringr::str_subset("^str_")
```

```
##  [1] "str_c"             "str_conv"          "str_count"        
##  [4] "str_detect"        "str_dup"           "str_ends"         
##  [7] "str_equal"         "str_escape"        "str_extract"      
## [10] "str_extract_all"   "str_flatten"       "str_flatten_comma"
## [13] "str_glue"          "str_glue_data"     "str_interp"       
## [16] "str_length"        "str_like"          "str_locate"       
## [19] "str_locate_all"    "str_match"         "str_match_all"    
## [22] "str_order"         "str_pad"           "str_rank"         
## [25] "str_remove"        "str_remove_all"    "str_replace"      
## [28] "str_replace_all"   "str_replace_na"    "str_sort"         
## [31] "str_split"         "str_split_1"       "str_split_fixed"  
## [34] "str_split_i"       "str_squish"        "str_starts"       
## [37] "str_sub"           "str_sub_all"       "str_sub<-"        
## [40] "str_subset"        "str_to_lower"      "str_to_sentence"  
## [43] "str_to_title"      "str_to_upper"      "str_trim"         
## [46] "str_trunc"         "str_unique"        "str_view"         
## [49] "str_view_all"      "str_which"         "str_width"        
## [52] "str_wrap"
```

また，合致した以外のものを返すには，`negate = TRUE`とする．


```r
ls("package:stringr") %>%
  stringr::str_subset("^str_", negate = TRUE)
```

```
##  [1] "%>%"          "boundary"     "coll"         "fixed"        "fruit"       
##  [6] "invert_match" "regex"        "sentences"    "word"         "words"
```

このうちfruits，words，sentencesは，それぞれ果物の名前，一般的な単語，文のサンプルデータである．
`fixed()`は正規表現を使わずに，文字列を正規表現ではなくそのままの文字列として使う関数である．
これら以外のものについて知りたい場合は，ヘルプを参照して欲しい．


```r
  # stringr::str_detect()
  # stringr::str_replace_all()
  # stringr::str_c()
  # stringr::str_detect()
  # stringr::str_extract_all()
  # stringr::str_length()
  # stringr::str_split()
  # stringr::str_subset()
  # stringr::str_sub()

  # stringr::str_dup()
  # stringr::str_extract()
  # stringr::str_pad()
  # stringr::str_trunc()

  # stringr::str_replace_all()
  # stringr::str_to_lower()
```


## 活用例


```r
  # fs::dir_ls()

  # パッケージ名の一覧を検索するという活用例
  # fs::dir_ls(regexp = "Rmd")
  # install.packages("")
  # library()
  # pkg::fun()


  # stringr::fixed()
  # stringr::regex()

  # fs.Rmd
  # fs::path_dir("path")         # パスからディレクトリ名抽出   
  # fs::path_file("path")        # パスからファイル名抽出   
  # fs::path_ext("path")         # パスから拡張子抽出   
  # fs::path_ext_remove("path")  # パスから拡張子を削除   
  # path_ext_set("path", "new_ext")   # 拡張子変更   
```
