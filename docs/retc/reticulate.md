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
library(automater)
```

### PythonとPyAutoGUIのインストール

[Pythonとそのライブラリのインストール](#install_python)を参照して，PythonとPyAutoGUIをインストールしておく．


### 使用するPythonの指定

バージョンや形態の異なるPythonを複数インストールすることが可能である．
[Pythonとそのライブラリのインストール](#install_python)で説明したようなPythonパッケージのインストーラを用いたもの(パッケージ版Python)もあれば，Microsoft Store版のPythonもある．
さらに，Anacondaをインストールしてその中でPythonを使うこともできる．
色々とあってややこしいが，この文章ではパッケージ版Pythonを使うことにする．
reticulateで使用するPythonとしてインストールしたパッケージ版Pythonを指定する．
なお，AnacondaなどのPythonを使う場合は，別途インストールして，`use_condaenv()`で指定する．


```r
find_python <- function(){
  os <- get_os()
  python_path <- 
    ifelse(os == "win", "where python", "which python") %>%
    system(intern = TRUE) %>%
    fs::path()
  return(python_path)
}

path <- find_python()
path
reticulate::use_python(path)
```

`path`に複数の文字列が入っているときは，複数のPythonがインストールされている．
そのときは，`path[1]`のように指定しなければならない．
また，Windowsで以下のようなpathがある場合は，アプリ実行エイリアスの設定を変更すると良い．

C:/Users/your_user_name/AppData/Local/Microsoft/WindowsApps/python.exe

参考：https://hrkworks.com/it/programming/python/py-4421/

## Pythonを使ってみる


```r
system("pip list", intern = TRUE) %>%
  tibble::as_tibble()
```

```
## # A tibble: 31 x 1
##    value                   
##    <chr>                   
##  1 Package         Version 
##  2 --------------- --------
##  3 art             5.9     
##  4 contourpy       1.0.7   
##  5 cycler          0.11.0  
##  6 fire            0.5.0   
##  7 fonttools       4.39.3  
##  8 kiwisolver      1.4.4   
##  9 lxml            4.9.2   
## 10 matplotlib      3.7.1   
## # i 21 more rows
```

```r
system("pip install numpy", intern = TRUE)
```

```
## [1] "Requirement already satisfied: numpy in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (1.24.2)"
```

```r
system("pip install matplotlib", intern = TRUE)
```

```
##  [1] "Requirement already satisfied: matplotlib in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (3.7.1)"                                       
##  [2] "Requirement already satisfied: contourpy>=1.0.1 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (1.0.7)"               
##  [3] "Requirement already satisfied: cycler>=0.10 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (0.11.0)"                  
##  [4] "Requirement already satisfied: fonttools>=4.22.0 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (4.39.3)"             
##  [5] "Requirement already satisfied: kiwisolver>=1.0.1 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (1.4.4)"              
##  [6] "Requirement already satisfied: numpy>=1.20 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (1.24.2)"                   
##  [7] "Requirement already satisfied: packaging>=20.0 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (23.1)"                 
##  [8] "Requirement already satisfied: pillow>=6.2.0 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (9.5.0)"                  
##  [9] "Requirement already satisfied: pyparsing>=2.3.1 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (3.0.9)"               
## [10] "Requirement already satisfied: python-dateutil>=2.7 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from matplotlib) (2.8.2)"           
## [11] "Requirement already satisfied: six>=1.5 in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (from python-dateutil>=2.7->matplotlib) (1.16.0)"
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


## PyAutoGUIで画像認識した場所にマウスポインターを動かしてクリックする



```r
pag <- reticulate::import("pyautogui")  # 呼び出し時は小文字で
```

Pythonに慣れていない筆者は何度かコケてしまったのが，Pythonでライブラリが大文字を含んでいても，呼び出すときは小文字で指定するようだ．


```r
pag$moveTo(10, 10)
pag$moveTo(100, 100, duration=3)

img <- "d:/button.png"
system.time(position <- pag$locateOnScreen(img))
get_center <- function(position){
  x <- position$left + (position$width / 2)
  y <- position$top +  (position$height / 2)
  return(list(x = x, y = y))
}
get_center(position)
pag$moveTo(get_center(position)$x, get_center(position)$y)
```


```r
target_range <- (500, 500, 100, 100)
pag$locateOnScreen(img)
  # region=target_range
  # grayscale = True
  # confidence = 0.6
```


```r
system("pip install art", intern = TRUE)
```

```
## [1] "Requirement already satisfied: art in c:\\users\\matutosi\\appdata\\local\\programs\\python\\python311\\lib\\site-packages (5.9)"
```


```r
art <- reticulate::import("art")
art$tprint("Hellow world!")
art$tprint("HAPPY", font = "block", chr_ignore = TRUE)
```



```r
reticulate::source_python("test.py")
```


<!--
PyAutoGUIで画像認識した場所にマウスポインターを動かしてクリックする
https://take-tech-engineer.com/pyautogui-image/
pyautogui.click('button.png') # Find where button.png appears on the screen and click it.
-->




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
