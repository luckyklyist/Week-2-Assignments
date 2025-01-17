/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module

  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files

  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt

    - For any other route not defined in the server return 404

    Testing the server - run `npm run test-fileServer` command in terminal
 */
const express = require('express');
const fs = require('fs');
const path = require('path');
const { encode } = require('punycode');

const app = express();

const PORT = 3001;

app.get('/files', (req, res) => {
  try {
    fs.readdir('./files', (err, files) => {
      if (err) {
        console.log("err", err);
        return
      }
      let fileName = []
      files.forEach((file) => {
        fileName.push({ "filename": file })
      })
      res.status(200).json({ data: fileName })
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" })

  }
})

app.get('/file/:filename', (req, res) => {
  try {
    const fileName = req.params.filename;
    const filePath = path.join('./files/' + fileName);
    let fileContent;
    try {
      fileContent = fs.readFileSync(filePath,'utf-8');
    }
    catch (err) {
      console.log(error);
      res.status(500).json({ "error": "Internal server error" });
      return;
    }
    res.status(200).json({ "file_content": fileContent });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error" })
  }
})

app.listen(PORT, () => console.log(`Server running at the port ${PORT}`))

module.exports = app;
