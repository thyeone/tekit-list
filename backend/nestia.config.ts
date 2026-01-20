import type { INestiaConfig } from '@nestia/sdk';

const config: INestiaConfig = {
  input: ['src/**/*.controller.ts'],
  output: 'src/api',
  swagger: {
    output: './swagger.json',
    openapi: '3.0',
    servers: [
      {
        url: 'http://localhost:3088',
        description: 'Local Server',
      },
    ],
    info: {
      title: 'Bucket List API',
      version: '1.0.0',
      description: 'Bucket List API Documentation',
    },
    beautify: true,
  },
};

export default config;
