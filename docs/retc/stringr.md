# stringrで文字列操作{#stringr}

## はじめに

stringrはstringiパッケージのラッパー関数群である．
stringiは文字列操作の関数群で，文字コードの変換なども含む多様な関数を含んでいる．
通常のユーザの文字列操作なら，stringrで大丈夫なことが多い．
万が一，込み入った文字列操作が必要なときは，stringiの関数を探してみると良いかもしれない．

stringrには，

## stringrとbase

### baseパッケージ




### stringrパッケージ




## 準備


```r
install.packages("stringr")
```

```
## package 'stringr' successfully unpacked and MD5 sums checked
## 
## The downloaded binary packages are in
## 	C:\Users\matu\AppData\Local\Temp\Rtmpa4WCHK\downloaded_packages
```

```r
library(stringr)
```

## stringrの関数



## stringrの利点

少なくとも自分の経験では，stringrだけで操作が完結することはほとんどない．
逆に，パッケージ開発をしていてstringr(やdplyr)を使わずに一日が終わることもあまりない．
つまり，stringrはかなり便利で必要不可欠なツールである．
もちろん，baseパッケージの同様の関数を使っても機能上は問題ないことが多い．
でも，引数の指定方法に一貫性があると，コードを綺麗に書くことができる．
綺麗なコードは，汚いコードよりも書きやすいし，見た目も良いし，何よりもバグが入りにくい(入らないわけではない)．

