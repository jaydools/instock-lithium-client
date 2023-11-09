import React from "react";
import "./Title.scss";
import back from "../../Assets/Images/arrow_back-24px.svg";
import { ReactComponent as Edit } from "../../Assets/Images/edit-24px.svg";
import { Link } from "react-router-dom";

function Title({ pageTitle, edit, backUrl }) {
    return (
        <div>
            <div className="title">
                <div className="title__left">
                    {backUrl && (
                        <>
                            <Link to={backUrl} className="title__link">
                                <button className="title__back">
                                    <img src={back} alt="back button" />
                                </button>
                            </Link>
                        </>
                    )}
                    <h1 className="title__header">{pageTitle}</h1>
                </div>
                <div>
                    <Link to="/inventory-item-edit">
                        <button className="title__right">
                            <Edit className="title__edit" />
                            <p className="title__right--hidden">{edit}</p>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Title;
