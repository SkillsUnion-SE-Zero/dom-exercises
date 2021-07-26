
import { fireEvent } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import displayMessage from './displayMessage'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom


describe('9 displayMessage', () => {
  
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

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

    expect(showMessageContainer.textContent).toEqual(value)
  })
})
