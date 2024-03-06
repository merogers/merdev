const { EmailClient } = require('@azure/communication-email');
require('dotenv').config();

const azureConnectionString = process.env.AZURE_CS_STRING;

const emailClient = new EmailClient(azureConnectionString);

module.exports = emailClient;
