import { useSelector } from "react-redux";

const Message = () => {
  /*------------------------------------*\
  | Hooks
  \*------------------------------------*/
  const messages = useSelector((state) => state.message);

  return (
    <>
      <div className="message-toast toast-container position-fixed">
        {messages?.map((msg) => {
          return (
            <div
              key={msg.id}
              className="toast show"
              role="alert"
              aria-live="assertive"
              aria-atomic="true"
            >
              <div className={`toast-header text-white bg-${msg.type}`}>
                <strong className="me-auto">{msg.title}</strong>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="toast"
                  aria-label="Close"
                />
              </div>
              <div className="toast-body">{msg.text}</div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Message;
