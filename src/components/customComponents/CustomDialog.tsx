import { FormEvent, ReactNode } from "react";

interface User {
  id: number;
  name: string;
  role: string;
  email: string;
  password?: string;
  uid?: string;
}

interface dialogProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
  children: ReactNode;
}

export default function CustomDialog(props: dialogProps) {

    const { handleSubmit, onClose, children } = props;

    return (
        <div className="dialog">
            <div className="dialog-box">
                <h2>Assign Book</h2>
                <form onSubmit={handleSubmit}>
                    {children}
                    
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
