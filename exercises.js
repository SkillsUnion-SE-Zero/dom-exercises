/*
  Write a function which accepts a CSS selector 
  as a parameter and returns first DOM element it finds.

  Examples:
  
  findElement('h1') --> <h1>Hello and welcome on our site!</h1>
  findElement('.text-with-background') --> <><> 

  Helpful resources: 
    https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    https://www.w3schools.com/cssref/css_selectors.asp

*/

const findElement = (selector) => {
  return document.querySelector(selector)
}

/*
  Write a function which finds the first child element
  from a dom node matching a CSS selector
  The dom node and CSS selector are given
  to the function as parameters

  Examples:
  const content = document.querySelector('.content')
  findElementFromNode(content, 'h1') --> <h1>So who we are?</h1>
  findElementFromNode(content, 'p') --> <><> 

  Helpful resources: 
    https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
    https://www.w3schools.com/cssref/css_selectors.asp

*/

const findElementFromNode = (element, selector) => {
  return element.querySelector(selector)
}


/*
  Write a function which accepts an element and returns
  the HTML content or DOMString this element contains.

  Examples: 
    const home = document.querySelector('.home')
    getHTMLContent(home) --> "<h1>Hello and welcome on our site!</h1>"

    const clients = document.querySelector('.clients')
    getHTMLContent(clients) --> ""

  Helpful resources
    https://www.w3schools.com/jsref/prop_html_innerhtml.asp
*/

const getHTMLContent = (element) => {
  return element.innerHTML
}

/*
  Write a function changeElementContent which updates the HTML content
  of an element with a given value

  The function should accept 2 parameters: 
  an element to modify and a string representing the new contents.

  The function should return undefined. But you should be able 
  to see the change on the site when the function 
  is called with an element existing on the page.

  Examples: 
    const header = document.querySelector('h1')
    
    const newContent = `
      <header>
        <h1>Hello and welcome on our site!</h1>
        <h2>Please use the menu to explore information about our company</h2>
      </header>`
    
    changeElementContent(header, newContent)

    header.innerHTML -->  "<header>
        <h1>Hello and welcome on our site!</h1>
        <h2>Please use the menu to explore information about our company</h2>
      </header>"

  Helpful resources:
    https://www.w3schools.com/jsref/prop_html_innerhtml.asp
*/

const changeElementContent = (element, content) => {
  element.innerHTML = content
}

/*
  Write a function addClient which renders 
  the given name and logo to the page within the 
  div with id attribute "clients"

  addClient should return undefined 
  but when calling it with name and image url parameters
  you should be able to see that name and image
  displayed on Clients page.

  Furthermore, addClient function should not overwrite 
  existing client information on the page

  Example: 
    addClient("TeamSkills", "https://picsum.photos/id/1/200/300")
    should render TeamSkills and the image to Clients page
  
  Helpful resources: 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Addition_assignment
    https://developer.mozilla.org/en-US/docs/Web/API/Element/append
*/

const addClient = (name, logo) => {
  const clients = document.querySelector('#clients')
  const clientHTML = `
    <div>
      <img src=${logo}/>
      <p>${name}</p>
    </div>
  `
  clients.append(clientHTML)
}

/*
  Write a function addClients which renders 
  a list of clients 

  addClients should return undefined 
  
  When called with an array of client objects,
  it should render the name and image for each of them
  within a div with id "clients".
  
  If clients div already has child elements addClients 
  function should remove them before rendering the new list.

  Example: 
    const clients = [
      {
        name: "Microsoft",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/240px-Microsoft_logo.svg.png"
      },
      {
        name: "Apple",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/202px-Apple_logo_black.svg.png"
      },
      {
        name: "IBM",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/320px-IBM_logo.svg.png"
      }
    ]
    addClients("TeamSkills", "https://picsum.photos/id/1/200/300")
    Should render each client's name and image

  Helpful resources: 
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
*/

const addClients = (clients) => {
  document.querySelector('#clients').innerHTML = ""
  clients.forEach((client) => {
    addClient(client.name, client.image)
  })
}

/*
  Write a function getValue which returns 
  the value property of an input element
  with a given css selector.

  Example: 
    document.querySelector("#name").value = "Linda"
    getValue("#name") --> "Linda"

  Helpful resources: 
    https://www.w3schools.com/jsref/prop_text_value.asp
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
*/

const getValue = (selector) => {
  return document.querySelector(selector).value
}

/*
  Write a javascript function processInput which
  adds a click event listener to an element
  with id="submit". When the event fires we 
  we should render this message within "submit-confirmation" element.

  processInput should attach an event listener to
  #submit button

  "
    NAME, Thank you for getting in touch! 
    Please expect a response within 3 working days
    on this email: EMAIL
  "

  Where NAME and EMAIL represent the information the user has
  inserted name and email inputs

  Helpful resources: 
    https://www.w3schools.com/jsref/met_document_addeventlistener.asp
    https://www.freecodecamp.org/news/javascript-addeventlistener-example-code/
    https://developer.mozilla.org/en-US/docs/Web/API/Element/click_event
*/

const processInput = () => {
  document.querySelector("#submit").addEventListener('click', (e) => {
    e.preventDefault()
    const name = getValue("#name")
    const email = getValue("#email")
    const confirmationContainer = findElement('#submit-confirmation')
    const message = `<p>${name}, Thank you for getting in touch! Please expect a response within 3 working days on this email: ${email}</p>`

    changeElementContent(confirmationContainer, message)
  })
}

/*
  Write a javascript function displayMessage 
  which renders the text the user types into textarea 
  next to the form. Please use the prepared span element
  with id show-message to render user input. 

  displayMessage should attach an event listener to 
  .message textarea

  The text should be rendered as the user types.

  Helpful resources: 
  https://www.w3schools.com/tags/tag_textarea.asp
  https://www.w3schools.com/jsref/prop_textarea_value.asp
  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
*/

const displayMessage = () => {
  document.querySelector(".message").addEventListener('change', (e) => {
    const message = e.target.value
    const showMessageContainer = findElement('#show-message')
    changeElementContent(showMessageContainer, message)
  })
}


export {
  findElement,
  findElementFromNode,
  getHTMLContent,
  changeElementContent,
  addClient,
  addClients,
  getValue,
  processInput,
  displayMessage
}

