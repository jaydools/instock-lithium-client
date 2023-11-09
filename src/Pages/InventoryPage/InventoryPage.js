import React from "react";
import "./InventoryPage.scss";
import InventoryItemDelete from "../../Components/InventoryItemDelete/InventoryItemDelete";

function InventoryPage() {
    return (
        <div className="popup">
            <InventoryItemDelete />
        </div>
    );
}

export default InventoryPage;
