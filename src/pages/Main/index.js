import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// icons
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa'

import {Form, SubmitButton, List } from './style';
import Container from '../../components/container/index';
// api
import Api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepository: '',
    repositories: [],
    loading: false,
  };

  // Load localStorage data
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');

    if(repositories) {
      this.setState({repositories: JSON.parse(repositories)});
    }
  }

  // save localStorage data
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if(prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

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
      url: response.data.git_url,
    };

    this.setState({
      repositories: [...repositories, data],
      newRepository: '',
      loading: false,
    });

  };

  render() {
    const { newRepository, loading, repositories } = this.state;

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

        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              {/* <span>{repository.url}</span> */}
              <Link to={`/repository/${encodeURIComponent(repository.name)}`} >More</Link>
            </li>
          ))}
        </List>

      </Container>
    );
  }
}
