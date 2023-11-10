import React from "react";
import "./WarehouseDelete.scss";
import close from "../../Assets/Images/close-24px.svg";
import axios from "axios";
const baseURL = "http://localhost:8080/api/";

function WarehouseDelete({ warehouseData, onClose }) {
    const handleDelete = async () => {
        try {
            let res = await axios.delete(`${baseURL}warehouses/${warehouseData.id}`);
        } catch (err) {
            console.error("unknown error... ready to explode", err);
        }

        onClose();
    };

    return (
        <div className="outmost">
            <div className="delete-container">
                <div className="close">
                    <div className="close__link">
                        <button className="close__button" onClick={onClose}>
                            <img className="close__img" src={close} alt="Close" />
                        </button>
                    </div>
                </div>
                <div className="main">
                    <div className="delete-item">
                        <h1 className="delete-item__title">
                            Delete {warehouseData.warehouse} warehouse?
                        </h1>
                        <p className="delete-item__body">
                            Please confirm that you’d like to delete the {warehouseData.warehouse}
                            from the list of warehouses. You won’t be able to undo this action.
                        </p>
                    </div>
                    <div className="delete-button">
                        <div className="delete-button__link">
                            <button className="delete-button__cancel" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                        <div className="delete-button__link">
                            <button className="delete-button__delete" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WarehouseDelete;
