import React from "react";
import "./Grid.scss";
import { Link } from "react-router-dom";
import editIcon from "../../Assets/Images/edit-24px.svg";
import deleteIcon from "../../Assets/Images/delete_outline-24px.svg";

function Grid({
    fieldNames,
    displayNamesMobile,
    displayNamesDesktop,
    records,
    linkToDetailsPage,
    onEdit,
    onDelete,
}) {
    return (
        <section className="grid">
            <div className="grid__headers">
                <ul className="grid__header-list">
                    {displayNamesDesktop.map((field, i) => (
                        <li key={i} className="grid__header">
                            {field}
                        </li>
                    ))}
                </ul>
                <p className="grid__header grid__header--actions">Actions</p>
            </div>
            <ul className="grid__rows">
                {records.map(record => (
                    <li key={record.id} className="grid__row">
                        <dl className="grid__fields">
                            {fieldNames.map((field, i, arr) => (
                                <div
                                    key={i}
                                    className={`grid__field ${
                                        i >= Math.floor(arr.length / 2) ? "grid__field--right" : ""
                                    }`}
                                >
                                    <dt className="grid__key">{displayNamesMobile[i]}</dt>
                                    {i === 0 ? (
                                        <dd className="grid__value">
                                            <Link
                                                className="grid__details-link"
                                                to={`${linkToDetailsPage}/${record.id}`}
                                            >
                                                {record[field]}
                                            </Link>
                                        </dd>
                                    ) : (
                                        <dd
                                            className={`grid__value ${
                                                field.toLowerCase() === "status"
                                                    ? record.status === "In Stock"
                                                        ? "grid__value--in-stock"
                                                        : "grid__value--out-of-stock"
                                                    : ""
                                            }`}
                                        >
                                            {record[field]}
                                        </dd>
                                    )}
                                </div>
                            ))}
                        </dl>
                        <div className="grid__buttons">
                            <button
                                type="button"
                                name="edit"
                                className="grid__button"
                                onClick={onDelete}
                            >
                                <img
                                    src={deleteIcon}
                                    alt="Icon of a pencil, indicating the edit button."
                                    className="grid__button-image"
                                />
                            </button>
                            <button
                                type="button"
                                name="delete"
                                className="grid__button"
                                onClick={onEdit}
                            >
                                <img
                                    src={editIcon}
                                    alt="Icon of a trash can, indicating the delete button."
                                    className="grid__button-image"
                                />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Grid;
