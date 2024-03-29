# Deeplrで翻訳する {#deeplr}
<!--
-->

DeepLは高機能な翻訳ツールで，結構自然な文章を提案してくれる．
Google Translateもそれなりに素晴らしい翻訳をしてくれるが，それよりも良さそうな文章になることが多い．
DeepLのページに文章を入力・貼り付けするだけで簡単に使える．
しかし，ネットでのフリー版だと1回あたり5000文字という制約があるため，文章量が増えると手作業が面倒になってくる．

DeepLのAPIを使えば，1ヶ月あたり50万文字までは無料で翻訳が可能である．
Rから直接操作するのはちょっと面倒だが，CRANに登録されているdeeplrパッケージのお世話になれば簡単にDeepLを使いこなせる．



![](img/deeplr_crop_01.png){ width=70% }

## 準備


```r
install.packages("deeplr")
```


```r
library(tidyverse)
library(deeplr)
```

## DeepLのAPI
<!--
https://auto-worker.com/blog/?p=5030
https://powervbadesktop.com/web27/
-->

DeepLのAPIを使うには，事前に認証キーを取得しなければならない．

トップページの「API」をクリックして「無料で登録する」を選択する．

![](img/deeplr_crop_03.png){ width=50% }

有料バージョンなど色々とあるが，ちょっと試してみるだけなら，一番左の「無料版」で良いだろう．

![](img/deeplr_crop_04.png){ width=50% }

まずは，自分のメールアドレスとパスワードを設定する．

![](img/deeplr_crop_05.png){ width=50% }

個人情報などを登録して，その後の確認画面で登録を完了させる．

![](img/deeplr_crop_06.png){ width=50% }

登録が完了したら，ログインして「アカウント」タブに移動する．

![](img/deeplr_crop_07.png){ width=50% }

少し下に移動すると，APIキーが表示されている．
このAPIキーをコピーしておき，以下のコードの"your_api_key"に貼り付けて使用する．

![](img/deeplr_crop_08.png){ width=50% }


## deeplr

有料版のProを契約しているときは`translate()`を，無料版のfreeのときは`translate2()`を使う．
この文章の冒頭部分を英語に翻訳してみる．
`str_detect()`の正規表現で`"^[^\x01-\x7E]"`として全角文字ではじまる文字列を抽出している．
正規表現は若干ややこしいが，`[^\x01-\x7E]"`の`^`と`\x01-\x7E`はそれぞれ"以外"と"1バイト文字"の意味，最初の`^`は"行頭"の意味である．
つまり，1バイト文字以外が行頭のものということだ．




```r
text <- 
  readr::read_tsv("index.Rmd", col_names = "jp", show_col_types = FALSE) %>%
  dplyr::filter(stringr::str_detect(jp, "^[^\x01-\x7E]")) %>%
  head()
en <- 
  text %>%
  `$`("jp") %>%
  print() %>%
  purrr::map_chr(deeplr::translate2, 
    target_lang = "EN", source_lang = "JP", auth_key = "your_api_key") %>%
  print()

## [1] "誰でもそうだろうが，面倒くさい仕事はしたくない．"
## [2] "というか，したくないことが面倒くさいのだろう．"
## [3] "ニワトリとタマゴの議論は別として，できることなら面倒な作業はしたくない．"
## [4] "でも，しなければならないのなら自動化したい．"
## [5] "もちろんすべての仕事を自動化できるわけでもないし，作業内容によっては文章執筆のように自動化すべきでないこともある．"
## [6] "作業の自動化には，プログラミング言語を使うことが多い．
## [1] "No one wants to do a tedious job."
## [2] "Or perhaps it is the things we don't want to do that are troublesome."
## [3] "Apart from the chicken and egg argument, I don't want to do tedious work if I can help it."
## [4] "But if I have to, I want to automate it."
## [5] "Of course, not all tasks can be automated, and some tasks, such as writing, should not be automated."
## [6] "Programming languages are often used to automate tasks."
```

無事に翻訳できたが，自分の文章を読むよりも英語に翻訳したものを読む方がなぜか恥ずかしい感じがする．
上のように英語だけをベクトルにしてもよいが，できれば英語と日本語を並べて見たほうがわかりやすい．
あとから`tibble::tibble(en = en, jp = jp)`としても同じであるが，以下のようにすることもできる．
なお，`relocate()`は列の表示順を変更しているだけであまり大した意味はない．


```r
translated <- 
  dplyr::mutate(text, en = deeplr::translate2(jp, 
    target_lang = "EN", source_lang = "JP", auth_key = "your_api_key") %>%
  dplyr::relocate(en, jp) %>%
  print()
## # A tibble: 6 × 2
##   en                                                       jp
##   <chr>                                                    <chr>
## 1 No one wants to do a tedious job.                        誰でもそうだろ…
## 2 Or perhaps it is the hassle of not wanting to.           というか，した…
## 3 Apart from the chicken and egg argument, I don't want…  ニワトリとタマ…
## 4 But if I have to do it, I want to automate it.           でも，しなけれ…
## 5 Of course, not all tasks can be automated, and some t…  もちろんすべて…
## 6 Programming languages are often used to automate task    作業の自動化に…
```

当然だが，DeepLのページで翻訳しても同様の結果を得ることができる．

![](img/deeplr_crop_02.png){ width=70% }

<!--
translated <- 
  dplyr::relocate(en, jp) %>%

ls("package:deeplr")
-->
