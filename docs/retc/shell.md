# shell {#shell}

- Rからシェルのコマンドを使う    
  - ファイルの移動    
  - PDFファイルの結合    
  - pngからPDFへ変換   

手作業でも良いが，ファイル数が多かったり，作業回数が多かったりするなら，自動化するのが便利である．
例えば，ファイルの操作やちょっとしたCUIアプリをコマンドでの動作をRでやってしまおうという邪道中の邪道である．
上記の操作をする際は，LinuxやMacであればshellスクリプトとして，Windowsであればバッチファイルとしてコードを書くのが本来の方法である．
しかし，shellスクリプトやバッチファイルのコマンドを体系的に勉強したことはない(その意味ではRの勉強もかなり怪しい)．
ウェブの情報をもとにしつつ，なんとなくコードを書いたことはある．
とはいえ変数の使い方などは特によくわからないので，ちょっとした操作にも時間がかかりそう．
そこで，慣れたRを使って雑多な操作をやっつけてしまおうと考えた．

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

Rの関数
shell(), system()
  コマンドの実行
setwd()
  ワーキングディレクトリの設定
  ディレクトリ名にスペースや日本語が入っていて，cdコマンドがうまくいかないときは，こっちのほうが便利
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

その他ツール
concatPDF
  PDFの結合など(win10 OK，win11 NG)
  # ConcatPDF /outfile Merged.pdf File1.pdf File2.pdf File3.pdf
 
pdftk
  PDFの結合など(win11 OK)
  pdftk File1.pdf File2.pdf File3.pdf cat output Merged.pdf

ImageMagick
  画像変換など

## 準備





## Pythonのスクリプト実行

```
wd <- "D:/matu/work/tmp"
setwd(wd)
system("c:/windows/py.exe pdf.py", intern = TRUE)
shell("pdf.py")
```
