
import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import findElement from './findElement'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom

describe('1 findElement', () => {

  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })
  
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
