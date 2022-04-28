FROM node:16.14
WORKDIR /QA
COPY ["package.json", "package-lock.json*", "./"]
RUN npm install
ARG DBUSER
ARG DBNAME
ARG DBPASS
ENV PORT=3001 DB_HOST="3.101.68.93" DB_USER=$DBUSER DB_NAME=$DBNAME DB_PASS=$DBPASS
COPY . .
CMD [ "npm", "start" ]