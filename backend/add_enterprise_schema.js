const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

// Add EnterpriseQuote relations to Tenant
schema = schema.replace(
  'serviceBookings   ServiceBooking[]',
  'serviceBookings   ServiceBooking[]\n  enterpriseQuotes  EnterpriseQuote[]'
);

// Add User relation
schema = schema.replace(
  'consultingBookings ServiceBooking[] @relation("Consultant")',
  'consultingBookings ServiceBooking[] @relation("Consultant")\n  assignedQuotes    EnterpriseQuote[]'
);

const newModels = `
// ============== ENTERPRISE QUOTES ==============
model EnterpriseQuote {
  id              String   @id @default(uuid())
  reference       String   @unique
  tenantId        String?
  tenant          Tenant?  @relation(fields: [tenantId], references: [id])
  contactName     String
  contactEmail    String
  contactPhone    String?
  companyName     String
  companySize     String?
  industry        String?
  country         String?
  userCount       Int      @default(50)
  assetCount      Int      @default(500)
  buildingCount   Int      @default(5)
  selectedFeatures String?
  monthlyBase     Float    @default(199)
  perUserPrice    Float    @default(0)
  setupFee        Float    @default(0)
  totalMonthly    Float    @default(199)
  totalYearly     Float    @default(2388)
  discountPercent Int      @default(0)
  contractMonths  Int      @default(12)
  status          String   @default("DRAFT")
  validUntil      DateTime
  signedAt        DateTime?
  activatedAt     DateTime?
  assignedToId    String?
  assignedTo      User?    @relation(fields: [assignedToId], references: [id])
  history         String?
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}
`;

if (!schema.includes('model EnterpriseQuote')) {
  fs.writeFileSync(path, schema + '\n' + newModels);
  console.log('Added EnterpriseQuote model');
} else {
  console.log('EnterpriseQuote already exists');
}
