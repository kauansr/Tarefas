import express from  'express';
import userRouter from '../src/routers/userRoutes.js'
import tarefaRouter from './routers/tarefaRoutes.js';

const app = express();

app.use(express.json());


app.use('/users', userRouter)
app.use('/tarefas', tarefaRouter)

app.get("/", (req, res) => {
  res.send("Pagina base!!")
})

const PORT = 3000;

app.listen(PORT, async () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
