## **Show All User**

Returns json data about a `all user`.

- **URL**

  `/api/users`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  None

  **Optional:**

  `limit=[interger]`

  `page=[interger]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
      "results": [
        {
          "id": "adcbfb6c-2d10-4644-974c-7e40fcc3ccb8",
          "created": "2021-04-04T16:57:24.301Z",
          "username": "khanhtiet",
          "phone": "0954627259",
          "room": [],
          "orders": []
        },
        {
          "id": "e78194f9-4313-45b3-85ac-bba66f55c39b",
          "created": "2021-04-04T16:57:13.379Z",
          "username": "khanhtietbao",
          "phone": "0954627259",
          "room": [],
          "orders": []
        }
      ],
      "page_total": 2,
      "total": 2
    }
    ```

- **Success Response:**.
  - Code: `200`

---

## **Show User**

Returns json data about a `single user`.

- **URL**

  `/api/users:id`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  None

- **Data Params**

  None

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
      "id": "adcbfb6c-2d10-4644-974c-7e40fcc3ccb8",
      "created": "2021-04-04T16:57:24.301Z",
      "username": "khanhtiet",
      "email": "khanhtiet@gmail.com",
      "phone": "0954627259"
    }
    ```

- **Success Response:**.

  - Code: `200`

- **Error Response:**

  - **Code:** `404 NOT FOUND` <br />
    **Content:**

    ```json
    {
      "code": 404,
      "timestamp": "2021-4-5",
      "path": "/api/users/adcbfb6c-2d10-4644-974c-7e40fcc3ccb6",
      "method": "GET",
      "message": "Not found"
    }
    ```

---

## **Search User**

Returns json data about a `user`.

- **URL**

  `/api/users/search`

- **Method:**

  `GET`

- **URL Params**

  **Required:**

  `username=[string]`

  `phone=[int]`

  `email=[string]`

- **Data Params**

  None

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    [
      {
        "id": "e78194f9-4313-45b3-85ac-bba66f55c39b",
        "created": "2021-04-04T16:57:13.379Z",
        "username": "khanh123",
        "email": "khanhtiet123@gmail.com",
        "phone": "0978627259"
      },
      {
        "id": "adcbfb6c-2d10-4644-974c-7e40fcc3ccb8",
        "created": "2021-04-04T16:57:24.301Z",
        "username": "khanhtiet",
        "email": "khanhtiet@gmail.com",
        "phone": "0954627289"
      }
    ]
    ```

- **Success Response:**.

  - Code: `200`

---

## **User Register**

Returns json data about a `single user`.

- **URL**

  `/auth/register`

- **Method:**

  `POST`

- **BODY**

  **Required:**

  None

  ```
  {
    "username": "khanhtiet789",
    "email": "khanhtiet789@gmail.com",
    "phone": "0955656259" ,
    "password": "khanhtiet789"
  }
  ```

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
      "id": "cfb797f5-3b5b-4d13-ac97-b4aa1db9bbb6",
      "created": "2021-04-05T07:06:57.108Z",
      "username": "khanhtiet789",
      "phone": "0955656259",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmYjc5N2Y1LTNiNWItNGQxsy1hYzk3LWI0YWExZGI5YmJiNiIsInVzZXJuYW1lIjoia2hhbmh0aWV0Nzg5IiwiaWF0IjoxNjE3NjA2NDE3LCJleHAiOjE2MTgyMTEyMTd9.Ofc0ah9zMCPI3vx33DAUR2GR-DEbAyb0vXtPRDrLWLw"
    }
    ```

- **Success Response:**.

  - Code: `200`

---

## **User Login**

Returns json data about a `single user`.

- **URL**

  `/auth/login`

- **Method:**

  `POST`

- **BODY**

  **Required:**

  None

  ```
  {
    "username": "khanhtiet789",
    "phone": "",
    "email": "khanhtiet789@gmail.com",
    "password": "khanhtiet789"
  }
  ```

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
      "id": "cfb797f5-3b5b-4d13-ac97-b4aa1db9bbb6",
      "created": "2021-04-05T07:06:57.108Z",
      "username": "khanhtiet789",
      "phone": "0955656259",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmYjc5N2Y1LTNiNWItNGQxMy1hYzk3LWI0YWExZGI5YmJiNiIsInVzZXJuYW1lIjoia2hhbmh0aWV0Nzg5IiwiaWF0IjoxNjE3NjE3Mzc5LCJleHAiOjE2MTgyMjIxNzl9.PZjDTkQZSwCfCjXuIvAqFGjz3AamT4dhlQSltWBl5ZU"
    }
    ```

- **Success Response:**.

  - Code: `200`

---

## **Create Room**

Returns json data about a `single room`.

- **URL**

  `/api/room`

- **Method:**

  `POST`

- **BODY**

  **Required:**

  None

  ```json
  {
    "roomType": "Family Suite",
    "photoUrl": "https://cf.bstatic.com/images/hotel/max1024x768/868/86861059.jpg",
    "numberOfBed": 5,
    "numberOfPerson": 10,
    "roomize": 25,
    "airConditioning": true,
    "freeWiFi": true
  }
  ```

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
      "roomType": "Family Suite",
      "photoUrl": "https://cf.bstatic.com/images/hotel/max1024x768/868/86861059.jpg",
      "numberOfBed": 5,
      "numberOfPerson": 10,
      "roomize": 25,
      "airConditioning": true,
      "freeWiFi": true,
      "id": "46cae299-06c0-4ba1-ac59-51ace88f0d77",
      "created": "2021-04-05T10:19:18.865Z",
      "updated": "2021-04-05T10:19:18.865Z",
      "author": null
    }
    ```

- **Success Response:**.

  - Code: `200`

---

## **Show All room**

Returns json data about a `All room`.

- **URL**

  `/api/room`

- **Method:**

  `GET`

- **BODY**

  **Required:**

  None

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ````json

        ```

      [
      {
      "id": "80a15be2-097c-4097-80fb-9a83c662737a",
      "created": "2021-04-05T10:17:25.166Z",
      "updated": "2021-04-05T10:17:25.166Z",
      "roomType": "Standard",
      "photoUrl": "<https://cf.bstatic.com/xdata/images/hotel/square200/90824324.webp?k=fcc921b76ce65a21d10763eef5504d77adb522df180fc3b89a3fa34bd8b515de&o>=",
      "numberOfBed": 5,
      "numberOfPerson": 10,
      "roomize": 25,
      "airConditioning": true,
      "freeWiFi": true,
      "author": null
      },
      {
      "id": "46cae299-06c0-4ba1-ac59-51ace88f0d77",
      "created": "2021-04-05T10:19:18.865Z",
      "updated": "2021-04-05T10:19:18.865Z",
      "roomType": "Family Suite",
      "photoUrl": "https://cf.bstatic.com/images/hotel/max1024x768/868/86861059.jpg",
      "numberOfBed": 5,
      "numberOfPerson": 10,
      "roomize": 25,
      "airConditioning": true,
      "freeWiFi": true,
      "author": null
      }
    ]
    ````

- **Success Response:**.

  - Code: `200`

---

## **Search Room**

Returns json data about a `single room`.

- **URL**

  `/api/room/search`

- **Method:**

  `Get`

- **PARAMS**

  **Required:**
  roomType=[string]

  ```json
  [
    {
      "id": "80a15be2-097c-4097-80fb-9a83c662737a",
      "created": "2021-04-05T10:17:25.166Z",
      "updated": "2021-04-05T10:17:25.166Z",
      "roomType": "Standard",
      "photoUrl": "https://cf.bstatic.com/xdata/images/hotel/square200/90824324.webp?k=fcc921b76ce65a21d10763eef5504d77adb522df180fc3b89a3fa34bd8b515de&o=",
      "numberOfBed": 5,
      "numberOfPerson": 10,
      "roomize": 25,
      "airConditioning": true,
      "freeWiFi": true
    }
  ]
  ```

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
      "roomType": "Family Suite",
      "photoUrl": "https://cf.bstatic.com/images/hotel/max1024x768/868/86861059.jpg",
      "numberOfBed": 5,
      "numberOfPerson": 10,
      "roomize": 25,
      "airConditioning": true,
      "freeWiFi": true,
      "id": "46cae299-06c0-4ba1-ac59-51ace88f0d77",
      "created": "2021-04-05T10:19:18.865Z",
      "updated": "2021-04-05T10:19:18.865Z",
      "author": null
    }
    ```

- **Success Response:**.

  - Code: `200`

---

## **Create Room**

Returns json data about a `single room`.

- **URL**

  `/api/room/:id`

- **Method:**

  `PUT`

- **HEADER**

  `Authorization:` - Bearer `Access Token`

- **BODY**

  **Required:**

  ```json
  {
    "roomType": "Deluxe",
    "numberOfBed": 2,
    "numberOfPerson": 9,
    "roomize": 20,
    "airConditioning": false,
    "freeWiFi": true,
    "photoUrl": "https://cf.bstatic.com/images/hotel/max1024x768/868/86861059.jpg"
  }
  ```

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
      "id": "2321db03-0873-459c-a44f-85fe0f2ee4f1",
      "created": "2021-04-05T10:31:29.764Z",
      "updated": "2021-04-05T10:31:29.764Z",
      "roomType": "Besiness Suite",
      "photoUrl": "https://cf.bstatic.com/images/hotel/max1024x768/868/86861059.jpg",
      "numberOfBed": 5,
      "numberOfPerson": 10,
      "roomize": 25,
      "airConditioning": true,
      "freeWiFi": true,
      "author": {
        "id": "cfb797f5-3b5b-4d13-ac97-b4aa1db9bbb6",
        "created": "2021-04-05T07:06:57.108Z",
        "username": "khanhtiet789",
        "phone": "0955656259"
      }
    }
    ```

---

## **Read Room**

Returns json data about a `single room`.

- **URL**

  `/api/room/:id`

- **Method:**

  `Get`

- **BODY**

  **Required:**

  None

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
      "id": "2321db03-0873-459c-a44f-85fe0f2ee4f1",
      "created": "2021-04-05T10:31:29.764Z",
      "updated": "2021-04-05T10:31:49.958Z",
      "roomType": "Standard",
      "photoUrl": "https://cf.bstatic.com/xdata/images/hotel/square200/90824324.webp?k=fcc921b76ce65a21d10763eef5504d77adb522df180fc3b89a3fa34bd8b515de&o=",
      "numberOfBed": 5,
      "numberOfPerson": 10,
      "roomize": 25,
      "airConditioning": true,
      "freeWiFi": true,
      "author": {
        "id": "cfb797f5-3b5b-4d13-ac97-b4aa1db9bbb6",
        "created": "2021-04-05T07:06:57.108Z",
        "username": "khanhtiet789",
        "phone": "0955656259"
      }
    }
    ```

---

## **Delete Room**

Returns json data about a `single room`.

- **URL**

  `/api/room/:id`

- **Method:**

  `Delete`

- **HEADER**

  **Required:**

  `Authorization:` - Bearer `Access Token`

- **Success Response:**

  - **Code:** `200` <br />
    **Content:**

    ```json
    {
        "created": "2021-04-05T10:31:29.764Z",
        "updated": "2021-04-05T10:31:49.958Z",
        "roomType": "Standard",
        "photoUrl": "https://cf.bstatic.com/xdata/images/hotel/square200/90824324.webp?k=fcc921b76ce65a21d10763eef5504d77adb522df180fc3b89a3fa34bd8b515de&o=",
        "numberOfBed": 5,
        "numberOfPerson": 10,
        "roomize": 25,
        "airConditioning": true,
        "freeWiFi": true,
        "author": {
            "id": "cfb797f5-3b5b-4d13-ac97-b4aa1db9bbb6",
            "created": "2021-04-05T07:06:57.108Z",
            "username": "khanhtiet789",
            "phone": "0955656259"
    }

    ```

---
