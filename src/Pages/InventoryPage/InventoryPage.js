import React from "react";
import { useParams } from "react-router-dom";
import InventoryItemDetails from "../../Components/InventoryItemDetails/InventoryItemDetails";
import "./InventoryPage.scss";
import InventoryList from "../../Components/InventoryList/InventoryList";
import InventoryItemDelete from "../../Components/InventoryItemDelete/InventoryItemDelete";

function InventoryPage() {
    const { id } = useParams();
    return (
        <main className="inventory">
            {id !== undefined ? <InventoryItemDetails id={id} /> : <InventoryList />}
        </main>
    );
}

export default InventoryPage;
