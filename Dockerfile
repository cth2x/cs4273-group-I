FROM node:20 AS base

FROM base AS dev
WORKDIR /code
CMD ["npm", "run", "dev"]

 

