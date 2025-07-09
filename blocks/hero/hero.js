/**
 * File: hero.js
 * 
 * 
 * json-template: /data/json/blocks/hero.json
 * eds-template: /data/eds-template/herl.html
 * aem-template: /data/aem-template/hero.html
 * 
 */

import { iconTemplate } from "../../hbs/icon.js";
import { heroTemplate } from "./heroTemplate.js";
import { populateIcon } from "../../scripts/helper.js";
import { initDropdown } from "../../scripts/demo.js";


/**
 * 
 * Extract data from html to JSON.
 * Given the html in a template specified in the "eds-template" field in this file comment section,
 * extract data from the html and return a JSON object in a format specified in the "json-template" field in this file comment section.
 * The rules for data mappings are as follows:
 * 1: the "backdrop" object in the JSON. It's from the <div> with "<div>backdrop</div>".
 *   "backdrop.lg":  there's <p>lg</p>. Following it, there's another <p> tag, which contains a <img> tag. The "backdrop.lg" is from the src attribute of the <img> tag. Remove the query strings from the image url.
 *   "backdrop.md", "backdrop.sm" and "backdrop.xs" have the same logic but they are from <div>md</div>, <div>sm</div> and <div>xs</div> respectively.
 * 2: the "title" field in the JSON. It's from the html section with "<div>title</div>". Use the text only.
 * 3: the "getAQuote" field in the JSON. It's from the html section with "<div>getAQuote</div>". "dropdown.label" is from the <h2> tag.
 *   "dropdown.options" is from the <ul> tag. For each option item, the "label" is from the text of the <a> tag. "icon" is from the text in the <u> tag.
 *   the "link" is the href of the <a> tag.
 * 4: the "startAClaim" object in the JSON. It's from the html section with "<div>startAClaim</div>".
 *   "label" field is the text of the <a> tag. "link" field is the href of the <a> tag.
 * 5: the "pay" object in the JSON has the same logic as "start-a-claim" object but it's from the html section with "<div>pay</div>".
 * 6: the "footer" object in the JSON. It's from the html section with "<div>footer</div>".
 *   "image" field is the url of the image from the <img> tag inside the first <p> tag. Remove the query strings from the image url.
 *   "text" field is the text of the second <p> tag.
 * 
 * @param {*} block 
 */
export function edsToJson(block) {
  // Helper to remove query strings from URLs
  const cleanUrl = (url) => url ? url.split('?')[0] : '';

  // Helper to find a section by marker div text
  function getSection(marker) {
    const markerDiv = Array.from(block.querySelectorAll('div')).find(div => div.textContent.trim() === marker);
    return markerDiv ? markerDiv.parentElement : null;
  }

  // 1. Backdrop
  const backdropSection = getSection('backdrop');
  const backdrop = {};
  if (backdropSection) {
    ['lg', 'md', 'sm', 'xs'].forEach(size => {
      // Find <p> with the size label, then the next <p> with <img>
      const sizeP = Array.from(backdropSection.querySelectorAll('p')).find(p => p.textContent.trim() === size);
      let img = null;
      if (sizeP) {
        let sibling = sizeP.nextElementSibling;
        // Find the next <p> that contains an <img>
        while (sibling && (sibling.tagName !== 'P' || !sibling.querySelector('img'))) {
          sibling = sibling.nextElementSibling;
        }
        img = sibling ? sibling.querySelector('img') : null;
      }
      backdrop[size] = img ? cleanUrl(img.src) : '';
    });
  }

  // 2. Title
  const titleSection = getSection('title');
  let title = '';
  if (titleSection) {
    const titleDiv = Array.from(titleSection.querySelectorAll('div')).find(div => div.textContent.trim() === 'title');
    if (titleDiv && titleDiv.nextElementSibling) {
      title = titleDiv.nextElementSibling.textContent.trim();
    }
  }

  // 3. getAQuote
  const getAQuoteSection = getSection('getAQuote');
  let getAQuote = {};
  if (getAQuoteSection) {
    const label = getAQuoteSection.querySelector('h2')?.textContent.trim() || '';
    const options = [];
    const ul = getAQuoteSection.querySelector('ul');
    if (ul) {
      ul.querySelectorAll('li').forEach(li => {
        const a = li.querySelector('a');
        const u = li.querySelector('u');
        options.push({
          label: a ? a.textContent.trim() : '',
          icon: u ? u.textContent.trim().toLowerCase() : '',
          link: a ? a.getAttribute('href') : ''
        });
      });
    }
    getAQuote = {
      dropdown: {
        label,
        options
      }
    };
  }

  // 4. startAClaim
  const startAClaimSection = getSection('startAClaim');
  let startAClaim = {};
  if (startAClaimSection) {
    const a = startAClaimSection.querySelector('a');
    startAClaim = {
      label: a ? a.textContent.trim() : '',
      link: a ? a.getAttribute('href') : ''
    };
  }

  // 5. pay
  const paySection = getSection('pay');
  let pay = {};
  if (paySection) {
    const a = paySection.querySelector('a');
    pay = {
      label: a ? a.textContent.trim() : '',
      link: a ? a.getAttribute('href') : ''
    };
  }

  // 6. footer
  const footerSection = getSection('footer');
  let footer = {};
  if (footerSection) {
    const img = footerSection.querySelector('img');
    const textTag = footerSection.querySelector('p:nth-of-type(2)');
    let text = textTag ? textTag.textContent.trim() : '';
    footer = {
      image: img ? cleanUrl(img.src) : '',
      text
    };
  }

  return {
    backdrop,
    title,
    getAQuote,
    startAClaim,
    pay,
    footer
  };
}

function processData(data) {
  data.getAQuote.dropdown.options.forEach(option => {
    populateIcon(option);
  });
  
}

function render(block, data) {
  Handlebars.registerPartial('icon', iconTemplate);
  const template = Handlebars.compile(heroTemplate);
  const html = template(data);
  // console.log('html', html);

  const el = document.createElement('template');
  el.innerHTML = html.trim();
  block.innerHTML = '';
  block.appendChild(el.content);
}

/**
 * 
 * @param {*} block 
 */
export default async function decorate(block) {
  // extract data from the block html
  let data = edsToJson(block);

  console.log('data', data);

  // process the data if needed
  processData(data);

  // console.log('data', data);

  // render it
  render(block, data);

  initDropdown();
}