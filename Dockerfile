FROM node:18.19

WORKDIR /code

COPY ./missing-persons/package.json package.json
COPY ./missing-persons/package-lock.json package-lock.json

RUN npm install


