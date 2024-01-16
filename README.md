# Dev Hunter

## Installation

```bash
$ pnpm run client install
$ pnpm run server install
```

## Running the app in the host

```bash
# development
$ pnpm run client start:dev
$ pnpm run server start:dev
```

## Running the app in the container

```bash
# development
$ docker-compose -f docker-compose.dev.yaml up -d

# production
$ docker-compose -f docker-compose.yaml up -d
```