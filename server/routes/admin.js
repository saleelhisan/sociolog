import express from 'express'

import { login } from '../controllers/adminControllers/auth.js';
import { getallUsers ,blockuser} from '../controllers/adminControllers/usermanage.js';

const router = express.Router();

router.post("/login", login);
router.get('/getallusers',getallUsers)
router.put('/userblock/:id',blockuser)

  


export default router