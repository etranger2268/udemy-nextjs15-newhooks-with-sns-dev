# udemy-nextjs15-newhooks-with-sns-dev

<https://www.udemy.com/course/nextjs15-newhooks-with-sns-dev/>

## 技術スタック

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [React](https://ja.react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Biome](https://biomejs.dev/)
- [shadcn](https://ui.shadcn.com/)
- [supabase](https://supabase.com/)
- [Prisma](https://www.prisma.io/)
- [clerk](https://clerk.com/)
- [ngrok](https://ngrok.com/)

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

### 3. DBマイグレーション

`prisma/schema.prisma`のスキーマ定義を元に、[supabase](https://www.prisma.io/docs/getting-started/prisma-orm/quickstart/prisma-postgres)にテーブルを作成します。
また、Prisma Clientを生成します。

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Clerk Webhook設定

clerkでユーザーが登録・更新されたときに`User`テーブルにレコードを追加・更新するため、Webhookを設定します。
ローカル開発の場合、`ngrok`を使ってローカルサーバーを外部に公開します。

```bash
ngrok http 3000
```

`ngrok`を起動したら、表示されている`Forwarding`のURL(例: `https://xxxx-xxxx-xxxx-xxxx-xxxx.ngrok-free.app`)をコピーします。

[clerkのDashboard](https://dashboard.clerk.com/)にアクセスし、`Webhooks`メニューから`Add Endpoint`をクリックします。

`Endpoint URL`に、`ngrok`で取得したURLと`/api/callback/clerk`を組み合わせた`https://xxxx-xxxx-xxxx-xxxx-xxxx.ngrok-free.app/api/callback/clerk`を入力し、`user`の`created`と`updated`イベントを購読します。

### 5. 開発サーバーの起動

Next.js開発サーバーを起動します。  
ファイルの変更を監視し、自動的にブラウザを更新します。

``` bash
npm run dev
```

### 6. 型チェック

TypeScriptによる型チェックを実行します。

``` bash
npm run type-check
```

### 7. コードの自動修正

[Biome](https://biomejs.dev/)を使い、リントエラーやフォーマットの問題を自動で修正します。

``` bash
npm run fix
```

### 8. 本番用ビルド

本番用のアプリケーションを`next`ディレクトリにビルドします。  
ビルド前に型チェックとBiomeによるLintチェックが実行されます。

``` bash
npm run build
```

### 9. 本番用プレビュー

ビルドされたアプリケーションをローカルでプレビューします。  
このコマンドは、まずアプリケーションをビルドし、その後本番サーバーを起動します。

``` bash
npm run preview
```

### 10. ビルド成果物の削除

`next`ディレクトリを削除します。

``` bash
npm run clean
```
