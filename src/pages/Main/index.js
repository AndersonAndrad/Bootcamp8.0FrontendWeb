import React, { Component } from 'react';

// icons
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import { Container, Form, SubmitButton } from './style';

// api
import Api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepository: '',
    repositories: [],
    loading: false,
  };

  handleInputChange = e => {
    this.setState({newRepository: e.target.value});
  };

  handleSubmit = async e =>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const { newRepository, repositories } = this.state;

    const response = await Api.get(`repos/${newRepository}`);

    console.log(response.data);

    const data = {
      name: response.data.full_name,
      URL: response.data.git_url,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepository: '',
      loading: false,
    });

  };

  render() {
    const { newRepository, loading } = this.state;

    return (
      <Container>
        <h1>
          <FaGithubAlt></FaGithubAlt>
          Repositories
        </h1>

        <Form onSubmit = {this.handleSubmit}>
          <input
          type="text"
          placeholder='Add repository'
          value= {newRepository}
          onChange= {this.handleInputChange}
          />

          <SubmitButton loading={loading} >
            { loading ? <FaSpinner color="#fff" size={14} /> : <FaPlus color="#FFF" size={14}></FaPlus> }
          </SubmitButton>
        </Form>

      </Container>
    );
  }
}
