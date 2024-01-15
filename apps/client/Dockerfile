FROM docker.io/library/node:19.1.0@sha256:bff0e689cb433913ab411af7a58253d54c7fd8c3134ffeb25287cdf24d9a5972 AS builder

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml* ./
COPY ./.npmrc ./
RUN npm install pnpm@8.4.0 -g && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM nginx:stable@sha256:8bffcf9ec96927f23bbf4c53531c0f721f47115c237b118804e1345488436f75
COPY ci/nginx/default.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html
COPY --from=builder /app/dist .
