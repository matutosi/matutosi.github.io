# officerでWordやEscelの内容を編集する {#officer}

<!--
<a href=""></a>
[Preface](#)
-->

## 準備

例によってまずはパッケージをインストールする．
日付のデータを扱うためのlubridateとさらにそのラッパーを使うので，automaterを読み込む．


```r
install.packages("officer")
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

```
## Warning: package 'officer' was built under R version 4.3.1
```




## officerとofficeverse





## 複数のワード文書の文字列を一括置換

多くのプログラマは，普段はそれぞれの好みのテキストエディタを使っていいるだろう．
私はWindowsでは古典的なエディタである秀丸エディタを長らく使っている．
キー割り当てのカスタマイズや自分用の細かなマクロがあるので，今さらエディタを変更できない．
ノートパソコンではThinkPadをずっと使っているので，キーボード自体も変更できない．
これを変更すると作業効率が悪くなってしまう．
そのため，デスクトップパソコンでもThinkPadキーボードを愛用している．

このようにエディタとキーボードだけでパソコンの作業が完了すれば良いのだが，仕事上はワードで文書を作成しなければならないことがある．
ワードは余計なおせっかいをたくさんしてくれるので，不要なことはしないように設定している．
それでも，できればワードでの作業は最小限にしたいのが本音である．
起動に時間はかかるし，置換で使える正規表現がちょっと変だからである．

Rからワード文書内の文字列を置換すれば，ワードを起動する手間が省略できる．
また，正規表現を使った置換や複数の組み合わせの置換もできる．
さらに，「AをB」に「BをA」にという入れ替えも，プログラムで途中に別の文字列への置き換えで実現できる．
このとき途中で使う文字列が元の文書内にないことは必須条件であるが，これもプログラムで確認可能である．
もちろん，複数ファイルでの置換やファイル名を正規表現で指定することもできる．

<!--
  # なお，VBAでマクロを使えば，複数ファイルの文字列置ができる．
  # その場合，1つの組み合わせだけでなく，複数の組み合わせの置換もできるだろう．
  # VBAのマクロと同様のことをRから実行してみる．
-->

### 置換のコードの例




```r
  # コードの動作確認

  # https://ardata-fr.github.io/officeverse/index.html
  # pkg <- "D:/matu/work/ToDo/automater/R"
  # devtools::load_all(pkg)

  # fs::path_package("")
  # replacement <- readr::read_tsv("replacement.txt", header = TRUE)
  # ls("package:tibble")

library(tidyverse)
library(officer)
library(lubridate)
  # library(automater)
a <- 
  read_docx() %>%
  officer::body_add_par("置換前，変換前，へんかん，ヘンカン") %>%
  print(fs::path_temp("a.docx"))
b <- 
  read_docx() %>%
  officer::body_add_par("置換前，変換前，へんかん，ヘンカン") %>%
  print(fs::path_temp("b.docx"))
fs::path_dir(a) %>%
  shell.exec()

replacement <- 
  tibble::tribble(
    ~file          , ~old_value, ~new_value,
    a              , "置換前"  , "置換後"  ,
    b              , "変換前"  , "変換後"  ,
    paste0(a,",",b), "へんかん", "変換"    )

replacement <- 
  replacement %>%
  expand_file() %>%
  dplyr::filter(!stringr::str_detect(file, "replaced\\_"))

replace_docs(replacement)
```

## 年月日の更新

毎年同じような文書を作成しているが，年だけを更新しなければならないことは多いだろう．
手作業で日付を更新すると，どうしても間違いが混入する．
単純な見間違いや入力間違いもあれば，日付を変更して曜日を変更し忘れる，あるいは日付を変更し忘れることをやってしまいがちだ．
このような更新作業も，Wordの検索・置換の機能で可能だし，Rから特定の日付を別の日付に変換できる．

いっそのことなら，日付を文書内で自動的に取得して日付あるいは曜日を更新できれば楽ができる．
例えば，「2023年4月10日(月)」を2024年に変更することを考えよう．
何番目の何曜日かで日付が決まっているなら，2023年4月10日は第2月曜日である．
この場合は，2024年4月の第2月曜日は「2024年4月8日(月)」なので，「2023年4月10日(月)」を「2024年4月8日(月)」に置換する．
一方，日付固定なら「2024年4月10日(水)」に置換する．

<!--
日付(月日)を固定したい場合であれば，曜日のみ変更すれば良いので分かりやすい．
曜日を固定したい場合は「10月の第2日曜日」のように法則がきっちりとしていれば，プログラムは簡単である．
-->

さらに，求めた日が日曜日の場合は前日の土曜日あるいは月曜日にずらすとか，10月1日の前後3日以内の火曜日のような法則でも可能である．
祝日との関連で日付を決定することもあるだろう．
そのようなときは，祝日データをあわせてコードに入れれば良い．
とにかく，作業の手順が決まっていれば，プログラムによる自動化できる．


ここではlubridateを活用して，ワード文書の日付を更新する方法を扱う．
lubridateで日付固定あるいは位置固定のときでの翌年の年月日を求める方法は以下を参考にして欲しい．

[lubridateで日付・時刻を扱う](#lubridate)


### 活用例

ワード文書内の日付は，正規表現を用いて入手できる．

それぞれの曜日なし版が考えられ，月と日が1桁の時に「04」のようにパディング(桁合わせ)されていることもあるだろう．
これらは正規表現によって対応可能である．
日付っぽい表記のすべてを含もうとするとややこしいが，よく使う日付表記であれば網羅できるだろう．
年表記が2桁の場合，半角や全角のスペースを途中に含んだり，「()」の半角・全角の違いなどの表現揺れもあり得る．
表記揺れを修正するための置換や削除などは，stringr(あるいはbase)の関数で対応できる．


```r
  # Wordファイルを開く
  # 文字列の取得
  # 日付の一覧抽出
  # 日付の置換
  # Wordの保存

  # library(automater)
  # library(moranajp)
library(tidyverse)
library(officer)
library(lubridate)

  # 準備
x <- 
  "23年1月1日(月)，2023年1月1日(月)，2023年10月10日(月)，
  2月2日(月)，12月22日(月)，2023/1/1(月)，2023/10/10(月)，
  2/2(月)，12/22(月)，23年1月1日，2023年1月1日，
  2023年10月10日，2月2日，12月22日，2023/1/1，2023/10/10，
  2/2，12/22"
date_x <- extract_date(x)
date_doc <- print(fs::path_temp("date.docx"))

doc <- read_docx()
doc <- body_add_par(doc, "日付置換の例")
for(d in date_x){
  doc <- body_add_par(doc, d)
  #   doc <- body_add_fpar(doc, fpar(ftext(d, fp_text(color = "red"))))
}
write_docx(doc, date_doc)
fs::path_dir(date_doc) %>%
  shell.exec()

  # 読み込み
doc <- read_docx(date_doc)


automater::format_ymd(x)

  # ls("package:officer")
  # ls("package:moranajp")
```
