import { useContext } from "react";
import { MessageContext } from "../store/messageStore";

const Message = () => {
  const [message] = useContext(MessageContext);

  return (
    <>
      <div className="message-toast toast-container position-fixed">
        {message.title && (
          <div
            className="toast show"
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className={`toast-header text-white bg-${message.type}`}>
              <strong className="me-auto">{message.title}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
              />
            </div>
            <div className="toast-body">{message.text}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
