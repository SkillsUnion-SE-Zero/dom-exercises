
import { fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import processInput from './processInput'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom

describe('8 processInput', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

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

  it('renders full message after click', () => {
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
