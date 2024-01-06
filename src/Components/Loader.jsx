import "../styles/Loader.css";

const Loader = () => {
  return (
    <>
      <div className="lds-ring mx-auto bg-red-700 rounded-full text-black">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

export default Loader;
