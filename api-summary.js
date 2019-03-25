import {PolymerElement} from '../../@polymer/polymer/polymer-element.js';
import {html} from '../../@polymer/polymer/lib/utils/html-tag.js';
import {AmfHelperMixin} from '../../@api-components/amf-helper-mixin/amf-helper-mixin.js';
import '../../@polymer/polymer/lib/elements/dom-if.js';
import '../../@api-components/raml-aware/raml-aware.js';
import '../../@polymer/iron-flex-layout/iron-flex-layout.js';
import '../../@advanced-rest-client/markdown-styles/markdown-styles.js';
import '../../@polymer/marked-element/marked-element.js';
import '../../@polymer/iron-meta/iron-meta.js';
import '../../@advanced-rest-client/clipboard-copy/clipboard-copy.js';
import '../../@polymer/paper-icon-button/paper-icon-button.js';
import '../../@advanced-rest-client/arc-icons/arc-icons.js';
import '../../@api-components/http-method-label/http-method-label-common-styles.js';
/**
 * `api-summary`
 *
 * A summary view for an API base on AMF data model
 *
 * ## Styling
 *
 * `<api-summary>` provides the following custom properties and mixins for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--api-summary` | Mixin applied to this elment | `{}`
 * `--api-summary-color` | Color of text labels | ``
 * `--api-summary-url-font-size` | Font size of endpoin URL | `16px`
 * `--api-summary-url-background-color` | Background color of the URL section | `#424242`
 * `--api-summary-url-font-color` | Font color of the URL area | `#fff`
 * `--api-summary-separator-color` | Color of section separator | `rgba(0, 0, 0, 0.12)`
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 * @memberof ApiElements
 * @appliesMixin AmfHelperMixin
 */
class ApiSummary extends AmfHelperMixin(PolymerElement) {
  static get template() {
    return html`
    <style include="markdown-styles"></style>
    <style include="http-method-label-common-styles"></style>
    <style>
    :host {
      display: block;
      color: var(--api-summary-color);
      @apply --arc-font-body1;
      @apply --api-summary;
    }

    h1 {
      @apply --arc-font-headline;
    }

    .marked-description {
      margin: 24px 0;
    }

    .markdown-body {
      margin-bottom: 28px;
    }

    :host([narrow]) h1 {
      font-size: 20px;
      margin: 0;
    }

    .url-area {
      @apply --layout-horizontal;
      @apply --layout-center;
      @apply --arc-font-code1;
      font-size: var(--api-summary-url-font-size, 16px);
      margin: 40px 0;
      background: var(--api-summary-url-background-color, #424242);
      color: var(--api-summary-url-font-color, #fff);
      padding: 8px;
      border-radius: 2px;
    }

    .url-value {
      margin-left: 12px;
      word-break: break-all;
      @apply --layout-flex;
    }

    .method-value {
      text-transform: uppercase;
      white-space: nowrap;
    }

    label.section {
      @apply --arc-font-subhead;
      font-size: 18px;
      margin-top: 20px;
      display: block;
      @apply --api-summary-section-label;
    }

    a {
      @apply --arc-link;
      @apply --api-link;
    }

    a:hover {
      @apply --arc-link-hover;
      @apply --api-link-hover;
    }

    .chip {
      display: inline-block;
      white-space: nowrap;
      padding: 2px 4px;
      margin-right: 8px;
      background-color: var(--api-summary-chip-background-color, #F0F0F0);
      color: var(--api-summary-chip-color, #616161);
      border-radius: var(--api-summary-chip-border-radius, 2px);
    }

    .app-link {
      @apply --arc-link;
    }

    .link-padding {
      margin-left: 8px;
    }

    .inline-description {
      padding: 0;
      margin: 0;
    }

    .docs-section {
      margin-bottom: 40px;
    }

    .separator {
      background-color: var(--api-summary-separator-color, rgba(0, 0, 0, 0.12));
      height: 1px;
      margin: 40px 0;
    }

    .endpoint-item {
      margin-bottom: 32px;
    }

    .method-label {
      margin-right: 8px;
      margin-bottom: 8px;
      cursor: pointer;
    }

    .method-label:hover {
      text-decoration: underline;
    }

    .endpoint-label {
      display: inline-block;
      margin-right: 8px;
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
      font-size: 15px;
      @apply --arc-link;
    }

    .endpoint-path {
      text-decoration: underline;
      font-size: 14px;
      cursor: pointer;
      margin-bottom: 4px;
      display: inline-block;
    }

    .toc .section {
      margin-bottom: 24px;
    }
    </style>
    <template is="dom-if" if="[[aware]]">
      <raml-aware raml="{{amfModel}}" scope="[[aware]]"></raml-aware>
    </template>

    <div role="main">
      <h1>[[apiTitle]]</h1>

      <template is="dom-if" if="[[hasVersion]]">
        <p class="inline-description">
          <label>Version:</label>
          <span>[[version]]</span>
        </p>
      </template>

      <template is="dom-if" if="[[description]]">
        <div role="region" class="marked-description">
          <marked-element markdown="[[description]]">
            <div slot="markdown-html" class="markdown-body"></div>
          </marked-element>
        </div>
      </template>

      <div class="url-area">
        <div class="url-value">[[apiBaseUri]]</div>
        <paper-icon-button class="action-icon copy-icon" icon="arc:content-copy" on-click="_copyPathClipboard" title="Copy path to clipboard"></paper-icon-button>
      </div>
      <clipboard-copy id="pathCopy" content="[[apiBaseUri]]"></clipboard-copy>

      <template is="dom-if" if="[[hasProtocols]]">
        <label class="section">Supported protocols</label>
        <div class="protocol-chips">
          <template is="dom-repeat" items="[[protocols]]">
            <span class="chip">[[item]]</span>
          </template>
        </div>
      </template>

      <template is="dom-if" if="[[hasProvider]]">
        <section role="contentinfo" class="docs-section">
          <label class="section">Contact information</label>
          <p class="inline-description">
            <span>[[providerName]]</span>
            <template is="dom-if" if="[[providerEmail]]">
              <a class="app-link link-padding" href\$="mailto:[[providerEmail]]">[[providerEmail]]</a>
            </template>
          </p>
          <template is="dom-if" if="[[providerUrl]]">
            <p class="inline-description"><a href\$="[[providerUrl]]" target="_blank" class="app-link">[[providerUrl]]</a></p>
          </template>
        </section>
      </template>

      <template is="dom-if" if="[[hasLicense]]">
        <section role="region" aria-labelledby="licenseLabel" class="docs-section">
          <label class="section" id="licenseLabel">License</label>
          <p class="inline-description">
            <template is="dom-if" if="[[licenseUrl]]">
              <a href\$="[[licenseUrl]]" target="_blank" class="app-link">[[licenseName]]</a>
            </template>
          </p>
        </section>
      </template>

      <template is="dom-if" if="[[termsOfService]]">
        <section role="region" aria-labelledby="tocLabel" class="docs-section">
          <label class="section" id="tocLabel">Terms of service</label>
          <marked-element markdown="[[termsOfService]]">
            <div slot="markdown-html" class="markdown-body"></div>
          </marked-element>
        </section>
      </template>
    </div>

    <template is="dom-if" if="[[hasEndpoints]]">
      <div class="separator"></div>
      <div class="toc">
        <label class="section">API endpoints</label>
        <template is="dom-repeat" items="[[endpoints]]">
          <div class="endpoint-item" on-click="_navigateItem">
            <div class="endpoint-path" data-id\$="[[item.id]]" data-shape-type="endpoint" title="Open endpoint documentation">[[item.path]]</div>
            <div class="endpoint-header">
              <template is="dom-if" if="[[item.hasName]]">
                <span class="endpoint-label" data-id\$="[[item.id]]" data-shape-type="endpoint" title="Open endpoint documentation">[[item.name]]</span>
              </template>
              <template is="dom-repeat" items="[[item.ops]]">
                <span class="method-label" data-method\$="[[item.method]]" data-id\$="[[item.id]]" data-shape-type="method" title="Open method documentation">[[item.method]]</span>
              </template>
            </div>
          </div>
        </template>
      </div>
    </template>
`;
  }

  static get is() {
    return 'api-summary';
  }
  static get properties() {
    return {
      /**
       * `raml-aware` scope property to use.
       */
      aware: String,
      /**
       * Computed value of AMF model of a type of `http://schema.org/WebAPI`
       *
       * @type {Object}
       */
      webApi: {
        type: Object,
        computed: '_computeWebApi(amfModel)'
      },
      /**
       * A property to set to override AMF's model base URI information.
       * When this property is set, the `endpointUri` property is recalculated.
       */
      baseUri: {type: String, value: ''},
      /**
       * API base URI to display in main URL field.
       * This value is computed when `amfModel` or `baseUri` change.
       */
      apiBaseUri: {
        type: String,
        computed: '_computeBaseUri(server, baseUri, protocols)'
      },
      /**
       * Computed title of the API
       */
      apiTitle: {
        type: String,
        computed: '_computeApiTitle(webApi)'
      },
      /**
       * Computed value of method description from `method` property.
       */
      description: {
        type: String,
        computed: '_computeDescription(webApi)'
      },
      /**
       * Computed value of the `http://raml.org/vocabularies/http#server`
       * from `amfModel`
       */
      server: {
        type: Object,
        computed: '_computeServer(amfModel)'
      },
      /**
       * Computed API version label
       */
      version: {
        type: String,
        computed: '_computeVersion(webApi)'
      },
      /**
       * Computed value, true when `version` property is set.
       */
      hasVersion: {
        type: Boolean,
        computed: '_computeHasStringValue(version)'
      },
      /**
       * Computed list of protocols.
       */
      protocols: {
        type: String,
        computed: '_computeProtocols(amfModel)'
      },
      /**
       * Computed value if `protocols` property is set
       */
      hasProtocols: {
        type: Boolean,
        computed: '_computeHasArrayValue(protocols)'
      },
      /**
       * Computed value of OAS provider information.
       */
      provider: {
        type: Object,
        computed: '_computeProvider(webApi)'
      },
      /**
       * Computed value if `provider` property is set
       */
      hasProvider: {
        type: Boolean,
        computed: '_computeHasStringValue(provider)'
      },
      /**
       * Computed value of OAS provider name
       */
      providerName: {
        type: String,
        computed: '_computeName(provider)'
      },
      /**
       * Computed value of OAS provider email
       */
      providerEmail: {
        type: String,
        computed: '_computeEmail(provider)'
      },
      /**
       * Computed value of OAS provider url
       */
      providerUrl: {
        type: String,
        computed: '_computeUrl(provider)'
      },
      /**
       * Computed value of OAS terms of service
       */
      termsOfService: {
        type: String,
        computed: '_computeToS(webApi)'
      },
      /**
       * Computed value of OAS license
       */
      license: {
        type: Object,
        computed: '_computeLicense(webApi)'
      },
      /**
       * Computed value if `license` property is set
       */
      hasLicense: {
        type: Boolean,
        computed: '_computeHasStringValue(license)'
      },
      /**
       * Computed value of OAS license name
       */
      licenseName: {
        type: String,
        computed: '_computeName(license)'
      },
      /**
       * Computed value of OAS license url
       */
      licenseUrl: {
        type: String,
        computed: '_computeUrl(license)'
      },
      /**
       * Computed list of endpoints to render.
       */
      endpoints: {
        type: Array,
        computed: '_computeEndpoints(webApi)'
      },
      /**
       * Computed value, true if `endpoints` property is set and has a value.
       * @type {Object}
       */
      hasEndpoints: {
        type: Boolean,
        computed: '_computeHasArrayValue(endpoints)'
      }
    };
  }
  /**
   * Computes value of `apiTitle` property.
   *
   * @param {Object} shape Shape of AMF model.
   * @return {String|undefined} Description if defined.
   */
  _computeApiTitle(shape) {
    return this._getValue(shape, this.ns.schema.schemaName);
  }
  /**
   * Computes value for `version` property
   * @param {Object} webApi AMF's WebApi shape
   * @return {String|undefined}
   */
  _computeVersion(webApi) {
    return this._getValue(webApi, this.ns.schema.name + 'version');
  }
  /**
   * Computes API's URI based on `amfModel` and `baseUri` property.
   *
   * @param {Object} server Server model of AMF API.
   * @param {?String} baseUri Current value of `baseUri` property
   * @param {?Array<String>} protocols List of supported protocols
   * @return {String} Endpoint's URI
   */
  _computeBaseUri(server, baseUri, protocols) {
    let base = this._getBaseUri(baseUri, server, protocols);
    if (base && base[base.length - 1] === '/') {
      base = base.substr(0, base.length - 1);
    }
    if (!base) {
      base = 'Base URI not defined in the API file.';
    }
    return base;
  }

  // Displays array values.
  _displayArray(arr) {
    if (!arr || !arr.length) {
      return;
    }
    if (!(arr instanceof Array)) {
      return arr;
    }
    return arr.join(', ');
  }
  /**
   * Computes information about provider of the API.
   *
   * @param {Object} webApi WebApi shape
   * @return {Object|undefined}
   */
  _computeProvider(webApi) {
    const key = this._getAmfKey(this.ns.schema.name + 'provider');
    let data = this._ensureArray(webApi[key]);
    if (!data) {
      return;
    }
    data = data[0];
    if (data instanceof Array) {
      data = data[0];
    }
    return data;
  }

  _computeName(provider) {
    return this._getValue(provider, this.ns.schema.schemaName);
  }

  _computeEmail(provider) {
    return this._getValue(provider, this.ns.schema.name + 'email');
  }

  _computeUrl(provider) {
    let value = this._getValue(provider, this.ns.schema.name + 'url');
    if (!value && provider) {
      const key = this._getAmfKey(this.ns.schema.name + 'url');
      let data = provider[key];
      if (data) {
        value = data instanceof Array ? data[0]['@id'] : data['@id'];
      }
    }
    return value;
  }

  _computeToS(webApi) {
    return this._getValue(webApi, this.ns.schema.name + 'termsOfService');
  }

  _computeLicense(webApi) {
    const key = this._getAmfKey(this.ns.schema.name + 'license');
    const data = webApi && webApi[key];
    if (!data) {
      return;
    }
    return data instanceof Array ? data[0] : data;
  }

  _copyPathClipboard() {
    const button = this.shadowRoot.querySelector('.copy-icon');
    if (this.$.pathCopy.copy()) {
      button.icon = 'arc:done';
    } else {
      button.icon = 'arc:error';
    }
    setTimeout(() => {
      button.icon = 'arc:content-copy';
    }, 1000);
  }
  /**
   * Computes view model for endpoints list.
   * @param {Object} webApi Web API model
   * @return {Array<Object>|undefined}
   */
  _computeEndpoints(webApi) {
    if (!webApi) {
      return;
    }
    const key = this._getAmfKey(this.ns.raml.vocabularies.http + 'endpoint');
    const endpoints = this._ensureArray(webApi[key]);
    if (!endpoints || !endpoints.length) {
      return;
    }
    return endpoints.map((item) => {
      const result = {
        name: this._getValue(item, this.ns.schema.schemaName),
        path: this._getValue(item, this.ns.raml.vocabularies.http + 'path'),
        id: item['@id'],
        ops: this._endpointOperations(item)
      };
      result.hasName = !!result.name;
      result.hasOps = !!(result.ops && result.ops.length);
      return result;
    });
  }
  /**
   * Computes a view model for supported operations for an endpoint.
   * @param {Object} endpoint Endpoint model.
   * @return {Array<Object>|unbdefined}
   */
  _endpointOperations(endpoint) {
    const key = this._getAmfKey(this.ns.w3.hydra.core + 'supportedOperation');
    const so = this._ensureArray(endpoint[key]);
    if (!so || !so.length) {
      return;
    }
    return so.map((item) => {
      return {
        id: item['@id'],
        method: this._getValue(item, this.ns.w3.hydra.core + 'method')
      };
    });
  }

  _navigateItem(e) {
    const data = e.composedPath()[0].dataset;
    if (!data.id || !data.shapeType) {
      return;
    }
    const ev = new CustomEvent('api-navigation-selection-changed', {
      bubbles: true,
      composed: true,
      detail: {
        selected: data.id,
        type: data.shapeType
      }
    });
    this.dispatchEvent(ev);
  }
}
window.customElements.define(ApiSummary.is, ApiSummary);
