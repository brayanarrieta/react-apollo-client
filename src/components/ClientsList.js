import React from 'react';
import { Query } from 'react-apollo';
import { GET_CLIENTS_QUERY } from '../queries';
import { Link } from 'react-router-dom';

const ClientsList = () => (
    <Query query={GET_CLIENTS_QUERY} pollInterval={1000}>
        {({ loading, error, data }) => {
            if (loading) {
                return 'loading...';
            } else if (error) {
                return `Error: ${error.message}`;
            }

            return (
                <React.Fragment>
                    <h2 className='text-center'>Clients List</h2>
                    <ul className='list-group mt-4'>
                        {data.getClients.map((client) => (
                            <li key={client.id} className='list-group-item'>
                                <div className='row justify-content-between align-items-center'>
                                    <div className='col-md-8 d-flex justify-content-between align-items-center'>
                                        {client.name} {client.lastname} - {client.company}
                                    </div>
                                    <div className='col-md-4 d-flex justify-content-end'>
                                        <Link to={`/clients/${client.id}/edit`} className='btn btn-success d-block d-md-inline-block'>
                                            Edit Client
                                        </Link>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </React.Fragment>
            );
        }}
    </Query>
);

export default ClientsList; 