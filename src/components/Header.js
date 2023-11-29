import "../styles/header.css";
function Header({onSearch}){
   const handleinput =(event)=>{
     const value=event.target.value;
      onSearch(value);
   }

   return(
    <div className="header">
        <div className="item1"><h1>Weather</h1></div>
        <div className="search">
           <div><input type = "text" name="search" id = "search" placeholder="🔍 Search City"  onChange={handleinput}></input></div>
           {/* <div><input type = "submit" value="search"></input></div> */}
        </div>
    </div>
   )
}
   export default Header;