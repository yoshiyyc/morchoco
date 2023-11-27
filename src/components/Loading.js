import ReactLoading from "react-loading";

const Loading = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <div className="loading__container d-flex justify-content-center align-items-center position-fixed top-0 bottom-0 start-0 end-0">
          <ReactLoading type="bubbles" color="white" height={60} width={100} />
        </div>
      )}
    </>
  );
};

export default Loading;
