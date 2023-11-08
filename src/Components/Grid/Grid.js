import React from "react";
import "./Grid.scss";
import { Link } from "react-router-dom";
import editIcon from "../../Assets/Images/edit-24px.svg";
import deleteIcon from "../../Assets/Images/delete_outline-24px.svg";

function Grid({ fieldNames, records, linkToDetailsPage, onEdit, onDelete }) {
    return (
        <section className="grid">
            <ul className="grid__headers">
                {fieldNames.map((field, i) => (
                    <li key={i} className="grid__header">
                        {field}
                    </li>
                ))}
            </ul>
            <ul className="grid__rows">
                {records.map(record => (
                    <li key={record.id} className="grid__row">
                        <dl className="grid__fields">
                            {fieldNames.map((field, i) => (
                                <div className="grid__field">
                                    <dt className="grid__key">{field}</dt>
                                    {i === 0 ? (
                                        <dd className="grid__value">
                                            <Link
                                                className="grid__details-link"
                                                to={linkToDetailsPage}
                                            >
                                                {record[field]}
                                            </Link>
                                        </dd>
                                    ) : (
                                        <dd className="grid__value">{record[field]}</dd>
                                    )}
                                </div>
                            ))}
                        </dl>
                        <div className="grid__buttons">
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
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default Grid;
