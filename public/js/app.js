console.log('client side javascript file is loaded')

//getting the data inside our client side javascript
//we actually make the request from the client side javascript
//'fetch'  in not part f javascript. Is not a part of node js.
//'fetch' is a browser based API which can be used in almost all the browsers

const weatherForm=document.querySelector('form')
const search=document.querySelector('input')
const messageOne=document.querySelector('#message-1')
const messageTwo=document.querySelector('#message-2')

//messageOne.textContent='From Javascript'

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location=search.value
    
    messageOne.textContent='Loading....'
    messageTwo.textContent=''
    //we are only fetching when the form is submitted
    fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        if(data.error)
        {
            messageOne.textContent='error'
        }
        else{
            messageOne.textContent=data.location
            messageTwo.textContent=data.forecast
        }
    })
})

})