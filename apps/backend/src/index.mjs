import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import agendamentoRoutes from './routes/agendamentoRouter.mjs';

const PORT = process.env.PORT || 5000;

const server = express();

server.use(morgan("dev"));
server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(agendamentoRoutes);


server.listen(PORT, () => {
  console.log(`Backend is running in port ${PORT}`);
});
