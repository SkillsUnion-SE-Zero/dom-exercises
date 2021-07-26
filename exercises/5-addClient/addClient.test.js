import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import addClient from './addClient'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom

describe('5 addClient', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

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
