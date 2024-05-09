import React from "react";
import { PRICING_LIST } from "./Constants";

const PricingTable = () => {
    return (
        <div className="pricing_table__container">
            <table className="pricing">
                <tbody>
                    {PRICING_LIST.map((service) => {
                        return <tr key={service.service}>
                            <th>{service.service}</th>
                            <td>{parseInt(service.price) ? `$${service.price}` : service.price}</td>
                            <td>{parseFloat(service.time) ? `${service.time} hrs`: service.time}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div> 
    );
}

export default PricingTable;