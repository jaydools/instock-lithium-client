import { useEffect, useState } from "react";
import "./InventoryItemDetails.scss";
import axios from "axios";

function InventoryItemDetails({ id }) {
    const [item, setItem] = useState({});

    useEffect(() => {
        async function getItem() {
            const { data } = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/api/inventories/${id}`,
            );
            console.log(data); /* delete later */
            setItem(data);
        }
        getItem();
    }, [id]);

    return (
        <>
            {item.description ? (
                <div className="item-details-container">
                    <div className="leftside">
                        <h4 className="item-details-container__title">ITEM DESCRIPTION:</h4>
                        <p className="item-details-container__body">{item.description}</p>
                        <h4 className="item-details-container__title">CATEGORY:</h4>
                        <p className="item-details-container__body">{item.category}</p>
                    </div>

                    <div className="test">
                        <div className="rightside">
                            <div className="rightside__status">
                                <h4 className="item-details-container__title">STATUS:</h4>
                                <p className="item-details-container__body">{item.status}</p>
                            </div>

                            <div className="rightside__quantity">
                                <h4 className="item-details-container__title">QUANTITY:</h4>
                                <p className="item-details-container__body"> {item.quantity} </p>
                            </div>
                        </div>
                        <div className="rightside__warehouse">
                            <h4 className="item-details-container__title">WAREHOUSE:</h4>
                            <p className="item-details-container__body">** Manhattan **</p>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Item not found</div>
            )}
        </>
    );
}

export default InventoryItemDetails;
