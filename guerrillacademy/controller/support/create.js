'use strict';

require('dotenv').config();

const supportSchema = require('../../schemas/support');
const { TRELLO_API_KEY, TRELLO_OAUTH_TOKEN, TRELLO_LIST } =  process.env;
var apiKey = TRELLO_API_KEY;
var oauthToken = TRELLO_OAUTH_TOKEN;
var idList = TRELLO_LIST;


let createSupport = (req, res, next) => {
    req.data = {};
    var optional = null;
    var Date_stamp = new Date().getTime();
    var data = {};
    if (req.query.userId) {
        optional = req.query.userId;
        data = {
            userId: optional,
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            dateCreated: Date_stamp
            };
    } else {
        data = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            dateCreated: Date_stamp
            };
    };
    

    supportSchema.create(data,(err, ticket) => {
        if (err) {
            return res.status(500).end();
        } else if (ticket) {
            req.data.ticketNum = ticket.id;
            next()
        } else {
            return res.status(404).json({ message: 'ticket was not created'});
        }
    });
};

let trelloCardCreate = (req, res) => {
    var ticketNum = req.data.ticketNum;
    var title = `${req.body.email} | ${ticketNum}`;
    var description = `name: ${req.body.name},\nemail: ${req.body.email},\nmessage: ${req.body.message}`;
    var Trello = require("trello");
    var trello = new Trello(apiKey, oauthToken);
   
    trello.addCard(title, description, idList,
        function (error, trelloCard) {
            if (error) {
                console.log('Could not add card:', error);
            }
            else {
                console.log('Added card:', trelloCard);
            }
        });

    return res.status(200).json({message: "Ticket sent to support" , ticketNumber: ticketNum });
};
      
module.exports = [
    createSupport,
    trelloCardCreate
];