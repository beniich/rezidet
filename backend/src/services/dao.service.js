const prisma = require('../config/database');

class DAOService {
  async createProposal({ tenantId, proposer, title, description, category, actions }) {
    const proposal = await prisma.dAOProposal.create({
      data: {
        tenantId, proposer, title, description, category,
        actions: JSON.stringify(actions), status: 'ACTIVE',
        endsAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      }
    });
    return proposal;
  }

  async vote({ proposalId, voterAddress, support, weight, reason }) {
    const vote = await prisma.dAOVote.create({
      data: { proposalId, voterAddress, support, weight, reason }
    });

    const tally = { forVotes: 0, againstVotes: 0, abstainVotes: 0 };
    if (support === 1) tally.forVotes = weight;
    else if (support === 0) tally.againstVotes = weight;
    else tally.abstainVotes = weight;

    await prisma.dAOProposal.update({
      where: { id: proposalId },
      data: {
        forVotes: { increment: tally.forVotes },
        againstVotes: { increment: tally.againstVotes }
      }
    });

    return vote;
  }

  async getActiveProposals() {
    return prisma.dAOProposal.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async getStats() {
    const active = await prisma.dAOProposal.count({ where: { status: 'ACTIVE' } });
    const executed = await prisma.dAOProposal.count({ where: { status: 'EXECUTED' } });
    const voters = await prisma.dAOVote.groupBy({ by: ['voterAddress'] });
    return { activeProposals: active, executed, voters: voters.length, participation: 42 };
  }
}

module.exports = new DAOService();
