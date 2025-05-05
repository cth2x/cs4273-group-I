# CS4273 Group I

## Project Overview
Our project constructs an public Oklahoma missing persons database, keeping information such as photos, demographics, and last contact information, and search and export functionality. Found cases are deleted to adhere to laws.

## Technologies Used
## Note: The live version of Missing Persons is no longer available as the hosting credits for Railway and Vercel have expired. While the application is not currently deployed, you are welcome to explore the source code in this repository. If you'd like to run the project locally, setup instructions are provided below.
### MySQL
Since our project heavily relies on a database to display our information the database chosen needs to be able to handle a large amount of data efficiently. It also needs to be able to filter data and sort it. These factors led us to choose an SQL-based database and we decided on MySQL to be a good choice as it is a free option that seemed to offer good scalability. 

### Next.js
To build a responsive and dynamic front-end, we chose Next.js, a popular React framework. It provides server-side rendering capabilities for improved performance, and allows for the creation of a highly interactive user interface that adapts seamlessly to various device types. This will be good for our project as it allows the users to quickly search for the missing persons they care about. 

### Docker
We chose Docker because our team works on different operating systems, and Docker enables us to simplify deployment, ensuring consistency across all devices. Additionally, Docker’s scalability makes it an excellent choice, allowing our database and application infrastructure to grow seamlessly as our project expands.

## Setup Instructions
1. Clone the repository with `git clone https://github.com/cth2x/CS4273_Group_I.git`
2. Navigate to the project directory.
  ```bash
cd CS4273_Group_I
```

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
- [ ] Improve UI
- [ ] Develop add/remove a person from frontend
- [ ] Check for any bugs, and show the product to the mentor to see if any changes need to be made
