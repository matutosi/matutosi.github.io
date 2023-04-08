# パッケージのインストール {#package}

R単体でも多くの機能があるものの，実際には各種パッケージを利用することが多い．
パッケージのインストールするには，Rで簡単なコマンドを実行するだけである．

## CRANから {#cran}


CRANは，Rの総本山である．

https://cran.r-project.org/

R本体だけでなく，各種パッケージが公開されている．

https://cran.r-project.org/web/packages/available_packages_by_name.html

CRANに掲載されており，パッケージの名前がわかっていたら，以下のようにすればインストールできる．


```r
  # ミラーサイト(ダウンロード元)の設定
options(repos = "https://cran.ism.ac.jp/")
  # 1つの場合
install.packages("tidyverse")
```

```
## package 'tidyverse' successfully unpacked and MD5 sums checked
## 
## The downloaded binary packages are in
## 	C:\Users\matu\AppData\Local\Temp\RtmpyQHVrW\downloaded_packages
```

```r
  # 複数の場合
pkg <- c("xlsx", "magrittr", "devtools")
install.packages(pkg)
```

```
## package 'xlsx' successfully unpacked and MD5 sums checked
## package 'magrittr' successfully unpacked and MD5 sums checked
## package 'devtools' successfully unpacked and MD5 sums checked
## 
## The downloaded binary packages are in
## 	C:\Users\matu\AppData\Local\Temp\RtmpyQHVrW\downloaded_packages
```

実行すると，ファイルをダウンロードし，成功(あるいは失敗)したことが表示される．

## GitHubから {#github}

たいていはCRANに登録されているが，GitHubにしかないパッケージもある．
その場合には，以下のようにする．


```r
install.packages("devtools")
```

```
## package 'devtools' successfully unpacked and MD5 sums checked
## 
## The downloaded binary packages are in
## 	C:\Users\matu\AppData\Local\Temp\RtmpyQHVrW\downloaded_packages
```

```r
devtools::install_github("matutosi/ecan")
```

```
## WARNING: Rtools is required to build R packages, but no version of Rtools compatible with R 4.2.2 was found. (Only the following incompatible version(s) of Rtools were found: 4.3.5550)
## 
## Please download and install Rtools 4.2 from https://cran.r-project.org/bin/windows/Rtools/ or https://www.r-project.org/nosvn/winutf8/ucrt3/.
```

```
## Downloading GitHub repo matutosi/ecan@HEAD
```

```
## vctrs      (0.6.0  -> 0.6.1 ) [CRAN]
## cli        (3.6.0  -> 3.6.1 ) [CRAN]
## pillar     (1.8.1  -> 1.9.0 ) [CRAN]
## gtable     (0.3.2  -> 0.3.3 ) [CRAN]
## ggplot2    (3.4.1  -> 3.4.2 ) [CRAN]
## dplyr      (1.1.0  -> 1.1.1 ) [CRAN]
## dendextend (1.16.0 -> 1.17.1) [CRAN]
```

```
## Installing 7 packages: vctrs, cli, pillar, gtable, ggplot2, dplyr, dendextend
```

```
## package 'vctrs' successfully unpacked and MD5 sums checked
```

```
## Warning: cannot remove prior installation of package 'vctrs'
```

```
## Warning in file.copy(savedcopy, lib, recursive = TRUE): problem copying
## D:\pf\R\R-4.2.2\library\00LOCK\vctrs\libs\x64\vctrs.dll to
## D:\pf\R\R-4.2.2\library\vctrs\libs\x64\vctrs.dll: Permission denied
```

```
## Warning: restored 'vctrs'
```

```
## package 'cli' successfully unpacked and MD5 sums checked
```

```
## Warning: cannot remove prior installation of package 'cli'
```

```
## Warning in file.copy(savedcopy, lib, recursive = TRUE): problem copying
## D:\pf\R\R-4.2.2\library\00LOCK\cli\libs\x64\cli.dll to
## D:\pf\R\R-4.2.2\library\cli\libs\x64\cli.dll: Permission denied
```

```
## Warning: restored 'cli'
```

```
## package 'pillar' successfully unpacked and MD5 sums checked
## package 'gtable' successfully unpacked and MD5 sums checked
## package 'ggplot2' successfully unpacked and MD5 sums checked
## package 'dplyr' successfully unpacked and MD5 sums checked
## package 'dendextend' successfully unpacked and MD5 sums checked
## 
## The downloaded binary packages are in
## 	C:\Users\matu\AppData\Local\Temp\RtmpyQHVrW\downloaded_packages
## ── R CMD build ─────────────────────────────────────────────────────────────────
```

```
## WARNING: Rtools is required to build R packages, but no version of Rtools compatible with R 4.2.2 was found. (Only the following incompatible version(s) of Rtools were found: 4.3.5550)
## 
## Please download and install Rtools 4.2 from https://cran.r-project.org/bin/windows/Rtools/ or https://www.r-project.org/nosvn/winutf8/ucrt3/.
```

```
## * checking for file 'C:\Users\matu\AppData\Local\Temp\RtmpyQHVrW\remotes3360756028a2\matutosi-ecan-6e837a5/DESCRIPTION' ... OK
## * preparing 'ecan':
## * checking DESCRIPTION meta-information ... OK
## * checking for LF line-endings in source and make files and shell scripts
## * checking for empty or unneeded directories
## Omitted 'LazyData' from DESCRIPTION
## * building 'ecan_0.2.0.tar.gz'
## 
```
