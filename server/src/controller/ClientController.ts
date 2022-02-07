import { Request, Response } from "express";
import { getRepository, Like } from "typeorm";
import { Kurs } from "../entity/Kurs";
import { Kviz } from "../entity/Kviz";
import { Pitanje } from "../entity/Pitanje";
import { Pokusaj } from "../entity/Pokusaj";



export async function vratiSveKurseve(req: Request, res: Response) {
  const kursRepository = getRepository(Kurs);
  res.json(await kursRepository.find());
}
export async function vratiSveKvizoveIzKursa(req: Request, res: Response) {
  const kvizRepository = getRepository(Kviz);
  res.json(await kvizRepository.find({
    where: {
      kurs: {
        id: req.params.id
      }
    }
  }));
}
export async function vratiSvaPitanjaIzKviza(req: Request, res: Response) {
  const pitanjeRepository = getRepository(Pitanje)
  const pitanja = await pitanjeRepository.find({
    where: {
      kviz: {
        id: req.params.id
      }
    }
  })
  res.json(pitanja.map(element => {
    return {
      ...element,
      opcije: element.opcije.map(opcija => {
        return opcija.naziv
      })
    }
  }));
}

interface OdgovorDto {
  id: number,
  selektovaneOpcije: string[]
}

export async function submitujKviz(req: Request, res: Response) {
  const body = req.body as OdgovorDto[];
  const id = req.params.id;
  const pitanjeRepository = getRepository(Pitanje);
  const pitanja = await pitanjeRepository.find({
    where: {
      kviz: {
        id: id
      }
    }
  });
  let rezultat = 0;
  for (let pitanje of pitanja) {
    let rezultatPitanja = 0;
    const odgovor = body.find(e => e.id === pitanje.id);
    for (let opcija of pitanje.opcije) {
      const pogodio = odgovor.selektovaneOpcije.includes(opcija.naziv) === opcija.tacna;
      if (pogodio) {
        rezultatPitanja = rezultatPitanja + 1 / pitanje.opcije.length;
      } else {
        rezultatPitanja = rezultatPitanja - 1 / pitanje.opcije.length;
      }
    }
    rezultat = rezultatPitanja * pitanje.brojPoena;
  }
  const pokusajRepository = getRepository(Pokusaj);
  await pokusajRepository.insert({
    brojPoena: rezultat,
    kvizId: Number(id),
    userId: (req.session as any).user.id,
  })
  res.json({
    brojPoena: rezultat
  });
}
export async function vratiSveKvizove(req: Request, res: Response) {
  const size = (req.query as any).size || 20;
  const page = (req.query as any).page || 0;
  const naziv = (req.query as any).naziv || '';
  const sortType = (req.query as any).sortType || 'ASC';
  const kvizRepository = getRepository(Kviz);
  const kvizovi = await kvizRepository.find({
    relations: ['kurs'],
    where: {
      naziv: Like(naziv)
    },
    order: {
      naziv: sortType
    },
    take: size,
    skip: page * size
  })
  res.json({
    content: kvizovi,
    totalElements: await kvizRepository.count()
  });
}