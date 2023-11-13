import React from "react";
import "./Title.scss";
import back from "../../Assets/Images/arrow_back-24px.svg";
import { ReactComponent as Edit } from "../../Assets/Images/edit-24px.svg";
import { Link } from "react-router-dom";

function Title({ pageTitle, edit, handleBack, handleEdit }) {
    return (
        <div className="title">
            <div className="title__left">
                {handleBack && (
                    <>
                        <button className="title__back" type="button" onClick={handleBack}>
                            <img src={back} alt="back button" />
                        </button>
                    </>
                )}
                <h1 className="title__header">{pageTitle}</h1>
            </div>
            <div>
                {handleEdit && (
                    <button className="title__right" type="button" onClick={handleEdit}>
                        <Edit className="title__edit" />
                        <p className="title__right--hidden">{edit}</p>
                    </button>
                )}
            </div>
        </div>
    );
}

export default Title;
