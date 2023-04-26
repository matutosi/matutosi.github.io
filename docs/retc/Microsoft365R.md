# Microsoft365R {#Microsoft365R}
  #   https://cran.r-project.org/web/packages/Microsoft365R
  # Outlookの使い方
  #   https://cran.r-project.org/web/packages/Microsoft365R/vignettes/outlook.html

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
