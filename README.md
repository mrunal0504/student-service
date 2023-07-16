
# Student Details Microservice 

This project implements REST API's for managing student records and creating marks for students. It allows you to perform CRUD (Create, Read, Update, Delete) operations on student data and create marks for each student and rank them in order of their total marks and returns the rank of all the students.

## Installation 

```bash
 Clone the repository
 >> git clone https://github.com/mrunal0504/student-service.git

 >> cd student-service 

 Configure the database connection settings in src/data-source.ts file.

 Install the dependencies 
 >> npm install

```
## Running the project

```bash
npm start
```
## Configuration

Database used : PostgresSQL

Administration and management tool for PostgreSQL : PGAdmin

Fire the below command on command prompt

```bash
>> docker pull postgres
>> docker run --name postgres-container -e POSTGRES_PASSWORD=mysecretpassword -p 5432:5432 -d postgres
>> docker pull dpage/pgadmin4:latest
>> docker run --name pgadmin-container --link postgres-container -p 80:80 -e PGADMIN_DEFAULT_EMAIL=user@domain.com -e PGADMIN_DEFAULT_PASSWORD=SuperSecret -d dpage/pgadmin4:latest


```

```bash
Configure the database connection settings in data-source.ts file in the source code.

The following values should be set in data-source.ts :

type: "postgres" specifies that the database type is PostgreSQL. 
host: "localhost" specifies the hostname or IP address of the database server.
port: 5432 specifies the port number on which the database server is running.
username: "postgres" and password: "mysecretpassword" provide the credentials for the database user.
database: "postgres" specifies the name of the database to connect to.

```

## Setup the database

```bash
Open your preferred web browser and enter http://127.0.0.1:5050 or http://localhost:5050 in the address bar.

Press Enter to navigate to the specified URL,the pgAdmin login page should appear.

Enter your user Id and password in the respective fields.

Click on the "Login" button or press Enter.

If the credentials are correct, you will be redirected to the pgAdmin home page.
```
![Alt text](/images/1.png)

```bash
Register the server and enter general and connection details and Save
```

!![Alt text](/images/2.png)

!![Alt text](/images/3.png)

!![Alt text](/images/4.png)

## Database sample structure

!![Alt text](/images/table_structure)

    
# API Endpoint Overview


!![Alt text](/images/swagger.png)

# Data Flow Diagram

!![Alt text](/images/Data_flow_diagram.png)

## Entity relationship Diagram

!![Alt text](/images/Entity-relationship-model.png)

## Author

- [@mrunal0504]



## Running Tests

To run tests, run the following command

```bash
  npm test
```
After running the above command you should be able to see the below result

!![Alt text](/images/testcases_screenshot.png)

