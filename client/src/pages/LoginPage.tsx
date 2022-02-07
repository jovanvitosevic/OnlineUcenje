import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonToolbar, Container, Content, FlexboxGrid, Form, Panel, Schema } from 'rsuite';

const model = Schema.Model({
  username: Schema.Types.StringType().isRequired(),
  password: Schema.Types.StringType().isRequired(),
});

export default function LoginPage() {
  const [forma, setForma] = useState({
    username: '',
    password: ''
  });
  return (
    <div className="show-fake-browser login-page">
      <Container>
        <Content className='spusteno'>
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
              <Panel header={<h3>Login</h3>} bordered>
                <Form
                  formValue={forma}
                  model={model}
                  onChange={value => {
                    //@ts-ignore
                    setForma(value);
                  }}
                  fluid>
                  <Form.Group>
                    <Form.ControlLabel>Username</Form.ControlLabel>
                    <Form.Control name="username" />
                  </Form.Group>
                  <Form.Group>
                    <Form.ControlLabel>Sifra</Form.ControlLabel>
                    <Form.Control name="password" type="password" autoComplete="off" />
                  </Form.Group>
                  <Form.Group>
                    <ButtonToolbar>
                      <Button type='submit' appearance="primary">Prijavite se</Button>
                      <Link to='/register'>
                        <Button type='button' appearance="link">Nemate nalog?</Button>
                      </Link>
                    </ButtonToolbar>
                  </Form.Group>
                </Form>
              </Panel>
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </Content>
      </Container>
    </div>
  );
}
