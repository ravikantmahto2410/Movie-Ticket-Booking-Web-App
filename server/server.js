import express from 'express'
import cors from 'cors'
import 'dotenv/config';
import connectDB from './configs/db.js';
import { clerkMiddleware,clerkClient , requireAuth, getAuth } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"
import showRouter from './routes/show.routes.js';
import bookingRouter from './routes/booking.routes.js';
import adminRouter from './routes/admin.routes.js';
import userRouter from './routes/user.routes.js';
import { stripeWebhooks } from './controllers/stripeWebhook.controller.js';


await connectDB()

const app = express();
const port = process.env.PORT || 8000;


//Stripe webhook route
app.use('/api/stripe',express.raw({
    type: 'application/json'
}), stripeWebhooks)

//Middleware

app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

//Api Routes
app.get('/',(req,res) => res.send('Server is Live!'))
app.use('/api/inngest',serve({ client: inngest, functions }))
app.use('/api/show', showRouter)
app.use('/api/booking', bookingRouter)
app.use('/api/admin',adminRouter)
app.use('/api/user', userRouter)

app.listen(port, () => console.log('Server started at ', port))