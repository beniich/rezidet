const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

const additions = `
// ============== OPTIONS ==============
model Option {
  id          String   @id @default(uuid())
  writer      String
  holder      String?
  optionType  String   // CALL or PUT
  underlying  String
  strikePrice Float
  premium     Float
  amount      Float
  expiration  DateTime
  status      String   @default("OPEN")
  createdAt   DateTime @default(now())
}
`;

if (!schema.includes('model Option')) {
  fs.writeFileSync(path, schema + '\n' + additions);
  console.log('Added web3 v3 models to schema');
} else {
  console.log('Web3 v3 models already exist');
}
