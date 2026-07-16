const LoadingSpinner = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="spinner-border" role="status" style={{ width: "5rem", height: "5rem", marginTop: "16rem" }}>
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;