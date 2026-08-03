const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

const models = `
// ============== WEB PUSH ==============
model PushSubscription {
  id         String   @id @default(uuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  endpoint   String   @unique
  p256dh     String
  auth       String
  userAgent  String   @default("")
  active     Boolean  @default(true)
  createdAt  DateTime @default(now())
}
`;

const assetPositions = `
  positionX  Float?
  positionY  Float?
  positionZ  Float?
`;

if (!schema.includes('model PushSubscription')) {
  schema += '\n' + models;
  console.log('Added PushSubscription model');
} else {
  console.log('PushSubscription already exists');
}

// Add positionX to Asset model if missing
if (!schema.includes('positionX')) {
  schema = schema.replace(
    /model Asset \{([^}]+)\}/,
    (match) => match.replace(/\n\}\s*$/, '\n' + assetPositions + '\n}')
  );
  console.log('Added positionX/Y/Z to Asset model');
} else {
  console.log('positionX already exists in Asset');
}

fs.writeFileSync(path, schema);
