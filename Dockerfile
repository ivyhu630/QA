FROM node:16.14
WORKDIR /QA
COPY package.json /QA/package.json
RUN npm install
ENV PORT 80
COPY . /QA
CMD [ "npm", "start" ]