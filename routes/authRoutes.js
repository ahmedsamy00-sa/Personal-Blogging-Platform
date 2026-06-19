import express from 'express';
import { registerUser, loginUser} from '../controllers/authController.js'
import { validateLogin, validateRegisterUser } from '../utils/validators/authValidator.js';

const router = express.Router();

router.post('/register', validateRegisterUser, registerUser);
router.post('/login', validateLogin, loginUser);

export default router;