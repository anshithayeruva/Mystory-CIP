import { prisma } from '../prisma/client';

export class AdminSettingsService {
  static async getInstitution() {
    let inst = await prisma.institution.findFirst();
    if (!inst) {
      inst = await prisma.institution.create({
        data: {
          name: "St. Andrews International Academy",
          code: "SAIA-2024",
          type: "K-12 Academy",
          address: "42 Academic Square, North Campus, Sector 4, 110022",
          country: "United States",
          academicYear: "2024-2025",
          contactPerson: "Dr. Sarah Jenkins",
          contactEmail: "s.jenkins@standrews.edu",
          contactNumber: "+1 (555) 0123-456",
        }
      });
    }
    return inst;
  }

  static async updateInstitution(data: any) {
    const inst = await this.getInstitution();
    return prisma.institution.update({
      where: { id: inst.id },
      data
    });
  }

  static async getAcademic() {
    let ac = await prisma.academicSettings.findFirst();
    if (!ac) {
      ac = await prisma.academicSettings.create({ data: {} });
    }
    return ac;
  }

  static async updateAcademic(data: any) {
    const ac = await this.getAcademic();
    return prisma.academicSettings.update({
      where: { id: ac.id },
      data
    });
  }

  static async getSecurity() {
    let sec = await prisma.securitySettings.findFirst();
    if (!sec) {
      sec = await prisma.securitySettings.create({ data: {} });
    }
    return sec;
  }

  static async updateSecurity(data: any) {
    const sec = await this.getSecurity();
    return prisma.securitySettings.update({
      where: { id: sec.id },
      data
    });
  }

  static async getIntegrations() {
    let intg = await prisma.integrationSettings.findFirst();
    if (!intg) {
      intg = await prisma.integrationSettings.create({ data: {} });
    }
    return intg;
  }

  static async updateIntegrations(data: any) {
    const intg = await this.getIntegrations();
    return prisma.integrationSettings.update({
      where: { id: intg.id },
      data
    });
  }

  static async getAuditLogs(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      prisma.auditLog.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: { user: { select: { firstName: true, lastName: true } } }
      }),
      prisma.auditLog.count()
    ]);
    return { data, total, page, limit, totalPages: Math.ceil(total / limit) };
  }

  static async logAction(userId: string, action: string, ipAddress?: string) {
    // Basic mock user handling if real users are not fully seeded. 
    // Wait, log action requires a valid user ID. 
    // To prevent crashes during development without full auth, we'll verify user exists.
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;

    return prisma.auditLog.create({
      data: { userId, action, ipAddress }
    });
  }
}
