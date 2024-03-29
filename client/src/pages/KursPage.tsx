import React, { useEffect, useState } from 'react';
import { vratiKvizoveIzKursa } from '../servis/kursServis';
import { Kviz } from '../tipovi';
import { useParams } from 'react-router-dom'
import KvizKartica from '../components/KvizKartica';
export default function KursPage() {

  const [kvizovi, setKvizovi] = useState<Kviz[]>([]);
  const params = useParams();
  useEffect(() => {
    vratiKvizoveIzKursa((params as any).id).then(setKvizovi);
  }, []);

  return (
    <div className='maliPadding ekran'>
      <h1 style={{ textAlign: 'center', width: '100%' }}>Spisak kvizova</h1>
      {
        kvizovi.map(element => {
          return (
            <KvizKartica key={element.id} kviz={element} />
          )
        })
      }
    </div>
  );
}
