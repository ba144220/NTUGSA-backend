# NTUGSA-backend

# APIs

-   url: `https://ntugsa-backend.herokuapp.com/`

## user

-   post `/user/signup`
    -   content
        ```
        {
            "name": <name>,
            "email": <email>, // ends with "@ntu.edu.tw"
            "studentId": <學號>,
            "password": <密碼>,
            "confirmPassword": <密碼> // 須與上面密碼相同
        }
        ```
    -   return
        ```
        {
            "message": "註冊成功",
            "type": "success"
        }
        ```
-   post `/user/singin`
    -   content
        ```
        {
            "studentId":"B08901097",
            "password":"1234567"
        }
        ```
    -   return
        ```
        {
        "result": {
            "\_id": "61616dc7772e110e44c4cd89",
            "name": "ych",
            "studentId": "B08901097",
            "email": "hs41511@ntu.edu.tw",
            "password": "$2b$12$L1a8xdRmaKV0t04YvCFZSOi1NbCvpX576LuGFOBOadKwgXWshn7oO", // hashed
            "role": "STUDENT",
            "verified": true,
            "workerDepartmentIds": [],
            "createdAt": "2021-10-09T10:24:07.211Z",
            "\_\_v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNjE2ZGM3NzcyZTExMGU0NGM0Y2Q4OSIsImlhdCI6MTYzMzc3NTA4NiwiZXhwIjoxNjMzODAwMjg2fQ.FyPY8f2otMTV3UbP6pHrAJChoehflh1sZQIhlOSOIMA"
        }
        ```

## department

-   get `/department/:id`
    -   param
        `615f2d9e4c11bec337e1d205`
    -   result
        `{ "_id": "615f2d9e4c11bec337e1d205", "name": "電機工程學系", "division": "", "program": "學士" }`
-   get `/department`
    -   result
        ```
        [{
            "_id": "615f2d9e4c11bec337e1d205",
            "name": "電機工程學系",
            "division": "",
            "program": "學士"
        }, {
            "_id": "615f309d4c11bec337e1d206",
            "name": "電機工程學系",
            "division": "",
            "program": "碩士"
        }]
        ```
