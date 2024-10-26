import express from  'express';
import userRouter from '../src/routers/userRoutes.js'
import tarefaRouter from './routers/tarefaRoutes.js';
import cors from 'cors'

const app = express();

app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/users', userRouter)
app.use('/tarefas', tarefaRouter)

app.get("/", (req, res) => {
  res.send("Pagina base!!")
})

const PORT = 8000;

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
