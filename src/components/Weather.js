import Header from "./Header"
import Body from "./Body"
import {React,useState} from "react";
export default function Weather(){
    const [searchvalue,setsearchvalue] = useState("");
    const handleSearch = (value)=>{
        setsearchvalue(value);
    }
    return(
        <div>
            <Header onSearch={handleSearch}/>
            <Body city={searchvalue}/>
        </div>
    )
}