import { JSDOM } from 'jsdom'
import fs from 'fs'
import { edsToJson } from '../blocks/hero/hero.js'

const html = fs.readFileSync('data/eds-template/hero.html', 'utf8')

const dom = new JSDOM(html)
const document = dom.window.document

const selector = "div.hero"

const blockEl = document.querySelector(selector)

const data = edsToJson(blockEl)

console.log(JSON.stringify(data, null, 2))