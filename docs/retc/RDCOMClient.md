# RDCOMClientでpdfとdocxを相互変換 {#RDCOMClient}

RDCOMClientはWindowsに特化したパッケージのため他のOSでは利用できない．


## 準備


CRANには登録されておらず，ウェブページかGitHubからインストールする．
`install.packages()`でインストールする場合は，バイナリなので比較的時間が早いがRのバージョンによってはうまくインストールできないかもしれない．
`install_github()`の場合は，コンパイルするのに少し時間がかかる．


```r
  # どちらか一方でうまくいけばOK
utils::install.packages("RDCOMClient", repos = "http://www.omegahat.net/R", type = "win.binary")
devtools::install_github("omegahat/RDCOMClient")
devtools::install_github("matutosi/automater")
```


```r
library(tidyverse)
library(RDCOMClient)
library(automater)
```

## RDCOMClient


```r
convert_docs
```

```
## function (path, format) 
## {
##     if (fs::path_ext(path) == format) {
##         return(invisible(path))
##     }
##     no <- switch(format, docx = 11, pdf = 17, xps = 19, html = 20, 
##         rtf = 23, txt = 25)
##     path <- normalizePath(path)
##     suppressWarnings({
##         converted <- normalizePath(path_convert(path, pre = "converted_", 
##             ext = format))
##     })
##     wordApp <- RDCOMClient::COMCreate("Word.Application")
##     wordApp[["Visible"]] <- TRUE
##     wordApp[["DisplayAlerts"]] <- FALSE
##     doc <- wordApp[["Documents"]]$Open(path, ConfirmConversions = FALSE)
##     doc$SaveAs2(converted, FileFormat = no)
##     doc$close()
##     return(invisible(converted))
## }
## <bytecode: 0x000002405835a210>
## <environment: namespace:automater>
```

`convert_docs()`の中でファイルの読み込み・保存でファイル名を指定する．
その際に`normalizePath()`を使う必要がある．
この部分を別の関数に置き換えても大丈夫かと考えて，`fs::path_norm()`を使ってみたところエラーになった．
このように，コードを改善しようとする場合は，作業の結果としてうまく動作しないことがよくり，注意が必要である．

`doc$SaveAs2()`の`FileFormat = no`で保存形式をそれに対応する数値で指定している．
このあたりは，試行錯誤の結果である．
もしかしたら他の形式での保存が可能なのかもしれないが，確実に変換できるのは以下の5つである．

- pdf：PDF
- xps：XML Paper Specification(xmlベースファイル形式)   
- html：HTML   
- rtf：リッチテキスト   
- txt：テキスト   


なお，`convert_docs()`の実行時には，MS Wordを起動してその機能としてファイルの読み込み・保存をする．
そのため，MS Wordがインストールされていないと，この関数は使えない．


複数のdocxファイルを圧縮したzipファイルがあり，ファイル解凍，PDFへの変換，1つのPDFファイルへの結合をするようなコードは以下のとおりである．
結合時の順序はファイル名の順序に従う．
そのため，PDFファイルでのファイル順を踏まえて，docxの命名規則を決める必要がある．

- `unzip()`で解凍   
- `fs::dir_ls()`でファイル名取得   
- `convert_docs()`で形式変換   
- `qpdf_combine()`で結合


<!--

```r
files <- 
  "C:/Users/matu/Desktop" %>%
  fs::dir_ls()
files %>%
  purrr::walk(convert_docs, format = "pdf")
```



### 変換実行
  # https://stackoverflow.com/questions/32846741/convert-pdf-file-to-docx/73720411#73720411
  # https://stackoverflow.com/questions/49113503/how-to-convert-docx-to-pdf



```r
library(RDCOMClient)
wordApp <- COMCreate("Word.Application")
wordApp[["Visible"]] <- TRUE
wordApp[["DisplayAlerts"]] <- FALSE
path_To_PDF_File <- "xxx.pdf"
path_To_Word_File <- "xxx.docx"
doc <- 
  wordApp[["Documents"]]$Open(normalizePath(path_To_PDF_File), 
    ConfirmConversions = FALSE)
doc$SaveAs2(path_To_Word_File)
```

### ラッパー関数


```r
library(RDCOMClient)
pdf2docx <- function(pdf, docx = NULL){
  if(is.null(docx)){
    docx <- paste0(getwd(), sub("pdf", "docx", pdf))
  }
  wordApp <- RDCOMClient::COMCreate("Word.Application")
  wordApp[["Visible"]] <- TRUE
  wordApp[["DisplayAlerts"]] <- FALSE
  doc <- 
    wordApp[["Documents"]]$Open(normalizePath(pdf), ConfirmConversions = FALSE)
  doc$SaveAs2(docx)
  doc$close()
}

wd <- "d:/matu/work/tmp/"
setwd(wd)
path_docx <- function(path_pdf){
  if(grepl("[A-z]:", path_pdf)){
    return(sub("pdf", "docx", path_pdf))
  }
  path <- file.path(getwd(), sub("pdf", "docx", path_pdf))
  return(sub("//", "/", path))
}
testthat::expect_equal(path_docx("a.pdf"                 ), "d:/matu/work/tmp/a.docx"     )
testthat::expect_equal(path_docx("d:/matu/work/tmp/a.pdf"), "d:/matu/work/tmp/a.docx"     )
testthat::expect_equal(path_docx("test/a.pdf"            ), "d:/matu/work/tmp/test/a.docx")
testthat::expect_equal(path_docx("/test/a.pdf"           ), "d:/matu/work/tmp/test/a.docx")


wd <- "d:/"
setwd(wd)
pdf2docx("a.pdf")
```


## pdf2docx


-->
