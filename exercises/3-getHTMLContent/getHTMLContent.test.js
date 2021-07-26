import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import getHTMLContent from './getHTMLContent'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom

describe('3 getHTMLContent', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

  it('Returns empty string when element doesnt have children', () => {
    expect(getHTMLContent(document.querySelector('.icon'))).toEqual("")
  })

  it('Returns HTML for found element', () => {
    const home = document.querySelector('.home')
    expect(getHTMLContent(home).trim()).toEqual("<h1>Hello and welcome on our site!</h1>")
  })
})
