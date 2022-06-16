const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const http = require('http');
const OpenApiValidator = require('express-openapi-validator');
const apiSpec = path.join(__dirname, 'api.yaml');

const app = express();

const methodOverride = require('method-override')
const mongoose = require('mongoose')
const restify = require('express-restify-mongoose')
const router = express.Router()

// 1. Install bodyParsers for the request types your API will support
app.use(bodyParser.json());
app.use(methodOverride())

mongoose.connect('mongodb://localhost:27017/database')

restify.serve(router, mongoose.model('Customer', new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String }
})))

app.use(router)

// app.use('/spec', express.static(apiSpec));

// //  2. Install the OpenApiValidator on your express app
// app.use(
//   OpenApiValidator.middleware({
//     apiSpec,
//     validateResponses: true, // default false
//     // 3. Provide the base path to the operation handlers directory
//     operationHandlers: path.join(__dirname), // default false
//   }),
// );

// 4. Woah sweet! With auto-wired operation handlers, I don't have to declare my routes!
//    See api.yaml for x-eov-* vendor extensions

// 5. Create a custom error handler
// app.use((err, req, res, next) => {
//   // format errors
//   res.status(err.status || 500).json({
//     message: err.message,
//     errors: err.errors,
//   });
// });

// http.createServer(app).listen(port);
// console.log(`Listening on port ${port}`);

// module.exports = app;

app.listen(3000, () => {
  console.log('Express server listening on port 3000')
})