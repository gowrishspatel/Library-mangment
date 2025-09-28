export default function CustomDialog(props) {

    const { borrowers = [], selectedBook, selectedBorrower, onChangeBorrower, handleSubmit, onClose } = props;

    return (
        <div className="dialog">
            <div className="dialog-box">
                <h2>Assign Book</h2>
                <form onSubmit={handleSubmit}>
                    {props.children}
                    
                    <div className="form-actions">
                        <button type="submit" className="btn">
                            Submit
                        </button>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
