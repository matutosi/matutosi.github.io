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

- dplyr：データフレーム操作
- forcats：ファクター(因子)操作
- ggplot2：作図
- lubridate：日付・時間データ
- purrr：繰り返し処理
- readr：ファイル読み込み・保存
- stringr：文字列
- tibble：データフレームの拡張型
- tidyr：整然(tidy)データのツール

このうち，この文書ではファクター(因子)をほとんど扱っていないため，forcatsについては説明しない．
ggplot2とlubridateはそれぞれ第?章と第?章で説明し，その他はこの章で説明する．
以下では全体に関係するものから説明するため，上記の順序とは異なる(上記はアルファベット順)．

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
##             a          b          c            d           e          f
## 1  0.27102840  2.1835461 -0.9217014  0.354160405 0.309641263 -0.8630142
## 2 -0.21290841 -0.6426277  0.2188245  0.003361974 0.006623768  0.4432816
## 3  0.04612391 -0.5418396 -0.7204717 -1.717554732 0.387537785  0.6649158
##            g           h          i          j
## 1 -0.2558596  0.22954905  0.8024973  0.8953605
## 2  0.9941696 -0.24187430 -0.2115415 -2.3719990
## 3  0.2920240  0.03578411  1.8411174 -0.1436217
```

```r
tibble::as_tibble(df)
```

```
## # A tibble: 3 x 10
##         a      b      c        d       e      f      g       h      i      j
##     <dbl>  <dbl>  <dbl>    <dbl>   <dbl>  <dbl>  <dbl>   <dbl>  <dbl>  <dbl>
## 1  0.271   2.18  -0.922  0.354   0.310   -0.863 -0.256  0.230   0.802  0.895
## 2 -0.213  -0.643  0.219  0.00336 0.00662  0.443  0.994 -0.242  -0.212 -2.37 
## 3  0.0461 -0.542 -0.720 -1.72    0.388    0.665  0.292  0.0358  1.84  -0.144
```

変なたとえかもしれないが，データフレームは「言われたことをそのままやりました」という何も考えずに与えられたことをするような感じで，tibbleは「見やすく修正しておきました」という非常に気の利いた対応をする感じである．

さらに，tibbleでは行数が多いときは最初の10行だけ表示する．
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
##               a           b             c
## 1   0.184950190 -1.47955502  0.2069675892
## 2  -0.147438793  0.35867887 -0.0739504744
## 3   0.449036856  0.21292983  0.5790026815
## 4  -0.188816149  0.80861007 -1.5433850644
## 5   0.860092650  0.45786187 -0.0005306619
## 6  -0.599305631 -0.80064153  0.6276399398
## 7   0.230910791 -0.27484907 -0.9605695952
## 8   0.152873537 -0.31217871 -0.3506191619
## 9   0.112679651  0.63127195 -1.4041232300
## 10 -1.929432301 -1.52025115  0.3175310559
## 11 -1.304701729  1.02907550  2.2132999893
## 12 -0.511963716 -1.20891663  1.8719566790
## 13  0.513241871  0.32903117 -0.7694505000
## 14 -0.653501656 -0.68818541  1.3700856614
## 15 -0.007663163 -0.53910366  1.0675517053
## 16  0.161228197  0.01909889  0.0173487849
## 17  0.993263206 -1.13646292  1.2069916081
## 18 -0.728739530 -0.92389145 -1.7625558393
## 19 -1.354202748 -1.46205561  0.0641697352
## 20  0.687547328  0.10588969  0.3341766407
## 21  0.021507479 -0.30771381  0.9840052144
```

```r
tibble::as_tibble(df)
```

```
## # A tibble: 21 x 3
##         a      b         c
##     <dbl>  <dbl>     <dbl>
##  1  0.185 -1.48   0.207   
##  2 -0.147  0.359 -0.0740  
##  3  0.449  0.213  0.579   
##  4 -0.189  0.809 -1.54    
##  5  0.860  0.458 -0.000531
##  6 -0.599 -0.801  0.628   
##  7  0.231 -0.275 -0.961   
##  8  0.153 -0.312 -0.351   
##  9  0.113  0.631 -1.40    
## 10 -1.93  -1.52   0.318   
## # i 11 more rows
```

表示したい行数を指定するには，引数`n`で指定する．
以下のコードのうち，3つ目を実行すると全行が表示されるので以下では表示を省略している．


```r
mpg                  # 通常表示
print(mpg, n = 30)   # 30行を表示
print(n = nrow(mpg)) # 全行を表示
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
## # A tibble: 32 x 11
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
## # i 22 more rows
```

新たにtibbleを生成するには，データフレームの場合と同様である．


```r
n <- 10
data.frame(x = runif(n), y = rnorm(n))
```

```
##              x           y
## 1  0.892846006  1.04175934
## 2  0.202608323 -0.74815533
## 3  0.015091773  0.39048685
## 4  0.046236624 -0.42155072
## 5  0.003937512  0.62998596
## 6  0.587763050  0.76174289
## 7  0.897194685 -0.05768119
## 8  0.150699436  0.98694529
## 9  0.008234881  0.77386368
## 10 0.147043830 -0.93391199
```

```r
tibble::tibble(x = runif(n), y = rnorm(n))
```

```
## # A tibble: 10 x 2
##         x      y
##     <dbl>  <dbl>
##  1 0.545   0.458
##  2 0.110   2.09 
##  3 0.0388 -0.198
##  4 0.302   0.200
##  5 0.104  -0.991
##  6 0.821   0.419
##  7 0.202  -1.71 
##  8 0.821  -1.55 
##  9 0.802   0.610
## 10 0.990  -0.915
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
## # A tibble: 18 x 11
##    religion `<$10k` `$10-20k` `$20-30k` `$30-40k` `$40-50k` `$50-75k` `$75-100k`
##    <chr>      <dbl>     <dbl>     <dbl>     <dbl>     <dbl>     <dbl>      <dbl>
##  1 Agnostic      27        34        60        81        76       137        122
##  2 Atheist       12        27        37        52        35        70         73
##  3 Buddhist      27        21        30        34        33        58         62
##  4 Catholic     418       617       732       670       638      1116        949
##  5 Don’t ~       15        14        15        11        10        35         21
##  6 Evangel~     575       869      1064       982       881      1486        949
##  7 Hindu          1         9         7         9        11        34         47
##  8 Histori~     228       244       236       238       197       223        131
##  9 Jehovah~      20        27        24        24        21        30         15
## 10 Jewish        19        19        25        25        30        95         69
## 11 Mainlin~     289       495       619       655       651      1107        939
## 12 Mormon        29        40        48        51        56       112         85
## 13 Muslim         6         7         9        10         9        23         16
## 14 Orthodox      13        17        23        32        32        47         38
## 15 Other C~       9         7        11        13        13        14         18
## 16 Other F~      20        33        40        46        49        63         46
## 17 Other W~       5         2         3         4         2         7          3
## 18 Unaffil~     217       299       374       365       341       528        407
## # i 3 more variables: `$100-150k` <dbl>, `>150k` <dbl>,
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
## # A tibble: 180 x 3
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
## # i 170 more rows
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
## # A tibble: 9 x 4
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
## # A tibble: 19,530 x 2
##    pkg           description                                                    
##    <chr>         <chr>                                                          
##  1 A3            Accurate, Adaptable, and Accessible Error Metrics for Predicti~
##  2 AalenJohansen Conditional Aalen-Johansen Estimation                          
##  3 AATtools      Reliability and Scoring Routines for the Approach-Avoidance Ta~
##  4 ABACUS        Apps Based Activities for Communicating and Understanding Stat~
##  5 abbreviate    Readable String Abbreviation                                   
##  6 abbyyR        Access to Abbyy Optical Character Recognition (OCR) API        
##  7 abc           Tools for Approximate Bayesian Computation (ABC)               
##  8 abc.data      Data Only: Tools for Approximate Bayesian Computation (ABC)    
##  9 ABC.RAP       Array Based CpG Region Analysis Pipeline                       
## 10 ABCanalysis   Computed ABC Analysis                                          
## # i 19,520 more rows
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
## # A tibble: 19,530 x 3
##    pkg           description                                               ocr  
##    <chr>         <chr>                                                     <lgl>
##  1 A3            Accurate, Adaptable, and Accessible Error Metrics for Pr~ FALSE
##  2 AalenJohansen Conditional Aalen-Johansen Estimation                     FALSE
##  3 AATtools      Reliability and Scoring Routines for the Approach-Avoida~ FALSE
##  4 ABACUS        Apps Based Activities for Communicating and Understandin~ FALSE
##  5 abbreviate    Readable String Abbreviation                              FALSE
##  6 abbyyR        Access to Abbyy Optical Character Recognition (OCR) API   FALSE
##  7 abc           Tools for Approximate Bayesian Computation (ABC)          FALSE
##  8 abc.data      Data Only: Tools for Approximate Bayesian Computation (A~ FALSE
##  9 ABC.RAP       Array Based CpG Region Analysis Pipeline                  FALSE
## 10 ABCanalysis   Computed ABC Analysis                                     FALSE
## # i 19,520 more rows
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
## # A tibble: 19,530 x 14
##    pkg           description          database excel file  ggplot `image|magick`
##    <chr>         <chr>                <lgl>    <lgl> <lgl> <lgl>  <lgl>         
##  1 A3            Accurate, Adaptable~ FALSE    FALSE FALSE FALSE  FALSE         
##  2 AalenJohansen Conditional Aalen-J~ FALSE    FALSE FALSE FALSE  FALSE         
##  3 AATtools      Reliability and Sco~ FALSE    FALSE FALSE FALSE  FALSE         
##  4 ABACUS        Apps Based Activiti~ FALSE    FALSE FALSE FALSE  FALSE         
##  5 abbreviate    Readable String Abb~ FALSE    FALSE FALSE FALSE  FALSE         
##  6 abbyyR        Access to Abbyy Opt~ FALSE    FALSE FALSE FALSE  FALSE         
##  7 abc           Tools for Approxima~ FALSE    FALSE FALSE FALSE  FALSE         
##  8 abc.data      Data Only: Tools fo~ FALSE    FALSE FALSE FALSE  FALSE         
##  9 ABC.RAP       Array Based CpG Reg~ FALSE    FALSE FALSE FALSE  FALSE         
## 10 ABCanalysis   Computed ABC Analys~ FALSE    FALSE FALSE FALSE  FALSE         
## # i 19,520 more rows
## # i 7 more variables: `keyboards|mouse` <lgl>, ocr <lgl>, office <lgl>,
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
## # A tibble: 10 x 3
##    pkg                description                                          ocr  
##    <chr>              <chr>                                                <lgl>
##  1 abbyyR             "Access to Abbyy Optical Character Recognition (OCR~ TRUE 
##  2 coalitions         "Bayesian \"\"Now-Cast\"\" Estimation of Event Prob~ TRUE 
##  3 elastes            "Elastic Full Procrustes Means for Sparse and Irreg~ TRUE 
##  4 googleCloudVisionR "Access to the 'Google Cloud Vision' API for Image ~ TRUE 
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
## # A tibble: 19,530 x 13
##    pkg        database excel file  ggplot `image|magick` `keyboards|mouse` ocr  
##    <chr>      <lgl>    <lgl> <lgl> <lgl>  <lgl>          <lgl>             <lgl>
##  1 A3         FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  2 AalenJoha~ FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  3 AATtools   FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  4 ABACUS     FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  5 abbreviate FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  6 abbyyR     FALSE    FALSE FALSE FALSE  FALSE          FALSE             TRUE 
##  7 abc        FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  8 abc.data   FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
##  9 ABC.RAP    FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
## 10 ABCanalys~ FALSE    FALSE FALSE FALSE  FALSE          FALSE             FALSE
## # i 19,520 more rows
## # i 5 more variables: office <lgl>, pdf <lgl>, python <lgl>,
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
## # A tibble: 958 x 4
##    pkg              description                                      kwd   val  
##    <chr>            <chr>                                            <chr> <lgl>
##  1 abbyyR           Access to Abbyy Optical Character Recognition (~ ocr   TRUE 
##  2 abjData          Databases Used Routinely by the Brazilian Jurim~ data~ TRUE 
##  3 ABPS             The Abnormal Blood Profile Score to Detect Bloo~ file  TRUE 
##  4 ace2fastq        ACE File to FASTQ Converter                      file  TRUE 
##  5 AcousticNDLCodeR Coding Sound Files for Use with NDL              file  TRUE 
##  6 activPAL         Advanced Processing and Chart Generation from a~ file  TRUE 
##  7 ADAPTS           Automated Deconvolution Augmentation of Profile~ file  TRUE 
##  8 add2ggplot       Add to 'ggplot2'                                 ggpl~ TRUE 
##  9 adepro           A 'shiny' Application for the (Audio-)Visualiza~ file  TRUE 
## 10 adfExplorer      Import from and Export to Amiga Disk Files       file  TRUE 
## # i 948 more rows
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
## # A tibble: 958 x 4
## # Groups:   kwd [12]
##    pkg              description                                      kwd   val  
##    <chr>            <chr>                                            <chr> <lgl>
##  1 abbyyR           Access to Abbyy Optical Character Recognition (~ ocr   TRUE 
##  2 abjData          Databases Used Routinely by the Brazilian Jurim~ data~ TRUE 
##  3 ABPS             The Abnormal Blood Profile Score to Detect Bloo~ file  TRUE 
##  4 ace2fastq        ACE File to FASTQ Converter                      file  TRUE 
##  5 AcousticNDLCodeR Coding Sound Files for Use with NDL              file  TRUE 
##  6 activPAL         Advanced Processing and Chart Generation from a~ file  TRUE 
##  7 ADAPTS           Automated Deconvolution Augmentation of Profile~ file  TRUE 
##  8 add2ggplot       Add to 'ggplot2'                                 ggpl~ TRUE 
##  9 adepro           A 'shiny' Application for the (Audio-)Visualiza~ file  TRUE 
## 10 adfExplorer      Import from and Export to Amiga Disk Files       file  TRUE 
## # i 948 more rows
## # A tibble: 12 x 2
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
## # A tibble: 12 x 2
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

<!--
## tidyverseの関数一覧


```r
tidyverse <- 
  c("dplyr", "forcats", "ggplot2", "lubridate", 
    "purrr", "readr", "stringr", "tibble", "tidyr")
objs <- 
  tidyverse %>% 
  purrr::map( function(x){ tibble::tibble(pkg = x, obj = ls(paste0("package:", x))) } ) %>%
  dplyr::bind_rows()
dups <-
  objs %>%
  dplyr::count(obj) %>%
  dplyr::filter(n > 1)
objs %>%
  dplyr::anti_join(dups) %>%
  dplyr::filter(pkg == "tibble") %>%
  `$`(obj)
```


```r
ls("package:tibble")
```
-->


<!--
irisを例にするが，できれば，veganとかdaveのデータを使う
tidy dataへの変換が必要
コードのみか，詳しくは松村や比嘉の解説を参考に

gather()とspread()はpivot_longer()とpivot_wider()になって使いやすくなった．
Hadley自身も使い方を混乱していたらしい

  # kwds <- 
  #   c("ocr", "deep learning", "machine learning", "excel", 
  #     "database", "ggplot", "scraping", "pdf", "magick", 
  #     "shell", "python", "js|javascript", "php")
-->
