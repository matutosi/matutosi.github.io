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


パッケージとして存在する可能性は否定できないが，多分ないと思われるものとして「USBの安全な取り出し」を自動化する機能がある．
タスクバーにあるUSBのアイコンを何度かクリックして，USBを安全に取り出せるようにするものである．
この作業をしなくても，USBディスクが壊れることはほとんど無いだろうが，作業したことに越したことは無い．
単純な操作だが，何度もやっていると面倒くさいし，しかも自分のように老眼の人間には避けたい作業である．

他にも，Rから直接操作しづらいくても，マウスやキーボードを用いて決まった操作をするものは自動化可能である．

## 準備


```r
install.packages("KeyboardSimulator")
```


```r
library(tidyverse)
library(KeyboardSimulator)
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
## <bytecode: 0x000001271d560cd8>
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


## 「USBの安全な取り出し」の自動化



```r
mouse.move(630, 650) # DP: リモートデスクトップへの接続


  # purrr::map2(mouse_move_click)

pos <- KeyboardSimulator::mouse.get_cursor()
automater::mouse_move_click( 770,1900)
automater::mouse_move_click( 730,1800)
automater::mouse_move_click( 700,1760)
automater::mouse_move_click(1040,1750)
automater::mouse_move_click(pos[1], pos[2])
```
