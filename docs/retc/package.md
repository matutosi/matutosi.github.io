<!--
**TODO：**
画像を追加する
-->

# パッケージのインストール {#package}

R単体でも多くの機能があるものの，実際には各種パッケージを利用することが多い．
パッケージのインストールには，Rで簡単なコマンドを実行するだけである．

多くのパッケージが，Rの総本山のCRANに登録されている．
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

<img src="img/packages_01.png" width="50%">

zipファイルとしてアーカイブ化されている場合は，`devtools::install_local()`でインストールできる．
例えば，過去にCRANに登録されたていたが削除されたパッケージやパッケージの古いバージョンである．
CRANの一覧からは削除されても，アーカイブ化されたものが保存されているため，そこからzipファイルをダウンロードできる．
パッケージの古いバージョンも同様である．
`devtools::install_local()`はネットのものは直接インストールできないので，一旦ダウンロードしてからインストールする．


```r
zip <- 
  "http://cran.nexr.com/bin/windows/contrib/3.5/rMouse_0.1.zip" %>%
  curl::curl_download(fs::file_temp(ext = "zip"))
devtools::install_local(zip)
```

## CRANからPackage一覧を取得する

CRANに登録されているパッケージは，2023年5月現在で2万近くになっている．
たくさんあることは嬉しい反面，目的とするパッケージを検索するのは困難である．
パッケージ一覧のページで検索しても良いが，ブラウザでは正規表現が使えないことが多い．
そこで，パッケージの一覧を取得して，自分のパソコンの中に一覧を保存して，その後でRやエディタの正規表現を用いて検索できるようにする．

<img src="img/packages_02.png" width="50%">


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

たいていはCRANに登録されているが，GitHubにしかないパッケージのときは`remotes::install_github()`を使う．
本書で使用するパッケージautomaterをインストールしてみる．

<img src="img/packages_03.png" width="50%">

まずは，CRANからremotesをインストールしておく．
その後，`install_github()`の引数で，GitHubのリポジトリを指定する．


```r
install.packages("remotes")
remotes::install_github("matutosi/automater")
## Downloading GitHub repo matutosi/automater@HEAD
## Installing 15 packages: rJava, SnowballC, semver, assertthat, binman, bitops, xlsxjars, magick, ...
## trying URL 'https://ftp.yz.yamagata-u.ac.jp/pub/cran/bin/windows/contrib/4.3/rJava_1.0-6.zip'
## Content type 'application/zip' length 1299141 bytes (1.2 MB)
## downloaded 1.2 MB
## # (中略)
## package ‘rJava’ successfully unpacked and MD5 sums checked
## # (中略)
## 
## The downloaded binary packages are in
##         C:\Users\matu\AppData\Local\Temp\Rtmpkt9har\downloaded_packages
## # (中略)
## ** testing if installed package keeps a record of temporary installation path
## * DONE (automater)
```

automaterでは多くのパッケージに依存している．
それらのパッケージがない場合は，まずは依存しているパッケージがダウンロード・インストールされる．
その後，automaterがインストールされるので，少し時間がかかるかもしれない．
なお，`install_github()`でインストールする場合は，ソースコードからビルドする(要は自分のパソコン内でパッケージを作り上げる)ので，CRANからのインストールよりは時間がかかることがある．



