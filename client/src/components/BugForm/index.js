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
        <div className='form-signin w-100 m-auto p-5 text-center offset-lg-1'>
            <h3 className='offset-lg-1'>Add a Bug</h3>
            <form
                className="flex-row justify-center align-center col-lg-6 offset-lg-5 text-center"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 col-lg-6 form-floating p-1">
                    <input
                        name='name'
                        placeholder="Add your Bug name"
                        value={form.name}
                        className="form-input w-100"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12 col-lg-6 form-floating p-1">
                    <textarea
                        name='description'
                        placeholder="Add Bug description"
                        value={form.description}
                        className="form-input w-100"
                        onChange={handleChange}
                    />
                </div>

                <div className="col-12 col-lg-6">
                    <button className="btn btn-info btn-block py-3 w-50 m-1" type="submit">
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
