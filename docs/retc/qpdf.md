# qpdfでPDF操作 {#qpdf}


## 関数一覧


```r
library(qpdf)
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


```r
input <- ""
pdf_split(input, output = "d:/", password = "")
```
