import React from "react";
import { BrowserRouter as Router } from "react-router-dom"
import {Link,useRouteMatch,Route} from "react-router-dom"

function Form(props) {
    return (
        <div>
        <form>
        <Link to={"/form/pizza"}><button>Pizza</button></Link>
        </form>
        </div>
    )

}

export default Form