import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Sidebar from "../../components/sidebar/Sidebar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useState, useEffect } from "react";
import "../../components/header/header.css"
import "./home.css";
import axios from "axios";
import { useLocation } from "react-router";


export default function Home() {
  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const [isActive, setIsActive] = useState(false);
  const [searchValue, setSearchvalue] = useState(null);

  function SearchClicked() {
    setIsActive(current => !current);
    console.log(searchValue)
    console.log("Clicked the search")
  }

  function getInputValue(val) {
    setSearchvalue(val.target.value)
    console.log("input value" + searchValue)
  }

  function SearchButtonClicked() {
    console.log("Fetching the queried posts");
    fetchQueriedPosts(searchValue)
    setIsActive(current => !current);
  }

  useEffect(() => {
    const fetchAllPosts = async () => {
      console.log("No query")
      const res = await axios.get(
        "/posts"
      );
      console.log(res.data)
      setPosts(res.data);
    };
    fetchAllPosts()
  }, [])


  const fetchQueriedPosts = async (query) => {
    console.log("No query")
    const res = await axios.get(
      "/posts", {
      params: {
        query: query
      },
    }
    );
    console.log(res.data)
    setPosts(res.data);
  }

  return (
    <>
      {/* HEADER */}
      <div className="all-headers" >
        {/* Hidden search bar */}
        <div className="hidden-search" style={{
          display: isActive ? 'block' : 'none',
        }}>
          <FontAwesomeIcon icon={faClose} size="2x" className="close-faIcon"
            onClick={() => SearchClicked()}></FontAwesomeIcon>
          <div className="hidden-searchbar">
            <FontAwesomeIcon icon={faSearch} size="2x" onClick={() => SearchButtonClicked()}
              className="search-faIcon"></FontAwesomeIcon>
            <input type="text" placeholder="Find a reciepe" className="hidden-search-input"
              onChange={getInputValue}
            />
          </div>
        </div>
        {/* Normal header */}
        <div className="header">
          <div className="header-search-bar" onClick={() => SearchClicked()}>
            <FontAwesomeIcon icon={faSearch} size="2x" className="search-faIcon"></FontAwesomeIcon>
          </div>
        </div>
      </div>
      {/* HOME */}
      <div className="home" >
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}

