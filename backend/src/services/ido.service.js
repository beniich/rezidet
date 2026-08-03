const prisma = require('../config/database');

class IDOService {
  async listProjects({ status } = {}) {
    const where = {};
    if (status) where.status = status;
    return prisma.iDOProject.findMany({ where, orderBy: { startTime: 'asc' } });
  }

  async contribute({ projectId, investorAddress, amountUsdc }) {
    const project = await prisma.iDOProject.findUnique({ where: { id: projectId } });
    if (project.status !== 'LIVE') throw new Error('IDO non actif');
    if (project.totalRaised + amountUsdc > project.hardCap) throw new Error('Hard cap atteint');

    const tokensAmount = amountUsdc / project.pricePerToken;
    const contribution = await prisma.iDOContribution.create({
      data: {
        projectId, investorAddress, amountUsdc, tokensAmount, status: 'PENDING',
        vestingSchedule: JSON.stringify(this.generateVestingSchedule(tokensAmount, project))
      }
    });

    await prisma.iDOProject.update({
      where: { id: projectId },
      data: { totalRaised: { increment: amountUsdc }, participants: { increment: 1 } }
    });

    return contribution;
  }

  generateVestingSchedule(totalTokens, project) {
    const tgeAmount = totalTokens * (project.tgePercent / 100);
    const remainingTokens = totalTokens - tgeAmount;
    const perMonth = remainingTokens / project.vestingMonths;
    const schedule = [{ date: new Date(), amount: tgeAmount, type: 'TGE', claimed: false }];

    for (let i = 1; i <= project.vestingMonths; i++) {
      const date = new Date();
      date.setMonth(date.getMonth() + project.cliffMonths + i);
      schedule.push({ date, amount: perMonth, type: 'MONTHLY', claimed: false });
    }
    return schedule;
  }
}

module.exports = new IDOService();
