import { useEffect, useState } from "react";
import axios from "axios";
import TitleSearch from "../TitleSearch/TitleSearch";
import Grid from "../Grid/Grid";
import "./InventoryList.scss";
import InventoryItemDelete from "../InventoryItemDelete/InventoryItemDelete";

function InventoryList() {
    const [items, setItems] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedInventoryID, setSelectedInventoryID] = useState(null);

    useEffect(() => {
        const getItems = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/inventories`,
            );
            setItems(data);
        };
        if (!showDeletePopup) {
            getItems();
        }
    }, [showDeletePopup]);

    const handleDeleteClick = id => {
        setSelectedInventoryID(id);
        setShowDeletePopup(true);
    };

    return (
        <div className="inventory-list">
            <TitleSearch
                pageTitle="Inventory"
                handleSearch={() => {}}
                buttonText="+ Add New Item"
                handleButton={() => {}}
            />
            <Grid
                fieldNames={["item_name", "category", "status", "quantity", "warehouse_name"]}
                displayNamesMobile={["Inventory Item", "Category", "Status", "QTY", "Warehouse"]}
                displayNamesDesktop={["Inventory Item", "Category", "Status", "QTY", "Warehouse"]}
                records={items}
                linkToDetailsPage={"/inventory"}
                onEdit={id => console.log(`edited ${id}`)}
                onDelete={handleDeleteClick}
            />

            {showDeletePopup && (
                <InventoryItemDelete
                    onClose={() => setShowDeletePopup(false)}
                    inventoryData={items.find(items => items.id === selectedInventoryID)}
                    endpoint={`${process.env.REACT_APP_BACKEND_URL}/api/inventories/${selectedInventoryID}`}
                />
            )}
        </div>
    );
}

export default InventoryList;
