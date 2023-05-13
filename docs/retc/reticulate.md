# reticulateでPythonを使う {#reticulate}

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
library(automater)
```

### PythonとPyAutoGUIのインストール

[Pythonとそのライブラリのインストール](#install_python)を参照して，PythonとPyAutoGUIをインストールしておく．


### 使用するPythonの指定 {#identify_python}

バージョンや形態の異なるPythonを複数インストールすることが可能である．
[Pythonとそのライブラリのインストール](#install_python)で説明したようなPythonパッケージのインストーラを用いたもの(パッケージ版Python)もあれば，Microsoft Store版のPythonもある．
さらに，Anacondaをインストールしてその中でPythonを使うこともできる．
色々とあってややこしいが，この文章ではパッケージ版Pythonを使うことにする．
reticulateで使用するPythonとしてインストールしたパッケージ版Pythonを指定する．
なお，AnacondaなどのPythonを使う場合は，別途インストールして，`use_condaenv()`で指定する．


```r
find_python <- function(){
  os <- automater::get_os()
  python_path <- 
    ifelse(os == "win", "where python", "which python") %>%
    system(intern = TRUE) %>%
    fs::path() %>%
    stringr::str_subset("Python311")
  return(python_path)
}

path <- find_python()
path
```

```
## [1] "C:/Users/matu/AppData/Local/Programs/Python/Python311/python.exe"
```

```r
reticulate::use_python(path)
```

`path`に複数の文字列が入っているときは，複数のPythonがインストールされている．
例えば，以下のような文字列が入っている可能性がある

C:/Users/your_user_name/AppData/Local/r-miniconda/envs/r-reticulate/python.exe
C:/Users/your_user_name/AppData/Local/Microsoft/WindowsApps/python.exe

このように複数の文字列がpathに入っているときは，`path[1]`のように指定しなければならない．
上記のうち，後者(最後がWindowsApps/python.exeの方)のときは，アプリ実行エイリアスの設定でチェックを外すと良い．


参考：https://hrkworks.com/it/programming/python/py-4421/

## Pythonを使ってみる


```r
system("pip list", intern = TRUE) %>%
  tibble::as_tibble()

system("pip install numpy", intern = TRUE)
system("pip install matplotlib", intern = TRUE)
```


```r
np <- reticulate::import("numpy") # import numpy as npと同じ
x <- np$random$rand(as.integer(100))
y <- np$random$rand(as.integer(100))
tibble::tibble(x, y) %>%
  ggplot2::ggplot(aes(x, y)) +
    ggplot2::geom_point()
```

![](reticulate_files/figure-latex/unnamed-chunk-5-1.pdf)<!-- --> 

Pythonで，`np.random.rand`と表記するものをRで使うには，`np$random$rand`とする．
Rのオブジェクトに代入してしまえば，あとは慣れたもので簡単に散布図が作成できる．


### Hellow World


```r
system("pip install art", intern = TRUE)
```

```
## [1] "Requirement already satisfied: art in c:\\users\\matu\\appdata\\local\\programs\\python\\python~1\\lib\\site-packages (5.9)"
```


```r
art <- reticulate::import("art")
art$tprint("Hellow world!")
art$tprint("HAPPY", font = "block", chr_ignore = TRUE)
```

## Pythonのコードを実行



```r
reticulate::source_python("test.py")
```


## Pythonの呼び出し

`repl_python()`

```r
repl_python()
Python 3.11.1 (C:/Users/matu/AppData/Local/Programs/Python/Python311/python.exe)
Reticulate 1.28 REPL -- A Python interpreter in R.
Enter 'exit' or 'quit' to exit the REPL and return to R.
>>>
```

## PythoとRとの変数のやり取り

variableは変数名


```r
  # RからPythonへ(Pythonで取り出し)
r.variable

  # PythonからRへ(Rで取り出し)
py$variable
```

Pythonでのモジュールとはファイル(`*.py`)のことで，モジュールをまとめたものがパッケージ，パッケージをまとめたものがライブラリである．
このライブラリを`pip install`でインストール，`import()`でインポートしている．
つまり，Rでのパッケージにあたるのが，Pythonでのライブラリである．


<!--
  ## Pythonでのモジュール(パッケージ)のインストール
Rstudioでpythonを書く (reticulate)
https://qiita.com/Wa__a/items/42129e529cfb6c38e046

py_install()やconda_install()でパッケージがインストールできないとき
- pip でパッケージをインストール   
- pipでインストールできたpythonをreticulate::use_python()で指定
-->


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


```r
  # USB取り出し用の画像のトリミング(作業済)
library(tidyverse)
path <- 
  "D:/matu/work/ToDo/automater/inst/img" %>%
  fs::dir_ls(regexp = "png") 
img <- 
  path %>%
  purrr::map(magick::image_read) %>%
  purrr::map(magick::image_trim)
purrr::map2(img, path, magick::image_write)
```

```
## $`D:/matu/work/ToDo/automater/inst/img/34gb.png`
## D:/matu/work/ToDo/automater/inst/img/34gb.png
## 
## $`D:/matu/work/ToDo/automater/inst/img/media.png`
## D:/matu/work/ToDo/automater/inst/img/media.png
## 
## $`D:/matu/work/ToDo/automater/inst/img/up_arrow.png`
## D:/matu/work/ToDo/automater/inst/img/up_arrow.png
```

```r
path
```

```
## D:/matu/work/ToDo/automater/inst/img/34gb.png
## D:/matu/work/ToDo/automater/inst/img/media.png
## D:/matu/work/ToDo/automater/inst/img/up_arrow.png
```



```r
  # 画面サイズの取得だが，実際は拡大をしていたりするので，ちょっと数字が違う
  # system("wmic path Win32_VideoController get VideoModeDescription,CurrentVerticalResolution,CurrentHorizontalResolution /format:value")
```

