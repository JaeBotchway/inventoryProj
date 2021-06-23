let addbtn = document.getElementById('add')
let cancelbtn = document.getElementById('cancelled')


//getting items from local storage
let arrayData = localStorage.getItem(0)
arrayData = JSON.parse(arrayData)


//this array is get total quantity in stock and display value
let ItemsStored = JSON.parse(localStorage.getItem(0));
let totalQuantity=0;

for (let j =0; j<ItemsStored.length; j++){
    ItemsStored[j].quantity
    totalQuantity += Number(ItemsStored[j].quantity);
}
document.getElementById("total-stock").innerText = totalQuantity;


//function to clear input on the add page cancel button
let clearInput2 = () => {
  let inputs = document.getElementsByTagName('input')
  inputs[0].value = ''
  inputs[1].value = ''
  inputs[2].value = ''
  location.href = "index.html";
}

//function for the add calculations
let Add = () => {
  let productDetails = document.getElementById('name').value
  let descriptionDetails = document.getElementById('description').value
  let categoryDetails = document.getElementById('category').value
  let quantityDetails = document.getElementById('quantity').value

  console.log(productDetails)
  console.log(descriptionDetails)
  console.log(categoryDetails)
  console.log(quantityDetails)

  if (productDetails !== '' && descriptionDetails != '' && quantityDetails > -1) {
    let storage = {
      product: productDetails,
      description: descriptionDetails,
      category: categoryDetails,
      quantity: quantityDetails,
    }

    arrayData.push(storage)
    localStorage.setItem(0, JSON.stringify(arrayData))
    clearInput()
  }else {
    alert('Enter valid values')
  }
}

//function to clear input on the add page add button
let clearInput = () => {
  let inputs = document.getElementsByTagName('input')
  inputs[0].value = ''
  inputs[1].value = ''
  inputs[2].value = ''
}



//event listener for the add and cancel buttton on the add page
addbtn.addEventListener('click', Add)
cancelbtn.addEventListener('click', clearInput2)


document.getElementById('total-items').innerText = arrayData.length



