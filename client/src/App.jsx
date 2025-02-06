import { useState,useEffect } from "react"
import "./App.css"
export default function App (){
    const[tankStelle,setTankStelle]=useState([]);
    const[formData,setFormData]=useState("")
async function handleLoadData(){
    try{
        const response= await fetch(
            "https://geoportal.stadt-koeln.de/arcgis/rest/services/verkehr/gefahrgutstrecken/MapServer/0/query?where=objectid+is+not+null&text=&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=*&returnGeometry=true&returnTrueCurves=false&maxAllowableOffset=&geometryPrecision=&outSR=4326&havingClause=&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&gdbVersion=&historicMoment=&returnDistinctValues=false&resultOffset=&resultRecordCount=&returnExtentOnly=false&datumTransformation=&parameterValues=&rangeValues=&quantizationParameters=&featureEncoding=esriDefault&f=pjson"
             );
            
            if (!response.ok){
            console.error("Something is wrong");
        }
        else{
            const data = await response.json();
            setTankStelle(data.features);

        }

    }catch(err)
    {
        console.log("Something severe happened", err);
    }

}
async function fetchTankstelleData(tankStelle) {
    try{
        console.log(tankStelle)
        const responseTankstelle=await fetch('http://localhost:3000/tankstelle',{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
                     },        
            body: JSON.stringify({ data: tankStelle}),

        })
        if(responseTankstelle.ok){
           resultTankstelel = await responseTankstelle.josn()
console.log("c",resultTankstelel)
        }
    }catch(error){
        console.error("Error during login:", error);
    }
}
useEffect(() => {
    handleLoadData();
}, []); 
useEffect(() => {
    if (tankStelle.length > 0) { 
        fetchTankstelleData(tankStelle);
    }
}, [tankStelle]); 


 function toggleStreetSortA(){
 const newArrayTankStelle = [...tankStelle].sort((a, b) => 
    a.attributes.adresse.localeCompare(b.attributes.adresse)
  );

  setTankStelle(newArrayTankStelle);  
 }
 function toggleStreetSortZ(){
    
     const newArrayTankStelle = [...tankStelle].sort((a, b) => 
        b.attributes.adresse.localeCompare(a.attributes.adresse)// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
      );
    
      setTankStelle(newArrayTankStelle);  
     }
 const handleInputChange=(event)=>{
   const {name,value} =event.target
  setFormData({[name]:value})
}
const handleSubmit =(event)=>{
    event.preventDefault();
const searchStreet = tankStelle.filter((item)=>item.attributes.adresse.toLowerCase().includes(formData.street.toLowerCase()))
setTankStelle(searchStreet)
}


    return(
        <>
        <div className="home-container">
        <h1>Tankstellen in Köln</h1>
<button onClick={toggleStreetSortA}>Straßenname aufsteigend</button>
<button onClick={toggleStreetSortZ}>Straßenname absteigend</button>
<form onSubmit={handleSubmit}><label for="street">Straße suchen:</label><input type="text" name="street" value={formData.street} onChange={handleInputChange}></input><button type="submit">suchen</button></form>
{tankStelle?(tankStelle.map((item)=><li key={item.attributes.objectid}><strong>Adresse:</strong><span>{item.attributes.adresse}</span><strong>Koordinaten:</strong>{item.geometry.x.toFixed(3)},{item.geometry.y.toFixed(3)}</li>)) :(            <p className="no-data">No weather data available</p>
)};
</div></>
        
    )

}