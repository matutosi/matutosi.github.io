# qpdfでPDF操作 {#qpdf}

## 準備

いつものように，まずパッケージをインストールする．
qpdfはPDF操作のためのパッケージである．
著者作パッケージのであるautomaterをインストールするが，これはCRANには登録していない．
いずれはCRANに登録したいと思っているが，現段階ではGitHubで公開している．
そのため，install.packages()ではなく，devtools::install_github()を使ってインストールする．


```r
install.packages("qpdf")
install.packages("devtools")
devtools::install_github("matutosi/automater")
```


```r
library(tidyverse)
library(qpdf)
library(automater)
```

## qpdfでできること

qpdfパッケージでは，PDFファイルのページ分割・抽出・結合・回転・圧縮・重ね合わせが可能である．
あくまでページ単位での操作で，PDFに含まれるテキスト自体の編集はできない．
ページ単位でのPDF操作は，Adobe AcrobatでなくてもCubePDF UtilityやPDFtkを使えば可能である．
PDFtkはコマンドラインでの操作も可能であるため，大量の操作をするには適している．
とはいえ，Rやそのパッケージで操作が自動化できればさらに便利である．

なお，PDF関連の他のパッケージとしてはRpopplerやpdftoolsがある．
Rpopplerではテキストの抽出ができる．
pdftoolsではテキストの抽出，OCR(画像の文字認識，内部でtesseractパッケージを使用)，PDFファイルの分割・結合(内部でqpdfパッケージを使用)，画像ファイルへの変換などができる．
また，Microsoft365Rを使えばPDFをワードに変換できる．

余談であるが，Rのパッケージはそれぞれ独自コードを持つ部分がある一方で，他のパッケージの関数をインポートしているものや，ラッパー関数を用意しているものなどがある．
例えば，automaterではそれ自体で有用な機能を持っているというよりは，他のパッケージを利用しやすくするためのラッパー関数の集合である．
そのため，automaterのコードをもとにさらに使いやすく改良可能であり，各自で試してほしい．

## PDFの分割

PDFの分割は非常に簡単である．
pdf_split()関数にinput引数として分割するファイルを，output引数として出力パスを指定すれば良い．
パスワードが必要な場合は，引数passwordを指定する．


```r
  # wd <- "set_your_directory"
  # setwd(wd)
review <- curl::curl_download("https://www.jstage.jst.go.jp/article/vegsci/31/2/31_193/_pdf/-char/ja", fs::file_temp())
split_pdf <- qpdf::pdf_split(review)
head(split_pdf)
```
ファイル名の文字列のベクトルが返り値なので，それをもとにしてファイル名を変更すると実用的な自動化ができるだろう．

ページを指定した抽出も可能で，pdf_subset()関数を使用する．
引数としてpagesを指定する以外は，pdf_split()と同じ使い方である．


```r
  # 指定ページを抽出，create a new pdf with a subset of the input pages
pdf_subset(input, pages = 1, output = NULL, password = "")
```

以下の内容は，パッケージautomaterのinst/rscディレクトリにあるsplit_qpdf.rscの内容である．
拡張子.rscをRscriptに関連付けすれば，split_qpdf.rscと同じフォルダに保存したPDFファイルをsplit_qpdf.rscをクリックするだけで分割できる．
拡張子の関連付けは，[スクリプトの関連付け](#assoc)を参照して欲しい．


```r
system.file("rsc/split_qpdf.rsc", package = "automater") %>%
  readLines() %>%
  paste0(collapse = "\n") %>%
  cat()
```

```
##   #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  # 
##   # 
##   # See https://github.com/matutosi/automater/blob/main/vignettes/split_qpdf.md
##   # 
##   #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  #  # 
## 
##   # Prepare
## pkg <- "devtools"
## if(! pkg %in% installed.packages()[,1]){
##   install.packages(pkg, repo = "https://cran.ism.ac.jp/")
## }
## 
## pkg <- "automater"
## ver <- utils::packageDescription(pkg, fields = "Version")
## if(utils::compareVersion(ver, "0.2.0") < 0){
##   devtools::install_github("matutosi/automater", upgrade = "never", force = TRUE)
## }
## 
## automater::validate_package("qpdf")
## automater::validate_package("stringr")
## 
##   # Run
## files <- list.files(pattern = "\\.pdf")
## for(file in files){
##   output <- qpdf::pdf_split(file)
##   n_page <- qpdf::pdf_length(file)
##   extra <- 0  # to avoid dupulicated file name, add extra degits
##   numbered <- automater::file_numbered(file, n_page, extra = extra)
##   while(automater::is_duplicated(files, numbered)){
##     extra <- extra + 1
##     numbered <- automater::file_numbered(file, n_page, extra = extra)
##   }
##   file.rename(output, numbered)
## }
## 
## automater::message_to_continue()
```

```r
  # system.file("rsc/split_qpdf.rsc", package = "automater") %>%
  #   readtext::readtext(verbosity = 0) %>%
  #   `[[`("text") %>%
  #   cat()
```

具体的な方法は次のとおりである．
- split_qpdf.rsc をディレクトリーに保存する
  - 以下のコードで split_qpdf.rsc をコピー可能

```r
file <- "split_qpdf"
path <- "c:/" # set your path
automater::set_rsc(file, path)
```
- 拡張子 .rsc を Rscript.exe に関連付ける
- 分割したいPDFファイルを split_qpdf.rsc と同じディレクトリにコピーする
- split_qpdf.rsc をクリックする
- 黒いウィンドウが開くので，しばらく待つ

split_qpdf.rsc を初めて実行するときは，パッケージのインストールに時間がかかることがある．
出力ファイル名は以下のとおりである．
- 入力：「original.pdf」(15ページ)
- 出力: "original_01.pdf", "original_02.pdf", ..., "original_15.pdf"




```r
  # 結合，join several pdf files into one
pdf_combine(input, output = NULL, password = "")
```

ここではあるディレクトリにあるPDFファイルを1つのPDFファイルとして結合することを自動化するスクリプトを作成する．



```r
system.file("rsc/combine_qpdf.rsc", package = "automater")
```

```
## [1] "D:/pf/R/R-4.3.0/library/automater/rsc/combine_qpdf.rsc"
```


pdf_compress()は圧縮とともに，最適化(Linealize)してくれる．
最適化されていないPDFはファイルを全部読み込まないと表示できないのに対して，
最適化されたPDFは最後まで読み込みが完了しなくてもページ表示できる．
ネット上にある重いPDFを表示させる場合に特に役立つ．


```r
  # 圧縮，compress or linearize a pdf file
pdf_compress(input, output = NULL, linearize = FALSE, password = "")
```

## PDFへのページ番号付加


pdf_overlay_stamp


```r
  # 重ね合わせ
pdf_overlay_stamp(input, stamp, output = NULL, password = "")
```


## 関数一覧


```r
  # ページ数取得，show the number of pages in a pdf
pdf_length(input, password = "")
  # 1ページごとに分割，split a single pdf into separate files, one for each page
pdf_split(input, output = NULL, password = "")
  # 指定ページを抽出，create a new pdf with a subset of the input pages
pdf_subset(input, pages = 1, output = NULL, password = "")
  # 結合，join several pdf files into one
pdf_combine(input, output = NULL, password = "")
  # 圧縮，compress or linearize a pdf file
pdf_compress(input, output = NULL, linearize = FALSE, password = "")
  # ページ回転，rotate selected pages
pdf_rotate_pages(input, pages, angle = 90, relative = FALSE, output = NULL, password = "")
  # 重ね合わせ
pdf_overlay_stamp(input, stamp, output = NULL, password = "")
```
