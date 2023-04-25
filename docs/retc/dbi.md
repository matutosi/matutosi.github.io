# DBIでデータ取得{#dbi}

## データベースとの連携

リレーショナル・データベースと接続してデータを取得するためのパッケージには色々とある．

CRAN Task View: Databases with R には多くのパッケージが掲載されている．
https://cran.r-project.org/web/views/Databases.html

どれを使っても良いが，よく使われているのはDBIのようだ．
https://cran.r-project.org/web/packages/DBI/index.html

## DBIでできること

- 各種データベースとの接続    
- SQLによるデータ操作   

SQLを使い慣れていれば，SQLで各種の操作をするのが良いだろう．
一方，Rでのデータフレームの操作に慣れていれば，取得したデータをRで操作するのが良い．
つまり，データ取得だけにDBIを利用して，その後はdplyrやtidyverseの各種パッケージの関数を駆使してデータを処理する．
さらに，その結果を図示したい場合は，ggplot2を使うと良い．


## 準備


```r
install.packages(c("DBI", "RSQLite"))
```


```r
library(DBI)
library(RSQLite)
library(tidyverse)
```

```
## ── Attaching core tidyverse packages ──────────────────────── tidyverse 2.0.0 ──
## ✔ dplyr     1.1.1     ✔ readr     2.1.4
## ✔ forcats   1.0.0     ✔ stringr   1.5.0
## ✔ ggplot2   3.4.1     ✔ tibble    3.2.1
## ✔ lubridate 1.9.2     ✔ tidyr     1.3.0
## ✔ purrr     1.0.1     
## ── Conflicts ────────────────────────────────────────── tidyverse_conflicts() ──
## ✖ dplyr::filter() masks stats::filter()
## ✖ dplyr::lag()    masks stats::lag()
## ℹ Use the conflicted package (<http://conflicted.r-lib.org/>) to force all conflicts to become errors
```


```r
  # 一時的データの準備
con <- dbConnect(RSQLite::SQLite(), dbname = ":memory:")
dbWriteTable(con, "mpg", mpg)
dbListTables(con)
```

```
## [1] "mpg"
```


## 使い方



```r
  # SQLで選択・フィルタ
res <- dbSendQuery(con, "SELECT year, model, displ, cyl FROM mpg WHERE cyl = 4")
df <- dbFetch(res)
dbClearResult(res)
tibble::tibble(df)
```

```
## # A tibble: 81 × 4
##     year model      displ   cyl
##    <int> <chr>      <dbl> <int>
##  1  1999 a4           1.8     4
##  2  1999 a4           1.8     4
##  3  2008 a4           2       4
##  4  2008 a4           2       4
##  5  1999 a4 quattro   1.8     4
##  6  1999 a4 quattro   1.8     4
##  7  2008 a4 quattro   2       4
##  8  2008 a4 quattro   2       4
##  9  1999 malibu       2.4     4
## 10  2008 malibu       2.4     4
## # ℹ 71 more rows
```

```r
  # とりあえず全部取得してから，dplyrで選択・フィルタ
res <- dbSendQuery(con, "SELECT * FROM mpg")
df <- dbFetch(res)
dbClearResult(res)
df %>%
  tibble::as_tibble() %>%
  print() %>%
  dplyr::select(year, model, displ, cyl) %>%
  dplyr::filter(cyl == 4)
```

```
## # A tibble: 234 × 11
##    manufacturer model      displ  year   cyl trans drv     cty   hwy fl    class
##    <chr>        <chr>      <dbl> <int> <int> <chr> <chr> <int> <int> <chr> <chr>
##  1 audi         a4           1.8  1999     4 auto… f        18    29 p     comp…
##  2 audi         a4           1.8  1999     4 manu… f        21    29 p     comp…
##  3 audi         a4           2    2008     4 manu… f        20    31 p     comp…
##  4 audi         a4           2    2008     4 auto… f        21    30 p     comp…
##  5 audi         a4           2.8  1999     6 auto… f        16    26 p     comp…
##  6 audi         a4           2.8  1999     6 manu… f        18    26 p     comp…
##  7 audi         a4           3.1  2008     6 auto… f        18    27 p     comp…
##  8 audi         a4 quattro   1.8  1999     4 manu… 4        18    26 p     comp…
##  9 audi         a4 quattro   1.8  1999     4 auto… 4        16    25 p     comp…
## 10 audi         a4 quattro   2    2008     4 manu… 4        20    28 p     comp…
## # ℹ 224 more rows
```

```
## # A tibble: 81 × 4
##     year model      displ   cyl
##    <int> <chr>      <dbl> <int>
##  1  1999 a4           1.8     4
##  2  1999 a4           1.8     4
##  3  2008 a4           2       4
##  4  2008 a4           2       4
##  5  1999 a4 quattro   1.8     4
##  6  1999 a4 quattro   1.8     4
##  7  2008 a4 quattro   2       4
##  8  2008 a4 quattro   2       4
##  9  1999 malibu       2.4     4
## 10  2008 malibu       2.4     4
## # ℹ 71 more rows
```



SQL使いの方は，「SQLではじめるデータ分析 ―クエリで行う前処理、時系列解析、コホート分析、テキスト分析、異常検知」を参考にしてSQLでデータ処理をするのも良いだろう．
しかし，R使いにとってはdplyrやggplot2を使って処理するほうが楽だと思われる．
dplyrやggplot2を使ったデータ分析には，「Rではじめるデータサイエンス」が参考になる．
https://r4ds.hadley.nz/


その他，DBIパッケージの詳細は以下を参照．

https://cran.r-project.org/web/packages/DBI/vignettes/DBI-1.html
