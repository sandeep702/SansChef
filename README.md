// import React from "react";
// import ReactDOM from "react-dom/client";
// //const heading=React.createElement("h1",{id:"heading"},"Sandeep kmbz");
// //React Element
// const heading=(
// <div>
//     <h1 id="heading" className="head" indexTab="1">
//      this is sandeep kmbz 
//      </h1>
// </div>
// );
// //normal function in the functional component 
// const Heading1=function()
// {
//     return(
//     <h1 className="heading">this is also me </h1>
// )} ;
// //functional component //component compositon is also done below //means composing the component one another 
// const Heading=()=>(
//     <div>
//         <h1 id="heading" className="head" indexTab="1">
//          this is sandeep kmbz 
//          </h1>
//     </div>
//     );
// //React component
// //class component // old way of wriiting code 
// //functional components //new way of writting code
// //without return we can write the functional component like 
// //best practice 
// const HeadingComponent=()=>(
// <div id="conatiner">
//     <Heading/>
//     <Heading1/>
//     <h1 className="heading">this is me</h1>
//     </div>
// );
// // 2.
// // const HeadingComponent1 =()=>{
// //     return <h1 className="heading">this is sandeep kmbz</h1>;
// // };
// const root =ReactDOM.createRoot(document.getElementById("root"));
// //root.render(heading);//render element 
// root.render(<HeadingComponent/>)//render functional component bable translate this 



import React from "react";
import ReactDOM from "react-dom/client"

//react element 
const heading=(
<div>
    <h1 className="heading" id="newid">
        this is the new react element </h1>
        </div>
        );//jsx 
// functional component 
const HeadingComponent=()=>(
<h1></h1>
);
//normal function 
const HeadingComponent1= function(){
    return
(
<div>
    <h1 className="heading" id="newid">this is sandeep </h1>
</div>
)
};
const value=10;
// component composition 
const NewHeading=(
    <>
   
     {value}
     <h1 className="heading ">{console.log("from fatehabad")}this is also sandeep </h1>
     <HeadingComponent/>
    <HeadingComponent1/>
    </>
   

)
const heading1=ReactDOM.createRoot(document .getElementById("root"));
root.render(<NewHeading/>)

two types of export/import 
1. default export/import
2. named export/import
//default export/import

export default Component;
import Component from "path";

named export /import 

export const Component 
import {Component} from "path";
 
...
# React hooks
(normal javascript utility function --fb developer ) 
 two types of hook in the js 

 1 useState hook  import { useState } from "react"; /// this is the named import thats why it is in the { brackets}
 - superpowerful state in react
 
 2 useEffect hook 
