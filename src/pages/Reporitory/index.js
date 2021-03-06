// dependencies
import React, {Component} from 'react';
import propTypes from 'prop-types'
import { Link } from 'react-router-dom';

// style
import {Loading, Owner, IssueList} from './styles';
import Container from '../../components/container/index';
import { FaArrowLeft } from 'react-icons/fa'

// api
import Api from '../../services/api';

export default class repository extends Component {
  static propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        repository: propTypes.string
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match} = this.props;

    const reponame = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      Api.get(`/repos/${reponame}`),
      Api.get(`/repos/${reponame}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        }
      })
    ])

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });


  }

  render(){
    const { repository, issues, loading} = this.state;

    if(loading) {
      return <Loading>Loading...</Loading>
    }

    return (
    <Container>
      <Owner>
        <Link to="/"><FaArrowLeft></FaArrowLeft> Back to repositories</Link>
        <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
        <h1>{repository.name}</h1>
        <p>{repository.description}</p>
      </Owner>

      <IssueList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login}/>
            <div>
              <strong>
                <a href={issue.html_url}>{issue.title}</a>
                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}
              </strong>
              <p>{issue.user.login}</p>
            </div>
          </li>
        ))}
      </IssueList>
    </Container>);
  }
}
