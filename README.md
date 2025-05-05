# CS4273 Group I

## Project Overview
Our project constructs an public Oklahoma missing persons database, keeping information such as photos, demographics, and last contact information, and search and export functionality. Found cases are deleted to adhere to laws.

## Technologies Used
> **Note:** The live version of *Missing Persons* is no longer available, as the hosting credits for Railway, Vercel, and AWS have expired. While the application is not currently deployed, you are welcome to explore the source code in this repository. Database setup for this project has been provided in the .sql and can be imported. Docker will need to have updated host settings but If you'd like to run the project locally, setup instructions are provided below.
### My
Since our project heavily relies on a database to display our information the database chosen needs to be able to handle a large amount of data efficiently. It also needs to be able to filter data and sort it. These factors led us to choose an SQL-based database and we decided on MySQL to be a good choice as it is a free option that seemed to offer good scalability. 

### Next.js
To build a responsive and dynamic front-end, we chose Next.js, a popular React framework. It provides server-side rendering capabilities for improved performance, and allows for the creation of a highly interactive user interface that adapts seamlessly to various device types. This will be good for our project as it allows the users to quickly search for the missing persons they care about. 

### Docker
We chose Docker because our team works on different operating systems, and Docker enables us to simplify deployment, ensuring consistency across all devices. Additionally, Docker’s scalability makes it an excellent choice, allowing our database and application infrastructure to grow seamlessly as our project expands.

## Dependencies
 "dependencies": {
    "@mui/icons-material": "^6.4.2",
    "@mui/material": "^6.4.2",
    "@mui/x-date-pickers": "^7.25.0",
    "@prisma/client": "^6.3.1",
    "cookie": "^1.0.2",
    "date-fns": "^4.1.0",
    "dayjs": "^1.11.13",
    "iron-session": "^8.0.4",
    "lucide-react": "^0.475.0",
    "material-react-table": "^3.1.0",
    "mysql2": "^3.12.0",
    "next": "15.1.6",
    "prisma": "^6.3.1",
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  },
  "devDependencies": {
    "@playwright/test": "^1.50.1",
    "@types/node": "20.17.16",
    "@types/react": "19.0.8",
    "@types/react-dom": "^19",
    "@types/stylis": "^4.2.7",
    "postcss": "^8",
    "shadcn-ui": "^0.9.4",
    "tailwindcss": "^3.4.1",
    "typescript": "5.7.3"
  }

## Setup Instructions
1. Clone the repository with `git clone https://github.com/cth2x/CS4273_Group_I.git`
2. Navigate to the project directory.
  ```bash
cd CS4273_Group_I
```
Locally (Without Docker){
Install dependencies
npm run dev
Goto http://localhost:3000 to see project

Then run containers with docker:

Build container initially (first time):
```bash
docker compose up --build
```

Running every time afterwords:

```bash
docker compose up
```



## Team Contributers
Mel Fillmore - Mentor

Noah Zinn - Product Owner

Cole Hicks - Quality Assurance

Carson Siemens - SM1

Tyler Vuong - SM2

Muhammad Ali - SM3

Connor Corbin - SM4

## Progress Plan
- [X] Setup simple frontend page with JS.
  - [X] Choose what library we want to import the data table from, or make a table from scratch.
  - [X] Use data from CSV to fill the data table.
- [X] Review features needed with the mentor
  - [X] Show demo of frontend, decide if any feature is missing, and update demo as needed
- [X] Setup backend database based on requirements
- [X] Connect database to frontend, host site on docker
- [X] Connect individual missing person page
- [X] Incorporate Admin authentication and permissions
- [X] Improve UI
- [X] Develop add/remove a person from frontend
- [X] Check for any bugs, and show the product to the mentor to see if any changes need to be made
