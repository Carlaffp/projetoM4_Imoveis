import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import { usersRouter } from './routers/user.router';
import handleErrosMiddleware from './middlewares/handleErros.middleware';
import { loginRouter } from './routers/login.router';
import { categoryRouter } from './routers/category.router';
import { realEstateRouter } from './routers/realEstate.router';
import { scheduleRouter } from './routers/schedule.router';

const app = express();
app.use(express.json());

app.use("/users",usersRouter)
app.use("/login", loginRouter)
app.use("/categories", categoryRouter)
app.use("/realEstate",realEstateRouter)
app.use("/schedules",scheduleRouter)

app.use(handleErrosMiddleware.erro)

export default app;
