
# Student Details Microservice 

This project implements REST API's for managing student records and creating marks for students. It allows you to perform CRUD (Create, Read, Update, Delete) operations on student data and create marks for each student and rank them in order of their total marks and returns the rank of all the students.

## Use Cases

Use case 1: Create students  Endpoint : POST  /student

Use case 2: Create marks for students POST /marks

Use case 3: GET rank as well as total marks of all the students GET   /ranklist

## Installation 

```bash
 Clone the repository
 >> git clone <github_link_for_repo>

 >> cd student-details 

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
![Screenshot 1](https://drive.google.com/file/d/1Fi8AbpQ-f9948ziKi5lTP4QYdBmv6nrl/view?usp=drive_link)

```bash
Register the server and enter general and connection details and Save
```

![Screenshot 2](https://drive.google.com/file/d/1sMo-Pt1lxbrBssE_vpvh3a5LW7PRzRJR/view?usp=drive_link)

![Screenshot 3](https://drive.google.com/file/d/1clbiLTm6qPmEHqkyIjiou1oS5Ev_1hap/view?usp=drive_link)

![Screenshot 4](https://drive.google.com/file/d/1Wc_zH1NZ5q3iQ52u3IF3VZQMLfHXvuFc/view?usp=drive_link)







    
## API Endpoint Overview


Detailed API specifitcation : <swagger_link>

### GET all students

  *Endpoint* : /students

  *Description* : Retrieves a list of all students.

  *Response* : '200 OK'

---
---
---
---
---

### GET a specific student


  *Endpoint* : GET /student/${id}

  *Description* : Retrieves a specific student

  *Response* : '200 OK'

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of item to fetch |

---
---
---
---
---

### POST  student

**Endpoint** : POST /student

  **Description** : Creates a new student

  **Response** : '201 Created'


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. This is the student id |
| `name` | `string` | **Required**. This is the student name |

---
---
---
---
---

### Update student

**Endpoint** : PUT /student/${id}

  **Description** : Updates an existing student

  **Response** : '201 Created'


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. This is the student id |

---
---
---
---
---

### DELETE student

**Endpoint** : DELETE /student/${id}

  **Description** : Deletes an existing student

  **Response** : '204 No Content'


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. This is the student id |

---
---
---
---
---

### CREATE marks

**Endpoint** : POST /marks

  **Description** : Inserts marks

  **Response** : '201 Created'


| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**. This is the student id |
| `studentId` | `string` | **Required**. This is the student id |
| `subject` | `string` | **Required**. This is the student id |
| `marks` | `number` | **Required**. This is the student id |

---
---
---
---
---
---

### GET Ranklist

**Endpoint** : GET /ranklist

  **Description** : Get the list of ranks of the students.

  **Response** : '200 OK'

---
---
---
---
---
---


## Authors

- [@mrunal0504]



## Running Tests

To run tests, run the following command

```bash
  npm test
```
