# pdfをdocxに変換 {#pdf2docx}


## RDCOMClient

https://github.com/omegahat/RDCOMClient
CRANにはないが，

### インストール

```r
install.packages("RDCOMClient", 
  repos = "http://www.omegahat.net/R", 
  type = "win.binary")
```

### 変換実行
https://stackoverflow.com/questions/32846741/convert-pdf-file-to-docx/73720411#73720411


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


