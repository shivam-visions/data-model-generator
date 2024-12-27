# Data Model Generator

A library and CLI tool to generate TypeScript interfaces from various data sources like JSON, API responses, database schemas, YAML, XML, and more. Designed to improve code maintainability and reduce development time.

## Features

- Supports input types: JSON, XML, YAML, API responses, CSV, and Protobuf.
- CLI and programmatic usage.
- Custom TypeScript mappings for field types.
- Lightweight and flexible.

---

## Installation
Node version used 16.10.0
npm version used 7.24.0
### Using NPM
```bash
npm install -g <your-package-name>

How to Use

Using with JSON or Static Data
import { generateModelFromSource } from 'data-model-generator';

const jsonData = `{
  "name": "John",
  "age": 30,
  "isActive": true
}`;

const interfaceCode = generateModelFromSource(jsonData, 'json', { interfaceName: 'User' });
console.log(interfaceCode);

Using with API Responses
const getUserProfile = async () => {
  const response = await axios.get('https://api.example.com/user');
  const interfaceCode = generateModelFromSource(JSON.stringify(response.data), 'api', { interfaceName: 'UserProfile' });
  console.log(interfaceCode);
}

CLI Usage

Example Command
data-model-generator --type json --interfaceName User --inputFile data.json --outputFile userInterface.ts
or
npx data-model-generator --type json --interfaceName User --inputFile data.json --outputFile userInterface.ts

