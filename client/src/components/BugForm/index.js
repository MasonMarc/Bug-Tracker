import React, { useState } from 'react';
// Import the `useMutation()` hook from Apollo Client
import { useMutation } from '@apollo/client';
import { useParams, useLocation } from 'react-router-dom';
// Import the GraphQL mutation
import { ADD_BUG } from '../../utils/mutations';
import { QUERY_BUGS } from '../../utils/queries';

const BugForm = () => {
    const { id } = useParams();
    const [form, setForm] = useState({});
    const [characterCount, setCharacterCount] = useState(0);


    console.log('ID', id);

    // add mutation
    const [addBug, { error }] = useMutation(ADD_BUG);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        // try catch added to catch errors
        try {
            // Execute mutation and pass in defined parameter data as variables



            const { data } = await addBug({
                variables: { ...form, projectId: id },
                refetchQueries: [{ 
                    query: QUERY_BUGS, 
                    variables: { id }
                }]
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm(form => ({ ...form, [name]: value }));
        setCharacterCount(value.length);
    };


    return (
        <div>
            <h3>Add a Bug</h3>
            <p
                className={`m-0 ${characterCount === 280 || error ? 'text-danger' : ''
                    }`}
            ></p>
            <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-9">
                    <input
                        name='name'
                        placeholder="Add your Bug name"
                        value={form.name}
                        className="form-input w-100"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12 col-lg-9">
                    <textarea
                        name='description'
                        placeholder="Add Bug description"
                        value={form.description}
                        className="form-input w-100"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12 col-lg-3">
                    <button className="btn btn-info btn-block py-3" type="submit">
                        Add Bug
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

export default BugForm;