import React from "react";

function InventoryList({ id }) {
    const [warehouseIdInventory, setWarehouseIdInventory] = useState([]);

    useEffect(() => {
        const fetchWarehouseIdInventories = async id => {
            try {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/api/warehouses/${id}/inventories`,
                );
                console.log(response);
                setWarehouseIdInventory(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchWarehouseIdInventories(id);
    }, [id]);
    return (
        <>
            {warehouseIdInventory ? (
                <>
                    <div>title</div>
                    <h3>{warehouseIdInventory.item_name}</h3>
                </>
            ) : (
                <p>"loading inventory..."</p>
            )}
        </>
    );
}
export default InventoryList;
