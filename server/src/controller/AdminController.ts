import { Request, Response } from "express";
import { getManager, getRepository } from "typeorm";
import { Kurs } from "../entity/Kurs";
import { Kviz } from '../entity/Kviz'
import { Pitanje } from "../entity/Pitanje";
import { User } from "../entity/User";

export async function kreirajKurs(req: Request, res: Response) {
  const kursRepository = getRepository(Kurs);

  const kurs = await kursRepository.save(req.body);
  res.json(kurs);
}
export async function obrisiKurs(req: Request, res: Response) {
  const kursRepository = getRepository(Kurs);
  try {

    await kursRepository.delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function kreirajKviz(req: Request, res: Response) {
  const kvizRepository = getRepository(Kviz);

  const kviz = await kvizRepository.save(req.body);
  res.json(kviz);
}
export async function obrisiKviz(req: Request, res: Response) {
  const kvizRepository = getRepository(Kviz);
  await kvizRepository.delete(req.params.id);
  res.sendStatus(204);
}

export async function vratiSvaPitanja(req: Request, res: Response) {
  res.json(
    await getRepository(Pitanje).find({
      relations: ['kviz']
    })
  )
}

export async function kreirajPitanje(req: Request, res: Response) {
  const pitanjeRepository = getRepository(Pitanje);

  const kviz = await pitanjeRepository.save(req.body);
  res.json(kviz);
}
export async function obrisiPitanje(req: Request, res: Response) {
  const pitanjeRepository = getRepository(Pitanje);
  await pitanjeRepository.delete(req.params.id);
  res.sendStatus(204);
}

export async function izmeniPitanje(req: Request, res: Response) {
  const id = req.params.id;
  const body = req.body;
  const pitanje = await getRepository(Pitanje).save({
    ...body,
    id: parseInt(id)
  });
  const kviz = await getRepository(Kviz).findOne({
    where: {
      id: body.kviz.id
    }
  })
  res.json({ ...pitanje, kviz });
}

export async function vratiSveKorisnike(req: Request, res: Response) {
  const korisnici = await getRepository(User).find({
    where: {
      category: 'user'
    },
    relations: ['pokusaji']
  });
  res.json(korisnici);
}