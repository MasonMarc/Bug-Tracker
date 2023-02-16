import React, { useState } from 'react';
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
// Import the GraphQL mutation
import { ADD_PROJECT } from '../../utils/mutations';

const ProjectForm = () => {
    const [name, setName] = useState('');

    // Invoke `useMutation()` hook to return a Promise-based function and data about the ADD_PROFILE mutation
    const [addProject, { error }] = useMutation(ADD_PROJECT);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // Since mutation function is async, wrap in a `try...catch` to catch any network errors from throwing due to a failed request.
        try {
            console.log({ name })
            // Execute mutation and pass in defined parameter data as variables
            const { data } = await addProject({
                variables: name,
            });

            window.location.reload();
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;


        setName({ [name]: value });

    };


    return (
        <div>
            <h3>Add a Project</h3>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9 form-floating p-1">
                    <input
                        name='name'
                        placeholder="Add your Project name..."
                        value={name.name}
                        className="form-input w-100"
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12 col-lg-3">
                    <button className="btn btn-info btn-block py-3 w-50 m-1" type="submit">
                        Add Project
                    </button>
                </div>
                {error && (
                    <div className="col-12 my-3 bg-danger text-white p-3">
                        Something went wrong...
                    </div>
                )}
            </form>
        </div>
    );
};

export default ProjectForm;
