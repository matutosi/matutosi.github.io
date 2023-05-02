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
radioボタンはちょっと工夫が必要
moranajp::html_radio_set()
無理やりな感じではあるが，同一名称のradioボタンを全て同じ値に変更する
本来なら，不要なradioボタンのフォームを削除
  可能だが，インデクスがずれるので結構厄介
politeパッケージとの連携

## 準備


```r
install.packages("rvest")
```


```r
library(rvest)
library(tidyverse)
```


## HTMLの取得

### 使い方


```r
Sys.setlocale("LC_TIME", "en_US.UTF-8") # アメリカ英語に設定
```

```
## [1] "en_US.UTF-8"
```

```r
  # date <- lubridate::today()
date <- lubridate::ymd("2022-5-1")
ym <- paste0("^", year(date), "年", month(date) , "月")

main <- "https://www.aboutamazon.jp/news/entertainment/amazon-prime-video-new-content-"
url_amz <- 
  month(date, label = TRUE, abbr = FALSE) %>%
  stringr::str_to_lower() %>%
  paste0(main, ., "-", year(date))
html <- rvest::read_html(url_amz)
```

### 注意点

URLの生成規則は，変更されることがある．
read_html()でHTMLが取得できない場合は，URLが正しいか確認する必要がある．

上記のコードは1ページだけの取得であったが，複数ページのデータを取得する場合は一般的には5秒程度の間隔を置く必要がある．
ただし，サイトによってはそれ以上の間隔を求めているときがある．
その内容はドメインのトップに置かれた「robots.txt」で確認できる．
例えば，「https://www.aboutamazon.jp/robots.txt」の記載は以下のとおりである．

> User-agent: *
> Crawl-delay: 10
> Sitemap: https://www.aboutamazon.jp/sitemap.xml
> Sitemap: https://www.aboutamazon.jp/news-sitemap.xml

「Crawl-delay: 10」とあるため，10秒間隔を求めていることが分かる．
これ未満の間隔でデータを頻繁に求めると，「攻撃」と見なされて接続できな状態になる可能性がある．
さらに，悪質なときには法的手段を取られることもありえるので，注意が必要である．

robots.txtの内容は，URLを生成してrvestで取得可能だが，politeパッケージのbow()を使うと楽である．


```r
install.packages("polite")
```


```r
polite::bow("https://www.aboutamazon.jp/")
```

```
## <polite session> https://www.aboutamazon.jp/
##     User-agent: polite R package
##     robots.txt: 0 rules are defined for 1 bots
##    Crawl delay: 10 sec
##   The path is scrapable for this user-agent
```

## DOMの取得


DOMとはドキュメントオブジェクトモデルのことで，


### 使い方

ブラウザでウエブページを開いて，F12で開発者ツールを使用する．



```r
contents <- 
  html %>%
  rvest::html_elements("body") %>%
  rvest::html_elements("div.RichTextArticleBody-body li,p,h3.cms-headings-h3") %>%
  rvest::html_text() %>%
  tibble::as_tibble() %>%
  dplyr::filter(value != "")

contents %>%
  dplyr::mutate(
    div = dplyr::case_when(
      stringr::str_detect(value, "^洋画|邦画|アニメ|海外|国内|韓国") & stringr::str_length(value) < 20 ~ value,
      TRUE ~ NA    )) %>%
  dplyr::mutate(
    date = dplyr::case_when(
      stringr::str_detect(value, ym) ~ value,
      TRUE ~ NA    )) %>%
  tidyr::fill(all_of(c("div", "date")), .direction = "down") %>%
  dplyr::mutate(value = stringr::str_replace(value, "^Amazon Original", "")) %>%
  dplyr::mutate(value = stringr::str_replace_all(value, " ", "")) %>%
  dplyr::mutate(value = stringr::str_replace(value, "※.+", "")) %>%
  dplyr::filter(stringr::str_detect(value, "^『")) %>%
  print(n=100)
```

```
## # A tibble: 38 x 3
##    value                                                             div   date 
##    <chr>                                                             <chr> <chr>
##  1 『ズーム／見えない参加者』                                        洋画  2022~
##  2 『テスラエジソンが恐れた天才』                                    洋画  2022~
##  3 『17歳の瞳に映る世界』                                            洋画  2022~
##  4 『すべてが変わった日』                                            洋画  2022~
##  5 『プロミシング・ヤング・ウーマン』                                洋画  2022~
##  6 『ライトハウス』                                                  洋画  2022~
##  7 『007／ノー・タイム・トゥ・ダイ』                                 洋画  2022~
##  8 『ガンズ・アキンボ』                                              洋画  2022~
##  9 『友情にSOS』                                                     洋画  2022~
## 10 『AWAKE』                                                         邦画  2022~
## 11 『おと・な・り』                                                  邦画  2022~
## 12 『朝が来る』                                                      邦画  2022~
## 13 『真夜中乙女戦争』                                                邦画  2022~
## 14 『劇場版シグナル長期未解決事件捜査班』                            邦画  2022~
## 15 『ホテルローヤル』                                                邦画  2022~
## 16 『先生、私の隣に座っていただけませんか？』                        邦画  2022~
## 17 『さがす』                                                        邦画  2022~
## 18 『天外者』                                                        邦画  2022~
## 19 『整形水』                                                        アニ~ 2022~
## 20 『ボッシュ:受け継がれるもの』                                     海外~ 2022~
## 21 『ザ・ワイルズ～孤島に残された少女たち～」シーズン2               海外~ 2022~
## 22 『アリーチェの物語』パート2                                       海外~ 2022~
## 23 『天空の旅人』                                                    海外~ 2022~
## 24 『ドクターホワイト』                                              国内~ 2022~
## 25 『名探偵コナン本庁刑事恋物語～結婚前夜～』                        国内~ 2022~
## 26 『ちいかわ』                                                      国内~ 2022~
## 27 『君のハートをつかまえろ』                                        韓国~ 2022~
## 28 『ウラチャチャ！？～男女6人恋のバトル～』                         韓国~ 2022~
## 29 『おかえり～ただいまのキスは屋根の上で！？～』                    韓国~ 2022~
## 30 『LOL:HITOSHIMATSUMOTOPresentsドキュメンタル～メキシコ版～』シー~ 海外~ 2022~
## 31 『リゾのビッグスター発掘』                                        海外~ 2022~
## 32 『キッズ・イン・ザ・ホール～ギャグの殿堂～』                      海外~ 2022~
## 33 『恋愛ハイスクール』                                              海外~ 2022~
## 34 『LOL:HITOSHIMATSUMOTOPresentsドキュメンタル～スペイン版～』シー~ 海外~ 2022~
## 35 『イアン・スターリング～前向きな失敗～』                          海外~ 2022~
## 36 『LOL:HITOSHIMATSUMOTOPresentsドキュメンタル～ドイツ版～』シーズ~ 海外~ 2022~
## 37 『ビバリー・スミス殺害事件の謎』                                  海外~ 2022~
## 38 『キッズ・イン・ザ・ホール～コメディの反逆児～』                  海外~ 2022~
```

```r
  #   html_elements("h3.cms-headings-h3") %>%

  # id         rvest::html_elements("#content") %>%
  # class      rvest::html_elements(".next") %>%
  # tag        rvest::html_elements("a") %>%
  # 属性       rvest::html_attr("href")
```

### 注意点

動的なサイトでは，idが固定ではない可能性がある．
サイトの仕様変更によって，タグ，クラス，その他の構造が変更されることがある．

また，綺麗な構造をしていると思っているサイトの内容であっても，手作業が混入していたり，
例えば，括弧が正しく対応しているはずだと思っていても，開く側が"『"で閉じる側が"」"になっていることがあった．
その場合に正規表現"『.+』"ではうまく鉤括弧内の文字列を取得できないことになる．


