
step to run this API Repository
1. clone this repository use git clone https://github.com/DiansSopandi/nuTech.git 
2. install nodeJs
3. no need sql file to create a postgreSQL table, 
   just create a database on your local machine call "db_nutech",

   so. just create a postgreSQL database with name call 'db_nutech'
   
   its going to auto create user table on postgreSQL database name "db_nutech"

   authentication to your postgreSQL local machine 

   user: 'postgres'

   password: 'root'

   database: 'db_nutech'

4. start the backend API application with yarn start , yarn dev, pnpm start  or pnpm dev  
5. for testing this CRUD API, its could be to use postman tool
6. alternative to test without postman,  use swagger library just type http://localhost:3007/api-docs 

   this link use swagger library to documentation the API and voila, you can play the CRUD action

   thank you 

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# development
$ yarn  start

# watch mode
$ yarn dev
