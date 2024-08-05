export default function Input ({type, value, onChange, placeholder, id, required, className, minValue}){
    return(
        <div className="px-3 py-3">
            <input 
                id={id}
                type={type} 
                className={className? className : "form-control"}
                value={value} 
                // onChange={(e) => e.target.value > minValue ? onChange(e.target.value): onChange(minValue)}
                onChange={(e) => {
                    if(minValue != undefined) {
                        e.target.value > minValue ? onChange(e.target.value): onChange(minValue)
                    } 
                    else {
                        onChange(e.target.value)
                    }
                }}

                placeholder={placeholder}
                required={required}
            />
        </div>
    )
}