import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import changeElementContent from './changeElementContent'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom


describe('4 changeElementContent', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

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