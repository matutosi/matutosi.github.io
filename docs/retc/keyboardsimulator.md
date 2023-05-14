# KeyboardSimulatorでマウス・キーボードの自動化 {#keyboardsimulator}

<!--
-->

<!--
https://github.com/ChiHangChen/KeyboardSimulator/

PyAutoGUIみたいに，画像認識でクリックしてくれるパッケージはなさそう

rMouse cran
  # http://cran.nexr.com/web/packages/rMouse/vignettes/rMouseVignette.html
  # archivedになっているが，記録する関数は使えそう
-->

Rから直接操作しづらいくても，マウスやキーボードを用いて決まった操作をするものは自動化可能である．

## 準備

キーボードとマウスの自動操作のパッケージKeyboardSimulatorをインストールする．


```r
install.packages("KeyboardSimulator")
```


```r
library(tidyverse)
library(KeyboardSimulator)
```

KeyboardSimulatorでは，マウスやキーボードの操作とマウス位置の取得は可能であるものの，アイコンの画像をもとにして画面上でのマウスの位置を自動的に取得することができない．
マウス位置の取得のために，PythonとそのライブラリPyAutoGUIを使用する．
これらのインストールがまだの場合は，[Pythonとそのライブラリのインストール](#install_python}を参考にして，PythonとPyAutoGUIをインストールする．

また，RからPythonを使うためにreticulateを呼び出しておく．


```r
library(reticulate)
```

さらに，[使用するPythonの指定](#identify_python)を参考にreticulateで使用するPythonを指定する．
以下のように直接Pythonのパスを指定しても良いし，`find_python()`を使用しても良い．




```r
reticulate::use_python("your_python_path")
```


## キーボード操作の自動化


```r
KeyboardSimulator::keybd.press("Win+r")
```

## マウスの位置取得

マウス操作で重要なのは画面上での位置を取得することである．

KeyboardSimulatorには，マウス位置を取得する関数`mouse.get_cursor()`がある．
1箇所だけならこの関数で十分だが，何度かマウスをクリックする作業の場合は何度も実行しないと行けないのでちょっとめんどくさい．


```r
KeyboardSimulator::mouse.get_cursor()
 ## [1] -3297  1306
```

以下で関数を作成するUSBの取り外しの際には，タスクバーとRウインドウとの行き来をしていると，タスクバーの操作がもとに戻ってしまうことがあり，正しいマウスの位置を取得するのが難しいことがある．
そこで，一定時間の間隔でマウス位置を取得するautomaterの関数を利用する．
関数の内容は以下のとおりである．


```r
automater::mouse_record
```

```
## function (n = 5, interval = 1) 
## {
##     x <- list()
##     y <- list()
##     for (i in seq(n)) {
##         if (interval < 0) {
##             user_input("Press any keys on R console")
##         }
##         else {
##             automater::sleep(interval)
##         }
##         x[[i]] <- KeyboardSimulator::mouse.get_cursor()[1]
##         y[[i]] <- KeyboardSimulator::mouse.get_cursor()[2]
##         position <- paste0(i, ": x = ", x[[i]], ", y = ", y[[i]], 
##             "\n")
##         cat(position)
##     }
##     return(list(x = unlist(x), y = unlist(y)))
## }
## <bytecode: 0x0000019f762950a8>
## <environment: namespace:automater>
```

sleep()を挟んで，n回分の位置を取得するだけの関数である．
実行すると以下のような結果が得られる．
位置を表示させているのが煩わしければ，ループ中の最後の2行を削除すれば良い．



```r
position <- automater::mouse_record()
position
 ## 1: x = 680, y = 587
 ## 2: x = 162, y = 482
 ## 3: x = 94, y = 1250
 ## 4: x = 816, y = 1352
 ## 5: x = 773, y = 511
 ## $x
 ## [1] 680 162  94 816 773
 ## 
 ## $y
 ## [1]  587  482 1250 1352  511
```


## USBメモリの安全な取り出しの自動化

パッケージとして存在する可能性は否定できないが，多分ないと思われるものとして「USBの安全な取り出し」を自動化する機能がある．
タスクバーにあるUSBのアイコンを何度かクリックして，USBを安全に取り出せるようにするものである．
この作業をしなくても，USBディスクが壊れることはほとんど無いだろうが，作業したことに越したことは無い．
単純な操作だが，何度もやっていると面倒くさいし，しかも自分のように老眼の人間には避けたい作業である．


マウスをどこでクリックしているのか，あらかじめ位置を取得しておく必要がある．
`mouse_record()`を使えば，マウス位置を簡単に取得できる．


```r
position <- automater::mouse_record(n = 4, interval = -1)
position
 ## $x
 ## [1]  770  730  700 1040
 ## $y
 ## [1] 1900 1800 1760 1750
```

USBメモリの安全な取り出しをする前の位置にマウスを戻したい場合は，あらかじめ`pos`に代入しておき，最後にその位置に戻す．
あとは，上で取得した位置にマウスを移動させ，順次クリックしていくだけだ．
実際にUSBメモリをパソコンに取り付け，


```r
pos <- KeyboardSimulator::mouse.get_cursor()
automater::mouse_move_click( 770,1900)
automater::mouse_move_click( 730,1800)
automater::mouse_move_click( 700,1760)
automater::mouse_move_click(1040,1750)
automater::mouse_move_click(pos[1], pos[2])
```

この内容を`remove_usb.rsc`といったテキストファイルとして保存しておけば，`remove_usb.rsc`をクリックするだけでUSBメモリの安全な取り出しを自動化できる．
さらに，`c:\windows\system32`のディレクトリに`remove_usb.rsc`のショートカットを`ru`として保存し，[Win] + [R]のファイル名を指定して実行に`ru`と入力すれば，`remove_usb.rsc`が実行されてUSBメモリの安全な取り出しが一発で出来るようになる．

## PyAutoGUIで画像認識した場所にマウスポインターを動かしてクリックする

<!--
PyAutoGUIで画像認識した場所にマウスポインターを動かしてクリックする
https://take-tech-engineer.com/pyautogui-image/
pyautogui.click('button.png') # Find where button.png appears on the screen and click it.
-->

アイコンの位置が固定されている，つまりマウスのクリック位置が固定されているのであれば，`automater::mouse_move_click(1040,1750)`のような定位置での作業が良い．
しかし，ウィンドウの位置が異なったり，タスクバー上での位置が変化したりして，クリックするべき位置が一定でないことがある．

クリックする対象を画像ファイルとして用意できるのであれば，その画像をもとにしてクリックするべき位置を決定できる．
Rのパッケージではこれを実現できなさそうなので，PythonのPyAutoGUIを利用する．



```r
pag <- reticulate::import("pyautogui")  # 呼び出し時は小文字で
```

Pythonに慣れていない筆者は何度かコケてしまったのが，Pythonでライブラリが大文字を含んでいても，呼び出すときは小文字で指定するようだ．


```r
pag$moveTo(10, 10)
pag$moveTo(100, 100, duration=3)

img <- path <- "D:/matu/work/ToDo/automater/inst/img/up_arrow.png"
position <- pag$locateOnScreen(img)
get_center <- function(position){
  x <- position$left + (position$width / 2)
  y <- position$top +  (position$height / 2)
  return(list(x = x, y = y))
}
get_center(position)
pag$moveTo(get_center(position)$x, get_center(position)$y)
```


```r
library(rJava)
.jinit()
toolkit <- J("java.awt.Toolkit")
default_toolkit <- .jrcall(toolkit, "getDefaultToolkit")
dim <- .jrcall(default_toolkit, "getScreenSize")
width <- .jcall(dim, "D", "getWidth")
height <- .jcall(dim, "D", "getHeight")
```


```r
recog_image_click <- function(img, pag, ...){
  position <- 
    img %>%
    pag$locateOnScreen(...) %>%
    get_center()
  automater::mouse_move_click(position$x, position$y)
}
w <- 600
h <- 200
region <- c(width - w, height - h, w, h)
path <- "D:/matu/work/ToDo/automater/inst/img"
img <- fs::dir_ls(path, regexp = "png") 
pos <- KeyboardSimulator::mouse.get_cursor()
recog_image_click(img[3], pag, region = region)
recog_image_click(img[2], pag, region = region)
recog_image_click(img[1], pag, region = region)
mouse_move_click(pos[1], pos[2])

  # region = region
  # grayscale = True
  # confidence = 0.6
```


<!--
PyAutoGUIで画像認識した場所にマウスポインターを動かしてクリックする
https://take-tech-engineer.com/pyautogui-image/
pyautogui.click('button.png') # Find where button.png appears on the screen and click it.
-->


