export enum Role {
  ADMIN = 'ADMIN',
  HOD = 'HOD',
  STUDENT = 'STUDENT',
}

/**
 * Defines the numerical weight/clearance of each role.
 * Higher weights have access to their own privileges and those of lower weights.
 */
export const ROLE_WEIGHTS: Record<Role, number> = {
  [Role.ADMIN]: 40,
  [Role.HOD]: 30,
  [Role.STUDENT]: 10,
};

/**
 * Check if a user's role meets or exceeds a target role clearance.
 */
export function hasClearance(userRole: Role, targetRole: Role): boolean {
  return ROLE_WEIGHTS[userRole] >= ROLE_WEIGHTS[targetRole];
}

/**
 * Custom check for HOD department boundary validation.
 */
export function canManageDepartment(
  userRole: Role,
  userDepartmentId: string | undefined,
  targetDepartmentId: string
): boolean {
  if (userRole === Role.ADMIN) return true;
  if (userRole === Role.HOD && userDepartmentId === targetDepartmentId) return true;
  return false;
}
