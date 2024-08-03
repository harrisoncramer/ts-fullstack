import express from 'express'

const app = express()
app.use(express.json())

app.get('/api/v1/users', (req, res) => {
  res.status(200).send({ hello: 'world' });
});

export default app;
