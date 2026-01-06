# udemy-nextjs15-newhooks-with-sns-dev

<https://www.udemy.com/course/nextjs15-newhooks-with-sns-dev/>

## 技術スタック

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React](https://ja.react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Biome](https://biomejs.dev/)
- [shadcn](https://ui.shadcn.com/)

## 開発

### 1. 依存関係のインストール

プロジェクトの依存関係をインストールします。

``` bash
npm install
```

### 2. lefthookの準備

lefthookのgitフックを準備します。

``` bash
npm run prepare
```

### 3. 開発サーバーの起動

Next.js開発サーバーを起動します。  
ファイルの変更を監視し、自動的にブラウザを更新します。

``` bash
npm run dev
```

### 4. 型チェック

TypeScriptによる型チェックを実行します。

``` bash
npm run type-check
```

### 5. コードの自動修正

[Biome](https://biomejs.dev/)を使い、リントエラーやフォーマットの問題を自動で修正します。

``` bash
npm run fix
```

### 6. 本番用ビルド

本番用のアプリケーションを`next`ディレクトリにビルドします。  
ビルド前に型チェックとBiomeによるLintチェックが実行されます。

``` bash
npm run build
```

### 7. 本番用プレビュー

ビルドされたアプリケーションをローカルでプレビューします。  
このコマンドは、まずアプリケーションをビルドし、その後本番サーバーを起動します。

``` bash
npm run preview
```

### 8. ビルド成果物の削除

`next`ディレクトリを削除します。

``` bash
npm run clean
```
