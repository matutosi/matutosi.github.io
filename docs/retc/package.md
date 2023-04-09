# パッケージのインストール {#package}

R単体でも多くの機能があるものの，実際には各種パッケージを利用することが多い．
パッケージのインストールするには，Rで簡単なコマンドを実行するだけである．

## CRANから {#cran}


CRANは，Rの総本山である．

https://cran.r-project.org/

R本体だけでなく，各種パッケージが公開されている．

https://cran.r-project.org/web/packages/available_packages_by_name.html

CRANに掲載されており，パッケージの名前がわかっていたら，以下のようにすればインストールできる．


```r
  # ミラーサイト(ダウンロード元)の設定
options(repos = "https://cran.ism.ac.jp/")
  # 1つの場合
install.packages("tidyverse")
  # 複数の場合
pkg <- c("xlsx", "magrittr", "devtools")
install.packages(pkg)
```

実行すると，ファイルをダウンロードし，成功(あるいは失敗)したことが表示される．

## GitHubから {#github}

たいていはCRANに登録されているが，GitHubにしかないパッケージもある．
その場合には，以下のようにする．


```r
install.packages("devtools")
devtools::install_github("matutosi/ecan")
```
