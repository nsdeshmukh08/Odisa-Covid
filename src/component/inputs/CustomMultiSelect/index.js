import React,{ useEffect,useState, Component } from 'react';

const getRandomClassName = () => `custom-multi-${Math.floor(Math.random() * 6) + 1  }-wrapper-${Math.floor(Math.random() * 6) + 1  }`

class CustomMultiSelect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search :'',
            isDropdownOpen: false,
            options: [],
            allvalues: [],
            isAllSelected: false,
            containerClass : getRandomClassName()
        }
    }
    componentDidMount() {
        this.init()
    }

    init = () => {
        this.addListener()
    }

    addListener = () => {

        window.addEventListener('click', (e) => {
            const { containerClass,isDropdownOpen } = this.state
            for (const select of document.querySelectorAll(`.${containerClass}`)) {
                if (!select.contains(e.target) && isDropdownOpen) {
                    this.setState({
                        isDropdownOpen : false
                    })
                }
            }
        });
    }
    toggledropdown = (e) => {
        e.preventDefault()
        this.setState({
            isDropdownOpen: !this.state.isDropdownOpen
        })
    }
    componentWillReceiveProps(nextProps, prevState) {
       if(nextProps.options != prevState.options || nextProps.value != prevState.value){
           this.setState({options: nextProps.options, allvalues: nextProps.value})
       }
    }
    onChangeSelectAll = (name) => {
        let {allvalues, options, isAllSelected} = this.state
        if(isAllSelected == false) {
            this.setState({isAllSelected: true}, () => this.props.onChange(name, [...options]))
        } else {
            allvalues = []
            this.setState({isAllSelected: false},  () => this.props.onChange(name, allvalues))
        }
       
    }
    onChange = (name, selectedValue) => {
        let {allvalues} = this.state
        let valueIndex = allvalues.findIndex(data => data.value === selectedValue.value)
        if(valueIndex > -1) {
            allvalues.splice(valueIndex,1)
        } else  {
            allvalues.push(selectedValue)
        }
        this.props.onChange(name, allvalues)
    }
    search = (e) => {
        let {search, options} = this.state
        search = e.target.value
        let filteredOptions = options.filter(op => op.label.toLowerCase().includes(search.toLowerCase()))
        this.setState({search: search})
    }
    render () {
        let {isDropdownOpen,containerClass, options, search, allvalues, isAllSelected} = this.state

        let alloptions = options.filter((data) => {
            if(search === ''){
                return data
            } else if(data.label.toLowerCase().includes(search.toLowerCase())) {
                return data
            }
        }).map(data => {
            return (
                <div className="list">
                    <div class="form-check d-flex">
                        <input 
                            type="checkbox" 
                            name={this.props.name}
                            id={data.value}
                            onChange={() => this.onChange(this.props.name, data)} 
                            class="form-check-input"
                            checked={allvalues.findIndex(val => val.value === data.value) > -1}
                        />
                        <label for={data.value} class="form-check-label">{data.label}</label>
                    </div>
                </div>
            )
        })
        let uniqueId = Math.floor(Math.random() * 6) + 1+'label'+Math.floor(Math.random() * 6)
    return ( 
        <div className={`${containerClass} containerClass`}>
            <div className="custom-multi-select">
                <div class="selectBox form-group " onClick={(e) => this.toggledropdown(e)}>
                    <div className="custom-select select-override">
                        <p className="text-black fw-600">{this.props.name} {this.props.value?.length > 1 ? `+ ${this.props.value.length} More..` : ''}</p>
                    </div>
                    {/* <select className="form-control custom-select">
                        <option>{this.props.name} {this.props.value.length} </option>
                    </select> */}
                    <div class="overSelect"></div>
                </div>
                {isDropdownOpen === true && <div className="multi_s_content">
                    <input 
                        type="text" 
                        placeholder={`Search`} 
                        className="searchbox"
                        value={this.state.search}
                        onChange={(e) => this.search(e)}
                    />
                    <div className="select-all-check">
                        <input 
                            type="checkbox" 
                            name="Select All"
                            onChange={() => this.onChangeSelectAll(this.props.name)} 
                            class="mr-2"
                            id={uniqueId}
                            checked={isAllSelected}
                        />
                        <label for={uniqueId} class="form-check-label">Select All</label>
                    </div>
                    <div className="list-container custom-scrollbar">
                        {
                            alloptions
                        }
                        
                    </div>
                </div>}
            </div>
        </div>
     );
}
}
 
export default CustomMultiSelect;
