# Express API Project

This is a simple API that takes a number and returns interesting mathematical properties about it, along with a fun fact.

## Setup Instructions

Follow these steps to run the project locally:

1. **Clone the Repository:**
   ```sh
   git clone <repository_url>
   cd <project_directory>
   ```

2. **Install Dependencies:**
   ```sh
   npm install
   ```

3. **Run the Server:**
   ```sh
   npm start
   ```
   The server will start on port `3300`.

## API Documentation

## Usage
You can access the API by making a GET request to the following endpoint: GET /api/classify-number?number=<number>


### Response Format
The API returns a JSON object with the following structure:

```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11, 
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371" 
}
```

### Example Usage
Using `curl`:
```sh
curl -X GET http://localhost:3300/api/classify-number?number=<number>
```

Using JavaScript (Fetch API):
```js
fetch("http://localhost:3300/api/classify-number?number=<number>")
  .then(response => response.json())
  .then(data => console.log(data));
```

This API provides a basic example of an Express server returning JSON data.

### Hire a node-js developer
- **URL:** (https://hng.tech/hire/nodejs-developers)