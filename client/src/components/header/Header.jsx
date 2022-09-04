import "./header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faClose } from '@fortawesome/free-solid-svg-icons'
import React, { useRef, useState } from "react";

export default function Header({ fetchPosts }) {
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
    fetchPosts(searchValue)
    setIsActive(current => !current);
  }



  return (
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
  );
}
