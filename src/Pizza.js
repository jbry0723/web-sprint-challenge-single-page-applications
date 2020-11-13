import React, {useState,useEffect} from "react";
import { BrowserRouter as Router } from "react-router-dom"
import {Link,useRouteMatch,Route} from "react-router-dom"
import * as yup from 'yup'
import schema from "./validation/formSchema"
import axios from "axios"

const initialPizzaInfo={
    name:'',
    size:'',
    specialInstructions:'',
    pepperoni:false,
    mushrooms:false,
    greenPeppers:false,
    sausage:false,
}

const initialFormErrors={
    name:'',
}
const initialDisabled=true

function Pizza(props) {
    const [pizzaInfo, setPizzaInfo]=useState(initialPizzaInfo)
    const [formErrors, setFormErrors]=useState(initialFormErrors)
    const [disabled,setDisabled]=useState(initialDisabled)

    const onSubmit=evt=>{
        evt.preventDefault()
        const pizzaOrder={
            name:pizzaInfo.name.trim(),
            size:pizzaInfo.size.trim(),
            specialInstructions: pizzaInfo.specialInstructions.trim(),
            toppings:['pepperoni','mushrooms','greenPeppers','sausage'].filter((top)=>pizzaInfo[top])
        }
        axios.post('https://reqres.in/api/users',pizzaOrder)
            .then((res)=>{
                console.log(res.data)

            })
            .catch((err)=>{
                console.log(err)
            })
    }

    const validationCheck=(name, value)=>{
        if(name==='name'){
        yup.reach(schema,name)
            .validate(value)
            .then(()=>{
                setFormErrors({...formErrors, [name]:''
            })
        })
        .catch((err)=>{
            setFormErrors({
                ...formErrors,
                [name]:err.errors[0]
            })
        })
    
        setPizzaInfo({
            ...pizzaInfo,[name]:value
        })
    }
    else{
        setPizzaInfo({
            ...pizzaInfo,[name]:value
        })
    }
    }

    useEffect(()=>{
        schema.isValid(pizzaInfo).then(valid=>{
            setDisabled(!valid);

        })
    },[pizzaInfo])

    const onChange= evt => {
        const {name, value, type, checked}=evt.target;
        const correctValue=type==='checkbox'? checked: value;
        validationCheck (name,correctValue);

    }

    return (
        <div>
            <form className='pizzaForm'  onSubmit={onSubmit}>
                <label>
                    Name
                    <input
                    value={pizzaInfo.name}
                    onChange={onChange}
                    name='name'
                    type='text'
                    />
                </label>
                <label>Size
                    <select
                    value={pizzaInfo.size}
                    onChange={onChange}
                    name='size'
                    >
                        <option value=''>-Select Size-</option>
                        <option value='small'>8'</option>
                        <option value='medium'>10'</option>
                        <option value='large'>12'</option>
                    </select>
                </label>
                Toppings:
                <label>
                    Pepperoni
                    <input
                    type='checkbox'
                    name='pepperoni'
                    checked={pizzaInfo.pepperoni}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Mushrooms
                    <input
                    type='checkbox'
                    name='mushrooms'
                    checked={pizzaInfo.mushrooms}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Green Peppers
                    <input
                    type='checkbox'
                    name='greenPeppers'
                    checked={pizzaInfo.greenPeppers}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Sausage
                    <input
                    type='checkbox'
                    name='sausage'
                    checked={pizzaInfo.sausage}
                    onChange={onChange}
                    />
                </label>
                <label>
                    Special Instructions
                    <input
                    value={pizzaInfo.specialInstructions}
                    onChange={onChange}
                    name='specialInstructions'
                    type='text'
                    />

                </label>
                <button disabled={disabled} className='submitButton'>Submit</button>
            </form>

            <div>
                <div>{formErrors.name}</div>
            </div>
        
        </div>


    )
}

export default Pizza