import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// API | MY PROFILE
router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/show.js')).default)

// API | POSTS
router.get('/api/my/posts', (await import('./controllers/api/my/posts/index.js')).default)
router.post('/api/my/posts', (await import('./controllers/api/my/posts/create.js')).default)
router.get('/api/my/posts/:id', (await import('./controllers/api/my/posts/show.js')).default)
router.put('/api/my/posts/:id', (await import('./controllers/api/my/posts/update.js')).default)
router.delete('/api/my/posts/:id', (await import('./controllers/api/my/posts/destroy.js')).default)

// API | NOT FOUND
router.use('/api', (await import('./controllers/api/not-found.js')).default)

// PAGES | AUTH
router.get('/auth/signup', (await import('./controllers/pages/auth/signup.js')).default)
router.get('/auth/login', (await import('./controllers/pages/auth/login.js')).default)

// PAGES | MY POSTS | AUTH REQUIRED
router.get('/my/posts/new', authenticateUser('html'), (await import('./controllers/pages/my/posts/new.js')).default)
router.get('/my/posts/:id/edit', authenticateUser('html'), (await import('./controllers/pages/my/posts/edit.js')).default)
router.get('/my/posts/:id', authenticateUser('html'), (await import('./controllers/pages/my/posts/show.js')).default)
router.get('/my/posts', authenticateUser('html'), (await import('./controllers/pages/my/posts/index.js')).default)

// PAGES | POSTS
router.get('/posts', (await import('./controllers/pages/posts/index.js')).default)
router.get('/posts/:id', (await import('./controllers/pages/posts/show.js')).default)

// PAGES | HOMEPAGE
router.get('/', (await import('./controllers/pages/posts/index.js')).default)

// PAGES | NOT FOUND
router.use((await import('./controllers/pages/not-found.js')).default)

export default router
