FROM node:20 AS base

FROM base AS dev
WORKDIR /code

COPY ./missing-persons/package.json package.json
COPY ./missing-persons/package-lock.json package-lock.json
RUN npm install
CMD ["npm", "run", "dev"]

 

