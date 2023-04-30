# lubridate

年月日や曜日を扱う場合，パッケージlubridateを利用するのが便利である．
lubridateは，tidyverseに含まれているパッケージの1つで，日付や時刻・時間データを扱う際には必須と言っても過言ではない．

## 1月後・1年後の同一日付

例えば，1月後や1年後の同一の日付を得たいとする．
これは単純なようで実はややこしい問題を含んでいる．
月には大の月・小の月があるし，年には閏年がある．
そのため，自分で関数を作成しようとするとややこしい．
そこで，lubridateを活用して，簡単に計算する．

1年後の同一の日付を得るに日「+ years(1)」とすれば良い．
単純に365日加えるのとは結果が異なる．
1月後の場合には「months(1)」を使う


```r
library(lubridate) # tidyverseに含まれており本来不要，説明用に明示
library(tidyverse)
```


```r
today() + years(0:4)
```

```
## [1] "2023-04-30" "2024-04-30" "2025-04-30" "2026-04-30" "2027-04-30"
```

```r
today() + days(365 * 0:4)
```

```
## [1] "2023-04-30" "2024-04-29" "2025-04-29" "2026-04-29" "2027-04-29"
```

```r
today() + months(0:11)
```

```
##  [1] "2023-04-30" "2023-05-30" "2023-06-30" "2023-07-30" "2023-08-30"
##  [6] "2023-09-30" "2023-10-30" "2023-11-30" "2023-12-30" "2024-01-30"
## [11] NA           "2024-03-30"
```

```r
today() + months(0:11)
```

```
##  [1] "2023-04-30" "2023-05-30" "2023-06-30" "2023-07-30" "2023-08-30"
##  [6] "2023-09-30" "2023-10-30" "2023-11-30" "2023-12-30" "2024-01-30"
## [11] NA           "2024-03-30"
```

## 文字列からDateクラスへの変換

日本語の表記でよく出てくる年・月・日の順の日付表記は，関数ymd()でDateクラスに変換できる．
ymd()は，日付っぽい文字列などをDateクラスにしてくれる．
ふつうに使うような以下の文字列は，普通に変換してくれる．
ちなみに，日付の後ろに「(月)」のような曜日が入っていても問題ない(曜日は無視される)．

- 2023年4月10日    
- 2023-4-10   
- 2023_4_10   
- 20230410   
- 2023/4/10   


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

## 曜日を求める

日付をもとにwday()を用いて曜日を求めることができる．
ただし，デフォルトでは日曜日を「1」，月曜日を「2」のように日曜始まりの場合での曜日番号を示す．
「label = TRUE」とすると，factorとしての曜日を返してくれる．


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


```r
library(patchwork)
library(calendR)
```




```r
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
calendR::calendR(2023,5)
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

![](lubridate_files/figure-latex/unnamed-chunk-8-1.pdf)<!-- --> 

```r
calendR::calendR(2024,5)
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

![](lubridate_files/figure-latex/unnamed-chunk-8-2.pdf)<!-- --> 
