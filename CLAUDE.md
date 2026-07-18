# y-okawa777.github.io — デベロッパーサイト

個人開発iOSアプリを紹介するGitHub Pagesサイト(ユーザーサイトのため `main` ブランチ直下がそのまま公開される)。
ビルド不要の純粋な静的サイト(HTML/CSS/Vanilla JS)。フレームワーク・npm・ビルドステップは導入しないこと。

## デザイン方針

- **テーマ: サイバーパンク**。ダーク背景 + ネオンカラー(シアン/マゼンタ/イエロー/グリーン)、グリッチ演出、ターミナル風UI、斜めカットのカード(clip-path)。この世界観を崩さないこと。
- 色は全て `assets/css/style.css` の `:root` CSS変数で管理。色変更は変数のみ編集する。
- フォント: Orbitron(見出し)/ Share Tech Mono(ターミナル・ラベル)/ Rajdhani + Noto Sans JP(本文)。Google Fonts読み込み。
- `prefers-reduced-motion` 対応済み。アニメーション追加時も必ず対応すること。

## 多言語対応(重要)

- ブラウザ言語が日本語 → 日本語表示、それ以外 → 英語表示。ヘッダーのトグルで手動切替可(`localStorage.lang` に保存)。
- UI文言は `assets/js/i18n.js` の `I18N` オブジェクトに集約。**HTMLに直接文言をハードコードしない**。要素には `data-i18n="キー"` を付ける(placeholderは `data-i18n-placeholder`)。
- App Storeリンクは言語に応じて `/jp/`(日本語)と `/us/`(英語)を自動で出し分ける(`main.js` の `appUrl()`)。

## ファイル構成

```
index.html            … 全セクション(ヒーロー/カタログ/ABOUT/CONTACT)を含む1ページ構成
assets/css/style.css  … 全スタイル。色は:rootの変数で一元管理
assets/js/apps-data.js … アプリカタログのデータ(APPS配列)★アプリ追加はここだけ
assets/js/i18n.js     … UI文言(I18N)とカテゴリ表示名(CATEGORY_LABELS)
assets/js/main.js     … 言語判定/カード描画/フィルタ/検索/アイコン取得
privacy/ja.html       … プライバシーポリシー日本語版(全アプリ共通。削除しない)
privacy/en.html       … プライバシーポリシー英語版(ja.htmlと内容を同期させること)
privacy/privacy.css   … ポリシーページ専用スタイル(style.cssの変数を利用)
app-ads.txt           … AdMob用(既存。削除しない)
```

## アプリを追加・修正する手順

1. `assets/js/apps-data.js` の `APPS` 配列にオブジェクトを追加(ファイル冒頭のコメント参照)。
   - `id` はApp Store URL末尾の数値、`slug` はURLのスラッグ部分(日本語アプリ名はURLエンコード済み文字列のまま)。
   - `name` / `desc` は必ず ja / en 両方書く。descは1〜2文で興味を引くコピーにする。
   - `accent` は cyan / magenta / yellow / green から、隣接カードと色が偏らないように選ぶ。
2. 新カテゴリを作る場合のみ `assets/js/i18n.js` の `CATEGORY_LABELS` に ja / en を追加。
3. アイコンは iTunes Lookup API から自動取得されるので手動配置は不要。

## アプリアイコンについて

- `main.js` が `https://itunes.apple.com/lookup?id=...` を一括取得し、`localStorage`(`iconCache_v1`)に24時間キャッシュ。
- 取得失敗時(オフライン・審査中アプリ等)は頭文字のネオングラデーションプレースホルダを表示するため、壊れない。
- 表示がおかしい時は DevTools で `localStorage.removeItem('iconCache_v1')` してリロード。

## 既知の注意点

- CoinPouch のJP版URLは元の資料では `id67848988400`(桁が1つ多いタイポ)だったが、正しい `id6784898840` を使用している。
- **【重要】App Store の各アプリは `https://y-okawa777.github.io/privacy/ja` (拡張子なし) をプライバシーポリシーURLとして登録済み**。GitHub Pages は拡張子なしURLを同名の `.html` に解決するため、`privacy/ja.html` / `privacy/en.html` は絶対にリネーム・削除しないこと(リンク切れ=審査リジェクトの原因になる)。
- フッターの Privacy Policy リンクは言語連動(`main.js` の `applyI18n()` で ja→`privacy/ja.html` / en→`privacy/en.html` に切替)。
- プライバシーポリシーは全アプリ共通の内容(端末内保存・AdMob広告・端末権限に言及)。内容を変える時は ja.html / en.html を必ず両方更新する。問い合わせ先は `app.yutech@gmail.com`。
- ヒーロー統計は3つ(アプリ数/カテゴリ数/個人開発100%)。ABOUTのポイントカードは SIMPLE / FAST の2つ(PRIVATEはユーザー指示で削除済み。復活させない)。
- 連絡先メールは `app.yutech@gmail.com` に統一(index.html の CONTACT セクションと privacy/ja.md・en.md の3箇所)。変更する場合は3箇所すべて更新すること。

## 動作確認

ローカルで `python3 -m http.server` 等で配信して確認(`file://` 直開きでもほぼ動くが、fetch系はhttp配信推奨)。
確認項目: ①ja/en切替で全文言・リンク先(/jp/⇔/us/)が変わる ②カテゴリフィルタと検索 ③モバイル幅(375px)での表示。
