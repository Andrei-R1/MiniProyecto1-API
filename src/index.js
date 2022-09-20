import express from "express";
import morgan from "morgan";
import cors from "cors";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();
app.use(morgan("dev"));

app.use(cors());
app.use(express.json());

app.listen(process.env.PORT || 8000, () => {
  console.log(`🚀 App working on port 8000`);
});

app.get("/", (req, res) => {
  res.send("- API is correctly working -");
});

//////////// Posts ///////////
app.post("/createEscuela", async (req, res) => {
  const { nombre, periodo } = req.body;
  const libro = await prisma.escuela.create({
    data: {
      nombre: nombre,
      periodo: periodo,
    },
  });
  res.json(libro);
});

app.post("/createEstudiante", async (req, res) => {
  const { nombre, noCarne, escuelaId } = req.body;
  const libro = await prisma.estudiante.create({
    data: {
      nombre: nombre,
      noCarne: noCarne,
      escuelaId: escuelaId
    },
  });
  res.json(libro);
});

app.post("/createProfesor", async (req, res) => {
  const { nombre, noCarne, escuela } = req.body;
  const libro = await prisma.profesor.create({
    data: {
      nombre: nombre,
      noCarne: noCarne,
      escuela: escuela,
    },
  });
  res.json(libro);
});

app.post("/createEncuesta", async (req, res) => {
  const { nombre, datos, escuela } = req.body;
  const libro = await prisma.encuesta.create({
    data: {
      nombre: nombre,
      datos: datos,
      escuela: escuela,
    },
  });
  res.json(libro);
});

app.post("/createEvaluacion", async (req, res) => {
  const { nombre, datos, escuela } = req.body;
  const libro = await prisma.evaluacion.create({
    data: {
      nombre: nombre,
      datos: datos,
      escuela: escuela,
    },
  });
  res.json(libro);
});

///////////// Gett All //////////////

app.get("/escuelas", async (req, res) => {
  const tweets = await prisma.escuela.findMany();
  res.json(tweets);
});

app.get("/estudiantes", async (req, res) => {
  const tweets = await prisma.estudiante.findMany();
  res.json(tweets);
});

app.get("/profesores", async (req, res) => {
  const tweets = await prisma.profesor.findMany();
  res.json(tweets);
});

app.get("/encuestas", async (req, res) => {
  const tweets = await prisma.encuesta.findMany();
  res.json(tweets);
});

app.get("/evaluaciones", async (req, res) => {
  const tweets = await prisma.evaluacion.findMany();
  res.json(tweets);
});

///////////// Get by Id ///////////////

app.get("/escuela/:id", async (req, res) => {
  const id = Number(req.params.id);
  const tweets = await prisma.escuela.findUnique({
      where: {
          id: id,
        },
  });
  res.json(tweets);
});

///////////// Delete by id /////////////////

app.delete('/encuesta/:id', async(req, res) =>{
  const id = Number(req.params.id);
  const deleteUser = await prisma.encuesta.delete({
      where:{
          id: id,
      },
  });
  res.json(deleteUser);
});

app.delete('/evaluacion/:id', async(req, res) =>{
  const id = Number(req.params.id);
  const deleteUser = await prisma.evaluacion.delete({
      where:{
          id: id,
      },
  });
  res.json(deleteUser);
});

//////////// Put by Id //////////////////

app.put("/escuela/:id", async (req, res) => {
  const {nombre , periodo} = req.body;
  const id = Number(req.params.id);
  const updateLibro = await prisma.escuela.update({
    where: {
      id: id,
    },
    data: {
      nombre: nombre,
      periodo: periodo,
    },
  });
  res.json(updateLibro);
});

app.put("/estudiante/:id", async (req, res) => {
  const {nombre , noCarne, escuela} = req.body;
  const id = Number(req.params.id);
  const updateLibro = await prisma.estudiante.update({
    where: {
      id: id,
    },
    data: {
      nombre: nombre,
      noCarne: noCarne,
      escuela: escuela,
    },
  });
  res.json(updateLibro);
});

app.put("/profesor/:id", async (req, res) => {
  const {nombre , noCarne, escuela} = req.body;
  const id = Number(req.params.id);
  const updateLibro = await prisma.profesor.update({
    where: {
      id: id,
    },
    data: {
      nombre: nombre,
      noCarne: noCarne,
      escuela: escuela,
    },
  });
  res.json(updateLibro);
});

app.put("/encuesta/:id", async (req, res) => {
  const {nombre , noCarne, escuela} = req.body;
  const id = Number(req.params.id);
  const updateLibro = await prisma.encuesta.update({
    where: {
      id: id,
    },
    data: {
      nombre: nombre,
      escuela: escuela,
      datos : datos,
    },
  });
  res.json(updateLibro);
});

app.put("/evaluacion/:id", async (req, res) => {
  const {nombre , noCarne, escuela} = req.body;
  const id = Number(req.params.id);
  const updateLibro = await prisma.evaluacion.update({
    where: {
      id: id,
    },
    data: {
      nombre: nombre,
      escuela: escuela,
      datos : datos,
    },
  });
  res.json(updateLibro);
});