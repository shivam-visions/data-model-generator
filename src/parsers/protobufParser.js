const protobuf = require('protobufjs');

async function parseProtobuf(protoFilePath) {
  try {
    const root = await protobuf.load(protoFilePath);
    return root.toJSON();
  } catch (err) {
    throw new Error('Invalid Protobuf input.');
  }
}

module.exports = { parseProtobuf };
