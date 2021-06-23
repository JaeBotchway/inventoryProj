
//parses the string of array to local storage at start when array is empty or null
let start = () => {
    if (localStorage.getItem(0) == null || JSON.parse(localStorage.getItem(0)).length == 0) {
        console.log("setting")
        const newArray = [
            { product: "Jack", description: "hahah", category: "Earrings", quantity: 40 }
        ]
        localStorage.setItem(0, JSON.stringify(newArray))
    }
}
    start()

    //another method to delete items in table
    //when using this method do this <a onclick = deleteBin()><i id="remove${i}" class="fas fa-trash-alt"></i><a>
// const deleteBin = (index) =>{
//     let itemsInStorage = JSON.parse(localStorage.getItem(0));
//     itemsInStorage.splice(index, 1);
//     localStorage.setItem(0, JSON.stringify(itemsInStorage));

// }


//get or calls arrays in local storage and stores in variable arrayData
let arrayData = localStorage.getItem(0)
arrayData = JSON.parse(arrayData)
console.log(arrayData)


//this array is get total quantity in stock and display value
let totalQuantity=0;

for (let j =0; j<arrayData.length; j++){
    arrayData[j].quantity
    totalQuantity += Number(arrayData[j].quantity);
}


// console.log(totalQuantity);
document.getElementById("total-stock").innerText = totalQuantity;



// function that creates and displays table and populates it with data from local storage arrayData
let displayTable = (table) => {
    let newDisplay = document.getElementById('tableDetails')
    console.log(newDisplay)

    for (var i = 0; i < table.length; i++) {

        const row = document.createElement('tr')
        row.className = 'tablerow'
        row.innerHTML = `<tr>
                    <td>${table[i].product}</td>
                    <td>${table[i].description}</td>
                    <td>${table[i].category}</td>
                    <td>${table[i].quantity}</td>
                    <td class ="stock"></td>
                    <td>
                     <i id="update${i}"  class="far fa-edit"></i>
                     <i id="remove${i}" class="fas fa-trash-alt"></i>
                    </td> 
                    </tr>`
        newDisplay.append(row)

    }
}

displayTable(arrayData)


// checks for the quantity amount enetered and uses that to call the css function created
let stockAvailable = document.getElementsByClassName('stock')
for (let x = 0; x < arrayData.length; x++) {

    if (arrayData[x].quantity == 0) {
        stockAvailable[x].classList.add('red')
    }
    else if (arrayData[x].quantity > 1 && arrayData[x].quantity < 20) {
        stockAvailable[x].classList.add('orange')
    }
    else { stockAvailable[x].classList.add('green') }


}


// this function calls the edit modal
const update = document.querySelectorAll(".far")
console.log(update)
update.forEach(line =>{
    line.addEventListener("click", (e) =>{

       let value = e.target.getAttribute("id")
        console.log(value)

        let updated = document.getElementById("add-modal")
        updated.classList.add("visible")
        console.log(updated.classList)
         let index = parseInt(value.split("update")[1]);
         console.log( index)

         let addModalbtn = document.getElementById('modalAdd')
         addModalbtn.addEventListener("click", () =>{
           
            let updatedName = document.getElementById('name').value
            let updatedDescription = document.getElementById('description').value
            let updatedQuantity = document.getElementById('quantity').value
            for ( let i = 0; i < arrayData.length; i++){
                if (arrayData[i].product.toUpperCase() == updatedName.toUpperCase() || arrayData[i].product.toLowerCase() == updatedName.toLowerCase()){
                    if (updatedDescription !== ''){
                      arrayData[index].description = updatedDescription
                      localStorage.setItem(0, JSON.stringify(arrayData))
                    }
                    if (updatedQuantity !== ''){
                        arrayData[index].quantity = updatedQuantity
                        localStorage.setItem(0, JSON.stringify(arrayData))
                        clearModal()
                      }
                    
                }
                // else{
                //     alert("Name not found")
                //     return
                // }
            }

         })
        
    })
})

// this function calls the delete modal
const deleteItem = document.querySelectorAll(".fa-trash-alt")
console.log(deleteItem)
deleteItem.forEach(line =>{
    line.addEventListener("click", (e) =>{

        let deleteValue = e.target.getAttribute('id')
        let index = parseInt(deleteValue.split("remove")[1]);
        let itemsInStorage = JSON.parse(localStorage.getItem(0));
        itemsInStorage.splice(index, 1);
        localStorage.setItem(0, JSON.stringify(itemsInStorage));
        location.href = "index.html";
    })
})

//ths function works on the delete button on the modal
let cancelModal = document.getElementById('modalCancel')
let clearModal = () => {
    let inputs = document.getElementsByTagName('input')
    inputs[0].value = ''
    inputs[1].value = ''
    inputs[2].value = ''
    location.href = "index.html";
  }

  cancelModal.addEventListener("click",clearModal)

//this displays total items in inventory
document.getElementById('total-items').innerText = arrayData.length
