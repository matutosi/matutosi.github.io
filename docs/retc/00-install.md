# Rのインストール {#install}

Rのインストール方法は，ネットでも多く掲載されている．
ここでは，オプションの個人的な好みを強調しつつ説明する．

## ダウンロード

OSに合わせたインストーラをダウンロードする．
Windowsの場合は，「Download R-4.x.x for Windows」(xはバージョンで異なる)をダウンロード．

https://cran.r-project.org/bin/windows/base/

<img src="img/install_01.png" width="70%">

## インストーラの起動

ダウンロードしたファイルをクリック．

<img src="img/install_02.png" width="70%">
<img src="img/install_03.png" width="70%">
<img src="img/install_03j.png" width="70%">

- インストール中に使用する言語   
何でも大丈夫なので，好きなものを選ぶ．

<img src="img/install_04.png" width="70%">
<img src="img/install_04j.png" width="70%">
<img src="img/install_04je.png" width="70%">

- インストールの確認   
「Next」「次へ」をクリック．

<img src="img/install_05.png" width="70%">

- インストール先のフォルダ   
そのままでOK．好みがあれば変更する．

<img src="img/install_06.png" width="70%">

- インストールするもの

<img src="img/install_07.png" width="70%">
<img src="img/install_07c.png" width="70%">

とりあえず，すべてチェックしておくくと良いです．
Message translationは，Rからのメッセージを日本語に翻訳するかどうかです．
チェックを入れないと，英語のみの表示です．

結論としえは，とりあえずチェックを入れておき，必要に応じて英語で表示させるという方法が良いかもしれません．
チェックを入れておくと，エラーメッセージなどを日本語で表示させることができます．
「そら日本語のほうが良いやん」と思うかもしれません．
ただでもよくわからないエラーメッセージが英語で表示されたら，わけがわからないからです．
ただ，プログラミングの世界では，英語でのエラーメッセージのほうが便利なことが結構あります．
それは，エラーメッセージをそのままネットで検索するときです．
日本語でのエラーメッセージだとネット上の情報が限られています．
一方，英語でのエラーメッセージで検索すると，原因や対処方法をかなりの確率で知ることができます．


```r
  # https://cell-innovation.nig.ac.jp/SurfWiki/R_errormes_lang.html
  Sys.getenv("LANGUAGE") # 設定の確認
  # 設定の変更方法
  Sys.setenv(LANGUAGE="en") # 英語に変更
  Sys.setenv(LANGUAGE="jp") # 日本語に変更
```

- オプションの選択  

<img src="img/install_08.png" width="70%">

とりあえず「Yes」を選択．
以下のオプションを選択するかどうか．


- ウィンドウの表示方法(MDI / SDI)の選択   

<img src="img/install_09.png" width="70%">

個人的な好みはSDIですが，好みの問題ですので正直どちらでも大丈夫．
MDIは大きな1つのWindowの中に，コンソール(プログラムの入力部分)，グラフ，ヘルプなどが表示される．
SDIはコンソール，グラフ，ヘルプが別々のWindowとして表示される．
どちらかといえば，自由度が高い．

<img src="img/install_mdi.png" width="70%">
<img src="img/install_sdi.png" width="70%">

- ヘルプの表示方法(Plain text / HTML help)の選択   

<img src="img/install_10.png" width="70%">

個人的な好みはPlain textだが，好みの問題ですので正直どちらでも構わない．
Plain textはテキストファイルで表示されるシンプルな作り．
HTML helpはヘルプがブラウザ(GoogleChrome等)で表示される．
関連する関数などへのリンクが表示されるので，それらを参照するのは便利．

- その後の設定

その他は，既定値(そのまま)でOK．

<img src="img/install_11.png" width="70%">
<img src="img/install_12.png" width="70%">
<img src="img/install_13.png" width="70%">
<img src="img/install_14.png" width="70%">


## インストール完了

インストールが完了すると，アイコンがデスクトップに表示される．

<img src="img/install_15.png" width="70%">
