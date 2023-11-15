FROM oven/bun:latest

WORKDIR /api

COPY package.json ./
COPY bun.lockb ./
COPY src ./src

RUN bun install

CMD ["bun", "run", "start"]
