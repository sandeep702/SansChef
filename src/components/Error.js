import { LOGO_URL } from "../utils/constants";
 import { useRouteError } from "react-router-dom";
const Error =()=>{
    const err = useRouteError();
console.log(err);
    return (
<div className="error">
    <img src={LOGO_URL} alt="404 error"></img>
<h5>{err.status}:{err.statusText}</h5>
  <h5>{err.data}
    <h4>Sorry this page does not Exist</h4>
  </h5>
</div>
    );
};
export default Error ;