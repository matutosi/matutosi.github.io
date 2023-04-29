# Microsoft365R {#Microsoft365R}

<!--
  #   https://cran.r-project.org/web/packages/Microsoft365R
  # Outlookの使い方
  #   https://cran.r-project.org/web/packages/Microsoft365R/vignettes/outlook.html
-->
<!--
-->

## Outlookで複数メール送信を一斉送信

複数人に全く同じメールを送る場合は，TOやCCに複数の電子メールアドレスを入力すれば良い．
また，宛先を知られるのがよろしくないときは，BCCに送信先のアドレスを，TOに自分のアドレスを入れておけば問題ない．
このとき，送り先の全員に全く同じ内容，同じ添付ファイルであればメールは1つ作成すれば問題ない．

でも，個々の人に対して少しだけ違う内容のメールを送りたいときとか，添付ファイルを別々のものにしたいときがある．
また，単純なことだが，宛先が「みなさま」よりは，「○○様」のように宛先だけでも変更したいというときもある．
何かお願いをするときには，「みなさま」よりも直接名前を書いたほうが結構効果が高い．
例えば，学会での投票のお願いなどは，MLに流すより個別メールの方が確実だ．

そのようなとき，いちいちメールを作成・編集していると面倒だし，間違いのもとになる．
名前を中途半端に修正して，3箇所のうち1箇所だけ別の人の名前にしてしまっていたり，日付と曜日があっていないなどの間違いは日常茶飯事だ．
このような間違いをなくすには，個別に変更する部分と全体で統一するところを分けておき，あとはパソコンを使ってうまくつなぎ合わせる．
でも，このように作成したメールの本文や宛先をいちいちコピー&ペーストするのは，手間がかかるし，個々にも作業のミスが入り込む余地が大きい．





### インストールと初期設定

この操作は，最初に1回だけ実行すればOK.

```r
  # インストール
install.packages("Microsoft365R")
  # パッケージの読み込み
library(Microsoft365R)
 # 会社など組織で契約している場合
Microsoft365R::get_business_outlook()
 # 個人利用の場合
  # Microsoft365R::get_personal_outlook()
```

### とりあえず使う

まずは，試しにメールを作って送ってみる．


```r
 # 会社などで組織で契約している場合
outlook <- Microsoft365R::get_business_outlook()
 # 個人利用の場合
  # outlook <- Microsoft365R::get_personal_outlook()

  # 個別にemailを送る場合
  # メール作成のみ
  # メールはoutlookの下書きフォルダにも保存されている
em <- 
  outlook$create_email(
    body = "Hello from R\nHello from R\n", 
    subject = "Hello",
    to = "matutosi@gmail.com", 
    cc = "matutosi@konan-wu.ac.jp"
  )

  # メール送信
em$send()

  # outlookの下書きフォルダからメールを取り出す
drafts <- outlook$get_drafts()$list_emails()
  # 下書きフォルダのメール一覧
drafts
  # 下書きフォルダのメールの1つ目を送信
drafts[[1]]$send()

  # 受信トレイのメール一覧
inbox <- outlook$get_inbox()$list_emails()
  # 受信トレイの1つ目の内容
inbox[[1]]
```


### メールの一斉送信

宛先や本文をエクセルに入力しておき，そこからデータを抽出して一斉にメールを送信できる．

- 送信: send(必須)   1: 送信する，0: 下書きに保存
- 宛先: to(必須)   
- CC: cc(任意)   
- BCC: bcc(任意)   
- 件名: subject(必須でないが，入力推奨)   
- 本文: body(必須でないが，入力推奨)   
- 添付ファイル: attachment(任意)   

宛先が入力されていないとメールは送信できない．
CCとBCCは任意．   
件名と本文はなくても送信できるが，両方とも何もないとメールの意味がない．   
添付ファイルがあれば，ファイル名を指定．
複数ファイルを添付するときは，カンマでpath(ファイル名)を区切る．
絶対pathで指定すると間違いは少ない．


```r
  # 宛先や本文をエクセルで作成しておき
  #   一斉にメールを作成・送信する場合

  # 関数の読み込み
source("https://gist.githubusercontent.com/matutosi/bed00135698c8e3d2c49ef08d12eef9c/raw/6acc2de844eeeab03aaf36f2391e223d621b36a8/outlook.R")

outlook <- Microsoft365R::get_business_outlook()
  # エクセルファイルの内容
  #   working directoryにファイルがない場合は，
  #   絶対パス("c:/user/documents/outlook.xlsx"など)で指定
path <- "outlook.xlsx"
  # メール作成・送信
create_email(path, outlook, send = TRUE)

  # メール作成のみ
  #   "send = FALSE" にすれば，メールを作成して下書きに保存
create_email(path, outlook, send = FALSE)
```

## 複数のワード文書の文字列を一括置換

多くのプログラマは，普段はそれぞれの好みのテキストエディタを使っていいるだろう．
私はWindowsでは古典的なエディタである秀丸エディタを長らく使っている．
キー割り当てのカスタマイズや自分用の細かなマクロがあるので，今さらエディタを変更できない．
ートパソコンではThinkPadをずっと使っているので，キーボード自体も変更できない．
これを変更すると作業効率が悪くなってしまう．
そのため，デスクトップパソコンでもThinkPadキーボードを愛用している．

このようにエディタとキーボードだけでパソコンの作業が完了すれば良いのだが，仕事上ワードで文書を作成しなければならないことがある．
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
  # https://ardata-fr.github.io/officeverse/index.html
  # https://github.com/omegahat/RDCOMClient

  # install.packages("officer")

pkg <- "D:/matu/work/ToDo/automater/R"
devtools::load_all(pkg)
library(officer)
library(tidyverse)
wd <- "d:/"
setwd(wd)

replacement <- read.table("replacement.txt", header = TRUE, sep = "\t")

files <- 
  replacement[["file"]] %>%
  stringr::str_c(collapse = "|") %>%
  fs::dir_ls(regexp = .) %>%
  exclude(stringr::str_detect(., "^replaced\\_"))

replacement <- expand_file(replacement, files)

files %>%
  purrr::walk(replace_docs, replacement)
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
とにかく，決め方が明確であり，それによって1つに日付を決めることができれば，プログラムを使って自動化できる．

### lubridate
年月日や曜日を扱う場合，パッケージlubridateを利用するのが便利である．
lubridateは，tidyverseに含まれているパッケージの1つである．
日付っぽい文字列を，Dateクラスのオブジェクトに変換できる．

ワード文書内の日付は，正規表現を用いて入手できる．

- 2023年4月10日(月)    
- 4月10日(月)   
- 2023-4-10(月)   
- 2023_4_10(月)   
- 20230410(月)   
- 2023/4/10(月)   
 -4/10(月)   

それぞれの曜日なし版が考えられ，月と日が1桁の時に「04」のようにパディング(桁合わせ)されていることもあるだろう．
これらは，正規表現によって対応可能である．
もちろん，日付っぽい表記のすべてを含むことはできないが，よく使う日付表記は網羅できるだろう．
年表記が2桁の場合，半角や全角のスペースを途中に含んだり，「()」の半角・全角の違いなどの表現揺れもあり得る．
表記揺れを修正するための置換や削除などは，stringr(あるいはbase)の関数で対応できる．



日本語の表記でよく出てくる年月日の順の日付表記は，lubridateの関数ymd()でDateクラスに変換する．
Dateクラスでは，日付(や時刻)の計算が簡単にできるので便利である．


```r
library(lubridate)
```

```
## 
## Attaching package: 'lubridate'
```

```
## The following objects are masked from 'package:base':
## 
##     date, intersect, setdiff, union
```

```r
x <- ymd("2023-4-10")
class(x)
```

```
## [1] "Date"
```

```r
wday(x, label = TRUE) # week of the day
```

```
## [1] 月
## Levels: 日 < 月 < 火 < 水 < 木 < 金 < 土
```

```r
today()
```

```
## [1] "2023-04-30"
```

```r
today() + years(1)
```

```
## [1] "2024-04-30"
```

```r
today() + years(2)
```

```
## [1] "2025-04-30"
```

```r
today() + days(365*1)
```

```
## [1] "2024-04-29"
```

```r
today() + days(365*2)
```

```
## [1] "2025-04-29"
```

```r
ymd("2024-1-31") + months(1)
```

```
## [1] NA
```



```r
library(tidyverse)
```

```
## -- Attaching core tidyverse packages ------------------------ tidyverse 2.0.0 --
## v dplyr   1.1.2     v readr   2.1.4
## v forcats 1.0.0     v stringr 1.5.0
## v ggplot2 3.4.2     v tibble  3.2.1
## v purrr   1.0.1     v tidyr   1.3.0
## -- Conflicts ------------------------------------------ tidyverse_conflicts() --
## x dplyr::filter() masks stats::filter()
## x dplyr::lag()    masks stats::lag()
## i Use the conflicted package (<http://conflicted.r-lib.org/>) to force all conflicts to become errors
```

```r
library(patchwork)
mweek <- function(x){
  (mday(x) - 1) %/% 7 + 1
}
re <- seq(as.POSIXct("2020-10-1"), as.POSIXct("2020-10-31"), by="day") %>% mweek()
ex <- rep(1:5, each=7)[1:31]
testthat::expect_equal(re, ex)

same_pos_next_yr <- function(x){
  yr <- year(x)
  mn <- month(x)
  base <- ymd(paste0(yr + 1, "-", mn, "-", 1))
  diff <- wday(x) - wday(base)
  for(i in seq_along(diff)){
    if(diff[i] < 0){ diff[i] <- diff[i] + 7 }
  }
  same_pos <- base + (mweek(x) - 1) * 7 + diff
  for(i in seq_along(same_pos)){
    if(month(same_pos[i]) != mn[i]){
      same_pos[i] <- NA
      warning("No same position day with ", x[i], "!")
    }
  }
  return(same_pos)
}
days <- 
  as.POSIXct("2023-5-1") %>%
  ymd() %>%
  `+`(0:30)
days_n <- 
  days %>%
  same_pos_next_yr()
```

```
## Warning in same_pos_next_yr(.): No same position day with 2023-05-29!
```

```
## Warning in same_pos_next_yr(.): No same position day with 2023-05-30!
```

```r
calendR::calendR(2023,5) / calendR::calendR(2024,5)
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <e7>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <81>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <ab>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <b0>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <b4>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <a8>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <e9>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <87>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <91>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <e5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <9f>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2023' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '日曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '月曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <e7>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <81>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <ab>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '火曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <b0>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <b4>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '水曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <a8>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '木曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <e9>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <87>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <91>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '金曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <e5>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <9f>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <9b>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <97>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '土曜日' in 'mbcsToSbcs': dot substituted for <a5>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call(C_textBounds, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <88>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <e6>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <9c>
```

```
## Warning in grid.Call.graphics(C_text, as.graphicsAnnot(x$label), x$x, x$y, :
## conversion failure on '5月 2024' in 'mbcsToSbcs': dot substituted for <88>
```

![](Microsoft365R_files/figure-latex/unnamed-chunk-6-1.pdf)<!-- --> 
