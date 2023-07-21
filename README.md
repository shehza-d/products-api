# Product APIs Documentation

A document products api with mongo node drive

[![wakatime](https://wakatime.com/badge/user/2b9bc0da-3bf8-4082-b333-bc011089fbbb/project/91c93c6b-65bf-4904-902e-49fc1283b63b.svg)](https://wakatime.com/badge/user/2b9bc0da-3bf8-4082-b333-bc011089fbbb/project/91c93c6b-65bf-4904-902e-49fc1283b63b)

This document provides a comprehensive guide to using the Product APIs to interact with the product data stored in the backend. The APIs allow you to retrieve, add, update, and delete products. Before using the APIs, ensure you have set up the necessary backend server and have a clear understanding of the request and response structures.

## Base URL

All API requests should be made to the following base URL:
[`http://localhost:3003/`](http://localhost:3003/)

## Endpoints

### 1. Get One Product

Retrieve details of a specific product by providing its unique ID.

- **Endpoint:** `/product/{product_id}`
- **Method:** GET
- **URL Template:** http://localhost:3003/api/v1/product/64b6b990be8c3565d3f55c00

### 2. Get All Products

Retrieve a list of all products available in the system.

- **Endpoint:** `/products`
- **Method:** GET
- **URL Template:** http://localhost:3003/api/v1/products

### 3. Add Product

Add a new product to the system with the given details.

- **Endpoint:** `/product`
- **Method:** POST
- **URL Template:** http://localhost:3003/api/v1/product/
- **Request Body:**

  ```json
  {
    "name": "samsung",
    "price": 50,
    "description": "im testing"
  }
  ```

### 4. Update Product

Update an existing product with new details using its unique ID.

- **Endpoint:** `/product`
- **Method:** PUT
- **URL Template:** http://localhost:3003/api/v1/product
- **Request Body:**

```json
{
  "id": "64b6b990be8c3565d3f55c00",
  "name": "Samsung",
  "price": 500,
  "description": "Lorem Ipsum is simply dummy book. It has survived not only"
}
```

### 5. Delete One Product

Delete a specific product from the system using its unique ID.

- **Endpoint:** /product/{product_id}
- **Method:** DELETE
- **URL Template:** http://localhost:3003/api/v1/product/64b7d998528ea187021255e9

### Request Headers

The APIs do not require any specific headers to be passed in the requests. The examples provided above do not include any headers.

### Response

The API responses will contain relevant data or messages based on the request made. The response structure may vary depending on the specific endpoint. However, the API collection does not provide any response examples, so you will need to test the APIs and refer to the backend documentation for more details on the responses.

**Notes:**
Always ensure you have the correct base URL [http://localhost:3003/api/v1](http://localhost:3003/api/v1) when making requests to the API endpoints.
For endpoints that require request bodies (e.g., Add Product, Update Product), make sure to provide valid JSON data in the raw format.
Please refer to the backend documentation or consult the developers for additional information on the expected responses, error handling, and any authentication/authorization requirements for these APIs.
