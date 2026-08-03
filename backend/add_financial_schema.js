const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

const additions = `
// ============== FINANCIAL METRICS ==============
model FinancialMetric {
  id                  String   @id @default(uuid())
  date                DateTime @unique
  mrr                 Float    @default(0)
  arr                 Float    @default(0)
  totalCustomers      Int      @default(0)
  payingCustomers     Int      @default(0)
  trialingCustomers   Int      @default(0)
  churnedCustomers    Int      @default(0)
  churnRate           Float    @default(0)
  newRevenue          Float    @default(0)
  expansionRevenue    Float    @default(0)
  contractionRevenue  Float    @default(0)
  churnedRevenue      Float    @default(0)
  avgLtv              Float    @default(0)
  avgCustomerLifetime Float    @default(0)
  cohortData          String?
  createdAt           DateTime @default(now())
}

model CustomerLifetimeEvent {
  id             String   @id @default(uuid())
  tenantId       String
  tenant         Tenant   @relation(fields: [tenantId], references: [id])
  type           String
  plan           String
  amount         Float?
  metadata       String?
  occurredAt     DateTime @default(now())
  @@index([tenantId, occurredAt])
}

// ============== PROMO CODES ==============
model PromoCode {
  id              String   @id @default(uuid())
  code            String   @unique
  discountType    String
  discountValue   Float
  currency        String   @default("EUR")
  durationType    String   @default("once")
  durationMonths  Int?
  applicablePlans String?
  minAmount       Float?
  maxUses         Int?
  currentUses     Int      @default(0)
  maxUsesPerUser  Int      @default(1)
  affiliateId     String?
  affiliate       AffiliatePartner? @relation(fields: [affiliateId], references: [id])
  campaign        String?
  validFrom       DateTime @default(now())
  validUntil      DateTime?
  totalRevenue    Float    @default(0)
  createdById     String?
  createdAt       DateTime @default(now())
  redemptions     PromoRedemption[]
}

model PromoRedemption {
  id              String   @id @default(uuid())
  promoCodeId     String
  promoCode       PromoCode @relation(fields: [promoCodeId], references: [id])
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  userId          String
  user            User     @relation(fields: [userId], references: [id])
  discountAmount  Float
  originalAmount  Float
  finalAmount     Float
  stripeCouponId  String?
  redeemedAt      DateTime @default(now())
  @@unique([promoCodeId, tenantId])
}

// ============== RECURRING INVOICES ==============
model RecurringInvoice {
  id              String   @id @default(uuid())
  tenantId        String
  tenant          Tenant   @relation(fields: [tenantId], references: [id])
  invoiceNumber   String   @unique
  periodStart     DateTime
  periodEnd       DateTime
  billingDate     DateTime
  baseAmount      Float
  additionalAmount Float    @default(0)
  discountAmount  Float    @default(0)
  subtotal        Float
  taxRate         Float    @default(20)
  taxAmount       Float
  totalAmount     Float
  currency        String   @default("EUR")
  lineItems       String
  status          String   @default("DRAFT")
  paymentMethod   String?
  paidAt          DateTime?
  paymentRef      String?
  remindersSent   Int      @default(0)
  lastReminderAt  DateTime?
  pdfUrl          String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  @@index([tenantId, status])
}
`;

const newRelations = [
  ['serviceBookings   ServiceBooking[]', 'serviceBookings   ServiceBooking[]\n  customerEvents    CustomerLifetimeEvent[]\n  promoRedemptions  PromoRedemption[]\n  recurringInvoices RecurringInvoice[]'],
  ['consultingBookings ServiceBooking[] @relation("Consultant")', 'consultingBookings ServiceBooking[] @relation("Consultant")\n  promoRedemptions  PromoRedemption[]'],
  ['referrals       AffiliateReferral[]', 'referrals       AffiliateReferral[]\n  promoCodes      PromoCode[]']
];

for (const [from, to] of newRelations) {
  if (schema.includes(from) && !schema.includes(to)) {
    schema = schema.replace(from, to);
  }
}

if (!schema.includes('model FinancialMetric')) {
  fs.writeFileSync(path, schema + '\n' + additions);
  console.log('Added financial/promo/recurring invoice models');
} else {
  fs.writeFileSync(path, schema);
  console.log('Models already exist');
}
