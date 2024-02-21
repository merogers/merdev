const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Dev Portfolio API',
      version: '1.0.0',
      description: 'This is a REST API built with Express, Typescript, JWT and MongoDB',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Michelle',
        url: 'https://merogers.dev',
        email: 'michelle@merogers.dev',
      },
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

export default options;
