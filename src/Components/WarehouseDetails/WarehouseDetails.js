import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

function WarehouseDetails({ warehouseId }) {
    const [warehouseFromId, setWarehouseFromId] = useState({});
    const [warehouseIdInventory, setWarehouseIdInventory] = useState([]);

    useEffect(() => {
        const fetchWarehouseId = async warehouseId => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${warehouseId}`,
                );
                console.log(response);
                setWarehouseFromId(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        const fetchWarehouseIdInventories = async warehouseId => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${warehouseId}/inventories`,
                );
                console.log(response);
                setWarehouseIdInventory(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchWarehouseId(warehouseId || 1);
        fetchWarehouseIdInventories(warehouseId);
    }, [warehouseId]);
    return (
        <>
            {warehouseFromId && warehouseIdInventory ? (
                <>
                    <div>title</div>
                    <h3>{warehouseFromId.warehouse_name}</h3>
                </>
            ) : (
                <p>"loading details..."</p>
            )}
        </>
    );
}

export default WarehouseDetails;
