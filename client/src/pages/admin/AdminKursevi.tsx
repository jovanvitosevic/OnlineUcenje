import React, { useEffect, useState } from 'react';
import { Button, FlexboxGrid, Form, IconButton, Input, Schema, Table } from 'rsuite';
import { kreirajKurs, vratiSveKurseve } from '../../servis/kursServis';
import { Kurs } from '../../tipovi';
import TrashIcon from '@rsuite/icons/Trash';

//@ts-ignore
const Textarea = React.forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const model = Schema.Model({
  naziv: Schema.Types.StringType().isRequired(),
  opis: Schema.Types.StringType().isRequired()
})

export default function AdminKursevi() {
  const [kursevi, setKursevi] = useState<Kurs[]>([]);
  const [formaKurs, setFormaKurs] = useState<Partial<Kurs>>({});
  useEffect(() => {
    vratiSveKurseve().then(setKursevi);
  }, [])

  return (
    <div className='ekran maliPadding'>
      <h1 style={{ textAlign: 'center', width: '100%' }} >Spisak kurseva - ADMIN</h1>

      <FlexboxGrid className='maliPadding' justify='space-between'>
        <FlexboxGrid.Item colspan={15}>
          <Table
            autoHeight
            wordWrap
            rowHeight={60}
            data={kursevi}
          >
            <Table.Column resizable >
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.Cell dataKey='id' />
            </Table.Column>
            <Table.Column resizable width={450}>
              <Table.HeaderCell>Naziv kursa</Table.HeaderCell>
              <Table.Cell dataKey='naziv' />
            </Table.Column>
            <Table.Column resizable width={450}>
              <Table.HeaderCell>Opis kursa</Table.HeaderCell>
              <Table.Cell dataKey='opis' />
            </Table.Column>
            <Table.Column fixed='right' resizable width={80}>
              <Table.HeaderCell>Obrisi</Table.HeaderCell>
              <Table.Cell>
                {
                  kviz => {
                    return (
                      <IconButton onClick={e => {
                        console.log(kviz);
                      }} icon={<TrashIcon />} />
                    )
                  }
                }
              </Table.Cell>
            </Table.Column>
          </Table>
        </FlexboxGrid.Item>
        <FlexboxGrid.Item colspan={8}>
          <h2>Kreiraj kurs</h2>
          <Form
            model={model}
            formValue={formaKurs}
            onChange={val => {
              //@ts-ignore
              setFormaKurs(val);
            }}
            checkTrigger='blur'
            onSubmit={async ch => {
              if (!ch) {
                return;
              }
              const noviKurs = await kreirajKurs(formaKurs);
              setKursevi(prev => {
                return [
                  ...prev,
                  noviKurs
                ]
              })
            }}
          >
            <Form.Group>
              <Form.ControlLabel>Naziv</Form.ControlLabel>
              <Form.Control name="naziv" />
            </Form.Group>
            <Form.Group controlId="opis">
              <Form.ControlLabel>Opis</Form.ControlLabel>
              <Form.Control name="opis" accepter={Textarea} />
            </Form.Group>
            <Button type='submit' appearance='primary'>Kreiraj kurs</Button>
          </Form>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </div>
  );
}
