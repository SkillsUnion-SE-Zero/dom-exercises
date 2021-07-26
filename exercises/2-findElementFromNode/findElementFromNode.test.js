import '@testing-library/jest-dom/extend-expect'
import { JSDOM } from 'jsdom'
import fs from 'fs'
import path from 'path'

import findElementFromNode from './findElementFromNode'

const html = fs.readFileSync(path.resolve(__dirname, '../../test/test.html'), 'utf8');
let dom


describe('2 findElementFromNode', () => {
  beforeEach(() => {
    dom = new JSDOM(html, { runScripts: 'dangerously' })
    global.document = dom.window.document
    global.window = dom.window
  })

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
