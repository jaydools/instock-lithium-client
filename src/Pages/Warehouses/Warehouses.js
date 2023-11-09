import { useParams } from "react-router-dom";
import "./Warehouses.scss";
import InventoryItemDetails from "../../Components/InventoryItemDetails/InventoryItemDetails";
import Title from "../../Components/Title/Title";
import WarehouseList from "../../Components/WarehouseList/WarehouseList";

function Warehouses() {
    const { id } = useParams();
    return (
        <div>
            <Title
                pageTitle="Invetory Details"
                edit="Edit"
                backUrl="/inventory"
                handleEdit={() => {}}
            />
            {id !== undefined && <InventoryItemDetails id={id} />}
        </div>
    );
    return (
        <main class="warehouses">
            <WarehouseList />
        </main>
    );
}

export default Warehouses;
