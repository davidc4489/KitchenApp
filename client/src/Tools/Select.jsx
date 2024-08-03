export default function Select ({id, value, onChange, optionValue, title, optionsToMap, valueToMap, valueToDisplay = valueToMap}){
    return(
        <div className="px-3 py-3">
            <select 
                className="form-select mb-3" 
                id={id} 
                value={value} 
                onChange={(e) => {onChange(e.target.value)}}
            >
                <option value={optionValue}>{title}</option>
                {optionsToMap?.map((option) => (
                    <option
                        key={valueToMap ? option[valueToMap] : option}
                        value={valueToMap ? option[valueToMap] : option}
                    >
                        {valueToMap ? option[valueToDisplay] : option}
                    </option>
                ))}
            </select>
        </div>
    )
}

