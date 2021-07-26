
import { fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import { findElement, findElementFromNode, getHTMLContent, changeElementContent, addClient, addClients, getValue, processInput, displayMessage } from '../exercises'

const html = fs.readFileSync(path.resolve(__dirname, './test.html'), 'utf8');
let dom

describe('index.html', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

  describe('findElement', () => {
    it('Returns element by tag', () => {
      expect(findElement('h1').textContent).toEqual('Hello and welcome on our site!')
    })
    it('Returns element by class', () => {
      expect(findElement('.icon')).toContainHTML('<a class="icon" href="#" class="fa fa-twitter"></a>')
    })
    it('Returns element by complex selector', () => {
      expect(findElement('.content > h1').textContent).toEqual('So who we are?')
    })
  })


  describe('findElementFromNode', () => {
    it('Returns element by tag', () => {
      expect(findElementFromNode(document.querySelector('nav'), 'li').textContent).toEqual('Home')
    })
    it('Returns element by class', () => {
      expect(findElementFromNode(document.querySelector('nav'), '.icon')).toContainHTML('<a class="icon" href="#" class="fa fa-twitter"></a>')
    })
    it('Returns element by complex selector', () => {
      expect(findElementFromNode(document.querySelector('.wrapper'), 'h2').textContent).toEqual('We are Prague based company.')
    })
    it('Returns first found element of given node', () => {
      expect(findElementFromNode(document.querySelector('.about'), 'h1').textContent).toEqual('So who we are?')
    })
  })

  describe('getHTMLContent', () => {
    it('Returns empty string when element doesnt have children', () => {
      expect(getHTMLContent(document.querySelector('.icon'))).toEqual("")
    })

    it('Returns HTML for found element', () => {
      const home = document.querySelector('.home')
      expect(getHTMLContent(home).trim()).toEqual("<h1>Hello and welcome on our site!</h1>")
    })
  })

  describe('changeElementContent', () => {
    it('Returns undefined', () => {
      const home = document.querySelector('.home')
      expect(changeElementContent(home, 'This is home')).toBe(undefined)
    })

    it('Updates given element with passed in string', () => {
      const home = document.querySelector('.home')
      changeElementContent(home, 'This is home')
      expect(home).toContainHTML('This is home')
    })
  })

  describe('addClient', () => {
    const clientName = "AsyncSolutions"
    const clientLogoUrl = "https://picsum.photos/id/0/200/300"

    it('Adds new client name to #clients', () => {
      const clients = document.querySelector('#clients')
      addClient(clientName, clientLogoUrl)
      expect(clients.innerHTML).toContain(clientName)
    })

    it('Adds new client logo to #clients', () => {
      const clients = document.querySelector('#clients')
      addClient(clientName, clientLogoUrl)
      expect(clients.innerHTML).toContain(clientLogoUrl)
    })

    it('Does not overwrite previously added clients', () => {
      const clients = document.querySelector('#clients')
      const clientName2 = "PromiseLab"
      const clientLogoUrl2 = "https://picsum.photos/id/1/200/300"
      addClient(clientName, clientLogoUrl)
      addClient(clientName2, clientLogoUrl2)
      expect(clients.innerHTML).toContain(clientName)
      expect(clients.innerHTML).toContain(clientLogoUrl)
      expect(clients.innerHTML).toContain(clientName2)
      expect(clients.innerHTML).toContain(clientLogoUrl2)
    })
  })

  describe('addClients', () => {
    let clients = [
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

    it('Adds all of the companys names', () => {
      const clientsContainer = document.querySelector('#clients')
      addClients(clients)
      clients.forEach(client => expect(clientsContainer.innerHTML).toContain(client.name))
    })

    it('Adds all of the companys images', () => {
      const clientsContainer = document.querySelector('#clients')
      addClients(clients)
      clients.forEach(client => expect(clientsContainer.innerHTML).toContain(client.image))
    })

    it('Works with different set of clients', () => {
      clients = [
        {
          name: "Amazon",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png"
        },
        {
          name: "Netflix",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png"
        },
        {
          name: "Tesla",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/240px-Tesla_logo.png"
        }
      ]

      const clientsContainer = document.querySelector('#clients')
      addClients(clients)

      clients.forEach(client => {
        expect(clientsContainer.innerHTML).toContain(client.name)
        expect(clientsContainer.innerHTML).toContain(client.image)
      })
    })


    it('Works with different set of clients', () => {
      clients = [
        {
          name: "Amazon",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png"
        },
        {
          name: "Netflix",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/320px-Netflix_2015_logo.svg.png"
        },
        {
          name: "Tesla",
          image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Tesla_logo.png/240px-Tesla_logo.png"
        }
      ]

      const clientsContainer = document.querySelector('#clients')
      clientsContainer.innerHTML = "Microsoft"
      addClients(clients)
      expect(clientsContainer.innerHTML.includes("Microsoft")).toBeFalsy()
    })
  })

  describe('getValue', () => {
    it('Returns the value of name field', () => {
      const name = "Linda";
      const selector = "#name"
      document.querySelector(selector).value = name
      expect(getValue(selector)).toEqual(name)
    })

    it('Returns the value of email field', () => {
      const email = "linda@gmail.com";
      const selector = "#email"
      document.querySelector(selector).value = email
      expect(getValue(selector)).toEqual(email)
    })

    it('Returns the value of message field', () => {
      const message = "Great work!";
      const selector = ".message"
      document.querySelector(selector).value = message
      expect(getValue(".message")).toEqual(message)
    })
  })

  describe('processInput', () => {
    it('Invokes addEventListener', () => {
      const submitButton = document.querySelector('#submit')
      const mockAddEventListener = jest.fn()
      submitButton.addEventListener = mockAddEventListener
      processInput()

      expect(mockAddEventListener).toHaveBeenCalled()
    })

    it('Invokes addEventListener with click event and a callback function', () => {
      const submitButton = document.querySelector('#submit')
 
      const mockAddEventListener = jest.fn()
      submitButton.addEventListener = mockAddEventListener
      processInput()

      expect(mockAddEventListener).toHaveBeenCalledWith('click', expect.any(Function))
    })

    it('Adds message to submit-confirmation after click', () => {
      const confirmationContainer = document.querySelector('#submit-confirmation')
      const submitButton = document.querySelector('#submit')
      processInput()
      fireEvent.click(submitButton)
  
      expect(confirmationContainer.innerHTML).toContain("Thank you for getting in touch")
    })

    it('Adds name to submit-confirmation after click', () => {
      const confirmationContainer = document.querySelector('#submit-confirmation')
      const submitButton = document.querySelector('#submit')
      const name = "Linda"
      document.querySelector('#name').value = name
      processInput()
      fireEvent.click(submitButton)
  
      expect(confirmationContainer.innerHTML).toContain(`${name}, Thank you for getting in touch!`)
    })

    it('Adds email to submit-confirmation element', () => {
      const confirmationContainer = document.querySelector('#submit-confirmation')
      const submitButton = document.querySelector('#submit')
      const email = "linda@gmail.com"
      document.querySelector('#email').value = email
      processInput()
      fireEvent.click(submitButton)
  
      expect(confirmationContainer.innerHTML).toContain(email)
    })

    it('Adds email to submit-confirmation after click', () => {
      const confirmationContainer = document.querySelector('#submit-confirmation')
      const submitButton = document.querySelector('#submit')
      const name = "Linda"
      const email = "linda@gmail.com"
      const message = `${name}, Thank you for getting in touch! Please expect a response within 3 working days on this email: ${email}`
      document.querySelector('#email').value = email
      document.querySelector('#name').value = name
      processInput()
      fireEvent.click(submitButton)
  
      expect(confirmationContainer.innerHTML).toContain(message)
    })
  })

  describe('displayMessage', () => {
    it('Invokes addEventListener', () => {
      const messageInput = document.querySelector('.message')
      const mockAddEventListener = jest.fn()
      messageInput.addEventListener = mockAddEventListener
      displayMessage()

      expect(mockAddEventListener).toHaveBeenCalled()
    })

    it('Invokes addEventListener with change event and a callback function', () => {
      const messageInput = document.querySelector('.message')
 
      const mockAddEventListener = jest.fn()
      messageInput.addEventListener = mockAddEventListener
      displayMessage()

      expect(mockAddEventListener).toHaveBeenCalledWith('change', expect.any(Function))
    })

    it('Adds text to show-message element when change event happens to .message', () => {
      displayMessage()
      const event = new window.Event('change');
      const messageInput = document.querySelector('.message')
      const value = "Hey"
      messageInput.value = value
      fireEvent.change(messageInput, {target: {value}})

      const showMessageContainer = document.querySelector('#show-message')

      expect(showMessageContainer.innerHTML).toEqual('Hey')
    })
  })
})