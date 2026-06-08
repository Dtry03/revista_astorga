
FROM node:20-slim
WORKDIR /code/
ADD package.json package-lock.json /code/
RUN npm ci  
ADD . /code/
RUN npx adminforth bundle
RUN npm run build
CMD ["sh", "-c", "npm run migrate:prod && npm run prod"]