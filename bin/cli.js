#!/usr/bin/env node

const { Command } = require('commander');
const { generateModelFromSource } = require('../src');
const fs = require('fs');

const program = new Command();

program
  .version('1.0.0')
  .description('Generate TypeScript interfaces from various data sources');

program
  .option('-s, --source <path>', 'Path to the input file')
  .option('-t, --type <type>', 'Input type: json, xml, yaml, api, csv')
  .option('-n, --name <name>', 'Interface name', 'Root')
  .option('-o, --output <path>', 'Path to save the generated interface')
  .option('-m, --mappings <path>', 'Path to custom mappings JSON file') // Allow custom mappings

  .action(async (options) => {
    const { source, type, name, output, mappings } = options; // Extract mappings from options

    if (!source || !type) {
      console.error('Error: Source and type are required.');
      process.exit(1);
    }

    try {
      const input = fs.readFileSync(source, 'utf-8');

      // Parse custom mappings if provided
      const customMappings = mappings
        ? JSON.parse(fs.readFileSync(mappings, 'utf-8'))
        : {
            string: "string",
            number: "number",
            boolean: "boolean",
            object: "any",
          }; // Default mappings

      const result = await generateModelFromSource(input, type, {
        interfaceName: name,
        mappings: customMappings, // Pass mappings to the generator
      });

      if (output) {
        fs.writeFileSync(output, result);
        console.log(`Interface saved to ${output}`);
      } else {
        console.log(result);
      }
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  });

program.parse(process.argv);
