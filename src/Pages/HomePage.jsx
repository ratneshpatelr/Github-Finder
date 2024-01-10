import { useState } from "react";
import { Link } from "react-router-dom";
import { BsGithub } from "react-icons/bs";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Loader from "../Components/Loader";


const HomePage = () => {

  //! USE STATES
  const [input, setInput] = useState("");
  const [userSearch, setUserSearch] = useState([]);
  const [loading, setLoading] = useState(false)
  const [totalItemCount, setTotalItemCount] = useState([])

  //! SEARCH USER FUNCTION
  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true)
    setTimeout(() => {
      axios.get(`https://api.github.com/search/users?q=${input}`).then(res => { setUserSearch(res.data.items); setTotalItemCount(res.data) })
      setLoading(false)
      console.log(userSearch);
    }, 1200);
  }

  //! CHANGE PAGINATION SEARCH USER
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    axios.get(`https://api.github.com/search/users?q=${input}&page=${currentPage}`).then(res => setUserSearch(res.data.items))
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
       <img
        alt="My Image"
        className="w-48 h-48 rounded-full object-cover blur-[1px]"
        height="200"
        src={'/myimage.jpeg'}
        style={{
          aspectRatio: "200/200",
          objectFit: "cover",
        }}
        width="200"
      />
      <div className="text-center space-y-2 mb-2">
        <h1 className="text-2xl font-bold md:text-3xl lg:text-4xl">Ratnesh Kurmi</h1>
        <p className="text-slate-200">Web Developer || Programmer</p>
      </div>
      <button
          className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
        >
          <a href="Ratnesh Resume_01.pdf">View Resume</a>
        </button>
      </div>
      {/* Title */}
      <h1 h1 className="text-4xl text-center font-bold underline text-stone-500 mt-4" > Search GitHub Profile</h1 >

      {/* Search Bar */}
      <form form className="form-control" >
        <div className="flex justify-center">
          <input value={input} onChange={(e) => { setInput(e.target.value); setUserSearch([]) }} type="search" placeholder="Search" className="w-4/6  input input-primary input-bordered lg:w-2/6" />
        </div>
        <div className="flex justify-center space-x-3 mt-8">
          <button onClick={onSubmitHandler} className="btn btn-primary w-60">Search</button>
        </div>
      </form >

      {/* Pagination Bar */}
      <div className="pagination text-center" >
        {userSearch.length ?
          <ReactPaginate
            className={'p-5'}
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={totalItemCount.total_count ? (totalItemCount.total_count > 999 ? 32 : Math.ceil(totalItemCount.total_count / 30)) : 0}
            marginPagesDisplayed={3}
            pageRangeDisplayed={1}
            onPageChange={handlePageClick}
            containerClassName={'btn-group flex justify-center p-5'}
            pageClassName={'btn'}
            pageLinkClassName={'page-link'}
            previousClassName={'btn btn-primary'}
            previousLinkClassName={'page-link'}
            nextClassName={'btn btn-primary'}
            nextLinkClassName={'page-link'}
            breakClassName={'btn'}
            breakLinkClassName={'page-link'}
            activeClassName={'btn-active'}
          /> : ""}
      </div >

      {/* USER LIST CONTAINER*/}
      <div className="flex w-5/6 flex-wrap mx-auto">
        {/* USER LIST */}
        {loading ? <Loader /> : userSearch.map(user => {
          return <div key={user.id} className="mx-auto mb-5">
            {/* USER CARD */}
            <div className="card card-bordered border-white flex pt-5 bg-slate-800 w-72 ">
              {/* CARD AVATAR */}
              <div className="avatar flex items-center justify-center">
                <div className="rounded-full w-28 h-28 ">
                  <img alt="avatar" src={user.avatar_url} />
                </div>
              </div>
              {/* CARD BODY */}
              <div className="card-body flex items-center">
                <h1 className="card-title text-2xl">{user.login}</h1>
                <div className="flex items-center">
                  <p className="text-xl">{user.location}</p>
                </div>
                <div className="flex items-center ">
                  <a href={`${user.blog}`}>
                    {user.blog}
                  </a>
                </div>
                <div>
                  <Link to={`/${user.login}`} className="btn btn-outline">
                    <BsGithub className="mr-2 text-lg" />
                    View Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
    </>
  );
};

export default HomePage;
