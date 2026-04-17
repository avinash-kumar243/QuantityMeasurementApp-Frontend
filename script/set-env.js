const fs = require('fs');
const path = require('path');
require('dotenv').config();

// This targets your production environment file
const targetPath = path.join(__dirname, '../src/environments/environment.prod.ts');

const envConfigFile = `export const environment = {
  production: true,
  backendBaseUrl: '${process.env.BACKEND_BASE_URL || 'http://localhost:8080'}'
};
`;

fs.writeFile(targetPath, envConfigFile, (err) => {
  if (err) {
    console.error('Error writing environment file:', err);
    process.exit(1);
  }
  console.log(`Environment variables injected into ${targetPath}`);
});