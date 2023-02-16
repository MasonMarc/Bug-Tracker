import { useMutation } from '@apollo/client';
import { DEL_BUG } from '../../utils/mutations';
import { QUERY_BUGS } from '../../utils/queries';



const Bug = ({ _id, name, description }) => {

    const [deleteBug, { error }] = useMutation(DEL_BUG, {
        // update(cache, { data: { deleteBug } }) {
        //     try {

        //         const { projectBugs } = cache.readQuery({ query: QUERY_BUGS })

        //         cache.writeQuery({
        //             query: QUERY_BUGS,
        //             data: {
        //                 projectBugs: projectBugs.filter(function (bug) {
        //                     if (bug._id !== deleteBug._id) {
        //                         return bug;
        //                     }
        //                 })
        //             },
        //         });
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    })

    const handleDelete = async (bug) => {
        try {
            const { data } = await deleteBug({
                variables: { id: bug },
            });
        } catch (error) {
            console.error(error);
        }
        window.location.reload();
    };
    
    console.log(_id);
    return (
        <div key={_id} className="card p-3">
            <h4>
                {name}
            </h4>
            <p>{description}</p>

            <button className='btn btn-warning'
                onClick={() => handleDelete(_id)}
            >Delete Bug</button>
        </div>
    );
};


export default Bug;