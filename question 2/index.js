const urlCafes =
  "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json";
const urlPlaces =
  "https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json";

// get the table body element
let tableBody=document.getElementById("tableBody")
// Create an ajax get request for the cafes api
const xhr = new XMLHttpRequest();
xhr.open("GET", urlCafes, true);
xhr.onload = function () {
  // chech the status if the status is ok 
  if (this.status === 200) {
    // parse the response data into array of objects
    let json = JSON.parse(this.responseText);
    let cafes = json.cafes;
    // Create an ajax request for the pplaces api
    xhr.open("GET", urlPlaces, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let json = JSON.parse(this.responseText);
        let places = json.places;
        let cafesHtml = "";
        //for all the cafes match the place id and create a object conatining name and address of cafes
        cafes.forEach(function (element, index) {
            let cafeName = element.name;
            let cafeId = element.location_id;
            let obj = places.find((element) => element.id == cafeId);
              obj = { name: cafeName, ...obj };
           // creating a table row
          let cafes = `  <tr class="tablerow">
                     <td class="column1">${index+1}</td>
                     <td class="column2 name">${obj.name}</td>
                     <td class="column3">${obj.street_no}  ${obj.locality}</td>
                     <td class="column4">${obj.postal_code}</td>
                     <td class="column5">${obj.lat}</td>
                     <td class="column6">${obj.long}</td>
                   </tr>`;
          cafesHtml += cafes;
        });
        //putting all the tables rows inside the table in html doc
        tableBody.innerHTML=cafesHtml
        // creating search fucntion for the cafes 
       let substring=document.getElementById("searchTxt");
       substring.addEventListener("input",()=>{
        let value=substring.value.toLowerCase();
        let tableRows=document.getElementsByClassName("tablerow");
        // iterating through the html collection of table rows
        Array.from(tableRows).forEach(function(element){
            let rowName=element.getElementsByClassName("name")[0].outerText;
            rowName=rowName.toLowerCase();
            if(rowName.includes(value)){
                element.style.display='';
    
            }
            else{
                element.style.display='none';
    
            }
        })     
       })
      } else {
        console.log("Some error occured");
      }
    };
    xhr.send();
  } else {
    console.log("Some error occured");
  }
};
xhr.send();
