import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function CustomMessageBar() {
  const dispatch = useDispatch();
  const {tostMsg} = useSelector((state) => state.library);

  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if (tostMsg.type === 'error') {
      setMessage(tostMsg.msg);
      setType(tostMsg.type);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    if (tostMsg.type === 'success') {
      setMessage(tostMsg.msg);
      setType(tostMsg.type);
      setVisible(true);

      const timer = setTimeout(() => {
        setVisible(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [tostMsg, dispatch]);

  if (!visible) return null;

  return (
    <div className={`toast ${type}`}>
      {message}
    </div>
  );
}
