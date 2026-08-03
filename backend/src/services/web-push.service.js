const webpush = require('web-push');
const prisma = require('../config/database');

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL || 'admin@cafm.com'}`,
  process.env.VAPID_PUBLIC_KEY || '',
  process.env.VAPID_PRIVATE_KEY || ''
);

class WebPushService {
  async subscribe(userId, subscription, userAgent = '') {
    return prisma.pushSubscription.upsert({
      where: { endpoint: subscription.endpoint },
      update: { p256dh: subscription.keys.p256dh, auth: subscription.keys.auth, userAgent, userId },
      create: {
        userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
        userAgent
      }
    });
  }

  async sendToUser(userId, payload) {
    const subs = await prisma.pushSubscription.findMany({ where: { userId, active: true } });
    const results = await Promise.allSettled(subs.map(s => this._send(s, payload)));

    // Désactiver subscriptions expirées (410 Gone)
    for (let i = 0; i < results.length; i++) {
      const r = results[i];
      if (r.status === 'rejected' && r.reason?.statusCode === 410) {
        await prisma.pushSubscription.update({ where: { id: subs[i].id }, data: { active: false } }).catch(() => {});
      }
    }
    return results.filter(r => r.status === 'fulfilled').length;
  }

  async _send(subscription, payload) {
    return webpush.sendNotification(
      { endpoint: subscription.endpoint, keys: { p256dh: subscription.p256dh, auth: subscription.auth } },
      JSON.stringify(payload)
    );
  }

  async sendToOrganization(organizationId, payload) {
    const subs = await prisma.pushSubscription.findMany({
      where: { user: { organizationId }, active: true }
    });
    return Promise.all(subs.map(s => this._send(s, payload).catch(() => {})));
  }

  // Notifications métier
  async notifyWorkOrderAssigned(userId, workOrder) {
    return this.sendToUser(userId, {
      title: '📋 Nouvelle intervention assignée',
      body: workOrder.title,
      url: `/dashboard/work-orders/${workOrder.id}`,
      tag: `wo-${workOrder.id}`,
      urgent: workOrder.priority === 'CRITICAL'
    });
  }

  async notifyAssetAlert(userId, asset) {
    return this.sendToUser(userId, {
      title: '🚨 Alerte équipement',
      body: `${asset.name} nécessite une intervention`,
      url: `/dashboard/assets/${asset.id}`,
      tag: `asset-${asset.id}`,
      urgent: true
    });
  }
}

module.exports = new WebPushService();
