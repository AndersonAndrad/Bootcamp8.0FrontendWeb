import React from 'react';

// icons
import { FaGithubAlt, FaPlus } from 'react-icons/fa'

import { Container, Form, SubmitButton } from './style';

export default function Main() {
  return (
    <Container>
      <h1>
        <FaGithubAlt></FaGithubAlt>
        Repositories
      </h1>

      <Form onSubmit = {() => { }}>
        <input
        type="text"
        placeholder='Add repository'
        />

        <SubmitButton disabled>
          <FaPlus color="#FFF" size={14}></FaPlus>
        </SubmitButton>
      </Form>

    </Container>
  );
}
