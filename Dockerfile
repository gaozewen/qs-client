FROM node:18 AS builder

COPY package.json .
COPY package-lock.json .
RUN npm config set registry https://registry.npmmirror.com && npm i

COPY . .
RUN npm run build

FROM node:18

WORKDIR /opt/app

COPY --from=builder ./.next ./.next
COPY --from=builder ./node_modules ./node_modules
COPY --from=builder ./public ./public
COPY --from=builder ./package.json ./package.json

ENV NODE_ENV=production

CMD [ "npm", "start" ]