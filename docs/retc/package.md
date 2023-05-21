<!--
**TODO：**
画像を追加する
-->

# パッケージのインストール {#package}

R単体でも多くの機能があるものの，実際には各種パッケージを利用することが多い．
パッケージのインストールには，Rで簡単なコマンドを実行するだけである．

多くのパッケージが，Rの総本山であるCRANに登録されている．
https://cran.r-project.org/

CRANに登録するには，それなりに厳しいチェックがある．
ただし，私でも登録できていることが証明しているが，CRANに登録されたからといってバグが無いわけではない．
そのためR本体もそうだが，Rのパッケージ利用はあくまで自己責任である．

CRANに登録されたパッケージの開発バージョンは，GitHubで公開されていることが多い．
また，CRANには登録されずGitHubのみで公開されているパッケージも存在する．

## CRANから {#cran}

CRANではR本体だけでなく，各種パッケージが公開されている．
なお，パッケージの名前は分かっているが，内容がよくわからない場合は，`PackageName cran`で検索するとCRANのページがひっかかることが多い．

https://cran.r-project.org/web/packages/available_packages_by_name.html

CRANに登録されたパッケージで名前がわかっていたら，以下のようにすればインストールできる．


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


## アーカイブされたパッケージ

過去にCRANに登録されたが，その後何らかの理由でCRANからは削除されたパッケージがある．
その場合でも，アーカイブ化されたものがCRANには保存されているため，そこからインストールできる．
また，パッケージの古いバージョンをインストールする場合にも同じ手法が使える．


```r
zip <- "http://cran.nexr.com/bin/windows/contrib/3.5/rMouse_0.1.zip"
setwd("d:/")
devtools::install_local("d:/rMouse_0.1.zip")
```


## CRANからPackage一覧を取得する

CRANに登録されているパッケージは，2023年5月現在で2万近くになっている．
たくさんあることは嬉しい反面，目的とするパッケージを検索するのは困難である．
パッケージ一覧のページで検索しても良いが，ブラウザでは正規表現が使えないことが多い．
そこで，パッケージの一覧を取得して，自分のパソコンの中に一覧を保存して，その後でRやエディタの正規表現を用いて検索できるようにする．


```r
library(tidyverse)
library(magrittr)
library(rvest)
  # wd <- "your_directory"
  # wd <- "D:/matu/work/tmp"
  # setwd(wd)
url <- "https://cran.r-project.org/web/packages/available_packages_by_name.html"
html <- rvest::read_html(url)  # rvestは第???章を参照
pkgs <-
  html %>%
  rvest::html_table(header = TRUE) %>%
  `[[`(1) %>% # .[[1]]と同じ
  magrittr::set_colnames(c("pkg", "description")) %>% # magrittrは第???章を参照
  stats::na.omit() %>%
  dplyr::mutate( # dplyrは第???章を参照，stringrは第???章を参照
    description = stringr::str_replace_all(description, "\n", " "))

readr::write_tsv(pkgs, "pkgs.txt") # readrは第???章を参照

dplyr::filter(pkgs, stringr::str_detect(description, "Image|image"))
```

詳しい説明は省略するが，以下を実行すると`pkgs.txt`というテキストファイルが作業ディレクトリに保存される．
また，「Image」か「image」が`description`に含まれるものが出力される．
すべてを画面に出力したい場合は，最後にコメントアウトした3行を実行する．
検索結果を`write_tsv()`でテキストファイルとして保存するのも良いだろう．

パッケージとその説明の一覧を分析する方法は，tidyverseの章を参考にしてほしい．

## GitHubから {#github}

たいていはCRANに登録されているが，GitHubにしかないパッケージのときは以下のようにする．


```r
install.packages("devtools")
devtools::install_github("matutosi/ecan")
```
