# API DOCUMENTATION

```
Books

POST -> /books
 => {
    "name": string,
    "year": number,
    "author": string,
    "summary": string,
    "publisher": string,
    "pageCount": number,
    "readPage": number,
    "reading": boolean
}

GET /books

GET /books/{bookId}

PUT /books/{bookId}

DELETE /books/{bookId}
```
