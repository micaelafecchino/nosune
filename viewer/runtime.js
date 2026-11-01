// Visor del prototipo de Nosune.
// Lee las pantallas de prototipo/*.dc.html y las muestra en el navegador,
// así la versión web siempre refleja los archivos del repo.

(function () {
  'use strict';

  const BASE = 'prototipo/';
  const WHOLE = /^\s*\{\{([^}]+)\}\}\s*$/;

  class DCLogic {
    constructor(props) {
      this.props = props || {};
      this.state = {};
    }
    setState(patch) {
      const next = typeof patch === 'function' ? patch(this.state, this.props) : patch;
      this.state = Object.assign({}, this.state, next);
      if (this.__rerender) this.__rerender();
    }
    forceUpdate() {
      if (this.__rerender) this.__rerender();
    }
  }

  function resolve(path, scope) {
    const p = path.trim();
    if (p === 'true') return true;
    if (p === 'false') return false;
    if (p === 'null') return null;
    if (/^-?\d+(\.\d+)?$/.test(p)) return Number(p);
    if (/^'.*'$/.test(p) || /^".*"$/.test(p)) return p.slice(1, -1);
    return p.split('.').reduce((o, k) => (o == null ? undefined : o[k]), scope);
  }

  function interp(str, scope) {
    return str.replace(/\{\{([^}]+)\}\}/g, (_, p) => {
      const v = resolve(p, scope);
      return v == null ? '' : String(v);
    });
  }

  function screenId(file) {
    return file.split('/').pop().replace(/\.dc\.html$/, '');
  }

  function renderNodes(nodes, scope, parent) {
    for (const n of nodes) renderNode(n, scope, parent);
  }

  function renderNode(n, scope, parent) {
    if (n.nodeType === 3) {
      parent.appendChild(document.createTextNode(interp(n.nodeValue, scope)));
      return;
    }
    if (n.nodeType !== 1) return;
    const tag = n.localName;
    if (tag === 'helmet' || tag === 'script') return;

    if (tag === 'sc-for') {
      const m = WHOLE.exec(n.getAttribute('list') || '');
      const list = m ? resolve(m[1], scope) : [];
      const as = n.getAttribute('as') || 'item';
      (list || []).forEach((it, i) => {
        const child = Object.assign({}, scope, { [as]: it, $index: i });
        renderNodes(n.childNodes, child, parent);
      });
      return;
    }
    if (tag === 'sc-if') {
      const m = WHOLE.exec(n.getAttribute('value') || '');
      if (m && resolve(m[1], scope)) renderNodes(n.childNodes, scope, parent);
      return;
    }

    const el = n.namespaceURI === 'http://www.w3.org/2000/svg'
      ? document.createElementNS(n.namespaceURI, n.localName)
      : document.createElement(tag);

    for (const a of Array.from(n.attributes)) {
      const name = a.name;
      if (name.startsWith('hint-')) continue;
      const m = WHOLE.exec(a.value);

      if (name.startsWith('on')) {
        if (m) {
          const fn = resolve(m[1], scope);
          if (typeof fn === 'function') el.addEventListener(name.slice(2), (e) => fn(e));
        }
        continue;
      }
      if (m && (name === 'checked' || name === 'disabled')) {
        const v = !!resolve(m[1], scope);
        el[name] = v;
        if (v) el.setAttribute(name, '');
        continue;
      }
      const value = interp(a.value, scope);
      if (name === 'href' && /\.dc\.html$/.test(value)) {
        el.setAttribute('href', '#' + screenId(value));
        continue;
      }
      el.setAttribute(name, value);
    }

    renderNodes(n.childNodes, scope, el);
    parent.appendChild(el);
  }

  async function loadScreen(file) {
    const res = await fetch(BASE + file, { cache: 'no-cache' });
    if (!res.ok) throw new Error('No se pudo cargar ' + file);
    const doc = new DOMParser().parseFromString(await res.text(), 'text/html');
    const template = doc.querySelector('x-dc');
    const script = doc.querySelector('script[data-dc-script]');
    const propDefs = JSON.parse((script && script.getAttribute('data-props')) || '{}');
    const props = {};
    for (const [k, def] of Object.entries(propDefs)) {
      if (!k.startsWith('$') && def && 'default' in def) props[k] = def.default;
    }
    const Cls = new Function('DCLogic', (script ? script.textContent : 'class Component extends DCLogic { renderVals() { return {}; } }') + '\nreturn Component;')(DCLogic);
    const style = Array.from(template.querySelectorAll('helmet style')).map((s) => s.textContent).join('\n');
    return { file, template, Cls, props, style, title: doc.title, instance: null };
  }

  const state = { screens: [], byId: {}, current: null };

  function fit() {
    const stage = document.getElementById('stage');
    const root = document.getElementById('screen');
    const phone = root.firstElementChild;
    if (!phone) return;
    const mobile = window.innerWidth <= 560;
    document.body.classList.toggle('mobile', mobile);
    let scale, h;
    if (mobile) {
      scale = window.innerWidth / 390;
      h = window.innerHeight / scale;
    } else {
      scale = Math.min(1, (window.innerHeight - 48) / 844);
      h = 844;
    }
    phone.style.height = h + 'px';
    root.style.transform = 'scale(' + scale + ')';
    stage.style.width = 390 * scale + 'px';
    stage.style.height = h * scale + 'px';
  }

  function show(id) {
    const s = state.byId[id] || state.screens[0];
    if (!s) return;
    if (!s.instance) s.instance = new s.Cls(Object.assign({}, s.props));
    const root = document.getElementById('screen');
    document.getElementById('screen-style').textContent = s.style;
    document.title = s.title || 'Nosune';

    const draw = (keepScroll) => {
      const prev = keepScroll ? Array.from(root.querySelectorAll('main')).map((m) => m.scrollTop) : [];
      const frag = document.createDocumentFragment();
      renderNodes(s.template.childNodes, s.instance.renderVals(), frag);
      root.replaceChildren(frag);
      root.querySelectorAll('main').forEach((m, i) => { if (prev[i] != null) m.scrollTop = prev[i]; });
      fit();
    };
    s.instance.__rerender = () => draw(true);
    state.current = s;
    draw(false);

    document.querySelectorAll('#nav a').forEach((a) => {
      a.setAttribute('aria-current', a.getAttribute('href') === '#' + screenId(s.file) ? 'page' : 'false');
    });
  }

  async function start() {
    const canvas = await (await fetch(BASE + 'canvas.json', { cache: 'no-cache' })).json();
    const order = canvas.order || Object.keys(canvas.boards || {});
    const loaded = await Promise.all(order.map(loadScreen));
    loaded.forEach((s) => {
      s.label = (canvas.boards[s.file] && canvas.boards[s.file].title) || s.title;
      state.screens.push(s);
      state.byId[screenId(s.file)] = s;
    });

    const nav = document.getElementById('nav');
    nav.replaceChildren(...state.screens.map((s) => {
      const a = document.createElement('a');
      a.href = '#' + screenId(s.file);
      a.textContent = s.label;
      a.addEventListener('click', () => {
        // Al elegir desde la lista, la pantalla arranca de cero.
        s.instance = null;
      });
      return a;
    }));

    window.addEventListener('hashchange', () => show(location.hash.slice(1)));
    window.addEventListener('resize', fit);
    show(location.hash.slice(1));
  }

  start().catch((err) => {
    document.getElementById('screen').textContent = 'Error al cargar el prototipo: ' + err.message;
  });
})();
