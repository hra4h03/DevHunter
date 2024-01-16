FROM docker.io/library/node:19.1.0@sha256:bff0e689cb433913ab411af7a58253d54c7fd8c3134ffeb25287cdf24d9a5972 AS builder

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml* ./
COPY ./.npmrc ./
RUN npm install pnpm@8.4.0 -g && pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

FROM docker.io/library/node:lts-alpine3.18@sha256:5ff63217ec2757b29a4414e0f787bfc13c1f9cb6f053e46ff05c1a51bbd2e8e6

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml* ./
COPY ./.npmrc ./
RUN npm install pnpm@8.4.0 -g && pnpm install --frozen-lockfile --production

COPY --from=builder /app/dist .

CMD ["node", "main.js"]
