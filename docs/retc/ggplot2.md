# ggplot2で楽に綺麗に作図 {#ggplot2}

<!--
![](images/tools_list01.png){ width=70% }
<img src="images/tools_list01.png" width="30%">
-->


## Rの作図環境の概要

Rの作図環境として主なものは以下の4つがある．

- base graphics
- lattice
- grid
- ggplot2

base graphicsは古典的な作図環境で長らく使われてきた．
Rが統計解析のシステムとして使われるようになった理由の1つとして強力な作図環境があり，まさしくこのgraphicsシステムがそれに当たる．
すごく便利なものと当時は考えていた．
ただし，base graphicsは紙と鉛筆を使って作図していくようなものだと喩えられることがあるように，作図済みのものは修正できない．
また，作図する関数によって引数の取り方が異なるなど，発展するなかで継ぎ接ぎだらけになってしまった．
システムが急速に発展する中では，このような状況はよくあることで途中から綺麗に整理し直すことは困難である．
新しいシステムを作り直す方が楽であり現実的である．

そのような状況もあってか，lattice，それをもとにしたgrid，さらにはこの2つをベースにしたggpot2が開発された．
これら3つの作図環境のうち，最近ではggplot2が最も使われているものである．
ggplot2では，Grammar of Graphics，つまり作図の文法という考え方が用いられており，洗練された作図が可能である．
詳細は「ggplot2」(Hadley )を参照して欲しい．


## ggplot2とは

ggplot2は，作図環境を提供するパッケージである．
baseの作図環境とは異なり，統一的なインターフェスを持っており，非常に使いやすい．
散布図を作成したデータをもとにして，簡単に箱ひげ図などの他の形式の作図やグループ分けした作図も簡単である．

### ggplot2の利点

ggplot2では，第1引数としてtidyなデータフレームを受け取る．

- 1つのデータから各種作図が可能    
  ちょっとの変更で棒グラフ，散布図，などなど各種のplotが可能
- 図が綺麗
- テーマの変更も簡単
- facetによるグループ分けも便利
- magrittrによるパイプとの相性が良い   
  特にファイル名を設定するときの`%$%`や`%T%`など
- ggplot2をサポートするパッケージも豊富    
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

shinyは必要?
Rだけでウェブアプリが作れる
reactiveの考え方を覚える必要あり

## 作図の自動化

例を示す．

- 入力：readr, readxl    
  エクセルかcsvでデータ入力
- 分析：dplyr, stringr   
  filter(), summarise(), tally()
- 作図：ggplot2   
  ggplot()
  geom_point()
  geom_jitter()
  geom_boxplot()
  ggsave()

## 参考書

- ggplot2
- ggplot2のレシピ
- unwin GDA
- チートシート

