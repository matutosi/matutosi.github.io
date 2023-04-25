# fsでファイル操作{#fs}

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

fsパッケージでは，baseの関数群を整理するとともに，新たな有用な関数が追加されている．
そのため，命名規則が一貫しており，ベクトル化した引数を受け付けるため，非常に使いやすい．

複数のOSを使う場合は，コマンドが異なるためそれぞれでコマンドを覚えなければならない．
いちいち個別のものを覚えるよりも，fsパッケージの関数を覚えておけば，どのOSであろうが同じように動作してくれて楽ができる．

なお，fs，base，shellの詳細な比較が，以下のURLにあるので，参照してほしい．   
https://cran.r-project.org/web/packages/fs/vignettes/function-comparisons.html

## shell，baseパッケージ, fsパッケージ

a.pdf, b.pdf, ..., j.pdfを01.pdf, 02.pdf, ..., 10.pdfのように10個のファイル名を変更したいとする．

### shellを使う

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
fsパッケージの関数は，パス操作はpath_*，ディレクトリ操作はdir_*，ファイル操作はfile_*という名前がついている．


```r
library(stringr)
old <- str_c(letters[1:10], ".pdf")
new <- str_c(str_pad(1:10, width = 2, side = "left", pad = "0"), ".pdf")
file_move(old, new)
```

## 準備


```r
install.packages("fs")
```


```r
library(fs)
```

## fsの関数群

パス操作(path_*)，ディレクトリ操作(dir_*)，ファイル操作(file_*)の関数群に分けることができる．
パス操作には，baseやshellにはない機能が多くあって，使いやすい．
拡張子を取り除くた関数を自作したことがあるが，同じような関数(しかもおそらく，fsのほうがしっかりしている)があることを見つけたときには，
下位機能の車輪を再発明してしまったと後悔した．

fs，base，shellの比較は次のURLを参照して欲しい．

https://cran.r-project.org/web/packages/fs/vignettes/function-comparisons.html


### パス操作    

パス操作では，stringrを駆使して自作しないといけないような関数が多くある．
特に，パスからディレクトリ名，ファイル名，拡張子を抽出してくれる関数は便利だ．
自作してもそれほど難しくはないが，(少なくとも自分の)自作した関数にはバグが入っている可能性がある．
予想外のパスを指定した場合には，予想外の結果になることがあるだろう．
そのような不具合を防ぐためにも，fsパッケージのパス関数を使うほうが良さそうである．


```r
path("top_dir", "nested_dir", "file", ext = "ext") # パス作成   
path_temp(), path_temp("path") # 一時パス名の作成   
path_expand("~/path") # "~"をユーザのホームディレクトリに変換したパス   
path_dir("path") # パスからディレクトリ名抽出   
path_file("path") # パスからファイル名抽出   
path_ext("path") # パスから拡張子抽出   
path_ext_remove("path") # パスから拡張子を削除   
path_home() # ホームディレクトリ   
path_package("pkgname", "dir", "file") # パッケージのパス名   
path_norm("path") # 参照や".."の削除   
path_real("path") # 実体パス(シンボリックリンクを実体パスに)   
path_abs("path") # 絶対パス
path_rel("path/foo", "path/bar") #  相対パス  
path_common(c("path/foo", "path/bar", "path/baz")) # パスの共通部分   
path_ext_set("path", "new_ext") # 拡張子変更   
path_sanitize("path") # 無効な文字を削除   
path_join("path") # 結合
path_split("path") # 分割
```

### ディレクトリ操作    

shellやbaseでも同様の機能があるが，複数処理のdir_map()やツリー表示のdir_tree()は単純に嬉しい．


```r
dir_ls("path") # 一覧   
dir_info("path") # 情報   
dir_copy("path", "new-path") # 複写   
dir_create("path") # 作成   
dir_delete("path") # 削除   
dir_exists("path") # 有無確認   
dir_move() (see file_move) # 移動   
dir_map("path", fun) # 複数処理   
dir_tree("path") # ツリー表示   
```



### ファイル操作   

ファイル操作はshellやbaseとそれほど変わらない感じがする．


```r
file_chmod("path", "mode") # 権限変更   
file_chown("path", "user_id", "group_id") # 所有者変更   
file_copy("path", "new-path") # 複写   
file_create("new-path") # 作成   
file_delete("path") # 削除   
file_exists("path") # 有無確認   
file_info("path") # 情報   
file_move("path", "new-path") # 移動   
file_show("path") # 開く   
file_touch() # アクセス時間等の変更   
file_temp() # 一時ファイル名の作成   
```


## fsを使ったファイル操作例

ごく個人的なことだが，Rのバージョンアップ時にはRconsoleとRProfile.siteを古いバージョンから複製して，カスタマイズした設定を引き継いでいる．
バージョンアップをそれほど頻繁にしないのであれば，手作業でコピーしてもそれほど問題はない．
普通のRユーザなら常に最新版を使わなくても良い．
ただ，Rパッケージの開発をしていると，開発中のパッケージが依存しているパッケージが最新版のRで開発されている旨の警告がでることが結構ある．
ごく最近までは，手作業でファイルをコピーしていたが，よく考えたらこういった作業は自動化するべきだと気づいた．
そこで，fsパッケージを使ってファイルをコピーするスクリプトを作成した．


```r
  # Script to copy Rconsole for updating R
  # RをバージョンアップしたときのRconsoleの複製スクリプト
  #   https://gist.github.com/matutosi/6dab3918402662f081be5c17cc7f9ce2
library(fs)
library(magrittr)
wd <- 
  path_package("base") %>%
  path_split() %>%
  unlist() %>%
  .[-c((length(.) - 2):length(.))] %>%
  path_join()  
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
そのような場合は，fsを活用して作業を自動化するとよいだろう．
なお，fsで対応していない部分の文字列操作には，stringrを使うと便利である．

