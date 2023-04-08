# ggplot2の勧め {#ggplot2}

<!--
![](images/tools_list01.png){ width=70% }
<img src="images/tools_list01.png" width="30%">
-->


## Rの作図環境の概要

- base(graphics)
- lattice
- grid
- ggplot2

## ggplot2とは

ggplot2は，tidy dataにしておけば，使いやすい


## ggplot2の利点

1つのデータをもとに，ちょっとの変更で棒グラフ，散布図，などなど各種のplotが可能
図が綺麗で，テーマの変更も簡単
facetによるグループ分けも便利

magrittrとの相性も良い．
特にファイル名を設定するときの`%$%`や`%T%`など

ggplot2をサポートするライブラリも豊富

凡例の自動的な位置決めや配置など
ggpubrなども



## ggplot2の基本

irisを例にするが，できれば，veganとかdaveのデータを使う
tidy dataへの変換が必要
コードのみか，詳しくは松村や比嘉の解説を参考に

gather()とspread()はpivot_longer()とpivot_wider()になって使いやすくなった．
Hadley自身も使い方を混乱していたらしい





aesthetics

geom_point()
geom_bar()
aes()
colour
group
size

## facetを使おう

forループやsubset，あるいはdplyr::filterを使っていたものが，一気にできて便利
コードも簡単で見やすい
コードの転用が簡単

group VS facet

## ggsave

- pngとPDF   
PDFで日本語文字が化ける場合は，pngを使う

- 指定しないと，直前のプロット   



## 文字化けへの対処(windows)

-cario?



## themeを少しだけ説明

- デフォルト   
- theme_bw()   

## shiny

Rだけでウェブアプリが作れる
reactiveの考え方を覚える必要あり

## 参考書

- ggplot2
- ggplot2のレシピ
- unwin GDA
- チートシート


