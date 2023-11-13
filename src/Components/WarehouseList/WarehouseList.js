import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../Grid/Grid";
import TitleSearch from "../TitleSearch/TitleSearch";
import WarehouseForm from "../WarehouseForm/WarehouseForm";
import WarehouseDelete from "../WarehouseDelete/WarehouseDelete";
import "./WarehouseList.scss";

function WarehouseList() {
    const [warehouses, setWarehouses] = useState([]);
    const [addingWarehouse, setAddingWarehouse] = useState(false);
    const [editingWarehouse, setEditingWarehouse] = useState(false);
    const [showDeletePopup, setShowDeletePopup] = useState(false);
    const [selectedWarehouseID, setSelectedWarehouseID] = useState(null);

    const toggleAddingWarehouse = () => setAddingWarehouse(!addingWarehouse);
    const toggleEditingWarehouse = warehouseId => {
        setSelectedWarehouseID(warehouseId ?? null);
        setEditingWarehouse(!editingWarehouse);
    };
    const handleDeleteClick = id => {
        setSelectedWarehouseID(id);
        setShowDeletePopup(true);
    };

    useEffect(() => {
        const getWarehouses = async () => {
            const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/warehouses`);
            setWarehouses(
                data.map(warehouse => ({
                    id: warehouse.id,
                    warehouse: warehouse.warehouse_name,
                    address: (
                        <>
                            {warehouse.address}
                            <br />
                            {warehouse.city}, {warehouse.country}
                        </>
                    ),
                    contact_name: warehouse.contact_name,
                    contact_info: (
                        <>
                            {warehouse.contact_phone}
                            <br />
                            {warehouse.contact_email}
                        </>
                    ),
                })),
            );
        };
        if (!showDeletePopup && !addingWarehouse && !editingWarehouse) {
            getWarehouses();
        }
    }, [showDeletePopup, addingWarehouse, editingWarehouse]);

    return addingWarehouse ? (
        <WarehouseForm handleBack={toggleAddingWarehouse} />
    ) : editingWarehouse && selectedWarehouseID ? (
        <WarehouseForm
            selectedWarehouseId={selectedWarehouseID}
            handleBack={toggleEditingWarehouse}
        />
    ) : (
        <div className="warehouse-list">
            <TitleSearch
                pageTitle="Warehouses"
                handleSearch={() => {}}
                buttonText="+ Add New Warehouse"
                handleButton={toggleAddingWarehouse}
            />
            <Grid
                fieldNames={["warehouse", "address", "contact_name", "contact_info"]}
                displayNamesMobile={["Warehouse", "Address", "Contact Name", "Contact Information"]}
                displayNamesDesktop={[
                    "Warehouse",
                    "Address",
                    "Contact Name",
                    "Contact Information",
                ]}
                records={warehouses}
                linkToDetailsPage={"/warehouses"}
                onEdit={toggleEditingWarehouse}
                onDelete={handleDeleteClick}
            />

            {showDeletePopup && (
                <WarehouseDelete
                    onClose={() => setShowDeletePopup(false)}
                    warehouseData={warehouses.find(
                        warehouse => warehouse.id === selectedWarehouseID,
                    )}
                />
            )}
        </div>
    );
}

export default WarehouseList;
