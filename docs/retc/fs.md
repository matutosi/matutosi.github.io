# sfでファイル操作{#sf}

## はじめに

Windowsならコマンドプロンプト(古い言い方なら，いわゆるdos窓)，MacならTerminal，Linuxならシェルを使えば，各種ファイル操作をコマンドラインで実行できる．
もちろん，マウスを使った操作でも構わないが，多くのファイルでの名前の変更やファイル名によるフォルダの振り分けなら，マウス操作よりもコマンドを使った操作が早いし確実である．
なお，Windowsの場合は [Win] + [R] で「ファイル名を指定して実行」で「cmd」と入力すれば，

コマンドプロンプトやバッチファイル(あるいはシェルスクリプト)などでの操作に慣れていれば，それが便利である．
ただ，dosコマンドの変数の扱いは，慣れていないと結構難しい(慣れていても?)．
そんなときは，Rの関数(shell()，system())を使って，dosコマンドを駆使して，ファイル名を取得・名前の変更をすることができる．
既にdosコマンドを書いていれば，shell()などを使うのは良い方法である．

また，Rのbaseパッケージにはファイル操作のための関数が多くある．
例えば，list.files()でファイル名一覧を取得でき，file.rename()でファイル名の変更ができる．
しかし，baseの関数群の中には名前が分かりにくい点や引数の一貫性が無い点などの難点がある．
これは，Rが発展していく中で徐々に関数が追加されたことによるようだ．

sfパッケージでは，baseの関数群を整理するとともに，新たな有用な関数が追加されている．
そのため，命名規則が一貫しており，ベクトル化した引数を受け付けるため，非常に使いやすい．

なお，fs，base，shellの詳細な比較が，以下のURLにあるので，参照してほしい．   
https://cran.r-project.org/web/packages/fs/vignettes/function-comparisons.html

## shell, baseパッケージ, fsパッケージ

ファイル名を変更したいとする．
a.pdfを01.pdfに，b.pdfを02.pdfにのように10個のファイル名を変更する．

### shell

shellなら，以下のようなコマンドだ．
dosコマンドの変数やループなどを駆使すると，もっと短く書けるのかもしれないが，残念ながらそのような知識がない．
テキストファイルで書いてもそれほど時間がからないだろうが，ファイル数が多くなれば大変だ．

```
rename a.pdf 01.pdf
rename b.pdf 02.pdf
rename c.pdf 03.pdf
...
rename j.pdf 10.pdf
```

### baseパッケージ

基本的にtidyverseの関数群を使わず，できるだけRの標準の関数を使った例を示す．
sprintf()は使い慣れていないと，どのように指定するべきか分かりにくい．


```r
old <- paste0(letters[1:10], ".pdf")
new <- paste0(sprintf("%02.f", 1:10), ".pdf")
file.rename(old, new)
```

### fsパッケージ

fsパッケージとともに，stringrを使った例を示す．
ファイル操作をする際には，文字列の置換・検索などをすることが多いので，stringrが役立つ．
stringrパッケージの関数は，str_*の名前になっているため，覚えやすい．
fsパッケージの関数は，ファイル操作はfile_*，ディレクトリ操作はdir_*，パス操作はpath_*という名前がついている．


```r
library(stringr)
old <- str_c(letters[1:10], ".pdf")
new <- str_c(str_pad(1:10, width = 2, side = "left", pad = "0"), ".pdf")
file_move(old, new)
```

## 準備


```r
install.packages("sf")
```

```
## also installing the dependencies 'proxy', 'e1071', 'wk', 'classInt', 's2', 'units'
```

```
## package 'proxy' successfully unpacked and MD5 sums checked
## package 'e1071' successfully unpacked and MD5 sums checked
## package 'wk' successfully unpacked and MD5 sums checked
## package 'classInt' successfully unpacked and MD5 sums checked
## package 's2' successfully unpacked and MD5 sums checked
## package 'units' successfully unpacked and MD5 sums checked
## package 'sf' successfully unpacked and MD5 sums checked
## 
## The downloaded binary packages are in
## 	C:\Users\matu\AppData\Local\Temp\Rtmps387qM\downloaded_packages
```

```r
library(sf)
```

```
## Linking to GEOS 3.9.3, GDAL 3.5.2, PROJ 8.2.1; sf_use_s2() is TRUE
```

## sfの関数群 (WIP)

<!--
TODO: 以下のページを参考にして，関数の概要を書く
  https://cran.r-project.org/web/packages/fs/vignettes/function-comparisons.html
-->

- ディレクトリ操作(一覧，移動，複製，削除など)    
- ファイル操作(移動，複製，削除など)    
- パス操作   

## sfを使ったファイル操作例

ごく個人的なことだが，Rのバージョンアップ時にはRconsoleとRProfile.siteを古いバージョンから複製して，カスタマイズした設定を引き継いでいる．
バージョンアップをそれほど頻繁にしないのであれば，手作業でコピーしてもそれほど問題はない．
普通のRユーザなら常に最新版を使わなくても良い．
ただ，Rパッケージの開発をしていると，開発中のパッケージが依存しているパッケージが最新版のRで開発されている旨の警告がでることが結構ある．
ごく最近までは，手作業でファイルをコピーしていたが，よく考えたらこういった作業は自動化するべきだと気づいた．
そこで，sfパッケージ(とstringr)を使ってファイルをコピーするスクリプトを作成した．


```r
  # Script to copy Rconsole for updating R
  # RをバージョンアップしたときのRconsoleの複製スクリプト
  #   https://gist.github.com/matutosi/6dab3918402662f081be5c17cc7f9ce2
library(fs)
library(stringr)
wd <- str_replace(R.home(), "R-([0-9]\\.*){3}", "")
setwd(wd)
dir <- dir_ls()
d_old <- dir[length(dir)-1]
d_new <- dir[length(dir)]
files <- c("Rconsole", "Rprofile.site")
f_old <- path(d_old, "etc", files)
f_new <- path(d_new, "etc")
file_copy(f_old, f_new, overwrite = TRUE)
```

このように，定期的あるいはバージョンアップなどに伴うファイルのコピーや移動はそれなりにあるように思う．
そのような場合は，fsとstringrを組み合わせて，作業を自動化するとよいだろう．

