import React from "react";
import { BrowserRouter as Router } from "react-router-dom"
import {Link,useRouteMatch,Route} from "react-router-dom"
import Form from "./Form"
import Pizza from "./Pizza"

const App = () => {
  return (
    <div>
      <h1>Lambda Eats</h1>
      <p>You can remove this code and create your own header</p>
      <Route exact path="/"><Homepage/></Route>
      <Route exact path="/form"><Form/></Route>
      <Route exact path="/form/pizza"><Pizza/></Route>
      
    </div>
  );
};
export default App;

function Homepage(props) {
return(
  <div>
    Homepage
    <Link to={`/form`}><button>To form</button></Link>
  </div>
)

}
