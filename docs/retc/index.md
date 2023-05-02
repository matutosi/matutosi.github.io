--- 
title: "Rにる作業の自動化・効率化 -パッケージ活用術-"
author: "Toshikazu Masumura"
date: "2023-05-03"
site: bookdown::bookdown_site

  # https://qiita.com/Atsushi776/items/9ef1e5d744e2b91c61ee#xelatex%E3%82%92%E7%94%A8%E3%81%84%E3%82%8B%E5%A0%B4%E5%90%88
output:
  pdf_document: 
    latex_engine: xelatex 
header-includes: 
  - \usepackage{bookmark} 
  - \usepackage{xltxtra} 
  - \usepackage{zxjatype} 
  - \usepackage[ipa]{zxjafont} 
---

# はじめに {-}

誰でもそうだろうが，面倒くさい仕事はしたくない．
というか，したくないことが面倒くさいのだろう．
ニワトリかタマゴのような話は別として，できることなら，面倒な作業は自動化したい．
もちろんすべての仕事を自動化できるわけでもないし，文章執筆のように作業内容によっては自動化すべきでないこともある．

作業の自動化には，プログラミング言語を使うことが多い．
自動化でよく使われる言語としては，Pythonがある．
Pythonは比較的習得しやすい言語らしく，多くの人が使っている．
自分自身も多少はPythonを使えるものの，それよりもRの方が慣れている．
できることなら(ほぼ)全ての作業をRでやってしまいたい．
そんなわけで，この文章ではRを使った作業の自動化や効率化方法を紹介する．

基本的に独学でここまで来たので，我流のスクリプトや汚いコードが多くあると思われるがご容赦頂きたい．
また，改善案をご教示いただければありがたい．

matutosi@gmail.com
