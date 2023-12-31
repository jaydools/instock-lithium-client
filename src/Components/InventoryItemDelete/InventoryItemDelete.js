import React from "react";
import "./InventoryItemDelete.scss";
import close from "../../Assets/Images/close-24px.svg";
import axios from "axios";

function InventoryItemDelete({ inventoryData, onClose, endpoint }) {
    const handleDelete = async () => {
        try {
            let res = await axios.delete(endpoint);
            if (res.status === 204) {
                window.location.reload();
            }
        } catch (err) {
            console.error("unknown error... initiate self destroy", err);
        }
        onClose();
    };

    return (
        <div className="outmost">
            <div className="delete-container">
                <div className="close">
                    <div to="/inventory-list" className="close__link">
                        <button className="close__button" onClick={onClose}>
                            <img className="close__img" src={close} alt="Close" />
                        </button>
                    </div>
                </div>
                <div className="main">
                    <div className="delete-item">
                        <h1 className="delete-item__title">
                            Delete {inventoryData.item_name} item?
                        </h1>
                        <p className="delete-item__body">
                            Please confirm that you’d like to delete {inventoryData.item_name} from
                            the inventory list. You won’t be able to undo this action.
                        </p>
                    </div>
                    <div className="inv-delete-button">
                        <div to="/inventory-list" className="inv-delete-button__link">
                            <button className="inv-delete-button__cancel" onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                        <div to="/inventory-list" className="inv-delete-button__link">
                            <button className="inv-delete-button__delete" onClick={handleDelete}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryItemDelete;
