# lubridateで日付・時刻を扱う {#lubridate}
<!--
-->
年月日や曜日を扱う場合，パッケージlubridateを利用するのが便利である．
lubridateは，tidyverseに含まれているパッケージの1つで，日付や時刻・時間データを扱う際には必須と言っても過言ではない．

## 準備

例によってパッケージのインストールと呼び出しだが，lubridateはtidyverseに含まれている．
そのため，tidyverseを呼び出せばそれでOKである．
日付の確認用としてカレンダーを最後に表示する．
そのためのパッケージであるcalendRをインストールしておく．


```r
install.packages("calendR")
```


```r
library(tidyverse)
library(calendR)
```

## 1月後・1年後の同一日

例えば，1月後や1年後の同一の日付を得たいとする．
これは単純なようで実はややこしい問題を含んでいる．
月には大の月・小の月があるし，年には閏年がある．
そのため，同一日がないときがあるため，自分で関数を作成するにはこれらを考慮しなければならない．
lubridateを活用すると簡単に計算できる．

1年後の同一の日付を得るには`+ years(1)`とすれば良い．
単純に365日加えるのとは結果が異なる．
1月後の場合には`months(1)`を使う



```r
today() + years(0:4)
```

```
## [1] "2023-07-02" "2024-07-02" "2025-07-02" "2026-07-02" "2027-07-02"
```

```r
today() + days(365 * 0:4)
```

```
## [1] "2023-07-02" "2024-07-01" "2025-07-01" "2026-07-01" "2027-07-01"
```

```r
today() + months(0:4)
```

```
## [1] "2023-07-02" "2023-08-02" "2023-09-02" "2023-10-02" "2023-11-02"
```

```r
today() + months(0:4)
```

```
## [1] "2023-07-02" "2023-08-02" "2023-09-02" "2023-10-02" "2023-11-02"
```

なお，`today()`はそのときの本日の日付を返す関数のため，上記の表示と読者が実行したときの表示は異なるはずである．
また，引数`tzone`を指定するとタイムゾーンを指定でき，日本の場合は`today("Asia/Tokyo")`，グリニッジ標準時の場合は，`today("GMT")`とする．

## 文字列からDateクラスへの変換

日本語の表記でよく出てくる年・月・日の順の日付表記は，関数`ymd()`でDateクラスに変換できる．
`ymd()`は，日付っぽい文字列をDateクラスにしてくれる．
よく使うような以下の文字列は，普通に変換してくれる．
ちなみに，日付の後ろに`(火)`のような曜日が入っていても問題ない(曜日は無視される)．

<!--
- 2023年4月10日    
- 2023-4-10   
- 2023_4_10   
- 20230410   
- 2023/4/10   
-->


```r
c("2023年4月10日", "2023-4-10", "2023_4_10", "20230410", "2023/4/10") %>%
  ymd()
```

```
## [1] "2023-04-10" "2023-04-10" "2023-04-10" "2023-04-10" "2023-04-10"
```

```r
c("2023年4月10日(月)", "2023-4-10(月)", "2023_4_10(月)", "20230410(月)", "2023/4/10(月)") %>%
  ymd()
```

```
## [1] "2023-04-10" "2023-04-10" "2023-04-10" "2023-04-10" "2023-04-10"
```

年が入っていない場合はうまくいかないので，年を追加する必要がある．


```r
c("4月10日", "4/10") %>%
  ymd()
```

```
## Warning: All formats failed to parse. No formats found.
```

```
## [1] NA NA
```

```r
c("4月10日", "4/10") %>%
  paste0("2023-", .) %>%
  ymd()
```

```
## [1] "2023-04-10" "2023-04-10"
```

ここでは日付を中心に扱うが，時刻の計算もうまくやってくれる．


```r
ymd_hms("2023-5-1-12-23-34") %>%
  print() %>%
  `+`(minutes(40))
```

```
## [1] "2023-05-01 12:23:34 UTC"
```

```
## [1] "2023-05-01 13:03:34 UTC"
```

## 曜日を求める

日付をもとに`wday()`を用いて曜日を求めることができる．
ただし，デフォルトでは日曜日を`1`，月曜日を`2`のように日曜始まりの場合での曜日番号を示す．
`label = TRUE`とすると，factorとしての曜日を返してくれる．


```r
x <- today()
wday(x) # week of the day
```

```
## [1] 1
```

```r
wday(x, label = TRUE)
```

```
## [1] 日
## Levels: 日 < 月 < 火 < 水 < 木 < 金 < 土
```

## 活用例

日付固定(同じ月日)あるいは位置固定(m月の第nのw曜日)のときでの一年後の年月日を求めることを考える．
日付固定の場合は，既に説明したように非常に簡単に求められる．


```r
x <- ymd("2023-05-01")
x + years(1)
```

```
## [1] "2024-05-01"
```

位置固定の場合は，関数を作成する必要がある．
年月日から第何の何曜日か分からなければ，位置を固定できない．
曜日は`wday()`で求められるため，第何の曜日かを求める関数が必要だ．


```r
mweek <- function(x){
  (mday(x) - 1) %/% 7 + 1
}
```

`mday(x)`で月の中で何日目か計算し(つまり  `day(x)`と同じ)，そこから1日引いた数字を7で割る．
7で割ったときに第1曜日は1未満，第2曜日は1以上2未満であるため，7で割ったときの整数部分に1を足す．
これで第何の曜日かがわかる．


```r
real    <- seq(as.POSIXct("2020-10-1"), as.POSIXct("2020-10-31"), by="day") %>% mweek()
expect <- rep(1:5, each=7)[1:31]
sum(real != expect, na.rm = TRUE)
```

```
## [1] 0
```

念のため計算した`real`と求めるべき`expect`が同じか確認する．
`real != expect`，つまり`real`と`expect`異なるときはTRUEになる．
この合計が0であれば全部が同じなので，計算結果は正しいといえる．



```r
testthat::expect_equal(real, expect)
```

念のため，パッケージtestthatで確認する．
testthat::expect_equal()の結果として，何も出力されなければテストを通過したことが分かる．


次に，年月日から1年後の
年と月を分離してそこから求めたい月の1日をbaseの日付とする．

<!--
TODO：
下の計算の説明が分かりにくいので，要修正
-->
1日から7日までは第1の，8日から14日までは第2の曜日なので，baseに「mweek(x) - 1) * 7」を足してやる．
さらに，これに曜日の補正をするため，baseと元の日付(x)との曜日の差を追加する．
ただし，差が負の場合は7から引いて正にする．
なお，「for(i in seq_along(diff))」でループしている部分は，ベクトルへの対応である．
入力が1日だけの場合は必要ないが，他の部分がベクトルに対応おり，せっかくなので複数の日付(Dateクラスのベクトル)を受け入れるようにした．

これで，一応出来上がった．
ただし，第5の曜日の場合は，次の月にずれてしまっている可能性がある．
そこで，月がずれていないか確認して，ずれている場合は「NA」を返す．


```r
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
      warning("No same date as ", x[i], "!")
    }
  }
  return(same_pos)
}
```

<!--

```r
  # 1年の日付のずれで対応できないかと考えたが，結局第nを考える必要があるので，ボツ(途中で撤退)
same_pos_next_year <- function(x){
x <- today()
  next_x <- x + years(1)
  diff <- next_x - x
  lag <- as.numeric(diff) %% 7
  next_x - lag
}
```
-->

実際の日付で確認してみる．


```r
days   <- x + (0:30)
days_n <- same_pos_next_yr(days)
```

```
## Warning in same_pos_next_yr(days): No same date as 2023-05-29!
```

```
## Warning in same_pos_next_yr(days): No same date as 2023-05-30!
```

```r
days
```

```
##  [1] "2023-05-01" "2023-05-02" "2023-05-03" "2023-05-04" "2023-05-05"
##  [6] "2023-05-06" "2023-05-07" "2023-05-08" "2023-05-09" "2023-05-10"
## [11] "2023-05-11" "2023-05-12" "2023-05-13" "2023-05-14" "2023-05-15"
## [16] "2023-05-16" "2023-05-17" "2023-05-18" "2023-05-19" "2023-05-20"
## [21] "2023-05-21" "2023-05-22" "2023-05-23" "2023-05-24" "2023-05-25"
## [26] "2023-05-26" "2023-05-27" "2023-05-28" "2023-05-29" "2023-05-30"
## [31] "2023-05-31"
```

```r
days_n
```

```
##  [1] "2024-05-06" "2024-05-07" "2024-05-01" "2024-05-02" "2024-05-03"
##  [6] "2024-05-04" "2024-05-05" "2024-05-13" "2024-05-14" "2024-05-08"
## [11] "2024-05-09" "2024-05-10" "2024-05-11" "2024-05-12" "2024-05-20"
## [16] "2024-05-21" "2024-05-15" "2024-05-16" "2024-05-17" "2024-05-18"
## [21] "2024-05-19" "2024-05-27" "2024-05-28" "2024-05-22" "2024-05-23"
## [26] "2024-05-24" "2024-05-25" "2024-05-26" NA           NA          
## [31] "2024-05-29"
```

計算できているはずだが，日付だけを見てもよくわからない．


各日付が第何の曜日かを確認してみる．


```r
mweek(days)   # 第何の曜日か
## [1] 1 1 1 1 1 1 1 2 2 2 2 2 2 2 3 3 3 3 3 3 3 4 4 4 4 4 4 4 5 5 5
mweek(days_n)
## [1]  1  1  1  1  1  1  1  2  2  2  2  2  2  2  3  3  3  3  3  3  3  4  4  4  4  4  4  4 NA NA  5
sum(mweek(days) != mweek(days_n), na.rm = TRUE)
## [1] 0
testthat::expect_equal(mweek(days), mweek(days_n))
## Error: mweek(days) not equal to mweek(days_n).
## 2/31 mismatches (average diff: NaN)
## [29] 5 - NA == NA
## [30] 5 - NA == NA
```

少しだけNAのところがあるが，それ以外はうまくいっているようだ．
testthatでのテストでも29日目と30日目がうまく行っていないことがわかる．

さらに，曜日も確認してみる．


```r
wday(days, label = TRUE)   # 曜日
##  [1] 月 火 水 木 金 土 日 月 火 水 木 金 土 日 月 火 水 木 金 土 日 月 火 水 木 金 土 日 月 火 水
## Levels: 日 < 月 < 火 < 水 < 木 < 金 < 土
wday(days_n, label = TRUE)
##  [1] 月   火   水   木   金   土   日   月   火   水   木   金   土   日   月   火   水   木   金   土  
## [21] 日   月   火   水   木   金   土   日   <NA> <NA> 水  
## Levels: 日 < 月 < 火 < 水 < 木 < 金 < 土
sum(wday(days) != wday(days_n), na.rm = TRUE)
## [1] 0
testthat::expect_equal(wday(days), wday(days_n))
## Error: wday(days) not equal to wday(days_n).
## 2/31 mismatches (average diff: NaN)
## [29] 2 - NA == NA
## [30] 3 - NA == NA
```

こちらも，最後の方でエラーが出ている．
なお，このエラーは第5週でずれるためにでてくる部分である．
ただし，28日しかない2月だけは4週にピッタリ収まるので，エラーが出ないはずだ．

テストもだいたいあっていそうだが，分かりにくいため，カレンダーで表示してみる．


```r
weeknames <-  c("M", "T", "W", "T", "F", "S", "S")
title_1 <- paste0(year(x)    , "-" ,month(x))
title_2 <- paste0(year(x) + 1, "-" ,month(x))

calendR::calendR(year(x)    , month(x), title = title_1, start = "M", weeknames = weeknames)
```

<img src="lubridate_files/figure-html/unnamed-chunk-17-1.png" width="672" />

```r
calendR::calendR(year(x) + 1, month(x), title = title_2, start = "M", weeknames = weeknames)
```

<img src="lubridate_files/figure-html/unnamed-chunk-17-2.png" width="672" />
