import React from 'react';
import "./Table.css"

export default function Table({data, values, category, allCategories, search, updateFunction, title}){
    return(
        <div className="table-container">
            <table className="table" style={{paddingLeft: '20vw'}}>
                <thead className='thead'>
                    <tr>
                        {values.map((value) => (
                            <th scope="col" key={value}>{value}</th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {data.map((item, index) => (
                        ((category === allCategories || category === item.קטגוריה) &&
                            ((item.שם.includes(search)) || (item.כשרות?.includes(search)))) &&
                    <tr 
                        style={{cursor: 'pointer'}} 
                        className={index % 2 === 0 ? 'even-row' : 'odd-row'} 
                        key={item.id}
                        // Allows you not to open the updateSupplier window if you click on the email address
                        onClick={(e) => {
                            if (!e.target.closest('a')) {
                                updateFunction(item);
                            }
                        }}  
                        title={title}
                    >
                        {values.map((value) => (
                        <td key={value} id={item[value]} className={value === 'כמות' && item.כמות < item.כמות_מינימלית ? 'text-red' : ''}>
                            {value === 'מייל' ? (
                                // Allows you to open the email sending program if you click on the email address
                                <a href={`mailto:${item[value]}`} onClick={(e) => e.stopPropagation()}>
                                    {item[value]}
                                </a>
                            ) : (
                                item[value]
                            )}
                        </td>
                        ))}
                    </tr>   
                    ))}
                </tbody>
            </table>
        </div>
    )
}