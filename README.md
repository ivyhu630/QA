# Questions & Answers
This service replaces the existing API with a backend system that can support the full data set for the project and can scale to meet the demands of production traffic.

## Setup

1. Run `npm intall` to intall dependencies.
2. Run `npm start` to start the Node server.

## Service Routes

GET routes:
* `/qa/questions` - Return all questions with nested answers for the product_id supplied as the parameter
* `/qa/questions/:question_id/answers` - Return all questions with nested answers for the question_id supplied as the path

POST routes:
* `/qa/questions` - Submit a new question for the `product_id` in the request body.
* `/qa/questions/:question_id/answers` - Submit a new answer for the `question_id` in the request body.

PUT routes:
* `/qa/questions/:question_id/helpful` - Mark a question helpful
* `/qa/questions/:question_id/report` - Report a question
* `/qa/answers/:answer_id/helpful` - Mark an answer helpful
* `/qa/answers/:answer_id/report` - Report an answer


### **Creater: Ivy Hu**
[![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ivyhu630/)
[![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/ivyhu630)


## Technologies used
### **Set-up and Workflow**
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
### **Backend Development**
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
![Nginx](https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
### **Testing**
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
