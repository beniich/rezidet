const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

const additions = `
// ============== STRIPE CONNECT ==============
model VendorAccount {
  id              String   @id @default(uuid())
  vendorId        String   @unique
  vendor          Vendor   @relation(fields: [vendorId], references: [id])
  stripeAccountId String   @unique
  accountType     String   @default("express")
  country         String   @default("FR")
  defaultCurrency String   @default("eur")
  chargesEnabled  Boolean  @default(false)
  payoutsEnabled  Boolean  @default(false)
  detailsSubmitted Boolean @default(false)
  requirementsDue String
  availableBalance Float   @default(0)
  pendingBalance   Float   @default(0)
  payoutSchedule   String  @default("daily")
  minimumPayout    Float   @default(10)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  payouts         VendorPayout[]
}

model VendorPayout {
  id              String   @id @default(uuid())
  vendorId        String
  vendor          Vendor   @relation(fields: [vendorId], references: [id])
  accountId       String
  account         VendorAccount @relation(fields: [accountId], references: [id])
  amount          Float
  currency        String   @default("EUR")
  stripePayoutId  String?  @unique
  status          String   @default("PENDING")
  arrivalDate     DateTime?
  method          String   @default("standard")
  failureCode     String?
  failureMessage  String?
  createdAt       DateTime @default(now())
}

model VendorBalanceTransaction {
  id              String   @id @default(uuid())
  vendorId        String
  vendor          Vendor   @relation(fields: [vendorId], references: [id])
  type            String
  amount          Float
  currency        String   @default("EUR")
  description     String?
  reference       String?
  availableOn     DateTime?
  createdAt       DateTime @default(now())
}

// ============== CREDIT / DEPOSIT ==============
model CreditAccount {
  id              String   @id @default(uuid())
  tenantId        String   @unique
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  balance         Float    @default(0)
  reservedBalance Float    @default(0)
  currency        String   @default("EUR")
  autoRechargeEnabled Boolean @default(false)
  autoRechargeThreshold Float @default(100)
  autoRechargeAmount    Float @default(500)
  autoRechargePaymentMethodId String?
  maxBalance      Float    @default(10000)
  minBalance      Float    @default(0)
  totalDeposited  Float    @default(0)
  totalSpent      Float    @default(0)
  lifetimeUsage   Int      @default(0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  transactions    CreditTransaction[]
}

model CreditTransaction {
  id              String   @id @default(uuid())
  accountId       String
  account         CreditAccount @relation(fields: [accountId], references: [id], onDelete: Cascade)
  type            String
  amount          Float
  balanceAfter    Float
  currency        String   @default("EUR")
  description     String?
  category        String?
  reference       String?
  stripePaymentIntentId String?
  status          String   @default("COMPLETED")
  createdAt       DateTime @default(now())
  @@index([accountId, type, createdAt])
}

model UsagePricing {
  id              String   @id @default(uuid())
  metric          String   @unique
  unit            String
  pricingType     String   @default("tiered")
  unitCost        Float    @default(0)
  includedQuota   Int      @default(0)
  overageCost     Float    @default(0.01)
  hardLimit       Int?
  active          Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

// ============== CRYPTO ==============
model CryptoPayment {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  coinbaseChargeId String  @unique
  chargeCode      String?
  amount          Float
  amountCrypto    String?
  currency        String   @default("EUR")
  cryptoCurrency  String?
  status          String   @default("PENDING")
  network         String?
  txHash          String?
  blockNumber     Int?
  confirmations   Int      @default(0)
  description     String?
  metadata        String?
  expiresAt       DateTime
  confirmedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  @@index([tenantId, status])
}

model CryptoBalance {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  currency        String
  balance         Float    @default(0)
  receiveAddress  String?
  network         String?
  updatedAt       DateTime @updatedAt
}

model StablecoinSubscription {
  id              String   @id @default(uuid())
  tenantId        String   @unique
  tenant          Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  plan            String
  amountUsdc      Float
  billingPeriod   String   @default("monthly")
  network         String   @default("polygon")
  paymentToken    String   @default("USDC")
  paymentTokenAddress String
  subscriberAddress String
  recipientAddress String
  status          String   @default("PENDING")
  nextPaymentAt   DateTime
  lastPaymentAt   DateTime?
  totalPaid       Float    @default(0)
  failedAttempts  Int      @default(0)
  maxRetries      Int      @default(3)
  contractAddress String?
  txHash          String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  payments        StablecoinPayment[]
}

model StablecoinPayment {
  id              String   @id @default(uuid())
  subscriptionId  String
  subscription    StablecoinSubscription @relation(fields: [subscriptionId], references: [id], onDelete: Cascade)
  txHash          String   @unique
  blockNumber     Int?
  network         String
  fromAddress     String
  toAddress       String
  tokenAddress    String
  amountUsdc      Float
  amountToken     String
  gasFee          String
  status          String   @default("PENDING")
  confirmations   Int      @default(0)
  requiredConfirmations Int @default(12)
  periodStart     DateTime
  periodEnd       DateTime
  blockExplorerUrl String?
  confirmedAt     DateTime?
  failedAt        DateTime?
  failureReason   String?
  createdAt       DateTime @default(now())
  @@index([subscriptionId, status])
  @@index([txHash])
}
`;

const newRelations = [
  ['items           MarketplaceItem[]', 'items           MarketplaceItem[]\n  accounts        VendorAccount[]\n  payouts         VendorPayout[]\n  balanceTransactions VendorBalanceTransaction[]'],
  ['promoRedemptions  PromoRedemption[]', 'promoRedemptions  PromoRedemption[]\n  creditAccount     CreditAccount?\n  cryptoPayments    CryptoPayment[]\n  cryptoBalances    CryptoBalance[]\n  stablecoinSub     StablecoinSubscription?']
];

for (const [from, to] of newRelations) {
  if (schema.includes(from) && !schema.includes(to)) {
    schema = schema.replace(from, to);
  }
}

if (!schema.includes('model VendorAccount')) {
  fs.writeFileSync(path, schema + '\n' + additions);
  console.log('Added connect/crypto models');
} else {
  console.log('Models already exist');
}
