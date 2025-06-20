import "./Header.css"

const Header = () => {
  return (
    <div className="bg" style={{height:'fit-content',}}>
      <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',padding:'15px 30px'}}>
        <div>
          <h2 className="font-16 text-white pl-10">Presently</h2>
        </div>
        <h3 className="btn btn-primary lg-btn">Login</h3>
      </div>
    </div>
  );
};

export default Header;
