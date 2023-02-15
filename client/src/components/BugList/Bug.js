
// const deleteBug = async (bug) => {
//     try {
//       const { data } = await deleteBug({
//         variables: { bug },
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   if (!bugs.length) {
//     return <h3>No Bugs Yet</h3>;
//   }


const Bug = ({ _id, name, description }) => {
    return (
        <div key={_id} className="card p-3">
            <h4>
                {name}
            </h4>
            <p>{description}</p>

            <button className='btn btn-warning'
            // onClick={() => deleteBug(bug)}
            >Delete Bug</button>
        </div>
    );
};


export default Bug;