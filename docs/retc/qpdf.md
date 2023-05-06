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




## PDFの結合

結合させる場合は，input引数に結合させたいファイル名を指定する．
それ以外は，pdf_split()と同様である．


```r
  # 結合，join several pdf files into one
pdf_combine(input, output = NULL, password = "")
```

特定のディレクトリ内のPDFファイルを1つのPDFファイルとして結合することを自動化するスクリプトは以下のとおりである．


```r
system.file("rsc/combine_qpdf.rsc", package = "automater")
```

```
## [1] "D:/pf/R/R-4.3.0/library/automater/rsc/combine_qpdf.rsc"
```

```r
  readLines() %>%
  paste0(collapse = "\n") %>%
  cat()
```

- combine_qpdf.rsc をディレクトリに保存
  - 以下のコードで、combine_qpdf.rsc をコピー可能

```r
file <- "combine_qpdf"
path <- "c:/" # set your path
automater::set_rsc(file, path)
```
- 拡張子 .rsc を Rscript.exe に関連付ける   
- 結合したいPDFファイルを combine_qpdf.rsc と同じディレクトリにコピーする   
  ファイルの結合順はファイル名の順序と同じ
- combine_qpdf.rsc をクリックする   
- 黒いウィンドウが開くので，しばらく待つ   
  初めて実行するときは，パッケージのインストールに時間がかかることがある．   
- 結合したファイル名は以下のとおりである．   
  出力: 「combined_"2020-11-27_12_00_00.pdf"」(結合した日付・時刻)   


PDFファイルの結合順はファイル名の順序と同じなので，`fs::dir_ls()`でファイル名一覧を取得し，`file_move()`で名前を変更する必要がある．
さらに，このあたりも自動化するには，ユーザからの入力を受け取り，それをもとにファイル名の順序を決めれば良い．


```r
  # wd <- "set_your_directory"
  # setwd(wd)
library(tidyverse)
input_files <- function(files){
  len <- length(files) %>% log10() %>% ceiling()
  no <- stringr::str_pad(seq(files), width = len, side = "left")
  prompt <- 
    files %>%
    paste0(no, ": ", .) %>%
    paste0(collapse = "\n") %>%
    paste0("\n結合するファイルを番号で指定してください(カンマ区切り)．\n  例：3,1,2\n") %>%
    cat()
  input_order <- 
    user_input(prompt) %>%
    stringr::str_split(",") %>%
    unlist() %>%
    as.numeric()
  files[input_order]
}
user_input <- function(prompt){
  if (interactive()) {
    return(readline(prompt))
  } else {
    cat(prompt)
    return(readLines("stdin", n=1))
  }
}

files <- fs::dir_ls(regexp = "\\.pdf")
input <- input_files(files)
input

automater::message_to_continue()
```
上のコードの`input_files()`では，ファイル名の一覧からファイル数を取り出し，ファイル番号を画面表示用に桁揃えしている．
その後，ファイル番号とファイル名，さらにユーザへの註釈を結合して，プロンプトに表示するメッセージ文字列を生成する．
メッセージを`user_input()`を用いて表示するとともに，ユーザからの入力を受け取る．
入力された文字列を数値にして，ファイルの順序を決めている．

このコードの`input`を`pdf_combine(input)`として使えば，ユーザ入力をもとにしてPDFファイルを結合するスクリプトができる．
入力する番号が数個であれば，これでも良いがもっと多くのファイルになった場合は現実的には使いにくい．
多くのファイルを結合する場合は，以下のような方法で実装すると良いだろう．

- `fs::dir_ls(regexp = "\\.pdf")`でファイル名の一覧を入手   
- 一覧をもとに1行ごとに1つのファイル名のテキストファイルとして保存   
- テキストファイルをユーザが並び替える(Rでは並び替えが終わるまで待機)   
- 並び替えが終われば，RでEnter(他のキーでもOK)を入力   
- テキストファイルを読み込み，や`combine_qpdf()`(`pdf_combine()`でもOK)でPDFを結合   

## PDFの圧縮・最適化

pdf_compress()は圧縮とともに，最適化(Linealize)してくれる．
最適化されていないPDFはファイルを全部読み込まないと表示できないのに対して，
最適化されたPDFは最後まで読み込みが完了しなくてもページ表示できる．
ネット上にある重いPDFを表示させる場合に特に役立つ．
使い方は次のとおりである．
詳細な説明は不要だろう．


```r
  # 圧縮，compress or linearize a pdf file
pdf_compress(input, output = NULL, linearize = FALSE, password = "")
```

## PDFへのページ番号付加

`pdf_overlay_stamp()`を使うと，PDFファイルに別のPDFファイルを重ね合わせることができる．


```r
pdf_overlay_stamp(input, stamp, output = NULL, password = "")
```

引数`input`にはベースとなるPDFファイルを，`stamp`には重ね合わせるPDFファイルを指定する．
`stamp`として「部外秘」「資料1」などを記載したPDFファイルをあらかじめ準備しておく．
`input`の各ページに`stamp`の1ページ目が重ね合わせられる．

これだけでも十分便利な機能であるが，さらに便利に使いたい．
例えば，ベースのPDFファイルの各ページにページ番号を入力したい．
ページ番号でなくて別の通し番号を使いたいときもあるだろう．
例えば，学会の発表要旨集で左上に「A01」「A02」のような会場番号と通し番号を使うことが多い．
さらに欲をだして，重ね合わせの開始・終了ページを指定するようにしたい．

これらの内容を実行するコードは次のとおりである．


```
#' Wrapper functions to overlay page numbers and others using package qpdf.
#' 
#' pdf_overlay_stamps_each() overlay PDF for each page in pdf file. 
#' validate_page() is a helper function for pdf_overlay_stamps_each() 
#' to validate page consistency of among page no. of input, stamp, start and end.
#' pdf_overlay_page_num() and pdf_overlay_session_num() are wrapper functions to 
#' overlay page no. and session no. for accademic congress or symposium etc. 
#' pdf_overlay_page_num() can overlay up to 100 pages.
#' 
#' Package qpdf <https://cran.r-project.org/web/packages/qpdf/index.html>
#' includes useful functions as shown bellow.
#' pdf_length(), pdf_split(), pdf_subset(), pdf_combine(), 
#' pdf_compress(), pdf_rotate_pages(), pdf_overlay_stamp().
#' 
#' @name pdf_overlay
#' @param input,stamp  A string of file name or path of pdf file.
#'                     input is a base pdf and stamp will be overlayed.
#'                     No. of pages in stamp PDF should be equal to or over no. of pages in input PDF.
#'                     Pages in stamp exceeding pages over input pages will be ignored.
#' @param start,end    An integer of start and end page to be stamped.
#'                     negative integer can be used for end, which means
#'                     number from the last page.
#' @param session      A string of session name. Can use "a", "b", or "p".
#'                     'session = "a"' uses 'pdf/00_sn_a.pdf' as stamp. 
#'                     pdf directory include '00_sn_a.pdf', '00_sn_b.pdf', and '00_sn_p.pdf' 
#'                     by default, which invlude 50 pages (eg., A01, A02, ..., A50) respectively.
#' @examples
#' \dontrun{
#' input <- system.file("pdf/00_sn_a.pdf", package = "automater")
#' pdf_overlay_page_num(input, start = 11, end = -3)
#' pdf_overlay_session_num(input, session = "b")
#' }
#' 
#' @return  A string of output pdf file.
#' @export
pdf_overlay_stamps_each <- function(input, stamp, start = 1, end = NULL){
  len_input <- qpdf::pdf_length(input)
  len_stamp <- qpdf::pdf_length(stamp)
  if(is.null(end)){ end <- len_input }
  if(end < 0     ){ end <- len_input + end}
  validate_page(len_input, len_stamp, start, end)
  pages_inputs <- seq(to = len_input)
    # +1 means out of bounds, inputs[pages_pre]: NA
  pages_pre    <- if(start != 1      ){ seq(to = start - 1)                 } else { len_input + 1 }
  pages_post   <- if(end != len_input){ seq(from = end  + 1, to = len_input)} else { len_input + 1 }
  pages_body   <- pages_inputs[-c(pages_pre, pages_post)]
  inputs <- qpdf::pdf_split(input)
  stamps <- qpdf::pdf_split(stamp)
  out <- list()
  for(i in seq_along(pages_body)){
    out[[i]] <- qpdf::pdf_overlay_stamp(inputs[pages_body[i]], stamps[i])
  }
  out <- stats::na.omit(c(inputs[pages_pre], unlist(out), inputs[pages_post]))
  outfile <- qpdf::pdf_combine(out, "out.pdf")
  file.remove(inputs)
  file.remove(stamps)
  file.remove(out[pages_body])
  return(outfile)
}

#' @rdname pdf_overlay
#' @export
validate_page <- function(len_input, len_stamp, start, end){
  if(end       < start)    { stop("end must be larger than start!") }
  if(len_input < start)    { stop("input pages must be larger than start!") }
  if(len_input < end  )    { stop("input pages must be larger than end!") }
  if(len_input > len_stamp){ stop("stamp pages must be equal to or bigger than input!") }
}

#' @rdname pdf_overlay
#' @export
pdf_overlay_page_num <- function(input, start = 1, end = NULL){
  stamp <- file.path(find.package("automater"), "pdf/00_page.pdf")
  pdf_overlay_stamps_each(input, stamp, start, end)
}

#' @rdname pdf_overlay
#' @export
pdf_overlay_session_num <- function(input, start = 1, end = NULL, session = "a"){
  stamp <- file.path(find.package("automater"), "pdf/00_sn_", session, ".pdf")
  pdf_overlay_stamps_each(input, stamp, start, end)
}
```

`pdf_overlay_stamps_each()`の引数には，`input`，`stamp`，`start`，`end`がある．
`input`と`stamp`はqpdfの他の関数と同様の引数で，ファイルのパスを文字列で指定する．
`start`と`end`は，`input`での重ね合わせ対象とするページ数の開始・終了ページで，整数で指定する．
最後からのページ数とするには，`end`を負の数で指定する．

関数の主な構成は以下のとおりである．
- input`と`stamp`のページ数を取得   
- `start`や`end`との整合性を`validate_page()`で確認   
- 重ね合わせ対象よりも前(`pages_pre`)，後ろ(`pages_post`)，重ね合わせの対象のページ(`pages_body`)を取得  
- `pdf_split()`で`input`と`stamp`を1ページごとに分割   
- `pages_body`の部分のみ，`stamp`の各ページを重ね合わせ   
- combine_pdf()で使うためのファイル名を結合(`pages_pre`，`pages_body`，`pages_post`)   
- combine_pdf()でファイルの結合   
- 使用後のファイルを削除   
- 結合したファイル名を返す   

なお，ページ番号と学会でのセッション番号を付与するためのラッパー関数として，それぞれ`pdf_overlay_page_num()`と`pdf_overlay_session_num()`がある．
`pdf_overlay_page_num()`は，`input`のPDFだけ指定すれば全ページに番号を付加し，`start`と`end`が指定可能である．
ただし，最大ページ数は100ページである．
`pdf_overlay_session_num()`は，さらに`session`を指定して「A01」のような番号を左上に付加する．

pdf_overlay_page_num(input, start = 1, end = NULL)
pdf_overlay_session_num(input, start = 1, end = NULL, session = "a")

パッケージautomaterのpdfフォルダには，ページ番号と学会でのセッション番号を付加するためのPDFファイル(すべてA4版)がある．
- 00_page.pdf
- 00_sn_a.pdf，00_sn_b.pdf，00_sn_p.pdf
ページ番号は，下部に「-1-」などの表記があり100ページ分からなる．
セッション番号は，左上に「A01」(A会場を想定)「B01」「P01」(ポスター会場を想定)などの表記があり，50番までが入っている．
それぞれのtexソースファイルも保存されている．
texを使うのが難しければ，ワードなどで同様の書式のファイルを作成したものをPDFとして保存すれば良い．

## その他の関数

これまでで説明した以外に，qpdfには`pdf_length()`と`pdf_rotate_pages()`がある．
`pdf_length()`は入力したPDFファイルのページ数を返す．
`pdf_rotate_pages()`はPDFファイルのページを90度単位で回転できる．
`angle`で時計回りの角度を指定する．
`relative`が`TRUE`のときは入力時点での角度からの相対的な角度で回転し，`FALSE`のときは`angle = 0`のときは縦長で`angle = 90`のときは横長になる．


```r
pdf_length(input, password = "")   
pdf_rotate_pages(input, pages, angle = 90, relative = FALSE, output = NULL, password = "")   
```




## pdftoolsでテキストの取り出し

https://docs.ropensci.org/pdftools/


```r
  # install.packages("Rpoppler")
install.packages("pdftools")
```


```r
  # library(Rpoppler)
library(pdftools)
```



```r
library(pdftools)
utils::download.file("http://arxiv.org/pdf/1403.2805.pdf", "1403.2805.pdf", mode = "wb")
txt <- pdf_text("1403.2805.pdf")
  # first page text
cat(txt[1])
```

```
##                                               The jsonlite Package: A Practical and Consistent Mapping
##                                                                    Between JSON Data and R Objects
## 
##                                                                                     Jeroen Ooms
## arXiv:1403.2805v1 [stat.CO] 12 Mar 2014
## 
## 
## 
## 
##                                                                               UCLA Department of Statistics
## 
## 
##                                                                                              Abstract
##                                                   A naive realization of JSON data in R maps JSON arrays to an unnamed list, and JSON objects to a
##                                                named list. However, in practice a list is an awkward, inefficient type to store and manipulate data.
##                                                Most statistical applications work with (homogeneous) vectors, matrices or data frames. Therefore JSON
##                                                packages in R typically define certain special cases of JSON structures which map to simpler R types.
##                                                Currently there exist no formal guidelines, or even consensus between implementations on how R data
##                                                should be represented in JSON. Furthermore, upon closer inspection, even the most basic data structures
##                                                in R actually do not perfectly map to their JSON counterparts and leave some ambiguity for edge cases.
##                                                These problems have resulted in different behavior between implementations and can lead to unexpected
##                                                output. This paper explicitly describes a mapping between R classes and JSON data, highlights potential
##                                                problems, and proposes conventions that generalize the mapping to cover all common structures. We
##                                                emphasize the importance of type consistency when using JSON to exchange dynamic data, and illustrate
##                                                using examples and anecdotes. The jsonlite R package is used throughout the paper as a reference
##                                                implementation.
## 
## 
## 
##                                           1    Introduction
## 
##                                           JavaScript Object Notation (JSON) is a text format for the serialization of structured data (Crockford, 2006a).
##                                           It is derived from the object literals of JavaScript, as defined in the ECMAScript Programming Language
##                                           Standard, Third Edition (ECMA, 1999). Design of JSON is simple and concise in comparison with other
##                                           text based formats, and it was originally proposed by Douglas Crockford as a “fat-free alternative to XML”
##                                           (Crockford, 2006b). The syntax is easy for humans to read and write, easy for machines to parse and generate
##                                           and completely described in a single page at http://www.json.org. The character encoding of JSON text
##                                           is always Unicode, using UTF-8 by default (Crockford, 2006a), making it naturally compatible with non-
##                                           latin alphabets. Over the past years, JSON has become hugely popular on the internet as a general purpose
##                                           data interchange format. High quality parsing libraries are available for almost any programming language,
##                                           making it easy to implement systems and applications that exchange data over the network using JSON. For
##                                           R (R Core Team, 2013), several packages that assist the user in generating, parsing and validating JSON
##                                           are available through CRAN, including rjson (Couture-Beil, 2013), RJSONIO (Lang, 2013), and jsonlite
##                                           (Ooms et al., 2014).
## 
##                                           The emphasis of this paper is not on discussing the JSON format or any particular implementation for using
## 
## 
##                                                                                                  1
```

```r
  # second page text
cat(txt[2])
```

```
## JSON with R. We refer to Nolan and Temple Lang (2014) for a comprehensive introduction, or one of the
## many tutorials available on the web. Instead we take a high level view and discuss how R data structures are
## most naturally represented in JSON. This is not a trivial problem, particulary for complex or relational data
## as they frequently appear in statistical applications. Several R packages implement toJSON and fromJSON
## functions which directly convert R objects into JSON and vice versa. However, the exact mapping between
## the various R data classes JSON structures is not self evident. Currently, there are no formal guidelines,
## or even consensus between implementations on how R data should be represented in JSON. Furthermore,
## upon closer inspection, even the most basic data structures in R actually do not perfectly map to their
## JSON counterparts, and leave some ambiguity for edge cases. These problems have resulted in different
## behavior between implementations, and can lead to unexpected output for certain special cases. To further
## complicate things, best practices of representing data in JSON have been established outside the R community.
## Incorporating these conventions where possible is important to maximize interoperability.
## 
## 
## 1.1    Parsing and type safety
## 
## The JSON format specifies 4 primitive types (string, number, boolean, null) and two universal structures:
## 
##    • A JSON object : an unordered collection of zero or more name/value pairs, where a name is a string and
##      a value is a string, number, boolean, null, object, or array.
## 
##    • A JSON array: an ordered sequence of zero or more values.
## 
## Both these structures are heterogeneous; i.e. they are allowed to contain elements of different types. There-
## fore, the native R realization of these structures is a named list for JSON objects, and unnamed list for
## JSON arrays. However, in practice a list is an awkward, inefficient type to store and manipulate data in R.
## Most statistical applications work with (homogeneous) vectors, matrices or data frames. In order to give
## these data structures a JSON representation, we can define certain special cases of JSON structures which get
## parsed into other, more specific R types. For example, one convention which all current implementations
## have in common is that a homogeneous array of primitives gets parsed into an atomic vector instead of a
## list. The RJSONIO documentation uses the term “simplify” for this, and we adopt this jargon.
## txt <- "[12, 3, 7]"
## x <- fromJSON(txt)
## is(x)
## 
## [1] "numeric" "vector"
## 
## print(x)
## 
## [1] 12   3   7
## 
## This seems very reasonable and it is the only practical solution to represent vectors in JSON. However the
## price we pay is that automatic simplification can compromise type-safety in the context of dynamic data.
## For example, suppose an R package uses fromJSON to pull data from a JSON API on the web, similar to
## the example above. However, for some particular combination of parameters, the result includes a null
## value, e.g: [12, null, 7]. This is actually quite common, many APIs use null for missing values or unset
## fields. This case makes the behavior of parsers ambiguous, because the JSON array is technically no longer
## 
## 
##                                                      2
```

