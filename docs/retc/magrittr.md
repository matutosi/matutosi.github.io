# magrritrの勧め {#magrittr}


## tidyverseとmagrittr

tidyverseは，Rでのデータ解析には欠かせないものになっている．
そこで，Rを起動時にtidyverseを読み込む人は多いだろう．
なお，tidyverseは1つのライブラリではなく，複数のライブラリからなる．


```r
library(tidyverse)
```

これらのライブラリの多く(forcats，tibble，stringr，dplyr，tidyr，purrr)で，`%>%` (パイプ)を使うことができる．
私は`%>%`がtidyverse独自のものだと勘違いをしていた．
しかし，`%>%`はもとはライブラリmagrittrの関数であり，そこからインポートされている．
そのため，tidyverseを読み込むと使うことができる．
`%>%`は，慣れるまでは何が便利なのか分からないが，慣れると欠かせなくなる．
さらに使っていると，癖なってしまって無駄にパイプを繋ぐこともある．
長過ぎるパイプは良くないのは当然であるものの，適度に使うとRでのプログラミングは非常に楽になる．

tidyverseの関数では，引数とするオブジェクトが統一されている．
具体的には，第1引数のオブジェクトがデータフレームやtibbleになっていることが多い．
そのため，パイプと相性が特に良い．


## `%>%`とその仲間

`%>%`の仲間としては，以下の関数もある．

- `%<>%`
- `%T>%`
- `%$%`

これらの関数は，tidyverseには含まれていないため，使用するにはmagrittrを読み込む必要がある．


```r
library(magrittr)
```

```
## 
## Attaching package: 'magrittr'
```

```
## The following object is masked from 'package:purrr':
## 
##     set_names
```

```
## The following object is masked from 'package:tidyr':
## 
##     extract
```




## `%<>%`

### 使い方

`%<>%`は，パイプを使って処理した内容を，最初のオブジェクトに再度代入するときに使う．
ほんの少しだけ，コードを短くできる．


```r
mpg # 燃費データ
```

```
## # A tibble: 234 x 11
##    manufacturer model      displ  year   cyl trans drv     cty   hwy fl    class
##    <chr>        <chr>      <dbl> <int> <int> <chr> <chr> <int> <int> <chr> <chr>
##  1 audi         a4           1.8  1999     4 auto~ f        18    29 p     comp~
##  2 audi         a4           1.8  1999     4 manu~ f        21    29 p     comp~
##  3 audi         a4           2    2008     4 manu~ f        20    31 p     comp~
##  4 audi         a4           2    2008     4 auto~ f        21    30 p     comp~
##  5 audi         a4           2.8  1999     6 auto~ f        16    26 p     comp~
##  6 audi         a4           2.8  1999     6 manu~ f        18    26 p     comp~
##  7 audi         a4           3.1  2008     6 auto~ f        18    27 p     comp~
##  8 audi         a4 quattro   1.8  1999     4 manu~ 4        18    26 p     comp~
##  9 audi         a4 quattro   1.8  1999     4 auto~ 4        16    25 p     comp~
## 10 audi         a4 quattro   2    2008     4 manu~ 4        20    28 p     comp~
## # ... with 224 more rows
```

```r
tmp <- mpg
tmp <-
  tmp %>%
  dplyr::filter(year==1999) %>%
  tidyr::separate(trans, into=c("trans1", "trans2", NA)) %>%
  print()
```

```
## # A tibble: 117 x 12
##    manufac~1 model displ  year   cyl trans1 trans2 drv     cty   hwy fl    class
##    <chr>     <chr> <dbl> <int> <int> <chr>  <chr>  <chr> <int> <int> <chr> <chr>
##  1 audi      a4      1.8  1999     4 auto   l5     f        18    29 p     comp~
##  2 audi      a4      1.8  1999     4 manual m5     f        21    29 p     comp~
##  3 audi      a4      2.8  1999     6 auto   l5     f        16    26 p     comp~
##  4 audi      a4      2.8  1999     6 manual m5     f        18    26 p     comp~
##  5 audi      a4 q~   1.8  1999     4 manual m5     4        18    26 p     comp~
##  6 audi      a4 q~   1.8  1999     4 auto   l5     4        16    25 p     comp~
##  7 audi      a4 q~   2.8  1999     6 auto   l5     4        15    25 p     comp~
##  8 audi      a4 q~   2.8  1999     6 manual m5     4        17    25 p     comp~
##  9 audi      a6 q~   2.8  1999     6 auto   l5     4        15    24 p     mids~
## 10 chevrolet c150~   5.7  1999     8 auto   l4     r        13    17 r     suv  
## # ... with 107 more rows, and abbreviated variable name 1: manufacturer
```

```r
tmp <- mpg
tmp %<>%
  dplyr::filter(year==1999) %>%
  tidyr::separate(trans, into=c("trans1", "trans2", NA)) %>%
  print()
```

```
## # A tibble: 117 x 12
##    manufac~1 model displ  year   cyl trans1 trans2 drv     cty   hwy fl    class
##    <chr>     <chr> <dbl> <int> <int> <chr>  <chr>  <chr> <int> <int> <chr> <chr>
##  1 audi      a4      1.8  1999     4 auto   l5     f        18    29 p     comp~
##  2 audi      a4      1.8  1999     4 manual m5     f        21    29 p     comp~
##  3 audi      a4      2.8  1999     6 auto   l5     f        16    26 p     comp~
##  4 audi      a4      2.8  1999     6 manual m5     f        18    26 p     comp~
##  5 audi      a4 q~   1.8  1999     4 manual m5     4        18    26 p     comp~
##  6 audi      a4 q~   1.8  1999     4 auto   l5     4        16    25 p     comp~
##  7 audi      a4 q~   2.8  1999     6 auto   l5     4        15    25 p     comp~
##  8 audi      a4 q~   2.8  1999     6 manual m5     4        17    25 p     comp~
##  9 audi      a6 q~   2.8  1999     6 auto   l5     4        15    24 p     mids~
## 10 chevrolet c150~   5.7  1999     8 auto   l4     r        13    17 r     suv  
## # ... with 107 more rows, and abbreviated variable name 1: manufacturer
```

### 注意点

試行錯誤でコードを書いている途中は，あまり使わないほうが良いだろう．
もとのオブジェクトが置き換わるので，処理結果が求めるものでないときに，もとに戻れないためである．


## `%T>%`

### 使い方

処理途中に分岐をして別の処理をさせたいときに使う．
ちょっとだけ処理して，変数に保存するとき
imapと組み合わせると便利かも
画像を保存するファイル名の設定とか



```r
mpg # 燃費データ
```

```
## # A tibble: 234 x 11
##    manufacturer model      displ  year   cyl trans drv     cty   hwy fl    class
##    <chr>        <chr>      <dbl> <int> <int> <chr> <chr> <int> <int> <chr> <chr>
##  1 audi         a4           1.8  1999     4 auto~ f        18    29 p     comp~
##  2 audi         a4           1.8  1999     4 manu~ f        21    29 p     comp~
##  3 audi         a4           2    2008     4 manu~ f        20    31 p     comp~
##  4 audi         a4           2    2008     4 auto~ f        21    30 p     comp~
##  5 audi         a4           2.8  1999     6 auto~ f        16    26 p     comp~
##  6 audi         a4           2.8  1999     6 manu~ f        18    26 p     comp~
##  7 audi         a4           3.1  2008     6 auto~ f        18    27 p     comp~
##  8 audi         a4 quattro   1.8  1999     4 manu~ 4        18    26 p     comp~
##  9 audi         a4 quattro   1.8  1999     4 auto~ 4        16    25 p     comp~
## 10 audi         a4 quattro   2    2008     4 manu~ 4        20    28 p     comp~
## # ... with 224 more rows
```

### 注意点

分岐途中の結果をオブジェクトに代入するときには，`<-`ではなく，`<<-`を使用する．
明示的に「.」を使う
複数処理があれば，「{}」で囲う
処理終了後に「%>%」が必要
  例のコードを示す


```r
#  mpg %T>%
#    {
#      tmp <<- dplyr::select(., ) 
#    } %>%
```

## `%$%`


### 使い方



```r
mpg %>%
  .$manufacturer
```

```
##   [1] "audi"       "audi"       "audi"       "audi"       "audi"      
##   [6] "audi"       "audi"       "audi"       "audi"       "audi"      
##  [11] "audi"       "audi"       "audi"       "audi"       "audi"      
##  [16] "audi"       "audi"       "audi"       "chevrolet"  "chevrolet" 
##  [21] "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet" 
##  [26] "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet" 
##  [31] "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet" 
##  [36] "chevrolet"  "chevrolet"  "dodge"      "dodge"      "dodge"     
##  [41] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [46] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [51] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [56] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [61] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [66] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [71] "dodge"      "dodge"      "dodge"      "dodge"      "ford"      
##  [76] "ford"       "ford"       "ford"       "ford"       "ford"      
##  [81] "ford"       "ford"       "ford"       "ford"       "ford"      
##  [86] "ford"       "ford"       "ford"       "ford"       "ford"      
##  [91] "ford"       "ford"       "ford"       "ford"       "ford"      
##  [96] "ford"       "ford"       "ford"       "ford"       "honda"     
## [101] "honda"      "honda"      "honda"      "honda"      "honda"     
## [106] "honda"      "honda"      "honda"      "hyundai"    "hyundai"   
## [111] "hyundai"    "hyundai"    "hyundai"    "hyundai"    "hyundai"   
## [116] "hyundai"    "hyundai"    "hyundai"    "hyundai"    "hyundai"   
## [121] "hyundai"    "hyundai"    "jeep"       "jeep"       "jeep"      
## [126] "jeep"       "jeep"       "jeep"       "jeep"       "jeep"      
## [131] "land rover" "land rover" "land rover" "land rover" "lincoln"   
## [136] "lincoln"    "lincoln"    "mercury"    "mercury"    "mercury"   
## [141] "mercury"    "nissan"     "nissan"     "nissan"     "nissan"    
## [146] "nissan"     "nissan"     "nissan"     "nissan"     "nissan"    
## [151] "nissan"     "nissan"     "nissan"     "nissan"     "pontiac"   
## [156] "pontiac"    "pontiac"    "pontiac"    "pontiac"    "subaru"    
## [161] "subaru"     "subaru"     "subaru"     "subaru"     "subaru"    
## [166] "subaru"     "subaru"     "subaru"     "subaru"     "subaru"    
## [171] "subaru"     "subaru"     "subaru"     "toyota"     "toyota"    
## [176] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [181] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [186] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [191] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [196] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [201] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [206] "toyota"     "toyota"     "volkswagen" "volkswagen" "volkswagen"
## [211] "volkswagen" "volkswagen" "volkswagen" "volkswagen" "volkswagen"
## [216] "volkswagen" "volkswagen" "volkswagen" "volkswagen" "volkswagen"
## [221] "volkswagen" "volkswagen" "volkswagen" "volkswagen" "volkswagen"
## [226] "volkswagen" "volkswagen" "volkswagen" "volkswagen" "volkswagen"
## [231] "volkswagen" "volkswagen" "volkswagen" "volkswagen"
```

```r
mpg %$%
  manufacturer
```

```
##   [1] "audi"       "audi"       "audi"       "audi"       "audi"      
##   [6] "audi"       "audi"       "audi"       "audi"       "audi"      
##  [11] "audi"       "audi"       "audi"       "audi"       "audi"      
##  [16] "audi"       "audi"       "audi"       "chevrolet"  "chevrolet" 
##  [21] "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet" 
##  [26] "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet" 
##  [31] "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet"  "chevrolet" 
##  [36] "chevrolet"  "chevrolet"  "dodge"      "dodge"      "dodge"     
##  [41] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [46] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [51] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [56] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [61] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [66] "dodge"      "dodge"      "dodge"      "dodge"      "dodge"     
##  [71] "dodge"      "dodge"      "dodge"      "dodge"      "ford"      
##  [76] "ford"       "ford"       "ford"       "ford"       "ford"      
##  [81] "ford"       "ford"       "ford"       "ford"       "ford"      
##  [86] "ford"       "ford"       "ford"       "ford"       "ford"      
##  [91] "ford"       "ford"       "ford"       "ford"       "ford"      
##  [96] "ford"       "ford"       "ford"       "ford"       "honda"     
## [101] "honda"      "honda"      "honda"      "honda"      "honda"     
## [106] "honda"      "honda"      "honda"      "hyundai"    "hyundai"   
## [111] "hyundai"    "hyundai"    "hyundai"    "hyundai"    "hyundai"   
## [116] "hyundai"    "hyundai"    "hyundai"    "hyundai"    "hyundai"   
## [121] "hyundai"    "hyundai"    "jeep"       "jeep"       "jeep"      
## [126] "jeep"       "jeep"       "jeep"       "jeep"       "jeep"      
## [131] "land rover" "land rover" "land rover" "land rover" "lincoln"   
## [136] "lincoln"    "lincoln"    "mercury"    "mercury"    "mercury"   
## [141] "mercury"    "nissan"     "nissan"     "nissan"     "nissan"    
## [146] "nissan"     "nissan"     "nissan"     "nissan"     "nissan"    
## [151] "nissan"     "nissan"     "nissan"     "nissan"     "pontiac"   
## [156] "pontiac"    "pontiac"    "pontiac"    "pontiac"    "subaru"    
## [161] "subaru"     "subaru"     "subaru"     "subaru"     "subaru"    
## [166] "subaru"     "subaru"     "subaru"     "subaru"     "subaru"    
## [171] "subaru"     "subaru"     "subaru"     "toyota"     "toyota"    
## [176] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [181] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [186] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [191] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [196] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [201] "toyota"     "toyota"     "toyota"     "toyota"     "toyota"    
## [206] "toyota"     "toyota"     "volkswagen" "volkswagen" "volkswagen"
## [211] "volkswagen" "volkswagen" "volkswagen" "volkswagen" "volkswagen"
## [216] "volkswagen" "volkswagen" "volkswagen" "volkswagen" "volkswagen"
## [221] "volkswagen" "volkswagen" "volkswagen" "volkswagen" "volkswagen"
## [226] "volkswagen" "volkswagen" "volkswagen" "volkswagen" "volkswagen"
## [231] "volkswagen" "volkswagen" "volkswagen" "volkswagen"
```


### 注意点



