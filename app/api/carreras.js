import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const carrera = await prisma.carreras.findMany();
    res.status(200).json(carrera);
  } catch (error) {
    console.error('Error al obtener las carreras:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
