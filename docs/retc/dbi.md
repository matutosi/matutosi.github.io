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
install.packages("DBI")
library(DBI)
```

## 使い方

詳細は以下を参照．

https://cran.r-project.org/web/packages/DBI/vignettes/DBI-1.html




