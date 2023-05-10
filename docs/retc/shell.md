# system()やshell()でOSコマンドの実行 {#shell}
<!--
-->

Rから`system()`や`shell()'でOSのコマンドを実行できる．
例えば，以下のようなことだ．

- ファイルの移動    
- PDFファイルの結合    
- pngからPDFへ変換   
- Pythonスクリプトの実行   

見れば分かるように，これらはこの文書で紹介するRの各種パッケージで実行できることとほぼ同じである．
この文書の執筆前は，便利なパッケージの存在自体を知らなかったため，`system()`や`shell()`を使っていたことが結構あった．
しかし，便利なパッケージがあるのがわかれば，それを使わない手はない．
わざわざコマンドを自分で書く必要は少ないだろう．
実行するとすれば，自作のバッチファイル(Windows)やシェルスクリプト(MacやLinux)などだろうか．
あるいは，自分で関数やパッケージを開発する際に使ってみることがあるかもしれない．
一応，こんなこともできるんだという程度に知っておけばよいだろう．


## 準備

`system()`や`shell()'などはRのbaseパッケージに含まれている．
そのため，Rのインストール後はすぐに使えるため，本来は特に準備は不要である．
ここでは，組み合わせで使用するその他のパッケージをインストールしておく．


```r
install.packages("curl")
```


```r
library(tidyverse)
library(curl)
```

## 活用例：Pythonとそのライブラリのインストール

わざわざRから実行する必要性はないが，PythonとそのライブラリのインストールをRから実行してみよう．
Python自体を直接使わなくても，インストールしておいて損はない．
Rからreticulateパッケージを用いてPythonを使うことができるし，RにはないライブラリがPythonにはあるためだ．
また，Pythonと合わせて，キーボードとマウス操作の自動化で使用するPyAutoGUIというライブラリをインストールする．

### Pythonのイントール

まずは，Pythonのインストーラをダウンロードする．
Windowsの場合は，以下を実行するとデフォルトのブラウザでPythonのインストラのダウンロードページが開く．
その他のOSの場合は，自分でブラウザを起動してURLを開く．
なお，ここで利用している`shell.exec()`はWindowsで使える関数で，拡張子に関連付けられたファイルを実行するものである．


```r
"https://pythonlinks.python.jp/ja/index.html" %>%
  shell.exec()
```


2023年5月現在での最新版は3.11なので，以下ではそのファイルのURLを入力している．
最新版が異なる場合は，適宜URLを変更してほしい．
curl_downloadで一時ファイルとしてインストーラをダウンロードする．
なお，`py_installer`にはダウンロードした一時ファイル名を保存している．


```r
py_installer <- 
  "https://www.python.org/ftp/python/3.11.1/python-3.11.1-amd64.exe" %>%
  curl::curl_download(fs::file_temp(ext = "exe"))
```


<!--
## TODO
tempfileの削除が必要
-->

ダウンロードしたファイルを実行するために，再度`shell.exec()`を使う．
これを実行すると，Pythonのインストーラが起動するので，その指示に従ってPythonをインストールする．
最初の`Add python.exe to PATH`にチェックが入っていなければ，追加でチェックをすれば良いだろう．
それ以外は，デフォルトのボタンをクリックしていけばOKである．

内容がわかっていて，自分流でインストールしたい場合はカスタマイズすると良い．
カスタマイズする場合でも，インストールする項目で`pip`のチェックは入れたままにしておく．
ライブラリのPyAutoGUIのインストールに使用するからだ．


```r
shell.exec(py_installer)
```

これでPythonがインストールできたはずだが，念のため確認をしておく．
インストールしたバージョンによって表示が若干ことなるが，バージョンが表示されていれば，インストールは成功である．


```r
system("python -V", intern = TRUE)
```

```
## [1] "Python 3.9.13"
```

### PyAutoGUIのインストール



次に，PyAutoGUIをインストールする．
インストールする前に，インストールされているライブラリを確認しておく．
"pip list"は，pipというPythonのライブラリを管理ソフトで
インストール済みライブラリの一覧を出力するコマンドである．
その結果を取得して，"PyAutoGUI"という文字列があるか確認している．
一覧に何も表示されなければ，PyAutoGUIはないので，インストールの必要がある．


```r
cmd <- "pip list"
res <- system(cmd, intern = TRUE)
tibble::as_tibble(res) %>%
  dplyr::filter(stringr::str_detect(value, "PyAutoGUI"))
```

```
## # A tibble: 0 x 1
## # i 1 variable: value <chr>
```


```r
cmd <- "pip install PyAutoGUI"
res <- system(cmd, intern = TRUE)
tail(res)
```

```
## [1] "Requirement already satisfied: pygetwindow>=0.0.5 in c:\\python\\python39\\lib\\site-packages (from PyAutoGUI) (0.0.9)"        
## [2] "Requirement already satisfied: mouseinfo in c:\\python\\python39\\lib\\site-packages (from PyAutoGUI) (0.1.3)"                 
## [3] "Requirement already satisfied: pyrect in c:\\python\\python39\\lib\\site-packages (from pygetwindow>=0.0.5->PyAutoGUI) (0.2.0)"
## [4] "Requirement already satisfied: pyperclip in c:\\python\\python39\\lib\\site-packages (from mouseinfo->PyAutoGUI) (1.8.2)"      
## [5] "Installing collected packages: PyAutoGUI"                                                                                      
## [6] "Successfully installed PyAutoGUI-0.9.53"
```

最後に"Successfully installed PyAutoGUI-0.9.53"のような表示があればインストールができたはずだ．
念のためpipで確認しておく．
以下はわざと書き方を変えているが，やっていることはPyAutoGUIのインストール前とやっていることは同じである．


```r
"pip list" %>%
  system(intern = TRUE) %>%
  tibble::as_tibble() %>%
  dplyr::filter(stringr::str_detect(value, "PyAutoGUI"))
```

```
## # A tibble: 1 x 1
##   value                           
##   <chr>                           
## 1 PyAutoGUI                 0.9.53
```



<!--

## Pythonのスクリプト実行

```
wd <- "D:/matu/work/tmp"
setwd(wd)
system("c:/windows/py.exe pdf.py", intern = TRUE)
shell("pdf.py")
```

## その他の活用法
setwd()
  ワーキングディレクトリの設定
paste0()
  文字列の結合
stringrの関数
stringiの関数
  多くの関数はstringrにラッパーがあるが，文字コードの変換などはstringiの関数が必要
  日本語文字を使わなければ不要
  ファイル名の命名規則を決めておき，お世話にならない方が幸せ
purrr::map()
  for loopの代わり
  # ファイル名を取得する関数など


手作業でも良いが，ファイル数が多かったり，作業回数が多かったりするなら，自動化するのが便利である．
例えば，ファイルの操作やちょっとしたCUIアプリをコマンドでの動作をRでやってしまおうという邪道中の邪道である．
上記の操作をする際は，LinuxやMacであればshellスクリプトとして，Windowsであればバッチファイルとしてコードを書くのが本来の方法である．
しかし，shellスクリプトやバッチファイルのコマンドを体系的に勉強したことはない(その意味ではRの勉強もかなり怪しい)．
ウェブの情報をもとにしつつ，なんとなくコードを書いたことはある．
とはいえ変数の使い方などは特によくわからないので，ちょっとした操作にも時間がかかりそう．
そこで，慣れたRを使って雑多な操作をやっつけてしまおうと考えた．


  ## 
以下のような操作を自動化する．
・複数のフォルダに入ったPDFファイルを1つのPDFに結合
・結合後のファイルを指定場所に移動
・元ファイルを削除

なお，以下は基本的にwindowsでの操作を前提としているが，LinuxやMacでも同じあるいは類似のコマンドで代用できる可能性が高い．
日本語文字が入っていると，操作に若干手間がかかることが多い．


dosコマンド
ls, dir
  ファイル，ディレクトリの一覧を取得
move, copy, remove, rename
  ファイルの移動，コピー，削除, リネーム
cd
  ディレクトリの移動

その他ツール
concatPDF
  PDFの結合など(win10 OK，win11 NG)
  # ConcatPDF /outfile Merged.pdf File1.pdf File2.pdf File3.pdf
 
pdftk
  PDFの結合など(win11 OK)
  pdftk File1.pdf File2.pdf File3.pdf cat output Merged.pdf

ImageMagick
  画像変換など
-->
