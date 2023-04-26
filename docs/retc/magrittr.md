# magrritrでコードを簡潔に {#magrittr}

パッケージmagrittrはちょっと変わっている．

そもそも名前が変わっていて何と読んで良いのか分からない．
公式ページには「magrittr (to be pronounced with a sophisticated french accent) 」と書かれている．
フランス語は，大学の第2外国語で習ったが，すでに記憶の彼方に沈んでしまっている．

主な関数がパイプ(`%>%`)である点もちょっと変わっている．
ただし，パイプ以外にもパイプとともに使うと便利な関数も含まれている．
例えば，set_colnames()はデータフレームの列名を変更する時に便利だ．
パイプを使ったコードの途中で列名を変更するために，`<- colnames()`でコードを区切るのは面倒である．
  # <- colnames でできる?
  # `[<-` 
また，set_colnames()以外にも，dplyrのrename()やselect()で列名を変更する方法もある．


```r
hoge <- colnames(c("foo", "bar"))
hoge  %>%
  magrittr::set_colnames(c("foo", "bar")) %>%
  dplyr::filter(...)
```


magrittrに含まれる関数たちで，どんな内容か気になるものの一覧


```r
export("n'est pas")
export(add)
export(and)
export(equals)
export(not)
export(or)
export(pipe_nested)
export(set_colnames)
export(use_series)
```


## tidyverseとmagrittr

tidyverseは，Rでのデータ解析には欠かせないものになっている．
そこで，Rを起動時にtidyverseを読み込む人は多いだろう．
なお，tidyverseは1つのパッケージではなく，複数のパッケージからなるパッケージ群である．


```r
library(tidyverse)
```

tidyverseのパッケージ群を読み込んだときや，そのうちの個別のパッケージ(forcats，tibble，stringr，dplyr，tidyr，purrrなど)を読み込むと，`%>%` (パイプ)を使うことができる．
私は`%>%`がtidyverseの独自のものだと勘違いをしていた．
しかし，`%>%`はもとはパッケージmagrittrの関数であり，そこからインポートされている．
そのため，tidyverseを読み込むと使うことができる．
`%>%`は，慣れるまでは何が便利なのか分からないが，慣れると欠かせなくなる．
さらに使っていると，癖なってしまって無駄にパイプを繋ぐこともある．
長過ぎるパイプは良くないのは当然であるものの，適度に使うとRでのプログラミングは非常に楽になる．

tidyverseの関数では，引数とするオブジェクトが統一されている．
具体的には，第1引数のオブジェクトがデータフレームやtibbleになっていることが多い．
そのため，パイプと相性が特に良い．

## `%>%`とその仲間

`%>%`の仲間としては，以下の関数もある．

- `%<>%`
- `%T>%`
- `%$%`

これらの関数は，tidyverseには含まれていないため，使用するにはmagrittrを読み込む必要がある．
`%>%`と同じように使うことができるが，役割がそれぞれ違う．


```r
library(magrittr)
```

```
## 
## Attaching package: 'magrittr'
```

```
## The following object is masked from 'package:purrr':
## 
##     set_names
```

```
## The following object is masked from 'package:tidyr':
## 
##     extract
```


### `%<>%`

`%<>%`は，パイプを使って処理した内容を，最初のオブジェクトに再度代入するときに使う．
ほんの少しだけ，コードを短くできる．


```r
head(mpg) # 燃費データ
```

```
## # A tibble: 6 x 11
##   manufacturer model displ  year   cyl trans      drv     cty   hwy fl    class 
##   <chr>        <chr> <dbl> <int> <int> <chr>      <chr> <int> <int> <chr> <chr> 
## 1 audi         a4      1.8  1999     4 auto(l5)   f        18    29 p     compa~
## 2 audi         a4      1.8  1999     4 manual(m5) f        21    29 p     compa~
## 3 audi         a4      2    2008     4 manual(m6) f        20    31 p     compa~
## 4 audi         a4      2    2008     4 auto(av)   f        21    30 p     compa~
## 5 audi         a4      2.8  1999     6 auto(l5)   f        16    26 p     compa~
## 6 audi         a4      2.8  1999     6 manual(m5) f        18    26 p     compa~
```

```r
tmp <- mpg
tmp <-
  tmp %>%
  dplyr::filter(year==1999) %>%
  tidyr::separate(trans, into=c("trans1", "trans2", NA)) %>%
  head() %>%
  print()
```

```
## # A tibble: 6 x 12
##   manufacturer model     displ  year   cyl trans1 trans2 drv     cty   hwy fl   
##   <chr>        <chr>     <dbl> <int> <int> <chr>  <chr>  <chr> <int> <int> <chr>
## 1 audi         a4          1.8  1999     4 auto   l5     f        18    29 p    
## 2 audi         a4          1.8  1999     4 manual m5     f        21    29 p    
## 3 audi         a4          2.8  1999     6 auto   l5     f        16    26 p    
## 4 audi         a4          2.8  1999     6 manual m5     f        18    26 p    
## 5 audi         a4 quatt~   1.8  1999     4 manual m5     4        18    26 p    
## 6 audi         a4 quatt~   1.8  1999     4 auto   l5     4        16    25 p    
## # i 1 more variable: class <chr>
```

```r
tmp <- mpg
tmp %<>%
  dplyr::filter(year==1999) %>%
  tidyr::separate(trans, into=c("trans1", "trans2", NA)) %>%
  head() %>%
  print()
```

```
## # A tibble: 6 x 12
##   manufacturer model     displ  year   cyl trans1 trans2 drv     cty   hwy fl   
##   <chr>        <chr>     <dbl> <int> <int> <chr>  <chr>  <chr> <int> <int> <chr>
## 1 audi         a4          1.8  1999     4 auto   l5     f        18    29 p    
## 2 audi         a4          1.8  1999     4 manual m5     f        21    29 p    
## 3 audi         a4          2.8  1999     6 auto   l5     f        16    26 p    
## 4 audi         a4          2.8  1999     6 manual m5     f        18    26 p    
## 5 audi         a4 quatt~   1.8  1999     4 manual m5     4        18    26 p    
## 6 audi         a4 quatt~   1.8  1999     4 auto   l5     4        16    25 p    
## # i 1 more variable: class <chr>
```

注意点としては，試行錯誤でコードを書いている途中は，あまり使わないほうが良いだろう．
もとのオブジェクトが置き換わるので，処理結果が求めるものでないときに，もとに戻れなくなってしまう．
コードを短くできるのは1行だけで，可読性が特に高くなるというわけでもない．
便利なことは便利で，私も一時期はよく使用していた．
しかし，上記の理由もあって，最近はほとんど使用していない．

### `%T>%`

処理途中に分岐をして別の処理をさせたいときに使う．
例えば，ちょっとだけ処理して，変数に保存するときに使う．
imapと組み合わせて，保存する画像のファイル名を設定する時に使うと便利である．


`%T>%`は便利ではあるが，以下の点で注意が必要である．
- 分岐途中の結果をオブジェクトに代入するときには，`<-`ではなく，`<<-`を使う
- 明示的に「.」を使う
- 複数処理があれば，「{}」で囲う
- 処理終了後に「%>%」が必要

例のコードを示す


```r
  #  mpg %T>%
  #    {
  #      tmp <<- dplyr::select(., ) 
  #    } %>%
```

`%T>%`を使うとコードの途中に，ちょっとだけ枝分かれしたコードを挿入できる．
有用な機能ではあるが，トリッキーなコードになる可能性があるため，使いすぎには気をつけたい．


### `%$%`

`%$%`は，`%>%`と`.$`の組み合わせのショートカットである．


```r
mpg %>% .$manufacturer %>% head()
```

```
## [1] "audi" "audi" "audi" "audi" "audi" "audi"
```

```r
mpg %$%   manufacturer %>% head()
```

```
## [1] "audi" "audi" "audi" "audi" "audi" "audi"
```

パッケージ開発ではパイプを使った場合の`.`が推奨されていない．
R CMD CHECK(???)のpossible problemでWarningが出力され，そのままではCRANでは受け付けてもらえない(たぶん)．
automaterのようにGithubでパッケージを公開するならそれでも問題はないが，Checkで毎回Warningが出力されるのは，心理的に嬉しくない．

そこで，DESCRIPTIONで次のように`%$%`や`%>%`をインポートしておくと，パッケージの中でこれらを使える．
`%>%`だけなら，usethis::use_pipe()とすれば，開発パッケージのDESCRIPTIONに，importFrom(magrittr,"%>%")を書いてくれる．


```r
importFrom(magrittr,"%>%")
importFrom(magrittr,"%$%")
```

なお余談ではあるが，この場合は`$`の代わりに`[[`と`]]`を使っても同じ結果が得られる．
`[`と`]`ではデータフレームの1列をそのまま取り出すので，結果が異なる．


```r
mpg %>% .$manufacturer      %>% head()
```

```
## [1] "audi" "audi" "audi" "audi" "audi" "audi"
```

```r
mpg %>% .[["manufacturer"]] %>% head()
```

```
## [1] "audi" "audi" "audi" "audi" "audi" "audi"
```

```r
mpg %>% .["manufacturer"]   %>% head()
```

```
## # A tibble: 6 x 1
##   manufacturer
##   <chr>       
## 1 audi        
## 2 audi        
## 3 audi        
## 4 audi        
## 5 audi        
## 6 audi
```

`[[ ]]`と`[ ]`は，それぞれ`[[`と`[`という関数であるため，以下のように書くことができる．
この場合，第1引数がパイプの前から引き継がれるため，`.`を明示する必要がない．


```r
mpg %>% `$`(manufacturer)    %>% head()
```

```
## [1] "audi" "audi" "audi" "audi" "audi" "audi"
```

```r
mpg %>% `[[`("manufacturer") %>% head() # mpg %>% `[[`(., "manufacturer") と同じ
```

```
## [1] "audi" "audi" "audi" "audi" "audi" "audi"
```

```r
mpg %>% `[`("manufacturer")  %>% head()
```

```
## # A tibble: 6 x 1
##   manufacturer
##   <chr>       
## 1 audi        
## 2 audi        
## 3 audi        
## 4 audi        
## 5 audi        
## 6 audi
```
