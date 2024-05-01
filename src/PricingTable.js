import React from "react";
import { PRICING_LIST } from "./Constants";

const PricingTable = () => {
    return (
        <div className="pricing_table__container">
            <table className="pricing">
                {PRICING_LIST.map((service) => {
                    return <tr>
                        <th>{service.service}</th>
                        <td>${service.price}</td>
                        <td>{parseFloat(service.time) ? `${service.time} hrs`: service.time}</td>
                    </tr>
                })}
            </table>
        </div> 
    );
}

export default PricingTable;