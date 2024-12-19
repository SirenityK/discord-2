Discord 2, because, why not? I wanna self host and have discord nitro for free

## Getting Started

First, you should have a PostgreSQL instance running, set the DB on your .env file:

```.env
DATABASE_URL=postgres://postgres:{PASSWD}@{IP}/{DB}
```

You might want to edit the prisma schema to use sqlite if you dont want to use PostgreSQL.

Migrate:
```bash
bun db:migrate
```

run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Production output

Build and start the project

```bash
bun preview
```

Start only

```bash
bun start
```

# Security

Currently, the authentication system works with cookies; currently, these cookies are not set to be secure, as the project is still in development, thus testing can be done in mobile devices
