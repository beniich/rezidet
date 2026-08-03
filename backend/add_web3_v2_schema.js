const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

const additions = `
// ============== ORACLE ==============
model PriceHistory {
  id          String   @id @default(uuid())
  pair        String
  chainId     Int
  price       Float
  source      String   @default("chainlink")
  timestamp   DateTime @default(now())
  @@index([pair, timestamp])
}

model PriceAlert {
  id          String   @id @default(uuid())
  userId      String?
  pair        String
  chainId     Int      @default(1)
  threshold   Float
  direction   String
  active      Boolean  @default(true)
  triggeredAt DateTime?
  createdAt   DateTime @default(now())
}

// ============== BRIDGE ==============
model BridgeTransfer {
  id                String   @id @default(uuid())
  nonce             Int      @unique
  fromChainId       Int
  toChainId         Int
  senderAddress     String
  recipientAddress  String
  amount            Float
  token             String   @default("USDC")
  status            String   @default("PENDING")
  estimatedArrival  DateTime?
  txHash            String?
  confirmedAt       DateTime?
  destinationTxHash String?
  completedAt       DateTime?
  createdAt         DateTime @default(now())
}

// ============== P2P EXCHANGE ==============
model P2POrder {
  id              String   @id @default(uuid())
  makerAddress    String
  takerAddress    String?
  type            String
  tokenAddress    String
  tokenSymbol     String
  tokenDecimals   Int      @default(18)
  amount          Float
  remainingAmount Float
  pricePerToken   Float
  totalPrice      Float
  paymentToken    String   @default("USDC")
  paymentDecimals Int      @default(6)
  escrowAddress   String?
  expiresAt       DateTime
  status          String   @default("OPEN")
  paymentMethod   String   @default("ESCROW")
  fiatCurrency    String?
  paymentDetails  String?
  createdAt       DateTime @default(now())
  filledAt        DateTime?
  canceledAt      DateTime?
  trades          P2PTrade[]
  @@index([type, status, tokenAddress])
  @@index([makerAddress, status])
}

model P2PTrade {
  id              String   @id @default(uuid())
  orderId         String
  order           P2POrder @relation(fields: [orderId], references: [id])
  buyerAddress    String
  sellerAddress   String
  tokenAmount     Float
  totalPrice      Float
  txHash          String?
  status          String   @default("PENDING")
  disputeReason   String?
  createdAt       DateTime @default(now())
  completedAt     DateTime?
}
`;

if (!schema.includes('model PriceHistory')) {
  fs.writeFileSync(path, schema + '\n' + additions);
  console.log('Added web3 v2 models to schema');
} else {
  console.log('Web3 v2 models already exist');
}
