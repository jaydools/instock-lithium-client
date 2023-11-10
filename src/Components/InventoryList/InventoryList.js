import { useEffect, useState } from "react";
import axios from "axios";
import TitleSearch from "../TitleSearch/TitleSearch";
import Grid from "../Grid/Grid";
import "./InventoryList.scss";

function InventoryList() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/inventories`,
            );
            console.log(data);
            setItems(data);
        };
        getItems();
    }, []);

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
                onDelete={id => console.log(`deleted ${id}`)}
            />

            {/* {showDeletePopup && (
                <WarehouseDelete
                    onClose={() => setShowDeletePopup(false)}
                    warehouseData={warehouses.find(
                        warehouse => warehouse.id === selectedWarehouseID,
                    )}
                />
            )} */}
        </div>
    );
}

export default InventoryList;
