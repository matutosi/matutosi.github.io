# reticulate

RとPythonのパッケージは，相互に移植されていることが多い．
例えば，Pythonのlogging(とRのfutile.logger)をもとにRのパッケージloggerは開発されている．
https://cran.r-project.org/web/packages/logger/index.html
また，Rのggplot2やdplyrはPythonにも移植されている．

ただし，どちらか片方でしか利用できなかったり，使用方法が難しいことがある．
そんなとき，ちょっとだけ使うのであれば，Rのパッケージreticulateが便利である．
もちろん，Pythonをちゃんと勉強するのも良いだろう．
さらに，reticulateを使うとRとPythonとの変数のやり取りが簡単にできるので，本格的にPythonを使うのにも良さそう．

## 準備



```r
install.packages("reticulate")
```


```r
library(tidyverse)
library(reticulate)
```



### Pythonのインストール

PyAutoGuiのインストール

<!--
PyAutoGUIで画像認識した場所にマウスポインターを動かしてクリックする
https://take-tech-engineer.com/pyautogui-image/
pyautogui.click('button.png') # Find where button.png appears on the screen and click it.
-->


## Pythonでのモジュール(パッケージ)のインストール

Rstudioでpythonを書く (reticulate)
https://qiita.com/Wa__a/items/42129e529cfb6c38e046

py_install()やconda_install()でパッケージがインストールできないとき
- pip でパッケージをインストール   
- pipでインストールできたpythonをreticulate::use_python()で指定


準備
- Pythonのインストール   
```
```

## 実行



## PythoとRとの変数のやり取り

variableは変数名

```
  # RからPythonへ(Pythonで取り出し)
r.variable

  # PythonからRへ(Rで取り出し)
py$variable
```

<!--


```
## memo
  # pdf2docxのインストール   
pip install pdf2docx
```


```r
  # pdf2docxの読み込みでエラーになるとき
  #   reticulate::use_python()でpythonを指定
  #   pipでpdf2docxがインストールできたpythonを使う
library(reticulate)
  # reticulate::py_install("pdf2docx") エラー
  # https://anaconda.org/conda-forge/python-docx
  # reticulate::conda_install(channel = "conda-forge", packages = "python-docx")  # できたけど，pdf2docxは読み込めず
reticulate::use_python("C:/Python/Python39/python.exe")
reticulate::py_run_string("from pdf2docx import parse")
reticulate::py_run_string("pdf_file = 'D:/a.pdf'")
reticulate::py_run_string("docx_file = 'D:/a.docx'")
reticulate::py_run_string("parse(pdf_file, docx_file)")
```
-->
