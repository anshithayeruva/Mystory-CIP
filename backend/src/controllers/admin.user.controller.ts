import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class AdminUserController {
  /**
   * POST /api/admin/users
   * Admin creates a new user account.
   * A temp password is generated and emailed — never returned in the response body.
   */
  static async createUser(req: Request, res: Response) {
    try {
      const adminId = req.user?.id;
      const {
        email,
        userType,
        firstName,
        lastName,
        phoneNumber,
        department,
        // Student fields
        program,
        semester,
        section,
        rollNumber,
        admissionYear,
        // Faculty/HoD fields
        designation,
        employmentType,
        employeeId,
        joiningDate,
        officeExtension,
      } = req.body;

      if (!email || !userType || !firstName || !lastName) {
        res.status(400).json({
          success: false,
          message: 'email, userType, firstName, and lastName are required',
        });
        return;
      }

      const result = await UserService.createUser({
        email,
        userType,
        firstName,
        lastName,
        phoneNumber,
        department,
        createdBy: adminId,
        program,
        semester,
        section,
        rollNumber,
        admissionYear,
        designation,
        employmentType,
        employeeId,
        joiningDate,
        officeExtension,
      });

      // NOTE: tempPassword is handled inside the service and sent via email only.
      // It is NOT included in this response.
      res.status(201).json({
        success: true,
        message: `User created successfully. Credentials have been emailed to ${result.email}.`,
        data: {
          id: result.id,
          email: result.email,
          firstName: result.firstName,
          lastName: result.lastName,
          role: result.role,
        },
      });
    } catch (error: any) {
      console.error('Error creating user:', error);
      res.status(400).json({ success: false, message: error.message || 'Failed to create user' });
    }
  }

  /**
   * POST /api/admin/users/:id/resend-credentials
   * Regenerates temp password, re-emails it, resets mustChangePassword = true.
   */
  static async resendCredentials(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        res.status(400).json({ success: false, message: 'User ID is required' });
        return;
      }

      await UserService.resendCredentials(id);

      res.json({
        success: true,
        message: 'New credentials have been emailed to the user.',
      });
    } catch (error: any) {
      console.error('Error resending credentials:', error);
      res.status(400).json({ success: false, message: error.message || 'Failed to resend credentials' });
    }
  }
}
