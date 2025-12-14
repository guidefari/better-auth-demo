FROM oven/bun:latest

WORKDIR /app

COPY package.json bun.lock* ./
COPY turbo.json ./
COPY biome.json ./
COPY tsconfig.json ./

COPY client/package.json ./client/
COPY server/package.json ./server/
COPY shared/package.json ./shared/

RUN bun install

COPY client ./client
COPY server ./server
COPY shared ./shared

RUN bun run build:single

EXPOSE 3000

CMD ["bun", "run", "start:single"]
