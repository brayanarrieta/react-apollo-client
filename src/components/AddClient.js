import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import { CREATE_CLIENT_MUTATION } from '../mutations';

class AddClient extends Component {
	state = {
		client: {
			name: '',
			lastname: '',
			company: '',
			age: '',
			type: ''
		},
		error: false,
		emails: []
	};

	addNewField = () => {
		this.setState({
			emails: [ ...this.state.emails, { email: '' } ]
		});
	};

	removeField = (index) => {
		this.setState({
			emails: this.state.emails.filter((email, i) => i !== index)
		});
	};

	readField = (index) => (e) => {
		const emails = this.state.emails.map((email, i) => {
			if (i === index) {
				return {
					...email,
					email: e.target.value
				};
			}
			return email;
		});
		this.setState({ emails });
	};

	render() {
		const { error, client, emails } = this.state;

		return (
			<React.Fragment>
				<h2 className="text-center"> Add Client</h2>
				{error && <p className="alert alert-danger p-3 text-center">All fields are required</p>}
				<div className="row justify-content-center">
					<Mutation mutation={CREATE_CLIENT_MUTATION} onCompleted={() => this.props.history.push('/')}>
						{(createClient) => (
							<form
								className="col-md-8 m-3"
								onSubmit={(e) => {
									e.preventDefault();
									const { name, lastname, company, age, type } = client;

									if (name === '' || lastname === '' || company === '' || age === '' || type === '') {
										this.setState({ error: true });
										return;
									}
									this.setState({ error: false });

									const input = { name, lastname, company, age: Number(age), type, emails };

									createClient({
										variables: { input }
									});
								}}
							>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label>Name</label>
										<input
											type="text"
											className="form-control"
											placeholder="Name"
											onChange={(e) => {
												this.setState({
													client: {
														...client,
														name: e.target.value
													}
												});
											}}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>Lastname</label>
										<input
											type="text"
											className="form-control"
											placeholder="Lastname"
											onChange={(e) => {
												this.setState({
													client: {
														...client,
														lastname: e.target.value
													}
												});
											}}
										/>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-12">
										<label>Company</label>
										<input
											type="text"
											className="form-control"
											placeholder="Company"
											onChange={(e) => {
												this.setState({
													client: {
														...client,
														company: e.target.value
													}
												});
											}}
										/>
									</div>

									{this.state.emails.map((input, index) => (
										<div key={index} className="form-group col-md-12">
											<label>Email {index + 1}</label>
											<div className="input-group">
												<input
													type="email"
													className="form-control"
													placeholder="Email"
													onChange={this.readField(index)}
												/>
												<div className="input-group-append">
													<button
														type="button"
														className="btn btn-danger"
														onClick={() => this.removeField(index)}
													>
														{' '}
														&times; Remove{' '}
													</button>
												</div>
											</div>
										</div>
									))}

									<div className="form-group d-flex justify-content-center col-md-12">
										<button type="button" className="btn btn-warning" onClick={this.addNewField}>
											+ Add Email
										</button>
									</div>
								</div>
								<div className="form-row">
									<div className="form-group col-md-6">
										<label>Age</label>
										<input
											type="text"
											className="form-control"
											placeholder="Age"
											onChange={(e) => {
												this.setState({
													client: {
														...client,
														age: e.target.value
													}
												});
											}}
										/>
									</div>
									<div className="form-group col-md-6">
										<label>Client Type</label>
										<select
											className="form-control"
											onChange={(e) => {
												this.setState({
													client: {
														...client,
														type: e.target.value
													}
												});
											}}
										>
											<option value="">Choose...</option>
											<option value="PREMIUM">PREMIUM</option>
											<option value="BASIC">BASIC</option>
										</select>
									</div>
								</div>
								<button type="submit" className="btn btn-success float-right">
									Save
								</button>
							</form>
						)}
					</Mutation>
				</div>
			</React.Fragment>
		);
	}
}

export default AddClient;
