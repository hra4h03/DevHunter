# Dev Hunter

## Description
Dev Hunter is a platform for companies to find developers.

## Installation

Before running the app, you should install dependencies, rename `.env.example` to `.env` and fill the variables.

```bash
$ cd ./apps/client && pnpm install
$ cd ./apps/server && pnpm install
```

## Running the app in the host

```bash
# development
$ cd ./apps/client && pnpm start:dev
$ cd ./apps/server && pnpm start:dev
```

## Running the app in the container

```bash
# development
$ docker-compose -f docker-compose.dev.yaml up -d

# production
$ docker-compose -f docker-compose.yaml up -d

# for only working with database
$ docker-compose -f docker-compose.db.yaml up -d
```

## Running Miggrations

Running migrations are responsible task, and autorunning migrations is not a good idea. So, you should run migrations manually.
These migrations create tables and insert seed data into them.

```bash
$ cd ./apps/server && pnpm run migration:run
```