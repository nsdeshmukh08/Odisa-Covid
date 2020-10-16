import React,{ useEffect,useState } from 'react';

const getRandomClassName = () => `custom-multi-select-wrapper-${Math.floor(Math.random() * 6) + 1  }`

const CustomSelect = (props) => {

    const [containerClass,setContainerClass] = useState(getRandomClassName())
    const [search,setSearch] = useState('')
    const [filteredOptions,setOptions]=useState([...props.options])
    useEffect(() => {

        for (const dropdown of document.querySelectorAll(`.${containerClass}`)) {
            dropdown.addEventListener('click', function() {
                console.log(this.querySelector('.custom-multi-select').classList,"myDa123")
                this.querySelector('.custom-multi-select').classList.add('show');
            })
        }

        window.addEventListener('click', function(e) {
            for (const select of document.querySelectorAll(`.custom-multi-select`)) {
                if (!select.contains(e.target)) {
                    select.classList.remove('show');
                }
            }
        });

    },[])

    const onChange = (name,selectedValue) => {
        let { value } = props
        let valueIndex = value.findIndex(data => data.value === selectedValue.value)
        if(valueIndex > -1)
            value.splice(valueIndex,1)
        else 
            value.push(selectedValue)
        props.onChange(name,value)
    }

    useEffect(() => {
        let newOptions = props.options.filter(data => data.label.toLowerCase().includes(search.toLowerCase()))
        setOptions([...newOptions])
    },[search])
    console.log(props)
    return ( 
        <div className={containerClass}>
            <div className="custom-multi-select">
                <div class="selectBox form-group ">
                    <select className="form-control custom-select" >
                        <option>{props.value.length} {props.label}</option>
                    </select>
                    <div class="overSelect"></div>
                </div>
                <div className="content">
                    <input 
                        type="text" 
                        placeholder={`Search and Select ${props.label}`} 
                        className="searchbox"
                        value={search}
                        onChange={({target}) => setSearch(target.value)}
                    />
                    <div className="list-container custom-scrollbar">
                        {
                            filteredOptions.map(data => (
                                <div className="list">
                                    <div class="form-check">
                                        <input 
                                            type="checkbox" 
                                            name={props.name}
                                            id={data.value}
                                            onChange={() => onChange(props.name,data)} 
                                            class="form-check-input"
                                            checked={props.value.find(val => val.value === data.value)}
                                        />
                                        <label for={data.value} class="form-check-label">{data.label}</label>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default CustomSelect;

CustomSelect.defaultProps={
    options : [],
    value:[],
    onChange: () => {},
    name : ''
}