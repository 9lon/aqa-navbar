import { PolymerElement } from '@polymer/polymer/polymer-element.js';
import '@aqa/aqa-font/aqa-font.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
/**
 * `aqa-navbar`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class AqaNavbar extends PolymerElement {
  static get template() {
    return html`
    <style>
      .tab {
        overflow: hidden;
        border-bottom: 1px solid #ccc;
        /* background-color: white;  */
        /* border-radius: 4px;   */
      }

      .tab div>button {
        font-family: MitrLight;
        background-color: transparent;
        border: none;
        float: left;
        outline: none;
        cursor: pointer;
        padding: 0.4rem 16px;
        transform: 0.3s;
        font-size: 1rem;
        color: #bbb;
      }

      div>button:hover {
        background-color: #E5E5E5;
      }

      div[selected]>button {
        background-color: white;
        color: black;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-right: 1px solid #ddd;
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    </style>
    <a id="link" href="#" style="display:none;">link</a>
    <div class="tab">
      <template is="dom-repeat" items="[[items]]">
        <div selected\$="[[_checkSeleted(item.path,path)]]">
          <button class="tablinks font-MitrLight" on-click="tabsActive">[[item.label]]</button>
        </div>
      </template>
    </div>
`;
  }

  static get is() { return 'aqa-navbar'; }
  static get properties() {
    return {
      items: {
        type: Array,
        value: function () {
          return []
        }
      },
      path: {
        type: String
      },
      query: {
        type: Object,
        value: function () {
          return {}
        },
        observer: '_queryChanged'
      },
      queryString: {
        type: String,
        value: ""
      }
    };
  }
  connectedCallback() {
    super.connectedCallback();
    for (var index = 0; index < this.children.length; index++) {
      this.items.push({
        path: this.children[index].getAttribute('path'),
        label: this.children[index].getAttribute('label')
      })
    }
  }
  tabsActive(e) {
    this.$.link.setAttribute('href', e.model.item.path + this.queryString)
    this.$.link.click()
  }

  _checkSeleted(name, selected) {
    return name == selected
  }

  _queryChanged(obj) {
    this.queryString == ""
    var str = [];
    for (var p in obj)
      if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    if (this.queryString != "") {
      this.queryString = '?' + str.join("&");
    }

  }
}

window.customElements.define(AqaNavbar.is, AqaNavbar);
