import { EmailClient } from '@azure/communication-email';

import 'dotenv/config';

const azureConnectionString = process.env.AZURE_CS_STRING;

const emailClient = new EmailClient(azureConnectionString);

export default emailClient;
