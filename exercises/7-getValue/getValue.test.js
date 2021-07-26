import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import getValue from './getValue'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom

describe('7 getValue', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

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
