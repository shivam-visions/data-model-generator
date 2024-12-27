const yaml = require('js-yaml');

function parseYAML(yamlString) {
  try {
    return yaml.load(yamlString);
  } catch (err) {
    throw new Error('Invalid YAML input.');
  }
}

module.exports = { parseYAML };
