

const Bug = ({ _id, name, description }) => {
    return (
        <div key={_id} className="card p-3">
            <h4>
                {name}
            </h4>
            <p>{description}</p>

            <button className='btn btn-warning'>Delete Bug</button>
        </div>
    );
};



export default Bug;