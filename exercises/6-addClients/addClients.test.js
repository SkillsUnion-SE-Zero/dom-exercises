import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import addClients from './addClients'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom


describe('6 addClients', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

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
