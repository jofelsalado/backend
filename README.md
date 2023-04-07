## ALL CARE SERVER API

Built with Nodejs, Typescript, Prisma, MySQL, Docker (Optional)

---

#### Installation Guide

```bash
git clone https://github.com/jofelsalado/backend.git

cd backend

cp .env.example

(if using NPM)
npm install
npm run start
** For build **
npm run build

(if using Yarn)
yarn
yarn dev
** For build **
yarn build

(To sync prisma model with database)
** Using NPM **
npx prisma db:push

** Using Yarn **
yarn prisma db:push
```

---

Example request to end http request to server's REST API

```javacsript
import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:5555/api'
})

http.get('/healthcheck')
.then(response => {
  console.log(response)
})
.catch(error => {
  console.log(error)
})
```
