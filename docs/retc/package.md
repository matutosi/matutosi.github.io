# パッケージのインストール {#package}

R単体でも多くの機能があるものの，実際には各種パッケージを利用することが多い．
パッケージのインストールには，Rで簡単なコマンドを実行するだけである．

多くのパッケージが，Rの総本山であるCRANに登録されている．
https://cran.r-project.org/

CRANに登録するには，それなりに厳しいチェックがある．
ただし，私自身でも登録できていることが証明しているが，CRANに登録されたからといってバグが無いわけではない．
そのためR本体もそうだが，Rのパッケージも利用はあくまで自己責任が基本である．

CRANに登録されたパッケージの開発バージョンは，GitHubで公開されていることが多い．
また，CRANには登録されずGitHubのみで公開されているパッケージも存在する．

## CRANから {#cran}

CRANではR本体だけでなく，各種パッケージが公開されている．

https://cran.r-project.org/web/packages/available_packages_by_name.html

CRANに登録されたパッケージで名前がわかっていたら，以下のようにすればインストールできる．


```r
  # ミラーサイト(ダウンロード元)の設定
options(repos = "https://cran.ism.ac.jp/")
  # 1つの場合
install.packages("tidyverse")
  # 複数の場合
pkg <- c("xlsx", "magrittr", "devtools")
install.packages(pkg)
```

実行すると，ファイルをダウンロードし，成功(あるいは失敗)したことが表示される．

## GitHubから {#github}

たいていはCRANに登録されているが，GitHubにしかないパッケージもある．
その場合には，以下のようにする．


```r
install.packages("devtools")
devtools::install_github("matutosi/ecan")
```

