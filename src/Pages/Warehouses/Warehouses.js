import { useParams } from "react-router-dom";
import "./Warehouses.scss";
import InventoryItemDetails from "../../Components/InventoryItemDetails/InventoryItemDetails";
import Title from "../../Components/Title/Title";

function Warehouses() {
    const { id } = useParams();
    return (
        <div>
            {/* INSERT YOUR COMPONENT HERE TO PREVIEW */}
            <Title
                pageTitle="Invetory Details"
                edit="Edit"
                backUrl="/inventory"
                handleEdit={() => {}}
            />
            {id !== undefined && <InventoryItemDetails id={id} />}
        </div>
    );
}

export default Warehouses;
