import React from "react";
import "./TitleSearch.scss";
import searchIcon from "../../Assets/Images/search-24px.svg";

function TitleSearch({ title, handleSearch, buttonText, handleButton }) {
    return (
        <div className="title-search">
            <h1 className="title-search__heading">Warehouses</h1>
            <search className="title-search__search">
                <form action="" className="title-search__form" onSubmit={handleSearch}>
                    <label className="title-search__label">
                        Search
                        <input
                            type="text"
                            name="search"
                            className="title-search__input"
                            placeholder="Search..."
                        />
                        <img
                            src={searchIcon}
                            className="title-search__icon"
                            alt="A magnifying glass icon, representing searching."
                        />
                    </label>
                </form>
            </search>
            <button className="title-search__button" type="button" onClick={handleButton}>
                {buttonText}
            </button>
        </div>
    );
}

export default TitleSearch;
