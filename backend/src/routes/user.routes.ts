import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireAuth } from '../middleware/auth';

const router = Router();

// ── Public ──────────────────────────────────────
router.post('/login', UserController.login);

// ── Authenticated ────────────────────────────────
router.post('/logout', requireAuth, UserController.logout);
router.post('/change-password', requireAuth, UserController.changePassword);

// ── Admin: user listing (also used by admin portal) ──
router.get('/', UserController.getUsers);

export default router;
