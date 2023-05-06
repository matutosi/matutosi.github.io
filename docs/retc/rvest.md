# rvestでスクレイピング {#rvest}

## スクレイピング

ここでのスクレイピングとは，ウェブスクレイピングの省略のことで，ウェブサイトにある情報を収集することである．
ウェブサイトから植生調査データを収集することはほとんどないものの，関連データの収集は可能である．
例えば，気象庁のページから気象データが収集可能である．
もちろん，気象データは手動でも収集可能ではあるが，多大な手間と長い時間が必要である．
研究に必要なデータを自動で取得できれば，手間と時間の節約が可能である．

そこで，本稿ではウェブでの情報収集の方法を紹介することを目的とする．
世界の各地点の気象データをプロット
情報収集にはRのパッケージであるrvestを用いる．
rvestを用いて気象庁のページから世界の気象データを入手して，気候ダイアグラムを描画する．


Rのパッケージ作成では，rvestを用いて作成した関数と収集したデータをまとめたパッケージの作成方法を紹介する．
著者自身，他人のためにパッケージをつくることは考えておらず，基本的には自分の研究や作業のための関数をまとめることを目的としてパッケージをいくつか作成した．
作成したら，ついでに他人にも使ってもらえれば嬉しいという程度である．

過去に作成した関数は，しばらくすると関数の引数や返り値がどのようなものであったのか忘れてしまいがちである．
パッケージをつくる(特にCRANに登録する)には，引数，返り値，使用例などをまとめる必要がある．
きっちりまとめなくても良いのではあるが，決まった形式の方がむしろまとめやすい．
また，RStudioとusethis, testthat, devtoolsなどのパッケージを使ってパッケージ開発すると，各種チェックやテストが可能である．
各種チェックやテストでたくさんのエラーを見ると，チェックやテストは正直なところ煩わしいと感じる．
特に，パケージ開発に慣れていないと特にそうである．
しかし，チェックやテストをすることで，関数の完成度を確実に高めることができるため，パッケージとしてまとめる利点である．


## rvest と RSelenium

スクレイピングをするために使われる主なRのパッケージとしては，rvestとRSeleniumがある．
rvestは，静的なサイトを対象とするときに役立つ．
つまり，URLを指定すれば対象のサイトのページが決まるときである．
気象庁での気象データを提供しているページがこれに当たる．
一方，RSeleniumは動的なサイトを対象とするときに役立つ．
例えば，テキストボックスへのデータ入力やプルダウンメニューの選択あるいはその後のマウス操作でページが遷移する場合である．
このような動的なサイトでは，Seleniumだけでなく，Javascriptを部分的に用いるのも効果的である．
なお，rvestでもユーザ名とパスワードを用いた一般的なログインは可能である．
また，politeパッケージと組み合わせることである程度の動的なサイトのスクレイピングは可能である．

<!--
CRANには，植生データの取得のためのパッケージがある．
  # 本当?
  # 海外のもの
しかし，自分のもとめるデータがあるとは限らない．
特に日本のデータの取得は少ない．

--> 

## rvestのできること

- HTMLの取得    
- DOMの取得: id, class, tagNameなどを用いる   
- tableの取得    
  - HTML内の取得したいデータはtableにあることが多いため，非常に便利
  そもそも，tableでないデータを取得するのは非常に不便
- リンクの取得  
  ページ遷移に使用する   
  - stringrと組み合わせて使うと良い   
  - 文字コードの変換にはstringiを用いる   
  - tidyverseやmagrittrとの合せ技が便利    
- Formの入力・選択
  - radioボタンはちょっと工夫が必要   
  -` moranajp::html_radio_set()`   
    無理やりな感じではあるが，同一名称のradioボタンを全て同じ値に変更する   
    本来なら，不要なradioボタンのフォームを削除   
      可能だが，インデクスがずれるので結構厄介  
- politeパッケージとの連携   
  使えば便利だが，ここでは説明せず

## 準備

例によってrvestをインストールする．
curlとpoliteパッケージは少しだけ使うので予めインストールしておく．
tidyverseは既にインストールしているはずだが，まだの場合はインストールする．


```r
install.packages("rvest")
install.packages("curl")
install.packages("polite")
  # install.packages("moranajp")
  # install.packages("tidyverse") # 未インストールの場合
```


```r
library(rvest)
library(tidyverse)
```

## HTMLの取得

スクレイピングによってデータを取得するには，取得したいページのURLを特定しなければならない．
静的なページあるいは固定されたURLであれば，ブラウザのアドレスバーにあるURLをそのまま使えば良い．
動的あるいは特定の規則に従ったURLであれば，取得したいページのURLの規則性を知らなければならない．

ここでは，「日本のレッドデータ検索システム」から都道府県のRDB指定状況とその地図情報の画像を入手することを考える．

http://jpnrdb.com/search.php?mode=spec   

まずはブラウザでページにアクセス，手作業で検索，指定状況とその地図情報の画像を入手してみる．
上記URLで例として示されているニッコウキスゲをキーワード(種名)として入力すると，ページ遷移する．
アドレスバーにはカタカナがそのまま表示されている．
しかし，アドレスをコピーしてテキストエディタに貼り付けると文字化けしたようになる．
<!--
http://jpnrdb.com/search.php?mode=key&q=ニッコウキスゲ   
http://jpnrdb.com/search.php?mode=key&q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2
-->
これはURLエンコードによってコード変換された結果であるが安心して欲しい．
rvestを使ってHTMLを取得するときには，日本語をそのまま使用することができる．
上記のURLのうち「 http://jpnrdb.com/search.php?mode= 」まではここで使用するページに共通する部分であるため，mainとしておく．
検索したい種名は変更する部分で，とりあえずspに入れておく．
キーワード検索の命令(phpによるクエリ)と種名の文字列を結合し，さらにmainと結合する．
これで得たURLを`read_html()`に与えると，ページのHTMLを得ることができる．


```r
main <- "http://jpnrdb.com/search.php?mode="
sp <- "ニッコウキスゲ"
find_sp <- paste0("key&q=", sp)
html <- 
  paste0(main, find_sp) %>%
  rvest::read_html()
html
```

```
## {html_document}
## <html>
## [1] <body>\n<em></em>\n\n<title>日本のレッドデータ検索システム</title>\n<meta http-equiv="co ...
```

## 必要な情報の取得

取得したHTMLには必要な情報が含まれているが，そのままの状態では使い物にならない．
また，文字列に変換してstringrを駆使すれば，情報を得ることはできるだろうが，多大な苦労が待っている．


```r
as.character(html)
```

```
## [1] "<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.0 Transitional//EN\" \"http://www.w3.org/TR/REC-html40/loose.dtd\">\n<html><body>\n<em></em>\n\n<title>日本のレッドデータ検索システム</title>\n<meta http-equiv=\"content-type\" content=\"text/html;charset=utf-8\">\n<link rel=\"stylesheet\" type=\"text/css\" media=\"all\" href=\"./rdb.css\">\n<div id=\"wrapper\">\n<!-- START HEADER -->\n<div id=\"header\"><h1>日本のレッドデータ検索システム</h1></div>\n<a href=\"index.html\"><img src=\"pic/images/header_top_01.gif\" border=\"0\"></a><img src=\"pic/images/header_top_02.gif\"><!-- START CONTENTS --><!-- レッドデータについて --><div align=\"center\">\n    <table width=\"780px\" cellspacing=\"0\" cellpadding=\"0\"><tr>\n<td>\n<a href=\"rdb_category.html\"><img src=\"pic/images/header_top_03.gif\" alt=\"レッドデータカテゴリ\" width=\"140\" height=\"48\" border=\"0px\" title=\"レッドデータカテゴリ\"></a><a href=\"history.html\"><img src=\"pic/images/header_top_04.gif\" alt=\"レッドデータの歴史\" width=\"140\" height=\"48\" border=\"0px\" title=\"レッドデータの歴史\"></a><a href=\"category.html\"><img src=\"pic/images/header_top_05.gif\" alt=\"カテゴリと生物名称\" width=\"140\" height=\"48\" border=\"0px\" title=\"カテゴリと生物名称\"></a><a href=\"publish.html\"><img src=\"pic/images/header_top_06.gif\" alt=\"レッドデータ掲載種\" width=\"140\" height=\"48\" border=\"0px\" title=\"レッドデータ掲載種\"></a><a href=\"bunken.html\"><img src=\"pic/images/header_top_07.gif\" alt=\"参考文献一覧\" width=\"110\" height=\"48\" border=\"0px\" title=\"参考文献一覧\"></a><a href=\"link.html\"><img src=\"pic/images/header_top_08.gif\" alt=\"リンク集\" title=\"リンク集\" width=\"110\" height=\"48\" border=\"0\"></a>\n</td>\n      </tr></table>\n<!-- END HEADER --><!-- START CONTENTS --><img src=\"pic/search_title_spec.jpg\"><!-- 検索履歴をセット --><table width=\"780px\" cellspacing=\"0\" cellpadding=\"0\"><tr>\n<td height=\"5px\"><div id=\"place\"> <a href=\"index.html\">ホーム</a> | <a href=\"?mode=spec\">キーワード検索</a>\r\n &gt;&gt; <a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2\">ニッコウキスゲ</a>\r\n &gt;&gt; <a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=06\">維管束植物</a>\n</div></td>\t\r\r\n</tr></table>\n<!--メニュー--><table width=\"780px\" cellspacing=\"0\" cellpadding=\"1\"><tr>\n<td> </td>\t\r\r\n\t\t\t   <td width=\"100px\"><a href=\"?mode=kind\"><img src=\"pic/search_btn_kind.jpg\" alt=\"分類群検索\" width=\"100\" height=\"35\" border=\"0px\" title=\"分類群検索\"></a></td>\r\r\n\t\t\t   <td width=\"100px\"><a href=\"?mode=region\"><img src=\"pic/search_btn_pref.jpg\" alt=\"都道府県検索\" width=\"100\" height=\"35\" border=\"0px\" title=\"都道府県検索\"></a></td>\r\r\n\t\t\t   <td width=\"100px\"><a href=\"?mode=rank\"><img src=\"pic/search_btn_rank.jpg\" alt=\"RDBカテゴリ検索\" width=\"100\" height=\"35\" border=\"0px\" title=\"RDBカテゴリ検索\"></a></td>\r\n\t\t\t   <td width=\"60px\"><a href=\"javascript:subwin('search_help.html','window1','top=10,left=10,width=680,height=600,menubar=yes,scrollbars=yes,resizable=yes,status=yes')\" alt=\"HELP\"><img src=\"pic/icon_help.gif\" border=\"0\"></a></td>\t\t\t   \r\r\n\t\t\t   <td width=\"6px\"> </td>\r\r\n</tr></table>\n<!--/メニュー--><table width=\"480\" align=\"center\" cellspacing=\"0\" cellpadding=\"0\">\n<tr>\n<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=01\" alt=\"哺乳類の検索結果に切り替えます\" title=\"哺乳類の検索結果に切り替えます\"><img src=\"./pic/mammal_t.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\r\n\t  \r\n\t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=02\" alt=\"鳥類の検索結果に切り替えます\" title=\"鳥類の検索結果に切り替えます\"><img src=\"./pic/bird_t.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\r\n\t  \r\n\t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=03\" alt=\"両生類の検索結果に切り替えます\" title=\"両生類の検索結果に切り替えます\"><img src=\"./pic/ryosei_f.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\r\n\t  \r\n\t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=04\" alt=\"爬虫類の検索結果に切り替えます\" title=\"爬虫類の検索結果に切り替えます\"><img src=\"./pic/hachurui_f.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\t\t\r\n\t \t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=05\" alt=\"魚類の検索結果に切り替えます\" title=\"魚類の検索結果に切り替えます\"><img src=\"./pic/fish_t.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\t\t\r\n\t \t  \t\t<td width=\"80\"><img src=\"./pic/ikansoku_t.gif\" alt=\"維管束植物の検索結果を表示しています\" title=\"維管束植物の検索結果を表示しています\"></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（2）</td>\t\t\r\n\t  \t  \t  \r\n\r\n\t</tr>\n<tr>\n<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=07\" alt=\"昆虫類の検索結果に切り替えます\" title=\"昆虫類の検索結果に切り替えます\"><img src=\"./pic/konchu_f.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\r\n\t \t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=08\" alt=\"菌類の検索結果に切り替えます\" title=\"菌類の検索結果に切り替えます\"><img src=\"./pic/kinrui_f.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\t\t\r\n\t \t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=09\" alt=\"地衣類の検索結果に切り替えます\" title=\"地衣類の検索結果に切り替えます\"><img src=\"./pic/chiirui_f.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\t\t\r\n\t \t  \t   \r\n\t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=10\" alt=\"苔類の検索結果に切り替えます\" title=\"苔類の検索結果に切り替えます\"><img src=\"./pic/koke_f.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\t\t\r\n\t  \r\n\t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=11\" alt=\"無脊椎動物の検索結果に切り替えます\" title=\"無脊椎動物の検索結果に切り替えます\"><img src=\"./pic/musekitui_f.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\r\n\t \t\t \r\n\t \t\t<td width=\"80\"><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;subn=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;k=12\" alt=\"藻類の検索結果に切り替えます\" title=\"藻類の検索結果に切り替えます\"><img src=\"./pic/morui_f.gif\"></a></td>\r\n\t\t<td class=\"kind_list\" width=\"30\">（0）</td>\t\t\r\n\t \t \r\n\t</tr>\n<tr>\n<td colspan=\"12\" align=\"right\">()内は検索該当件数を表す</td>\r\n\t</tr>\n</table>\n<table class=\"title_kekka\" width=\"780px\" height=\"40px\" cellspacing=\"0\" cellpadding=\"0\">\n<tr>\n<td class=\"title_count\">[維管束植物] <b>2</b>件該当データがあります</td>\n<td class=\"title_link\"></td>\n</tr>\n<tr><td colspan=\"2\" class=\"title_link\">\r\n  リスト形式 | <a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;disp=thumb\" alt=\"検索結果を地図表示形式で表示します\" title=\"検索結果を地図表示形式で表示します\">地図表示形式</a>\r\n </td></tr>\n</table>\n<div id=\"list\" style=\"display:inline\">\r\n<table class=\"table_kekka\" width=\"780px\" border=\"0\" cellspacing=\"1\" align=\"center\">\n<tr>\n<th class=\"list_midashi\">目録No<a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=cta\" alt=\"目録Noの小さい順に表示します\" title=\"目録Noの小さい順に表示します\">▲</a><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=ctd\" alt=\"目録Noの大きい順に表示します\" title=\"目録Noの大きい順に表示します\">▼</a>\n</th>\r\n\t\t<th class=\"list_midashi\">上位分類群<a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=oda\" alt=\"目名のアイウエオ順にソートします\" title=\"目名のアイウエオ順にソートします\">▲</a><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=odd\" alt=\"目名のアイウエオの逆順にソートします\" title=\"目名のアイウエオの逆順にソートします\">▼</a>\n</th>\r\n\t\t<th class=\"list_midashi\">科名<a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=fma\" alt=\"科名をアイウエオ順にソートします\" title=\"科名をアイウエオ順にソートします\">▲</a><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=fmd\" alt=\"科名をアイウエオの逆順にソートします\" title=\"科名をアイウエオの逆順にソートします\">▼</a>\n</th>\r\n\t\t<th class=\"list_midashi\">和名<a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=jpa\" alt=\"和名をアイウエオ順にソートします\" title=\"和名をアイウエオ順にソートします\">▲</a><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=jpd\" alt=\"和名をアイウエオの逆にソートします\" title=\"和名をアイウエオの逆順にソートします\">▼</a>／学名\r\n\t\t                             <a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=sca\" alt=\"学名をアルファベット順にソートします\" title=\"学名をアルファベット順にソートします\">▲</a><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=scd\" alt=\"学名をアルファベット逆順にソートします\" title=\"学名をアルファベット逆順にソートします\">▼</a>\n</th>\r\n\t\t<th class=\"list_midashi\">指定都道府県数<a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=cnd\" alt=\"RDB指定都道府県の少ない順にソートします\" title=\"RDB指定都道府県の少ない順にソートします\">▲</a><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=cna\" alt=\"RDB指定都道府県の多い順にソートします\" title=\"RDB指定都道府県の多い順にソートします\">▼</a>\n</th>\r\n\t\t<th class=\"list_midashi\">環境省<a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=ena\" alt=\"環境省カテゴリの低い順にソートします\" title=\"環境省カテゴリの低い順にソートします\">▲</a><a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;s=end\" alt=\"環境省カテゴリの高い順にソートします\" title=\"環境省カテゴリの高い順にソートします\">▼</a>\n</th>\r\n\t</tr>\n<tr>\n<td class=\"list_kazu\" width=\"15%\" align=\"right\">5266 </td>\t\r\n\t\t<td class=\"list\" width=\"30%\">単子葉類</td>\r\n\t\t<td class=\"list\" width=\"15%\">\r\n\t\t\t\t\t<a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;t=f&amp;cd=0605009\" alt=\"科名でデータを絞り込みます\" title=\"科名でデータを絞り込みます\">ユリ</a>\r\n\t\t\t\t</td>\r\n\t\t<td class=\"list\" width=\"30%\">\r\n\t\t\t<a href=\"?mode=map&amp;q=06050095266\" alt=\"種の詳細情報を表示します\" title=\"種の詳細情報を表示します\">ゼンテイカ</a><br><em>  Hemerocallis middendorfii var. esculenta</em>\r\n\t\t</td>\r\n\t\t<td class=\"list_kazu\" width=\"10%\">6</td>\r\n\t\t<td class=\"list_kazu\" width=\"80px\">\r\n\t\t<center>-<center>\t\t</center>\n</center>\n</td>\t\t\r\n\t\t\t\t\r\n\t</tr>\n<tr>\n<td class=\"list_kazu\" width=\"15%\" align=\"right\">5259 </td>\t\r\n\t\t<td class=\"list\" width=\"30%\">単子葉類</td>\r\n\t\t<td class=\"list\" width=\"15%\">\r\n\t\t\t\t\t<a href=\"?mode=key&amp;q=%E3%83%8B%E3%83%83%E3%82%B3%E3%82%A6%E3%82%AD%E3%82%B9%E3%82%B2&amp;t=f&amp;cd=0605009\" alt=\"科名でデータを絞り込みます\" title=\"科名でデータを絞り込みます\">ユリ</a>\r\n\t\t\t\t</td>\r\n\t\t<td class=\"list\" width=\"30%\">\r\n\t\t\t<a href=\"?mode=map&amp;q=06050095259\" alt=\"種の詳細情報を表示します\" title=\"種の詳細情報を表示します\">ニッコウキスゲ</a><br><em>  Hemerocallis dumortieri var. esculenta</em>\r\n\t\t</td>\r\n\t\t<td class=\"list_kazu\" width=\"10%\">3</td>\r\n\t\t<td class=\"list_kazu\" width=\"80px\">\r\n\t\t<center>-<center>\t\t</center>\n</center>\n</td>\t\t\r\n\t\t\t\t\r\n\t</tr>\n</table>\n</div>\r\n  <div id=\"thumb\" style=\"display:none\">\r\n<table class=\"table_kekka\" cellspacing=\"1\" cellpadding=\"0\"><tr>\n<td class=\"list\" width=\"250px\">\r\n\t\t \t <div>\n<a href=\"?mode=map&amp;q=06050095266\" alt=\"種の詳細情報を表示します\" title=\"種の詳細情報を表示します\">ゼンテイカ</a><br><em>Hemerocallis middendorfii var. esculenta</em>\n</div>\r\n\t\t     <div><img src=\"./thumb/06/06050095266.gif\"></div>\r\n\t\t </td>\r\n\t\t\r\n\t\t\t<td class=\"list\" width=\"250px\">\r\n\t\t\t<div>\n<a href=\"?mode=map&amp;q=06050095259\" alt=\"種の詳細情報を表示します\" title=\"種の詳細情報を表示します\">ニッコウキスゲ</a><br><em>Hemerocallis dumortieri var. esculenta</em>\n</div>\r\n\t\t    <div><img src=\"./thumb/06/06050095259.gif\"></div>\r\n\t\t</td>\n</tr></table>\n</div>\r\n<br><br><!-- 絞りこみ検索 --><div style=\"width:650px; padding: 10px;border: 1px #dcdcdc solid;\">\r\r\n<table width=\"490px\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\"><tr>\n<td width=\"390px\"><img src=\"pic/siborikomi_title.gif\"></td>\r\r\n    <td width=\"60px\"><a href=\"javascript:subwin('search_help.html#%E7%A8%AE%E5%90%8D%E3%83%BB%E7%95%B0%E5%90%8D%E3%81%A7%E7%B5%9E%E8%BE%BC%E3%81%BF%E3%82%92%E3%81%99%E3%82%8B','window1','top=10,left=10,width=680,height=600,menubar=yes,scrollbars=yes,resizable=yes,status=yes')\" alt=\"HELP\"><img src=\"pic/icon_help.gif\" border=\"0\"></a></td>\r\r\n  </tr></table>\n<img src=\"pic/spacer.gif\" width=\"10px\" height=\"15px\"><form method=\"GET\" action=\"\">\r\n<input type=\"hidden\" name=\"mode\" value=\"key\"><input type=\"hidden\" name=\"k\" value=\"06\"><input type=\"hidden\" name=\"t\" value=\"\"><input type=\"hidden\" name=\"cd\" value=\"\"><input type=\"TEXT\" name=\"q\" value=\"ニッコウキスゲ\" size=\"40\"><input type=\"SUBMIT\" value=\"検索\">\n</form>\r\n</div>\r<!-- END CONTENTS -->\n<!-- START FOOTER -->\n<script language=\"JavaScript\" src=\"0_use_copy.js\"></script><!-- END FOOTER -->\n</div>\n<!-- END wrapper -->\n<map name=\"Map\"><area shape=\"rect\" coords=\"21,65,202,83\" href=\"javascript:subwin('rdb_latest_sub.html','window1','top=10,left=10,width=870,height=600,menubar=yes,scrollbars=yes,resizable=yes,status=yes')\" alt=\"最新のレッドデータ情報はこちら\"></map>\n</div>\n\n<script language=\"Javascript\">\n<!--\nfunction subwin(wurl,wname){\n\twindow.open(wurl,wname);\n}\n\nfunction setSpecCd(specd,specname){\n\tdocument.specd.specd.value=specd;\n\tdocument.specd.specname.value=specname;\n\tdocument.specd.submit();\n}\n\nfunction commitSpecCdFromPref(specd){\n\tdocument.pref_spec.specd.value=specd;\n\tdocument.pref_spec.submit();\n}\n\nfunction commitSpecCdFromKind(specd){\n\tdocument.kind.specd.value=specd;\n\tdocument.kind.submit();\n}\n\nfunction showLegend(id_vis,id_inv){\n\tvar vis = document.getElementById(id_vis);\n\tvar inv = document.getElementById(id_inv);\n\tinv.style.display = \"none\";\n\tvis.style.display = \"inline\";\n\n}\n\n//-->\n</script>\n</body></html>\n"
```

幸いにしてrvestにはhtmlから要素を取得するための便利な関数が用意されている．
ニッコウキスゲを検索した結果のページとその後のページの内容とURLを見ると次のような規則性があることに気づく．
検索結果のページには表(table)としてデータが含まれており，その表の中の目録Noである「5259」が指定状況や地図のページのURLに含まれている．
つまり，目録Noを入手すれば指定状況や地図ページのURLを生成できる．

HTMLのtableを取得するには，`html_table()`を使う．
ここでは，6個目のtableが目録Noを含んでいる．
なお，以下ではスペースの節約のため`purrr::map(colnames)`として列名だけ表示しており，`rvest::html_table(html)`とだけするとtable全体を表示できる．


```r
rvest::html_table(html) %>%
  purrr::map(colnames) # とりあえず，colnamesだけ表示
```

```
## [[1]]
## [1] "X1"
## 
## [[2]]
## [1] "X1"
## 
## [[3]]
## [1] "X1" "X2" "X3" "X4" "X5" "X6"
## 
## [[4]]
##  [1] "X1"  "X2"  "X3"  "X4"  "X5"  "X6"  "X7"  "X8"  "X9"  "X10" "X11" "X12"
## 
## [[5]]
## [1] "X1" "X2"
## 
## [[6]]
## [1] "目録No▲▼"                                             
## [2] "上位分類群▲▼"                                         
## [3] "科名▲▼"                                               
## [4] "和名▲▼／学名\r\n\t\t                             ▲▼"
## [5] "指定都道府県数▲▼"                                     
## [6] "環境省▲▼"                                             
## 
## [[7]]
## [1] "X1" "X2"
## 
## [[8]]
## [1] "X1" "X2"
```


```r
rvest::html_table(html) %>%
  `[[`(6)
```

```
## # A tibble: 2 x 6
##   `目録No▲▼` `上位分類群▲▼` `科名▲▼` 和名▲▼／学名\r\n\t\t~1   `指定都道府県数▲▼`
##        <int> <chr>          <chr>    <chr>                                 <int>
## 1       5266 単子葉類       ユリ     ゼンテイカ  Hemerocalli~                  6
## 2       5259 単子葉類       ユリ     ニッコウキスゲ  Hemeroc~                  3
## # i abbreviated name: 1: `和名▲▼／学名\r\n\t\t                             ▲▼`
## # i 1 more variable: `環境省▲▼` <chr>
```

和名としてゼンテイカとニッコウキスゲの2つが示されている．
ゼンテイカはニッコウキスゲの別名である．
生物学的には同じものなので，本来は両方の情報を合わせる必要がある．
別名かどうか判定するには生物の種について考える必要があり，この問題はかなり根深くてややこしいため，ここではあえて立ち入らない．
単純に検索したものと同じ文字列の和名の目録Noを得ることを考える．

tableの列名とその内容をもとにして目録Noを取得するには，dplyrのselectとfilterが便利だ．
selectは列名を指定する以外に列番号を指定できるので，それを使う．
さらに，filter，stringr，stringiの関数の合せ技でspと同じ文字列のnoを取り出す．

途中でちょっと面倒な点があるので補足する．
`separate()`の`sep`(区切り文字)として`stringi::stri_unescape_unicode("\\u00a0")`を指定している．
これは，普通の半角スペースに見えるが，No-Break Spaceと言われる改行を防ぐ特殊なスペースである．
これをそのままコードに入力しても良いが，どう見ても普通のスペースと見分けがつかない．
後からコードを書く時に普通のスペースを使ってしまうと，区分しようとしてもうまくいかない．
そこで，これは普通のスペースではないことを明示的に示した．
また，`str_detect()`の引数で，`paste0("^", sp, "$")`としたのは，「ニッコウキスゲ」以外にマッチさせないためである．
例えば，「ギンラン」を検索すると，「ギンラン」以外にも「エゾギンラン」と「ササバギンラン」も出てくる．
この場合に正規表現の`^`(行頭の意味)`$`(行末の意味)を使うことで，「ギンラン」にしかマッチさせない．


```r
no <- 
  rvest::html_table(html) %>%
  `[[`(6) %>%
  dplyr::select(no = 1, wamei = 4) %>%
  tidyr::separate(wamei, into = "wamei", sep = stringi::stri_unescape_unicode("\\u00a0"), extra = "drop") %>%
  dplyr::filter(stringr::str_detect(wamei, paste0("^", sp, "$"))) %>%
  `[[`("no")
```

## URLの生成・データの取得

目録Noが取得できれば，完成したようなものである．
ブラウザで表示した地図や指定状況のURLを生成する．
"map&q=0605009"の詳細な意味はよくわからないが，"0605009"あたりは分類群を指定しているのだと考えられる．
これに維管束植物(コケなどを除くシダ植物と花の咲く植物)の中での目録Noを結合して，さらにmainを結合するとURLの出来上がりだ．


```r
show_sp <- paste0("map&q=0605009", no)
paste0(main, show_sp)
```

```
## [1] "http://jpnrdb.com/search.php?mode=map&q=06050095259"
```

```r
html <- 
  paste0(main, show_sp) %>%
  rvest::read_html()
```


生成したURLをブラウザで表示させると地図ページが表示される．
一覧表の表示にしてもURLは変更されないため，内部的に表示を変更させている可能性が高い．
そこで，とりあえずHTMLからtableデータを取得してみる．


```r
html %>%
  rvest::html_table()
```

```
## [[1]]
## # A tibble: 1 x 1
##   X1   
##   <lgl>
## 1 NA   
## 
## [[2]]
## # A tibble: 1 x 1
##   X1                
##   <chr>             
## 1 "ホーム | \r\n >>"
## 
## [[3]]
## # A tibble: 1 x 6
##   X1    X2    X3    X4    X5    X6   
##   <lgl> <lgl> <lgl> <lgl> <lgl> <lgl>
## 1 NA    NA    NA    NA    NA    NA   
## 
## [[4]]
## # A tibble: 49 x 5
##    `都道府県名▲▼` 和名  学名  RDBカテゴリ名 統一カテゴリ
##    <chr>          <chr> <chr> <chr>         <chr>       
##  1 環境省RDB      -     -     -             ""          
##  2 北海道         -     -     -             ""          
##  3 青森県         -     -     -             ""          
##  4 岩手県         -     -     -             ""          
##  5 宮城県         -     -     -             ""          
##  6 秋田県         -     -     -             ""          
##  7 山形県         -     -     -             ""          
##  8 福島県         -     -     -             ""          
##  9 茨城県         -     -     -             ""          
## 10 栃木県         -     -     -             ""          
## # i 39 more rows
## 
## [[5]]
## # A tibble: 8 x 13
##   ニッコウキスゲ学名：Hemerocallis dumo~1 ニッコウキスゲ ニッコウキスゲ `学名：`
##   <chr>                                   <chr>          <lgl>          <lgl>   
## 1 "ニッコウキスゲ"                        "ニッコウキス~ NA             NA      
## 2 "学名："                                "Hemerocallis~ NA             NA      
## 3 "分類："                                "単子葉類 \t\~ NA             NA      
## 4 "登録別名："                            ""             NA             NA      
## 5 "環境省カテゴリ："                      "なし"         NA             NA      
## 6 "都道府県のRDB指定状況："               ""             NA             NA      
## 7 ""                                      ""             NA             NA      
## 8 "※埼玉県・東京都・神奈川県では、季節~   ""             NA             NA      
## # i abbreviated name:
## #   1: `ニッコウキスゲ学名：Hemerocallis dumortieri var. esculenta分類：\r\n\t\t\r\n\t\t 単子葉類 \t\t\t\t \t\t\r\n\t\t\t\t\t\t \r\n\t\t\t\t\r\n\t\t\t\t ユリ科 \t\t\r\n\t\t登録別名：環境省カテゴリ：なし都道府県のRDB指定状況：`
## # i 9 more variables: `Hemerocallis dumortieri var. esculenta` <lgl>,
## #   `分類：` <lgl>,
## #   `単子葉類 \t\t\t\t \t\t\r\n\t\t\t\t\t\t \r\n\t\t\t\t\r\n\t\t\t\t ユリ科` <lgl>,
## #   `登録別名：` <lgl>, `` <lgl>, `環境省カテゴリ：` <lgl>, なし <lgl>,
## #   `都道府県のRDB指定状況：` <lgl>, `` <lgl>
## 
## [[6]]
## # A tibble: 6 x 2
##   X1                      X2                                                    
##   <chr>                   <chr>                                                 
## 1 ニッコウキスゲ          "ニッコウキスゲ"                                      
## 2 学名：                  "Hemerocallis dumortieri var. esculenta"              
## 3 分類：                  "単子葉類 \t\t\t\t \t\t\r\n\t\t\t\t\t\t \r\n\t\t\t\t\~
## 4 登録別名：              ""                                                    
## 5 環境省カテゴリ：        "なし"                                                
## 6 都道府県のRDB指定状況： ""
```

果たして，tableの4番目に欲しいデータがあった．
あとは，filterを使って指定されていない都道府県データを除去する．
さらに必要に応じて，入手したデータを整形・変換・保存して欲しい．


```r
html %>%
  rvest::html_table() %>%
  `[[`(4) %>%
  dplyr::filter(和名 != "-")
```

```
## # A tibble: 4 x 5
##   `都道府県名▲▼`                        和名   学名   RDBカテゴリ名 統一カテゴリ
##   <chr>                                 <chr>  <chr>  <chr>         <chr>       
## 1 "埼玉県\r\n        ※"                 "ニッ~ "Heme~ "絶滅危惧Ⅱ類~ ""          
## 2 "滋賀県"                              "ニッ~ "Heme~ "分布上重要~  ""          
## 3 "島根県"                              "ニッ~ "Heme~ "絶滅危惧Ⅰ類~ ""          
## 4 "※埼玉県・東京都・神奈川県では、季節~ "※埼~  "※埼~  "※埼玉県・~   "※埼玉県・~
```

## 地図画像の取得

指定状況の地図画像を取得するには，まずブラウザで画像のURLを得る必要がある．
GoogleChromeで画像を右クリックして，「画像アドレスをコピー」を選択する．
ニッコウキスゲの場合は，以下のURLを得ることができる．

http://jpnrdb.com/png/06/06050095259.png

指定状況の一覧表データのHTMLにも(ほぼ)同じものが含まれているはずである．
rvestで目的とするファイルのURLを得るコードは以下のとおりである．


```r
html %>%
  rvest::html_elements("img") %>%
  rvest::html_attr("src") %>%
  `[`(., stringr::str_detect(. , as.character(no)))
```

```
## [1] "./png/06/06050095259.png"
```

上のコード使用したように，rvestで便利な関数としてhtml_elements()とhtml_attr()がある．
それぞれ次のようにid，class，tag，属性によってHTMLからDOMを取得可能である．

- html_elements()   
  - html_elements("#id")   
  - html_elements(".class")   
  - html_elements("tag")    
- html_attr("attribute")   

DOMとはドキュメントオブジェクトモデルのことで，HTMLの各要素をオブジェクトとするモデルのことである．
id，class，tag，属性を指定することで，効率的にオブジェクトを取り出すことができて，便利である．

id，class，tag，属性についての詳細は，HTMLの解説などを別途参照していただきたい．
簡単に説明をすると，idはHTML内で一意に決定できるもので，日本のレッドデータ検索システムでは<id = "header">などが使われている．
classは，HTML内で複数出てくることがあり，<class = "kind_list">のように指定される．
tagは，上記の<id>や<class>を含めたすべてのタグのことで，他にも<p>，<div>，<table>など多くの物がある．
`html_table()`は`html_elements("table")`と同等であるが，tableタグは入手したいデータを含むことが多いため個別の関数が作成されたのだろう．
属性はtagの，「href = "index.html"」の部分で，`html_attr("href")`とすると，"index.html"を取り出すことができる．
hrefが複数ある場合は，すべてを含むベクトルが返り値になる．


ただし実際には，上のようにブラウザでの右クリックか，以下の手順で実行するのが手っ取り早い．
- ブラウザで地図ページを表示させる   
- F12を押して開発者ツールを開く   
- 左上の□と↖の結合したアイコンをクリック後に画像をクリック   
- Elementsのところに出てきたURLが求めるURL   
- タグを右クリックして[Copy] - [Copy element] や [Copy outerHTML] で内容をコピーできる  

画像のURLがわかれば，ファイルをダウンロードして保存するだけだ．
これは，curlパッケージの`curl_download()`で簡単にできる．
引数としてurlにはURLを，destfileにはダウンロード後のファイル名を指定する．
ファイル名自体は指定が必要である．
パスを指定しないと作業ディレクトリ(`getwd()`で取得可能)に保存されるが，作業ディレクトリ以外に保存したい場合は，相対パスや絶対パスを指定する．


```r
  # wd <- "set_your_directory"
  # setwd(wd)
url_img <- "http://jpnrdb.com/png/06/06050095259.png"
curl::curl_download(url = url_img, destfile = paste0(sp, ".png"))
```

このようにしてスクレイピングが可能ではあるが，URLの生成規則は，変更されることがある．
`read_html()`でHTMLが取得できない場合は，URLが正しいか確認する必要がある．
また，動的なサイトでは，idが固定ではない可能性がある．
サイトの仕様変更によって，タグ，クラス，その他の構造が変更されることがある点も注意しなければならない．

綺麗な構造のサイトであっても，手作業が混入していることはある．
例えば，括弧が正しく対応しているはずだと思っていても，開く側が"『"で閉じる側が"」"になっていることがあった．
その場合に正規表現"『.+』"ではうまく鉤括弧内の文字列を取得できないことになる．

## 複数種への対応

前節のようにすれば，レッドデータへの指定状況とその地図データを得ることができる．
1種だけのデータ・画像の入手方法を紹介したが，複数種についてもこれを応用すれば可能である．
その際には，forループか，purrr::mapを使うと良いだろう．

複数ページのデータを取得する場合は一般的には5秒程度の間隔を置く必要がある．
ただし，サイトによってはそれ以上の間隔を求めているときがある．
その内容はドメインのトップに置かれた「robots.txt」で確認できる．
「http://jpnrdb.com/」には「robots.txt」が置かれていないが，politeパッケージの関数`bow()`でスクレイピングについて調べてみる．


```r
polite::bow("http://jpnrdb.com/")
```

```
## <polite session> http://jpnrdb.com/
##     User-agent: polite R package
##     robots.txt: 1 rules are defined for 1 bots
##    Crawl delay: 5 sec
##   The path is scrapable for this user-agent
```

「Crawl delay: 5 sec」とあるため，5秒間隔でスクレイピング可能であると思われる．
これ未満の間隔でデータを頻繁に求めると，「攻撃」と見なされて接続できな状態になる可能性がある．
さらに悪質なときには法的手段を取られることもありえるので，注意が必要である．
ただし，http://jpnrdb.com/にrobots.txtは設置されておらず，これらはpoliteパッケージが一般的な注意として示しているに過ぎない．
大量にデータを入手する必要がある場合は，あらかじめ管理者に連絡する方が無難である．


## おまけ：webshotでウエブページを画像に変換 {#webshot}

rvestでスクレイピングしたウエブページを画像として残しておきたいことがある．
つまり，ウエブのスクリーンショットを保存したい場合だ．
まさにこの文章を書いているときがそうだが，データを入手してそのサイトについて他人に説明したいときがあるだろう．
そのようなときはパッケージwebshotが便利だ．

例によってまずはパッケージをインストールする．


```r
install.packages("webshot")
```



webshotは内部でPhantomjsというブラウザを使っているので，
webshotからPhantomjsをインストールするための関数を実行する．
なお，Phantomjsはヘッドレスブラウザの1つである．
ヘッドレスブラウザは，画面を描画しないブラウザのことである．
つまり，画面上でHTMLを表示させずにデータのやり取りだけをするもので，プログラムやスクレイピングでは重宝する．
<!--
画面表示がないため動作が早い．
-->


```r
webshot::install_phantomjs()
```

イントールに若干時間がかかるが，終わればあとは簡単だ．
関数webshotにURLと保存するファイル名を指定すれば，画像を作業フォルダに保存してくれる．


```r
webshot::webshot("http://jpnrdb.com/search.php?mode=spec", "rvest_1.png")
webshot::webshot("http://jpnrdb.com/search.php?mode=key&q=ニッコウキスゲ", "rvest_2.png")
webshot::webshot("http://jpnrdb.com/search.php?mode=map&q=06050095259", "rvest_3.png")
```

なお，パッケージmagickを使うと保存した画像に対してトリミングなどの加工ができる．
[magickで画像編集](#magick)
