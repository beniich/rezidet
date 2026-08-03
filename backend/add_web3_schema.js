const fs = require('fs');
const path = 'C:/Users/pc gold/projet dash/rezidet/backend/prisma/schema.prisma';
let schema = fs.readFileSync(path, 'utf8');

const additions = `
// ============== STAKING ==============
model StakingPosition {
  id              String   @id @default(uuid())
  userAddress     String   @unique
  amount          Float    @default(0)
  lockEndTime     DateTime?
  apy             Float    @default(1.0)
  totalClaimed    Float    @default(0)
  active          Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

model StakingEvent {
  id              String   @id @default(uuid())
  userAddress     String
  type            String
  amount          Float
  txHash          String?  @unique
  createdAt       DateTime @default(now())
  @@index([userAddress, createdAt])
}

// ============== DAO ==============
model DAOProposal {
  id              String   @id @default(uuid())
  onChainId       Int?     @unique
  tenantId        String?
  proposer        String
  title           String
  description     String
  category        String
  actions         String
  forVotes        Float    @default(0)
  againstVotes    Float    @default(0)
  abstainVotes    Float    @default(0)
  status          String   @default("PENDING")
  txHash          String?
  startsAt        DateTime @default(now())
  endsAt          DateTime
  executedAt      DateTime?
  createdAt       DateTime @default(now())
  votes           DAOVote[]
}

model DAOVote {
  id              String   @id @default(uuid())
  proposalId      String
  proposal        DAOProposal @relation(fields: [proposalId], references: [id], onDelete: Cascade)
  voterAddress    String
  support         Int
  weight          Float
  reason          String?
  txHash          String?
  createdAt       DateTime @default(now())
  @@unique([proposalId, voterAddress])
}

// ============== IDO LAUNCHPAD ==============
model IDOProject {
  id              String   @id @default(uuid())
  name            String
  symbol          String
  description     String
  logoUrl         String?
  websiteUrl      String?
  whitepaperUrl   String?
  tokenAddress    String?
  totalSupply     Float
  tokensForSale   Float
  pricePerToken   Float
  hardCap         Float
  softCap         Float
  startTime       DateTime
  endTime         DateTime
  tgePercent      Float    @default(20)
  vestingMonths   Int      @default(12)
  cliffMonths     Int      @default(1)
  status          String   @default("UPCOMING")
  totalRaised     Float    @default(0)
  participants    Int      @default(0)
  kycRequired     Boolean  @default(true)
  whitelistOnly   Boolean  @default(false)
  createdAt       DateTime @default(now())
  contributions   IDOContribution[]
}

model IDOContribution {
  id              String   @id @default(uuid())
  projectId       String
  project         IDOProject @relation(fields: [projectId], references: [id], onDelete: Cascade)
  investorAddress String
  amountUsdc      Float
  tokensAmount    Float
  txHash          String?  @unique
  status          String   @default("PENDING")
  claimedTokens   Float    @default(0)
  vestingSchedule String?
  createdAt       DateTime @default(now())
}
`;

if (!schema.includes('model StakingPosition')) {
  fs.writeFileSync(path, schema + '\n' + additions);
  console.log('Added web3 models to schema');
} else {
  console.log('Web3 models already exist');
}
