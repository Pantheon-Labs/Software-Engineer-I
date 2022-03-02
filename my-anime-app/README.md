This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

1. Gain authentication token from [AniApi](https://aniapi.com/)
   * You must go to [aniapi.com](https://aniapi.com/) and create an account.
   * Once there go to your [profile](https://aniapi.com/profile#jwt) and copy the JSON Web Token (JWT).
   * You will use this for authentication.

2. Set up your .env file
   * Make a my-anime-app/.env file.
   * This file should look like:

    ```text
    BEARER_TOKEN=Bearer {your JWT here}
    ```

3. Run these commands:

    ```bash
    npm install
    npm install dotenv
    ```

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.
