# system()やshell()でOSコマンドの実行 {#shell}
<!--
-->

Rから`system()`でOSのコマンドを実行できる(Windowsでは`shell()`も使える)．
例えば，以下のようなことだ．

- ファイルの移動    
- PDFファイルの結合    
- pngからPDFへ変換   
- Pythonスクリプトの実行   

見れば分かるように，これらはこの文書で紹介するパッケージで実行できることとほぼ同じである．
この文書の執筆前は，便利なパッケージの存在自体を知らなかったため，かなり`system()`や`shell()`を使っていた．
しかし，便利なパッケージがあるのが分かれば，コマンドを自分で書く必要はない．
便利なものを使うのが良い．
わざわざ`system()`で実行するならば，自作のバッチファイル(Windows)やシェルスクリプト(MacやLinux)などだろうか．
あるいは自分で関数やパッケージを開発する際に使ってみることがあるかもしれない．
一応，こんなこともできるんだという程度に知っておけばよいだろう．

以下では，RからPythonとそのライブラリをインストールする．
普通ならシェルで直接実行するものだが，ここではRをシェルの代わりとして使う．
利点は，Rを起動していれば新たなシェルを起動せずにそのまま実行できること，返り値をRのオブジェクトに代入して使えることである．
欠点は，キー入力が若干増えることである．

## 準備

`system()`や`shell()`などはRのbaseパッケージに含まれている．
ここでは，組み合わせて使用するcurlパッケージをインストールしておく．


```r
install.packages("curl")
```


```r
library(tidyverse)
```

```
## Warning: package 'tidyverse' was built under R version 4.3.1
```

```
## Warning: package 'stringr' was built under R version 4.3.1
```

```
## -- Attaching core tidyverse packages ------------------------ tidyverse 2.0.0 --
## v dplyr     1.1.2     v readr     2.1.4
## v forcats   1.0.0     v stringr   1.5.0
## v ggplot2   3.4.2     v tibble    3.2.1
## v lubridate 1.9.2     v tidyr     1.3.0
## v purrr     1.0.1     
## -- Conflicts ------------------------------------------ tidyverse_conflicts() --
## x dplyr::filter() masks stats::filter()
## x dplyr::lag()    masks stats::lag()
## i Use the conflicted package (<http://conflicted.r-lib.org/>) to force all conflicts to become errors
```

```r
library(curl)
```

```
## Warning: package 'curl' was built under R version 4.3.1
```

```
## Using libcurl 7.84.0 with Schannel
## 
## Attaching package: 'curl'
## 
## The following object is masked from 'package:readr':
## 
##     parse_date
```

## 活用例：Pythonとそのライブラリのインストール {#install_python}

PythonとそのライブラリのインストールをRから実行してみよう．
Pythonを直接使わなくても，インストールしておいて損はない．
RにはないライブラリがPythonにはあり，reticulateパッケージを使えばRからPythonを実行できるためだ．
ここではさらに，キーボードとマウス操作の自動化で使用するPillowとPyAutoGUIというライブラリをインストールする．

### Pythonのイントール

まずは，Pythonのインストーラをダウンロードする．
Windowsの場合は，以下を実行するとデフォルトのブラウザでPythonのインストラのダウンロードページが開く．
なお，ここで利用している`shell.exec()`はWindowsで使える関数で，拡張子に関連付けられたファイルを実行するものである．


```r
shell.exec("https://pythonlinks.python.jp/ja/index.html")
```

MacやLinuxには，通常はデフォルトでPython3がインストールされている．
必要に応じてバージョンアップして欲しい．
また，Python2がインストールされていても，使わない場合はアンインストールしておくことをお勧めする．
複数のバージョンがインストールされていると，`Python`というコマンドでPython2が起動して混乱を招くおそれがあるためだ．
<!--
MacやLinuxの場合は，以下のコマンドが可能である．

```r
system("open https://pythonlinks.python.jp/ja/index.html")     # Mac
system("chrome https://pythonlinks.python.jp/ja/index.html &") # Linux
```
-->

2023年5月現在でのPythonの最新版は3.11.1なので，以下ではそのファイルのURLを入力している．
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
<!--
## TODO
インストール関係の画像をつける
-->
それ以外は，デフォルトのボタンをクリックしていけばOKである．

内容がわかっていて，自分流でインストールしたい場合はカスタマイズすると良い．
カスタマイズする場合でも，インストールする項目で`pip`のチェックは入れたままにしておく．
PillowとPyAutoGUIのインストールに使用するからだ．


```r
shell.exec(py_installer)
```

これでPythonがインストールできたはずだが，念のため確認しておく．
インストールしたバージョンによって表示が若干異なるが，以下のコードを実行してバージョンが表示されれば，Pythonのインストールは成功である．


```r
system("python -V", intern = TRUE)
```

```
## [1] "Python 3.11.1"
```

Pythonのインストールがうまくいかない場合は，以下を参考にして欲しい．

https://www.python.jp/install/windows/install.html

### PillowとPyAutoGUIのインストール

<!--

-->

次に，PillowとPyAutoGUIをインストールする．
インストールする前に，インストール済のライブラリを確認する．
`pip list`は，Pythonのライブラリ管理ソフトであるpipを使ってインストール済みライブラリ一覧を出力するコマンドである．
初めてPythonをインストールしたのであれば，一覧に何も表示されないはずなので，PillowとPyAutoGUIをインストールする．
もし，一覧の中に"Pillow"と"PyAutoGUI"という文字列があれば，インストールは不要である．


```r
cmd <- "pip list"
res <- system(cmd, intern = TRUE)
tibble::as_tibble(res) %>%
  dplyr::filter(stringr::str_detect(value, "Pillow|PyAutoGUI"))
## # A tibble: 0 × 1
## ℹ 1 variable: value <chr>
> 
```


```r
cmd <- "pip install Pillow PyAutoGUI"
res <- system(cmd, intern = TRUE)
head(res)
## [1] "Collecting Pillow"
## [2] "  Using cached Pillow-9.5.0-cp311-cp311-win_amd64.whl (2.5 MB)"
## [3] "Collecting PyAutoGUI"
## [4] "  Using cached PyAutoGUI-0.9.53-py3-none-any.whl"
## [5] "Requirement already satisfied: pymsgbox in c:\\users\\username\\appdata\\local\\programs\\python\\python~1\\lib\\site-packages (from PyAutoGUI) (1.0.9)"
## [6] "Requirement already satisfied: PyTweening>=1.0.1 in c:\\users\\username\\appdata\\local\\programs\\python\\python~1\\lib\\site-packages (from PyAutoGUI) (1.0.7)"
tail(res)
## [1] "Requirement already satisfied: pyperclip in c:\\users\\username\\appdata\\local\\programs\\python\\python~1\\lib\\site-packages (from mouseinfo->PyAutoGUI) (1.8.2)"
## [2] "Installing collected packages: Pillow, PyAutoGUI"
## [3] "Successfully installed Pillow-9.5.0 PyAutoGUI-0.9.53"
## [4] ""
## [5] "[notice] A new release of pip available: 22.3.1 -> 23.1.2"
## [6] "[notice] To update, run: python.exe -m pip install --upgrade pip"
```

最後の方に"Successfully installed Pillow-9.5.0 PyAutoGUI-0.9.53"のような表示があればインストールができているはずだ．
念のためpipで確認する．
以下では書き方をわざと変えているが，ライブラリのインストール前と実行内容は同じである．
一覧の中に"Pillow"と"PyAutoGUI"という文字列があれば，インストールされていることが確認できる．


```r
"pip list" %>%
  system(intern = TRUE) %>%
  tibble::as_tibble() %>%
  dplyr::filter(stringr::str_detect(value, "Pillow|PyAutoGUI"))
## # A tibble: 2 × 1
##   value               
##   <chr>               
## 1 Pillow          9.5.0 
## 2 PyAutoGUI       0.9.53
```

ところで，2つ前のコードのところで，"[notice]"としてpipの最新版がある．
これは，pipをバージョンアップしてはどうかという提案である．
せっかくなので，バージョンアップしておこう．


```r
res <- system("python.exe -m pip install --upgrade pip", intern = TRUE)
res
##  [1] "Requirement already satisfied: pip in c:\\users\\username\\appdata\\local\\programs\\python\\python~1\\lib\\site-packages (22.3.1)"
##  [2] "Collecting pip"
##  [3] "  Using cached pip-23.1.2-py3-none-any.whl (2.1 MB)"
##  [4] "Installing collected packages: pip"
##  [5] "  Attempting uninstall: pip"
##  [6] "    Found existing installation: pip 22.3.1"
##  [7] "    Uninstalling pip-22.3.1:"
##  [8] "      Successfully uninstalled pip-22.3.1"
##  [9] "  WARNING: The scripts pip.exe, pip3.11.exe and pip3.exe are installed in 'C:\\Users\\username\\AppData\\Local\\Programs\\Python\\PYTHON~1\\Scripts' which is not on PATH."
## [10] "  Consider adding this directory to PATH or, if you prefer to suppress this warning, use --no-warn-script-location."
## [11] "Successfully installed pip-23.1.2"
```

最後に"Successfully installed pip-23.1.2"のような表記があれば，バージョンアップ成功である．
これでPythonおよびライブラリPillowとPyAutoGUIのインストールさらにpipのバージョンアップが完了した．

## Windowsでのアプリ・ディレクトリの瞬間起動 {#run_in a_second}

ここでは，Windowsでの便利な機能を紹介する．
Pathの通ったところにショートカットを保存し，アプリやディレクトリを一発で起動できるというものである．
これは非常に便利な機能である．
デスクトップが多くのアプリのショートカットがあったり，スタートメニューからアプリを探す人にはぜひ使ってほしい．
これを覚えておくだけでもかなりの時間が節約できるだろう．

- ショートカットをパスの通ったディレクトリに保存   
- [Win] + [R] で「ファイル名を指定して実行」を起動    
- ショートカットの名称を入力して[Enter]   
- アプリやディレクトリが起動する    
なお，MacでもLinuxでもパスの通ったところにあるファイルやディレクトリであれば，シェルから起動できる．
Windowsの「ファイル名を指定して実行」の代わりとして，MacはSpotlight([Command] + [Space])が使える．

例えば，RStudioのショートカットをパスの通った`C:\Windows\System32`(システムファイルがあるので，パスが通っているはず)に"rst"という名前で保存すると(管理者権限が必要)，[Win] + [R]に続けて"rst"と入力するとRStudioを起動できる．
他のディレクトリにショートカットを保存する場合は，そのディレクトリにパスを通しておく．

上記のショートカットの作成やパスを通す作業はそれぞれ1回だけなのでマウスでの手作業でも全く問題ない．
でもせっかくなので，ここではRからショートカットを作成する．
もともとパスの通っている`C:\Windows\System32`にショートカットを作っても良いのだが，管理者権限が必要なためRからの操作が難しい．
そこで，`C:\Windows\USERNAME\shortcut`(USERNAMEは環境によって異なる)というディレクトリを作成し，ここにショートカットを保存するとともに，パスを通すことにする．
以下のコードでは，`shell()`を利用したautomaterの関数で，RStudioとRのショートカットを作成するとともに，ショートカットを作成したディレクトリにパスを通している．

```
  # RStudioのショートカット作成
  # 実際のパスと異なる場合は変更する
exe <- fs::path("C:/Program Files/RStudio/rstudio.exe")
shortcut <- "rst"
wd <- Sys.getenv("R_USER")
size = 3
res <- automater::make_shortcut(exe, shortcut = shortcut, size = size, wd = wd)

  # Rのショートカット作成
  # 実際のパスと異なる場合は変更する
exe <- fs::path(Sys.getenv("R_HOME"), "bin/x64/Rgui.exe")
shortcut <- "r"
 # --no-restore：環境を復元しない，--no-save：終了時に保存しない
 # --sdi：SDIで起動，--silent：起動時メッセージを出さない
arg <- "--no-restore --no-save --sdi --silent"
wd <- Sys.getenv("R_USER")
size = 3
res <- automater::make_shortcut(exe, shortcut = shortcut, arg = arg, size = size, wd = wd)

  # ショートカットを作成したディレクトリにパスを通す
new_path <- 
  fs::path_dir(res$shortcut) %>%
  automater::add_path()
```

これで，[Win] + [R]で出てきた「ファイル名を指定して実行」に"rst"を入力すればRStudio，"r"を入力すればRが起動する．


なお，`automater::make_shortcut`と`automater::add_path`の中身は以下のとおりである．
独自で関数を作成する際の参考になれば幸いである．


```r
automater::make_shortcut
```

```
## function (exe, shortcut = NULL, dir = NULL, arg = NULL, size = 1, 
##     wd = NULL) 
## {
##     exe <- double_quote(exe)
##     if (is.null(dir)) {
##         dir <- fs::path(Sys.getenv("USERPROFILE"), "shortcut")
##         if (!fs::dir_exists(dir)) {
##             fs::dir_create(dir)
##         }
##     }
##     else {
##         if (!fs::dir_exists(dir)) {
##             stop("directory ", dir, " not found!")
##         }
##     }
##     if (is.null(shortcut)) {
##         shortcut <- fs::path_file(exe)
##     }
##     shortcut <- fs::path(dir, shortcut) %>% fs::path_ext_set("lnk") %>% 
##         double_quote()
##     wsh <- paste0("$WsShell = New-Object -ComObject WScript.Shell;")
##     create <- paste0("$Shortcut = $WsShell.CreateShortcut(", 
##         shortcut, ");")
##     target <- paste0("$Shortcut.TargetPath = ", exe, ";")
##     icon <- paste0("$Shortcut.IconLocation = ", exe, ";")
##     size <- paste0("$ShortCut.WindowStyle = ", size, ";")
##     if (!is.null(arg)) {
##         arg <- double_quote(arg)
##         arg <- paste0("$ShortCut.Arguments = ", arg, ";")
##     }
##     if (!is.null(wd)) {
##         wd <- double_quote(wd)
##         wd <- paste0("$ShortCut.WorkingDirectory = ", wd, ";")
##     }
##     finish <- "$Shortcut.Save()"
##     input <- paste0(wsh, create, target, icon, size, arg, wd, 
##         finish)
##     cmd <- "powershell"
##     res <- shell(cmd, input = input, intern = TRUE)
##     shortcut <- stringr::str_remove_all_all(shortcut, "\"")
##     return(list(shortcut = shortcut, res = res))
## }
## <bytecode: 0x000001b0b21e5dd0>
## <environment: namespace:automater>
```

```r
automater::add_path
```

```
## function (new_path) 
## {
##     cmd <- "reg query \"HKEY_CURRENT_USER\\Environment\" /v \"path\""
##     path <- shell(cmd, intern = TRUE)[3] %>% stringr::str_remove(" *path *REG_[A-z]* *") %>% 
##         double_quote()
##     cmd <- paste0("setx path ", normalizePath(new_path), ";", 
##         path)
##     shell(cmd, intern = TRUE)
## }
## <bytecode: 0x000001b0b22946f0>
## <environment: namespace:automater>
```


<!--
  # Rから実行しなくても良いことではあるし，普通はシェルを使えば良い．
  # また，RStudioのTerminalを使っても同じことはできる．

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
・複数のディレクトリに入ったPDFファイルを1つのPDFに結合
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
