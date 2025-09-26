// ErrorToast.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actionFailure } from "../../features/library/librarySlice";

export default function ErrorToast() {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.library.error);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (error) {
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
        dispatch(actionFailure(null));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error, dispatch]);

  if (!error || !visible) return null;

  return (
    <div className="error-toast">
      {error}
    </div>
  );
}
