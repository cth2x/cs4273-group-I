FROM node:20 AS base

FROM base AS dev
WORKDIR /code

COPY ./package.json package.json
COPY ./package-lock.json package-lock.json
RUN npm install
CMD ["npm", "run", "dev"]

 

