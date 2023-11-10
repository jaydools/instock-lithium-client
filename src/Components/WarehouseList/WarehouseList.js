import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "../Grid/Grid";
import TitleSearch from "../TitleSearch/TitleSearch";
import "./WarehouseList.scss";
import WarehouseAdd from "../WarehouseAdd/WarehouseAdd";

function WarehouseList() {
    const [warehouses, setWarehouses] = useState([]);
    const [addingWarehouse, setAddingWarehouse] = useState(false);

    const toggleAddingWarehouse = () => setAddingWarehouse(!addingWarehouse);

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
        getWarehouses();
    }, []);

    return addingWarehouse ? (
        <WarehouseAdd handleBack={toggleAddingWarehouse} />
    ) : (
        <div className="warehouse-list">
            <TitleSearch
                title="Warehouses"
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
                onEdit={id => console.log(`edited ${id}`)}
                onDelete={id => console.log(`deleted ${id}`)}
            />
        </div>
    );
}

export default WarehouseList;
