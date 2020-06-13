function populateUFs(){
    const ufselect=document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res=>res.json())
    .then(states=>{
        for( const state of states){
            ufselect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
        }
       
    } )


}

populateUFs()

function getCities(event){
    const cityselect=document.querySelector("[name=city]")
    const stateInput=document.querySelector("[name=state]")
    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
stateInput.value = event.target.options[indexOfSelectedState].text


    const url =`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
   
    cityselect.innerHTML +="<option value=>Selecione a cidade</option>"
    cityselect.disabled =true
    fetch(url)
    .then(res=>res.json())
    .then(cities=>{
        

        for( const city of cities){
            cityselect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
        }
        cityselect.disabled =false
    } )
}


document.querySelector("select[name=uf]")

.addEventListener("change",getCities)



//Items de coleta//
//pegar tosdos los li//

const itemsTocollect = document.querySelectorAll(".items-grid li")

for(const item of  itemsTocollect){

item.addEventListener("click", handleSelectedItem)
}


const collectedItems = document.querySelector("input[name=items]")


let selectedItems = []

 function handleSelectedItem(event){
const itemLi = event.target
    //adicionar ou remover uma classe com java
itemLi.classList.toggle("selected")
    
     const itemId = itemLi.dataset.id
 
     console.log('ITEM ID:',itemId)
    //verificar se existem items selecionados 
    //pegar os items selecionados
const alreadySelected = selectedItems.findIndex( item => {
const itemFound = item == itemId
return itemFound

})
//se já estiver selecionado, 
if(alreadySelected >= 0){
    //tirar da selecao
    const filterdItems =  selectedItems.filter( item => {
        const itemIsDifferent = item != itemId
        return itemIsDifferent

    })
    selectedItems =filterdItems
}else{
    //se nao estiver selecionado adicionar a selecao
    selectedItems.push(itemId)
}

console.log('selectedItems',selectedItems)
 //atualizar o campo escondido
 collectedItems.value = selectedItems
}
