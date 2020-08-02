import React from 'react';

function StoreFront(props) {
    return (
        <div>
            <form onSubmit={(event) => {
                event.preventDefault()
                props.addItem(
                    props.data.itemId,
                    props.data.itemName,
                    props.data.itemValue
                )
            }}>
                <input 
                    name="itemId"
                    type="text"
                    placeholder="new item's ID"
                    value={props.data.itemId}
                    onChange={props.handleChange}
                    required
                />
                <br></br>
                <input 
                    name="itemName"
                    type="text"
                    placeholder="new item's name"
                    value={props.data.itemName}
                    onChange={props.handleChange}
                    required
                />
                <br></br>
                <input 
                    name="itemValue"
                    type="text"
                    placeholder="new item's value"
                    value={props.data.itemValue}
                    onChange={props.handleChange}
                    required
                />
                <br></br>

                <button>Submit</button>
            </form>
            <p>
                item id: {props.data.itemId} <br></br>
                item name: {props.data.itemName} <br></br>
                item value: {props.data.itemValue} <br></br>
            </p>
        </div>
    )
    
}

export default StoreFront