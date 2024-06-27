import "./Table.css"

export default function Table({data, values, category, allCategories, search, updateFunction}){
    return(
        <table className="table" style={{paddingLeft: '20vw'}}>
        <thead className='thead'>
            <tr>
            {values.map((value) => (
                <th scope="col" key={value}>{value}</th>
            ))}
            </tr>
        </thead>
        <tbody className="table-group-divider">
            {data.map((item) => (
                ((category === allCategories || category === item.קטגוריה) &&
                    ((item.שם.includes(search)) || (item.כשרות?.includes(search)))) &&
            <tr style={{cursor: 'pointer'}} className="table-secondary" key={item.id} onClick={() => updateFunction(item)} title='עריכת מנה'>
                {values.map((value) => (
                <td id={item[value]}>{item[value]}</td>
                ))}
            </tr>   
            ))}
        </tbody>
    </table>
    )
}