export default function Dropdown ({title, keyAll, allValue, setter, data}){
    return(
        <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle='dropdown'>{title}
        <span className="caret"></span></button>
        <ul className="dropdown-menu">
            <li key={keyAll} className="dropdown-item" onClick={() => setter(allValue)}>
                כל המנות 
            </li> 
            {data?.map((item) => (
                <li key={item.id} className="dropdown-item" onClick={() => setter(item.שם)}>
                    {item.שם}
                </li> 
            ))}
        </ul>
        </div>
    )
}