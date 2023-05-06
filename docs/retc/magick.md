# magickで画像編集 {#magick}

<!--
-->

パッケージmagickを使うと，各種の画像編集ができる．
magickは，画像編集ソフトであるImageMagickを使うためのパッケージである．
ImageMagickは，png，gif，pdfなどをはじめ多くの画像形式を扱うことができ，拡大・縮小，形式変換，回転，切り出し，色加工など多くの機能を備えている．
ImageMagick自体は，コマンドラインで使うことができるので，関数`system()`を使ってRから操作することもできる．
でも，車輪の再発明は時間と労力の無駄なので，パッケージmagickを紹介する．

## 準備

例によってまずはパッケージをインストールする．
svg形式の画像を読み込む場合は，rsvgパッケージもインストールしておく．
ウエブのスクリーンショットを使うので，webshotも必要だ．


```r
install.packages("magick")
install.packages("rsvg")
install.packages("webshot")
```




```r
library(magick)
library(tidyverse)
library(webshot)
```

## 使い方

ImageMagick自体に多くの機能があり，magickでもその機能を利用できるため，1つ1つを紹介するとキリがない．
ここでは，基本的な機能として画像の読み込み・変換・保存を紹介するとともに，
[rvestでスクレイピング](#rvest)で使用した画像を作成するために，実際に操作したコードを説明する．

### 読み込み・表示・変換・保存

png，jpeg，gif形式の画像には`image_read()`，svg形式には`image_read_svg()`，PDF形式には`image_read_pdf()`をそれぞれ用いる．
読み込んだ画像オブジェクトの情報を表示するには，`image_info()`を使う．
表示だけなら，オブジェクトをそのまま入力しても同じである．


```r
frink <- magick::image_read("https://jeroen.github.io/images/frink.png")
tiger <- magick::image_read_svg("http://jeroen.github.io/images/tiger.svg")
image_info(frink)
```

```
## # A tibble: 1 x 7
##   format width height colorspace matte filesize density
##   <chr>  <int>  <int> <chr>      <lgl>    <int> <chr>  
## 1 PNG      220    445 sRGB       TRUE     73494 72x72
```

```r
image_info(tiger)
```

```
## # A tibble: 1 x 7
##   format width height colorspace matte filesize density
##   <chr>  <int>  <int> <chr>      <lgl>    <int> <chr>  
## 1 PNG      900    900 sRGB       TRUE         0 72x72
```

画像そのものを表示するには，`image_browse()`を用いる．
OSで関連付けられているソフトが立ち上がって，画像を閲覧できる．


```r
magick::image_browse(tiger)
```

`image_convert()`を用いると画像をpng，jpeg，gif，pdf形式に変換できる．
画像形式は，`format`で指定する．
また，`type = "grayscale"`とすると，白黒画像似できる．


```r
magick::image_convert(tiger, format = "pdf") %>%
  magick::image_browse()
```

画像を保存するには，関数`image_write()`を使う．
この関数の引数にも`format`があり，ここで形式を変換することもできる．
`image_write()`の`path`で拡張子を含むファイル名を指定しても，自動的にはその拡張子の形式としては保存されない．
形式を変換したい場合は，`format`で形式をしていしなければならない．
`format`を指定しなければ，もとの画像の形式のまま保存される．


```r
magick::image_write(frink, path = "frink.pdf", format = "pdf") 
magick::image_write(frink, path = "frink")
```

### 切り抜き

画像を切り抜きする前に，webshotを使って画像を取得する．




```r
  # 画像の取得
urls <- 
  list("http://jpnrdb.com/search.php?mode=spec",
       "http://jpnrdb.com/search.php?mode=key&q=ニッコウキスゲ",
       "http://jpnrdb.com/search.php?mode=map&q=06050095259")
pngs <- paste0("rvest_", 1:3, ".png")
purrr::map2(urls, pngs, webshot::webshot)
```

```
## [[1]]
## 
## [[2]]
## 
## [[3]]
```

`image_crop()`をそのまま使っても便利ではあるが，切り出しサイズ・位置の指定方法がどうも個人の性に合わない．
そのためラッパー関数で，切り出したい左上の位置と右下の位置を指定できるようにする．
切り出しの左上と右下の位置は，画像編集ソフトなどで別途確認する．

もし，切り出しの位置の細かな設定が面倒であれば，いくつかのパターンを作っておき，総当たり的に画像を切り出して，その中から求めるものを探す方法もある．
その場合は，出力したファイルがどの設定によるものか分かるように，出力するファイル名に位置情報を付与しておくと良いだろう．


```r
magick_crop <- function(image, left_top, right_bottom){
  left   <- left_top[1]
  top    <- left_top[2]
  right  <- right_bottom[1]
  bottom <- right_bottom[2]
  geometry <- paste0(right - left, "x", bottom - top, "+", left, "+", top)
  magick::image_crop(image, geometry)
}
```

今回は切り出し位置として2つ使う．
1つ目は，`rvest_1.png`と`rvest_2.png`で使うもので，2つ目は，`rvest_3.png`で使うものである．
それぞれの正しい設定だけを使ってコードを書いても良いが，面倒なのでとりあえず2つの位置を使って，画像を3つとも変換してしまう．
変換後に実際に必要な画像だけを使えば良い．

ところで，magickパッケージの関数ベクトルに対応しているので，文字列のベクトルである`pngs`でもそのまま引数として使うことができる．
ただし，2つのベクトルを引数に使うことはできないため，以下ではmap2を使っている．
また，その直前で返り値をリストに変換するために`as.list()`を使っている．


```r
crop_1 <- 
  magick::image_read(pngs) %>%
  magick_crop(c(100, 0), c(890, 560)) %>%
  as.list() %>%
  purrr::map2_chr(., paste0("crop1_", pngs), magick::image_write)
crop_2 <- 
  magick::image_read(pngs) %>%
  magick_crop(c(100, 0), c(890, 980)) %>%
  as.list() %>%
  purrr::map2_chr(., paste0("crop2_", pngs), magick::image_write)
crops <- c(crop_1[c(1,2)], crop_2[3])
```

ここでは，`image_crop()`を使用したが，上下左右から変化がない部分を除去する`image_trim()`という関数がある．
余白部分(色は白だけとは限らない)を単純に除去するだけでれば，`位置を指定する必要のない`image_trim()`の方が楽である．

### サイズの変更

画像サイズを変更するには，`image_scale()`を使う．
`geometry = "200"`で幅200ピクセルに，`geometry = "x200"`で高さ200ピクセルに変更できる．
なお，縦横比を保ったままである．


```r
resizes_crops <- 
  magick::image_read(crops) %>%
  magick::image_scale(geometry = "600")
```

### 枠(余白)の追加・註釈(テキスト)の追加

画像に枠(余白)と註釈(テキスト)をつけるには，それぞれ`image_border()`と`image_annotate()`を使う．
`image_border()`で`geometry = "x40"`は上下に，`geometry = "40"`は左右に
40ピクセルの枠を追加する．
`image_annotate()`は位置`location`，角度`degrees`，文字サイズ`size`，フォント`font`なども指定可能である．


```r
boders_annotates <- 
  resizes_crops %>%
  magick::image_border("white", geometry = "x40") %>%
  as.list() %>%
  purrr::map2(., urls, magick::image_annotate, size = 20)
```

## その他の関数

magickには，他にも有用な関数がたくさんある．


```r
image_append(image, stack = FALSE)   # 並べて表示，stack = TRUEで縦並べ
image_background(image, color)       # 背景の色付け
image_rotate(image, degrees)         # 回転
image_blur(image, radius, sigma)     # ぼかし処理．radius，sigma：ぼかしの大きさ
image_noise(image, noisetype)        # ノイズの追加
image_charcoal(image, radius, sigma) # 縁取り
image_oilpaint(image, radius)        # 油絵
image_edge(image, radius)            # エッジ
image_negate(image)                  # ネガ
image_morph(image, frames)           # 画像を指定したframes間隔
image_animate(image, fps, loop)      # image_morph()画像のアニメ化，fps：frames/秒，`loop = 1`で繰り返しなし
```

## ウエブのスクリーンショットにURLを付加する関数

これまでの内容をもとに，ウエブのスクリーンショットにURLを付加する関数を作成する．
主な流れは次のとおりである．

- 一時ファイル名を生成   
- 一時ファイルにURLで指定したウエブのスクリーンショットを保存   
- スクリーンショットを読み込み，一時ファイルの削除   
- 余白のトリミング(オプション)   
- URLを書き込む白色の枠を上下に追加   
- URLの追加   
- 下側の白色の枠の削除   
- 形式の変換(オプション)   
- サイズの変更(オプション)   



```r
#' Donwload screenshot image from web based on URL and add text annotation of URL on the top of the image.
#' 
#' Needs 
#' 
#' @param url           A string of URL.
#' @param trim          A logical if trim image by magick::image_trim().
#' @param border_size   A string of border size. "x40": Set border on the top for annotation.
#'                      Will be passed like imagick::image_border(img, "white", geometry = border_size).
#' @param annotate_size A string of annnotation size.
#'                      Will be passed like magick::image_annotate(img, url, size = annotate_size)
#' @param format        A string of format of image. 
#'                      Will be passed like magick::image_convert(img, format = format)
#' @param resize        A string for resize by magick::image_scale(). 
#'                      Passed like magick::image_scale(geometry = resize).
#' @return              An magick-image object.
#' @examples
#' # install.packages("magick")
#' # install.packages("webshot")
#' url <- "https://www.deepl.com/translator"
#' tmp <- web_screenshot(url, format = "png")
#' magick::image_browse(tmp)
#' magick::image_write("deepl.png")
#' 
#' @export
web_screenshot <- function(url, trim = TRUE, border_size = "x40", annotate_size = 20, format = "png", resize = FALSE){
  png <- paste0(fs::file_temp(), ".png")
  webshot::webshot(url, png)
  img <- magick::image_read(png)
  file_delete(path)
  if(trim){ img <- magick::image_trim(img) }
    # add top margin (removed bottom margin by image_crop)
  img <- magick::image_border(img, "white", geometry = border_size)
  crop_size <- stringr::str_split(border_size, pattern = "x", simplify = TRUE)[2]
  h <- magick::image_info(img)$height - as.numeric(crop_size)
  img <- magick::image_crop(img, geometry = paste0("x", h))
  img <- magick::image_convert(img, format = format)
    # add annotation
  img <- magick::image_annotate(img, url, size = annotate_size)
  if(resize != FALSE){ img <- magick::image_scale(geometry = risize) }
  return(img)
}
```

