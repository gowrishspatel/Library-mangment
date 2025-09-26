export default function CustomDialog(props) {

    const { borrowers = [], selectedBook, selectedBorrower, onChangeBorrower, handleSubmit, onClose } = props;

    return (
        <div className="dialog">
            <div className="dialog-box">
                <h2>Assign Book</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form">
                        <label>Borrower:</label>
                        <select
                            value={selectedBorrower}
                            onChange={(b) => onChangeBorrower(b)}
                            required
                        >
                            <option value="">Select Borrower</option>
                            {borrowers.map((b) => (
                                <option key={b.id} value={b.id}>
                                    {b.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form">
                        <label>Book:</label>
                        <select
                            value={selectedBook?.id || ""}
                            required
                            disabled
                        >
                            <option value="">Select Book</option>
                            <option value={selectedBook.id}>{selectedBook.title}</option>
                        </select>

                    </div>

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
