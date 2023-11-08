import React from "react";
import "./InventoryItemDetails.scss";

function InventoryItemDetails() {
    return (
        <div className="item-details-container">
            <div className="leftside">
                <h4 className="item-details-container__title">ITEM DESCRIPTION:</h4>
                <p className="item-details-container__body">
                    ** This 50", 4K LED TV provides a crystal-clear picture and vivid colors.**
                </p>
                <h4 className="item-details-container__title">CATEGORY:</h4>
                <p className="item-details-container__body">** Electronics ** </p>
            </div>

            <div className="rightside">
                <div className="rightside__status">
                    <h4 className="item-details-container__title">STATUS:</h4>
                    <p className="item-details-container__body"> IN STOCK PLACEHOLDER </p>
                </div>

                <div className="rightside__quantity">
                    <h4 className="item-details-container__title">QUANTITY:</h4>
                    <p className="item-details-container__body"> **500** </p>
                </div>
            </div>
            <div className="rightside__warehouse">
                <h4 className="item-details-container__title">WAREHOUSE:</h4>
                <p className="item-details-container__body">** Manhattan **</p>
            </div>
        </div>
    );
}

export default InventoryItemDetails;
