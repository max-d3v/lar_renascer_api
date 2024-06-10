FROM node:21

RUN mkdir funil_vendas_api

WORKDIR /funil_vendas_api

COPY package.json .

RUN npm install

COPY . .

CMD ["npm", "start"]