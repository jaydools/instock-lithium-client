import { useEffect, useState } from "react";
import axios from "axios";
import TitleSearch from "../TitleSearch/TitleSearch";
import Grid from "../Grid/Grid";
import InventoryItemForm from "../InventoryItemForm/InventoryItemForm";
import InventoryItemDelete from "../InventoryItemDelete/InventoryItemDelete";
import "./InventoryList.scss";

function InventoryList() {
    const [items, setItems] = useState([]);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedInventoryID, setSelectedInventoryID] = useState(null);
    const [editingItem, setEditingItem] = useState(false);

    const toggleEditingItem = itemId => {
        setSelectedInventoryID(itemId ? itemId : null);
        setEditingItem(!editingItem);
    };

    const handleDeleteClick = id => {
        setSelectedInventoryID(id);
        setShowDeletePopup(true);
    };

    useEffect(() => {
        const getItems = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/inventories`,
            );
            setItems(data);
        };
        if (!showDeletePopup && !editingItem) {
            getItems();
        }
    }, [showDeletePopup, editingItem]);

    return (
        <div className="inventory-list">
            {editingItem ? (
                <InventoryItemForm
                    handleBack={toggleEditingItem}
                    selectedInventoryID={selectedInventoryID}
                />
            ) : (
                <>
                    <TitleSearch
                        pageTitle="Inventory"
                        handleSearch={() => {}}
                        buttonText="+ Add New Item"
                        handleButton={() => {}}
                    />
                    <Grid
                        fieldNames={[
                            "item_name",
                            "category",
                            "status",
                            "quantity",
                            "warehouse_name",
                        ]}
                        displayNamesMobile={[
                            "Inventory Item",
                            "Category",
                            "Status",
                            "QTY",
                            "Warehouse",
                        ]}
                        displayNamesDesktop={[
                            "Inventory Item",
                            "Category",
                            "Status",
                            "QTY",
                            "Warehouse",
                        ]}
                        records={items}
                        linkToDetailsPage={"/inventory"}
                        onEdit={toggleEditingItem}
                        onDelete={handleDeleteClick}
                    />
                </>
            )}

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
