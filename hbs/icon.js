
export const iconTemplate =
`
<div class="icon-wrap icon-svg-multiple">
  <svg sly-data-test="icon-home-dark" class="icon-svg" fill="currentColor">
    <use
      xlink:href="/resources/{{iconDark}}">
    </use>
  </svg>
  {{#if iconLight}}
    <svg sly-data-test="icon-home-light" class="icon-svg" fill="currentColor">
      <use
        xlink:href="/resources/{{iconLight}}">
      </use>
    </svg>
  {{/if}}
</div>
`