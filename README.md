# Image Text Extraction API

This API allows you to extract text and bounding boxes from images using Optical Character Recognition (OCR) powered by Tesseract.js.

## Features

- **Extract Text**: Convert images to text.
- **Get Bounding Boxes**: Retrieve bounding boxes for words, lines, paragraphs, blocks, or pages.

## Technologies Used

- **Node.js**: JavaScript runtime for building the API.
- **Express**: Web framework for Node.js.
- **Tesseract.js**: OCR library for recognizing text in images.
- **Body-Parser**: Middleware for parsing incoming request bodies.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tesseract-ocr-assignment.git
   cd tesseract-ocr-assignment
2. Install dependencies:
   ```bash
   npm install
3. Run the Server
   ```bash
   node index.js

## API Endpoints

1. Extract Text from Image
- POST: /api/get-text

2. Get Bounding Boxes
- POST: /api/get-bboxes

You can test the API using tools like Postman or cURL by sending a POST request with the required body.
Feel free to modify the sections, add more details, or adjust the usage examples as needed!
