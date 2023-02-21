import { Router } from 'express'

const router = Router()

export default router

// src/routes.js

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
