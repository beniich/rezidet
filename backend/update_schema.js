const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

// Insert reverse relations in Tenant
schema = schema.replace(
  'bimModels         BIMModel[]',
  'bimModels         BIMModel[]\n  subscription      Subscription?\n  invoices          Invoice[]\n  paymentMethods    PaymentMethod[]\n  usageRecords      UsageRecord[]\n  affiliateReferrals AffiliateReferral[]\n  marketplaceInstallations MarketplaceInstallation[]\n  serviceBookings   ServiceBooking[]'
);

// Insert reverse relations in User
schema = schema.replace(
  'inventoryMovements InventoryMovement[]',
  'inventoryMovements InventoryMovement[]\n  affiliatePartner  AffiliatePartner?\n  consultingBookings ServiceBooking[] @relation("Consultant")'
);

const newModels = `
// ============== MONETIZATION ==============
model Subscription {
  id                    String   @id @default(uuid())
  tenantId              String   @unique
  tenant                Tenant   @relation(fields: [tenantId], references: [id], onDelete: Cascade)
  stripeCustomerId      String?  @unique
  stripeSubscriptionId  String?  @unique
  stripePriceId         String?
  stripeProductId       String?
  plan                  String   @default("FREE")
  status                String   @default("active")
  currentPeriodStart    DateTime?
  currentPeriodEnd      DateTime?
  trialEnd              DateTime?
  cancelAtPeriodEnd     Boolean  @default(false)
  canceledAt            DateTime?
  apiCallsThisMonth     Int      @default(0)
  storageUsedMb         Float    @default(0)
  iotDevices            Int      @default(0)
  createdAt             DateTime @default(now())
  updatedAt             DateTime @updatedAt
}

model Invoice {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  stripeInvoiceId String?  @unique
  number          String
  status          String
  amount          Float
  currency        String   @default("EUR")
  amountPaid      Float    @default(0)
  periodStart     DateTime
  periodEnd       DateTime
  pdfUrl          String?
  hostedInvoiceUrl String?
  paidAt          DateTime?
  createdAt       DateTime @default(now())
}

model PaymentMethod {
  id                String   @id @default(uuid())
  tenantId          String
  tenant            Tenant   @relation(fields: [tenantId], references: [id])
  stripePaymentMethodId String @unique
  type              String
  brand             String?
  last4             String?
  expMonth          Int?
  expYear           Int?
  isDefault         Boolean  @default(false)
  createdAt         DateTime @default(now())
}

model UsageRecord {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  metric          String
  quantity        Float
  unit            String
  recordedAt      DateTime @default(now())
  billingPeriod   String
  @@index([tenantId, metric, billingPeriod])
}

model Coupon {
  id              String   @id @default(uuid())
  code            String   @unique
  stripeCouponId  String?  @unique
  percentOff      Int?
  amountOff       Float?
  currency        String?
  duration        String   @default("once")
  durationMonths  Int?
  maxRedemptions  Int?
  timesRedeemed   Int      @default(0)
  validFrom       DateTime @default(now())
  validUntil      DateTime?
  minAmount       Float?
  applicablePlans String?
  createdAt       DateTime @default(now())
}

model AffiliatePartner {
  id              String   @id @default(uuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  referralCode    String   @unique
  commissionRate  Float    @default(0.20)
  totalEarned     Float    @default(0)
  totalPaid       Float    @default(0)
  status          String   @default("ACTIVE")
  createdAt       DateTime @default(now())
  referrals       AffiliateReferral[]
}

model AffiliateReferral {
  id              String   @id @default(uuid())
  partnerId       String
  partner         AffiliatePartner @relation(fields: [partnerId], references: [id])
  referredUserId  String
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  commissionEarned Float   @default(0)
  status          String   @default("PENDING")
  createdAt       DateTime @default(now())
  confirmedAt     DateTime?
}

model MarketplaceItem {
  id              String   @id @default(uuid())
  slug            String   @unique
  name            String
  description     String
  longDescription String?
  category        String
  iconUrl         String?
  screenshots     String?
  vendorId        String
  vendor          Vendor   @relation(fields: [vendorId], references: [id])
  pricingModel    String
  price           Float    @default(0)
  currency        String   @default("EUR")
  installs        Int      @default(0)
  rating          Float    @default(0)
  reviews         Int      @default(0)
  version         String   @default("1.0.0")
  configSchema    String?
  installCount    Int      @default(0)
  status          String   @default("DRAFT")
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  installations   MarketplaceInstallation[]
  revenues        MarketplaceRevenue[]
}

model Vendor {
  id              String   @id @default(uuid())
  name            String
  email           String   @unique
  description     String?
  website         String?
  logoUrl         String?
  stripeAccountId String?  @unique
  totalRevenue    Float    @default(0)
  totalItems      Int      @default(0)
  status          String   @default("ACTIVE")
  createdAt       DateTime @default(now())
  items           MarketplaceItem[]
  revenues        MarketplaceRevenue[]
}

model MarketplaceInstallation {
  id              String   @id @default(uuid())
  itemId          String
  item            MarketplaceItem @relation(fields: [itemId], references: [id])
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  config          String?
  status          String   @default("ACTIVE")
  installedAt     DateTime @default(now())
  @@unique([itemId, tenantId])
}

model MarketplaceRevenue {
  id              String   @id @default(uuid())
  itemId          String
  item            MarketplaceItem @relation(fields: [itemId], references: [id])
  vendorId        String
  vendor          Vendor   @relation(fields: [vendorId], references: [id])
  tenantId        String
  grossAmount     Float
  platformFee     Float
  vendorAmount    Float
  stripePaymentId String?
  status          String   @default("PENDING")
  createdAt       DateTime @default(now())
}

model Service {
  id              String   @id @default(uuid())
  slug            String   @unique
  name            String
  category        String
  description     String
  pricingType     String
  price           Float
  currency        String   @default("EUR")
  duration        String?
  deliverables    String?
  prerequisites   String?
  bookings        Int      @default(0)
  rating          Float    @default(0)
  active          Boolean  @default(true)
  createdAt       DateTime @default(now())
  serviceBookings ServiceBooking[]
}

model ServiceBooking {
  id              String   @id @default(uuid())
  serviceId       String
  service         Service  @relation(fields: [serviceId], references: [id])
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  scheduledAt     DateTime
  status          String   @default("PENDING")
  notes           String?
  stripePaymentId String?
  amount          Float
  consultantId    String?
  consultant      User?    @relation("Consultant", fields: [consultantId], references: [id])
  createdAt       DateTime @default(now())
  completedAt     DateTime?
}
`;

fs.writeFileSync(path, schema + '\n' + newModels);
console.log('Updated schema.prisma successfully');
