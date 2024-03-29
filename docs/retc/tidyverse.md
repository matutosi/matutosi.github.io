# tidyverseを使う {#tidyverse}

## 準備


```r
install.packages("tidyverse")
```


```r
library(tidyverse)
```

## tidyverseとは

tidyverseは単一のパッケージではなく，9つのパッケージを含むパッケージ群である．

- tibble：データフレームの拡張型
- tidyr：整然(tidy)データのツール
- readr：ファイル読み込み・保存
- dplyr：データフレーム操作
- stringr：文字列
- purrr：繰り返し処理
- ggplot2：作図
- lubridate：日付・時間データ
- forcats：ファクター(因子)操作

このうち，この文書ではファクター(因子)をほとんど扱っていないため，forcatsについては説明しない．
ggplot2とlubridateはそれぞれ第?章と第?章で説明し，その他はこの章で説明する．
<!--
以下では全体に関係するものから説明するため，上記の順序とは異なる(上記はアルファベット順)．
-->

## tibbleでデータフレームを使いやすくする

### データフレームとtibble

tidyvrseでは，データフレーム(data.frame)をさらに拡張して使いやすくした tbl_dfやtblという形式を基本的に使う．
ふつうに使っている限りはそれほど大きな違いはない．
違いないというよりも，オブジェクト名そのものや`print()`で内容を表示させたときに見やすいという利点がある．
例えば，各列のデータのタイプが表示される．
int(整数)やchr(文字列)のように省略して表示されるので，若干の慣れが必要である．

### tibbleの気の利いた表示

画面の幅に表示を合わせてくれるのも良い点である．
例えば，次のように画面の幅に収まりきらない場合でも，データフレームではダラダラと表示を続ける．
一方，tibbleでは画面の幅に入る範囲に「良い感じ」にまとめて表示してくれる．
それでも表示できなかった場合は，最後に列名とその形式を出力する．


```r
n <- 3
ncol <- 10
cnames <- letters[seq(ncol)]
df <- 
  matrix(rnorm(n * ncol), ncol = ncol, dimnames = list(seq(n), cnames)) %>%
  as.data.frame() %>%
  print()
```

```
##             a          b          c          d          e           f
## 1  0.05047793 -0.4122720  0.8449934 -0.3800774 0.52684921 -0.08180086
## 2 -1.57671424 -0.4963707 -0.4647805  0.7031646 1.67827336 -2.05937539
## 3 -1.98174463 -0.9014525 -0.4401037 -0.2053516 0.06265981 -0.45891475
##            g          h          i          j
## 1 -0.4346422  0.9915712 -0.5168364 -0.5948544
## 2  0.5179188 -1.3943131  0.1598155 -2.3425823
## 3  2.3745261 -0.2587198  0.7698247  1.4141675
```

```r
tibble::as_tibble(df)
```

```
## # A tibble: 3 × 10
##         a      b      c      d      e       f      g      h      i      j
##     <dbl>  <dbl>  <dbl>  <dbl>  <dbl>   <dbl>  <dbl>  <dbl>  <dbl>  <dbl>
## 1  0.0505 -0.412  0.845 -0.380 0.527  -0.0818 -0.435  0.992 -0.517 -0.595
## 2 -1.58   -0.496 -0.465  0.703 1.68   -2.06    0.518 -1.39   0.160 -2.34 
## 3 -1.98   -0.901 -0.440 -0.205 0.0627 -0.459   2.37  -0.259  0.770  1.41
```

変なたとえかもしれないが，データフレームは「言われたことをそのままやりました」という何も考えずに与えられたことをするような感じで，tibbleは「見やすく修正しておきました」という非常に気の利いた対応をする感じである．
さらに，tibbleのデフォルトでは行数が多いとき最初の10行だけ表示する．
データフレームではすべてのデータを表示させるので，巨大なデータのときに，画面がやたらスクロールして困った経験があるかもしれない．
tibbleではそれがない．
なお，行数と列数は最初に書かれている．


```r
n <- 21
ncol <- 3
cnames <- letters[seq(ncol)]
df <- 
  matrix(rnorm(n * ncol), ncol = ncol, dimnames = list(seq(n), cnames)) %>%
  as.data.frame() %>%
  print()
```

```
##              a           b           c
## 1  -0.76980119 -0.32779116 -0.39115159
## 2  -0.68713821  1.07981436 -0.06558529
## 3  -1.34263296 -0.10665378 -0.52196010
## 4  -0.55809117  0.96156298 -1.06253946
## 5  -0.89379107  0.03222971 -0.61370235
## 6  -0.13837206  1.22922458  1.09249184
## 7  -0.64680709  0.51069300  2.00074006
## 8  -0.05953973  0.55406772  0.35109461
## 9   0.35284522  0.95581925 -0.22703607
## 10  0.34779071 -1.84613374 -0.89649797
## 11  0.29172566  0.45297401  0.11781765
## 12  0.51146176 -1.19043291  0.09507999
## 13 -0.49676792  0.10875977  0.73562734
## 14 -0.78740836  0.29060645  1.65599697
## 15 -1.13576210  1.55615017 -0.10184325
## 16 -0.94793102 -0.91783354 -0.05732533
## 17 -0.37432744 -0.93327290  0.67199910
## 18 -0.84299491 -0.60898282  3.13037597
## 19  2.78964718 -0.37945765  0.14102261
## 20  0.89300763  1.64992507  0.59957391
## 21 -0.04355752 -0.26729178  1.13507072
```

```r
tibble::as_tibble(df)
```

```
## # A tibble: 21 × 3
##          a       b       c
##      <dbl>   <dbl>   <dbl>
##  1 -0.770  -0.328  -0.391 
##  2 -0.687   1.08   -0.0656
##  3 -1.34   -0.107  -0.522 
##  4 -0.558   0.962  -1.06  
##  5 -0.894   0.0322 -0.614 
##  6 -0.138   1.23    1.09  
##  7 -0.647   0.511   2.00  
##  8 -0.0595  0.554   0.351 
##  9  0.353   0.956  -0.227 
## 10  0.348  -1.85   -0.896 
## # ℹ 11 more rows
```

表示したい行数を指定するには，引数`n`で指定する．
以下のコードのうち，3つ目を実行すると全行が表示されるので以下では表示を省略している．


```r
mpg                  # 通常表示
print(mpg, n = 30)   # 30行を表示
print(n = nrow(mpg)) # 全行を表示
```

なお，デフォルトの表示行数を変更するには，`options()`で設定する．


```r
tibble_opt <- list(
  "tibble.print_max" = 10, # 省略しない最大行数
  "tibble.print_min" = 5   # 省略時に表示する行数
)
options(tibble_opt)
```


### tibbleへの変換，tibbleの生成

すでにデータフレームがある場合は，`as_tibble()`でtibbleへの変換ができる．


```r
head(mtcars)
```

```
##                    mpg cyl disp  hp drat    wt  qsec vs am gear carb
## Mazda RX4         21.0   6  160 110 3.90 2.620 16.46  0  1    4    4
## Mazda RX4 Wag     21.0   6  160 110 3.90 2.875 17.02  0  1    4    4
## Datsun 710        22.8   4  108  93 3.85 2.320 18.61  1  1    4    1
## Hornet 4 Drive    21.4   6  258 110 3.08 3.215 19.44  1  0    3    1
## Hornet Sportabout 18.7   8  360 175 3.15 3.440 17.02  0  0    3    2
## Valiant           18.1   6  225 105 2.76 3.460 20.22  1  0    3    1
```

```r
tibble::as_tibble(mtcars)
```

```
## # A tibble: 32 × 11
##      mpg   cyl  disp    hp  drat    wt  qsec    vs    am  gear  carb
##    <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl> <dbl>
##  1  21       6  160    110  3.9   2.62  16.5     0     1     4     4
##  2  21       6  160    110  3.9   2.88  17.0     0     1     4     4
##  3  22.8     4  108     93  3.85  2.32  18.6     1     1     4     1
##  4  21.4     6  258    110  3.08  3.22  19.4     1     0     3     1
##  5  18.7     8  360    175  3.15  3.44  17.0     0     0     3     2
##  6  18.1     6  225    105  2.76  3.46  20.2     1     0     3     1
##  7  14.3     8  360    245  3.21  3.57  15.8     0     0     3     4
##  8  24.4     4  147.    62  3.69  3.19  20       1     0     4     2
##  9  22.8     4  141.    95  3.92  3.15  22.9     1     0     4     2
## 10  19.2     6  168.   123  3.92  3.44  18.3     1     0     4     4
## # ℹ 22 more rows
```

新たにtibbleを生成するには，データフレームの場合と同様である．


```r
n <- 10
data.frame(x = runif(n), y = rnorm(n))
```

```
##               x          y
## 1  7.698637e-01  1.9582804
## 2  9.384554e-01 -1.1457365
## 3  8.288678e-05 -0.6623765
## 4  6.208587e-01  1.1200691
## 5  8.028556e-01  1.2116756
## 6  5.429309e-01 -0.4936715
## 7  7.282753e-01 -1.3602386
## 8  3.953536e-01  0.0657342
## 9  9.750312e-01  0.7181022
## 10 9.859607e-01 -0.1578622
```

```r
tibble::tibble(x = runif(n), y = rnorm(n))
```

```
## # A tibble: 10 × 2
##         x       y
##     <dbl>   <dbl>
##  1 0.753  -0.985 
##  2 0.310   0.561 
##  3 0.873   0.0366
##  4 0.692   0.423 
##  5 0.0606  0.195 
##  6 0.686   1.48  
##  7 0.868  -0.0554
##  8 0.494   0.237 
##  9 0.300  -0.622 
## 10 0.461  -0.190
```

## tidyrでデータを整形する

tidyverseのtidyとは，整然としたという意味である．
データフレームやtibbleなっていればtidyかといえば，そうとは限らない．
エクセルなどのスプレッド形式にデータが保存されていてもtidyではないのと同様である．

tidyデータとは，次の4つを満たすもので，データベースの第3正規と同様のものである．

1 1つの変数が1つの列を構成する   
2 1つの観測が1つの行を構成する  
3 1つのタイプの観測群が1つの表を構成する   
4 1つの値が1つのセルを構成する   

例えば，次のデータ`household`は非整然(messy，tidyの対義語)データの典型的な例である．


```r
relig_income
```

```
## # A tibble: 18 × 11
##    religion `<$10k` `$10-20k` `$20-30k` `$30-40k` `$40-50k` `$50-75k` `$75-100k`
##    <chr>      <dbl>     <dbl>     <dbl>     <dbl>     <dbl>     <dbl>      <dbl>
##  1 Agnostic      27        34        60        81        76       137        122
##  2 Atheist       12        27        37        52        35        70         73
##  3 Buddhist      27        21        30        34        33        58         62
##  4 Catholic     418       617       732       670       638      1116        949
##  5 Don’t …       15        14        15        11        10        35         21
##  6 Evangel…     575       869      1064       982       881      1486        949
##  7 Hindu          1         9         7         9        11        34         47
##  8 Histori…     228       244       236       238       197       223        131
##  9 Jehovah…      20        27        24        24        21        30         15
## 10 Jewish        19        19        25        25        30        95         69
## 11 Mainlin…     289       495       619       655       651      1107        939
## 12 Mormon        29        40        48        51        56       112         85
## 13 Muslim         6         7         9        10         9        23         16
## 14 Orthodox      13        17        23        32        32        47         38
## 15 Other C…       9         7        11        13        13        14         18
## 16 Other F…      20        33        40        46        49        63         46
## 17 Other W…       5         2         3         4         2         7          3
## 18 Unaffil…     217       299       374       365       341       528        407
## # ℹ 3 more variables: `$100-150k` <dbl>, `>150k` <dbl>,
## #   `Don't know/refused` <dbl>
```

宗教と所得についてのデータである．
1列目の宗教は問題ないが，所得という変数が1つの列ではなく2列目以降の複数の列に広がっている．
これを整理するには，`pivot_longer()`を使う．

1つ目の引数にはデータフレームを指定する．
ここでは`relig_income`だが，パイプが用いられているので省略されている
`cols`には整形する列を指定する．
ここでは，`!religion`で`religion`以外を指定している．
`names_to`には列名をもとに作る新たな変数(列)名を，
`values_to`にはデータの値をもとに作る新たな変数(列)名を文字列で指定する．



```r
relig_income %>% 
  tidyr::pivot_longer(
    cols = !religion, 
    names_to = "income", 
    values_to = "count"
  )
```

```
## # A tibble: 180 × 3
##    religion income             count
##    <chr>    <chr>              <dbl>
##  1 Agnostic <$10k                 27
##  2 Agnostic $10-20k               34
##  3 Agnostic $20-30k               60
##  4 Agnostic $30-40k               81
##  5 Agnostic $40-50k               76
##  6 Agnostic $50-75k              137
##  7 Agnostic $75-100k             122
##  8 Agnostic $100-150k            109
##  9 Agnostic >150k                 84
## 10 Agnostic Don't know/refused    96
## # ℹ 170 more rows
```

`pivot_longer()`で出力されたデータフレームは，それぞれの変数が1列に，それぞれの観測が1行になった．
3つ目と4つ目の条件にもがっていしており，これで，tidyデータの条件を満たすことができた．
基本的にはプログラミングの際にはtidyな状態にしておくのが便利である．

ただし，入手データがtidyではないことはよくある．
また，関数によってはtidyではないオブジェクトを入力する必要やプログラム途中でtidyではない方が都合が良いこともある．
tidyではないものからtidyなものへの変換，あるいはその逆をするのに便利な関数がtidyrには多くある．
次のコードでパッケージ内の関数一覧が取得できる．


```r
ls("packages:tidyr")
```

以下も参考にしてほしい．

https://tidyr.tidyverse.org/


<!--
`family`，`dob_child1`，`dob_child2`，`name_child1`，`name_child2`という5つの列がある．
家族番号，1人目と2人目の子どもの誕生日，1人目と2人目の子どもの名前である．

```r
household %>% 
  pivot_longer(
    cols = !family, 
    names_to = c(".value", "child"), 
    names_sep = "_", 
    values_drop_na = TRUE
  )
```

```
## # A tibble: 9 × 4
##   family child  dob        name  
##    <int> <chr>  <date>     <chr> 
## 1      1 child1 1998-11-26 Susan 
## 2      1 child2 2000-01-29 Jose  
## 3      2 child1 1996-06-22 Mark  
## 4      3 child1 2002-07-11 Sam   
## 5      3 child2 2004-04-05 Seth  
## 6      4 child1 2004-10-10 Craig 
## 7      4 child2 2009-08-27 Khai  
## 8      5 child1 2000-12-05 Parker
## 9      5 child2 2005-02-28 Gracie
```
-->

<!--
なお，手前味噌で申し訳ないが，ピボットテーブルをより簡単に作成するためのパッケージpivoteaを作成したので，興味があれば使ってみてほしい．
-->

https://cran.r-project.org/web/packages/pivotea/

## readrでファイルの保存と読み込み

tidyな状態に整理したデータをファイルとして保存や読み込みをするには，readrの関数を使うのが良い．
baseの`write.table()`や`read.table()`よりも使いやすく，読み込んだデータをtibble形式にしてくれるのが良い．

保存するときは，`write_csv`(カンマ区切り)や`write_tsv`(タブ区切り)を使う．


```r
readr::write_csv(mpg, file = "file_path")
readr::write_tsv(mpg, file = "file_path")
```

読み込むときは，`read_csv`(カンマ区切り)や`read_tsv`(タブ区切り)を使う．
各列のデータ形式を指定したい場合は，`col_types`を使う．


```r
readr::read_csv("file_path")
readr::read_tsv("file_path")
```

ここでは，第?章で保存したデータを読み込む．

<!--
wd <- "D:/matu/work/ToDo/retc"
setwd(wd)
-->

```r
pkgs <- readr::read_tsv("pkgs.txt", show_col_types = FALSE)
pkgs
```

```
## # A tibble: 19,530 × 2
##    pkg           description                                                    
##    <chr>         <chr>                                                          
##  1 A3            Accurate, Adaptable, and Accessible Error Metrics for Predicti…
##  2 AalenJohansen Conditional Aalen-Johansen Estimation                          
##  3 AATtools      Reliability and Scoring Routines for the Approach-Avoidance Ta…
##  4 ABACUS        Apps Based Activities for Communicating and Understanding Stat…
##  5 abbreviate    Readable String Abbreviation                                   
##  6 abbyyR        Access to Abbyy Optical Character Recognition (OCR) API        
##  7 abc           Tools for Approximate Bayesian Computation (ABC)               
##  8 abc.data      Data Only: Tools for Approximate Bayesian Computation (ABC)    
##  9 ABC.RAP       Array Based CpG Region Analysis Pipeline                       
## 10 ABCanalysis   Computed ABC Analysis                                          
## # ℹ 19,520 more rows
```

`col_types`でタイプを指定していないと色々と表示されて面倒なので，`show_col_types = FALSE`で表示を抑制している．
他にも読み込み時のオプションがあるので，`?read_tsv`で確認してほしい．

なお，エクセルのファイルを読み込むパッケージには，readxlがある．

## dplyrでデータフレームを操作する

dplyrはデータフレームを操作するためのパッケージである．
列の追加や選択，行の抽出や並べ替え，グループ化，集計などができる．
なお，dplyrの関数名の多くはSQLを参考にしていると思われるので，SQLを使ったことがあればコードの内容を理解しやすいだろう．

<!--
まずコードの例を示してから，その後で関数の説明をする．
-->

### CRANのパッケージを分類する

ここでは，読み込んだデータフレーム`pkgs`のCRANに登録されているパッケージを分類する．
`mutate()`を使って，`description`に特定の文字列が含まれるかを判定して，その結果を真偽値の新しい列として追加する．
まずは`str_detect()`で`description`の列に"ocr"を含むかどうかをTRUEまたはFALSEで返す．
その結果をocrという列として新たに追加する．


```r
pkgs %>%
  dplyr::mutate(ocr = stringr::str_detect(description, "ocr"))
```

```
## # A tibble: 19,530 × 3
##    pkg           description                                               ocr  
##    <chr>         <chr>                                                     <lgl>
##  1 A3            Accurate, Adaptable, and Accessible Error Metrics for Pr… FALSE
##  2 AalenJohansen Conditional Aalen-Johansen Estimation                     FALSE
##  3 AATtools      Reliability and Scoring Routines for the Approach-Avoida… FALSE
##  4 ABACUS        Apps Based Activities for Communicating and Understandin… FALSE
##  5 abbreviate    Readable String Abbreviation                              FALSE
##  6 abbyyR        Access to Abbyy Optical Character Recognition (OCR) API   FALSE
##  7 abc           Tools for Approximate Bayesian Computation (ABC)          FALSE
##  8 abc.data      Data Only: Tools for Approximate Bayesian Computation (A… FALSE
##  9 ABC.RAP       Array Based CpG Region Analysis Pipeline                  FALSE
## 10 ABCanalysis   Computed ABC Analysis                                     FALSE
## # ℹ 19,520 more rows
```

`mutate()`での新しい列名は，「"」を使わずに指定する．
対話的に使っているときには，このように列名を直接入力するのが楽である．
なお，「"」を使わずに列名を変数名のように指定(評価)する方法をNSE(Non Standard Evaluation，非標準評価)という．
ただし，プログラミングの途中で使っているときには列名が一義的に決まらず，入力したデータの列名を使いたいことがある．
そのような時には，all_of("colnames")のように文字列として列名を指定したほうが良いことがある．

また，`mutate()`に似た関数として`transmute()`がある．
`transmute()`は，関数内で指定した列以外は削除する点が`mutate()`とは異なる．

上のコードでは，1つの文字列に対して列を追加した．
ここでは複数の文字列に対して同じことをするために，関数を作成する．
`mutate()`の内部がややトリッキーな事になっているが，実行内容は上と同じである．
意味としては，`str_detect()`で出力した真偽値を`kwd`の文字列の中身を列名として新たな列を追加している．
関数内では，新しい列名をNSEではなく，文字列として標準評価として用いるために，列名の文字列を`{{}}`で囲っている．
同様の理由で`=`ではなく`:=`というrlangパッケージの関数を使っている．
また，`str_detect()`内で`.data[[col]]`としている．
これは，文字列で列を選択するときに使用する手法である．


```r
  # キーワードを列名として追加する関数，合致するときはTRUE
add_kwd <- function(df, col, kwd){
  pattern <- stringr::regex(kwd, ignore_case = TRUE)
  df %>%
    dplyr::mutate(`:=`({{kwd}}, stringr::str_detect(.data[[col]], pattern)))
}
  # キーワードの一覧
kwds <- 
  c("database", "excel", "file", "ggplot", "image|magick", "keyboards|mouse", 
    "ocr", "office", "pdf", "python", "scrape|scraping|selenium", "shell")
  # キーワード列の追加
for(i in seq_along(kwds)){
  pkgs <- add_kwd(pkgs, "description", kwds[i])
}
pkgs
```

```
## # A tibble: 19,530 × 14
##    pkg           description          database excel file  ggplot `image|magick`
##    <chr>         <chr>                <lgl>    <lgl> <lgl> <lgl>  <lgl>         
##  1 A3            Accurate, Adaptable… FALSE    FALSE FALSE FALSE  FALSE         
##  2 AalenJohansen Conditional Aalen-J… FALSE    FALSE FALSE FALSE  FALSE         
##  3 AATtools      Reliability and Sco… FALSE    FALSE FALSE FALSE  FALSE         
##  4 ABACUS        Apps Based Activiti… FALSE    FALSE FALSE FALSE  FALSE         
##  5 abbreviate    Readable String Abb… FALSE    FALSE FALSE FALSE  FALSE         
##  6 abbyyR        Access to Abbyy Opt… FALSE    FALSE FALSE FALSE  FALSE         
##  7 abc           Tools for Approxima… FALSE    FALSE FALSE FALSE  FALSE         
##  8 abc.data      Data Only: Tools fo… FALSE    FALSE FALSE FALSE  FALSE         
##  9 ABC.RAP       Array Based CpG Reg… FALSE    FALSE FALSE FALSE  FALSE         
## 10 ABCanalysis   Computed ABC Analys… FALSE    FALSE FALSE FALSE  FALSE         
## # ℹ 19,520 more rows
## # ℹ 7 more variables: `keyboards|mouse` <lgl>, ocr <lgl>, office <lgl>,
## #   pdf <lgl>, python <lgl>, `scrape|scraping|selenium` <lgl>, shell <lgl>
```

列がたくさんできたので，そのうちのいくつかを選択および抽出してみよう．

データフレームの特定の列を選択するには，`select()`を使う．
`select()`でもNSEが使えるので，列名をそのまま入力する．
特定の列を除きたいときは，`-`あるいは`!`を使う．
なお，文字列で列を指定するには，`all_of()`と`any_of()`を使うことができる．
さらに，`starts_with()`や`ends_with()`，`contains()`などもある．

`filter()`は，データフレームから条件に合致した行を抽出する．
最も単純な抽出方法は`ocr == TRUE`のように真偽値(logical，TRUE か FALSE)として判定されるものであれば，どのようなものでも構わない．
次のコードの場合は，そもそも`ocr`が真偽値なので，`ocr == TRUE`とせずに`ocr`としても同じ結果を得られる．


```r
pkgs %>%
  dplyr::select(pkg, description, ocr) %>%
  dplyr::filter(ocr == TRUE)
```

```
## # A tibble: 10 × 3
##    pkg                description                                          ocr  
##    <chr>              <chr>                                                <lgl>
##  1 abbyyR             "Access to Abbyy Optical Character Recognition (OCR… TRUE 
##  2 coalitions         "Bayesian \"\"Now-Cast\"\" Estimation of Event Prob… TRUE 
##  3 elastes            "Elastic Full Procrustes Means for Sparse and Irreg… TRUE 
##  4 googleCloudVisionR "Access to the 'Google Cloud Vision' API for Image … TRUE 
##  5 paco               "Procrustes Application to Cophylogenetic Analysis"  TRUE 
##  6 pcv                "Procrustes Cross-Validation"                        TRUE 
##  7 ProcMod            "Informative Procrustean Matrix Correlation"         TRUE 
##  8 RSocrata           "Download or Upload 'Socrata' Data Sets"             TRUE 
##  9 soql               "Helps Make Socrata Open Data API Calls"             TRUE 
## 10 tesseract          "Open Source OCR Engine"                             TRUE
```

```r
dplyr::select(pkgs, -description) # dplyr::select(pkgs, !description)も同じ
```

```
## # A tibble: 19,530 × 13
##    pkg        database excel file  ggplot `image|magick` `keyboards|mouse` ocr  
##    <chr>      <lgl>    <lgl> <lgl> <lgl>  <lgl>          <lgl>             <lgl>
##  1 A3         FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  2 AalenJoha… FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  3 AATtools   FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  4 ABACUS     FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  5 abbreviate FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  6 abbyyR     FALSE    FALSE FALSE FALSE  FALSE          FALSE             TRUE 
##  7 abc        FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  8 abc.data   FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  9 ABC.RAP    FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
## 10 ABCanalys… FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
## # ℹ 19,520 more rows
## # ℹ 5 more variables: office <lgl>, pdf <lgl>, python <lgl>,
## #   `scrape|scraping|selenium` <lgl>, shell <lgl>
```

お気づきかもしれないがpkgsはtidyではないので，ここで整形しておく．


```r
pkgs <- 
  tidyr::pivot_longer(pkgs, 
    cols = -c(pkg, description), names_to = "kwd", values_to = "val") %>%
    dplyr::filter(val) %>%
    print()
```

```
## # A tibble: 958 × 4
##    pkg              description                                      kwd   val  
##    <chr>            <chr>                                            <chr> <lgl>
##  1 abbyyR           Access to Abbyy Optical Character Recognition (… ocr   TRUE 
##  2 abjData          Databases Used Routinely by the Brazilian Jurim… data… TRUE 
##  3 ABPS             The Abnormal Blood Profile Score to Detect Bloo… file  TRUE 
##  4 ace2fastq        ACE File to FASTQ Converter                      file  TRUE 
##  5 AcousticNDLCodeR Coding Sound Files for Use with NDL              file  TRUE 
##  6 activPAL         Advanced Processing and Chart Generation from a… file  TRUE 
##  7 ADAPTS           Automated Deconvolution Augmentation of Profile… file  TRUE 
##  8 add2ggplot       Add to 'ggplot2'                                 ggpl… TRUE 
##  9 adepro           A 'shiny' Application for the (Audio-)Visualiza… file  TRUE 
## 10 adfExplorer      Import from and Export to Amiga Disk Files       file  TRUE 
## # ℹ 948 more rows
```

tidyになったデータフレームを集計する．
`group_by()`は，指定した列のカテゴリーに従って，グループ化する．
ここでは，`kwd`の文字列でグループ化している．
`print()`で表示させると`Groups:   kwd [12]`となっており，`kwd`によって12のグループになっていることがわかる．
なお，グループ化を解除するには，`ungroup()`を用いる．

その後，`summarise()`でグループごとの集計ができる．
`n()`でグループごとの行数を計算する．
なお，`tally()`は`summarise(n = n())`のショートカットである．

`arrange()`は，指定した列のデータの順序に従って並べ替えをする．
何も指定しなければ昇順，`desc()`で列名を指定すれば降順で並べ替えができる．


```r
pkgs %>%
  dplyr::filter(val) %>%
  dplyr::group_by(kwd) %>%
  print() %>%
  dplyr::summarise(n = n()) %>% # tally()も同じ
  print() %>%
  dplyr::arrange(desc(n))
```

```
## # A tibble: 958 × 4
## # Groups:   kwd [12]
##    pkg              description                                      kwd   val  
##    <chr>            <chr>                                            <chr> <lgl>
##  1 abbyyR           Access to Abbyy Optical Character Recognition (… ocr   TRUE 
##  2 abjData          Databases Used Routinely by the Brazilian Jurim… data… TRUE 
##  3 ABPS             The Abnormal Blood Profile Score to Detect Bloo… file  TRUE 
##  4 ace2fastq        ACE File to FASTQ Converter                      file  TRUE 
##  5 AcousticNDLCodeR Coding Sound Files for Use with NDL              file  TRUE 
##  6 activPAL         Advanced Processing and Chart Generation from a… file  TRUE 
##  7 ADAPTS           Automated Deconvolution Augmentation of Profile… file  TRUE 
##  8 add2ggplot       Add to 'ggplot2'                                 ggpl… TRUE 
##  9 adepro           A 'shiny' Application for the (Audio-)Visualiza… file  TRUE 
## 10 adfExplorer      Import from and Export to Amiga Disk Files       file  TRUE 
## # ℹ 948 more rows
## # A tibble: 12 × 2
##    kwd                          n
##    <chr>                    <int>
##  1 database                   155
##  2 excel                       25
##  3 file                       364
##  4 ggplot                     165
##  5 image|magick               153
##  6 keyboards|mouse              6
##  7 ocr                         10
##  8 office                      19
##  9 pdf                         24
## 10 python                      18
## 11 scrape|scraping|selenium    15
## 12 shell                        4
```

```
## # A tibble: 12 × 2
##    kwd                          n
##    <chr>                    <int>
##  1 file                       364
##  2 ggplot                     165
##  3 database                   155
##  4 image|magick               153
##  5 excel                       25
##  6 pdf                         24
##  7 office                      19
##  8 python                      18
##  9 scrape|scraping|selenium    15
## 10 ocr                         10
## 11 keyboards|mouse              6
## 12 shell                        4
```

ここでは紹介しなかったが他の有用な関数として，2つのデータフレームを列の内容に合わせて結合(マージ)する`left_join()`がある．
これににた関数として，右側の引数(つまり第2引数)をもとにして結合する`right_join()`，全結合する`full_join()`，マッチしなかった行を返す`anti_join()`などがある．
詳しい使い方は，ヘルプを参照してほしい．

また，重複行を除去する`distinct()`もよく使う関数である．

## stringrで文字列操作 {#stringr}

stringrはstringiパッケージのラッパーである．
stringiは文字列操作のパッケージで，文字コードの変換などを含む多様な関数を含んでいる．
通常のユーザの文字列操作なら，stringrで大丈夫なことが多い．
万が一，込み入った文字列操作が必要なときは，stringiの関数を探してみると良いだろう．

少なくとも自分の経験では，stringrだけで操作が完結することはほとんどない．
逆に，パッケージ開発をしていてstringr(やdplyr)を使わずに一日が終わることもあまりない．
つまり，stringrはかなり便利で必要不可欠なツールである．
もちろんbaseパッケージの同様の関数を使っても機能上は問題ないことが多い．
しかし，引数の指定方法に一貫性があると，コードを綺麗に書くことができる．
綺麗なコードは，汚いコードよりも書きやすく，見た目が良く，何よりもバグが入りにくい(入らないわけではない)．


<!--
  ## stringrとbase
https://heavywatal.github.io/rstats/stringr.html
https://rstudio-pubs-static.s3.amazonaws.com/92478_6704b96865e449b4bad7acb71443c8bc.html

### baseパッケージ

### stringrパッケージ
-->

### stringrの主な関数

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

このうちfruit，words，sentencesは，それぞれ果物の名前，一般的な単語，文のサンプルデータである．


```r
head(fruit)
```

```
## [1] "apple"       "apricot"     "avocado"     "banana"      "bell pepper"
## [6] "bilberry"
```

```r
head(words)
```

```
## [1] "a"        "able"     "about"    "absolute" "accept"   "account"
```

```r
head(sentences)
```

```
## [1] "The birch canoe slid on the smooth planks." 
## [2] "Glue the sheet to the dark blue background."
## [3] "It's easy to tell the depth of a well."     
## [4] "These days a chicken leg is a rare dish."   
## [5] "Rice is often served in round bowls."       
## [6] "The juice of lemons makes fine punch."
```

`fixed()`は正規表現を使わずに，文字列を正規表現ではなくそのままの文字列として使う関数である．
これら以外のものについて知りたい場合は，ヘルプを参照して欲しい．

`str_c()`は文字列を結合する．


```r
stringr::str_c("eat ", fruit[1:3])
```

```
## [1] "eat apple"   "eat apricot" "eat avocado"
```

`str_detect()`は文字列の中に特定のパターンが含まれるかを検索して，`TRUE`あるいは`FALSE`を返す．



```r
stringr::str_detect(head(fruit), "ap")
```

```
## [1]  TRUE  TRUE FALSE FALSE FALSE FALSE
```

```r
stringr::str_detect(head(fruit), "a")
```

```
## [1]  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

パターンには正規表現を使うことができる．
正規表現とは，抽象的に文字列を指定する方法である．
例えば，「"a"あるいは"c"が含まれる」文字列を正規表現を使わずに検索するには以下のように`|`で論理和を求めることになる．


```r
stringr::str_detect(head(fruit), "a") | stringr::str_detect(head(fruit), "c")
```

```
## [1]  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

これは重複部分が非常に多いので，非効率である．
そこで正規表現を使って，「"a"あるいは"c"」を表現する．
方法はいくつかあるが，`[]`で囲むとその中の文字列のいずれかとのパターンになる．
論理和と似た表現だが，`|`で繋いでも結果としては同じになる．


```r
stringr::str_detect(head(fruit), "[ac]")
```

```
## [1]  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

```r
stringr::str_detect(head(fruit), "a|c")
```

```
## [1]  TRUE  TRUE  TRUE  TRUE FALSE FALSE
```

行頭や行末を示す`^`や`$`，任意の文字`.`，文字列の0回以上や1回以上のの繰り返しの`*`や`+`などもある．


```r
stringr::str_detect(head(fruit), "^a")
```

```
## [1]  TRUE  TRUE  TRUE FALSE FALSE FALSE
```

```r
stringr::str_detect(head(fruit), "a$")
```

```
## [1] FALSE FALSE FALSE  TRUE FALSE FALSE
```

```r
stringr::str_detect(head(fruit), "a.*a")
```

```
## [1] FALSE FALSE  TRUE  TRUE FALSE FALSE
```

正規表現には他にも色々とあって，使えると非常に便利である．
もちろん，`str_detect()`以外のstringrの関数でも正規表現が使える．

`str_replace()`と`str_replace_all()`は文字列の置換を行う．
`str_replace()`は，検索で見つかった文字列の最初の1つだけ置換して，`str_replace_all()`は見つかった文字列を全て置換する．
`str_remove()`と`str_remove_all()`は，検索で見つかった文字列を削除する．


```r
stringr::str_replace(fruit[1:4], "a", "A")
```

```
## [1] "Apple"   "Apricot" "Avocado" "bAnana"
```

```r
stringr::str_replace_all(fruit[1:4], "a", "A")
```

```
## [1] "Apple"   "Apricot" "AvocAdo" "bAnAnA"
```

```r
stringr::str_remove(fruit[1:4], "a")
```

```
## [1] "pple"   "pricot" "vocado" "bnana"
```

```r
stringr::str_remove_all(fruit[1:4], "a")
```

```
## [1] "pple"   "pricot" "vocdo"  "bnn"
```


`str_pad()`は文字数の長さを揃えるときに役立つ．
文字列だけでなく，数字の桁揃えでも使える．


```r
stringr::str_pad(1:10, width = 2, pad = "0")
```

```
##  [1] "01" "02" "03" "04" "05" "06" "07" "08" "09" "10"
```

## purrrで繰り返し処理 {#purrr}

プログラミングで繰り返し処理では，forやwhileでのループが基本である．
ただし，パイプで繋いで処理していくときに，途中でforループを使うとコードが途切れてしまう．
また，実行速度としてはあまり早くない．
このような欠点を補うには，purrrの`map()`とその派生関数を使うとよい．

`map()`は，第1引数にベクトルかリストを，第2引数に関数を指定する．
関数の引数がある場合は，第2引数のうしろにに引数を追加する．
`map()`はリストを返すが，doubleのベクトルを返したい場合は`map_dbl()`を使う．
その他，文字列を返す`map_chr()`，論理値を返す`map_lgl()`，整数を返す`map_int()`などがある．

以下では，100から10000個の乱数を生成し，標本誤差を求め，散布図を描画する．


```r
(1:100 * 100) %>%
  purrr::map(rnorm) %>%
  purrr::map_dbl(function(x){ sd(x) / sqrt(length(x)) }) %>%
  plot()
```

### zipファイルの解凍

zipファイルの一覧を取得して，全てのzipファイルを解凍するには以下のようにする．


```r
unzips <- 
  fs::dir_ls(regex = "\\.zip") %>%
  purrr::map_chr(unzip)
```

返り値として入力したものそのものが必要であれば，`walk()`を使う．


```r
zips <- 
  fs::dir_ls(regex = "\\.zip") %>%
  purrr::walk(unzip)
```

`map()`を拡張した関数として，ベクトルまたはリストの引数を2つとる`map2()`や，さらに多くの引数をしていしるために，データフレームを引数とする`pmap()`がある．


### 科研費の審査委員の名簿取得

科学研究費助成事業，いわゆる科研費の審査委員は何年後かに名簿が公開される．
ただ，基盤Aなどの種目ごとで，さらに小委員会ごとというように，かなり細かい区分でPDFファイルが作成されている．
特定の分野のみで1つか2つぐらいの審査委員を見るのなら手作業でも良いが，多くをダウンロードするなら自動化したい．

個人的な経験だが，科研費でどの分野で応募するか(つまり審査委員による)，採否に大きく影響する．
不採択で開示された審査結果でも「C」つまり採択されなかった中で下位50\%という申請書があったが，自分ではかなり頑張って作ったつもりだった．
そこで，年度のみ変更して内容はほぼそのままで分野を変えて申請した．
すると，採択されたことがあった．
さすがにちょっとびっくりしたが，実際そのようなことがあるため，審査の分野はよく考えたほうが良い．


```r
domain <- "https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/"
dir <- c("wakate/w_", "kiban_b/b_", "kiban_c/c_")
div <- c("w_", "b_", "c_")
file <- c("01010","01020","01030","01040","01050","01060","01070","01080")
reviewers <-
  tidyr::expand_grid(domain, dir, file) %>%
  dplyr::transmute(url = paste0(domain, dir, file, ".pdf"), 
                   destfile = paste0(fs::path_temp(), "/", div, file, ".pdf")) %>%
  print() %>%
  pmap_chr(curl::curl_download)
```

```
## # A tibble: 24 × 2
##    url                                                                  destfile
##    <chr>                                                                <chr>   
##  1 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/w… C:/User…
##  2 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/w… C:/User…
##  3 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/w… C:/User…
##  4 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/w… C:/User…
##  5 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/w… C:/User…
##  6 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/w… C:/User…
##  7 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/w… C:/User…
##  8 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/w… C:/User…
##  9 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/k… C:/User…
## 10 https://www.jsps.go.jp/j-grantsinaid/01_seido/03_shinsa/meibo/r02/k… C:/User…
## # ℹ 14 more rows
```

審査委員の名簿ファイル名の規則さえ分かれば，ダウンロードはRにお任せできる．
分野は実はもっと多くあるがここでは8つだけに絞っている．

ダウンロードしたファイル自体がたくさんあるので，まだまだ不便な状態ではある．
データとして使えるようにするには，PDFからテキストを抽出したり，その中身をデータフレーム形式の一覧にしたりという作業が必要である．
そのあたりのコードは，本書のqpdfのページや以下を参考にして欲しい．

https://gist.github.com/matutosi/82a61628920ab476b71c46b980b97d24
