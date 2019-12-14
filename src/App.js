import React, { Component } from 'react'
import { ApolloProvider } from 'react-apollo';
import ApolloClient from 'apollo-boost';
import Header from './components/Header';
import ClientsList from './components/ClientsList';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';


const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql',
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
});


class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <React.Fragment>
            <Header></Header>
            <div className='container'>
              <Switch>
                <Route exact path="/" component={ClientsList} />
                <Route exact path="/clients/new" component={AddClient} />
                <Route exact path="/clients/:id/edit" component={EditClient} />
              </Switch>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </ApolloProvider>
    )
  }
}


export default App;
