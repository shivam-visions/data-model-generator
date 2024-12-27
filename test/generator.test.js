const { generateInterface } = require('../src/generators/interfaceGenerator');

test('Generate interface from JSON object', () => {
  const obj = { name: "John", age: 30, isAdmin: true };
  const result = generateInterface(obj);

  expect(result).toContain('name: string;');
  expect(result).toContain('age: number;');
  expect(result).toContain('isAdmin: boolean;');
});

test('Apply custom mappings', () => {
  const obj = { id: 123, name: "John" };
  const mappings = { id: "string" };
  const result = generateInterface(obj, 'Root', mappings);

  expect(result).toContain('id: string;');
  expect(result).toContain('name: string;');
});
