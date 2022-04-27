FROM node:16.14
WORKDIR /QA
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
ENV PORT 80
COPY . .
CMD [ "npm", "start" ]