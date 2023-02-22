import { Router } from 'express'
import authenticateUser from './_middlewares/authenticate-user.js'

const router = Router()

export default router

// src/routes.js

// API | AUTH
router.post('/api/auth/signup', (await import('./controllers/api/auth/signup.js')).default)
router.post('/api/auth/login', (await import('./controllers/api/auth/login.js')).default)
router.delete('/api/auth/logout', (await import('./controllers/api/auth/logout.js')).default)

// TEST authenticateUser
router.get('/api/my/private', authenticateUser('json'), (req, res) => {
  res.json('Private Data!')
})
router.get('/my/private', authenticateUser('html'), (req, res) => {
  res.send('<div>Private Page</div>')
})

// API | MY PROFILE
router.get('/api/my/profile', authenticateUser('json'), (await import('./controllers/api/my/profile/show.js')).default)

// API | POSTS
router.post('/api/posts', (await import('./controllers/api/posts/create.js')).default)
router.get('/api/posts/:id', (await import('./controllers/api/posts/show.js')).default)
router.get('/api/posts', (await import('./controllers/api/posts/index.js')).default)
router.put('/api/posts/:id', (await import('./controllers/api/posts/update.js')).default)
router.delete('/api/posts/:id', (await import('./controllers/api/posts/destroy.js')).default)

// API | NOT FOUND
router.use('/api', (await import('./controllers/api/not-found.js')).default)

// PAGES | NOT FOUND
router.use((await import('./controllers/pages/not-found.js')).default)

// Pages | POSTS
router.get('/posts/new', (await import('./controllers/pages/posts/new.js')).default)
router.get('/posts/:id', (await import('./controllers/pages/posts/show.js')).default)
router.get('/posts/:id/edit', (await import('./controllers/pages/posts/edit.js')).default)
router.get('/posts', (await import('./controllers/pages/posts/index.js')).default)
