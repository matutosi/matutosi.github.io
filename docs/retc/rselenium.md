# Rseleniumでスクレイピング {#rselenium}

Seleniumは，ブラウザを使って動的に巡回しつつ，スクレイピングをするのに適している．

JavascriptやPHPなどを使って，動的に作成されるサイトでは，URLだけではページを特定することはできない．
そのため，rvestだけではデータを取得するのが困難である．

## 準備


- RSelenium: CRANからインストール   
- Selenium: 本家サイトからインストール    
  - 注意: ver3.xxx をインストールする    
  ver4.0 以上はRSeleniumが対応していない(Pythonなら可)    
  ver3の最終版は以下からダウンロード可能   
  https://github.com/SeleniumHQ/selenium/releases/tag/selenium-3.150.0   
  https://github.com/SeleniumHQ/selenium/releases/download/selenium-3.150.0/IEDriverServer_x64_3.150.2.zip   
- ブラウザのDriver   
  GoogleChromeの場合   
  https://chromedriver.chromium.org/downloads
  - 注意: 自身の利用しているブラウザのドライバが必要(バージョンも合致させる)   
  ブラウザが自動updateしていることがあるので，バージョンは要確認   
  - Seleniumと同じフォルダに保存する   


```r
install.packages("RSelenium")
```


```r
library(tidyverse)
library(RSelenium)
```



## ブラウザの自動化



## 

### 使い方




- Rからシェルのコマンドを使う    
  - Seleniumuの起動・終了    


### 注意点

## 要素の取得

idがわかるとき
document.getElementByID()

xpath
document.selectQueryAll()[]
動的にサイトが作られているときには，変化する可能性があるので注意


使用されているJavaScriptの関数がわかる
script <- ""
rem$excute(script)

例
- BiSSの文字サイズの変更   
- 種名リストの列数の変更   

スクレイピングの実行時には，適切な間隔を空ける．

- 通常は5秒以上を求めていることが多い   
- 最低でも1秒は空ける   

スクレイピング時に適切な間隔を空けるのは，サーバ負荷の軽減だけでなく，実務的な意味合いもある．
ページ遷移の命令を送信後，十分な間隔がないとHTMLの要素を取得しきれていないことがある．
極端な場合，サーバーからの情報がほとんど何も送られていない，つまりページの内容がほとんど何もないことにある．
この状況は，通常のマウス操作では何も表示されていないところをクリックするのと同じ状態である．
サーバからの情報を待つ意味でも適度な間隔を空けるのが望ましい．


動的なサイトの場合は，HTMLの構成中の可能性もある．
ログイン等のページでも，遷移途中のことがある．

