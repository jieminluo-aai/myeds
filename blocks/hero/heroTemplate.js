
/**
 * 
 * The data schema for this handlebars template is from /data/json/template/hero.json
 * copilot should provide code hint for variables for this template based on the data schema. handlebar variables are in the format of {{variableName}}.
 * for ejs template engine
 */
export const heroTemplate = 
`
<div class="cmp-heroquotecard" data-cmp-is="heroquotecard">
  <div class="backdrop-wrap">
    <picture>
      <source media="(min-width: 1272px)" srcset="{{backdrop.lg}}">
      <source media="(min-width: 896px)" srcset="{{backdrop.md}}">
      <source media="(min-width: 600px)" srcset="{{backdrop.sm}}"><img
        src="{{backdrop.xs}}" alt="Backdrop Image">
    </picture>
  </div>
  <div class="heroquotecard-main">
    <div class="heroquotecard-header">
      <div class="heroquotecard-header-title">
        <h1>{{backdrop.title}}</h1>
      </div>
    </div>
    <div class="quotecard-wrap">
      <div class="quotecard">

        <div class="cmp-quotecard" data-cmp-is="quotecard">
          <div class="row1">
            <div class="getaquotedropdownbtn aaismartbutton">

              <div class="cmp-aai-smart-button">
                <div class="demo-btn-dropdown">
                  <div class="demo-btn demo-btn-featured demo-btn-dropdown-toggle">
                    <div class="demo-btn-button-wrap">
                      <div class="btn-label">{{getAQuote.dropdown.label}}</div>
                      <div class="icon-wrap dropdown-toggler-icon-wrap">
                        <svg class="icon-svg" fill="currentColor">
                          <use
                            xlink:href="/resources/solid.svg#chevron-down">
                          </use>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <ul class="dropdown-button-dropdown-wrap">
                    {{#each getAQuote.dropdown.options}}
                      <li>
                        <a href="{{link}}" target="_blank">
                          {{> icon this}}
                          <div class="label-wrap">
                            <span>{{label}}</span>
                          </div>
                        </a>
                      </li>
                    {{/each}}
                  </ul>
                </div>

              </div>
            </div>

          </div>
          <div class="row2">
            <div class="demo-btn"><a href="{{startAClaim.link}}">{{startAClaim.label}}</a></div>
            <div class="demo-btn"><a href="{{pay.link}}">{{pay.label}}</a></div>
          </div>
          <div class="row3">
            <div class="most-trusted-icon">
              <img src="{{footer.image}}" alt="most trusted icon">
            </div>
            <div class="most-trusted-text">
              <b>{{footer.text}}</b>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
`