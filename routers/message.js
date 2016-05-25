var express = require('express');
var Message = require('../models/message');

var messageRouter = express.Router();

messageRouter
  .route('/messages')
  .post(function (request, response) {

    console.log('POST /messages');

    var message = new Message(request.body);

    message.save();

    response.status(201).send(message);
  })
  .get(function (request, response) {

    console.log('GET /messages');

    Message.find(function (error, messages) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(messages);

      response.json(messages);
    });
  });

messageRouter
  .route('/messages/:messageId')
  .get(function (request, response) {

    console.log('GET /messages/:messageId');

    var messageId = request.params.messageId;

    Message.findOne({ id: messageId }, function (error, message) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      console.log(message);

      response.json(message);

    });
  })
  .put(function (request, response) {

    console.log('PUT /messages/:messageId');

    var messageId = request.params.messageId;

    Message.findOne({ id: messageId }, function (error, message) {

      if (error) {
        response.status(500).send(error);
        return;
      }

      if (message) {
        message.name = request.body.name;
        message.description = request.body.description;
        message.quantity = request.body.quantity;
        
        message.save();

        response.json(message);
        return;
      }

      response.status(404).json({
        message: 'Message with id ' + messageId + ' was not found.'
      });
    });
  })
  .patch(function (request, response) {

    console.log('PATCH /messages/:messageId');

    var messageId = request.params.messageId;

    Message.findOne({ id: messageId }, function (error, message) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (message) {

        for (var property in request.body) {
          if (request.body.hasOwnProperty(property)) {
            if (typeof message[property] !== 'undefined') {
              message[property] = request.body[property];
            }
          }
        }

        // if (request.body.name) {
        //   message.name = request.body.name;
        // }

        // if (request.body.description) {
        //   message.description = request.body.description;
        // }

        // if (request.body.quantity) {
        //   message.quantity = request.body.quantity;
        // }

        message.save();

        response.json(message);
        return;
      }

      response.status(404).json({
        message: 'Message with id ' + messageId + ' was not found.'
      });
    });
  })
  .delete(function (request, response) {

    console.log('DELETE /messages/:messageId');

    var messageId = request.params.messageId;

    Message.findOne({ id: messageId }, function (error, message) {
      
      if (error) {
        response.status(500).send(error);
        return;
      }

      if (message) {
        message.remove(function (error) {

          if (error) {
            response.status(500).send(error);
            return;
          }

          response.status(200).json({
            'message': 'Message with id ' + messageId + ' was removed.'
          });
        });
      } else {
        response.status(404).json({
          message: 'Message with id ' + messageId + ' was not found.'
        });
      }
    });
  });

module.exports = messageRouter;