var Wm = Object.defineProperty;
var Gm = (e, t, n) =>
  t in e
    ? Wm(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n })
    : (e[t] = n);
var Te = (e, t, n) => (Gm(e, typeof t != "symbol" ? t + "" : t, n), n);
import { _ as jm, i as W, c as Ym } from "./index-DG4TL9pd.js";
let qm = 1,
  Kl = !1,
  Zl = !1,
  To = [],
  Pn = null,
  Ql = null,
  Xm = 5,
  Sl = 0,
  Km = 300,
  Jl = null,
  La = null;
const Zm = 1073741823;
function Qm() {
  const e = new MessageChannel(),
    t = e.port2;
  if (
    ((Jl = () => t.postMessage(null)),
    (e.port1.onmessage = () => {
      if (La !== null) {
        const n = performance.now();
        Sl = n + Xm;
        const r = !0;
        try {
          La(r, n) ? t.postMessage(null) : (La = null);
        } catch (o) {
          throw (t.postMessage(null), o);
        }
      }
    }),
    navigator && navigator.scheduling && navigator.scheduling.isInputPending)
  ) {
    const n = navigator.scheduling;
    Ql = () => {
      const r = performance.now();
      return r >= Sl ? (n.isInputPending() ? !0 : r >= Km) : !1;
    };
  } else Ql = () => performance.now() >= Sl;
}
function Jm(e, t) {
  function n() {
    let r = 0,
      o = e.length - 1;
    for (; r <= o; ) {
      const i = (o + r) >> 1,
        a = t.expirationTime - e[i].expirationTime;
      if (a > 0) r = i + 1;
      else if (a < 0) o = i - 1;
      else return i;
    }
    return r;
  }
  e.splice(n(), 0, t);
}
function e0(e, t) {
  Jl || Qm();
  let n = performance.now(),
    r = Zm;
  t && t.timeout && (r = t.timeout);
  const o = { id: qm++, fn: e, startTime: n, expirationTime: n + r };
  return Jm(To, o), !Kl && !Zl && ((Kl = !0), (La = t0), Jl()), o;
}
function t0(e, t) {
  (Kl = !1), (Zl = !0);
  try {
    return n0(e, t);
  } finally {
    (Pn = null), (Zl = !1);
  }
}
function n0(e, t) {
  let n = t;
  for (
    Pn = To[0] || null;
    Pn !== null && !(Pn.expirationTime > n && (!e || Ql()));

  ) {
    const r = Pn.fn;
    if (r !== null) {
      Pn.fn = null;
      const o = Pn.expirationTime <= n;
      r(o), (n = performance.now()), Pn === To[0] && To.shift();
    } else To.shift();
    Pn = To[0] || null;
  }
  return Pn !== null;
}
const r0 = { context: void 0, registry: void 0 },
  o0 = (e, t) => e === t,
  Sn = Symbol("solid-proxy"),
  Ha = Symbol("solid-track"),
  Va = { equals: o0 };
let Di = null,
  zg = Yg;
const Fn = 1,
  Wa = 2,
  Hg = { owned: null, cleanups: null, context: null, owner: null },
  El = {};
var xe = null;
let Cl = null,
  i0 = null,
  Fe = null,
  Tt = null,
  bn = null,
  Ss = 0;
function Vr(e, t) {
  const n = Fe,
    r = xe,
    o = e.length === 0,
    i = t === void 0 ? r : t,
    a = o
      ? Hg
      : {
          owned: null,
          cleanups: null,
          context: i ? i.context : null,
          owner: i,
        },
    s = o ? e : () => e(() => He(() => Es(a)));
  (xe = a), (Fe = null);
  try {
    return _n(s, !0);
  } finally {
    (Fe = n), (xe = r);
  }
}
function N(e, t) {
  t = t ? Object.assign({}, Va, t) : Va;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    r = (o) => (typeof o == "function" && (o = o(n.value)), jg(n, o));
  return [Gg.bind(n), r];
}
function ec(e, t, n) {
  const r = Yo(e, t, !0, Fn);
  no(r);
}
function $(e, t, n) {
  const r = Yo(e, t, !1, Fn);
  no(r);
}
function ie(e, t, n) {
  zg = f0;
  const r = Yo(e, t, !1, Fn);
  (!n || !n.render) && (r.user = !0), bn ? bn.push(r) : no(r);
}
function L(e, t, n) {
  n = n ? Object.assign({}, Va, n) : Va;
  const r = Yo(e, t, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    no(r),
    Gg.bind(r)
  );
}
function a0(e) {
  return e && typeof e == "object" && "then" in e;
}
function tc(e, t, n) {
  let r, o, i;
  (arguments.length === 2 && typeof t == "object") || arguments.length === 1
    ? ((r = !0), (o = e), (i = t || {}))
    : ((r = e), (o = t), (i = n || {}));
  let a = null,
    s = El,
    c = !1,
    u = "initialValue" in i,
    d = typeof r == "function" && L(r);
  const g = new Set(),
    [f, m] = (i.storage || N)(i.initialValue),
    [y, b] = N(void 0),
    [v, S] = N(void 0, { equals: !1 }),
    [A, k] = N(u ? "ready" : "unresolved");
  function T(x, _, R, z) {
    return (
      a === x &&
        ((a = null),
        z !== void 0 && (u = !0),
        (x === s || _ === s) &&
          i.onHydrated &&
          queueMicrotask(() => i.onHydrated(z, { value: _ })),
        (s = El),
        E(_, R)),
      _
    );
  }
  function E(x, _) {
    _n(() => {
      _ === void 0 && m(() => x),
        k(_ !== void 0 ? "errored" : u ? "ready" : "unresolved"),
        b(_);
      for (const R of g.keys()) R.decrement();
      g.clear();
    }, !1);
  }
  function P() {
    const x = u0,
      _ = f(),
      R = y();
    if (R !== void 0 && !a) throw R;
    return (
      Fe &&
        !Fe.user &&
        x &&
        ec(() => {
          v(), a && (x.resolved || g.has(x) || (x.increment(), g.add(x)));
        }),
      _
    );
  }
  function M(x = !0) {
    if (x !== !1 && c) return;
    c = !1;
    const _ = d ? d() : r;
    if (_ == null || _ === !1) {
      T(a, He(f));
      return;
    }
    const R = s !== El ? s : He(() => o(_, { value: f(), refetching: x }));
    return a0(R)
      ? ((a = R),
        "value" in R
          ? (R.status === "success"
              ? T(a, R.value, void 0, _)
              : T(a, void 0, void 0, _),
            R)
          : ((c = !0),
            queueMicrotask(() => (c = !1)),
            _n(() => {
              k(u ? "refreshing" : "pending"), S();
            }, !1),
            R.then(
              (z) => T(R, z, void 0, _),
              (z) => T(R, void 0, Xg(z), _)
            )))
      : (T(a, R, void 0, _), R);
  }
  return (
    Object.defineProperties(P, {
      state: { get: () => A() },
      error: { get: () => y() },
      loading: {
        get() {
          const x = A();
          return x === "pending" || x === "refreshing";
        },
      },
      latest: {
        get() {
          if (!u) return P();
          const x = y();
          if (x && !a) throw x;
          return f();
        },
      },
    }),
    d ? ec(() => M(!1)) : M(!1),
    [P, { refetch: M, mutate: m }]
  );
}
function s0(e, t) {
  let n,
    r = t ? t.timeoutMs : void 0;
  const o = Yo(
      () => (
        (!n || !n.fn) &&
          (n = e0(
            () => a(() => o.value),
            r !== void 0 ? { timeout: r } : void 0
          )),
        e()
      ),
      void 0,
      !0
    ),
    [i, a] = N(o.value, t);
  return no(o), a(() => o.value), i;
}
function Zn(e) {
  return _n(e, !1);
}
function He(e) {
  if (Fe === null) return e();
  const t = Fe;
  Fe = null;
  try {
    return e();
  } finally {
    Fe = t;
  }
}
function pe(e, t, n) {
  const r = Array.isArray(e);
  let o,
    i = n && n.defer;
  return (a) => {
    let s;
    if (r) {
      s = Array(e.length);
      for (let u = 0; u < e.length; u++) s[u] = e[u]();
    } else s = e();
    if (i) return (i = !1), a;
    const c = He(() => t(s, o, a));
    return (o = s), c;
  };
}
function Lt(e) {
  ie(() => He(e));
}
function De(e) {
  return (
    xe === null ||
      (xe.cleanups === null ? (xe.cleanups = [e]) : xe.cleanups.push(e)),
    e
  );
}
function l0(e, t) {
  Di || (Di = Symbol("error")),
    (xe = Yo(void 0, void 0, !0)),
    (xe.context = { ...xe.context, [Di]: [t] });
  try {
    return e();
  } catch (n) {
    Zi(n);
  } finally {
    xe = xe.owner;
  }
}
function nc() {
  return Fe;
}
function jo() {
  return xe;
}
function Gc(e, t) {
  const n = xe,
    r = Fe;
  (xe = e), (Fe = null);
  try {
    return _n(t, !0);
  } catch (o) {
    Zi(o);
  } finally {
    (xe = n), (Fe = r);
  }
}
function Vg(e) {
  const t = Fe,
    n = xe;
  return Promise.resolve().then(() => {
    (Fe = t), (xe = n);
    let r;
    return _n(e, !1), (Fe = xe = null), r ? r.done : void 0;
  });
}
const [c0, FT] = N(!1);
function Wg() {
  return [c0, Vg];
}
function on(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: h0(n), defaultValue: e };
}
function Y(e) {
  return xe && xe.context && xe.context[e.id] !== void 0
    ? xe.context[e.id]
    : e.defaultValue;
}
function Ki(e) {
  const t = L(e),
    n = L(() => rc(t()));
  return (
    (n.toArray = () => {
      const r = n();
      return Array.isArray(r) ? r : r != null ? [r] : [];
    }),
    n
  );
}
let u0;
function Gg() {
  if (this.sources && this.state)
    if (this.state === Fn) no(this);
    else {
      const e = Tt;
      (Tt = null), _n(() => ja(this), !1), (Tt = e);
    }
  if (Fe) {
    const e = this.observers ? this.observers.length : 0;
    Fe.sources
      ? (Fe.sources.push(this), Fe.sourceSlots.push(e))
      : ((Fe.sources = [this]), (Fe.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(Fe),
          this.observerSlots.push(Fe.sources.length - 1))
        : ((this.observers = [Fe]),
          (this.observerSlots = [Fe.sources.length - 1]));
  }
  return this.value;
}
function jg(e, t, n) {
  let r = e.value;
  return (
    (!e.comparator || !e.comparator(r, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        _n(() => {
          for (let o = 0; o < e.observers.length; o += 1) {
            const i = e.observers[o],
              a = Cl && Cl.running;
            a && Cl.disposed.has(i),
              (a ? !i.tState : !i.state) &&
                (i.pure ? Tt.push(i) : bn.push(i), i.observers && qg(i)),
              a || (i.state = Fn);
          }
          if (Tt.length > 1e6) throw ((Tt = []), new Error());
        }, !1)),
    t
  );
}
function no(e) {
  if (!e.fn) return;
  Es(e);
  const t = Ss;
  d0(e, e.value, t);
}
function d0(e, t, n) {
  let r;
  const o = xe,
    i = Fe;
  Fe = xe = e;
  try {
    r = e.fn(t);
  } catch (a) {
    return (
      e.pure &&
        ((e.state = Fn), e.owned && e.owned.forEach(Es), (e.owned = null)),
      (e.updatedAt = n + 1),
      Zi(a)
    );
  } finally {
    (Fe = i), (xe = o);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? jg(e, r) : (e.value = r),
    (e.updatedAt = n));
}
function Yo(e, t, n, r = Fn, o) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: xe,
    context: xe ? xe.context : null,
    pure: n,
  };
  return (
    xe === null ||
      (xe !== Hg && (xe.owned ? xe.owned.push(i) : (xe.owned = [i]))),
    i
  );
}
function Ga(e) {
  if (e.state === 0) return;
  if (e.state === Wa) return ja(e);
  if (e.suspense && He(e.suspense.inFallback))
    return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < Ss); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === Fn)) no(e);
    else if (e.state === Wa) {
      const r = Tt;
      (Tt = null), _n(() => ja(e, t[0]), !1), (Tt = r);
    }
}
function _n(e, t) {
  if (Tt) return e();
  let n = !1;
  t || (Tt = []), bn ? (n = !0) : (bn = []), Ss++;
  try {
    const r = e();
    return g0(n), r;
  } catch (r) {
    n || (bn = null), (Tt = null), Zi(r);
  }
}
function g0(e) {
  if ((Tt && (Yg(Tt), (Tt = null)), e)) return;
  const t = bn;
  (bn = null), t.length && _n(() => zg(t), !1);
}
function Yg(e) {
  for (let t = 0; t < e.length; t++) Ga(e[t]);
}
function f0(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? (e[n++] = r) : Ga(r);
  }
  for (t = 0; t < n; t++) Ga(e[t]);
}
function ja(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n];
    if (r.sources) {
      const o = r.state;
      o === Fn
        ? r !== t && (!r.updatedAt || r.updatedAt < Ss) && Ga(r)
        : o === Wa && ja(r, t);
    }
  }
}
function qg(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = Wa), n.pure ? Tt.push(n) : bn.push(n), n.observers && qg(n));
  }
}
function Es(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        r = e.sourceSlots.pop(),
        o = n.observers;
      if (o && o.length) {
        const i = o.pop(),
          a = n.observerSlots.pop();
        r < o.length &&
          ((i.sourceSlots[a] = r), (o[r] = i), (n.observerSlots[r] = a));
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) Es(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}
function Xg(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function td(e, t, n) {
  try {
    for (const r of t) r(e);
  } catch (r) {
    Zi(r, (n && n.owner) || null);
  }
}
function Zi(e, t = xe) {
  const n = Di && t && t.context && t.context[Di],
    r = Xg(e);
  if (!n) throw r;
  bn
    ? bn.push({
        fn() {
          td(r, n, t);
        },
        state: Fn,
      })
    : td(r, n, t);
}
function rc(e) {
  if (typeof e == "function" && !e.length) return rc(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = rc(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function h0(e, t) {
  return function (r) {
    let o;
    return (
      $(
        () =>
          (o = He(
            () => (
              (xe.context = { ...xe.context, [e]: r.value }),
              Ki(() => r.children)
            )
          )),
        void 0
      ),
      o
    );
  };
}
const m0 = Symbol("fallback");
function nd(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function y0(e, t, n = {}) {
  let r = [],
    o = [],
    i = [],
    a = 0,
    s = t.length > 1 ? [] : null;
  return (
    De(() => nd(i)),
    () => {
      let c = e() || [],
        u,
        d;
      return (
        c[Ha],
        He(() => {
          let f = c.length,
            m,
            y,
            b,
            v,
            S,
            A,
            k,
            T,
            E;
          if (f === 0)
            a !== 0 &&
              (nd(i), (i = []), (r = []), (o = []), (a = 0), s && (s = [])),
              n.fallback &&
                ((r = [m0]),
                (o[0] = Vr((P) => ((i[0] = P), n.fallback()))),
                (a = 1));
          else if (a === 0) {
            for (o = new Array(f), d = 0; d < f; d++)
              (r[d] = c[d]), (o[d] = Vr(g));
            a = f;
          } else {
            for (
              b = new Array(f),
                v = new Array(f),
                s && (S = new Array(f)),
                A = 0,
                k = Math.min(a, f);
              A < k && r[A] === c[A];
              A++
            );
            for (
              k = a - 1, T = f - 1;
              k >= A && T >= A && r[k] === c[T];
              k--, T--
            )
              (b[T] = o[k]), (v[T] = i[k]), s && (S[T] = s[k]);
            for (m = new Map(), y = new Array(T + 1), d = T; d >= A; d--)
              (E = c[d]),
                (u = m.get(E)),
                (y[d] = u === void 0 ? -1 : u),
                m.set(E, d);
            for (u = A; u <= k; u++)
              (E = r[u]),
                (d = m.get(E)),
                d !== void 0 && d !== -1
                  ? ((b[d] = o[u]),
                    (v[d] = i[u]),
                    s && (S[d] = s[u]),
                    (d = y[d]),
                    m.set(E, d))
                  : i[u]();
            for (d = A; d < f; d++)
              d in b
                ? ((o[d] = b[d]), (i[d] = v[d]), s && ((s[d] = S[d]), s[d](d)))
                : (o[d] = Vr(g));
            (o = o.slice(0, (a = f))), (r = c.slice(0));
          }
          return o;
        })
      );
      function g(f) {
        if (((i[d] = f), s)) {
          const [m, y] = N(d);
          return (s[d] = y), t(c[d], m);
        }
        return t(c[d]);
      }
    }
  );
}
function l(e, t) {
  return He(() => e(t || {}));
}
function ha() {
  return !0;
}
const oc = {
  get(e, t, n) {
    return t === Sn ? n : e.get(t);
  },
  has(e, t) {
    return t === Sn ? !0 : e.has(t);
  },
  set: ha,
  deleteProperty: ha,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: ha,
      deleteProperty: ha,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function Al(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function p0() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function F(...e) {
  let t = !1;
  for (let a = 0; a < e.length; a++) {
    const s = e[a];
    (t = t || (!!s && Sn in s)),
      (e[a] = typeof s == "function" ? ((t = !0), L(s)) : s);
  }
  if (t)
    return new Proxy(
      {
        get(a) {
          for (let s = e.length - 1; s >= 0; s--) {
            const c = Al(e[s])[a];
            if (c !== void 0) return c;
          }
        },
        has(a) {
          for (let s = e.length - 1; s >= 0; s--) if (a in Al(e[s])) return !0;
          return !1;
        },
        keys() {
          const a = [];
          for (let s = 0; s < e.length; s++) a.push(...Object.keys(Al(e[s])));
          return [...new Set(a)];
        },
      },
      oc
    );
  const n = {},
    r = Object.create(null);
  for (let a = e.length - 1; a >= 0; a--) {
    const s = e[a];
    if (!s) continue;
    const c = Object.getOwnPropertyNames(s);
    for (let u = c.length - 1; u >= 0; u--) {
      const d = c[u];
      if (d === "__proto__" || d === "constructor") continue;
      const g = Object.getOwnPropertyDescriptor(s, d);
      if (!r[d])
        r[d] = g.get
          ? {
              enumerable: !0,
              configurable: !0,
              get: p0.bind((n[d] = [g.get.bind(s)])),
            }
          : g.value !== void 0
          ? g
          : void 0;
      else {
        const f = n[d];
        f &&
          (g.get
            ? f.push(g.get.bind(s))
            : g.value !== void 0 && f.push(() => g.value));
      }
    }
  }
  const o = {},
    i = Object.keys(r);
  for (let a = i.length - 1; a >= 0; a--) {
    const s = i[a],
      c = r[s];
    c && c.get ? Object.defineProperty(o, s, c) : (o[s] = c ? c.value : void 0);
  }
  return o;
}
function Ve(e, ...t) {
  if (Sn in e) {
    const o = new Set(t.length > 1 ? t.flat() : t[0]),
      i = t.map(
        (a) =>
          new Proxy(
            {
              get(s) {
                return a.includes(s) ? e[s] : void 0;
              },
              has(s) {
                return a.includes(s) && s in e;
              },
              keys() {
                return a.filter((s) => s in e);
              },
            },
            oc
          )
      );
    return (
      i.push(
        new Proxy(
          {
            get(a) {
              return o.has(a) ? void 0 : e[a];
            },
            has(a) {
              return o.has(a) ? !1 : a in e;
            },
            keys() {
              return Object.keys(e).filter((a) => !o.has(a));
            },
          },
          oc
        )
      ),
      i
    );
  }
  const n = {},
    r = t.map(() => ({}));
  for (const o of Object.getOwnPropertyNames(e)) {
    const i = Object.getOwnPropertyDescriptor(e, o),
      a = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
    let s = !1,
      c = 0;
    for (const u of t)
      u.includes(o) &&
        ((s = !0), a ? (r[c][o] = i.value) : Object.defineProperty(r[c], o, i)),
        ++c;
    s || (a ? (n[o] = i.value) : Object.defineProperty(n, o, i));
  }
  return [...r, n];
}
const Kg = (e) => `Stale read from <${e}>.`;
function Qe(e) {
  const t = "fallback" in e && { fallback: () => e.fallback };
  return L(y0(() => e.each, e.children, t || void 0));
}
function D(e) {
  const t = e.keyed,
    n = L(() => e.when, void 0, { equals: (r, o) => (t ? r === o : !r == !o) });
  return L(
    () => {
      const r = n();
      if (r) {
        const o = e.children;
        return typeof o == "function" && o.length > 0
          ? He(() =>
              o(
                t
                  ? r
                  : () => {
                      if (!He(n)) throw Kg("Show");
                      return e.when;
                    }
              )
            )
          : o;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
function qo(e) {
  let t = !1;
  const n = (i, a) => (t ? i[1] === a[1] : !i[1] == !a[1]) && i[2] === a[2],
    r = Ki(() => e.children),
    o = L(
      () => {
        let i = r();
        Array.isArray(i) || (i = [i]);
        for (let a = 0; a < i.length; a++) {
          const s = i[a].when;
          if (s) return (t = !!i[a].keyed), [a, s, i[a]];
        }
        return [-1];
      },
      void 0,
      { equals: n }
    );
  return L(
    () => {
      const [i, a, s] = o();
      if (i < 0) return e.fallback;
      const c = s.children;
      return typeof c == "function" && c.length > 0
        ? He(() =>
            c(
              t
                ? a
                : () => {
                    if (He(o)[0] !== i) throw Kg("Match");
                    return s.when;
                  }
            )
          )
        : c;
    },
    void 0,
    void 0
  );
}
function kt(e) {
  return e;
}
let Mo;
function rd() {
  Mo && [...Mo].forEach((e) => e());
}
function v0(e) {
  let t;
  const [n, r] = N(t, void 0);
  return (
    Mo || (Mo = new Set()),
    Mo.add(r),
    De(() => Mo.delete(r)),
    L(
      () => {
        let o;
        if ((o = n())) {
          const i = e.fallback;
          return typeof i == "function" && i.length
            ? He(() => i(o, () => r()))
            : i;
        }
        return l0(() => e.children, r);
      },
      void 0,
      void 0
    )
  );
}
const b0 = void 0,
  w0 = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "inert",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
  ],
  S0 = new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    ...w0,
  ]),
  E0 = new Set(["innerHTML", "textContent", "innerText", "children"]),
  C0 = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
  }),
  A0 = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: { $: "formNoValidate", BUTTON: 1, INPUT: 1 },
    ismap: { $: "isMap", IMG: 1 },
    nomodule: { $: "noModule", SCRIPT: 1 },
    playsinline: { $: "playsInline", VIDEO: 1 },
    readonly: { $: "readOnly", INPUT: 1, TEXTAREA: 1 },
  });
function I0(e, t) {
  const n = A0[e];
  return typeof n == "object" ? (n[t] ? n.$ : void 0) : n;
}
const x0 = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ]),
  k0 = new Set([
    "altGlyph",
    "altGlyphDef",
    "altGlyphItem",
    "animate",
    "animateColor",
    "animateMotion",
    "animateTransform",
    "circle",
    "clipPath",
    "color-profile",
    "cursor",
    "defs",
    "desc",
    "ellipse",
    "feBlend",
    "feColorMatrix",
    "feComponentTransfer",
    "feComposite",
    "feConvolveMatrix",
    "feDiffuseLighting",
    "feDisplacementMap",
    "feDistantLight",
    "feFlood",
    "feFuncA",
    "feFuncB",
    "feFuncG",
    "feFuncR",
    "feGaussianBlur",
    "feImage",
    "feMerge",
    "feMergeNode",
    "feMorphology",
    "feOffset",
    "fePointLight",
    "feSpecularLighting",
    "feSpotLight",
    "feTile",
    "feTurbulence",
    "filter",
    "font",
    "font-face",
    "font-face-format",
    "font-face-name",
    "font-face-src",
    "font-face-uri",
    "foreignObject",
    "g",
    "glyph",
    "glyphRef",
    "hkern",
    "image",
    "line",
    "linearGradient",
    "marker",
    "mask",
    "metadata",
    "missing-glyph",
    "mpath",
    "path",
    "pattern",
    "polygon",
    "polyline",
    "radialGradient",
    "rect",
    "set",
    "stop",
    "svg",
    "switch",
    "symbol",
    "text",
    "textPath",
    "tref",
    "tspan",
    "use",
    "view",
    "vkern",
  ]),
  T0 = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  };
function L0(e, t, n) {
  let r = n.length,
    o = t.length,
    i = r,
    a = 0,
    s = 0,
    c = t[o - 1].nextSibling,
    u = null;
  for (; a < o || s < i; ) {
    if (t[a] === n[s]) {
      a++, s++;
      continue;
    }
    for (; t[o - 1] === n[i - 1]; ) o--, i--;
    if (o === a) {
      const d = i < r ? (s ? n[s - 1].nextSibling : n[i - s]) : c;
      for (; s < i; ) e.insertBefore(n[s++], d);
    } else if (i === s)
      for (; a < o; ) (!u || !u.has(t[a])) && t[a].remove(), a++;
    else if (t[a] === n[i - 1] && n[s] === t[o - 1]) {
      const d = t[--o].nextSibling;
      e.insertBefore(n[s++], t[a++].nextSibling),
        e.insertBefore(n[--i], d),
        (t[o] = n[i]);
    } else {
      if (!u) {
        u = new Map();
        let g = s;
        for (; g < i; ) u.set(n[g], g++);
      }
      const d = u.get(t[a]);
      if (d != null)
        if (s < d && d < i) {
          let g = a,
            f = 1,
            m;
          for (
            ;
            ++g < o && g < i && !((m = u.get(t[g])) == null || m !== d + f);

          )
            f++;
          if (f > d - s) {
            const y = t[a];
            for (; s < d; ) e.insertBefore(n[s++], y);
          } else e.replaceChild(n[s++], t[a++]);
        } else a++;
      else t[a++].remove();
    }
  }
}
const od = "_$DX_DELEGATE";
function P0(e, t, n, r = {}) {
  let o;
  return (
    Vr((i) => {
      (o = i),
        t === document ? e() : p(t, e(), t.firstChild ? null : void 0, n);
    }, r.owner),
    () => {
      o(), (t.textContent = "");
    }
  );
}
function w(e, t, n) {
  let r;
  const o = () => {
      const a = document.createElement("template");
      return (
        (a.innerHTML = e),
        n ? a.content.firstChild.firstChild : a.content.firstChild
      );
    },
    i = t
      ? () => He(() => document.importNode(r || (r = o()), !0))
      : () => (r || (r = o())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function Bn(e, t = window.document) {
  const n = t[od] || (t[od] = new Set());
  for (let r = 0, o = e.length; r < o; r++) {
    const i = e[r];
    n.has(i) || (n.add(i), t.addEventListener(i, N0));
  }
}
function Xe(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function M0(e, t, n, r) {
  r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r);
}
function I(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function $0(e, t, n, r) {
  if (r)
    Array.isArray(n)
      ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
      : (e[`$$${t}`] = n);
  else if (Array.isArray(n)) {
    const o = n[0];
    e.addEventListener(t, (n[0] = (i) => o.call(e, n[1], i)));
  } else e.addEventListener(t, n);
}
function R0(e, t, n = {}) {
  const r = Object.keys(t || {}),
    o = Object.keys(n);
  let i, a;
  for (i = 0, a = o.length; i < a; i++) {
    const s = o[i];
    !s || s === "undefined" || t[s] || (id(e, s, !1), delete n[s]);
  }
  for (i = 0, a = r.length; i < a; i++) {
    const s = r[i],
      c = !!t[s];
    !s || s === "undefined" || n[s] === c || !c || (id(e, s, !0), (n[s] = c));
  }
  return n;
}
function D0(e, t, n) {
  if (!t) return n ? Xe(e, "style") : t;
  const r = e.style;
  if (typeof t == "string") return (r.cssText = t);
  typeof n == "string" && (r.cssText = n = void 0),
    n || (n = {}),
    t || (t = {});
  let o, i;
  for (i in n) t[i] == null && r.removeProperty(i), delete n[i];
  for (i in t) (o = t[i]), o !== n[i] && (r.setProperty(i, o), (n[i] = o));
  return n;
}
function Je(e, t = {}, n, r) {
  const o = {};
  return (
    r || $(() => (o.children = Fo(e, t.children, o.children))),
    $(() => t.ref && t.ref(e)),
    $(() => _0(e, t, n, !0, o, !0)),
    o
  );
}
function tt(e, t, n) {
  return He(() => e(t, n));
}
function p(e, t, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof t != "function"))
    return Fo(e, t, r, n);
  $((o) => Fo(e, t(), o, n), r);
}
function _0(e, t, n, r, o = {}, i = !1) {
  t || (t = {});
  for (const a in o)
    if (!(a in t)) {
      if (a === "children") continue;
      o[a] = ad(e, a, null, o[a], n, i);
    }
  for (const a in t) {
    if (a === "children") {
      r || Fo(e, t.children);
      continue;
    }
    const s = t[a];
    o[a] = ad(e, a, s, o[a], n, i);
  }
}
function O0(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function id(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let o = 0, i = r.length; o < i; o++) e.classList.toggle(r[o], n);
}
function ad(e, t, n, r, o, i) {
  let a, s, c, u, d;
  if (t === "style") return D0(e, n, r);
  if (t === "classList") return R0(e, n, r);
  if (n === r) return r;
  if (t === "ref") i || n(e);
  else if (t.slice(0, 3) === "on:") {
    const g = t.slice(3);
    r && e.removeEventListener(g, r), n && e.addEventListener(g, n);
  } else if (t.slice(0, 10) === "oncapture:") {
    const g = t.slice(10);
    r && e.removeEventListener(g, r, !0), n && e.addEventListener(g, n, !0);
  } else if (t.slice(0, 2) === "on") {
    const g = t.slice(2).toLowerCase(),
      f = x0.has(g);
    if (!f && r) {
      const m = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(g, m);
    }
    (f || n) && ($0(e, g, n, f), f && Bn([g]));
  } else if (t.slice(0, 5) === "attr:") Xe(e, t.slice(5), n);
  else if (
    (d = t.slice(0, 5) === "prop:") ||
    (c = E0.has(t)) ||
    (!o && ((u = I0(t, e.tagName)) || (s = S0.has(t)))) ||
    (a = e.nodeName.includes("-"))
  )
    d && ((t = t.slice(5)), (s = !0)),
      t === "class" || t === "className"
        ? I(e, n)
        : a && !s && !c
        ? (e[O0(t)] = n)
        : (e[u || t] = n);
  else {
    const g = o && t.indexOf(":") > -1 && T0[t.split(":")[0]];
    g ? M0(e, g, t, n) : Xe(e, C0[t] || t, n);
  }
  return n;
}
function N0(e) {
  const t = `$$${e.type}`;
  let n = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== n &&
      Object.defineProperty(e, "target", { configurable: !0, value: n }),
      Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get() {
          return n || document;
        },
      });
    n;

  ) {
    const r = n[t];
    if (r && !n.disabled) {
      const o = n[`${t}Data`];
      if ((o !== void 0 ? r.call(n, o, e) : r.call(n, e), e.cancelBubble))
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function Fo(e, t, n, r, o) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const i = typeof t,
    a = r !== void 0;
  if (
    ((e = (a && n[0] && n[0].parentNode) || e),
    i === "string" || i === "number")
  )
    if ((i === "number" && (t = t.toString()), a)) {
      let s = n[0];
      s && s.nodeType === 3
        ? s.data !== t && (s.data = t)
        : (s = document.createTextNode(t)),
        (n = Ao(e, n, r, s));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  else if (t == null || i === "boolean") n = Ao(e, n, r);
  else {
    if (i === "function")
      return (
        $(() => {
          let s = t();
          for (; typeof s == "function"; ) s = s();
          n = Fo(e, s, n, r);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const s = [],
        c = n && Array.isArray(n);
      if (ic(s, t, n, o)) return $(() => (n = Fo(e, s, n, r, !0))), () => n;
      if (s.length === 0) {
        if (((n = Ao(e, n, r)), a)) return n;
      } else
        c
          ? n.length === 0
            ? sd(e, s, r)
            : L0(e, n, s)
          : (n && Ao(e), sd(e, s));
      n = s;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (a) return (n = Ao(e, n, r, t));
        Ao(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}
function ic(e, t, n, r) {
  let o = !1;
  for (let i = 0, a = t.length; i < a; i++) {
    let s = t[i],
      c = n && n[e.length],
      u;
    if (!(s == null || s === !0 || s === !1))
      if ((u = typeof s) == "object" && s.nodeType) e.push(s);
      else if (Array.isArray(s)) o = ic(e, s, c) || o;
      else if (u === "function")
        if (r) {
          for (; typeof s == "function"; ) s = s();
          o =
            ic(e, Array.isArray(s) ? s : [s], Array.isArray(c) ? c : [c]) || o;
        } else e.push(s), (o = !0);
      else {
        const d = String(s);
        c && c.nodeType === 3 && c.data === d
          ? e.push(c)
          : e.push(document.createTextNode(d));
      }
  }
  return o;
}
function sd(e, t, n = null) {
  for (let r = 0, o = t.length; r < o; r++) e.insertBefore(t[r], n);
}
function Ao(e, t, n, r) {
  if (n === void 0) return (e.textContent = "");
  const o = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let a = t.length - 1; a >= 0; a--) {
      const s = t[a];
      if (o !== s) {
        const c = s.parentNode === e;
        !i && !a
          ? c
            ? e.replaceChild(o, s)
            : e.insertBefore(o, n)
          : c && s.remove();
      } else i = !0;
    }
  } else e.insertBefore(o, n);
  return [o];
}
const F0 = !1,
  B0 = "http://www.w3.org/2000/svg";
function Zg(e, t = !1) {
  return t ? document.createElementNS(B0, e) : document.createElement(e);
}
function U0(e) {
  const { useShadow: t } = e,
    n = document.createTextNode(""),
    r = () => e.mount || document.body,
    o = jo();
  let i,
    a = !!r0.context;
  return (
    ie(
      () => {
        i || (i = Gc(o, () => L(() => e.children)));
        const s = r();
        if (s instanceof HTMLHeadElement) {
          const [c, u] = N(!1),
            d = () => u(!0);
          Vr((g) => p(s, () => (c() ? g() : i()), null)), De(d);
        } else {
          const c = Zg(e.isSVG ? "g" : "div", e.isSVG),
            u = t && c.attachShadow ? c.attachShadow({ mode: "open" }) : c;
          Object.defineProperty(c, "_$host", {
            get() {
              return n.parentNode;
            },
            configurable: !0,
          }),
            p(u, i),
            s.appendChild(c),
            e.ref && e.ref(c),
            De(() => s.removeChild(c));
        }
      },
      void 0,
      { render: !a }
    ),
    n
  );
}
function jt(e) {
  const [t, n] = Ve(e, ["component"]),
    r = L(() => t.component);
  return L(() => {
    const o = r();
    switch (typeof o) {
      case "function":
        return He(() => o(n));
      case "string":
        const i = k0.has(o),
          a = Zg(o, i);
        return Je(a, n, i), a;
    }
  });
}
var ld = function (e, t) {
    var n = typeof Symbol == "function" && e[Symbol.iterator];
    if (!n) return e;
    var r = n.call(e),
      o,
      i = [],
      a;
    try {
      for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; )
        i.push(o.value);
    } catch (s) {
      a = { error: s };
    } finally {
      try {
        o && !o.done && (n = r.return) && n.call(r);
      } finally {
        if (a) throw a.error;
      }
    }
    return i;
  },
  cd = function (e, t, n) {
    if (n || arguments.length === 2)
      for (var r = 0, o = t.length, i; r < o; r++)
        (i || !(r in t)) &&
          (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
    return e.concat(i || Array.prototype.slice.call(t));
  },
  z0 = (function () {
    function e(t, n) {
      n === void 0 && (n = {}), (this.language = t), (this.resource = n);
    }
    return (
      (e.prototype.__ = function (t) {
        for (var n = [], r = 1; r < arguments.length; r++)
          n[r - 1] = arguments[r];
        var o = H0(this.resource[t] || t);
        return V0.apply(void 0, cd([o], ld(n), !1));
      }),
      (e.prototype.__n = function (t, n, r) {
        for (var o = [], i = 3; i < arguments.length; i++)
          o[i - 3] = arguments[i];
        var a = r === 1 ? t : n;
        return this.__.apply(this, cd([a], ld(o), !1));
      }),
      e
    );
  })();
function H0(e) {
  var t = /^\[!\w+\]/.exec(e);
  return t ? e.substr(t[0].length) : e;
}
function V0(e) {
  for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
  var r = 0;
  return e.replace(/%s/g, function () {
    return t[r++];
  });
}
function W0() {
  return (
    typeof process == "object" &&
    typeof process.versions == "object" &&
    typeof process.versions.node != "undefined"
  );
}
var G0 = function (e, t) {
    var n = typeof Symbol == "function" && e[Symbol.iterator];
    if (!n) return e;
    var r = n.call(e),
      o,
      i = [],
      a;
    try {
      for (; (t === void 0 || t-- > 0) && !(o = r.next()).done; )
        i.push(o.value);
    } catch (s) {
      a = { error: s };
    } finally {
      try {
        o && !o.done && (n = r.return) && n.call(r);
      } finally {
        if (a) throw a.error;
      }
    }
    return i;
  },
  j0 = function (e, t, n) {
    if (n || arguments.length === 2)
      for (var r = 0, o = t.length, i; r < o; r++)
        (i || !(r in t)) &&
          (i || (i = Array.prototype.slice.call(t, 0, r)), (i[r] = t[r]));
    return e.concat(i || Array.prototype.slice.call(t));
  };
if (W0()) throw new Error("This module should not be used in the Node.js");
var ac;
function Qg(e, t) {
  ac = new z0(e, t);
}
var h = function () {
  for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
  return ac.__.apply(ac, j0([], G0(e), !1));
};
window.appLanguage && Qg(window.appLanguage, window.appLanguageResource);
const Y0 = "中午",
  q0 = "午夜",
  X0 = "在",
  K0 = "昨天",
  Z0 = "网站",
  Q0 = "查看",
  J0 = "用户名",
  e1 = "升级",
  t1 = "取消订阅",
  n1 = "标题",
  r1 = "主题",
  o1 = "标签",
  i1 = "订阅",
  a1 = "分享",
  s1 = "设置",
  l1 = "发送",
  c1 = "保存",
  u1 = "重试",
  d1 = "重命名",
  g1 = "刷新",
  f1 = "刷新",
  h1 = "RSS",
  m1 = "每季",
  y1 = "账号",
  p1 = "Pro",
  v1 = "隐私政策",
  b1 = "播放",
  w1 = "套餐",
  S1 = "密码",
  E1 = "杂志",
  C1 = "登录",
  A1 = "列表",
  I1 = "浅色",
  x1 = "语言",
  k1 = "标签",
  T1 = "间隔",
  L1 = "导入",
  P1 = "全局",
  M1 = "常规",
  $1 = "全屏显示",
  R1 = "免费",
  D1 = "过滤",
  _1 = "订阅源",
  O1 = "反馈",
  N1 = "FAQ",
  F1 = "英语",
  B1 = "邮箱",
  U1 = "下载",
  z1 = "下载",
  H1 = "探索",
  V1 = "词典",
  W1 = "详细信息",
  G1 = "删除",
  j1 = "深色",
  Y1 = "确定",
  q1 = "留言",
  X1 = "多列",
  K1 = "关闭",
  Z1 = "中文",
  Q1 = "文件夹",
  J1 = "取消",
  ey = "基础",
  ty = "自动",
  ny = "每年",
  ry = "全部",
  oy = "关于",
  iy = {
    "or drag an OPML file here": "或拖动一个 OPML 文件到这里",
    noon: Y0,
    midnight: q0,
    "eBook & Kindle": "电子书和 Kindle",
    at: X0,
    "Your plan": "你的套餐",
    "Your password and confirmation password do not match.":
      "二次输入的密码不一致。",
    "You have exceeded the number of subscriptions your plan allows":
      "订阅数量超出你的套餐限制",
    "You don’t subscribe any feeds yet": "你还没有订阅新闻源",
    "You can overwrite it for each feed.": "你可以在每个源上覆盖这个设置。",
    Yesterday: K0,
    "When you confirm, your account will be logged out and will be deleted within one day.":
      "确认后你的账户将被退出登录，并在一天内被删除。",
    "When this option is enabled, click on the right 1/5 of the image to enter the image zoom mode.":
      "启用该选项后，点击图像右侧的1/5处进入图像缩放模式。",
    "What happens when my plan ends? ": "付费套餐过期后会发生什么？",
    Website: Z0,
    "Webpage text": "网页全文",
    "Web disk URL:": "网盘空间地址:",
    "We support payments via Paypal, Alipay, and Weixin.":
      "我们支持通过 Paypal、支付宝或微信付款。",
    "WARNING: All local preferences will be deleted, continue?":
      "警告： 所有本地设置将被清除， 继续？",
    "View source": "查看源代码",
    "View options": "视图选项",
    View: Q0,
    Username: J0,
    "User updated": "用户已更新",
    "Use redeem code": "使用兑换码",
    "Use original title": "使用原始标题",
    "Use heuristic algorithms to automatically load full text from summary-only feeds. You can overwrite it for each feed.":
      "使用智能算法判断是否需要加载目标网页全文。你可以在每个源上覆盖这个设置。",
    "Use global setting": "使用全局设置",
    Upgrade: e1,
    "Update intervals are automatically assigned based on the number of weekly posts.":
      "更新间隔会基于文章频率自动调整。",
    "Up to %s feeds": "最多 %s 个订阅",
    "Unsubscribe from '%s'?": "取消订阅 “%s”？",
    Unsubscribe: t1,
    "Unread Only": "只显示未读",
    'Under "Send-to-Kindle Email Settings" find your Kindle email address and add it to the input box above.':
      '在 "Send-to-Kindle Email Settings" 下找到你的 Kindle 电子邮件地址并将其添加到上面的输入框中。',
    "Try demo": "演示账号",
    "Toggle show unread only": "切换只显示未读状态",
    "Toggle read/unread for the selected entry": "切换当前条目已读/未读状态",
    "Toggle read/unread": "切换已读/未读状态",
    "Toggle read later": "切换稍候阅读标记",
    "Toggle fullscreen": "切换全屏状态",
    "To make sure our emails gets delivered to your Inbox, you may need to add this email address to your Safe Sender List / Contact List. ":
      "为了确保我们的电子邮件被送到你的收件箱，你可能需要将这个电子邮件地址添加到你的安全发件人名单/联系名单。",
    Title: n1,
    "This will unsubscribe all feeds from this folder.":
      "这将会取消订阅独属于这个文件夹的所有订阅源。",
    "This will remove all articles from this tag.":
      "这将会移除所有属于这个标签的文章。",
    "This will delete all of your data including feeds, saved articles, and more. This cannot be undone.":
      "这将删除你的所有数据，包括订阅、保存的文章等。此操作无法撤销。",
    "This web page doesn't have an RSS feed.": "这个网址不包含 RSS 订阅源。",
    "This is a demo account.": "这是一个演示账号。",
    "This is a demo account and does not support upgrade plans.":
      "这是一个演示账号，不支持升级套餐。",
    "This app uses PWA technology, you can use it from a web browser without installation, or installed and used like native apps.":
      "此网站使用 PWA 技术，你可以从浏览器中使用它而不需要安装，或者像本地应用程序一样安装到主屏幕使用。",
    "There are issues with this feed. Please check it and resubscribe if necessary.":
      "此订阅源有问题。请检查并在必要时重新订阅。",
    Theme: r1,
    "The generated eBook files will be placed in the web disk space below. You can download it using your web browser. Files are retained for 72 hours.":
      "生成的电子书文件将放置在下面的网盘空间中。你可以使用浏览器下载。文件将保留 48 小时。",
    "The code is invalid or has expired.": "代码无效或已过期。",
    "The article has no link": "这个文章没有链接。",
    'Tap the "Share" button, scroll down and tap "Add to Home Screen".':
      "点击“分享”按钮，然后向下滚动并点击“添加到主屏幕”。",
    "Tags are perfect for saving related articles.": "标签用于分类别收藏文章。",
    Tags: o1,
    "Tagged article list: Remove from list": "标签文章列表：从列表中移除",
    "Tag label": "标签",
    "Tag deleted": "标签已删除",
    "Summary lines": "摘要行数",
    Subscribe: i1,
    "Stop all": "全部停止",
    "Single tap to page down": "单击页面翻页",
    "Sign up": "注册",
    "Show unread articles only": "只显示未读文章",
    "Show thumbnail": "显示缩略图",
    "Show read only articles": "只显示未读文章",
    "Show all articles": "显示所有文章",
    "Show More": "显示更多",
    "Show All": "显示全部",
    Share: a1,
    Settings: s1,
    "Set as start page": "设为起始页",
    "Sending eBook…": "正在发送电子书…",
    "Send unread only": "只发送未读邮件",
    "Send to": "发送到",
    "Send new articles automatically (Paid users only)":
      "自动发送新文章（仅限付费用户）",
    "Send from:": "发件人:",
    "Send code": "发送代码",
    "Send as eBook": "发送电子书",
    Send: l1,
    "Search by RSS link": "输入 RSS 地址",
    "Scheduled sending": "定时发送",
    "Save over 20% when you select annual billing":
      "购买年限越多可享受的折扣越大",
    "Save articles in one click.": "一键收藏文章。",
    Save: c1,
    Retry: u1,
    "Reset the unread only settings of all feeds":
      "重置所有订阅源的未读过滤设置",
    "Reset Password": "重置密码",
    "Repeat Password": "重复密码",
    "Rename…": "重命名…",
    Rename: d1,
    "Reload Page": "重新加载",
    Reload: g1,
    "Refresh app": "重新载入 App",
    Refresh: f1,
    "Reduced eye strain.": "减少眼疲劳。",
    "Recent read:": "最后阅读：",
    "Read Later": "稍后阅读",
    "Rate your experience": "评价您的体验",
    RSS: h1,
    Quarterly: m1,
    "Qi Reader": "Qi Reader",
    Profile: y1,
    "Pro+": "Pro+",
    Pro: p1,
    "Privacy Policy": "隐私政策",
    Privacy: v1,
    "Previous article": "前一篇文章",
    "Premium fonts": "更多字体",
    "Preferences updated": "设置已更新",
    "Please check your internet connection and try again.":
      "请检查网络连接并重试。",
    Play: b1,
    Plans: w1,
    "Passwords must be at least %s characters in length.":
      "密码至少需要 %s 位。",
    "Password updated": "密码已更新",
    Password: S1,
    "Page Not Found": "页面未找到",
    "Original title": "原始标题",
    "Organize your saved articles by tags.": "通过标签管理你收藏的文章。",
    "Open the sidebar": "打开侧边栏",
    "Open the page": "打开页面",
    'Open the main browser menu and tap "Apps" → "Install".':
      "打开浏览器主菜单并点击“应用” → “安装”。",
    'Open the main browser menu and tap "Add to Home Screen".':
      "打开浏览器主菜单并点击“添加到主屏幕”。",
    "Open original": "打开源网页",
    "Open next feed": "转到下个订阅源",
    "Open item": "打开条目",
    "Open in new tab": "在新标签页打开",
    "Oops! Something went wrong.": "发生了一点小问题。",
    "OPML Import / Export": "OPML 导入和导出",
    "OPML (Outline Processor Markup Language) is a format which allows you to share the RSS sources you are following in your account with other applications.":
      "OPML 格式文件是容纳 RSS 订阅列表的标准格式，被用于备份或共享 RSS 订阅。 ",
    "Nothing unread": "所有内容已读",
    "No unread feed": "没有未读的订阅源",
    "No unread entries above": "以上没有未读条目",
    "No title": "无标题",
    "No selection": "无选中项",
    "No new articles": "没有新文章",
    "No more unread articles": "没有更多未读文章",
    "No more items": "没有更多项",
    "No more articles": "没有更多文章",
    "No articles to send": "没有要发送的文章",
    "Next feed": "下一个订阅源",
    "Next article": "下一篇文章",
    "Next Crawl At": "下次更新日期",
    "New feeds": "新订阅源",
    "New category": "创建文件夹",
    "New Tag": "创建标签",
    "New Password": "新密码",
    "Network error": "网络错误",
    "Navigate through feeds and entries": "在订阅源和文章之间跳转。",
    "Name and Email": "用户名和邮箱",
    "Move to": "移动到",
    "More options…": "更多选项…",
    "Mirror sites": "镜像站点",
    "Minimum number of articles": "文章的最小数量",
    "Maximum of %s articles in one eBook": "单本电子书最多 %s 篇文章",
    "Maximum number of articles": "文章的最大数量",
    "Max. number of articles": "文章的最大数量",
    "Max tag count exceeded": "超过了最大标签数。",
    "Max category count exceeded": "超过了最大文件夹数",
    "Marked as unread": "已标记为未读",
    "Marked as read": "已标记为已读",
    "Marked all as read": "全部文章已标记为已读",
    "Marked %s entries as read": "%s 篇文章已标记为已读",
    "Mark sent articles as read": "将发送的文章标记为已读",
    "Mark as unread": "标记为未读",
    "Mark as read": "标记为已读",
    "Mark all as read?": "全部标记为已读？",
    "Mark all as read": "全部标记为已读",
    "Mark above as read": "标记以上为已读",
    Magazine: E1,
    "Logo Download": "Logo 下载",
    "Login Code": "登录代码",
    Login: C1,
    "Log out": "退出登录",
    "Log in": "登录",
    "Load webpage text": "加载网页全文",
    "Load image only when they appear in the browser's viewport.":
      "只有当图像出现在浏览器的可视区域中时才下载图像。",
    "Load full content failed.": "加载全文失败。",
    "Load full content": "加载全文",
    List: A1,
    "Line height": "行高",
    "Light theme": "浅色主题",
    Light: I1,
    "Last build: %s": "最后构建: %s",
    "Last Crawled At": "最后更新日期",
    Language: x1,
    Label: k1,
    "Keyboard shortcuts": "键盘快捷键",
    "Keep links": "保留链接",
    "It seems like our session has expired. Please re-login.":
      "登录凭证失效，请重新登录。",
    "Invalid email address.": "无效的邮箱地址格式。",
    "Invalid OPML": "无效的 OPML 格式",
    Interval: T1,
    "Instructions for Amazon Kindle": "亚马逊 Kindle 的说明",
    "Installable Web-App (Add to home screen), work on any platform including both desktop and mobile devices.":
      "可安装到主屏幕的网页 App，支持所有桌面和移动设备。",
    "Install app": "安装 App",
    "Inline webpage view": "内嵌网页视图",
    "Inline webpage": "内嵌网页",
    "Increase font size": "增加字体大小",
    "Incorrect email or password.": "错误和邮箱或密码。",
    "Import…": "导入…",
    "Import sources from other RSS readers.": "从其它阅读器中导入订阅。",
    "Import sample feeds:": "导入推荐订阅:",
    "Import feeds": "导入订阅源",
    "Import all": "全部导入",
    "Import OPML": "导入 OPML",
    Import: L1,
    "Image proxy": "图像代理",
    "Image lazy loading on this device": "在此设备上启用图像按需加载",
    "If you want to discuss publicly or track progress, you can use":
      "如果要公开讨论或跟踪进度，可以使用",
    "If you have forgotten your password enter your email address and we send you a verification code then you can login to change your password":
      "如果你忘记了你的密码，请输入你的电子邮件地址，我们会给你发送一个验证码，然后你就可以登录来修改你的密码。",
    "If you have Auto renew enabled, your plan will be automatically extended on the end date. If you cancel your Pro plan, your account will be downgraded and the limitations will apply. However all saved articles and other premium features above the limits will remain, but will be deactivated. When in the future you upgrade your account, your features will be enabled again and will continue to work as before. ":
      "如果你启用了订阅，你的套餐将在结束日期自动延长。如果你取消你的订阅，你的账号将被降级，所有保存的文章和其他超过限制的数据将被保留。",
    "How to install": "如何安装",
    "Hide sidebar": "隐藏侧边栏",
    "Go to Homepage": "转到主页",
    "Go home": "返回主页",
    "Global setting:": "全局设置:",
    Global: P1,
    "Github Issues.": "Github Issues.",
    General: M1,
    Fullscreen: $1,
    "Full-Text": "全文",
    Free: R1,
    "Forgot password?": "忘记密码？",
    "Font size": "字体大小",
    "Font family": "字体",
    Filter: D1,
    "File type not supported!": "文件格式不支持！",
    "File options": "文件选项",
    "Fetch full-text of an article for feeds that only offer partial-content.":
      "为只输出摘要内容的订阅源自动加载全文内容。",
    Feeds: _1,
    "Feedback sent": "反馈已送达",
    Feedback: O1,
    "Feed unsubscribed": "订阅源已退订",
    "Feed text": "订阅源文本",
    "Feed properties…": "订阅源选项…",
    "Feed properties": "订阅源选项",
    "Feed list": "订阅源列表",
    "Feed article list: Toggle unread only":
      "订阅源文章列表：切换只读/未读状态",
    "Faster than using a mouse.": "比用鼠标更快。",
    "Failed to load new article list": "加载新文章列表失败",
    "Failed to load article content.": "加载文章内容失败。",
    "Failed to fetch user data": "加载用户数据失败",
    "Failed to fetch page.": "加载网页失败。",
    FAQ: N1,
    "Export…": "导出…",
    "Export feeds": "导出订阅源",
    "Export OPML": "导出 OPML",
    "Expires on %s": "过期时间： %s",
    "Expand/collapse folder": "展开/关闭文件夹",
    "Exit demo": "退出演示",
    "Every day": "每天",
    "Every %s days": "每隔 %s 天",
    "Error: %s": "错误: %s",
    Error: "错误",
    "Enter your message": "输入您的留言",
    English: F1,
    "Email articles as eBooks. Pushes to Kindle automatically and on schedule.":
      "将文章作为电子书发送。定期自动推送到 Kindle。",
    "Email address": "电子邮件地址",
    Email: B1,
    "Ebooks & Amazon Kindle": "电子书与亚马逊 Kindle",
    "Ebook sent": "电子书已发出",
    "Ebook receiving email and online download address.":
      "电子书接收邮箱和下载地址。",
    Downloads: U1,
    "Download your OPML": "下载 OPML 文件",
    Download: z1,
    "Don't have an account?": "还没有账号？",
    "Dock sidebar": "固定侧边栏",
    "Display name": "名字",
    "Discuss and bug reporting": "讨论和问题报告",
    Discover: H1,
    Dictionary: V1,
    Detail: W1,
    "Delete tag '%s'?": "删除标签“%s”？",
    "Delete category '%s'?": "删除文件夹“%s”？",
    "Delete account?": "删除账号？",
    "Delete account": "删除账号",
    Delete: G1,
    "Default view": "缺省视图",
    "Decrease font size": "减小文字大小",
    "Dark theme": "深色主题",
    "Dark mode": "深色模式",
    Dark: j1,
    "Cross platform": "全平台",
    "Create account": "创建账号",
    "Couldn't load image": "加载图片失败",
    "Copy article URL": "复制文章链接",
    "Content width": "正文宽度",
    Confirm: Y1,
    Comment: q1,
    Column: X1,
    Close: K1,
    "Clear local data": "清除本地数据",
    "Choose your plan": "选择你的套餐",
    "Choose OPML file": "选择 OPML 文件",
    Chinese: Z1,
    "China user": "中国用户",
    "China mirror": "中国镜像",
    "Check your email address and enter the login code that we sent to you":
      "检查你的邮箱并输入发送过来的登录验证码",
    "Changes you made may not be saved.": "你所做的更改可能还未保存。",
    "Category label": "文件夹名称",
    "Category '%s' Deleted": "文件夹“%s”已删除",
    Category: Q1,
    Cancel: J1,
    'By default, all subscriptions will be sent. To send only specific subscriptions, please create a category named "%s" and add the desired subscriptions to it.':
      "默认情况下，将发送所有订阅内容。若需仅发送特定订阅，请新建一个名为“%s”的文件夹，并将需发送的订阅添加至该文件夹中。",
    "Bug tracker": "Bug 报告",
    Basic: ey,
    "Back to article list": "回到文章列表",
    Automatic: ty,
    "Auto-load webpage text": "自动加载网页全文",
    "Article view": "文章视图",
    "Article tags": "文章标签",
    "Article list": "文章列表",
    "Article contents": "文章内容",
    "Article Listing": "文章列表",
    "Application error": "应用错误",
    Annual: ny,
    "An error occurred, please try again later": "发生错误，请重试",
    "An account with this email does not exists.": "邮箱没有注册。",
    "An account with this email already exists.": "邮箱已经注册。",
    "Amazon.com: Kindle Personal Document Settings":
      "Amazon.com: Kindle 个人文档设置",
    "Already have an account?": "已经注册账号？",
    "All feeds": "全部订阅源",
    All: ry,
    "Add feeds": "添加订阅",
    "Add content": "添加内容",
    "Add a QR code at the end of each article": "在每篇文章的末尾添加二唯码",
    'Add "%s" to the "Approved Personal Document E-mail List".':
      '添加 "%s" 到 "Approved Personal Document E-List"。',
    "Account has been marked for deletion": "你的账号已经标记为待删除",
    About: oy,
    "A tag with this label already exists.": "同名标签已经存在。",
    "A modern web RSS reader": "优雅的在线 RSS 阅读器",
    "A category with this label already exists.": "同名文件夹已经存在。",
    "< 1 min read": "小于 1 分钟",
    "6-digit code": "6 位验证码",
    "/month": "/月",
    ', then open the "Preferences" tab, and expand the "Personal Document Settings" section.':
      '，然后打开 "Preferences " 标签，并展开 "Personal Document Settings " 部分。',
    "(Optional) You can fill in your Kindle email address or any personal email address here. The ePub file will be sent as an attachment.":
      "（可选） 你可以在这里填写你的 Kindle 电子邮件地址或任何个人电子邮件地址。ePub 文件将作为附件发送。",
    "(Optional)": "（可选）",
    "(No title)": "（无标题）",
    "(No content)": "（无内容）",
    "%s pm": "下午 %s 点",
    "%s minutes ago": "%s 分钟前",
    "%s min read": "%s 分钟",
    "%s hours ago": "%s 小时前",
    "%s am": "上午 %s 点",
  },
  Jg = { en: {}, "zh-Hans": iy },
  ay = ["zh-CN", "zh-Hans-CN", "zh-Hans"];
function sy() {
  var t;
  const e = (t = navigator.languages) != null ? t : [navigator.language];
  for (const n of e) {
    if (/^en(-|$)/.test(n)) return "en";
    if (ay.includes(n)) return "zh-Hans";
  }
  return "en";
}
const ly = "language";
function ef() {
  let e = localStorage.getItem(ly) || sy();
  return Object.keys(Jg).includes(e) || (e = "en"), e;
}
let ud = !1,
  Pa;
function tf() {
  ud || ((ud = !0), (Pa = ef()), Qg(Pa, Jg[Pa]));
}
tf();
function cy(e = {}) {
  const {
    immediate: t = !1,
    onNeedRefresh: n,
    onOfflineReady: r,
    onRegistered: o,
    onRegisteredSW: i,
    onRegisterError: a,
  } = e;
  let s, c, u;
  const d = async (f = !0) => {
    await c, await (u == null ? void 0 : u());
  };
  async function g() {
    if ("serviceWorker" in navigator) {
      if (
        ((s = await jm(
          () => import("./workbox-window.prod.es5-WEjqEGHc.js"),
          []
        )
          .then(
            ({ Workbox: f }) => new f("/sw.js", { scope: "/", type: "classic" })
          )
          .catch((f) => {
            a == null || a(f);
          })),
        !s)
      )
        return;
      u = async () => {
        await (s == null ? void 0 : s.messageSkipWaiting());
      };
      {
        let f = !1;
        const m = () => {
          (f = !0),
            s == null ||
              s.addEventListener("controlling", (y) => {
                y.isUpdate && window.location.reload();
              }),
            n == null || n();
        };
        s.addEventListener("installed", (y) => {
          typeof y.isUpdate == "undefined"
            ? typeof y.isExternal != "undefined"
              ? y.isExternal
                ? m()
                : !f && (r == null || r())
              : y.isExternal
              ? window.location.reload()
              : !f && (r == null || r())
            : y.isUpdate || r == null || r();
        }),
          s.addEventListener("waiting", m),
          s.addEventListener("externalwaiting", m);
      }
      s.register({ immediate: t })
        .then((f) => {
          i ? i("/sw.js", f) : o == null || o(f);
        })
        .catch((f) => {
          a == null || a(f);
        });
    }
  }
  return (c = g()), d;
}
function nf() {
  let e = new Set();
  function t(o) {
    return e.add(o), () => e.delete(o);
  }
  let n = !1;
  function r(o, i) {
    if (n) return !(n = !1);
    const a = {
      to: o,
      options: i,
      defaultPrevented: !1,
      preventDefault: () => (a.defaultPrevented = !0),
    };
    for (const s of e)
      s.listener({
        ...a,
        from: s.location,
        retry: (c) => {
          c && (n = !0), s.navigate(o, { ...i, resolve: !1 });
        },
      });
    return !a.defaultPrevented;
  }
  return { subscribe: t, confirm: r };
}
let sc;
function jc() {
  (!window.history.state || window.history.state._depth == null) &&
    window.history.replaceState(
      { ...window.history.state, _depth: window.history.length - 1 },
      ""
    ),
    (sc = window.history.state._depth);
}
jc();
function uy(e) {
  return { ...e, _depth: window.history.state && window.history.state._depth };
}
function dy(e, t) {
  let n = !1;
  return () => {
    const r = sc;
    jc();
    const o = r == null ? null : sc - r;
    if (n) {
      n = !1;
      return;
    }
    o && t(o) ? ((n = !0), window.history.go(-o)) : e();
  };
}
const gy = /^(?:[a-z0-9]+:)?\/\//i,
  fy = /^\/+|(\/)\/+$/g,
  rf = "http://sr";
function _i(e, t = !1) {
  const n = e.replace(fy, "$1");
  return n ? (t || /^[?#]/.test(n) ? n : "/" + n) : "";
}
function Ma(e, t, n) {
  if (gy.test(t)) return;
  const r = _i(e),
    o = n && _i(n);
  let i = "";
  return (
    !o || t.startsWith("/")
      ? (i = r)
      : o.toLowerCase().indexOf(r.toLowerCase()) !== 0
      ? (i = r + o)
      : (i = o),
    (i || "/") + _i(t, !i)
  );
}
function hy(e, t) {
  if (e == null) throw new Error(t);
  return e;
}
function my(e, t) {
  return _i(e).replace(/\/*(\*.*)?$/g, "") + _i(t);
}
function of(e) {
  const t = {};
  return (
    e.searchParams.forEach((n, r) => {
      t[r] = n;
    }),
    t
  );
}
function af(e, t, n) {
  const [r, o] = e.split("/*", 2),
    i = r.split("/").filter(Boolean),
    a = i.length;
  return (s) => {
    const c = s.split("/").filter(Boolean),
      u = c.length - a;
    if (u < 0 || (u > 0 && o === void 0 && !t)) return null;
    const d = { path: a ? "" : "/", params: {} },
      g = (f) => (n === void 0 ? void 0 : n[f]);
    for (let f = 0; f < a; f++) {
      const m = i[f],
        y = c[f],
        b = m[0] === ":",
        v = b ? m.slice(1) : m;
      if (b && Il(y, g(v))) d.params[v] = y;
      else if (b || !Il(y, m)) return null;
      d.path += `/${y}`;
    }
    if (o) {
      const f = u ? c.slice(-u).join("/") : "";
      if (Il(f, g(o))) d.params[o] = f;
      else return null;
    }
    return d;
  };
}
function Il(e, t) {
  const n = (r) => r.localeCompare(e, void 0, { sensitivity: "base" }) === 0;
  return t === void 0
    ? !0
    : typeof t == "string"
    ? n(t)
    : typeof t == "function"
    ? t(e)
    : Array.isArray(t)
    ? t.some(n)
    : t instanceof RegExp
    ? t.test(e)
    : !1;
}
function yy(e) {
  const [t, n] = e.pattern.split("/*", 2),
    r = t.split("/").filter(Boolean);
  return r.reduce(
    (o, i) => o + (i.startsWith(":") ? 2 : 3),
    r.length - (n === void 0 ? 0 : 1)
  );
}
function sf(e) {
  const t = new Map(),
    n = jo();
  return new Proxy(
    {},
    {
      get(r, o) {
        return (
          t.has(o) ||
            Gc(n, () =>
              t.set(
                o,
                L(() => e()[o])
              )
            ),
          t.get(o)()
        );
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      },
      ownKeys() {
        return Reflect.ownKeys(e());
      },
    }
  );
}
function Yc(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index),
    r = e.slice(t.index + t[0].length);
  const o = [n, (n += t[1])];
  for (; (t = /^(\/\:[^\/]+)\?/.exec(r)); )
    o.push((n += t[1])), (r = r.slice(t[0].length));
  return Yc(r).reduce((i, a) => [...i, ...o.map((s) => s + a)], []);
}
const py = 100,
  lf = on(),
  Cs = on(),
  As = () =>
    hy(
      Y(lf),
      "<A> and 'use' router primitives can be only used inside a Route."
    ),
  vy = () => Y(Cs) || As().base,
  at = () => As().navigatorFactory(),
  Is = () => As().location,
  by = () => As().isRouting,
  wy = (e, t) => {
    const n = Is(),
      r = L(() => Yc(e()).map((o) => af(o, void 0, t)));
    return L(() => {
      for (const o of r()) {
        const i = o(n.pathname);
        if (i) return i;
      }
    });
  },
  ro = () => vy().params;
function Sy(e, t = "") {
  const { component: n, load: r, children: o, info: i } = e,
    a = !o || (Array.isArray(o) && !o.length),
    s = { key: e, component: n, load: r, info: i };
  return cf(e.path).reduce((c, u) => {
    for (const d of Yc(u)) {
      const g = my(t, d);
      let f = a ? g : g.split("/*", 1)[0];
      (f = f
        .split("/")
        .map((m) =>
          m.startsWith(":") || m.startsWith("*") ? m : encodeURIComponent(m)
        )
        .join("/")),
        c.push({
          ...s,
          originalPath: d,
          pattern: f,
          matcher: af(f, !a, e.matchFilters),
        });
    }
    return c;
  }, []);
}
function Ey(e, t = 0) {
  return {
    routes: e,
    score: yy(e[e.length - 1]) * 1e4 - t,
    matcher(n) {
      const r = [];
      for (let o = e.length - 1; o >= 0; o--) {
        const i = e[o],
          a = i.matcher(n);
        if (!a) return null;
        r.unshift({ ...a, route: i });
      }
      return r;
    },
  };
}
function cf(e) {
  return Array.isArray(e) ? e : [e];
}
function uf(e, t = "", n = [], r = []) {
  const o = cf(e);
  for (let i = 0, a = o.length; i < a; i++) {
    const s = o[i];
    if (s && typeof s == "object") {
      s.hasOwnProperty("path") || (s.path = "");
      const c = Sy(s, t);
      for (const u of c) {
        n.push(u);
        const d = Array.isArray(s.children) && s.children.length === 0;
        if (s.children && !d) uf(s.children, u.pattern, n, r);
        else {
          const g = Ey([...n], r.length);
          r.push(g);
        }
        n.pop();
      }
    }
  }
  return n.length ? r : r.sort((i, a) => a.score - i.score);
}
function df(e, t) {
  for (let n = 0, r = e.length; n < r; n++) {
    const o = e[n].matcher(t);
    if (o) return o;
  }
  return [];
}
function Cy(e, t) {
  const n = new URL(rf),
    r = L(
      (c) => {
        const u = e();
        try {
          return new URL(u, n);
        } catch (d) {
          return console.error(`Invalid path ${u}`), c;
        }
      },
      n,
      { equals: (c, u) => c.href === u.href }
    ),
    o = L(() => r().pathname),
    i = L(() => r().search, !0),
    a = L(() => r().hash),
    s = () => "";
  return {
    get pathname() {
      return o();
    },
    get search() {
      return i();
    },
    get hash() {
      return a();
    },
    get state() {
      return t();
    },
    get key() {
      return s();
    },
    query: sf(pe(i, () => of(r()))),
  };
}
let gr;
function Ay(e, t, n, r = {}) {
  const {
      signal: [o, i],
      utils: a = {},
    } = e,
    s = a.parsePath || ((R) => R),
    c = a.renderPath || ((R) => R),
    u = a.beforeLeave || nf(),
    d = Ma("", r.base || "");
  if (d === void 0) throw new Error(`${d} is not a valid base path`);
  d && !o().value && i({ value: d, replace: !0, scroll: !1 });
  const [g, f] = N(!1),
    m = async (R) => {
      f(!0);
      try {
        await Vg(R);
      } finally {
        f(!1);
      }
    },
    [y, b] = N(o().value),
    [v, S] = N(o().state),
    A = Cy(y, v),
    k = [],
    T = N([]),
    E = {
      pattern: d,
      params: {},
      path: () => d,
      outlet: () => null,
      resolvePath(R) {
        return Ma(d, R);
      },
    };
  return (
    $(() => {
      const { value: R, state: z } = o();
      He(() => {
        R !== y() &&
          m(() => {
            (gr = "native"), b(R), S(z), rd(), T[1]([]);
          }).then(() => {
            gr = void 0;
          });
      });
    }),
    {
      base: E,
      location: A,
      isRouting: g,
      renderPath: c,
      parsePath: s,
      navigatorFactory: M,
      beforeLeave: u,
      preloadRoute: _,
      singleFlight: r.singleFlight === void 0 ? !0 : r.singleFlight,
      submissions: T,
    }
  );
  function P(R, z, J) {
    He(() => {
      if (typeof z == "number") {
        z &&
          (a.go
            ? a.go(z)
            : console.warn(
                "Router integration does not support relative routing"
              ));
        return;
      }
      const {
          replace: ne,
          resolve: G,
          scroll: Q,
          state: ye,
        } = { replace: !1, resolve: !0, scroll: !0, ...J },
        B = G ? R.resolvePath(z) : Ma("", z);
      if (B === void 0) throw new Error(`Path '${z}' is not a routable path`);
      if (k.length >= py) throw new Error("Too many redirects");
      const le = y();
      if ((B !== le || ye !== v()) && !F0) {
        if (u.confirm(B, J)) {
          const Se = k.push({ value: le, replace: ne, scroll: Q, state: v() });
          m(() => {
            (gr = "navigate"), b(B), S(ye), rd(), T[1]([]);
          }).then(() => {
            k.length === Se && ((gr = void 0), x({ value: B, state: ye }));
          });
        }
      }
    });
  }
  function M(R) {
    return (R = R || Y(Cs) || E), (z, J) => P(R, z, J);
  }
  function x(R) {
    const z = k[0];
    z &&
      ((R.value !== z.value || R.state !== z.state) &&
        i({ ...R, replace: z.replace, scroll: z.scroll }),
      (k.length = 0));
  }
  function _(R, z) {
    const J = df(n(), R.pathname),
      ne = gr;
    gr = "preload";
    for (let G in J) {
      const { route: Q, params: ye } = J[G];
      Q.component && Q.component.preload && Q.component.preload();
      const { load: B } = Q;
      z &&
        B &&
        Gc(t(), () =>
          B({
            params: ye,
            location: {
              pathname: R.pathname,
              search: R.search,
              hash: R.hash,
              query: of(R),
              state: null,
              key: "",
            },
            intent: "preload",
          })
        );
    }
    gr = ne;
  }
}
function Iy(e, t, n, r, o) {
  const { base: i, location: a } = e,
    { pattern: s, component: c, load: u } = r().route,
    d = L(() => r().path);
  c && c.preload && c.preload();
  const g = u ? u({ params: o, location: a, intent: gr || "initial" }) : void 0;
  return {
    parent: t,
    pattern: s,
    path: d,
    params: o,
    outlet: () =>
      c
        ? l(c, {
            params: o,
            location: a,
            data: g,
            get children() {
              return n();
            },
          })
        : n(),
    resolvePath(m) {
      return Ma(i.path(), m, d());
    },
  };
}
const xy = (e) => (t) => {
  const { base: n } = t,
    r = Ki(() => t.children),
    o = L(() =>
      uf(
        t.root ? { component: t.root, load: t.rootLoad, children: r() } : r(),
        t.base || ""
      )
    );
  let i;
  const a = Ay(e, () => i, o, { base: n, singleFlight: t.singleFlight });
  return (
    e.create && e.create(a),
    l(lf.Provider, {
      value: a,
      get children() {
        return [
          L(() => (i = jo()) && null),
          l(ky, {
            routerState: a,
            get branches() {
              return o();
            },
          }),
        ];
      },
    })
  );
};
function ky(e) {
  const t = L(() => df(e.branches, e.routerState.location.pathname)),
    n = sf(() => {
      const a = t(),
        s = {};
      for (let c = 0; c < a.length; c++) Object.assign(s, a[c].params);
      return s;
    }),
    r = [];
  let o;
  const i = L(
    pe(t, (a, s, c) => {
      let u = s && a.length === s.length;
      const d = [];
      for (let g = 0, f = a.length; g < f; g++) {
        const m = s && s[g],
          y = a[g];
        c && m && y.route.key === m.route.key
          ? (d[g] = c[g])
          : ((u = !1),
            r[g] && r[g](),
            Vr((b) => {
              (r[g] = b),
                (d[g] = Iy(
                  e.routerState,
                  d[g - 1] || e.routerState.base,
                  Ty(() => i()[g + 1]),
                  () => t()[g],
                  n
                ));
            }));
      }
      return (
        r.splice(a.length).forEach((g) => g()), c && u ? c : ((o = d[0]), d)
      );
    })
  );
  return l(D, {
    get when() {
      return i() && o;
    },
    keyed: !0,
    children: (a) =>
      l(Cs.Provider, {
        value: a,
        get children() {
          return a.outlet();
        },
      }),
  });
}
const Ty = (e) => () =>
    l(D, {
      get when() {
        return e();
      },
      keyed: !0,
      children: (t) =>
        l(Cs.Provider, {
          value: t,
          get children() {
            return t.outlet();
          },
        }),
    }),
  We = (e) => {
    const t = Ki(() => e.children);
    return F(e, {
      get children() {
        return t();
      },
    });
  };
function Ly([e, t], n, r) {
  return [n ? () => n(e()) : e, r ? (o) => t(r(o)) : t];
}
function Py(e) {
  if (e === "#") return null;
  try {
    return document.querySelector(e);
  } catch (t) {
    return null;
  }
}
function My(e) {
  let t = !1;
  const n = (o) => (typeof o == "string" ? { value: o } : o),
    r = Ly(
      N(n(e.get()), { equals: (o, i) => o.value === i.value }),
      void 0,
      (o) => (!t && e.set(o), o)
    );
  return (
    e.init &&
      De(
        e.init((o = e.get()) => {
          (t = !0), r[1](n(o)), (t = !1);
        })
      ),
    xy({ signal: r, create: e.create, utils: e.utils })
  );
}
function $y(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function Ry(e, t) {
  const n = Py(`#${e}`);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
const Dy = new Map();
function _y(e = !0, t = !1, n = "/_server") {
  return (r) => {
    const o = r.base.path(),
      i = r.navigatorFactory(r.base);
    let a = {};
    function s(y) {
      return y.namespaceURI === "http://www.w3.org/2000/svg";
    }
    function c(y) {
      if (
        y.defaultPrevented ||
        y.button !== 0 ||
        y.metaKey ||
        y.altKey ||
        y.ctrlKey ||
        y.shiftKey
      )
        return;
      const b = y
        .composedPath()
        .find((E) => E instanceof Node && E.nodeName.toUpperCase() === "A");
      if (!b || (t && !b.hasAttribute("link"))) return;
      const v = s(b),
        S = v ? b.href.baseVal : b.href;
      if ((v ? b.target.baseVal : b.target) || (!S && !b.hasAttribute("state")))
        return;
      const k = (b.getAttribute("rel") || "").split(/\s+/);
      if (b.hasAttribute("download") || (k && k.includes("external"))) return;
      const T = v ? new URL(S, document.baseURI) : new URL(S);
      if (
        !(
          T.origin !== window.location.origin ||
          (o &&
            T.pathname &&
            !T.pathname.toLowerCase().startsWith(o.toLowerCase()))
        )
      )
        return [b, T];
    }
    function u(y) {
      const b = c(y);
      if (!b) return;
      const [v, S] = b,
        A = r.parsePath(S.pathname + S.search + S.hash),
        k = v.getAttribute("state");
      y.preventDefault(),
        i(A, {
          resolve: !1,
          replace: v.hasAttribute("replace"),
          scroll: !v.hasAttribute("noscroll"),
          state: k && JSON.parse(k),
        });
    }
    function d(y) {
      const b = c(y);
      if (!b) return;
      const [v, S] = b;
      a[S.pathname] || r.preloadRoute(S, v.getAttribute("preload") !== "false");
    }
    function g(y) {
      const b = c(y);
      if (!b) return;
      const [v, S] = b;
      a[S.pathname] ||
        (a[S.pathname] = setTimeout(() => {
          r.preloadRoute(S, v.getAttribute("preload") !== "false"),
            delete a[S.pathname];
        }, 200));
    }
    function f(y) {
      const b = c(y);
      if (!b) return;
      const [, v] = b;
      a[v.pathname] && (clearTimeout(a[v.pathname]), delete a[v.pathname]);
    }
    function m(y) {
      let b =
        y.submitter && y.submitter.hasAttribute("formaction")
          ? y.submitter.getAttribute("formaction")
          : y.target.getAttribute("action");
      if (!b) return;
      if (!b.startsWith("https://action/")) {
        const S = new URL(b, rf);
        if (((b = r.parsePath(S.pathname + S.search)), !b.startsWith(n)))
          return;
      }
      if (y.target.method.toUpperCase() !== "POST")
        throw new Error("Only POST forms are supported for Actions");
      const v = Dy.get(b);
      if (v) {
        y.preventDefault();
        const S = new FormData(y.target);
        y.submitter &&
          y.submitter.name &&
          S.append(y.submitter.name, y.submitter.value),
          v.call(r, S);
      }
    }
    Bn(["click", "submit"]),
      document.addEventListener("click", u),
      e &&
        (document.addEventListener("mouseover", g),
        document.addEventListener("mouseout", f),
        document.addEventListener("focusin", d),
        document.addEventListener("touchstart", d)),
      document.addEventListener("submit", m),
      De(() => {
        document.removeEventListener("click", u),
          e &&
            (document.removeEventListener("mouseover", g),
            document.removeEventListener("mouseout", f),
            document.removeEventListener("focusin", d),
            document.removeEventListener("touchstart", d)),
          document.removeEventListener("submit", m);
      });
  };
}
function Oy(e) {
  const t = () => ({
      value:
        window.location.pathname +
        window.location.search +
        window.location.hash,
      state: window.history.state,
    }),
    n = nf();
  return My({
    get: t,
    set({ value: r, replace: o, scroll: i, state: a }) {
      o
        ? window.history.replaceState(uy(a), "", r)
        : window.history.pushState(a, "", r),
        Ry(window.location.hash.slice(1), i),
        jc();
    },
    init: (r) =>
      $y(
        window,
        "popstate",
        dy(r, (o) => {
          if (o && o < 0) return !n.confirm(o);
          {
            const i = t();
            return !n.confirm(i.value, { state: i.state });
          }
        })
      ),
    create: _y(e.preload, e.explicitLinks, e.actionBase),
    utils: { go: (r) => window.history.go(r), beforeLeave: n },
  })(e);
}
const Ya = Symbol("store-raw"),
  Ro = Symbol("store-node"),
  qn = Symbol("store-has"),
  gf = Symbol("store-self");
function ff(e) {
  let t = e[Sn];
  if (
    !t &&
    (Object.defineProperty(e, Sn, { value: (t = new Proxy(e, By)) }),
    !Array.isArray(e))
  ) {
    const n = Object.keys(e),
      r = Object.getOwnPropertyDescriptors(e);
    for (let o = 0, i = n.length; o < i; o++) {
      const a = n[o];
      r[a].get &&
        Object.defineProperty(e, a, {
          enumerable: r[a].enumerable,
          get: r[a].get.bind(t),
        });
    }
  }
  return t;
}
function On(e) {
  let t;
  return (
    e != null &&
    typeof e == "object" &&
    (e[Sn] ||
      !(t = Object.getPrototypeOf(e)) ||
      t === Object.prototype ||
      Array.isArray(e))
  );
}
function pn(e, t = new Set()) {
  let n, r, o, i;
  if ((n = e != null && e[Ya])) return n;
  if (!On(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e);
    for (let a = 0, s = e.length; a < s; a++)
      (o = e[a]), (r = pn(o, t)) !== o && (e[a] = r);
  } else {
    Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e);
    const a = Object.keys(e),
      s = Object.getOwnPropertyDescriptors(e);
    for (let c = 0, u = a.length; c < u; c++)
      (i = a[c]), !s[i].get && ((o = e[i]), (r = pn(o, t)) !== o && (e[i] = r));
  }
  return e;
}
function qa(e, t) {
  let n = e[t];
  return (
    n || Object.defineProperty(e, t, { value: (n = Object.create(null)) }), n
  );
}
function Vi(e, t, n) {
  if (e[t]) return e[t];
  const [r, o] = N(n, { equals: !1, internal: !0 });
  return (r.$ = o), (e[t] = r);
}
function Ny(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t);
  return (
    !n ||
      n.get ||
      !n.configurable ||
      t === Sn ||
      t === Ro ||
      (delete n.value, delete n.writable, (n.get = () => e[Sn][t])),
    n
  );
}
function hf(e) {
  nc() && Vi(qa(e, Ro), gf)();
}
function Fy(e) {
  return hf(e), Reflect.ownKeys(e);
}
const By = {
  get(e, t, n) {
    if (t === Ya) return e;
    if (t === Sn) return n;
    if (t === Ha) return hf(e), n;
    const r = qa(e, Ro),
      o = r[t];
    let i = o ? o() : e[t];
    if (t === Ro || t === qn || t === "__proto__") return i;
    if (!o) {
      const a = Object.getOwnPropertyDescriptor(e, t);
      nc() &&
        (typeof i != "function" || e.hasOwnProperty(t)) &&
        !(a && a.get) &&
        (i = Vi(r, t, i)());
    }
    return On(i) ? ff(i) : i;
  },
  has(e, t) {
    return t === Ya ||
      t === Sn ||
      t === Ha ||
      t === Ro ||
      t === qn ||
      t === "__proto__"
      ? !0
      : (nc() && Vi(qa(e, qn), t)(), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Fy,
  getOwnPropertyDescriptor: Ny,
};
function Ut(e, t, n, r = !1) {
  if (!r && e[t] === n) return;
  const o = e[t],
    i = e.length;
  n === void 0
    ? (delete e[t], e[qn] && e[qn][t] && o !== void 0 && e[qn][t].$())
    : ((e[t] = n), e[qn] && e[qn][t] && o === void 0 && e[qn][t].$());
  let a = qa(e, Ro),
    s;
  if (((s = Vi(a, t, o)) && s.$(() => n), Array.isArray(e) && e.length !== i)) {
    for (let c = e.length; c < i; c++) (s = a[c]) && s.$();
    (s = Vi(a, "length", i)) && s.$(e.length);
  }
  (s = a[gf]) && s.$();
}
function mf(e, t) {
  const n = Object.keys(t);
  for (let r = 0; r < n.length; r += 1) {
    const o = n[r];
    Ut(e, o, t[o]);
  }
}
function Uy(e, t) {
  if ((typeof t == "function" && (t = t(e)), (t = pn(t)), Array.isArray(t))) {
    if (e === t) return;
    let n = 0,
      r = t.length;
    for (; n < r; n++) {
      const o = t[n];
      e[n] !== o && Ut(e, n, o);
    }
    Ut(e, "length", r);
  } else mf(e, t);
}
function ki(e, t, n = []) {
  let r,
    o = e;
  if (t.length > 1) {
    r = t.shift();
    const a = typeof r,
      s = Array.isArray(e);
    if (Array.isArray(r)) {
      for (let c = 0; c < r.length; c++) ki(e, [r[c]].concat(t), n);
      return;
    } else if (s && a === "function") {
      for (let c = 0; c < e.length; c++) r(e[c], c) && ki(e, [c].concat(t), n);
      return;
    } else if (s && a === "object") {
      const { from: c = 0, to: u = e.length - 1, by: d = 1 } = r;
      for (let g = c; g <= u; g += d) ki(e, [g].concat(t), n);
      return;
    } else if (t.length > 1) {
      ki(e[r], t, [r].concat(n));
      return;
    }
    (o = e[r]), (n = [r].concat(n));
  }
  let i = t[0];
  (typeof i == "function" && ((i = i(o, n)), i === o)) ||
    (r === void 0 && i == null) ||
    ((i = pn(i)),
    r === void 0 || (On(o) && On(i) && !Array.isArray(i))
      ? mf(o, i)
      : Ut(e, r, i));
}
function Un(...[e, t]) {
  const n = pn(e || {}),
    r = Array.isArray(n),
    o = ff(n);
  function i(...a) {
    Zn(() => {
      r && a.length === 1 ? Uy(n, a[0]) : ki(n, a);
    });
  }
  return [o, i];
}
const lc = Symbol("store-root");
function Lo(e, t, n, r, o) {
  const i = t[n];
  if (e === i) return;
  const a = Array.isArray(e);
  if (
    n !== lc &&
    (!On(e) || !On(i) || a !== Array.isArray(i) || (o && e[o] !== i[o]))
  ) {
    Ut(t, n, e);
    return;
  }
  if (a) {
    if (e.length && i.length && (!r || (o && e[0] && e[0][o] != null))) {
      let u, d, g, f, m, y, b, v;
      for (
        g = 0, f = Math.min(i.length, e.length);
        g < f && (i[g] === e[g] || (o && i[g] && e[g] && i[g][o] === e[g][o]));
        g++
      )
        Lo(e[g], i, g, r, o);
      const S = new Array(e.length),
        A = new Map();
      for (
        f = i.length - 1, m = e.length - 1;
        f >= g &&
        m >= g &&
        (i[f] === e[m] || (o && i[g] && e[g] && i[f][o] === e[m][o]));
        f--, m--
      )
        S[m] = i[f];
      if (g > m || g > f) {
        for (d = g; d <= m; d++) Ut(i, d, e[d]);
        for (; d < e.length; d++) Ut(i, d, S[d]), Lo(e[d], i, d, r, o);
        i.length > e.length && Ut(i, "length", e.length);
        return;
      }
      for (b = new Array(m + 1), d = m; d >= g; d--)
        (y = e[d]),
          (v = o && y ? y[o] : y),
          (u = A.get(v)),
          (b[d] = u === void 0 ? -1 : u),
          A.set(v, d);
      for (u = g; u <= f; u++)
        (y = i[u]),
          (v = o && y ? y[o] : y),
          (d = A.get(v)),
          d !== void 0 && d !== -1 && ((S[d] = i[u]), (d = b[d]), A.set(v, d));
      for (d = g; d < e.length; d++)
        d in S ? (Ut(i, d, S[d]), Lo(e[d], i, d, r, o)) : Ut(i, d, e[d]);
    } else for (let u = 0, d = e.length; u < d; u++) Lo(e[u], i, u, r, o);
    i.length > e.length && Ut(i, "length", e.length);
    return;
  }
  const s = Object.keys(e);
  for (let u = 0, d = s.length; u < d; u++) Lo(e[s[u]], i, s[u], r, o);
  const c = Object.keys(i);
  for (let u = 0, d = c.length; u < d; u++)
    e[c[u]] === void 0 && Ut(i, c[u], void 0);
}
function Xa(e, t = {}) {
  const { merge: n, key: r = "id" } = t,
    o = pn(e);
  return (i) => {
    if (!On(i) || !On(o)) return o;
    const a = Lo(o, { [lc]: i }, lc, n, r);
    return a === void 0 ? i : a;
  };
}
const Ka = new WeakMap(),
  yf = {
    get(e, t) {
      if (t === Ya) return e;
      const n = e[t];
      let r;
      return On(n) ? Ka.get(n) || (Ka.set(n, (r = new Proxy(n, yf))), r) : n;
    },
    set(e, t, n) {
      return Ut(e, t, pn(n)), !0;
    },
    deleteProperty(e, t) {
      return Ut(e, t, void 0, !0), !0;
    },
  };
function ut(e) {
  return (t) => {
    if (On(t)) {
      let n;
      (n = Ka.get(t)) || Ka.set(t, (n = new Proxy(t, yf))), e(n);
    }
    return t;
  };
}
var Za = function () {
  return (
    (Za =
      Object.assign ||
      function (t) {
        for (var n, r = 1, o = arguments.length; r < o; r++) {
          n = arguments[r];
          for (var i in n)
            Object.prototype.hasOwnProperty.call(n, i) && (t[i] = n[i]);
        }
        return t;
      }),
    Za.apply(this, arguments)
  );
};
function zy(e) {
  return e.toLowerCase();
}
var Hy = [/([a-z0-9])([A-Z])/g, /([A-Z])([A-Z][a-z])/g],
  Vy = /[^A-Z0-9]+/gi;
function Wy(e, t) {
  t === void 0 && (t = {});
  for (
    var n = t.splitRegexp,
      r = n === void 0 ? Hy : n,
      o = t.stripRegexp,
      i = o === void 0 ? Vy : o,
      a = t.transform,
      s = a === void 0 ? zy : a,
      c = t.delimiter,
      u = c === void 0 ? " " : c,
      d = dd(dd(e, r, "$1\0$2"), i, "\0"),
      g = 0,
      f = d.length;
    d.charAt(g) === "\0";

  )
    g++;
  for (; d.charAt(f - 1) === "\0"; ) f--;
  return d.slice(g, f).split("\0").map(s).join(u);
}
function dd(e, t, n) {
  return t instanceof RegExp
    ? e.replace(t, n)
    : t.reduce(function (r, o) {
        return r.replace(o, n);
      }, e);
}
function pf(e, t) {
  var n = e.charAt(0),
    r = e.substr(1).toLowerCase();
  return t > 0 && n >= "0" && n <= "9" ? "_" + n + r : "" + n.toUpperCase() + r;
}
function Gy(e, t) {
  return (
    t === void 0 && (t = {}), Wy(e, Za({ delimiter: "", transform: pf }, t))
  );
}
function jy(e, t) {
  return t === 0 ? e.toLowerCase() : pf(e, t);
}
function Yy(e, t) {
  return t === void 0 && (t = {}), Gy(e, Za({ transform: jy }, t));
}
const qy = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
  Xy = /^[a-zA-Z]:\\/;
function Ky(e) {
  if (typeof e != "string")
    throw new TypeError(`Expected a \`string\`, got \`${typeof e}\``);
  return Xy.test(e) ? !1 : qy.test(e);
}
function $a(e) {
  return !Ky(e);
}
const Zy =
  /(@|\.)(\.cn|qq\.com|sina\.com|sohu\.com|163\.com|126\.com|128\.com|189\.com|263\.net|yeah\.net|88\.com)$/i;
function Qy(e) {
  return Zy.test(e);
}
function gd(e, t) {
  return $a(e) ? new URL(e, t).href : e;
}
function Jy(e) {
  let t = 0;
  if (e.length === 0) return t;
  for (let n = 0, r; n < e.length; n++)
    (r = e.charCodeAt(n)), (t = (t << 5) - t + r), (t |= 0);
  return t;
}
function ep(e, t) {
  const n = Object.create(null);
  return (
    e.forEach((r, o) => {
      const i = String(t(r, o));
      i in n ? n[i].push(r) : (n[i] = [r]);
    }),
    n
  );
}
const vf = 36e5,
  xs = 864e5,
  bf = xs * 7,
  ks = xs * 30;
function Yt(e) {
  return e ? `${e} - Qi Reader` : "Qi Reader";
}
function Oi(...e) {}
const tp = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#x27": "'",
  "#x60": "`",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  sim: "∼",
  middot: "·",
  sdot: "⋅",
  ldquo: "“",
  rdquo: "”",
  lsaquo: "‹",
  rsaquo: "›",
  laquo: "«",
  raquo: "»",
  hellip: "…",
  lsquo: "‘",
  rsquo: "’",
  larr: "←",
  rarr: "→",
};
function Ni(e) {
  return String(e).replace(/&([\d\w#]{2,10});/g, function (t, n) {
    const r = tp[n];
    return (
      r ||
      (n[0] === "#" ? String.fromCharCode(Number(n.substr(1))) : "&" + n + ";")
    );
  });
}
function np(e) {
  return JSON.stringify(e, (t, n) =>
    ip(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, o) => ((r[o] = n[o]), r), {})
      : n
  );
}
function Wi(e, t) {
  const n = e.indexOf(t);
  return n === -1 ? !1 : (e.splice(n, 1), !0);
}
function rp(e) {
  return e.replace(/^\s*http:/i, "https:");
}
const op = /-|\u2010|\u2013|\u2014|\u2015/;
function Gi(e, t = 15, n = 30) {
  if (!e || e.length <= n) return e;
  const r = e.search(op);
  return r === -1 ? e : r >= t ? e.substring(0, r).trim() : e;
}
function qc(e) {
  return /network|dns|connection|fetch|timed?out/i.test(String(e));
}
function cc() {
  return new Date().getTimezoneOffset() === -480;
}
function wf() {
  return /^zh-/i.test(ef());
}
function Sf() {
  return window.location.hostname.endsWith(".cn");
}
function Ef(e) {
  return (e && Qy(e)) || Sf() || wf();
}
function Cf(e = "/") {
  const t = window.location.href;
  window.history.back(),
    setTimeout(function () {
      window.location.href === t && Qn(e);
    }, 300);
}
function xl(e, t) {
  const n = { ...e };
  for (const [r, o] of Object.entries(t != null ? t : {}))
    o != null && (n[r] = o);
  return n;
}
function ip(e) {
  let t;
  return (
    e != null &&
    typeof e == "object" &&
    (!(t = Object.getPrototypeOf(e)) || t === Object.prototype)
  );
}
function oo(e) {
  const t = Object.getOwnPropertyNames(e);
  for (const n of t) {
    const r = e[n];
    typeof r == "function" && (e[n] = r.bind(e));
  }
  return e;
}
function Mn(e, t) {
  if (e == null) throw new Error(t != null ? t : "Unexpected null");
  return e;
}
let Qn = Oi;
function ap(e) {
  Qn = e;
}
function Bo(e) {
  return e ? `${e[0].toUpperCase()}${e.substring(1)}` : "";
}
function Af(e) {
  return Yy(e.replace("data-", ""));
}
function sp(e, t = !1) {
  const n = Is();
  return (...r) =>
    t ? zr(n.pathname).startsWith(zr(e(...r))) : zr(n.pathname) === zr(e(...r));
}
function lp(e, t) {
  const n = zr(t),
    r = zr(e);
  return r === n || r.startsWith(n);
}
function zr(e) {
  return e.endsWith("/") ? e : e + "/";
}
function Ra(e) {
  return e === 0 ? void 0 : e;
}
function fd(e, t) {
  return Array.from(e).sort((n, r) => {
    var o, i;
    return ((o = t(n)) != null ? o : "").localeCompare(
      (i = t(r)) != null ? i : ""
    );
  });
}
function cp() {
  var e;
  (e = window.umami) == null || e.track();
}
function Xc(e, t) {
  var n;
  (n = window.umami) == null || n.track(e, t);
}
function If(e) {
  if (window.umami) {
    e();
    return;
  }
  const t = 7;
  function n(r) {
    setTimeout(function () {
      window.umami
        ? e()
        : r > t
        ? console.warn("[analytics] Wait tracker timeout")
        : n(r + 1);
    }, 1e3);
  }
  n(0);
}
const hd = "trackEvent:NewClient";
function up(e = Oi) {
  If(() => {
    localStorage.getItem(hd)
      ? e(!1)
      : (localStorage.setItem(hd, new Date().toISOString()),
        Xc("NewClient"),
        e(!0));
  });
}
function dp() {
  If(() => {
    cp(),
      Xc("AppLaunch", {
        version: "18.1.2",
        releaseDate: new Date(1715784815736).toISOString(),
      });
  });
}
var gp = !!b0;
function fp(e) {
  return (...t) => {
    for (const n of e) n && n(...t);
  };
}
var md = (e) => (typeof e == "function" && !e.length ? e() : e),
  yd = (e) => (Array.isArray(e) ? e : e ? [e] : []),
  hp = gp ? (e) => (jo() ? De(e) : e) : De;
function mp(e, t, n) {
  return N(t(), n);
}
function Qi(e, t = jo()) {
  let n = 0,
    r,
    o;
  return () => (
    n++,
    De(() => {
      n--,
        queueMicrotask(() => {
          !n && o && (o(), (o = r = void 0));
        });
    }),
    o || Vr((i) => (r = e((o = i))), t),
    r
  );
}
function yp(e) {
  const t = jo(),
    n = Qi(e, t);
  return () => n();
}
function Wr(e, t, n, r) {
  return (
    e.addEventListener(t, n, r), hp(e.removeEventListener.bind(e, t, n, r))
  );
}
function xf(e, t, n, r) {
  const o = () => {
    yd(md(e)).forEach((i) => {
      i && yd(md(t)).forEach((a) => Wr(i, a, n, r));
    });
  };
  typeof e == "function" ? ie(o) : $(o);
}
function kf(e) {
  return e.replace(/[A-Z]|^ms|^webkit/g, "-$&").toLowerCase();
}
function pd(e) {
  return !!e;
}
const pp = new Set([
  "width",
  "height",
  "fontSize",
  "letterSpacing",
  "borderRadius",
  "minHeight",
  "maxHeight",
  "minWidth",
  "maxWidth",
  "left",
  "top",
  "right",
  "bottom",
  "margin",
  "marginTop",
  "marginRight",
  "marginBottom",
  "marginLeft",
  "padding",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "borderWidth",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
]);

function Tf(e, t) {
  return typeof t != "number" ? t : pp.has(e) ? `${t}px` : String(t);
}
function Lf(e, t) {
  return [e, t];
}
function Ft(e) {
  const t = document.createElement("style");
  return (
    t.setAttribute("type", "text/css"),
    document.head.appendChild(t),
    e && (t.textContent += e),
    t
  );
}
function Kc(e, t, n) {
  try {
    return e.insertRule(t, n), !0;
  } catch (r) {
    console.error("Invalid CSS rule: %s: %s", t, String(r));
  }
  return !1;
}
function vp(e) {
  return `{${Object.entries(e)
    .map(([n, r]) => {
      if (r == null) return;
      const o = Tf(n, r),
        [i, a] = Lf(n, o);
      return `${kf(i)}:${a}`;
    })
    .join(";")}}`;
}
const kl = {},
  uc = {},
  dc = "cj";
let bp = 200;
const wp = Ft().sheet;
function io(e) {
  return Fi(e);
}
function Fi(e, t = "", n = "") {
  return Object.entries(e)
    .map(([r, o]) => {
      if (o == null) return "";
      if (typeof o == "object") {
        const c = /^@/.test(r) ? r : null;
        return c
          ? Fi(o, t, c)
          : r.indexOf(",") !== -1
          ? r
              .split(",")
              .map((u) => {
                if (((u = u.trim()), u[0] !== "&"))
                  throw new Error('Missing "&"');
                return Fi(o, t + u.substr(1), n);
              })
              .join(" ")
          : Fi(o, t + r, n);
      }
      const i = `${r}:${o}:${t}:${n}`;
      if (kl[i]) return kl[i];
      if (!xp()) return "";
      const a = `${dc}-${(bp++).toString(36)}`,
        s = { className: a, child: t, prop: r, value: o, media: n };
      return Ap(s), (kl[i] = a), (uc[a] = s), a;
    })
    .join(" ");
}
const Fr = {
  ":link": 10,
  ":visited": 20,
  ":hover": 30,
  ":active": 40,
  ":focus": 50,
  ":focus-within": 50,
  ":focus-visible": 50,
};
function Sp(e) {
  let t = 0;
  const n = /:[\w-]+/.exec(e);
  return (
    n &&
      (n[0] === ":active"
        ? (t = Fr[":active"])
        : n[0] === ":hover"
        ? (t = Fr[":hover"])
        : n[0] === ":visited"
        ? (t = Fr[":visited"])
        : n[0] === ":link"
        ? (t = Fr[":link"])
        : n[0] === ":focus"
        ? (t = Fr[":focus"])
        : n[0] === ":focus-within"
        ? (t = Fr[":focus-within"])
        : n[0] === ":focus-visible" && (t = Fr[":focus-visible"])),
    /^@media/.test(e) && t++,
    t
  );
}
function Ep(e) {
  const t = Tf(e.prop, e.value),
    [n, r] = Lf(e.prop, t),
    o = `.${e.className}${e.child}{${kf(n)}:${r}}`;
  return e.media ? `${e.media}{${o}}` : o;
}
const Cp = 2e3,
  ma = [];
function Ap(e) {
  if (ma.length > Cp) throw Error("Too many CSS rules");
  let t = 0;
  const n = Sp(e.media + " " + e.child);
  (t = ma.findIndex((r) => n <= r)),
    t === -1 && (t = ma.length),
    Kc(wp, Ep(e), t) && ma.splice(t, 0, n);
}
function H(...e) {
  return Ip(
    e
      .flat(100)
      .filter(pd)
      .map((t) => (typeof t == "object" ? Fi(t) : t))
      .join(" ")
      .split(/\s+/)
      .filter(pd)
  ).join(" ");
}
function Ip(e) {
  return e.reduce((t, n) => {
    if (n.startsWith(dc)) {
      const r = uc[n],
        o = t.findIndex((i) => {
          if (i.startsWith(dc)) {
            const a = uc[i];
            return (
              a.media === r.media && a.child === r.child && a.prop === r.prop
            );
          }
        });
      o !== -1 && t.splice(o, 1);
    }
    return t.push(n), t;
  }, []);
}
function xp(e) {
  return !0;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Bt(e) {
  return e < 0 ? -1 : e === 0 ? 0 : 1;
}
function Bi(e, t, n) {
  return (1 - n) * e + n * t;
}
function kp(e, t, n) {
  return n < e ? e : n > t ? t : n;
}
function Qa(e, t, n) {
  return n < e ? e : n > t ? t : n;
}
function Zc(e) {
  return (e = e % 360), e < 0 && (e = e + 360), e;
}
function Tp(e, t) {
  return Zc(t - e) <= 180 ? 1 : -1;
}
function Lp(e, t) {
  return 180 - Math.abs(Math.abs(e - t) - 180);
}
function gc(e, t) {
  const n = e[0] * t[0][0] + e[1] * t[0][1] + e[2] * t[0][2],
    r = e[0] * t[1][0] + e[1] * t[1][1] + e[2] * t[1][2],
    o = e[0] * t[2][0] + e[1] * t[2][1] + e[2] * t[2][2];
  return [n, r, o];
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ const Pp = [
    [0.41233895, 0.35762064, 0.18051042],
    [0.2126, 0.7152, 0.0722],
    [0.01932141, 0.11916382, 0.95034478],
  ],
  Mp = [
    [3.2413774792388685, -1.5376652402851851, -0.49885366846268053],
    [-0.9691452513005321, 1.8758853451067872, 0.04156585616912061],
    [0.05562093689691305, -0.20395524564742123, 1.0571799111220335],
  ],
  $p = [95.047, 100, 108.883];
function Qc(e, t, n) {
  return ((255 << 24) | ((e & 255) << 16) | ((t & 255) << 8) | (n & 255)) >>> 0;
}
function vd(e) {
  const t = Gr(e[0]),
    n = Gr(e[1]),
    r = Gr(e[2]);
  return Qc(t, n, r);
}
function Pf(e) {
  return (e >> 16) & 255;
}
function Mf(e) {
  return (e >> 8) & 255;
}
function $f(e) {
  return e & 255;
}
function Rp(e, t, n) {
  const r = Mp,
    o = r[0][0] * e + r[0][1] * t + r[0][2] * n,
    i = r[1][0] * e + r[1][1] * t + r[1][2] * n,
    a = r[2][0] * e + r[2][1] * t + r[2][2] * n,
    s = Gr(o),
    c = Gr(i),
    u = Gr(a);
  return Qc(s, c, u);
}
function Dp(e) {
  const t = Do(Pf(e)),
    n = Do(Mf(e)),
    r = Do($f(e));
  return gc([t, n, r], Pp);
}
function _p(e) {
  const t = hr(e),
    n = Gr(t);
  return Qc(n, n, n);
}
function fc(e) {
  const t = Dp(e)[1];
  return 116 * Rf(t / 100) - 16;
}
function hr(e) {
  return 100 * Np((e + 16) / 116);
}
function hc(e) {
  return Rf(e / 100) * 116 - 16;
}
function Do(e) {
  const t = e / 255;
  return t <= 0.040449936
    ? (t / 12.92) * 100
    : Math.pow((t + 0.055) / 1.055, 2.4) * 100;
}
function Gr(e) {
  const t = e / 100;
  let n = 0;
  return (
    t <= 0.0031308
      ? (n = t * 12.92)
      : (n = 1.055 * Math.pow(t, 1 / 2.4) - 0.055),
    kp(0, 255, Math.round(n * 255))
  );
}
function Op() {
  return $p;
}
function Rf(e) {
  const t = 0.008856451679035631,
    n = 24389 / 27;
  return e > t ? Math.pow(e, 1 / 3) : (n * e + 16) / 116;
}
function Np(e) {
  const t = 0.008856451679035631,
    n = 24389 / 27,
    r = e * e * e;
  return r > t ? r : (116 * e - 16) / n;
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class vn {
  static make(
    t = Op(),
    n = ((200 / Math.PI) * hr(50)) / 100,
    r = 50,
    o = 2,
    i = !1
  ) {
    const a = t,
      s = a[0] * 0.401288 + a[1] * 0.650173 + a[2] * -0.051461,
      c = a[0] * -0.250268 + a[1] * 1.204414 + a[2] * 0.045854,
      u = a[0] * -0.002079 + a[1] * 0.048952 + a[2] * 0.953127,
      d = 0.8 + o / 10,
      g =
        d >= 0.9
          ? Bi(0.59, 0.69, (d - 0.9) * 10)
          : Bi(0.525, 0.59, (d - 0.8) * 10);
    let f = i ? 1 : d * (1 - (1 / 3.6) * Math.exp((-n - 42) / 92));
    f = f > 1 ? 1 : f < 0 ? 0 : f;
    const m = d,
      y = [f * (100 / s) + 1 - f, f * (100 / c) + 1 - f, f * (100 / u) + 1 - f],
      b = 1 / (5 * n + 1),
      v = b * b * b * b,
      S = 1 - v,
      A = v * n + 0.1 * S * S * Math.cbrt(5 * n),
      k = hr(r) / t[1],
      T = 1.48 + Math.sqrt(k),
      E = 0.725 / Math.pow(k, 0.2),
      P = E,
      M = [
        Math.pow((A * y[0] * s) / 100, 0.42),
        Math.pow((A * y[1] * c) / 100, 0.42),
        Math.pow((A * y[2] * u) / 100, 0.42),
      ],
      x = [
        (400 * M[0]) / (M[0] + 27.13),
        (400 * M[1]) / (M[1] + 27.13),
        (400 * M[2]) / (M[2] + 27.13),
      ],
      _ = (2 * x[0] + x[1] + 0.05 * x[2]) * E;
    return new vn(k, _, E, P, g, m, y, A, Math.pow(A, 0.25), T);
  }
  constructor(t, n, r, o, i, a, s, c, u, d) {
    (this.n = t),
      (this.aw = n),
      (this.nbb = r),
      (this.ncb = o),
      (this.c = i),
      (this.nc = a),
      (this.rgbD = s),
      (this.fl = c),
      (this.fLRoot = u),
      (this.z = d);
  }
}
vn.DEFAULT = vn.make();
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class gt {
  constructor(t, n, r, o, i, a, s, c, u) {
    (this.hue = t),
      (this.chroma = n),
      (this.j = r),
      (this.q = o),
      (this.m = i),
      (this.s = a),
      (this.jstar = s),
      (this.astar = c),
      (this.bstar = u);
  }
  distance(t) {
    const n = this.jstar - t.jstar,
      r = this.astar - t.astar,
      o = this.bstar - t.bstar,
      i = Math.sqrt(n * n + r * r + o * o);
    return 1.41 * Math.pow(i, 0.63);
  }
  static fromInt(t) {
    return gt.fromIntInViewingConditions(t, vn.DEFAULT);
  }
  static fromIntInViewingConditions(t, n) {
    const r = (t & 16711680) >> 16,
      o = (t & 65280) >> 8,
      i = t & 255,
      a = Do(r),
      s = Do(o),
      c = Do(i),
      u = 0.41233895 * a + 0.35762064 * s + 0.18051042 * c,
      d = 0.2126 * a + 0.7152 * s + 0.0722 * c,
      g = 0.01932141 * a + 0.11916382 * s + 0.95034478 * c,
      f = 0.401288 * u + 0.650173 * d - 0.051461 * g,
      m = -0.250268 * u + 1.204414 * d + 0.045854 * g,
      y = -0.002079 * u + 0.048952 * d + 0.953127 * g,
      b = n.rgbD[0] * f,
      v = n.rgbD[1] * m,
      S = n.rgbD[2] * y,
      A = Math.pow((n.fl * Math.abs(b)) / 100, 0.42),
      k = Math.pow((n.fl * Math.abs(v)) / 100, 0.42),
      T = Math.pow((n.fl * Math.abs(S)) / 100, 0.42),
      E = (Bt(b) * 400 * A) / (A + 27.13),
      P = (Bt(v) * 400 * k) / (k + 27.13),
      M = (Bt(S) * 400 * T) / (T + 27.13),
      x = (11 * E + -12 * P + M) / 11,
      _ = (E + P - 2 * M) / 9,
      R = (20 * E + 20 * P + 21 * M) / 20,
      z = (40 * E + 20 * P + M) / 20,
      ne = (Math.atan2(_, x) * 180) / Math.PI,
      G = ne < 0 ? ne + 360 : ne >= 360 ? ne - 360 : ne,
      Q = (G * Math.PI) / 180,
      ye = z * n.nbb,
      B = 100 * Math.pow(ye / n.aw, n.c * n.z),
      le = (4 / n.c) * Math.sqrt(B / 100) * (n.aw + 4) * n.fLRoot,
      Se = G < 20.14 ? G + 360 : G,
      Ie = 0.25 * (Math.cos((Se * Math.PI) / 180 + 2) + 3.8),
      Ce =
        ((5e4 / 13) * Ie * n.nc * n.ncb * Math.sqrt(x * x + _ * _)) /
        (R + 0.305),
      we = Math.pow(Ce, 0.9) * Math.pow(1.64 - Math.pow(0.29, n.n), 0.73),
      te = we * Math.sqrt(B / 100),
      be = te * n.fLRoot,
      fe = 50 * Math.sqrt((we * n.c) / (n.aw + 4)),
      re = ((1 + 100 * 0.007) * B) / (1 + 0.007 * B),
      Be = (1 / 0.0228) * Math.log(1 + 0.0228 * be),
      Ke = Be * Math.cos(Q),
      Mt = Be * Math.sin(Q);
    return new gt(G, te, B, le, be, fe, re, Ke, Mt);
  }
  static fromJch(t, n, r) {
    return gt.fromJchInViewingConditions(t, n, r, vn.DEFAULT);
  }
  static fromJchInViewingConditions(t, n, r, o) {
    const i = (4 / o.c) * Math.sqrt(t / 100) * (o.aw + 4) * o.fLRoot,
      a = n * o.fLRoot,
      s = n / Math.sqrt(t / 100),
      c = 50 * Math.sqrt((s * o.c) / (o.aw + 4)),
      u = (r * Math.PI) / 180,
      d = ((1 + 100 * 0.007) * t) / (1 + 0.007 * t),
      g = (1 / 0.0228) * Math.log(1 + 0.0228 * a),
      f = g * Math.cos(u),
      m = g * Math.sin(u);
    return new gt(r, n, t, i, a, c, d, f, m);
  }
  static fromUcs(t, n, r) {
    return gt.fromUcsInViewingConditions(t, n, r, vn.DEFAULT);
  }
  static fromUcsInViewingConditions(t, n, r, o) {
    const i = n,
      a = r,
      s = Math.sqrt(i * i + a * a),
      u = (Math.exp(s * 0.0228) - 1) / 0.0228 / o.fLRoot;
    let d = Math.atan2(a, i) * (180 / Math.PI);
    d < 0 && (d += 360);
    const g = t / (1 - (t - 100) * 0.007);
    return gt.fromJchInViewingConditions(g, u, d, o);
  }
  toInt() {
    return this.viewed(vn.DEFAULT);
  }
  viewed(t) {
    const n =
        this.chroma === 0 || this.j === 0
          ? 0
          : this.chroma / Math.sqrt(this.j / 100),
      r = Math.pow(n / Math.pow(1.64 - Math.pow(0.29, t.n), 0.73), 1 / 0.9),
      o = (this.hue * Math.PI) / 180,
      i = 0.25 * (Math.cos(o + 2) + 3.8),
      a = t.aw * Math.pow(this.j / 100, 1 / t.c / t.z),
      s = i * (5e4 / 13) * t.nc * t.ncb,
      c = a / t.nbb,
      u = Math.sin(o),
      d = Math.cos(o),
      g = (23 * (c + 0.305) * r) / (23 * s + 11 * r * d + 108 * r * u),
      f = g * d,
      m = g * u,
      y = (460 * c + 451 * f + 288 * m) / 1403,
      b = (460 * c - 891 * f - 261 * m) / 1403,
      v = (460 * c - 220 * f - 6300 * m) / 1403,
      S = Math.max(0, (27.13 * Math.abs(y)) / (400 - Math.abs(y))),
      A = Bt(y) * (100 / t.fl) * Math.pow(S, 1 / 0.42),
      k = Math.max(0, (27.13 * Math.abs(b)) / (400 - Math.abs(b))),
      T = Bt(b) * (100 / t.fl) * Math.pow(k, 1 / 0.42),
      E = Math.max(0, (27.13 * Math.abs(v)) / (400 - Math.abs(v))),
      P = Bt(v) * (100 / t.fl) * Math.pow(E, 1 / 0.42),
      M = A / t.rgbD[0],
      x = T / t.rgbD[1],
      _ = P / t.rgbD[2],
      R = 1.86206786 * M - 1.01125463 * x + 0.14918677 * _,
      z = 0.38752654 * M + 0.62144744 * x - 0.00897398 * _,
      J = -0.0158415 * M - 0.03412294 * x + 1.04996444 * _;
    return Rp(R, z, J);
  }
  static fromXyzInViewingConditions(t, n, r, o) {
    const i = 0.401288 * t + 0.650173 * n - 0.051461 * r,
      a = -0.250268 * t + 1.204414 * n + 0.045854 * r,
      s = -0.002079 * t + 0.048952 * n + 0.953127 * r,
      c = o.rgbD[0] * i,
      u = o.rgbD[1] * a,
      d = o.rgbD[2] * s,
      g = Math.pow((o.fl * Math.abs(c)) / 100, 0.42),
      f = Math.pow((o.fl * Math.abs(u)) / 100, 0.42),
      m = Math.pow((o.fl * Math.abs(d)) / 100, 0.42),
      y = (Bt(c) * 400 * g) / (g + 27.13),
      b = (Bt(u) * 400 * f) / (f + 27.13),
      v = (Bt(d) * 400 * m) / (m + 27.13),
      S = (11 * y + -12 * b + v) / 11,
      A = (y + b - 2 * v) / 9,
      k = (20 * y + 20 * b + 21 * v) / 20,
      T = (40 * y + 20 * b + v) / 20,
      P = (Math.atan2(A, S) * 180) / Math.PI,
      M = P < 0 ? P + 360 : P >= 360 ? P - 360 : P,
      x = (M * Math.PI) / 180,
      _ = T * o.nbb,
      R = 100 * Math.pow(_ / o.aw, o.c * o.z),
      z = (4 / o.c) * Math.sqrt(R / 100) * (o.aw + 4) * o.fLRoot,
      J = M < 20.14 ? M + 360 : M,
      ne = (1 / 4) * (Math.cos((J * Math.PI) / 180 + 2) + 3.8),
      Q =
        ((5e4 / 13) * ne * o.nc * o.ncb * Math.sqrt(S * S + A * A)) /
        (k + 0.305),
      ye = Math.pow(Q, 0.9) * Math.pow(1.64 - Math.pow(0.29, o.n), 0.73),
      B = ye * Math.sqrt(R / 100),
      le = B * o.fLRoot,
      Se = 50 * Math.sqrt((ye * o.c) / (o.aw + 4)),
      Ie = ((1 + 100 * 0.007) * R) / (1 + 0.007 * R),
      ae = Math.log(1 + 0.0228 * le) / 0.0228,
      Ce = ae * Math.cos(x),
      we = ae * Math.sin(x);
    return new gt(M, B, R, z, le, Se, Ie, Ce, we);
  }
  xyzInViewingConditions(t) {
    const n =
        this.chroma === 0 || this.j === 0
          ? 0
          : this.chroma / Math.sqrt(this.j / 100),
      r = Math.pow(n / Math.pow(1.64 - Math.pow(0.29, t.n), 0.73), 1 / 0.9),
      o = (this.hue * Math.PI) / 180,
      i = 0.25 * (Math.cos(o + 2) + 3.8),
      a = t.aw * Math.pow(this.j / 100, 1 / t.c / t.z),
      s = i * (5e4 / 13) * t.nc * t.ncb,
      c = a / t.nbb,
      u = Math.sin(o),
      d = Math.cos(o),
      g = (23 * (c + 0.305) * r) / (23 * s + 11 * r * d + 108 * r * u),
      f = g * d,
      m = g * u,
      y = (460 * c + 451 * f + 288 * m) / 1403,
      b = (460 * c - 891 * f - 261 * m) / 1403,
      v = (460 * c - 220 * f - 6300 * m) / 1403,
      S = Math.max(0, (27.13 * Math.abs(y)) / (400 - Math.abs(y))),
      A = Bt(y) * (100 / t.fl) * Math.pow(S, 1 / 0.42),
      k = Math.max(0, (27.13 * Math.abs(b)) / (400 - Math.abs(b))),
      T = Bt(b) * (100 / t.fl) * Math.pow(k, 1 / 0.42),
      E = Math.max(0, (27.13 * Math.abs(v)) / (400 - Math.abs(v))),
      P = Bt(v) * (100 / t.fl) * Math.pow(E, 1 / 0.42),
      M = A / t.rgbD[0],
      x = T / t.rgbD[1],
      _ = P / t.rgbD[2],
      R = 1.86206786 * M - 1.01125463 * x + 0.14918677 * _,
      z = 0.38752654 * M + 0.62144744 * x - 0.00897398 * _,
      J = -0.0158415 * M - 0.03412294 * x + 1.04996444 * _;
    return [R, z, J];
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ge {
  static sanitizeRadians(t) {
    return (t + Math.PI * 8) % (Math.PI * 2);
  }
  static trueDelinearized(t) {
    const n = t / 100;
    let r = 0;
    return (
      n <= 0.0031308
        ? (r = n * 12.92)
        : (r = 1.055 * Math.pow(n, 1 / 2.4) - 0.055),
      r * 255
    );
  }
  static chromaticAdaptation(t) {
    const n = Math.pow(Math.abs(t), 0.42);
    return (Bt(t) * 400 * n) / (n + 27.13);
  }
  static hueOf(t) {
    const n = gc(t, ge.SCALED_DISCOUNT_FROM_LINRGB),
      r = ge.chromaticAdaptation(n[0]),
      o = ge.chromaticAdaptation(n[1]),
      i = ge.chromaticAdaptation(n[2]),
      a = (11 * r + -12 * o + i) / 11,
      s = (r + o - 2 * i) / 9;
    return Math.atan2(s, a);
  }
  static areInCyclicOrder(t, n, r) {
    const o = ge.sanitizeRadians(n - t),
      i = ge.sanitizeRadians(r - t);
    return o < i;
  }
  static intercept(t, n, r) {
    return (n - t) / (r - t);
  }
  static lerpPoint(t, n, r) {
    return [
      t[0] + (r[0] - t[0]) * n,
      t[1] + (r[1] - t[1]) * n,
      t[2] + (r[2] - t[2]) * n,
    ];
  }
  static setCoordinate(t, n, r, o) {
    const i = ge.intercept(t[o], n, r[o]);
    return ge.lerpPoint(t, i, r);
  }
  static isBounded(t) {
    return 0 <= t && t <= 100;
  }
  static nthVertex(t, n) {
    const r = ge.Y_FROM_LINRGB[0],
      o = ge.Y_FROM_LINRGB[1],
      i = ge.Y_FROM_LINRGB[2],
      a = n % 4 <= 1 ? 0 : 100,
      s = n % 2 === 0 ? 0 : 100;
    if (n < 4) {
      const c = a,
        u = s,
        d = (t - c * o - u * i) / r;
      return ge.isBounded(d) ? [d, c, u] : [-1, -1, -1];
    } else if (n < 8) {
      const c = a,
        u = s,
        d = (t - u * r - c * i) / o;
      return ge.isBounded(d) ? [u, d, c] : [-1, -1, -1];
    } else {
      const c = a,
        u = s,
        d = (t - c * r - u * o) / i;
      return ge.isBounded(d) ? [c, u, d] : [-1, -1, -1];
    }
  }
  static bisectToSegment(t, n) {
    let r = [-1, -1, -1],
      o = r,
      i = 0,
      a = 0,
      s = !1,
      c = !0;
    for (let u = 0; u < 12; u++) {
      const d = ge.nthVertex(t, u);
      if (d[0] < 0) continue;
      const g = ge.hueOf(d);
      if (!s) {
        (r = d), (o = d), (i = g), (a = g), (s = !0);
        continue;
      }
      (c || ge.areInCyclicOrder(i, g, a)) &&
        ((c = !1),
        ge.areInCyclicOrder(i, n, g) ? ((o = d), (a = g)) : ((r = d), (i = g)));
    }
    return [r, o];
  }
  static midpoint(t, n) {
    return [(t[0] + n[0]) / 2, (t[1] + n[1]) / 2, (t[2] + n[2]) / 2];
  }
  static criticalPlaneBelow(t) {
    return Math.floor(t - 0.5);
  }
  static criticalPlaneAbove(t) {
    return Math.ceil(t - 0.5);
  }
  static bisectToLimit(t, n) {
    const r = ge.bisectToSegment(t, n);
    let o = r[0],
      i = ge.hueOf(o),
      a = r[1];
    for (let s = 0; s < 3; s++)
      if (o[s] !== a[s]) {
        let c = -1,
          u = 255;
        o[s] < a[s]
          ? ((c = ge.criticalPlaneBelow(ge.trueDelinearized(o[s]))),
            (u = ge.criticalPlaneAbove(ge.trueDelinearized(a[s]))))
          : ((c = ge.criticalPlaneAbove(ge.trueDelinearized(o[s]))),
            (u = ge.criticalPlaneBelow(ge.trueDelinearized(a[s]))));
        for (let d = 0; d < 8 && !(Math.abs(u - c) <= 1); d++) {
          const g = Math.floor((c + u) / 2),
            f = ge.CRITICAL_PLANES[g],
            m = ge.setCoordinate(o, f, a, s),
            y = ge.hueOf(m);
          ge.areInCyclicOrder(i, n, y)
            ? ((a = m), (u = g))
            : ((o = m), (i = y), (c = g));
        }
      }
    return ge.midpoint(o, a);
  }
  static inverseChromaticAdaptation(t) {
    const n = Math.abs(t),
      r = Math.max(0, (27.13 * n) / (400 - n));
    return Bt(t) * Math.pow(r, 1 / 0.42);
  }
  static findResultByJ(t, n, r) {
    let o = Math.sqrt(r) * 11;
    const i = vn.DEFAULT,
      a = 1 / Math.pow(1.64 - Math.pow(0.29, i.n), 0.73),
      c = 0.25 * (Math.cos(t + 2) + 3.8) * (5e4 / 13) * i.nc * i.ncb,
      u = Math.sin(t),
      d = Math.cos(t);
    for (let g = 0; g < 5; g++) {
      const f = o / 100,
        m = n === 0 || o === 0 ? 0 : n / Math.sqrt(f),
        y = Math.pow(m * a, 1 / 0.9),
        v = (i.aw * Math.pow(f, 1 / i.c / i.z)) / i.nbb,
        S = (23 * (v + 0.305) * y) / (23 * c + 11 * y * d + 108 * y * u),
        A = S * d,
        k = S * u,
        T = (460 * v + 451 * A + 288 * k) / 1403,
        E = (460 * v - 891 * A - 261 * k) / 1403,
        P = (460 * v - 220 * A - 6300 * k) / 1403,
        M = ge.inverseChromaticAdaptation(T),
        x = ge.inverseChromaticAdaptation(E),
        _ = ge.inverseChromaticAdaptation(P),
        R = gc([M, x, _], ge.LINRGB_FROM_SCALED_DISCOUNT);
      if (R[0] < 0 || R[1] < 0 || R[2] < 0) return 0;
      const z = ge.Y_FROM_LINRGB[0],
        J = ge.Y_FROM_LINRGB[1],
        ne = ge.Y_FROM_LINRGB[2],
        G = z * R[0] + J * R[1] + ne * R[2];
      if (G <= 0) return 0;
      if (g === 4 || Math.abs(G - r) < 0.002)
        return R[0] > 100.01 || R[1] > 100.01 || R[2] > 100.01 ? 0 : vd(R);
      o = o - ((G - r) * o) / (2 * G);
    }
    return 0;
  }
  static solveToInt(t, n, r) {
    if (n < 1e-4 || r < 1e-4 || r > 99.9999) return _p(r);
    t = Zc(t);
    const o = (t / 180) * Math.PI,
      i = hr(r),
      a = ge.findResultByJ(o, n, i);
    if (a !== 0) return a;
    const s = ge.bisectToLimit(i, o);
    return vd(s);
  }
  static solveToCam(t, n, r) {
    return gt.fromInt(ge.solveToInt(t, n, r));
  }
}
ge.SCALED_DISCOUNT_FROM_LINRGB = [
  [0.001200833568784504, 0.002389694492170889, 0.0002795742885861124],
  [0.0005891086651375999, 0.0029785502573438758, 0.0003270666104008398],
  [0.00010146692491640572, 0.0005364214359186694, 0.0032979401770712076],
];
ge.LINRGB_FROM_SCALED_DISCOUNT = [
  [1373.2198709594231, -1100.4251190754821, -7.278681089101213],
  [-271.815969077903, 559.6580465940733, -32.46047482791194],
  [1.9622899599665666, -57.173814538844006, 308.7233197812385],
];
ge.Y_FROM_LINRGB = [0.2126, 0.7152, 0.0722];
ge.CRITICAL_PLANES = [
  0.015176349177441876, 0.045529047532325624, 0.07588174588720938,
  0.10623444424209313, 0.13658714259697685, 0.16693984095186062,
  0.19729253930674434, 0.2276452376616281, 0.2579979360165119,
  0.28835063437139563, 0.3188300904430532, 0.350925934958123,
  0.3848314933096426, 0.42057480301049466, 0.458183274052838,
  0.4976837250274023, 0.5391024159806381, 0.5824650784040898,
  0.6277969426914107, 0.6751227633498623, 0.7244668422128921, 0.775853049866786,
  0.829304845476233, 0.8848452951698498, 0.942497089126609, 1.0022825574869039,
  1.0642236851973577, 1.1283421258858297, 1.1946592148522128,
  1.2631959812511864, 1.3339731595349034, 1.407011200216447, 1.4823302800086415,
  1.5599503113873272, 1.6398909516233677, 1.7221716113234105,
  1.8068114625156377, 1.8938294463134073, 1.9832442801866852, 2.075074464868551,
  2.1693382909216234, 2.2660538449872063, 2.36523901573795, 2.4669114995532007,
  2.5710888059345764, 2.6777882626779785, 2.7870270208169257, 2.898822059350997,
  3.0131901897720907, 3.1301480604002863, 3.2497121605402226,
  3.3718988244681087, 3.4967242352587946, 3.624204428461639, 3.754355295633311,
  3.887192587735158, 4.022731918402185, 4.160988767090289, 4.301978482107941,
  4.445716283538092, 4.592217266055746, 4.741496401646282, 4.893568542229298,
  5.048448422192488, 5.20615066083972, 5.3666897647573375, 5.5300801301023865,
  5.696336044816294, 5.865471690767354, 6.037501145825082, 6.212438385869475,
  6.390297286737924, 6.571091626112461, 6.7548350853498045, 6.941541251256611,
  7.131223617812143, 7.323895587840543, 7.5195704746346665, 7.7182615035334345,
  7.919981813454504, 8.124744458384042, 8.332562408825165, 8.543448553206703,
  8.757415699253682, 8.974476575321063, 9.194643831691977, 9.417930041841839,
  9.644347703669503, 9.873909240696694, 10.106627003236781, 10.342513269534024,
  10.58158024687427, 10.8238400726681, 11.069304815507364, 11.317986476196008,
  11.569896988756009, 11.825048221409341, 12.083451977536606,
  12.345119996613247, 12.610063955123938, 12.878295467455942,
  13.149826086772048, 13.42466730586372, 13.702830557985108, 13.984327217668513,
  14.269168601521828, 14.55736596900856, 14.848930523210871, 15.143873411576273,
  15.44220572664832, 15.743938506781891, 16.04908273684337, 16.35764934889634,
  16.66964922287304, 16.985093187232053, 17.30399201960269, 17.62635644741625,
  17.95219714852476, 18.281524751807332, 18.614349837764564, 18.95068293910138,
  19.290534541298456, 19.633915083172692, 19.98083495742689, 20.331304511189067,
  20.685334046541502, 21.042933821039977, 21.404114048223256, 21.76888489811322,
  22.137256497705877, 22.50923893145328, 22.884842241736916, 23.264076429332462,
  23.6469514538663, 24.033477234264016, 24.42366364919083, 24.817520537484558,
  25.21505769858089, 25.61628489293138, 26.021211842414342, 26.429848230738664,
  26.842203703840827, 27.258287870275353, 27.678110301598522, 28.10168053274597,
  28.529008062403893, 28.96010235337422, 29.39497283293396, 29.83362889318845,
  30.276079891419332, 30.722335150426627, 31.172403958865512, 31.62629557157785,
  32.08401920991837, 32.54558406207592, 33.010999283389665, 33.4802739966603,
  33.953417292456834, 34.430438229418264, 34.911345834551085, 35.39614910352207,
  35.88485700094671, 36.37747846067349, 36.87402238606382, 37.37449765026789,
  37.87891309649659, 38.38727753828926, 38.89959975977785, 39.41588851594697,
  39.93615253289054, 40.460400508064545, 40.98864111053629, 41.520882981230194,
  42.05713473317016, 42.597404951718396, 43.141702194811224, 43.6900349931913,
  44.24241185063697, 44.798841244188324, 45.35933162437017, 45.92389141541209,
  46.49252901546552, 47.065252796817916, 47.64207110610409, 48.22299226451468,
  48.808024568002054, 49.3971762874833, 49.9904556690408, 50.587870934119984,
  51.189430279724725, 51.79514187861014, 52.40501387947288, 53.0190544071392,
  53.637271562750364, 54.259673423945976, 54.88626804504493, 55.517063457223934,
  56.15206766869424, 56.79128866487574, 57.43473440856916, 58.08241284012621,
  58.734331877617365, 59.39049941699807, 60.05092333227251, 60.715611475655585,
  61.38457167773311, 62.057811747619894, 62.7353394731159, 63.417162620860914,
  64.10328893648692, 64.79372614476921, 65.48848194977529, 66.18756403501224,
  66.89098006357258, 67.59873767827808, 68.31084450182222, 69.02730813691093,
  69.74813616640164, 70.47333615344107, 71.20291564160104, 71.93688215501312,
  72.67524319850172, 73.41800625771542, 74.16517879925733, 74.9167682708136,
  75.67278210128072, 76.43322770089146, 77.1981124613393, 77.96744375590167,
  78.74122893956174, 79.51947534912904, 80.30219030335869, 81.08938110306934,
  81.88105503125999, 82.67721935322541, 83.4778813166706, 84.28304815182372,
  85.09272707154808, 85.90692527145302, 86.72564993000343, 87.54890820862819,
  88.3767072518277, 89.2090541872801, 90.04595612594655, 90.88742016217518,
  91.73345337380438, 92.58406282226491, 93.43925555268066, 94.29903859396902,
  95.16341895893969, 96.03240364439274, 96.9059996312159, 97.78421388448044,
  98.6670533535366, 99.55452497210776,
];
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class ft {
  static from(t, n, r) {
    return new ft(ge.solveToInt(t, n, r));
  }
  static fromInt(t) {
    return new ft(t);
  }
  toInt() {
    return this.argb;
  }
  get hue() {
    return this.internalHue;
  }
  set hue(t) {
    this.setInternalState(
      ge.solveToInt(t, this.internalChroma, this.internalTone)
    );
  }
  get chroma() {
    return this.internalChroma;
  }
  set chroma(t) {
    this.setInternalState(
      ge.solveToInt(this.internalHue, t, this.internalTone)
    );
  }
  get tone() {
    return this.internalTone;
  }
  set tone(t) {
    this.setInternalState(
      ge.solveToInt(this.internalHue, this.internalChroma, t)
    );
  }
  constructor(t) {
    this.argb = t;
    const n = gt.fromInt(t);
    (this.internalHue = n.hue),
      (this.internalChroma = n.chroma),
      (this.internalTone = fc(t)),
      (this.argb = t);
  }
  setInternalState(t) {
    const n = gt.fromInt(t);
    (this.internalHue = n.hue),
      (this.internalChroma = n.chroma),
      (this.internalTone = fc(t)),
      (this.argb = t);
  }
  inViewingConditions(t) {
    const r = gt.fromInt(this.toInt()).xyzInViewingConditions(t),
      o = gt.fromXyzInViewingConditions(r[0], r[1], r[2], vn.make());
    return ft.from(o.hue, o.chroma, hc(r[1]));
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Jc {
  static harmonize(t, n) {
    const r = ft.fromInt(t),
      o = ft.fromInt(n),
      i = Lp(r.hue, o.hue),
      a = Math.min(i * 0.5, 15),
      s = Zc(r.hue + a * Tp(r.hue, o.hue));
    return ft.from(s, r.chroma, r.tone).toInt();
  }
  static hctHue(t, n, r) {
    const o = Jc.cam16Ucs(t, n, r),
      i = gt.fromInt(o),
      a = gt.fromInt(t);
    return ft.from(i.hue, a.chroma, fc(t)).toInt();
  }
  static cam16Ucs(t, n, r) {
    const o = gt.fromInt(t),
      i = gt.fromInt(n),
      a = o.jstar,
      s = o.astar,
      c = o.bstar,
      u = i.jstar,
      d = i.astar,
      g = i.bstar,
      f = a + (u - a) * r,
      m = s + (d - s) * r,
      y = c + (g - c) * r;
    return gt.fromUcs(f, m, y).toInt();
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class dt {
  static ratioOfTones(t, n) {
    return (t = Qa(0, 100, t)), (n = Qa(0, 100, n)), dt.ratioOfYs(hr(t), hr(n));
  }
  static ratioOfYs(t, n) {
    const r = t > n ? t : n,
      o = r === n ? t : n;
    return (r + 5) / (o + 5);
  }
  static lighter(t, n) {
    if (t < 0 || t > 100) return -1;
    const r = hr(t),
      o = n * (r + 5) - 5,
      i = dt.ratioOfYs(o, r),
      a = Math.abs(i - n);
    if (i < n && a > 0.04) return -1;
    const s = hc(o) + 0.4;
    return s < 0 || s > 100 ? -1 : s;
  }
  static darker(t, n) {
    if (t < 0 || t > 100) return -1;
    const r = hr(t),
      o = (r + 5) / n - 5,
      i = dt.ratioOfYs(r, o),
      a = Math.abs(i - n);
    if (i < n && a > 0.04) return -1;
    const s = hc(o) - 0.4;
    return s < 0 || s > 100 ? -1 : s;
  }
  static lighterUnsafe(t, n) {
    const r = dt.lighter(t, n);
    return r < 0 ? 100 : r;
  }
  static darkerUnsafe(t, n) {
    const r = dt.darker(t, n);
    return r < 0 ? 0 : r;
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class eu {
  static isDisliked(t) {
    const n = Math.round(t.hue) >= 90 && Math.round(t.hue) <= 111,
      r = Math.round(t.chroma) > 16,
      o = Math.round(t.tone) < 65;
    return n && r && o;
  }
  static fixIfDisliked(t) {
    return eu.isDisliked(t) ? ft.from(t.hue, t.chroma, 70) : t;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class X {
  static fromPalette(t) {
    var n, r;
    return new X(
      (n = t.name) != null ? n : "",
      t.palette,
      t.tone,
      (r = t.isBackground) != null ? r : !1,
      t.background,
      t.secondBackground,
      t.contrastCurve,
      t.toneDeltaPair
    );
  }
  constructor(t, n, r, o, i, a, s, c) {
    if (
      ((this.name = t),
      (this.palette = n),
      (this.tone = r),
      (this.isBackground = o),
      (this.background = i),
      (this.secondBackground = a),
      (this.contrastCurve = s),
      (this.toneDeltaPair = c),
      (this.hctCache = new Map()),
      !i && a)
    )
      throw new Error(
        `Color ${t} has secondBackgrounddefined, but background is not defined.`
      );
    if (!i && s)
      throw new Error(
        `Color ${t} has contrastCurvedefined, but background is not defined.`
      );
    if (i && !s)
      throw new Error(
        `Color ${t} has backgrounddefined, but contrastCurve is not defined.`
      );
  }
  getArgb(t) {
    return this.getHct(t).toInt();
  }
  getHct(t) {
    const n = this.hctCache.get(t);
    if (n != null) return n;
    const r = this.getTone(t),
      o = this.palette(t).getHct(r);
    return (
      this.hctCache.size > 4 && this.hctCache.clear(),
      this.hctCache.set(t, o),
      o
    );
  }
  getTone(t) {
    const n = t.contrastLevel < 0;
    if (this.toneDeltaPair) {
      const r = this.toneDeltaPair(t),
        o = r.roleA,
        i = r.roleB,
        a = r.delta,
        s = r.polarity,
        c = r.stayTogether,
        d = this.background(t).getTone(t),
        g =
          s === "nearer" ||
          (s === "lighter" && !t.isDark) ||
          (s === "darker" && t.isDark),
        f = g ? o : i,
        m = g ? i : o,
        y = this.name === f.name,
        b = t.isDark ? 1 : -1,
        v = f.contrastCurve.getContrast(t.contrastLevel),
        S = m.contrastCurve.getContrast(t.contrastLevel),
        A = f.tone(t);
      let k = dt.ratioOfTones(d, A) >= v ? A : X.foregroundTone(d, v);
      const T = m.tone(t);
      let E = dt.ratioOfTones(d, T) >= S ? T : X.foregroundTone(d, S);
      return (
        n && ((k = X.foregroundTone(d, v)), (E = X.foregroundTone(d, S))),
        (E - k) * b >= a ||
          ((E = Qa(0, 100, k + a * b)),
          (E - k) * b >= a || (k = Qa(0, 100, E - a * b))),
        50 <= k && k < 60
          ? b > 0
            ? ((k = 60), (E = Math.max(E, k + a * b)))
            : ((k = 49), (E = Math.min(E, k + a * b)))
          : 50 <= E &&
            E < 60 &&
            (c
              ? b > 0
                ? ((k = 60), (E = Math.max(E, k + a * b)))
                : ((k = 49), (E = Math.min(E, k + a * b)))
              : b > 0
              ? (E = 60)
              : (E = 49)),
        y ? k : E
      );
    } else {
      let r = this.tone(t);
      if (this.background == null) return r;
      const o = this.background(t).getTone(t),
        i = this.contrastCurve.getContrast(t.contrastLevel);
      if (
        (dt.ratioOfTones(o, r) >= i || (r = X.foregroundTone(o, i)),
        n && (r = X.foregroundTone(o, i)),
        this.isBackground &&
          50 <= r &&
          r < 60 &&
          (dt.ratioOfTones(49, o) >= i ? (r = 49) : (r = 60)),
        this.secondBackground)
      ) {
        const [a, s] = [this.background, this.secondBackground],
          [c, u] = [a(t).getTone(t), s(t).getTone(t)],
          [d, g] = [Math.max(c, u), Math.min(c, u)];
        if (dt.ratioOfTones(d, r) >= i && dt.ratioOfTones(g, r) >= i) return r;
        const f = dt.lighter(d, i),
          m = dt.darker(g, i),
          y = [];
        return (
          f !== -1 && y.push(f),
          m !== -1 && y.push(m),
          X.tonePrefersLightForeground(c) || X.tonePrefersLightForeground(u)
            ? f < 0
              ? 100
              : f
            : y.length === 1
            ? y[0]
            : m < 0
            ? 0
            : m
        );
      }
      return r;
    }
  }
  static foregroundTone(t, n) {
    const r = dt.lighterUnsafe(t, n),
      o = dt.darkerUnsafe(t, n),
      i = dt.ratioOfTones(r, t),
      a = dt.ratioOfTones(o, t);
    if (X.tonePrefersLightForeground(t)) {
      const c = Math.abs(i - a) < 0.1 && i < n && a < n;
      return i >= n || i >= a || c ? r : o;
    } else return a >= n || a >= i ? o : r;
  }
  static tonePrefersLightForeground(t) {
    return Math.round(t) < 60;
  }
  static toneAllowsLightForeground(t) {
    return Math.round(t) <= 49;
  }
  static enableLightForeground(t) {
    return X.tonePrefersLightForeground(t) && !X.toneAllowsLightForeground(t)
      ? 49
      : t;
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ var ji;
(function (e) {
  (e[(e.MONOCHROME = 0)] = "MONOCHROME"),
    (e[(e.NEUTRAL = 1)] = "NEUTRAL"),
    (e[(e.TONAL_SPOT = 2)] = "TONAL_SPOT"),
    (e[(e.VIBRANT = 3)] = "VIBRANT"),
    (e[(e.EXPRESSIVE = 4)] = "EXPRESSIVE"),
    (e[(e.FIDELITY = 5)] = "FIDELITY"),
    (e[(e.CONTENT = 6)] = "CONTENT"),
    (e[(e.RAINBOW = 7)] = "RAINBOW"),
    (e[(e.FRUIT_SALAD = 8)] = "FRUIT_SALAD");
})(ji || (ji = {}));
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Me {
  constructor(t, n, r, o) {
    (this.low = t), (this.normal = n), (this.medium = r), (this.high = o);
  }
  getContrast(t) {
    return t <= -1
      ? this.low
      : t < 0
      ? Bi(this.low, this.normal, (t - -1) / 1)
      : t < 0.5
      ? Bi(this.normal, this.medium, (t - 0) / 0.5)
      : t < 1
      ? Bi(this.medium, this.high, (t - 0.5) / 0.5)
      : this.high;
  }
}
/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class qt {
  constructor(t, n, r, o, i) {
    (this.roleA = t),
      (this.roleB = n),
      (this.delta = r),
      (this.polarity = o),
      (this.stayTogether = i);
  }
}
/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Xo(e) {
  return e.variant === ji.FIDELITY || e.variant === ji.CONTENT;
}
function rt(e) {
  return e.variant === ji.MONOCHROME;
}
function Fp(e, t, n, r) {
  let o = n,
    i = ft.from(e, t, n);
  if (i.chroma < t) {
    let a = i.chroma;
    for (; i.chroma < t; ) {
      o += r ? -1 : 1;
      const s = ft.from(e, t, o);
      if (a > s.chroma || Math.abs(s.chroma - t) < 0.4) break;
      const c = Math.abs(s.chroma - t),
        u = Math.abs(i.chroma - t);
      c < u && (i = s), (a = Math.max(a, s.chroma));
    }
  }
  return o;
}
function Bp(e) {
  return vn.make(void 0, void 0, e.isDark ? 30 : 80, void 0, void 0);
}
function tu(e, t) {
  const n = e.inViewingConditions(Bp(t));
  return X.tonePrefersLightForeground(e.tone) &&
    !X.toneAllowsLightForeground(n.tone)
    ? X.enableLightForeground(e.tone)
    : X.enableLightForeground(n.tone);
}
class O {
  static highestSurface(t) {
    return t.isDark ? O.surfaceBright : O.surfaceDim;
  }
}
O.contentAccentToneDelta = 15;
O.primaryPaletteKeyColor = X.fromPalette({
  name: "primary_palette_key_color",
  palette: (e) => e.primaryPalette,
  tone: (e) => e.primaryPalette.keyColor.tone,
});
O.secondaryPaletteKeyColor = X.fromPalette({
  name: "secondary_palette_key_color",
  palette: (e) => e.secondaryPalette,
  tone: (e) => e.secondaryPalette.keyColor.tone,
});
O.tertiaryPaletteKeyColor = X.fromPalette({
  name: "tertiary_palette_key_color",
  palette: (e) => e.tertiaryPalette,
  tone: (e) => e.tertiaryPalette.keyColor.tone,
});
O.neutralPaletteKeyColor = X.fromPalette({
  name: "neutral_palette_key_color",
  palette: (e) => e.neutralPalette,
  tone: (e) => e.neutralPalette.keyColor.tone,
});
O.neutralVariantPaletteKeyColor = X.fromPalette({
  name: "neutral_variant_palette_key_color",
  palette: (e) => e.neutralVariantPalette,
  tone: (e) => e.neutralVariantPalette.keyColor.tone,
});
O.background = X.fromPalette({
  name: "background",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 6 : 98),
  isBackground: !0,
});
O.onBackground = X.fromPalette({
  name: "on_background",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 90 : 10),
  background: (e) => O.background,
  contrastCurve: new Me(3, 3, 4.5, 7),
});
O.surface = X.fromPalette({
  name: "surface",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 6 : 98),
  isBackground: !0,
});
O.surfaceDim = X.fromPalette({
  name: "surface_dim",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 6 : 87),
  isBackground: !0,
});
O.surfaceBright = X.fromPalette({
  name: "surface_bright",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 24 : 98),
  isBackground: !0,
});
O.surfaceContainerLowest = X.fromPalette({
  name: "surface_container_lowest",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 4 : 100),
  isBackground: !0,
});
O.surfaceContainerLow = X.fromPalette({
  name: "surface_container_low",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 10 : 96),
  isBackground: !0,
});
O.surfaceContainer = X.fromPalette({
  name: "surface_container",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 12 : 94),
  isBackground: !0,
});
O.surfaceContainerHigh = X.fromPalette({
  name: "surface_container_high",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 17 : 92),
  isBackground: !0,
});
O.surfaceContainerHighest = X.fromPalette({
  name: "surface_container_highest",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 22 : 90),
  isBackground: !0,
});
O.onSurface = X.fromPalette({
  name: "on_surface",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 90 : 10),
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.surfaceVariant = X.fromPalette({
  name: "surface_variant",
  palette: (e) => e.neutralVariantPalette,
  tone: (e) => (e.isDark ? 30 : 90),
  isBackground: !0,
});
O.onSurfaceVariant = X.fromPalette({
  name: "on_surface_variant",
  palette: (e) => e.neutralVariantPalette,
  tone: (e) => (e.isDark ? 80 : 30),
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(3, 4.5, 7, 11),
});
O.inverseSurface = X.fromPalette({
  name: "inverse_surface",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 90 : 20),
});
O.inverseOnSurface = X.fromPalette({
  name: "inverse_on_surface",
  palette: (e) => e.neutralPalette,
  tone: (e) => (e.isDark ? 20 : 95),
  background: (e) => O.inverseSurface,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.outline = X.fromPalette({
  name: "outline",
  palette: (e) => e.neutralVariantPalette,
  tone: (e) => (e.isDark ? 60 : 50),
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1.5, 3, 4.5, 7),
});
O.outlineVariant = X.fromPalette({
  name: "outline_variant",
  palette: (e) => e.neutralVariantPalette,
  tone: (e) => (e.isDark ? 30 : 80),
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
});
O.shadow = X.fromPalette({
  name: "shadow",
  palette: (e) => e.neutralPalette,
  tone: (e) => 0,
});
O.scrim = X.fromPalette({
  name: "scrim",
  palette: (e) => e.neutralPalette,
  tone: (e) => 0,
});
O.surfaceTint = X.fromPalette({
  name: "surface_tint",
  palette: (e) => e.primaryPalette,
  tone: (e) => (e.isDark ? 80 : 40),
  isBackground: !0,
});
O.primary = X.fromPalette({
  name: "primary",
  palette: (e) => e.primaryPalette,
  tone: (e) => (rt(e) ? (e.isDark ? 100 : 0) : e.isDark ? 80 : 40),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(3, 4.5, 7, 11),
  toneDeltaPair: (e) => new qt(O.primaryContainer, O.primary, 15, "nearer", !1),
});
O.onPrimary = X.fromPalette({
  name: "on_primary",
  palette: (e) => e.primaryPalette,
  tone: (e) => (rt(e) ? (e.isDark ? 10 : 90) : e.isDark ? 20 : 100),
  background: (e) => O.primary,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.primaryContainer = X.fromPalette({
  name: "primary_container",
  palette: (e) => e.primaryPalette,
  tone: (e) =>
    Xo(e)
      ? tu(e.sourceColorHct, e)
      : rt(e)
      ? e.isDark
        ? 85
        : 25
      : e.isDark
      ? 30
      : 90,
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) => new qt(O.primaryContainer, O.primary, 15, "nearer", !1),
});
O.onPrimaryContainer = X.fromPalette({
  name: "on_primary_container",
  palette: (e) => e.primaryPalette,
  tone: (e) =>
    Xo(e)
      ? X.foregroundTone(O.primaryContainer.tone(e), 4.5)
      : rt(e)
      ? e.isDark
        ? 0
        : 100
      : e.isDark
      ? 90
      : 10,
  background: (e) => O.primaryContainer,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.inversePrimary = X.fromPalette({
  name: "inverse_primary",
  palette: (e) => e.primaryPalette,
  tone: (e) => (e.isDark ? 40 : 80),
  background: (e) => O.inverseSurface,
  contrastCurve: new Me(3, 4.5, 7, 11),
});
O.secondary = X.fromPalette({
  name: "secondary",
  palette: (e) => e.secondaryPalette,
  tone: (e) => (e.isDark ? 80 : 40),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(3, 4.5, 7, 11),
  toneDeltaPair: (e) =>
    new qt(O.secondaryContainer, O.secondary, 15, "nearer", !1),
});
O.onSecondary = X.fromPalette({
  name: "on_secondary",
  palette: (e) => e.secondaryPalette,
  tone: (e) => (rt(e) ? (e.isDark ? 10 : 100) : e.isDark ? 20 : 100),
  background: (e) => O.secondary,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.secondaryContainer = X.fromPalette({
  name: "secondary_container",
  palette: (e) => e.secondaryPalette,
  tone: (e) => {
    const t = e.isDark ? 30 : 90;
    if (rt(e)) return e.isDark ? 30 : 85;
    if (!Xo(e)) return t;
    let n = Fp(e.secondaryPalette.hue, e.secondaryPalette.chroma, t, !e.isDark);
    return (n = tu(e.secondaryPalette.getHct(n), e)), n;
  },
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) =>
    new qt(O.secondaryContainer, O.secondary, 15, "nearer", !1),
});
O.onSecondaryContainer = X.fromPalette({
  name: "on_secondary_container",
  palette: (e) => e.secondaryPalette,
  tone: (e) =>
    Xo(e)
      ? X.foregroundTone(O.secondaryContainer.tone(e), 4.5)
      : e.isDark
      ? 90
      : 10,
  background: (e) => O.secondaryContainer,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.tertiary = X.fromPalette({
  name: "tertiary",
  palette: (e) => e.tertiaryPalette,
  tone: (e) => (rt(e) ? (e.isDark ? 90 : 25) : e.isDark ? 80 : 40),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(3, 4.5, 7, 11),
  toneDeltaPair: (e) =>
    new qt(O.tertiaryContainer, O.tertiary, 15, "nearer", !1),
});
O.onTertiary = X.fromPalette({
  name: "on_tertiary",
  palette: (e) => e.tertiaryPalette,
  tone: (e) => (rt(e) ? (e.isDark ? 10 : 90) : e.isDark ? 20 : 100),
  background: (e) => O.tertiary,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.tertiaryContainer = X.fromPalette({
  name: "tertiary_container",
  palette: (e) => e.tertiaryPalette,
  tone: (e) => {
    if (rt(e)) return e.isDark ? 60 : 49;
    if (!Xo(e)) return e.isDark ? 30 : 90;
    const t = tu(e.tertiaryPalette.getHct(e.sourceColorHct.tone), e),
      n = e.tertiaryPalette.getHct(t);
    return eu.fixIfDisliked(n).tone;
  },
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) =>
    new qt(O.tertiaryContainer, O.tertiary, 15, "nearer", !1),
});
O.onTertiaryContainer = X.fromPalette({
  name: "on_tertiary_container",
  palette: (e) => e.tertiaryPalette,
  tone: (e) =>
    rt(e)
      ? e.isDark
        ? 0
        : 100
      : Xo(e)
      ? X.foregroundTone(O.tertiaryContainer.tone(e), 4.5)
      : e.isDark
      ? 90
      : 10,
  background: (e) => O.tertiaryContainer,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.error = X.fromPalette({
  name: "error",
  palette: (e) => e.errorPalette,
  tone: (e) => (e.isDark ? 80 : 40),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(3, 4.5, 7, 11),
  toneDeltaPair: (e) => new qt(O.errorContainer, O.error, 15, "nearer", !1),
});
O.onError = X.fromPalette({
  name: "on_error",
  palette: (e) => e.errorPalette,
  tone: (e) => (e.isDark ? 20 : 100),
  background: (e) => O.error,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.errorContainer = X.fromPalette({
  name: "error_container",
  palette: (e) => e.errorPalette,
  tone: (e) => (e.isDark ? 30 : 90),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) => new qt(O.errorContainer, O.error, 15, "nearer", !1),
});
O.onErrorContainer = X.fromPalette({
  name: "on_error_container",
  palette: (e) => e.errorPalette,
  tone: (e) => (e.isDark ? 90 : 10),
  background: (e) => O.errorContainer,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.primaryFixed = X.fromPalette({
  name: "primary_fixed",
  palette: (e) => e.primaryPalette,
  tone: (e) => (rt(e) ? 40 : 90),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) =>
    new qt(O.primaryFixed, O.primaryFixedDim, 10, "lighter", !0),
});
O.primaryFixedDim = X.fromPalette({
  name: "primary_fixed_dim",
  palette: (e) => e.primaryPalette,
  tone: (e) => (rt(e) ? 30 : 80),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) =>
    new qt(O.primaryFixed, O.primaryFixedDim, 10, "lighter", !0),
});
O.onPrimaryFixed = X.fromPalette({
  name: "on_primary_fixed",
  palette: (e) => e.primaryPalette,
  tone: (e) => (rt(e) ? 100 : 10),
  background: (e) => O.primaryFixedDim,
  secondBackground: (e) => O.primaryFixed,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.onPrimaryFixedVariant = X.fromPalette({
  name: "on_primary_fixed_variant",
  palette: (e) => e.primaryPalette,
  tone: (e) => (rt(e) ? 90 : 30),
  background: (e) => O.primaryFixedDim,
  secondBackground: (e) => O.primaryFixed,
  contrastCurve: new Me(3, 4.5, 7, 11),
});
O.secondaryFixed = X.fromPalette({
  name: "secondary_fixed",
  palette: (e) => e.secondaryPalette,
  tone: (e) => (rt(e) ? 80 : 90),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) =>
    new qt(O.secondaryFixed, O.secondaryFixedDim, 10, "lighter", !0),
});
O.secondaryFixedDim = X.fromPalette({
  name: "secondary_fixed_dim",
  palette: (e) => e.secondaryPalette,
  tone: (e) => (rt(e) ? 70 : 80),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) =>
    new qt(O.secondaryFixed, O.secondaryFixedDim, 10, "lighter", !0),
});
O.onSecondaryFixed = X.fromPalette({
  name: "on_secondary_fixed",
  palette: (e) => e.secondaryPalette,
  tone: (e) => 10,
  background: (e) => O.secondaryFixedDim,
  secondBackground: (e) => O.secondaryFixed,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.onSecondaryFixedVariant = X.fromPalette({
  name: "on_secondary_fixed_variant",
  palette: (e) => e.secondaryPalette,
  tone: (e) => (rt(e) ? 25 : 30),
  background: (e) => O.secondaryFixedDim,
  secondBackground: (e) => O.secondaryFixed,
  contrastCurve: new Me(3, 4.5, 7, 11),
});
O.tertiaryFixed = X.fromPalette({
  name: "tertiary_fixed",
  palette: (e) => e.tertiaryPalette,
  tone: (e) => (rt(e) ? 40 : 90),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) =>
    new qt(O.tertiaryFixed, O.tertiaryFixedDim, 10, "lighter", !0),
});
O.tertiaryFixedDim = X.fromPalette({
  name: "tertiary_fixed_dim",
  palette: (e) => e.tertiaryPalette,
  tone: (e) => (rt(e) ? 30 : 80),
  isBackground: !0,
  background: (e) => O.highestSurface(e),
  contrastCurve: new Me(1, 1, 3, 7),
  toneDeltaPair: (e) =>
    new qt(O.tertiaryFixed, O.tertiaryFixedDim, 10, "lighter", !0),
});
O.onTertiaryFixed = X.fromPalette({
  name: "on_tertiary_fixed",
  palette: (e) => e.tertiaryPalette,
  tone: (e) => (rt(e) ? 100 : 10),
  background: (e) => O.tertiaryFixedDim,
  secondBackground: (e) => O.tertiaryFixed,
  contrastCurve: new Me(4.5, 7, 11, 21),
});
O.onTertiaryFixedVariant = X.fromPalette({
  name: "on_tertiary_fixed_variant",
  palette: (e) => e.tertiaryPalette,
  tone: (e) => (rt(e) ? 90 : 30),
  background: (e) => O.tertiaryFixedDim,
  secondBackground: (e) => O.tertiaryFixed,
  contrastCurve: new Me(3, 4.5, 7, 11),
});
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class bt {
  static fromInt(t) {
    const n = ft.fromInt(t);
    return bt.fromHct(n);
  }
  static fromHct(t) {
    return new bt(t.hue, t.chroma, t);
  }
  static fromHueAndChroma(t, n) {
    return new bt(t, n, bt.createKeyColor(t, n));
  }
  constructor(t, n, r) {
    (this.hue = t),
      (this.chroma = n),
      (this.keyColor = r),
      (this.cache = new Map());
  }
  static createKeyColor(t, n) {
    let o = ft.from(t, n, 50),
      i = Math.abs(o.chroma - n);
    for (let a = 1; a < 50; a += 1) {
      if (Math.round(n) === Math.round(o.chroma)) return o;
      const s = ft.from(t, n, 50 + a),
        c = Math.abs(s.chroma - n);
      c < i && ((i = c), (o = s));
      const u = ft.from(t, n, 50 - a),
        d = Math.abs(u.chroma - n);
      d < i && ((i = d), (o = u));
    }
    return o;
  }
  tone(t) {
    let n = this.cache.get(t);
    return (
      n === void 0 &&
        ((n = ft.from(this.hue, this.chroma, t).toInt()), this.cache.set(t, n)),
      n
    );
  }
  getHct(t) {
    return ft.fromInt(this.tone(t));
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class wt {
  static of(t) {
    return new wt(t, !1);
  }
  static contentOf(t) {
    return new wt(t, !0);
  }
  static fromColors(t) {
    return wt.createPaletteFromColors(!1, t);
  }
  static contentFromColors(t) {
    return wt.createPaletteFromColors(!0, t);
  }
  static createPaletteFromColors(t, n) {
    const r = new wt(n.primary, t);
    if (n.secondary) {
      const o = new wt(n.secondary, t);
      r.a2 = o.a1;
    }
    if (n.tertiary) {
      const o = new wt(n.tertiary, t);
      r.a3 = o.a1;
    }
    if (n.error) {
      const o = new wt(n.error, t);
      r.error = o.a1;
    }
    if (n.neutral) {
      const o = new wt(n.neutral, t);
      r.n1 = o.n1;
    }
    if (n.neutralVariant) {
      const o = new wt(n.neutralVariant, t);
      r.n2 = o.n2;
    }
    return r;
  }
  constructor(t, n) {
    const r = ft.fromInt(t),
      o = r.hue,
      i = r.chroma;
    n
      ? ((this.a1 = bt.fromHueAndChroma(o, i)),
        (this.a2 = bt.fromHueAndChroma(o, i / 3)),
        (this.a3 = bt.fromHueAndChroma(o + 60, i / 2)),
        (this.n1 = bt.fromHueAndChroma(o, Math.min(i / 12, 4))),
        (this.n2 = bt.fromHueAndChroma(o, Math.min(i / 6, 8))))
      : ((this.a1 = bt.fromHueAndChroma(o, Math.max(48, i))),
        (this.a2 = bt.fromHueAndChroma(o, 16)),
        (this.a3 = bt.fromHueAndChroma(o + 60, 24)),
        (this.n1 = bt.fromHueAndChroma(o, 4)),
        (this.n2 = bt.fromHueAndChroma(o, 8))),
      (this.error = bt.fromHueAndChroma(25, 84));
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ class Xn {
  get primary() {
    return this.props.primary;
  }
  get onPrimary() {
    return this.props.onPrimary;
  }
  get primaryContainer() {
    return this.props.primaryContainer;
  }
  get onPrimaryContainer() {
    return this.props.onPrimaryContainer;
  }
  get secondary() {
    return this.props.secondary;
  }
  get onSecondary() {
    return this.props.onSecondary;
  }
  get secondaryContainer() {
    return this.props.secondaryContainer;
  }
  get onSecondaryContainer() {
    return this.props.onSecondaryContainer;
  }
  get tertiary() {
    return this.props.tertiary;
  }
  get onTertiary() {
    return this.props.onTertiary;
  }
  get tertiaryContainer() {
    return this.props.tertiaryContainer;
  }
  get onTertiaryContainer() {
    return this.props.onTertiaryContainer;
  }
  get error() {
    return this.props.error;
  }
  get onError() {
    return this.props.onError;
  }
  get errorContainer() {
    return this.props.errorContainer;
  }
  get onErrorContainer() {
    return this.props.onErrorContainer;
  }
  get background() {
    return this.props.background;
  }
  get onBackground() {
    return this.props.onBackground;
  }
  get surface() {
    return this.props.surface;
  }
  get onSurface() {
    return this.props.onSurface;
  }
  get surfaceVariant() {
    return this.props.surfaceVariant;
  }
  get onSurfaceVariant() {
    return this.props.onSurfaceVariant;
  }
  get outline() {
    return this.props.outline;
  }
  get outlineVariant() {
    return this.props.outlineVariant;
  }
  get shadow() {
    return this.props.shadow;
  }
  get scrim() {
    return this.props.scrim;
  }
  get inverseSurface() {
    return this.props.inverseSurface;
  }
  get inverseOnSurface() {
    return this.props.inverseOnSurface;
  }
  get inversePrimary() {
    return this.props.inversePrimary;
  }
  static light(t) {
    return Xn.lightFromCorePalette(wt.of(t));
  }
  static dark(t) {
    return Xn.darkFromCorePalette(wt.of(t));
  }
  static lightContent(t) {
    return Xn.lightFromCorePalette(wt.contentOf(t));
  }
  static darkContent(t) {
    return Xn.darkFromCorePalette(wt.contentOf(t));
  }
  static lightFromCorePalette(t) {
    return new Xn({
      primary: t.a1.tone(40),
      onPrimary: t.a1.tone(100),
      primaryContainer: t.a1.tone(90),
      onPrimaryContainer: t.a1.tone(10),
      secondary: t.a2.tone(40),
      onSecondary: t.a2.tone(100),
      secondaryContainer: t.a2.tone(90),
      onSecondaryContainer: t.a2.tone(10),
      tertiary: t.a3.tone(40),
      onTertiary: t.a3.tone(100),
      tertiaryContainer: t.a3.tone(90),
      onTertiaryContainer: t.a3.tone(10),
      error: t.error.tone(40),
      onError: t.error.tone(100),
      errorContainer: t.error.tone(90),
      onErrorContainer: t.error.tone(10),
      background: t.n1.tone(99),
      onBackground: t.n1.tone(10),
      surface: t.n1.tone(99),
      onSurface: t.n1.tone(10),
      surfaceVariant: t.n2.tone(90),
      onSurfaceVariant: t.n2.tone(30),
      outline: t.n2.tone(50),
      outlineVariant: t.n2.tone(80),
      shadow: t.n1.tone(0),
      scrim: t.n1.tone(0),
      inverseSurface: t.n1.tone(20),
      inverseOnSurface: t.n1.tone(95),
      inversePrimary: t.a1.tone(80),
    });
  }
  static darkFromCorePalette(t) {
    return new Xn({
      primary: t.a1.tone(80),
      onPrimary: t.a1.tone(20),
      primaryContainer: t.a1.tone(30),
      onPrimaryContainer: t.a1.tone(90),
      secondary: t.a2.tone(80),
      onSecondary: t.a2.tone(20),
      secondaryContainer: t.a2.tone(30),
      onSecondaryContainer: t.a2.tone(90),
      tertiary: t.a3.tone(80),
      onTertiary: t.a3.tone(20),
      tertiaryContainer: t.a3.tone(30),
      onTertiaryContainer: t.a3.tone(90),
      error: t.error.tone(80),
      onError: t.error.tone(20),
      errorContainer: t.error.tone(30),
      onErrorContainer: t.error.tone(80),
      background: t.n1.tone(10),
      onBackground: t.n1.tone(90),
      surface: t.n1.tone(10),
      onSurface: t.n1.tone(90),
      surfaceVariant: t.n2.tone(30),
      onSurfaceVariant: t.n2.tone(80),
      outline: t.n2.tone(60),
      outlineVariant: t.n2.tone(30),
      shadow: t.n1.tone(0),
      scrim: t.n1.tone(0),
      inverseSurface: t.n1.tone(90),
      inverseOnSurface: t.n1.tone(20),
      inversePrimary: t.a1.tone(40),
    });
  }
  constructor(t) {
    this.props = t;
  }
  toJSON() {
    return { ...this.props };
  }
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function xt(e) {
  const t = Pf(e),
    n = Mf(e),
    r = $f(e),
    o = [t.toString(16), n.toString(16), r.toString(16)];
  for (const [i, a] of o.entries()) a.length === 1 && (o[i] = "0" + a);
  return "#" + o.join("");
}
function bd(e) {
  e = e.replace("#", "");
  const t = e.length === 3,
    n = e.length === 6,
    r = e.length === 8;
  if (!t && !n && !r) throw new Error("unexpected hex " + e);
  let o = 0,
    i = 0,
    a = 0;
  return (
    t
      ? ((o = jn(e.slice(0, 1).repeat(2))),
        (i = jn(e.slice(1, 2).repeat(2))),
        (a = jn(e.slice(2, 3).repeat(2))))
      : n
      ? ((o = jn(e.slice(0, 2))),
        (i = jn(e.slice(2, 4))),
        (a = jn(e.slice(4, 6))))
      : r &&
        ((o = jn(e.slice(2, 4))),
        (i = jn(e.slice(4, 6))),
        (a = jn(e.slice(6, 8)))),
    ((255 << 24) | ((o & 255) << 16) | ((i & 255) << 8) | (a & 255)) >>> 0
  );
}
function jn(e) {
  return parseInt(e, 16);
}
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ function Up(e, t = []) {
  const n = wt.of(e);
  return {
    source: e,
    schemes: { light: Xn.light(e), dark: Xn.dark(e) },
    palettes: {
      primary: n.a1,
      secondary: n.a2,
      tertiary: n.a3,
      neutral: n.n1,
      neutralVariant: n.n2,
      error: n.error,
    },
    customColors: t.map((r) => zp(e, r)),
  };
}
function zp(e, t) {
  let n = t.value;
  const r = n,
    o = e;
  t.blend && (n = Jc.harmonize(r, o));
  const a = wt.of(n).a1;
  return {
    color: t,
    value: n,
    light: {
      color: a.tone(40),
      onColor: a.tone(100),
      colorContainer: a.tone(90),
      onColorContainer: a.tone(10),
    },
    dark: {
      color: a.tone(80),
      onColor: a.tone(20),
      colorContainer: a.tone(30),
      onColorContainer: a.tone(90),
    },
  };
}
function Ct(e, t) {
  Hp(e) && (e = "100%");
  const n = Vp(e);
  return (
    (e = t === 360 ? e : Math.min(t, Math.max(0, parseFloat(e)))),
    n && (e = parseInt(String(e * t), 10) / 100),
    Math.abs(e - t) < 1e-6
      ? 1
      : (t === 360
          ? (e = (e < 0 ? (e % t) + t : e % t) / parseFloat(String(t)))
          : (e = (e % t) / parseFloat(String(t))),
        e)
  );
}
function ya(e) {
  return Math.min(1, Math.max(0, e));
}
function Hp(e) {
  return typeof e == "string" && e.indexOf(".") !== -1 && parseFloat(e) === 1;
}
function Vp(e) {
  return typeof e == "string" && e.indexOf("%") !== -1;
}
function Df(e) {
  return (e = parseFloat(e)), (isNaN(e) || e < 0 || e > 1) && (e = 1), e;
}
function pa(e) {
  return Number(e) <= 1 ? `${Number(e) * 100}%` : e;
}
function Hr(e) {
  return e.length === 1 ? "0" + e : String(e);
}
function Wp(e, t, n) {
  return { r: Ct(e, 255) * 255, g: Ct(t, 255) * 255, b: Ct(n, 255) * 255 };
}
function wd(e, t, n) {
  (e = Ct(e, 255)), (t = Ct(t, 255)), (n = Ct(n, 255));
  const r = Math.max(e, t, n),
    o = Math.min(e, t, n);
  let i = 0,
    a = 0;
  const s = (r + o) / 2;
  if (r === o) (a = 0), (i = 0);
  else {
    const c = r - o;
    switch (((a = s > 0.5 ? c / (2 - r - o) : c / (r + o)), r)) {
      case e:
        i = (t - n) / c + (t < n ? 6 : 0);
        break;
      case t:
        i = (n - e) / c + 2;
        break;
      case n:
        i = (e - t) / c + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s: a, l: s };
}
function Tl(e, t, n) {
  return (
    n < 0 && (n += 1),
    n > 1 && (n -= 1),
    n < 1 / 6
      ? e + (t - e) * (6 * n)
      : n < 1 / 2
      ? t
      : n < 2 / 3
      ? e + (t - e) * (2 / 3 - n) * 6
      : e
  );
}
function Gp(e, t, n) {
  let r, o, i;
  if (((e = Ct(e, 360)), (t = Ct(t, 100)), (n = Ct(n, 100)), t === 0))
    (o = n), (i = n), (r = n);
  else {
    const a = n < 0.5 ? n * (1 + t) : n + t - n * t,
      s = 2 * n - a;
    (r = Tl(s, a, e + 1 / 3)), (o = Tl(s, a, e)), (i = Tl(s, a, e - 1 / 3));
  }
  return { r: r * 255, g: o * 255, b: i * 255 };
}
function Sd(e, t, n) {
  (e = Ct(e, 255)), (t = Ct(t, 255)), (n = Ct(n, 255));
  const r = Math.max(e, t, n),
    o = Math.min(e, t, n);
  let i = 0;
  const a = r,
    s = r - o,
    c = r === 0 ? 0 : s / r;
  if (r === o) i = 0;
  else {
    switch (r) {
      case e:
        i = (t - n) / s + (t < n ? 6 : 0);
        break;
      case t:
        i = (n - e) / s + 2;
        break;
      case n:
        i = (e - t) / s + 4;
        break;
    }
    i /= 6;
  }
  return { h: i, s: c, v: a };
}
function jp(e, t, n) {
  (e = Ct(e, 360) * 6), (t = Ct(t, 100)), (n = Ct(n, 100));
  const r = Math.floor(e),
    o = e - r,
    i = n * (1 - t),
    a = n * (1 - o * t),
    s = n * (1 - (1 - o) * t),
    c = r % 6,
    u = [n, a, i, i, s, n][c],
    d = [s, n, n, a, i, i][c],
    g = [i, i, s, n, n, a][c];
  return { r: u * 255, g: d * 255, b: g * 255 };
}
function Ed(e, t, n, r) {
  const o = [
    Hr(Math.round(e).toString(16)),
    Hr(Math.round(t).toString(16)),
    Hr(Math.round(n).toString(16)),
  ];
  return r &&
    o[0].startsWith(o[0].charAt(1)) &&
    o[1].startsWith(o[1].charAt(1)) &&
    o[2].startsWith(o[2].charAt(1))
    ? o[0].charAt(0) + o[1].charAt(0) + o[2].charAt(0)
    : o.join("");
}
function Yp(e, t, n, r, o) {
  const i = [
    Hr(Math.round(e).toString(16)),
    Hr(Math.round(t).toString(16)),
    Hr(Math.round(n).toString(16)),
    Hr(qp(r)),
  ];
  return o &&
    i[0].startsWith(i[0].charAt(1)) &&
    i[1].startsWith(i[1].charAt(1)) &&
    i[2].startsWith(i[2].charAt(1)) &&
    i[3].startsWith(i[3].charAt(1))
    ? i[0].charAt(0) + i[1].charAt(0) + i[2].charAt(0) + i[3].charAt(0)
    : i.join("");
}
function qp(e) {
  return Math.round(parseFloat(e) * 255).toString(16);
}
function Cd(e) {
  return Qt(e) / 255;
}
function Qt(e) {
  return parseInt(e, 16);
}
function Xp(e) {
  return { r: e >> 16, g: (e & 65280) >> 8, b: e & 255 };
}
const mc = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32",
};
function Kp(e) {
  let t = { r: 0, g: 0, b: 0 },
    n = 1,
    r = null,
    o = null,
    i = null,
    a = !1,
    s = !1;
  return (
    typeof e == "string" && (e = Jp(e)),
    typeof e == "object" &&
      (Yn(e.r) && Yn(e.g) && Yn(e.b)
        ? ((t = Wp(e.r, e.g, e.b)),
          (a = !0),
          (s = String(e.r).substr(-1) === "%" ? "prgb" : "rgb"))
        : Yn(e.h) && Yn(e.s) && Yn(e.v)
        ? ((r = pa(e.s)),
          (o = pa(e.v)),
          (t = jp(e.h, r, o)),
          (a = !0),
          (s = "hsv"))
        : Yn(e.h) &&
          Yn(e.s) &&
          Yn(e.l) &&
          ((r = pa(e.s)),
          (i = pa(e.l)),
          (t = Gp(e.h, r, i)),
          (a = !0),
          (s = "hsl")),
      Object.prototype.hasOwnProperty.call(e, "a") && (n = e.a)),
    (n = Df(n)),
    {
      ok: a,
      format: e.format || s,
      r: Math.min(255, Math.max(t.r, 0)),
      g: Math.min(255, Math.max(t.g, 0)),
      b: Math.min(255, Math.max(t.b, 0)),
      a: n,
    }
  );
}
const Zp = "[-\\+]?\\d+%?",
  Qp = "[-\\+]?\\d*\\.\\d+%?",
  mr = "(?:" + Qp + ")|(?:" + Zp + ")",
  Ll = "[\\s|\\(]+(" + mr + ")[,|\\s]+(" + mr + ")[,|\\s]+(" + mr + ")\\s*\\)?",
  Pl =
    "[\\s|\\(]+(" +
    mr +
    ")[,|\\s]+(" +
    mr +
    ")[,|\\s]+(" +
    mr +
    ")[,|\\s]+(" +
    mr +
    ")\\s*\\)?",
  gn = {
    CSS_UNIT: new RegExp(mr),
    rgb: new RegExp("rgb" + Ll),
    rgba: new RegExp("rgba" + Pl),
    hsl: new RegExp("hsl" + Ll),
    hsla: new RegExp("hsla" + Pl),
    hsv: new RegExp("hsv" + Ll),
    hsva: new RegExp("hsva" + Pl),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
function Jp(e) {
  if (((e = e.trim().toLowerCase()), e.length === 0)) return !1;
  let t = !1;
  if (mc[e]) (e = mc[e]), (t = !0);
  else if (e === "transparent")
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  let n = gn.rgb.exec(e);
  return n
    ? { r: n[1], g: n[2], b: n[3] }
    : ((n = gn.rgba.exec(e)),
      n
        ? { r: n[1], g: n[2], b: n[3], a: n[4] }
        : ((n = gn.hsl.exec(e)),
          n
            ? { h: n[1], s: n[2], l: n[3] }
            : ((n = gn.hsla.exec(e)),
              n
                ? { h: n[1], s: n[2], l: n[3], a: n[4] }
                : ((n = gn.hsv.exec(e)),
                  n
                    ? { h: n[1], s: n[2], v: n[3] }
                    : ((n = gn.hsva.exec(e)),
                      n
                        ? { h: n[1], s: n[2], v: n[3], a: n[4] }
                        : ((n = gn.hex8.exec(e)),
                          n
                            ? {
                                r: Qt(n[1]),
                                g: Qt(n[2]),
                                b: Qt(n[3]),
                                a: Cd(n[4]),
                                format: t ? "name" : "hex8",
                              }
                            : ((n = gn.hex6.exec(e)),
                              n
                                ? {
                                    r: Qt(n[1]),
                                    g: Qt(n[2]),
                                    b: Qt(n[3]),
                                    format: t ? "name" : "hex",
                                  }
                                : ((n = gn.hex4.exec(e)),
                                  n
                                    ? {
                                        r: Qt(n[1] + n[1]),
                                        g: Qt(n[2] + n[2]),
                                        b: Qt(n[3] + n[3]),
                                        a: Cd(n[4] + n[4]),
                                        format: t ? "name" : "hex8",
                                      }
                                    : ((n = gn.hex3.exec(e)),
                                      n
                                        ? {
                                            r: Qt(n[1] + n[1]),
                                            g: Qt(n[2] + n[2]),
                                            b: Qt(n[3] + n[3]),
                                            format: t ? "name" : "hex",
                                          }
                                        : !1)))))))));
}
function Yn(e) {
  return typeof e == "number" ? !Number.isNaN(e) : gn.CSS_UNIT.test(e);
}
class qe {
  constructor(t = "", n = {}) {
    var o;
    if (t instanceof qe) return t;
    typeof t == "number" && (t = Xp(t)), (this.originalInput = t);
    const r = Kp(t);
    (this.originalInput = t),
      (this.r = r.r),
      (this.g = r.g),
      (this.b = r.b),
      (this.a = r.a),
      (this.roundA = Math.round(100 * this.a) / 100),
      (this.format = (o = n.format) != null ? o : r.format),
      (this.gradientType = n.gradientType),
      this.r < 1 && (this.r = Math.round(this.r)),
      this.g < 1 && (this.g = Math.round(this.g)),
      this.b < 1 && (this.b = Math.round(this.b)),
      (this.isValid = r.ok);
  }
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return !this.isDark();
  }
  getBrightness() {
    const t = this.toRgb();
    return (t.r * 299 + t.g * 587 + t.b * 114) / 1e3;
  }
  getLuminance() {
    const t = this.toRgb();
    let n, r, o;
    const i = t.r / 255,
      a = t.g / 255,
      s = t.b / 255;
    return (
      i <= 0.03928 ? (n = i / 12.92) : (n = Math.pow((i + 0.055) / 1.055, 2.4)),
      a <= 0.03928 ? (r = a / 12.92) : (r = Math.pow((a + 0.055) / 1.055, 2.4)),
      s <= 0.03928 ? (o = s / 12.92) : (o = Math.pow((s + 0.055) / 1.055, 2.4)),
      0.2126 * n + 0.7152 * r + 0.0722 * o
    );
  }
  getAlpha() {
    return this.a;
  }
  setAlpha(t) {
    return (
      (this.a = Df(t)), (this.roundA = Math.round(100 * this.a) / 100), this
    );
  }
  isMonochrome() {
    const { s: t } = this.toHsl();
    return t === 0;
  }
  toHsv() {
    const t = Sd(this.r, this.g, this.b);
    return { h: t.h * 360, s: t.s, v: t.v, a: this.a };
  }
  toHsvString() {
    const t = Sd(this.r, this.g, this.b),
      n = Math.round(t.h * 360),
      r = Math.round(t.s * 100),
      o = Math.round(t.v * 100);
    return this.a === 1
      ? `hsv(${n}, ${r}%, ${o}%)`
      : `hsva(${n}, ${r}%, ${o}%, ${this.roundA})`;
  }
  toHsl() {
    const t = wd(this.r, this.g, this.b);
    return { h: t.h * 360, s: t.s, l: t.l, a: this.a };
  }
  toHslString() {
    const t = wd(this.r, this.g, this.b),
      n = Math.round(t.h * 360),
      r = Math.round(t.s * 100),
      o = Math.round(t.l * 100);
    return this.a === 1
      ? `hsl(${n}, ${r}%, ${o}%)`
      : `hsla(${n}, ${r}%, ${o}%, ${this.roundA})`;
  }
  toHex(t = !1) {
    return Ed(this.r, this.g, this.b, t);
  }
  toHexString(t = !1) {
    return "#" + this.toHex(t);
  }
  toHex8(t = !1) {
    return Yp(this.r, this.g, this.b, this.a, t);
  }
  toHex8String(t = !1) {
    return "#" + this.toHex8(t);
  }
  toHexShortString(t = !1) {
    return this.a === 1 ? this.toHexString(t) : this.toHex8String(t);
  }
  toRgb() {
    return {
      r: Math.round(this.r),
      g: Math.round(this.g),
      b: Math.round(this.b),
      a: this.a,
    };
  }
  toRgbString() {
    const t = Math.round(this.r),
      n = Math.round(this.g),
      r = Math.round(this.b);
    return this.a === 1
      ? `rgb(${t}, ${n}, ${r})`
      : `rgba(${t}, ${n}, ${r}, ${this.roundA})`;
  }
  toPercentageRgb() {
    const t = (n) => `${Math.round(Ct(n, 255) * 100)}%`;
    return { r: t(this.r), g: t(this.g), b: t(this.b), a: this.a };
  }
  toPercentageRgbString() {
    const t = (n) => Math.round(Ct(n, 255) * 100);
    return this.a === 1
      ? `rgb(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%)`
      : `rgba(${t(this.r)}%, ${t(this.g)}%, ${t(this.b)}%, ${this.roundA})`;
  }
  toName() {
    if (this.a === 0) return "transparent";
    if (this.a < 1) return !1;
    const t = "#" + Ed(this.r, this.g, this.b, !1);
    for (const [n, r] of Object.entries(mc)) if (t === r) return n;
    return !1;
  }
  toString(t) {
    const n = !!t;
    t = t != null ? t : this.format;
    let r = !1;
    const o = this.a < 1 && this.a >= 0;
    return !n && o && (t.startsWith("hex") || t === "name")
      ? t === "name" && this.a === 0
        ? this.toName()
        : this.toRgbString()
      : (t === "rgb" && (r = this.toRgbString()),
        t === "prgb" && (r = this.toPercentageRgbString()),
        (t === "hex" || t === "hex6") && (r = this.toHexString()),
        t === "hex3" && (r = this.toHexString(!0)),
        t === "hex4" && (r = this.toHex8String(!0)),
        t === "hex8" && (r = this.toHex8String()),
        t === "name" && (r = this.toName()),
        t === "hsl" && (r = this.toHslString()),
        t === "hsv" && (r = this.toHsvString()),
        r || this.toHexString());
  }
  toNumber() {
    return (
      (Math.round(this.r) << 16) +
      (Math.round(this.g) << 8) +
      Math.round(this.b)
    );
  }
  clone() {
    return new qe(this.toString());
  }
  lighten(t = 10) {
    const n = this.toHsl();
    return (n.l += t / 100), (n.l = ya(n.l)), new qe(n);
  }
  brighten(t = 10) {
    const n = this.toRgb();
    return (
      (n.r = Math.max(0, Math.min(255, n.r - Math.round(255 * -(t / 100))))),
      (n.g = Math.max(0, Math.min(255, n.g - Math.round(255 * -(t / 100))))),
      (n.b = Math.max(0, Math.min(255, n.b - Math.round(255 * -(t / 100))))),
      new qe(n)
    );
  }
  darken(t = 10) {
    const n = this.toHsl();
    return (n.l -= t / 100), (n.l = ya(n.l)), new qe(n);
  }
  tint(t = 10) {
    return this.mix("white", t);
  }
  shade(t = 10) {
    return this.mix("black", t);
  }
  desaturate(t = 10) {
    const n = this.toHsl();
    return (n.s -= t / 100), (n.s = ya(n.s)), new qe(n);
  }
  saturate(t = 10) {
    const n = this.toHsl();
    return (n.s += t / 100), (n.s = ya(n.s)), new qe(n);
  }
  greyscale() {
    return this.desaturate(100);
  }
  spin(t) {
    const n = this.toHsl(),
      r = (n.h + t) % 360;
    return (n.h = r < 0 ? 360 + r : r), new qe(n);
  }
  mix(t, n = 50) {
    const r = this.toRgb(),
      o = new qe(t).toRgb(),
      i = n / 100,
      a = {
        r: (o.r - r.r) * i + r.r,
        g: (o.g - r.g) * i + r.g,
        b: (o.b - r.b) * i + r.b,
        a: (o.a - r.a) * i + r.a,
      };
    return new qe(a);
  }
  analogous(t = 6, n = 30) {
    const r = this.toHsl(),
      o = 360 / n,
      i = [this];
    for (r.h = (r.h - ((o * t) >> 1) + 720) % 360; --t; )
      (r.h = (r.h + o) % 360), i.push(new qe(r));
    return i;
  }
  complement() {
    const t = this.toHsl();
    return (t.h = (t.h + 180) % 360), new qe(t);
  }
  monochromatic(t = 6) {
    const n = this.toHsv(),
      { h: r } = n,
      { s: o } = n;
    let { v: i } = n;
    const a = [],
      s = 1 / t;
    for (; t--; ) a.push(new qe({ h: r, s: o, v: i })), (i = (i + s) % 1);
    return a;
  }
  splitcomplement() {
    const t = this.toHsl(),
      { h: n } = t;
    return [
      this,
      new qe({ h: (n + 72) % 360, s: t.s, l: t.l }),
      new qe({ h: (n + 216) % 360, s: t.s, l: t.l }),
    ];
  }
  onBackground(t) {
    const n = this.toRgb(),
      r = new qe(t).toRgb(),
      o = n.a + r.a * (1 - n.a);
    return new qe({
      r: (n.r * n.a + r.r * r.a * (1 - n.a)) / o,
      g: (n.g * n.a + r.g * r.a * (1 - n.a)) / o,
      b: (n.b * n.a + r.b * r.a * (1 - n.a)) / o,
      a: o,
    });
  }
  triad() {
    return this.polyad(3);
  }
  tetrad() {
    return this.polyad(4);
  }
  polyad(t) {
    const n = this.toHsl(),
      { h: r } = n,
      o = [this],
      i = 360 / t;
    for (let a = 1; a < t; a++)
      o.push(new qe({ h: (r + a * i) % 360, s: n.s, l: n.l }));
    return o;
  }
  equals(t) {
    return this.toRgbString() === new qe(t).toRgbString();
  }
}
function ev(e) {
  return new qe(e);
}
function Ot(e, t) {
  return new qe(e).setAlpha(t).toRgbString();
}
function tv(e) {
  const t = new qe(e);
  return (
    Math.round(t.a) * 2 ** 32 +
    (Math.round(t.r) << 16) +
    (Math.round(t.g) << 8) +
    Math.round(t.b)
  );
}
function nv(e, t, n) {
  const r = rv[e];
  return `${r.key} ${Ot(t, n === pr.LIGHT ? Ad : Ad * 2)}, ${r.ambient} ${Ot(
    t,
    n === pr.LIGHT ? Id : Id * 2
  )}`;
}
const Ad = 0.2,
  Id = 0.15,
  rv = {
    0: { key: "0px 0px 0px 0px", ambient: "0px 0px 0px 0px" },
    1: { key: "0px 1px 2px -1px", ambient: "0px 1px 3px 0px" },
    2: { key: "0px 2px 4px -2px", ambient: "0px 4px 6px -1px" },
    3: { key: "0px 4px 6px -4px", ambient: "0px 10px 15px -3px" },
    4: { key: "0px 8px 10px -6px", ambient: "0px 20px 25px -5px" },
    5: { key: "0px 16px 18px -8px", ambient: "0px 25px 50px -12px" },
  },
  ov = 5,
  iv = { 0: 0, 1: 0.05, 2: 0.08, 3: 0.11, 4: 0.12, 5: 0.14 };
var pr = ((e) => ((e[(e.LIGHT = 0)] = "LIGHT"), (e[(e.DARK = 1)] = "DARK"), e))(
  pr || {}
);
const mn = "transparent",
  _f = [
    "primary",
    "secondary",
    "tertiary",
    "neutral",
    "neutralVariant",
    "error",
    "red",
    "pink",
    "purple",
    "blue",
    "cyan",
    "teal",
    "green",
    "yellow",
    "orange",
    "brown",
  ];
function ct(e, t) {
  return (n) => n.palette[e].tone(t);
}
function Rt(e) {
  return (t) => t.values.typeFaces[e];
}
function Dt(e) {
  return (t) => t.values.fontWeights[e];
}
class xd {
  constructor(t, n, r, o) {
    Te(this, "palette");
    Te(this, "color");
    Te(this, "sharp");
    Te(this, "typescale");
    (this.type = t),
      (this.label = n),
      (this.isEEInk = r),
      (this.values = o),
      (this.palette = _f.reduce(
        (i, a) => ((i[a] = bt.fromInt(tv(ev(this.values.keyColors[a])))), i),
        {}
      )),
      (this.color = av(this)),
      (this.sharp = sv(this)),
      (this.typescale = cv(this));
  }
  surface(t) {
    return new qe(this.color.surface)
      .mix(this.color.neutral, iv[t] * 100)
      .toHexString();
  }
  elevationShadow(t) {
    return nv(t, this.color.shadow, this.type);
  }
  elevationShadowStyle(t) {
    return { boxShadow: this.elevationShadow(t) };
  }
  get swipeableViewShadow() {
    return `${this.color.shadow} 0px 0px 10px -5px`;
  }
  get appBarShadow() {
    return `${this.color.outlineVariant} 0px 0px 0px 1px`;
  }
}
const av = (e) =>
    new Proxy(
      {},
      {
        get: function (t, n) {
          const r = e.values.colors[n];
          return W(r, n), xt(r(e));
        },
      }
    ),
  sv = (e) =>
    new Proxy(
      {},
      {
        get: function (t, n) {
          const r = e.values.sharps[n];
          return W(r, n), lv(r);
        },
      }
    );
function lv(e) {
  return e.map((t) => `${t}px`).join(",");
}
const cv = (e) =>
  new Proxy(
    {},
    {
      get: function (t, n, r) {
        if (n.endsWith("Style")) return uv(r, n.replace(/Style$/, ""));
        {
          const o = e.values.typescales[n];
          return (
            W(o != null, n),
            n.endsWith("Font")
              ? o(e)
              : n.endsWith("LineHeight")
              ? `${o / 16}rem`
              : n.endsWith("Size")
              ? `${o / 16}rem`
              : n.endsWith("Tracking")
              ? `${o / 16}rem`
              : n.endsWith("Weight")
              ? o(e)
              : W(!1)
          );
        }
      },
    }
  );
function uv(e, t) {
  return {
    fontFamily: e[`${t}Font`],
    lineHeight: e[`${t}LineHeight`],
    fontSize: e[`${t}Size`],
    letterSpacing: e[`${t}Tracking`],
    fontWeight: e[`${t}Weight`],
  };
}
const dv = {
    brand:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Cantarell, Roboto, "DejaVu Sans", sans-serif, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
    plain:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Cantarell, Roboto, "DejaVu Sans", sans-serif, "Apple Color Emoji", "Noto Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";',
  },
  gv = { regular: 400, medium: 500 },
  fv = {
    none: [0],
    extraSmall: [4],
    extraSmallTop: [4, 4, 0, 0],
    small: [8],
    medium: [12],
    large: [16],
    largeEnd: [0, 16, 16, 0],
    largeTop: [16, 16, 0, 0],
    extraLarge: [28],
    extraLargeTop: [28, 28, 0, 0],
    full: [1e3],
  },
  Of = (e) => {
    const t = (n) => ({
      [`${n}`]: ct(n, e === "light" ? 40 : 80),
      [`on${Bo(n)}`]: ct(n, e === "light" ? 100 : 20),
      [`${n}Container`]: ct(n, e === "light" ? 90 : 30),
      [`on${Bo(n)}Container`]: ct(n, e === "light" ? 10 : 90),
    });
    return {
      ..._f.reduce((n, r) => ({ ...n, ...t(r) }), {}),
      background: ct("neutral", e === "light" ? 99 : 10),
      onBackground: ct("neutral", e === "light" ? 10 : 90),
      surface: ct("neutral", e === "light" ? 99 : 10),
      onSurface: ct("neutral", e === "light" ? 10 : 90),
      surfaceVariant: ct("neutralVariant", e === "light" ? 90 : 30),
      onSurfaceVariant: ct("neutralVariant", e === "light" ? 30 : 80),
      outline: ct("neutralVariant", e === "light" ? 50 : 60),
      outlineVariant: ct("neutralVariant", e === "light" ? 85 : 25),
      shadow: ct("neutral", 0),
      surfaceTintColor: ct("primary", e === "light" ? 40 : 80),
      inverseSurface: ct("neutral", e === "light" ? 20 : 90),
      inverseOnSurface: ct("neutral", e === "light" ? 95 : 20),
      inversePrimary: ct("primary", e === "light" ? 80 : 40),
      scrim: ct("neutral", 0),
      onSurfaceHint: ct("neutralVariant", e === "light" ? 56 : 54),
    };
  },
  hv = Of("light"),
  mv = Of("dark"),
  yv = {
    displayLargeFont: Rt("brand"),
    displayLargeLineHeight: 64,
    displayLargeSize: 57,
    displayLargeTracking: 0,
    displayLargeWeight: Dt("regular"),
    displayMediumFont: Rt("brand"),
    displayMediumLineHeight: 52,
    displayMediumSize: 45,
    displayMediumTracking: 0,
    displayMediumWeight: Dt("regular"),
    displaySmallFont: Rt("brand"),
    displaySmallLineHeight: 44,
    displaySmallSize: 36,
    displaySmallTracking: 0,
    displaySmallWeight: Dt("regular"),
    headlineLargeFont: Rt("brand"),
    headlineLargeLineHeight: 40,
    headlineLargeSize: 32,
    headlineLargeTracking: 0,
    headlineLargeWeight: Dt("regular"),
    headlineMediumFont: Rt("brand"),
    headlineMediumLineHeight: 36,
    headlineMediumSize: 28,
    headlineMediumTracking: 0,
    headlineMediumWeight: Dt("regular"),
    headlineSmallFont: Rt("brand"),
    headlineSmallLineHeight: 32,
    headlineSmallSize: 24,
    headlineSmallTracking: 0,
    headlineSmallWeight: Dt("regular"),
    titleLargeFont: Rt("brand"),
    titleLargeLineHeight: 28,
    titleLargeSize: 22,
    titleLargeTracking: 0,
    titleLargeWeight: Dt("regular"),
    titleMediumFont: Rt("plain"),
    titleMediumLineHeight: 24,
    titleMediumSize: 16,
    titleMediumTracking: 0.15,
    titleMediumWeight: Dt("medium"),
    titleSmallFont: Rt("plain"),
    titleSmallLineHeight: 20,
    titleSmallSize: 14,
    titleSmallTracking: 0.1,
    titleSmallWeight: Dt("medium"),
    labelLargeFont: Rt("plain"),
    labelLargeLineHeight: 20,
    labelLargeSize: 14,
    labelLargeTracking: 0.1,
    labelLargeWeight: Dt("medium"),
    labelMediumFont: Rt("plain"),
    labelMediumLineHeight: 16,
    labelMediumSize: 12,
    labelMediumTracking: 0.5,
    labelMediumWeight: Dt("medium"),
    labelSmallFont: Rt("plain"),
    labelSmallLineHeight: 16,
    labelSmallSize: 11,
    labelSmallTracking: 0.5,
    labelSmallWeight: Dt("medium"),
    bodyLargeFont: Rt("plain"),
    bodyLargeLineHeight: 24,
    bodyLargeSize: 16,
    bodyLargeTracking: 0.5,
    bodyLargeWeight: Dt("regular"),
    bodyMediumFont: Rt("plain"),
    bodyMediumLineHeight: 20,
    bodyMediumSize: 14,
    bodyMediumTracking: 0.25,
    bodyMediumWeight: Dt("regular"),
    bodySmallFont: Rt("plain"),
    bodySmallLineHeight: 16,
    bodySmallSize: 12,
    bodySmallTracking: 0.4,
    bodySmallWeight: Dt("regular"),
  },
  pv = {
    red: "#f44336",
    pink: "#e91e63",
    purple: "#9c27b0",
    blue: "#2196f3",
    cyan: "#00bcd4",
    teal: "#009688",
    green: "#4caf50",
    yellow: "#ffeb3b",
    orange: "#e79317",
    brown: "#795548",
  };
function vv(e) {
  const t = Up(
      bd(e),
      Object.entries(pv).map(([a, s]) => ({ name: a, value: bd(s), blend: !0 }))
    ),
    n = { sharps: fv, typeFaces: dv, fontWeights: gv, typescales: yv },
    r = (a, s) => xt(t.customColors.find((c) => c.color.name === a)[s].color),
    o = new xd(pr.LIGHT, e, !1, {
      ...n,
      colors: hv,
      keyColors: {
        primary: xt(t.schemes.light.primary),
        secondary: xt(t.schemes.light.secondary),
        tertiary: xt(t.schemes.light.tertiary),
        neutral: xt(t.palettes.neutral.tone(40)),
        neutralVariant: xt(t.palettes.neutralVariant.tone(40)),
        error: xt(t.palettes.error.tone(40)),
        red: r("red", "light"),
        pink: r("pink", "light"),
        purple: r("purple", "light"),
        blue: r("blue", "light"),
        cyan: r("cyan", "light"),
        teal: r("teal", "light"),
        green: r("green", "light"),
        yellow: r("yellow", "light"),
        orange: r("orange", "light"),
        brown: r("brown", "light"),
      },
    }),
    i = new xd(pr.DARK, e, !1, {
      ...n,
      colors: mv,
      keyColors: {
        primary: xt(t.schemes.dark.primary),
        secondary: xt(t.schemes.dark.secondary),
        tertiary: xt(t.schemes.dark.tertiary),
        neutral: xt(t.palettes.neutral.tone(40)),
        neutralVariant: xt(t.palettes.neutralVariant.tone(40)),
        error: xt(t.palettes.error.tone(40)),
        red: r("red", "dark"),
        pink: r("pink", "dark"),
        purple: r("purple", "dark"),
        blue: r("blue", "dark"),
        cyan: r("cyan", "dark"),
        teal: r("teal", "dark"),
        green: r("green", "dark"),
        yellow: r("yellow", "dark"),
        orange: r("orange", "dark"),
        brown: r("brown", "dark"),
      },
    });
  return { lightTheme: o, darkTheme: i };
}
const Ti = [vv("#0370ff")],
  Nf = on(() => Ti[0].lightTheme);
function Pt() {
  return Y(Nf);
}
function q(e) {
  const t = typeof e == "function" ? e : () => e;
  return () => {
    const r = Pt();
    return L(() => {
      const i = t(r()),
        a = {};
      for (const s in i) a[s] = io(i[s]);
      return a;
    });
  };
}
var bv = w(
  '<svg viewBox="0 0 32 32"><circle cx=16 cy=16 fill=none r=14 stroke-width=4></circle><circle cx=16 cy=16 fill=none r=14 stroke-width=4>'
);
function ao(e) {
  const t = F({ size: 24 }, e),
    n = Pt(),
    r = () => {
      var i;
      return (i = t.color) != null ? i : n().color.primary;
    },
    o = wv();
  return (() => {
    var i = bv(),
      a = i.firstChild,
      s = a.nextSibling;
    return (
      a.style.setProperty("opacity", "0.2"),
      s.style.setProperty("stroke-dasharray", "80px"),
      s.style.setProperty("stroke-dashoffset", "60px"),
      $(
        (c) => {
          var u = H(o().root, t.class),
            d = r(),
            g = `${t.size}px`,
            f = `${t.size}px`;
          return (
            u !== c.e && Xe(i, "class", (c.e = u)),
            d !== c.t &&
              ((c.t = d) != null
                ? i.style.setProperty("stroke", d)
                : i.style.removeProperty("stroke")),
            g !== c.a &&
              ((c.a = g) != null
                ? i.style.setProperty("width", g)
                : i.style.removeProperty("width")),
            f !== c.o &&
              ((c.o = f) != null
                ? i.style.setProperty("height", f)
                : i.style.removeProperty("height")),
            c
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      i
    );
  })();
}
Ft(`
@keyframes Spinner-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}`);
const wv = q(() => ({
  root: {
    display: "inline-box",
    userSelect: "none",
    webkitUserSelect: "none",
    animation: "Spinner-rotate 0.8s linear infinite",
  },
}));
function Sv(e, t, n = 0, r = 0) {
  const o = document.documentElement.clientHeight;
  for (let i = 0; i < e.length; i++) {
    const a = e[i],
      s = a.getBoundingClientRect();
    if (t === "top") {
      if (s.bottom > n) {
        const c = s.top >= n,
          u = o - n - r - (c ? 0 : s.bottom - n);
        return { element: a, full: c, pageScrollAmount: u };
      }
    } else if (s.bottom > o - r) {
      const c = s.bottom <= o - r,
        u = o - n - r - (c ? 0 : o - r - s.top);
      return { element: a, full: c, pageScrollAmount: u };
    }
  }
}
function yc(e, t) {
  return e ? e === t || e.contains(t) : !1;
}
function Ev(e) {
  return e ? e.ownerDocument || e : document;
}
function nu(e) {
  if (!e.contains(document.activeElement)) {
    const n = e.querySelector("[autofocus]:not([disabled]), [data-autofocus]");
    if (n) return n.focus({ preventScroll: !0 });
    const r = e.querySelector(
      '[tabindex]:not([tabindex="-1"]):not([disabled])'
    );
    if (r) return r.focus({ preventScroll: !0 });
    const o = e.querySelectorAll(
      'button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a:not([disabled]), [role="menuitem"]:not([disabled]), [role="menuitemradio"]:not([disabled])'
    );
    if (o.length > 0) return o[0].focus({ preventScroll: !0 });
  }
}
function Cv(e) {
  var t;
  "scrollIntoViewIfNeeded" in e
    ? (t = e.scrollIntoViewIfNeeded) == null || t.call(e, !0)
    : e.scrollIntoView({ block: "center", behavior: "smooth" });
}
const Ja =
    /iPhone|iPad/i.test(navigator.userAgent) ||
    (/Macintosh/i.test(navigator.userAgent) && navigator.maxTouchPoints > 1),
  Ff = /Macintosh|iPhone|iPad|Mac OS/i.test(navigator.userAgent),
  pc =
    /AppleWebKit/.test(navigator.userAgent) &&
    (Ja || (Ff && !/Chrome|Firefox/.test(navigator.userAgent))) &&
    !/Windows NT|Android|Linux/.test(navigator.userAgent),
  Bf =
    pc &&
    /iPhone|iPad/.test(navigator.userAgent) &&
    navigator.maxTouchPoints > 1,
  Av = /Firefox/.test(navigator.userAgent),
  Uf = /Chrome|Firefox|iPhone|iPad/.test(navigator.userAgent)
    ? ":focus-visible"
    : ":focus",
  Kr =
    window.navigator.standalone ||
    window.matchMedia("(display-mode: standalone)").matches ||
    /utm_source=homescreen/.test(window.location.search);
function vc(e, t, { duration: n = 200, onFinished: r } = {}) {
  const o = "$smoothScroll",
    i = zf(e, o);
  i && i.done();
  const a = e instanceof HTMLElement;
  a && (e.style.willChange = "scroll-position");
  const s = a ? e.scrollTop : e.scrollY;
  if (t > 0) {
    const m = Math.max(
      0,
      a
        ? e.scrollHeight - e.scrollTop - e.clientHeight
        : document.documentElement.scrollHeight -
            e.scrollY -
            document.documentElement.clientHeight
    );
    t = Math.min(m, t);
  } else {
    const m = a ? e.scrollTop : e.scrollY;
    t = Math.min(m, t);
  }
  let c, u;
  const d = () => {
      e.scrollTo({ top: s + t }),
        a && (e.style.willChange = ""),
        bc(e, o, void 0),
        u && window.cancelAnimationFrame(u);
    },
    g = { progress: 0, done: d };
  bc(e, o, g);
  const f = (m) => {
    c === void 0 && (c = m);
    const y = m - c;
    g.progress = y / n;
    const b = s + Iv(n, y) * t;
    e.scrollTo({ top: b }),
      y < n
        ? (u = window.requestAnimationFrame(f))
        : ((u = void 0), d(), r == null || r());
  };
  u = window.requestAnimationFrame(f);
}
function Iv(e, t) {
  const n = Math.max(0, Math.min(t, e));
  return (n / e) * (2 - n / e);
}
function xv(e) {
  Tv
    ? e.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    : vc(e, -(e instanceof HTMLElement ? e.scrollTop : e.scrollY));
}
const kv = () => {
    const e = document.body,
      t = e.style.scrollBehavior;
    e.style.scrollBehavior = "smooth";
    const n = getComputedStyle(e).scrollBehavior === "smooth";
    return (e.style.scrollBehavior = t), n;
  },
  Tv = kv(),
  Ts = new Image();
Ts.fetchPriority = "low";
Ts.referrerPolicy = "no-referrer";
Ts.decoding = "async";
let kd, Ci;
function Lv(e, t = 5e3) {
  kd !== e &&
    (Ci != null && (window.clearTimeout(Ci), (Ci = void 0)),
    (kd = e),
    (Ci = window.setTimeout(() => {
      (Ts.src = e), (Ci = void 0);
    }, t)));
}
function Pv() {
  document.activeElement instanceof HTMLElement &&
    document.activeElement.blur(),
    document.body.focus({ preventScroll: !0 });
}
const Mv = (() => {
  const e = document.createElement("div");
  (e.style.left = "0px"),
    (e.style.top = "0px"),
    (e.style.width = "100px"),
    (e.style.height = "100px"),
    (e.style.overflow = "scroll"),
    (e.style.position = "fixed"),
    document.body.appendChild(e);
  const t = e.offsetWidth - e.clientWidth;
  return document.body.removeChild(e), t === 0;
})();
function ru(e, t = !1) {
  return Mv
    ? {}
    : {
        "::-webkit-scrollbar": { width: t ? 3 : 10, height: t ? 3 : 10 },
        "::-webkit-scrollbar-track": { background: mn },
        "::-webkit-scrollbar-thumb": {
          background: Ot(e.color.onSurface, 0.2),
          borderRadius: 16,
        },
      };
}
function zf(e, t) {
  return e[`$user${t}`];
}
function bc(e, t, n) {
  e[`$user${t}`] = n;
}
const $v = Rv(`
  a, abbr, acronym, b, bdo, big, br, button, cite, code, dfn, em, i, img, input, kbd, label, map,
  object, output, q, samp, script, select, small, span, strong, sub, sup, textarea, time, tt, var`);
function Rv(e) {
  return new Set(
    e
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
  );
}
function Hf(e, t) {
  (e.scrollTop = t),
    requestAnimationFrame(() => {
      (e.scrollTop = t),
        setTimeout(() => {
          (e.scrollTop = t),
            setTimeout(() => {
              (e.scrollTop = t),
                setTimeout(() => {
                  e.scrollTop = t;
                  const n = e.clientHeight;
                  setTimeout(() => {
                    e.clientHeight !== n && (e.scrollTop = t);
                    const r = e.clientHeight;
                    setTimeout(() => {
                      e.clientHeight !== r && (e.scrollTop = t);
                    }, 2e3);
                  }, 1500);
                }, 500);
            }, 100);
        }, 50);
    });
}
function Ml() {
  const e = window.getSelection();
  return e != null && !e.isCollapsed;
}
function Dv(e) {
  let t;
  const n = () => {
    t && (t.remove(), (t = void 0));
  };
  ie(() => {
    n();
    const r = e();
    r &&
      ((t = document.createElement("link")),
      (t.rel = "canonical"),
      (t.href = r),
      document.head.append(t));
  }),
    De(n);
}
function Ls(e, t, n) {
  var r = n || {},
    o = r.noTrailing,
    i = o === void 0 ? !1 : o,
    a = r.noLeading,
    s = a === void 0 ? !1 : a,
    c = r.debounceMode,
    u = c === void 0 ? void 0 : c,
    d,
    g = !1,
    f = 0;
  function m() {
    d && clearTimeout(d);
  }
  function y(v) {
    var S = v || {},
      A = S.upcomingOnly,
      k = A === void 0 ? !1 : A;
    m(), (g = !k);
  }
  function b() {
    for (var v = arguments.length, S = new Array(v), A = 0; A < v; A++)
      S[A] = arguments[A];
    var k = this,
      T = Date.now() - f;
    if (g) return;
    function E() {
      (f = Date.now()), t.apply(k, S);
    }
    function P() {
      d = void 0;
    }
    !s && u && !d && E(),
      m(),
      u === void 0 && T > e
        ? s
          ? ((f = Date.now()), i || (d = setTimeout(u ? P : E, e)))
          : E()
        : i !== !0 && (d = setTimeout(u ? P : E, u === void 0 ? e - T : e));
  }
  return (b.cancel = y), b;
}
const Ps = 560,
  ou = 1024,
  _v = 1216,
  Ov = 1408;
var iu = ((e) => (
  (e[(e.MOBILE = 0)] = "MOBILE"),
  (e[(e.TABLET = 1)] = "TABLET"),
  (e[(e.DESKTOP = 2)] = "DESKTOP"),
  (e[(e.WIDESCREEN = 3)] = "WIDESCREEN"),
  (e[(e.FULLHD = 4)] = "FULLHD"),
  e
))(iu || {});
function Td() {
  const e = window.innerWidth;
  return e <= Ps ? 0 : e < ou ? 1 : e < _v ? 2 : e < Ov ? 3 : 4;
}
const Uo = Qi(() => {
    const [e, t] = N(Td()),
      n = Ls(500, () => {
        t(Td());
      });
    Wr(window, "resize", n);
    const r = L(() => e() <= 0),
      o = L(() => e() >= 1),
      i = L(() => e() >= 2);
    return {
      getViewportSize: e,
      isMobileViewportSize: r,
      isTabletViewportSize: o,
      isDesktopViewportSize: i,
    };
  }),
  vr = `@media (max-width: ${Ps}px)`,
  Nv = `@media (min-width: ${Ps + 1}px)`,
  ue = "ease-out",
  Vf = "ease-in",
  nn = "cubic-bezier(.1,.25,.75,.9)",
  Fv = "cubic-bezier(.43,1.27,.47,1.07)",
  Bv = "cubic-bezier(0.7, 0, 0.84, 0)",
  Ji = 1,
  va = 100 * Ji,
  Ld = 150 * Ji,
  he = 200 * Ji,
  Li = 300 * Ji,
  Pd = 400 * Ji,
  jr = 250,
  es = "--view-swipe-offset";
let Uv = 0,
  zv = 0;
const Wf = Ft(),
  ba = st({ 0: { opacity: 0 }, 100: { opacity: 1 } }),
  Oe = st({ 0: { opacity: 0 }, 66: { opacity: 1 }, 100: { opacity: 1 } }),
  wa = st({ 0: { opacity: 1 }, 100: { opacity: 0, visibility: "hidden" } }),
  It = st({
    0: { opacity: 1 },
    33: { opacity: 1 },
    100: { opacity: 0, visibility: "hidden" },
  }),
  Hv = Er(-10),
  Vv = Er(-20),
  Wv = Er(-40),
  Gv = Er(-400),
  jv = Er(10),
  Yv = Er(20),
  qv = Er(40),
  Xv = Er(400),
  Kv = Cr(-10),
  Zv = Cr(-20),
  Qv = Cr(-40),
  Jv = Cr(-400),
  eb = Cr(10),
  tb = Cr(20),
  nb = Cr(40),
  rb = Cr(400),
  ob = Ko(10),
  ib = Ko(20),
  ab = Ko(40),
  sb = Ko(-10),
  lb = Ko(-20),
  cb = Ko(-40),
  ub = Zo(10),
  db = Zo(20),
  gb = Zo(40),
  fb = Zo(-10),
  hb = Zo(-20),
  mb = Zo(-40),
  yb = Ar(10),
  pb = Ar(20),
  vb = Ar(40),
  bb = Ar(400),
  wb = Ar(-10),
  Sb = Ar(-20),
  Eb = Ar(-40),
  Cb = Ar(-400),
  Ab = Qo(-10),
  Ib = Qo(-20),
  xb = Qo(-40),
  kb = Qo(10),
  Tb = Qo(20),
  Lb = Qo(40),
  Pb = Ub(),
  Mb = st({
    0: { transform: "translateX(100%)", pointerEvents: "none" },
    100: { transform: "translateX(0)", pointerEvents: "auto" },
  }),
  $b = st({
    0: { transform: "translateX(0%)", pointerEvents: "none" },
    100: { transform: "translateX(100%)", pointerEvents: "auto" },
  }),
  Rb = st({
    0: { transform: `translateX(var(${es}, 0))`, pointerEvents: "none" },
    100: { transform: "translateX(100%)", pointerEvents: "auto" },
  }),
  Db = st({
    0: { transform: "scale3d(.98,.98,1)" },
    100: { transform: "scale3d(1,1,1)" },
  }),
  _b = st({
    0: { transform: "scale3d(1,1,1)" },
    100: { transform: "scale3d(.98,.98,1)" },
  }),
  Ob = st({
    0: { transform: "scale3d(1.03,1.03,1)" },
    100: { transform: "scale3d(1,1,1)" },
  }),
  Nb = st({
    0: { transform: "scale3d(1,1,1)" },
    100: { transform: "scale3d(1.03,1.03,1)" },
  }),
  Fb = st({
    0: { transform: "rotateZ(0deg)" },
    100: { transform: "rotateZ(90deg)" },
  }),
  Bb = st({
    0: { transform: "rotateZ(0deg)" },
    100: { transform: "rotateZ(-90deg)" },
  }),
  St = {
    slideRightIn10: oe([Oe, Hv], he, ue),
    slideRightIn20: oe([Oe, Vv], he, ue),
    slideRightIn40: oe([Oe, Wv], he, ue),
    slideRightIn400: oe([Oe, Gv], he, ue),
    slideRightIn102d: oe([Oe, Kv], he, ue),
    slideRightIn202d: oe([Oe, Zv], he, ue),
    slideRightIn402d: oe([Oe, Qv], he, ue),
    slideRightIn4002d: oe([Oe, Jv], he, ue),
    slideLeftIn10: oe([Oe, jv], he, ue),
    slideLeftIn20: oe([Oe, Yv], he, ue),
    slideLeftIn40: oe([Oe, qv], he, ue),
    slideLeftIn400: oe([Oe, Xv], he, ue),
    slideLeftIn102d: oe([Oe, eb], he, ue),
    slideLeftIn202d: oe([Oe, tb], he, ue),
    slideLeftIn402d: oe([Oe, nb], he, ue),
    slideLeftIn4002d: oe([Oe, rb], he, ue),
    slideUpIn10: oe([Oe, ob], he, ue),
    slideUpIn20: oe([Oe, ib], he, ue),
    slideUpIn40: oe([Oe, ab], he, ue),
    slideDownIn10: oe([Oe, sb], he, ue),
    slideDownIn20: oe([Oe, lb], he, ue),
    slideDownIn40: oe([Oe, cb], he, ue),
    slideUpIn102d: oe([Oe, ub], he, ue),
    slideUpIn202d: oe([Oe, db], he, ue),
    slideUpIn402d: oe([Oe, gb], he, ue),
    slideDownIn102d: oe([Oe, fb], he, ue),
    slideDownIn202d: oe([Oe, hb], he, ue),
    slideDownIn402d: oe([Oe, mb], he, ue),
    slideRightOut10: oe([It, yb], he, ue),
    slideRightOut20: oe([It, pb], he, ue),
    slideRightOut40: oe([It, vb], he, ue),
    slideRightOut400: oe([It, bb], he, ue),
    slideLeftOut10: oe([It, wb], he, ue),
    slideLeftOut20: oe([It, Sb], he, ue),
    slideLeftOut40: oe([It, Eb], he, ue),
    slideLeftOut400: oe([It, Cb], he, ue),
    slideUpOut10: oe([It, Ab], he, ue),
    slideUpOut20: oe([It, Ib], he, ue),
    slideUpOut40: oe([It, xb], he, ue),
    slideDownOut10: oe([It, kb], he, ue),
    slideDownOut20: oe([It, Tb], he, ue),
    slideDownOut40: oe([It, Lb], he, ue),
    scaleUpIn100: oe([Oe, Db], he, ue),
    scaleDownIn100: oe([Oe, Ob], he, ue),
    scaleUpOut103: oe([It, Nb], va, nn),
    scaleDownOut98: oe([It, _b], va, nn),
    fadeInFaster: oe([ba], va, nn),
    fadeInNormal: oe([ba], he, nn),
    fadeInSlow: oe([ba], Li, nn),
    fadeInSlower: oe([ba], Pd, nn),
    fadeOutFaster: oe([wa], va, nn),
    fadeOutNormal: oe([wa], he, nn),
    fadeOutSlow: oe([wa], Li, nn),
    fadeOutSlower: oe([wa], Pd, nn),
    rotate90deg: oe([Fb], 100, nn),
    rotateN90deg: oe([Bb], 100, nn),
    pageSlideLeftInFull: oe([Mb], Li, ue),
    pageSlideRightOutFull: oe([$b], Li, ue),
    pageSwipeSlideRightOutFull: oe([Rb], jr, ue),
    usePageSlideIn() {
      const { isMobileViewportSize: e } = Uo();
      return e() ? this.pageSlideLeftInFull : this.slideLeftIn40;
    },
    usePageSlideOut() {
      const { isMobileViewportSize: e } = Uo();
      return e() ? this.pageSlideRightOutFull : this.slideRightOut40;
    },
    hideImmediately: oe([Pb], 1, Vf),
  };
function oe(e, t, n) {
  const r = e.map((i) => `${i} ${t}ms ${n}`).join(","),
    o = `__ani${zv++}`;
  return (
    Kc(Wf.sheet, `.${o} { animation: ${r} }`, 0), { cssText: r, cssClass: o }
  );
}
function Er(e) {
  return st({
    0: { transform: `translate3d(${e}px,0,0)`, pointerEvents: "none" },
    100: { transform: "translate3d(0,0,0)", pointerEvents: "auto" },
  });
}
function Cr(e) {
  return st({
    0: { transform: `translateX(${e}px)`, pointerEvents: "none" },
    100: { transform: "translateX(0)", pointerEvents: "auto" },
  });
}
function Ko(e) {
  return st({
    0: { transform: `translate3d(0,${e}px,0)`, pointerEvents: "none" },
    100: { transform: "translate3d(0,0,0)", pointerEvents: "auto" },
  });
}
function Zo(e) {
  return st({
    0: { transform: `translateY(${e}px)`, pointerEvents: "none" },
    100: { transform: "translateY(0)", pointerEvents: "auto" },
  });
}
function Ar(e) {
  return st({
    0: { transform: "translate3d(0,0,0)" },
    100: { transform: `translate3d(${e}px,0,0)` },
  });
}
function Qo(e) {
  return st({
    0: { transform: "translate3d(0,0,0)" },
    100: { transform: `translate3d(0,${e}px,0)` },
  });
}
function Ub() {
  return st({
    0: { opacity: "0", pointerEvents: "none" },
    100: { opacity: "0", pointerEvents: "none" },
  });
}
function st(e) {
  const t = `__kf${Uv++}`,
    n = `@keyframes ${t} { ${Object.entries(e)
      .map(([r, o]) => `${r}% ${vp(o)}`)
      .join(" ")} }`;
  return Kc(Wf.sheet, n, 0), t;
}
const Ms = { position: "absolute", boxSizing: "border-box" },
  En = { ...Ms, left: "0", top: "0", right: 0, bottom: 0 },
  Gf = { ...Ms, left: "0", top: "0", right: 0 },
  zb = { ...Ms, left: "0", bottom: "0", right: 0 },
  Hb = { ...Ms, left: "0", top: "0", bottom: 0 },
  $s = { position: "fixed", left: "0", top: "0", right: 0, bottom: 0 },
  yn = { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
  jf = (e) => ({
    display: "-webkit-box",
    webkitLineClamp: e,
    webkitBoxOrient: "vertical",
    overflow: "hidden",
  }),
  Vb = {
    appearance: "none",
    background: "transparent",
    webkitTapHighlightColor: "rgba(0, 0, 0, 0)",
    border: "none",
    outline: "none",
    textAlign: "center",
    whiteSpace: "nowrap",
    userSelect: "none",
    webkitUserSelect: "none",
    cursor: "pointer",
    "::-moz-focus-inner": { border: 0 },
  },
  Yf = {
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
  qf = (e) => ({
    [Uf]: { boxShadow: `inset 0 0 0 2px ${e.color.primary}`, outline: "none" },
  });
Ft(`
@keyframes transient-focus-outline {
  0% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
}`);
const Pi = "data-is-focus",
  Wb = (e) => ({
    outline: "none",
    [`[${Pi}]`]: {
      ">.transient-focus-ring": {
        position: "sticky",
        top: 0,
        bottom: 0,
        width: "100%",
        height: "100%",
        boxShadow: `0 0 0 2px ${e.color.primary} inset`,
        pointerEvents: "none",
        zIndex: 1e4,
        animation: "1s linear forwards transient-focus-outline",
      },
    },
  });
var Gb = w("<span class=state-layer>");
const wc = 0.08,
  jb = 0.12,
  Sc = 0.12;
function Ir(e) {
  const t = L(() =>
    io({
      position: "relative",
      overflow: "hidden",
      ">*": { position: "relative" },
      ">.state-layer": {
        ...En,
        opacity: 0,
        pointerEvents: "none",
        transitionProperty: "background-color, box-shadow, opacity",
        transitionTimingFunction: ue,
        ...(e.active ? { background: e.layerBackground, opacity: Sc } : void 0),
      },
      cursor: e.disabled ? "not-allowed" : "pointer",
      ...(!e.disabled && {
        "@media (hover: hover)": {
          ":hover": {
            ">.state-layer": {
              background: e.layerBackground,
              opacity: wc,
              transitionDuration: "0ms",
            },
          },
        },
        ":active": {
          ">.state-layer": {
            background: e.layerBackground,
            opacity: Sc,
            transitionDuration: "0ms",
          },
          ":has([data-stateful-disable-active]:active)": {
            ">.state-layer": {
              background: e.layerBackground,
              opacity: wc,
              transitionDuration: "0ms",
            },
          },
        },
        ...(e.disableFocusBackground
          ? {}
          : {
              [Uf]: {
                ">.state-layer": {
                  background: e.layerBackground,
                  opacity: jb,
                  transitionDuration: "0ms",
                },
              },
            }),
      }),
    })
  );
  return l(
    jt,
    F(
      {
        get component() {
          return e.component;
        },
        get class() {
          return H(e.class, t());
        },
        get disabled() {
          return e.disabled;
        },
      },
      () => e.componentProps,
      {
        get children() {
          return [Gb(), L(() => e.children)];
        },
      }
    )
  );
}
var Yb = w("<span>");
const ts = { small: 32, medium: 40, large: 48 },
  Sa = { small: 16, medium: 24, large: 28 },
  qb = { small: 18, medium: 24, large: 36 };
function Z(e) {
  const t = F(
      {
        variant: "filled",
        color: e.variant === "tonal" ? "secondary" : "primary",
        inverse: !1,
        size: "medium",
        full: !1,
        isActive: !1,
        disabled: !1,
        loadingSpinner: !1,
        type: "button",
      },
      e
    ),
    [n, r] = Ve(t, [
      "ref",
      "class",
      "variant",
      "color",
      "inverse",
      "size",
      "full",
      "edge",
      "transparent",
      "active",
      "children",
      "disabled",
      "isLoading",
      "loadingText",
      "loadingSpinner",
      "href",
      "icon",
      "iconBefore",
      "iconAfter",
    ]),
    o = at(),
    i = Pt(),
    a = Xb(),
    s = () =>
      n.disabled
        ? n.variant === "filled" || n.variant === "tonal"
          ? Ot(i().color.onSurface, 0.12)
          : n.variant === "outlined" || n.variant === "text"
          ? mn
          : W(!1)
        : n.inverse
        ? n.variant === "filled"
          ? i().color.inverseSurface
          : mn
        : n.variant === "filled"
        ? n.transparent
          ? Ot(i().color[n.color], 0.35)
          : i().color[n.color]
        : n.variant === "tonal"
        ? i().color[`${n.color}Container`]
        : n.variant === "outlined" || n.variant === "text"
        ? mn
        : W(!1),
    c = () =>
      n.disabled
        ? n.variant === "filled" ||
          n.variant === "tonal" ||
          n.variant === "outlined" ||
          n.variant === "text"
          ? Ot(i().color.onSurface, 0.38)
          : W(!1)
        : n.inverse
        ? (n.variant === "filled", i().color.inversePrimary)
        : n.variant === "filled"
        ? i().color[`on${Bo(n.color)}`]
        : n.variant === "tonal"
        ? i().color[`on${Bo(n.color)}Container`]
        : n.variant === "outlined" || n.variant === "text"
        ? i().color[n.color]
        : W(!1),
    u = () =>
      n.disabled
        ? {}
        : n.variant === "filled" && !n.transparent
        ? i().elevationShadowStyle(1)
        : void 0,
    d = () =>
      n.size === "small"
        ? i().typescale.labelMediumStyle
        : n.size === "medium"
        ? i().typescale.labelLargeStyle
        : n.size === "large"
        ? i().typescale.titleMediumStyle
        : W(!1),
    g = () => qb[n.size],
    f = () => (n.variant === "outlined" ? 1 : 0),
    m = () =>
      n.variant === "outlined"
        ? n.disabled
          ? Ot(i().color.onPrimary, 12)
          : i().color[n.color]
        : void 0,
    y = () => i().sharp.full,
    b = () => ts[n.size],
    v = () => (n.icon ? b() : void 0),
    S = () =>
      n.icon
        ? 0
        : `0 ${n.iconAfter ? Sa[n.size] - 8 : Sa[n.size]}px 0 ${
            n.iconBefore ? Sa[n.size] - 8 : Sa[n.size]
          }px`,
    A = () => {
      const P = {
        marginTop: 0,
        marginRight: "0.375rem",
        marginBottom: 0,
        marginLeft: "0.375rem",
      };
      return (
        n.icon &&
          ((P.marginLeft = P.marginRight = "0.25rem"),
          n.size === "small" && (P.marginLeft = P.marginRight = "0.0625rem")),
        (n.edge === "start" || n.full) && (P.marginLeft = "0"),
        (n.edge === "end" || n.full) && (P.marginRight = "0"),
        P
      );
    },
    k = () =>
      io({
        display: n.full ? "flex" : "inline-flex",
        width: v(),
        height: b(),
        padding: S(),
        backgroundColor: s(),
        color: c(),
        fill: c(),
        borderRadius: y(),
        borderColor: m(),
        borderWidth: f(),
        borderStyle: "solid",
        ...A(),
        ...d(),
        ":hover": u(),
        transition: `all ease ${he}ms`,
      }),
    T = (P) => {
      n.href && n.href.startsWith("/") && (P.preventDefault(), o(n.href));
    },
    E = () => (n.href ? "a" : "button");
  return l(Ir, {
    get layerBackground() {
      return c();
    },
    get class() {
      return H(a().root, k(), n.full && a().full, n.class);
    },
    get active() {
      return n.active;
    },
    get disabled() {
      return n.disabled || n.isLoading;
    },
    get component() {
      return E();
    },
    get componentProps() {
      return {
        ref: e.ref,
        ...(n.href ? { href: n.href, onClick: T } : {}),
        ...(n.active ? { "data-active": !0 } : {}),
        ...r,
      };
    },
    get children() {
      return [
        L(
          () =>
            L(() => !!(n.isLoading && (!n.icon || n.loadingSpinner)))() &&
            l(ao, {
              get class() {
                return H({ marginRight: n.loadingText ? 8 : 0 });
              },
              get color() {
                return c();
              },
              get size() {
                return g();
              },
            })
        ),
        L(
          () =>
            L(() => !!n.iconBefore)() &&
            l(n.iconBefore, {
              get class() {
                return a().iconBefore;
              },
              get size() {
                return g();
              },
            })
        ),
        L(
          () =>
            L(() => !!(n.icon && !(n.isLoading && n.loadingSpinner)))() &&
            l(n.icon, {
              get class() {
                return H(n.isLoading && a().iconButtonBusy);
              },
              get size() {
                return g();
              },
            })
        ),
        (() => {
          var P = Yb();
          return p(P, () => (n.isLoading ? n.loadingText : n.children)), P;
        })(),
        L(
          () =>
            L(() => !!n.iconAfter)() &&
            l(n.iconAfter, {
              get class() {
                return a().iconAfter;
              },
              get size() {
                return g();
              },
            })
        ),
      ];
    },
  });
}
Ft(`
@keyframes IconButton-busy {
  0% { opacity: 0.25; }
  50% { opacity: 1; }
  100% { opacity: 0.25; }
}
`);
const Xb = q(() => ({
  root: {
    overflow: "hidden",
    boxSizing: "border-box",
    flexShrink: 0,
    appearance: "none",
    display: "inline-flex",
    position: "relative",
    zIndex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "nowrap",
    cursor: "pointer",
    outline: "none",
    userSelect: "none",
    webkitUserSelect: "none",
    textDecoration: "none",
    textTransform: "uppercase",
    "::-moz-focus-inner": { border: "none" },
  },
  full: { display: "block", flex: 1, width: "100%" },
  iconButtonBusy: {
    animation: "1.5s IconButton-busy linear infinite",
    cursor: "wait",
  },
  iconBefore: { marginRight: "0.5rem" },
  iconAfter: { marginLeft: "0.5rem" },
}));
var Kb = w("<svg>");
function ee(e) {
  e = F({ viewBox: "0 0 24 24" }, e);
  const [t, n] = Ve(e, [
      "class",
      "size",
      "width",
      "height",
      "viewBox",
      "children",
    ]),
    r = Zb();
  return (() => {
    var o = Kb();
    return (
      Je(
        o,
        F(
          {
            get viewBox() {
              return t.viewBox;
            },
            get class() {
              return H(
                r().root,
                t.class,
                t.size == null ? void 0 : { width: t.size, height: t.size },
                t.width ? { width: t.width } : null,
                t.height ? { height: t.height } : null
              );
            },
          },
          n
        ),
        !0,
        !0
      ),
      p(o, () => t.children),
      o
    );
  })();
}
const Zb = q({
  root: {
    display: "inline-block",
    verticalAlign: "middle",
    width: 24,
    height: 24,
    userSelect: "none",
    webkitUserSelect: "none",
    fill: "currentcolor",
  },
});
var Qb = w(
    '<svg><path fill=#e79317 d="m 16.975 22.922 l 0.23 -0.103 l -0.188 -0.169 a 3.764 3.764 0 0 1 -1.036 -1.505 l -0.061 -0.159 l -0.155 0.066 a 9.745 9.745 0 0 1 -3.759 0.75 c -5.405 0 -9.806 -4.397 -9.806 -9.806 c 0 -5.409 4.397 -9.802 9.802 -9.802 c 5.405 0 9.806 4.402 9.806 9.806 a 9.692 9.692 0 0 1 -0.947 4.2 l -0.075 0.155 l 0.155 0.066 a 3.767 3.767 0 0 1 1.453 1.106 l 0.159 0.197 l 0.117 -0.225 a 11.905 11.905 0 0 0 1.331 -5.498 c 0 -6.619 -5.381 -12 -12 -12 s -12 5.381 -12 12 s 5.381 12 12 12 c 1.73 0 3.403 -0.361 4.973 -1.078 z m 2.504 -0.577 c -3.325 0 -3.325 -4.988 0 -4.988 s 3.325 4.988 0 4.988 z m -1.465 -13.691 a 1.01 1.01 0 0 1 1.108 0.83 a 0.89 0.89 0 0 1 -0.786 1.065 s -2.911 0.415 -5.27 2.773 c -2.358 2.358 -2.773 5.27 -2.773 5.27 a 0.89 0.89 0 0 1 -1.065 0.785 a 1.011 1.011 0 0 1 -0.83 -1.108 c 0 -0.186 0.46 -3.513 3.28 -6.333 c 2.82 -2.82 6.152 -3.28 6.336 -3.282 z m 1.572 5.177 c 0 0.555 -0.555 1.016 -1.11 1.016 c 0 0 -1.432 0.046 -2.634 1.248 c -1.203 1.203 -1.203 2.59 -1.248 2.635 c -0.001 0.555 -0.464 1.018 -1.016 1.11 a 0.903 0.903 0 0 1 -1.02 -0.924 c 0 -0.095 0.048 -2.359 1.897 -4.207 c 1.849 -1.85 4.113 -1.896 4.207 -1.896 c 0.555 0.001 0.924 0.462 0.924 1.018 z"></svg>',
    !1,
    !0
  ),
  Jb = w(
    "<svg><path d=M16,9H19L14,16M10,9H14L12,17M5,9H8L10,16M15,4H17L19,7H16M11,4H13L14,7H10M7,4H9L8,7H5M6,2L2,8L12,22L22,8L18,2H6Z></svg>",
    !1,
    !0
  ),
  Ae = w('<svg><path d="M0 0h24v24H0V0z"fill=none></svg>', !1, !0),
  e2 = w(
    '<svg><path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></svg>',
    !1,
    !0
  ),
  t2 = w(
    '<svg><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"></svg>',
    !1,
    !0
  ),
  n2 = w(
    '<svg><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"></svg>',
    !1,
    !0
  ),
  r2 = w(
    '<svg><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z M 22 15 l -2.94 -3.5 l -3.06 3.5 h 2 v 4 h 2 v -4 h 2"></svg>',
    !1,
    !0
  ),
  o2 = w(
    '<svg><path d="M18 7l-1.41-1.41-6.34 6.34 1.41 1.41L18 7zm4.24-1.41L11.66 16.17 7.48 12l-1.41 1.41L11.66 19l12-12-1.42-1.41zM.41 13.41L6 19l1.41-1.41L1.83 12 .41 13.41z"></svg>',
    !1,
    !0
  ),
  i2 = w(
    '<svg><path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></svg>',
    !1,
    !0
  ),
  a2 = w(
    '<svg><path d="M5 17v2h14v-2H5zm4.5-4.2h5l.9 2.2h2.1L12.75 4h-1.5L6.5 15h2.1l.9-2.2zM12 5.98L13.87 11h-3.74L12 5.98z"></svg>',
    !1,
    !0
  ),
  s2 = w(
    '<svg><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"></svg>',
    !1,
    !0
  ),
  l2 = w(
    '<svg><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6 1.41 1.41z"></svg>',
    !1,
    !0
  ),
  c2 = w(
    '<svg><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"></svg>',
    !1,
    !0
  ),
  u2 = w(
    '<svg><g><rect fill=none height=24 width=24></rect><g><path d="M19,5v14H5V5H19 M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3L19,3z"></path></g><path d="M14,17H7v-2h7V17z M17,13H7v-2h10V13z M17,9H7V7h10V9z"></svg>',
    !1,
    !0
  ),
  er = w('<svg><path d="M0 0h24v24H0z"fill=none></svg>', !1, !0),
  d2 = w(
    '<svg><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"></svg>',
    !1,
    !0
  ),
  g2 = w(
    '<svg><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"></svg>',
    !1,
    !0
  ),
  f2 = w(
    '<svg><path d="M17 3H7c-1.1 0-2 .9-2 2v16l7-3 7 3V5c0-1.1-.9-2-2-2z"></svg>',
    !1,
    !0
  ),
  h2 = w(
    '<svg><path d="M15 7v12.97l-4.21-1.81-.79-.34-.79.34L5 19.97V7h10m4-6H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2v13l2 1V3c0-1.1-.9-2-2-2zm-4 4H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2z"></svg>',
    !1,
    !0
  ),
  m2 = w(
    '<svg><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16zM16 17H5V7h11l3.55 5L16 17z"></svg>',
    !1,
    !0
  ),
  y2 = w(
    '<svg><path d="M17.63 5.84C17.27 5.33 16.67 5 16 5L5 5.01C3.9 5.01 3 5.9 3 7v10c0 1.1.9 1.99 2 1.99L16 19c.67 0 1.27-.33 1.63-.84L22 12l-4.37-6.16z"></svg>',
    !1,
    !0
  ),
  p2 = w(
    '<svg><path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></svg>',
    !1,
    !0
  ),
  v2 = w(
    '<svg><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></svg>',
    !1,
    !0
  ),
  b2 = w(
    '<svg><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"></svg>',
    !1,
    !0
  ),
  w2 = w(
    '<svg><path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"></svg>',
    !1,
    !0
  ),
  S2 = w(
    '<svg><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"></svg>',
    !1,
    !0
  ),
  E2 = w(
    '<svg><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 5-8-5h16zm0 12H4V8l8 5 8-5v10z"></svg>',
    !1,
    !0
  ),
  Xf = w("<svg><g><path d=M0,0h24v24H0V0z fill=none></svg>", !1, !0),
  C2 = w(
    '<svg><g><g><path d="M2,17h20v2H2V17z M3.15,12.95L4,11.47l0.85,1.48l1.3-0.75L5.3,10.72H7v-1.5H5.3l0.85-1.47L4.85,7L4,8.47L3.15,7l-1.3,0.75 L2.7,9.22H1v1.5h1.7L1.85,12.2L3.15,12.95z M9.85,12.2l1.3,0.75L12,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H15v-1.5h-1.7l0.85-1.47 L12.85,7L12,8.47L11.15,7l-1.3,0.75l0.85,1.47H9v1.5h1.7L9.85,12.2z M23,9.22h-1.7l0.85-1.47L20.85,7L20,8.47L19.15,7l-1.3,0.75 l0.85,1.47H17v1.5h1.7l-0.85,1.48l1.3,0.75L20,11.47l0.85,1.48l1.3-0.75l-0.85-1.48H23V9.22z"></svg>',
    !1,
    !0
  ),
  A2 = w(
    '<svg><g fill=none><path d="M0 0h24v24H0V0z"></path><path d="M0 0h24v24H0V0z"opacity=.87></svg>',
    !1,
    !0
  ),
  I2 = w(
    '<svg><path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7zm-4 6h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"></svg>',
    !1,
    !0
  ),
  x2 = w(
    '<svg><path d="M16 9v10H8V9h8m-1.5-6h-5l-1 1H5v2h14V4h-3.5l-1-1zM18 7H6v12c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7z"></svg>',
    !1,
    !0
  ),
  k2 = w(
    '<svg><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></svg>',
    !1,
    !0
  ),
  T2 = w(
    '<svg><path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></svg>',
    !1,
    !0
  ),
  L2 = w(
    '<svg><path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></svg>',
    !1,
    !0
  ),
  ea = w("<svg><g><rect fill=none height=24 width=24></svg>", !1, !0),
  P2 = w(
    '<svg><g><g><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M7.35,18.5C8.66,17.56,10.26,17,12,17 s3.34,0.56,4.65,1.5C15.34,19.44,13.74,20,12,20S8.66,19.44,7.35,18.5z M18.14,17.12L18.14,17.12C16.45,15.8,14.32,15,12,15 s-4.45,0.8-6.14,2.12l0,0C4.7,15.73,4,13.95,4,12c0-4.42,3.58-8,8-8s8,3.58,8,8C20,13.95,19.3,15.73,18.14,17.12z"></path><path d="M12,6c-1.93,0-3.5,1.57-3.5,3.5S10.07,13,12,13s3.5-1.57,3.5-3.5S13.93,6,12,6z M12,11c-0.83,0-1.5-0.67-1.5-1.5 S11.17,8,12,8s1.5,0.67,1.5,1.5S12.83,11,12,11z"></svg>',
    !1,
    !0
  ),
  M2 = w(
    '<svg><path d="M18.6 6.62c-1.44 0-2.8.56-3.77 1.53L7.8 14.39c-.64.64-1.49.99-2.4.99-1.87 0-3.39-1.51-3.39-3.38S3.53 8.62 5.4 8.62c.91 0 1.76.35 2.44 1.03l1.13 1 1.51-1.34L9.22 8.2C8.2 7.18 6.84 6.62 5.4 6.62 2.42 6.62 0 9.04 0 12s2.42 5.38 5.4 5.38c1.44 0 2.8-.56 3.77-1.53l7.03-6.24c.64-.64 1.49-.99 2.4-.99 1.87 0 3.39 1.51 3.39 3.38s-1.52 3.38-3.39 3.38c-.9 0-1.76-.35-2.44-1.03l-1.14-1.01-1.51 1.34 1.27 1.12c1.02 1.01 2.37 1.57 3.82 1.57 2.98 0 5.4-2.41 5.4-5.38s-2.42-5.37-5.4-5.37z"></svg>',
    !1,
    !0
  ),
  $2 = w(
    '<svg><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></svg>',
    !1,
    !0
  ),
  R2 = w(
    '<svg><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z"></svg>',
    !1,
    !0
  ),
  D2 = w(
    '<svg><path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></svg>',
    !1,
    !0
  ),
  _2 = w(
    '<svg><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></svg>',
    !1,
    !0
  ),
  Kf = w(
    '<svg><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"></svg>',
    !1,
    !0
  ),
  O2 = w("<svg><circle cx=12 cy=12 r=5></svg>", !1, !0),
  N2 = w(
    '<svg><g><path d="M17,8l-1.41,1.41L17.17,11H9v2h8.17l-1.58,1.58L17,16l4-4L17,8z M5,5h7V3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h7v-2H5V5z"></svg>',
    !1,
    !0
  ),
  F2 = w(
    '<svg><path d="M19.9 10.4h-3.2a1.6 1.6 0 0 0-1.6 1.6v6.3a1.6 1.6 0 0 0 1.6 1.6H20a1.6 1.6 0 0 0 1.5-1.6V12a1.6 1.6 0 0 0-1.5-1.6zm0 7.9h-3.2V12H20zm.8-14.2H3.3a.8.8 0 0 0-.7.8v11a.8.8 0 0 0 .7.8h6.3v1.6H8.5a.4.4 0 0 0-.4.4v.8a.4.4 0 0 0 .4.4h5V15H4.2V5.7H20v3.2h1.5v-4a.8.8 0 0 0-.7-.8Z"></svg>',
    !1,
    !0
  ),
  B2 = w(
    '<svg><path d="M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z"></svg>',
    !1,
    !0
  ),
  U2 = w(
    '<svg><path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17l-.59.59-.58.58V4h16v12zm-9-4h2v2h-2zm0-6h2v4h-2z"></svg>',
    !1,
    !0
  ),
  z2 = w(
    '<svg><path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"></svg>',
    !1,
    !0
  ),
  H2 = w(
    '<svg><path d="M10 8.64L15.27 12 10 15.36V8.64M8 5v14l11-7L8 5z"></svg>',
    !1,
    !0
  ),
  V2 = w(
    '<svg><g><path d="M6,2l0.01,6L10,12l-3.99,4.01L6,22h12v-6l-4-4l4-3.99V2H6z M16,16.5V20H8v-3.5l4-4L16,16.5z"></svg>',
    !1,
    !0
  ),
  W2 = w('<svg><path d="M.01 0h24v24h-24V0z"fill=none></svg>', !1, !0),
  G2 = w(
    '<svg><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"></svg>',
    !1,
    !0
  ),
  j2 = w(
    '<svg><path d="M0 0h24v24H0V0zm0 0h24v24H0V0z"fill=none></svg>',
    !1,
    !0
  ),
  Y2 = w(
    '<svg><path d="M20 7v10H4V7h16m0-2H4c-1.1 0-1.99.9-1.99 2L2 17c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm-9 3h2v2h-2zm0 3h2v2h-2zM8 8h2v2H8zm0 3h2v2H8zm-3 0h2v2H5zm0-3h2v2H5zm3 6h8v2H8zm6-3h2v2h-2zm0-3h2v2h-2zm3 3h2v2h-2zm0-3h2v2h-2z"></svg>',
    !1,
    !0
  ),
  q2 = w(
    '<svg><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"></svg>',
    !1,
    !0
  ),
  Zf = w("<svg><rect fill=none height=24 width=24></svg>", !1, !0),
  X2 = w(
    '<svg><path d="M3,5v14h18V5H3z M7,7v2H5V7H7z M5,13v-2h2v2H5z M5,15h2v2H5V15z M19,17H9v-2h10V17z M19,13H9v-2h10V13z M19,9H9V7h10V9z"></svg>',
    !1,
    !0
  ),
  K2 = w("<svg><g><rect fill=none height=24 width=24 x=0 y=0></svg>", !1, !0),
  Z2 = w(
    '<svg><g><g><path d="M19,13H5c-1.1,0-2,0.9-2,2v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2v-4C21,13.9,20.1,13,19,13z M19,19H5v-4h14V19z"></path><path d="M19,3H5C3.9,3,3,3.9,3,5v4c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M19,9H5V5h14V9z"></svg>',
    !1,
    !0
  ),
  Q2 = w(
    '<svg><path d="M3,5v14h18V5H3z M8.33,17H5V7h3.33V17z M13.67,17h-3.33V7h3.33V17z M19,17h-3.33V7H19V17z"></svg>',
    !1,
    !0
  ),
  J2 = w(
    '<svg><g><path d="M12,2C6.49,2,2,6.49,2,12s4.49,10,10,10c1.38,0,2.5-1.12,2.5-2.5c0-0.61-0.23-1.2-0.64-1.67c-0.08-0.1-0.13-0.21-0.13-0.33 c0-0.28,0.22-0.5,0.5-0.5H16c3.31,0,6-2.69,6-6C22,6.04,17.51,2,12,2z M17.5,13c-0.83,0-1.5-0.67-1.5-1.5c0-0.83,0.67-1.5,1.5-1.5 s1.5,0.67,1.5,1.5C19,12.33,18.33,13,17.5,13z M14.5,9C13.67,9,13,8.33,13,7.5C13,6.67,13.67,6,14.5,6S16,6.67,16,7.5 C16,8.33,15.33,9,14.5,9z M5,11.5C5,10.67,5.67,10,6.5,10S8,10.67,8,11.5C8,12.33,7.33,13,6.5,13S5,12.33,5,11.5z M11,7.5 C11,8.33,10.33,9,9.5,9S8,8.33,8,7.5C8,6.67,8.67,6,9.5,6S11,6.67,11,7.5z"></svg>',
    !1,
    !0
  ),
  ew = w(
    '<svg><path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"></svg>',
    !1,
    !0
  ),
  tw = w(
    '<svg><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5.5-2.5l7.51-3.49L17.5 6.5 9.99 9.99 6.5 17.5zm5.5-6.6c.61 0 1.1.49 1.1 1.1s-.49 1.1-1.1 1.1-1.1-.49-1.1-1.1.49-1.1 1.1-1.1z"></svg>',
    !1,
    !0
  ),
  nw = w(
    '<svg><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"></svg>',
    !1,
    !0
  ),
  rw = w(
    '<svg><path d="M18 1.01L8 1c-1.1 0-2 .9-2 2v3h2V5h10v14H8v-1H6v3c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM10 15h2V8H5v2h3.59L3 15.59 4.41 17 10 11.41z"></svg>',
    !1,
    !0
  ),
  ow = w('<svg><path d="M7 10l5 5 5-5H7z"></svg>', !1, !0),
  iw = w(
    '<svg><path d="M 20 4 H 4 A 2 2 0 0 0 2 6 V 18 A 2 2 0 0 0 4 20 H 20 A 2 2 0 0 0 22 18 V 6 A 2 2 0 0 0 20 4 M 20 18 H 9 V 6 H 20 Z M 4 6 L 7 6 L 7 18 L 4 18 Z"></svg>',
    !1,
    !0
  ),
  aw = w(
    '<svg><path d="M20 4H4A2 2 0 0 0 2 6V18A2 2 0 0 0 4 20H20A2 2 0 0 0 22 18V6A2 2 0 0 0 20 4M20 18H9V6H20Z"></svg>',
    !1,
    !0
  ),
  sw = w(
    '<svg><g><path d="M16,5l-1.42,1.42l-1.59-1.59V16h-1.98V4.83L9.42,6.42L8,5l4-4L16,5z M20,10v11c0,1.1-0.9,2-2,2H6c-1.11,0-2-0.9-2-2V10 c0-1.11,0.89-2,2-2h3v2H6v11h12V10h-3V8h3C19.1,8,20,8.89,20,10z"></svg>',
    !1,
    !0
  ),
  lw = w(
    '<svg><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"></svg>',
    !1,
    !0
  ),
  cw = w(
    '<svg><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M3,4L6,7V5H12V3H6V1L3,4Z"></svg>',
    !1,
    !0
  ),
  uw = w(
    '<svg><path d="M10,9A1,1 0 0,1 11,8A1,1 0 0,1 12,9V13.47L13.21,13.6L18.15,15.79C18.68,16.03 19,16.56 19,17.14V21.5C18.97,22.32 18.32,22.97 17.5,23H11C10.62,23 10.26,22.85 10,22.57L5.1,18.37L5.84,17.6C6.03,17.39 6.3,17.28 6.58,17.28H6.8L10,19V9M12,4L9,1V3H3V5H9V7L12,4Z"></svg>',
    !1,
    !0
  ),
  dw = w(
    '<svg><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"></svg>',
    !1,
    !0
  ),
  gw = w(
    '<svg><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"></svg>',
    !1,
    !0
  ),
  fw = w(
    '<svg><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></svg>',
    !1,
    !0
  ),
  hw = w(
    '<svg><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"></svg>',
    !1,
    !0
  ),
  mw = w(
    '<svg><path d="M21,5c-1.11-0.35-2.33-0.5-3.5-0.5c-1.95,0-4.05,0.4-5.5,1.5c-1.45-1.1-3.55-1.5-5.5-1.5S2.45,4.9,1,6v14.65 c0,0.25,0.25,0.5,0.5,0.5c0.1,0,0.15-0.05,0.25-0.05C3.1,20.45,5.05,20,6.5,20c1.95,0,4.05,0.4,5.5,1.5c1.35-0.85,3.8-1.5,5.5-1.5 c1.65,0,3.35,0.3,4.75,1.05c0.1,0.05,0.15,0.05,0.25,0.05c0.25,0,0.5-0.25,0.5-0.5V6C22.4,5.55,21.75,5.25,21,5z M21,18.5 c-1.1-0.35-2.3-0.5-3.5-0.5c-1.7,0-4.15,0.65-5.5,1.5V8c1.35-0.85,3.8-1.5,5.5-1.5c1.2,0,2.4,0.15,3.5,0.5V18.5z"></svg>',
    !1,
    !0
  ),
  yw = w(
    '<svg><path d="M17.5,10.5c0.88,0,1.73,0.09,2.5,0.26V9.24C19.21,9.09,18.36,9,17.5,9c-1.7,0-3.24,0.29-4.5,0.83v1.66 C14.13,10.85,15.7,10.5,17.5,10.5z"></svg>',
    !1,
    !0
  ),
  pw = w(
    '<svg><path d="M13,12.49v1.66c1.13-0.64,2.7-0.99,4.5-0.99c0.88,0,1.73,0.09,2.5,0.26V11.9c-0.79-0.15-1.64-0.24-2.5-0.24 C15.8,11.66,14.26,11.96,13,12.49z"></svg>',
    !1,
    !0
  ),
  vw = w(
    '<svg><path d="M17.5,14.33c-1.7,0-3.24,0.29-4.5,0.83v1.66c1.13-0.64,2.7-0.99,4.5-0.99c0.88,0,1.73,0.09,2.5,0.26v-1.52 C19.21,14.41,18.36,14.33,17.5,14.33z"></svg>',
    !1,
    !0
  ),
  bw = w(
    '<svg><path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143ZM233-120l65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Zm247-350Z"></svg>',
    !1,
    !0
  ),
  ww = w(
    '<svg><path d="m233-120 65-281L80-590l288-25 112-265 112 265 288 25-218 189 65 281-247-149-247 149Z"></svg>',
    !1,
    !0
  );
function Qf(e) {
  return l(
    ee,
    F({ viewBox: "0 0 24 24" }, e, {
      get children() {
        return Qb();
      },
    })
  );
}
function Sw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return Jb();
      },
    })
  );
}
function Ew(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), e2()];
      },
    })
  );
}
function Cw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), t2()];
      },
    })
  );
}
const au = Ff ? Ew : Cw;
function su(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), n2()];
      },
    })
  );
}
function Jf(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), r2()];
      },
    })
  );
}
function Aw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), o2()];
      },
    })
  );
}
function eh(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), i2()];
      },
    })
  );
}
function Iw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), a2()];
      },
    })
  );
}
function Rs(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), s2()];
      },
    })
  );
}
function xw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), l2()];
      },
    })
  );
}
function kw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), c2()];
      },
    })
  );
}
function lu(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return u2();
      },
    })
  );
}
function Tw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), d2()];
      },
    })
  );
}
function cu(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), g2()];
      },
    })
  );
}
function Ec(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), f2()];
      },
    })
  );
}
function Lw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), h2()];
      },
    })
  );
}
function ns(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), m2()];
      },
    })
  );
}
function Md(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), y2()];
      },
    })
  );
}
function Pw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), p2()];
      },
    })
  );
}
function Mw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), v2()];
      },
    })
  );
}
function rs(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return b2();
      },
    })
  );
}
function $w(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), w2()];
      },
    })
  );
}
function so(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), S2()];
      },
    })
  );
}
function Rw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), E2()];
      },
    })
  );
}
function Dw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Xf(), C2()];
      },
    })
  );
}
function _w(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [A2(), I2()];
      },
    })
  );
}
function Ds(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), x2()];
      },
    })
  );
}
function uu(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), k2()];
      },
    })
  );
}
function Ow(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), T2()];
      },
    })
  );
}
function du(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), L2()];
      },
    })
  );
}
function Nw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [ea(), P2()];
      },
    })
  );
}
function Fw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), M2()];
      },
    })
  );
}
function os(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), $2()];
      },
    })
  );
}
function Bw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), R2()];
      },
    })
  );
}
function th(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), D2()];
      },
    })
  );
}
function nh(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), _2()];
      },
    })
  );
}
function Yi(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), Kf()];
      },
    })
  );
}
function qi(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), Kf(), O2()];
      },
    })
  );
}
function Uw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Xf(), N2()];
      },
    })
  );
}
function zw(e) {
  return l(
    ee,
    F({ viewBox: "0 0 24 24" }, e, {
      get children() {
        return F2();
      },
    })
  );
}
function $l(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), B2()];
      },
    })
  );
}
function Hw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), U2()];
      },
    })
  );
}
function Vw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), z2()];
      },
    })
  );
}
function Ww(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), H2()];
      },
    })
  );
}
function Gw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [ea(), V2()];
      },
    })
  );
}
function jw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [W2(), G2()];
      },
    })
  );
}
function rh(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [j2(), Y2()];
      },
    })
  );
}
function Yw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [ea(), q2()];
      },
    })
  );
}
function qw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Zf(), X2()];
      },
    })
  );
}
function Xw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [K2(), Z2()];
      },
    })
  );
}
const Kw = Xw;
function Zw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Zf(), Q2()];
      },
    })
  );
}
function Qw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [ea(), J2()];
      },
    })
  );
}
function Jw(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), ew()];
      },
    })
  );
}
function eS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), tw()];
      },
    })
  );
}
function oh(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), nw()];
      },
    })
  );
}
function tS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), Ae(), rw()];
      },
    })
  );
}
function nS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), ow()];
      },
    })
  );
}
function $d(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return iw();
      },
    })
  );
}
function rS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return aw();
      },
    })
  );
}
function oS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [ea(), sw()];
      },
    })
  );
}
function iS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [Ae(), lw()];
      },
    })
  );
}
const aS = Ja ? oS : iS;
function Rl(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return cw();
      },
    })
  );
}
function Rd(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return uw();
      },
    })
  );
}
function sS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), dw()];
      },
    })
  );
}
function lS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), gw()];
      },
    })
  );
}
function cS(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), fw()];
      },
    })
  );
}
function Ea(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [er(), hw()];
      },
    })
  );
}
function gu(e) {
  return l(
    ee,
    F(e, {
      get children() {
        return [mw(), yw(), pw(), vw()];
      },
    })
  );
}
function uS(e) {
  return l(
    ee,
    F({ viewBox: "0 -960 960 960" }, e, {
      get children() {
        return bw();
      },
    })
  );
}
function dS(e) {
  return l(
    ee,
    F({ viewBox: "0 -960 960 960" }, e, {
      get children() {
        return ww();
      },
    })
  );
}
function gS(e) {
  return l(
    Z,
    F(
      {
        variant: "text",
        color: "neutral",
        icon: os,
        onClick: () => {
          ih(), Cf();
        },
      },
      e
    )
  );
}
let Cc = !1;
function ih() {
  (Cc = !0),
    setTimeout(() => {
      Cc = !1;
    }, 150);
}
let is = !1;
const ah = Qi(() => {
  const [e, t] = N(!1),
    [n, r] = N(!1);
  function o(f) {
    const m = f != null ? f : !Cc && d();
    (is = m),
      t(m),
      setTimeout(() => {
        (is = !1), t(!1);
      }, 250);
  }
  function i(f) {
    const m = f != null ? f : g();
    r(m),
      setTimeout(() => {
        r(!1);
      }, 250);
  }
  Wr(window, "popstate", (f) => {
    const m =
      f.hasUAVisualTransition == null ? void 0 : f.hasUAVisualTransition;
    o(m);
  }),
    window.navigation &&
      Wr(window.navigation, "navigate", (f) => {
        const m =
          f.hasUAVisualTransition == null ? void 0 : f.hasUAVisualTransition;
        i(m);
      });
  let a = 0,
    s = 0;
  const c = -50;
  Wr(
    document.body,
    "touchmove",
    (f) => {
      f.touches[0] && ((a = f.touches[0].clientX), (s = Date.now()));
    },
    { passive: !0 }
  );
  const u = 500;
  function d() {
    return Date.now() - s < u && a < c;
  }
  function g() {
    return !1;
  }
  return {
    useHasNavBackUaVisualTransition: e,
    useHasNavForwardUaVisualTransition: n,
  };
});
function ve(e, t) {
  return { method: e, path: `/api${t}` };
}
const lo = "!",
  Ui = 402,
  fS = 30;
var nt = ((e) => (
    (e[(e.FREE = 0)] = "FREE"),
    (e[(e.PRO = 1)] = "PRO"),
    (e[(e.PRO_PLUS = 2)] = "PRO_PLUS"),
    e
  ))(nt || {}),
  fn = ((e) => (
    (e[(e.MANUAL = 1)] = "MANUAL"), (e[(e.PAYPAL = 2)] = "PAYPAL"), e
  ))(fn || {}),
  _t = ((e) => (
    (e[(e.MONTHLY = 1)] = "MONTHLY"),
    (e[(e.QUARTERLY = 3)] = "QUARTERLY"),
    (e[(e.ANNUAL = 12)] = "ANNUAL"),
    (e[(e.M12 = 12)] = "M12"),
    (e[(e.M24 = 24)] = "M24"),
    (e[(e.M60 = 60)] = "M60"),
    e
  ))(_t || {}),
  Ge = ((e) => ((e[(e.UNREAD = 0)] = "UNREAD"), (e[(e.READ = 1)] = "READ"), e))(
    Ge || {}
  ),
  Mi = ((e) => ((e.FEED = "feed"), (e.SAVED = "saved"), e))(Mi || {});
const hS = 64,
  _o = 8,
  Ac = 64,
  mS = 64,
  yS = "ebook";
var Cn = ((e) => ((e.ALL = "!all"), e))(Cn || {});
const pS = ["!all"];
function vS(e) {
  return e.startsWith(lo);
}
const sh = 64;
var co = ((e) => ((e.READ_LATER = "!readlater"), e))(co || {});
const bS = ["!readlater"];
function wS(e) {
  return e.startsWith(lo);
}
var K = ((e) => (
  (e.FEED = "FEED"),
  (e.SUBSCRIPTION = "SUBSCRIPTION"),
  (e.CATEGORY = "CATEGORY"),
  (e.TAG = "TAG"),
  e
))(K || {});
const SS = ["SUBSCRIPTION", "CATEGORY", "FEED", "TAG"];
function $n(e) {
  return `${e.type.toLowerCase()}-${e.id}`;
}
function zi(e) {
  const [t, n] = e.split("-");
  if (!t) throw new TypeError(e);
  const r = t.toUpperCase();
  if (!n || !SS.includes(r)) throw new TypeError(e);
  return { type: r, id: n };
}
function Ic(e, t) {
  return e.type === t.type && e.id === t.id;
}
var _e = ((e) => (
  (e[(e.AUTO = 0)] = "AUTO"),
  (e[(e.FEED_TEXT = 1)] = "FEED_TEXT"),
  (e[(e.WEBPAGE_TEXT = 2)] = "WEBPAGE_TEXT"),
  (e[(e.WEBPAGE = 3)] = "WEBPAGE"),
  (e[(e.NEW_TAB = 4)] = "NEW_TAB"),
  e
))(_e || {});
const lh = { unreadOnly: !0, autoLoadWebpageText: !0 },
  Dd = { articleViewType: 0, unreadOnly: void 0 },
  _d = { unreadOnly: void 0 },
  Od = { unreadOnly: void 0 },
  ES = {
    register: ve("POST", "/users"),
    createDemoAccount: ve("POST", "/demo"),
    login: ve("POST", "/session"),
    codeLogin: ve("POST", "/session/code"),
    logout: ve("DELETE", "/session"),
    getSessionUser: ve("GET", "/session/user"),
    resetPassword: ve("POST", "/session/user/reset-password"),
    updateUser: ve("POST", "/session/user"),
    deleteUser: ve("DELETE", "/session/user"),
    redeem: ve("POST", "/session/redeem"),
    getVersions: ve("GET", "/versions"),
    sendFeedback: ve("GET", "/feedback"),
    search: ve("GET", "/search"),
    getFeed: ve("GET", "/feeds/:id"),
    getFeedBasicStates: ve("GET", "/feed-basic-states"),
    getFeedState: ve("GET", "/feed-state"),
    parseOpml: ve("POST", "/opml"),
    getFeaturedFeeds: ve("GET", "/opml/featured/:feedSet"),
    getStream: ve("GET", "/streams/:id"),
    getEntry: ve("GET", "/entry/:entryId"),
    getEntryContents: ve("GET", "/entry-contents"),
    getSubscriptions: ve("GET", "/subscriptions"),
    addSubscription: ve("POST", "/subscriptions"),
    modifySubscription: ve("POST", "/subscriptions/:subscriptionId"),
    removeSubscription: ve("DELETE", "/subscriptions/:subscriptionId"),
    createCategory: ve("POST", "/categories"),
    modifyCategory: ve("PUT", "/categories/:categoryId"),
    deleteCategory: ve("DELETE", "/categories/:categoryId"),
    addSubscriptionToCategory: ve(
      "PUT",
      "/categories/:categoryId/subscriptions/:subscriptionId"
    ),
    removeSubscriptionFromCategory: ve(
      "DELETE",
      "/categories/:categoryId/subscriptions/:subscriptionId"
    ),
    getTags: ve("GET", "/tags"),
    createTag: ve("POST", "/tags"),
    deleteTag: ve("DELETE", "/tags/:tagId"),
    modifyTag: ve("PUT", "/tags/:tagId"),
    addTagToEntry: ve("PUT", "/entries/:entryId/tags/:tagId"),
    removeTagFromEntry: ve(
      "DELETE",
      "/entries/:entryType/:entryId/tags/:tagId"
    ),
    getUnreadCounts: ve("GET", "/markers/unread/counts"),
    markAsRead: ve("PUT", "/markers/reads"),
    markAsUnread: ve("PUT", "/markers/unread"),
    getPreferences: ve("GET", "/preferences"),
    modifyGlobalPreferences: ve("PUT", "/preferences/global"),
    modifySubscriptionPreferences: ve(
      "PUT",
      "/preferences/subscriptions/:subscriptionId"
    ),
    modifyCategoryPreferences: ve("PUT", "/preferences/categories/:categoryId"),
    modifyTagPreferences: ve("PUT", "/preferences/tags/:tagId"),
    sendEntryAsEbook: ve("POST", "/ebooks/send/entry"),
    sendStreamAsEbook: ve("POST", "/ebooks/send/stream"),
  };
class ch extends Error {
  constructor(n, r, o) {
    super(o);
    Te(this, "name", "ApiError");
    (this.httpStatus = n), (this.code = r);
  }
}
async function it(e, t, n) {
  var m;
  const r = ES[e];
  if (!r) throw new Error(`Endpoint not defined: ${e}`);
  const o = r.method === "GET" && t != null ? "?" + IS(t) : "",
    i = AS(r.path, t || {}) + o,
    a = ["put", "post", "delete", "patch"].includes(r.method.toLowerCase());
  a && Nd(!0);
  let s;
  try {
    s = await window.fetch(i, {
      method: r.method,
      credentials: "include",
      body: r.method === "GET" ? void 0 : JSON.stringify(t),
      headers: {
        "content-type": "application/json",
        accept: "application/json",
        ...n,
      },
    });
  } finally {
    a && Nd(!1);
  }
  const c = s.headers.get("X-App-Version");
  c && Ym(c);
  const u = await s.text(),
    g =
      (s.headers.get("Content-Type") || "").split(";")[0] ===
      "application/json";
  let f;
  return (
    g
      ? ((f = (m = JSON.parse(u)) != null ? m : {}),
        (f.httpStatus = s.status),
        (f.ok = s.ok))
      : (s.ok
          ? (f = { ok: !0, httpStatus: s.status, result: void 0 })
          : (f = { ok: !1, httpStatus: s.status, errorCode: -1, detail: u }),
        f.httpStatus === 401 && Yr(f)),
    f
  );
}
async function Le(e, t) {
  const n = await it(e, t);
  if (n.ok) return n.result;
  Yr(n);
}
function CS(e) {
  return W(!e.ok), new ch(e.httpStatus, e.errorCode, e.detail);
}
function Yr(e) {
  throw CS(e);
}
function Da(e) {
  return e instanceof ch && e.httpStatus === 401;
}
function AS(e, t) {
  return e.replace(/:(\w+)/g, (n, r) => {
    const o = t[r];
    if (o == null) throw new Error(`Invalid path arg: ${r}`);
    return String(o);
  });
}
function IS(e) {
  const t = (r) => (r == null ? "" : encodeURIComponent(String(r))),
    n = (r, o) => encodeURIComponent(r) + "=" + t(o);
  return e == null
    ? ""
    : Object.entries(e)
        .map(function ([r, o]) {
          return Array.isArray(o)
            ? o.length
              ? o.map((i) => n(r, i)).join("&")
              : encodeURIComponent(r) + "="
            : n(r, o);
        })
        .join("&");
}
let xc = 0;
function Nd(e) {
  (xc += e ? 1 : -1), xc < 0 && console.error("Unmatched setHasUnsaved error");
}
window.onbeforeunload = function () {
  if (xc > 0) return h("Changes you made may not be saved.");
};
function xS({
  refreshOnFocus: e = !0,
  refreshOnReconnect: t = !0,
  refreshInterval: n = 0,
  refreshInBackground: r = !1,
  refreshWhenOffline: o = !1,
  focusThrottleInterval: i = 12e4,
  onRefresh: a,
}) {
  let s = Date.now(),
    c = !1,
    u = !1;
  function d() {
    (s = Date.now()), a();
  }
  function g() {
    return (!r && u) || (!o && c);
  }
  function f() {
    !g() && Date.now() - s > i && d();
  }
  let m;
  function y() {
    !n || m || (m = window.setInterval(f, n));
  }
  function b() {
    m && (clearInterval(m), (m = void 0));
  }
  function v() {
    g() ? b() : y();
  }
  function S() {
    document.visibilityState === "visible" ? ((u = !1), e && f()) : (u = !0),
      v();
  }
  const A = !r || e;
  A && document.addEventListener("visibilitychange", S);
  function k() {
    A && document.removeEventListener("visibilitychange", S);
  }
  function T(x) {
    x.type === "online"
      ? ((c = !1), t && f())
      : x.type === "offline" && (c = !0),
      v();
  }
  const E = !o || t;
  E &&
    (document.addEventListener("online", T),
    document.addEventListener("offline", T));
  function P() {
    E &&
      (document.removeEventListener("online", T),
      document.removeEventListener("offline", T));
  }
  function M() {
    b(), k(), P();
  }
  return M;
}
function uh(e) {
  let t;
  Lt(() => {
    t = xS(e);
  }),
    De(() => {
      t || console.log("Error: destroy is null"), t == null || t();
    });
}
function Jo(e) {
  return new Promise((t, n) => {
    (e.onsuccess = () => t(e.result)), (e.onerror = () => n(e.error));
  });
}
function kS(e) {
  return new Promise((t, n) => {
    (e.oncomplete = () => t(void 0)),
      (e.onabort = e.onerror = () => n(e.error));
  });
}
const TS = "kvcache",
  kc = "kvstore",
  dh = "idxExpiresAt";
async function LS() {
  const e = indexedDB.open(TS);
  return (
    (e.onupgradeneeded = () => {
      e.result.createObjectStore(kc).createIndex(dh, "expiresAt");
    }),
    await Jo(e)
  );
}
let Dl;
async function xr(e, t) {
  Dl || (Dl = await LS());
  const n = Dl.transaction(kc, e),
    r = kS(n),
    o = n.objectStore(kc),
    i = await t(o);
  return await r, typeof i == "function" ? i() : i;
}
function ei(e, t) {
  return async (...n) => {
    try {
      return await e(...n);
    } catch (r) {
      return Promise.reject(r), t();
    }
  };
}
const PS = 72e5;
async function MS(e) {
  return xr("readonly", (t) => Jo(t.count(e)).then((n) => n > 0));
}
const $S = ei(MS, () => {});
async function RS(e) {
  return xr("readonly", (t) =>
    Jo(t.get(e)).then((n) => (n == null ? void 0 : n.value))
  );
}
const Hi = ei(RS, () => {});
function DS(e, t, n) {
  return hu([[e, t]], n);
}
const fu = ei(DS, () => {});
function _S(e, t) {
  return xr("readwrite", (n) => {
    e.forEach(([r, o]) =>
      n.put({ value: o, expiresAt: Date.now() + (t || PS) }, r)
    );
  });
}
const hu = ei(_S, () => {});
function OS(e) {
  return xr("readonly", (t) =>
    Promise.all(
      e.map((n) => Jo(t.get(n)).then((r) => (r == null ? void 0 : r.value)))
    )
  );
}
async function NS(e) {
  return await OS(e);
}
const FS = ei(NS, () => []);
function BS(e) {
  return xr("readwrite", (t) => {
    e.forEach((n) => t.delete(n));
  });
}
const US = ei(BS, () => {});
function zS() {
  return xr("readonly", (e) => Jo(e.count()));
}
function gh() {
  return xr("readwrite", (e) => Jo(e.clear()));
}
function fh() {
  return xr("readwrite", async (e) => {
    const n = e.index(dh).openCursor(IDBKeyRange.upperBound(Date.now()));
    let r = 0;
    return (
      (n.onsuccess = function () {
        const o = n.result;
        o && (e.delete(o.primaryKey), r++, o.continue());
      }),
      () => r
    );
  });
}
function hh() {
  fh().then((e) => {
    console.debug("[kvcache] %d expired records have been deleted.", e);
  });
}
setTimeout(hh, 15e3);
setInterval(hh, 36e5 * 4);
const _l = "lastFetchedAt";
function tr(e, t, n = {}) {
  const [r, o] = N(n.initialData),
    [i, a] = N(!1),
    [s, c] = N(),
    u = (T, E) => (
      W(n.key),
      `${T === !0 ? n.key : `${n.key}:${np(Array.isArray(T) ? T : [T])}`}${
        E || ""
      }`
    ),
    d = async (T) => (W(n.key), await Hi(u(T))),
    g = async (T, E) => {
      const P = await t(T, E);
      return (
        n.key &&
          P != null &&
          (W(T),
          await hu(
            [
              [u(T), P],
              [u(T, _l), Date.now()],
            ],
            n.cacheTime
          )),
        P
      );
    },
    f = async (T) => {
      W(n.key), await US([u(T), u(T, _l)]);
    },
    m = async (T) => (W(n.key), await Hi(u(T))),
    y = async (T, E) => (W(n.key), await fu(u(T), E)),
    b = async (T, E) => {
      if (E.refetching) return g(T, E);
      {
        const P = n.key ? await d(T) : void 0;
        return P != null ? (v(T), P) : g(T, E);
      }
    },
    v = async (T) => {
      const E = await Hi(u(T, _l));
      (n.staleTime && E ? Math.abs(Date.now() - E) > n.staleTime : !0) &&
        queueMicrotask(() => void A());
    },
    S = async (T) => {
      const E = e();
      if (E == null || E === !1) {
        o(void 0), a(!1), c(void 0);
        return;
      }
      const P = r();
      a(!0), c(void 0);
      try {
        const M = await b(E, { value: P, refetching: T });
        o(() => M);
      } catch (M) {
        c(M);
      } finally {
        a(!1);
      }
    };
  ie(
    pe(e, () => {
      S(!1);
    })
  );
  const A = () => {
    S(!0);
  };
  n.autoRefresh &&
    uh({
      ...(n.autoRefresh === !0 ? {} : n.autoRefresh),
      onRefresh: () => void A(),
    });
  const k = r;
  return (
    Object.defineProperties(k, {
      loading: {
        get() {
          return i();
        },
      },
      error: {
        get() {
          return s();
        },
      },
    }),
    [k, { refetch: A, getCached: m, mutateCache: y, removeCache: f }]
  );
}
const Fd = () => ({
  loaded: !1,
  preferences: {
    version: -1,
    globalPreferences: { ...lh },
    subscriptionPreferences: {},
    categoryPreferences: {},
    tagPreferences: {},
  },
});
function HS(e) {
  const [t, n] = Un(Fd()),
    [r, { removeCache: o, refetch: i }] = tr(
      () => e.data.currentUserId,
      () => Le("getPreferences", void 0),
      { key: "preferences", cacheTime: ks, staleTime: bf }
    );
  ie(
    pe(
      () => e.data.currentUserId,
      (s) => {
        s || a.resetPreferencesMutation();
      }
    )
  ),
    ie(
      pe(
        () => r(),
        (s) => {
          s && a.loadPreferencesMutation(s);
        }
      )
    ),
    ie(
      pe(
        () => r.error,
        (s) => {
          s && e.methods.reportErrorAction()(s);
        }
      )
    );
  const a = oo({
    loadPreferencesMutation(s) {
      Zn(() => {
        n("preferences", Xa(s)), n("loaded", !0);
      });
    },
    resetPreferencesMutation() {
      n(Fd());
    },
    updateGlobalPreferencesMutation(s) {
      n("preferences", "globalPreferences", s);
    },
    updateCategoryPreferencesMutation(s, c) {
      n("preferences", "categoryPreferences", s, c);
    },
    updateSubscriptionPreferencesMutation(s, c) {
      n("preferences", "subscriptionPreferences", s, c);
    },
    updateTagPreferencesMutation(s, c) {
      n("preferences", "tagPreferences", s, c);
    },
    fetchResourceErrored() {
      return r.error;
    },
    async clearPreferencesCache() {
      W(e.data.currentUserId), await o(e.data.currentUserId);
    },
    async refetchAction() {
      t.loaded && i();
    },
    async updateGlobalPreferencesAction(s, c = {}) {
      this.updateGlobalPreferencesMutation(s),
        await Le("modifyGlobalPreferences", { globalPreferences: s, reset: c }),
        await this.clearPreferencesCache();
    },
    async updateSubscriptionPreferencesAction(s, c) {
      this.updateSubscriptionPreferencesMutation(s, c),
        await Le("modifySubscriptionPreferences", {
          subscriptionId: s,
          subscriptionPreferences: c,
        }),
        await this.clearPreferencesCache();
    },
    async updateCategoryPreferencesAction(s, c) {
      this.updateCategoryPreferencesMutation(s, c),
        await Le("modifyCategoryPreferences", {
          categoryId: s,
          categoryPreferences: c,
        }),
        await this.clearPreferencesCache();
    },
    async updateTagPreferencesAction(s, c) {
      this.updateTagPreferencesMutation(s, c),
        await Le("modifyTagPreferences", { tagId: s, tagPreferences: c }),
        await this.clearPreferencesCache();
    },
    getGlobalPreference(s) {
      var c;
      return (c = t.preferences.globalPreferences[s]) != null ? c : lh[s];
    },
    getCategoryStreamPreferences(s, c) {
      var d;
      W(s.type === K.CATEGORY);
      const u = t.preferences.categoryPreferences[s.id];
      return (d = u == null ? void 0 : u[c]) != null ? d : _d[c];
    },
    getSubscriptionStreamPreferences(s, c) {
      var d;
      W(s.type === K.SUBSCRIPTION);
      const u = t.preferences.subscriptionPreferences[s.id];
      return (d = u == null ? void 0 : u[c]) != null ? d : Dd[c];
    },
    getTagStreamPreferences(s, c) {
      var d;
      W(s.type === K.TAG);
      const u = t.preferences.tagPreferences[s.id];
      return (d = u == null ? void 0 : u[c]) != null ? d : Od[c];
    },
    getStreamPreferences(s) {
      const c = t;
      switch (s.type) {
        case K.CATEGORY:
          return xl(_d, c.preferences.categoryPreferences[s.id]);
        case K.SUBSCRIPTION:
          return xl(Dd, c.preferences.subscriptionPreferences[s.id]);
        case K.TAG:
          return xl(Od, c.preferences.tagPreferences[s.id]);
        default:
          W(!1);
      }
    },
  });
  return { data: t, methods: a };
}
/*! js-cookie v3.0.5 | MIT */ function Ca(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t];
    for (var r in n) e[r] = n[r];
  }
  return e;
}
var VS = {
  read: function (e) {
    return (
      e[0] === '"' && (e = e.slice(1, -1)),
      e.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent)
    );
  },
  write: function (e) {
    return encodeURIComponent(e).replace(
      /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
      decodeURIComponent
    );
  },
};
function Tc(e, t) {
  function n(o, i, a) {
    if (typeof document != "undefined") {
      (a = Ca({}, t, a)),
        typeof a.expires == "number" &&
          (a.expires = new Date(Date.now() + a.expires * 864e5)),
        a.expires && (a.expires = a.expires.toUTCString()),
        (o = encodeURIComponent(o)
          .replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent)
          .replace(/[()]/g, escape));
      var s = "";
      for (var c in a)
        a[c] &&
          ((s += "; " + c), a[c] !== !0 && (s += "=" + a[c].split(";")[0]));
      return (document.cookie = o + "=" + e.write(i, o) + s);
    }
  }
  function r(o) {
    if (!(typeof document == "undefined" || (arguments.length && !o))) {
      for (
        var i = document.cookie ? document.cookie.split("; ") : [],
          a = {},
          s = 0;
        s < i.length;
        s++
      ) {
        var c = i[s].split("="),
          u = c.slice(1).join("=");
        try {
          var d = decodeURIComponent(c[0]);
          if (((a[d] = e.read(u, d)), o === d)) break;
        } catch (g) {}
      }
      return o ? a[o] : a;
    }
  }
  return Object.create(
    {
      set: n,
      get: r,
      remove: function (o, i) {
        n(o, "", Ca({}, i, { expires: -1 }));
      },
      withAttributes: function (o) {
        return Tc(this.converter, Ca({}, this.attributes, o));
      },
      withConverter: function (o) {
        return Tc(Ca({}, this.converter, o), this.attributes);
      },
    },
    {
      attributes: { value: Object.freeze(t) },
      converter: { value: Object.freeze(e) },
    }
  );
}
var Bd = Tc(VS, { path: "/" });
const Ud = "https://www.paypal.com",
  zd = "qireader_user_id",
  WS = {
    [nt.FREE]: {
      type: nt.FREE,
      priceBilledQuarterly: "0",
      priceBilledAnnual: "0",
      paypalButtonIdBilledQuarterly: "",
      paypalButtonIdBilledAnnual: "",
      paypalCancelIdBilledQuarterly: "",
      paypalCancelIdBilledAnnual: "",
      priceChina12Months: "0",
      priceChina24Months: "0",
      priceChina60Months: "0",
      feeds: 30,
      categories: 30,
      savedArticles: 500,
      imageProxy: !1,
      premiumFonts: !1,
    },
    [nt.PRO]: {
      type: nt.PRO,
      priceBilledQuarterly: "1.5",
      priceBilledAnnual: "1.25",
      paypalButtonIdBilledQuarterly: "PZ8KBXAHRLA5E",
      paypalButtonIdBilledAnnual: "HBWR297RC8VSE",
      paypalCancelIdBilledQuarterly: "2L3XTN7A9LQ5U",
      paypalCancelIdBilledAnnual: "2L3XTN7A9LQ5U",
      priceChina12Months: "38",
      priceChina24Months: "68",
      priceChina60Months: "128",
      feeds: 300,
      categories: 30,
      savedArticles: 5e3,
      imageProxy: !0,
      premiumFonts: !0,
    },
    [nt.PRO_PLUS]: {
      type: nt.PRO_PLUS,
      priceBilledQuarterly: "3",
      priceBilledAnnual: "2.5",
      paypalButtonIdBilledQuarterly: "JHSQ8GN9BBYD6",
      paypalButtonIdBilledAnnual: "HYK8476USZXYQ",
      paypalCancelIdBilledQuarterly: "2L3XTN7A9LQ5U",
      paypalCancelIdBilledAnnual: "2L3XTN7A9LQ5U",
      priceChina12Months: "56",
      priceChina24Months: "96",
      priceChina60Months: "196",
      feeds: 1e3,
      categories: 30,
      savedArticles: 5e4,
      imageProxy: !0,
      premiumFonts: !0,
    },
  };
async function GS(e) {
  switch (e.split(/\s+/)[0]) {
    case "reload":
      location.reload();
      break;
    case "debug":
      location.assign("/debug");
      break;
    case "kvclear":
      gh().finally(() => {
        window.location.assign("/");
      });
      break;
    case "kvstat":
      alert(`Count: ${await zS()}`);
      break;
    case "kvcleanup":
      fh().then((n) => {
        alert(`${n} items deleted`);
      });
      break;
    default:
      alert("error: unknown command");
  }
}
function _s(e) {
  return null;
}
window.$log = function () {};
var Ht = ((e) => (
  (e[(e.LOADING = 0)] = "LOADING"),
  (e[(e.LOGGED_OUT = 1)] = "LOGGED_OUT"),
  (e[(e.USER_LOADING = 2)] = "USER_LOADING"),
  (e[(e.USER_LOADED = 3)] = "USER_LOADED"),
  (e[(e.USER_LOAD_ERROR = 4)] = "USER_LOAD_ERROR"),
  e
))(Ht || {});
const jS = () => ({
  state: 0,
  fatalError: void 0,
  message: void 0,
  currentUserId: void 0,
  currentUser: void 0,
  showShortcutsDialog: !1,
});
function YS() {
  const [e, t] = Un(jS()),
    [n, { removeCache: r, refetch: o }] = tr(
      () => e.currentUserId,
      async () => {
        let a;
        try {
          a = await Le("getSessionUser", void 0);
        } catch (s) {
          throw (
            (Da(s) &&
              (console.log("fetchUser auth error!"),
              i.resetUserMutation(),
              i.setLoggedOutMutation()),
            s)
          );
        }
        return a;
      },
      { key: "currentUser", autoRefresh: { refreshInterval: 3e5 } }
    );
  ie(
    pe(n, (a) => {
      a && i.setCurrentUserMutation(a);
    })
  ),
    ie(
      pe(
        () => n.error,
        (a) => {
          a && i.reportErrorAction()(a);
        }
      )
    );
  const i = oo({
    resetUserMutation() {
      t({ currentUserId: void 0, currentUser: void 0, state: 2 });
    },
    setLoggedOutMutation() {
      t({ currentUserId: void 0, currentUser: void 0, state: 1 });
    },
    setAppStateMutation(a) {
      t("state", a);
    },
    setCurrentUserIdMutation(a) {
      t("currentUserId", a);
    },
    setCurrentUserMutation(a) {
      t({ currentUserId: a.id, currentUser: a });
    },
    setShowShortcutsDialogMutation(a) {
      t("showShortcutsDialog", a);
    },
    setFatalErrorMutation(a, s) {
      t("fatalError", { message: a, error: s });
    },
    notifyMutation(a, s) {
      t("message", { message: a, open: !0, duration: s });
    },
    clearNotificationMutation() {
      t("message", { open: !1 });
    },
    async initAppAction() {
      const a = await qS();
      a
        ? (console.debug("Current user id:", a), await this.initUserAction(a))
        : this.setAppStateMutation(1);
    },
    async initUserAction(a) {
      this.resetUserMutation(), this.setCurrentUserIdMutation(a);
    },
    async refetchCurrentUserAction() {
      o();
    },
    fetchCurrentUserResourceErrored() {
      return n.error;
    },
    async loginAction(a, s) {
      const c = await it("login", { email: a, password: s });
      return c.ok ? (await this.initUserAction(c.result.id), !0) : !1;
    },
    async logoutAction() {
      await Le("logout", void 0),
        this.setLoggedOutMutation(),
        this.setLoggedOutMutation(),
        Qn("/login");
    },
    async updateUserAction(a) {
      const s = await it("updateUser", a);
      return (
        s.ok &&
          (this.setCurrentUserMutation(s.result),
          e.currentUserId && (await r(e.currentUserId))),
        s
      );
    },
    async deleteUserAction() {
      const a = await it("deleteUser", void 0);
      return a.ok && (await this.logoutAction()), a;
    },
    async registerAction(a, s) {
      const c = new Date().getTimezoneOffset();
      return await it(
        "register",
        { email: a, password: s, timezoneOffset: c },
        { "x-qi-api-verify": Jy(`${a}:${s}`) }
      );
    },
    async createDemoAccountAction() {
      var g;
      const a = "demoClientId",
        s = (g = localStorage.getItem(a)) != null ? g : "";
      let c;
      /\d+/.test(s)
        ? (c = s)
        : ((c = String(Math.floor(Math.random() * 10 ** 8))),
          localStorage.setItem(a, c));
      const u = new Date().getTimezoneOffset(),
        d = await it("createDemoAccount", { clientId: c, timezoneOffset: u });
      if (!d.ok)
        return this.crashAction(`Create demo account failed: ${d.httpStatus}`);
      try {
        await this.initUserAction(d.result.id);
      } catch (f) {
        this.reportErrorAction(void 0, { fatal: !0 })(f);
        return;
      }
    },
    async redeemAction(a) {
      const s = await it("redeem", { code: a });
      if (!s.ok) return s.errorCode;
    },
    crashAction(a, s) {
      this.setFatalErrorMutation(a, s);
    },
    reportErrorAction(a, { fatal: s, ignoreNetworkError: c } = {}) {
      return (u) => {
        console.error("Report Error:", u),
          $log(u),
          !(!s && c && qc(u)) &&
            ((a = a == null ? ZS(u) : a),
            Da(u)
              ? this.handleAuthenticationErrorAction()
              : s
              ? this.crashAction(a, u)
              : this.notifyError(a));
      };
    },
    checkErrorAction(a) {
      if (Da(a)) this.handleAuthenticationErrorAction();
      else throw a;
    },
    handleAuthenticationErrorAction() {
      console.log("Authentication error"),
        this.setLoggedOutMutation(),
        Qn("/login");
    },
    notify(a, s) {
      this.notifyMutation(s, a);
    },
    notifyInfo(a) {
      this.notify("short", a);
    },
    notifySuccess(a) {
      this.notify("short", a);
    },
    notifyWarning(a) {
      this.notify("medium", a);
    },
    notifyError(a) {
      this.notify("long", a);
    },
  });
  return { data: e, methods: i };
}
async function qS() {
  const e = Bd.get(zd);
  if (e) return e;
  try {
    const t = await Le("getSessionUser", void 0);
    return Bd.set(zd, String(t.id), { expires: 180 }), t.id;
  } catch (t) {
    if (qc(t)) return;
    if (!Da(t)) throw t;
  }
}
const XS = h("An error occurred, please try again later"),
  KS = h("Network error");
function ZS(e) {
  return e && qc(e) ? KS : XS;
}
const Hd = () => ({ loaded: !1, feedStates: {} });
function QS(e) {
  const [t, n] = Un(Hd()),
    [r] = tr(
      () => e.data.currentUserId,
      () => Le("getFeedBasicStates", void 0),
      {
        key: "feedStates",
        cacheTime: ks,
        staleTime: xs,
        autoRefresh: {
          refreshInterval: vf * 2,
          refreshOnFocus: !1,
          refreshOnReconnect: !1,
        },
      }
    );
  ie(
    pe(r, (i) => {
      i && o.loadFeedStatesMutation(i);
    })
  ),
    ie(
      pe(
        () => e.data.currentUserId,
        (i) => {
          i || o.resetFeedStatesMutation();
        }
      )
    ),
    ie(
      pe(
        () => r.error,
        (i) => {
          i &&
            e.methods.reportErrorAction(void 0, { ignoreNetworkError: !0 })(i);
        }
      )
    );
  const o = oo({
    resetFeedStatesMutation() {
      n(Hd());
    },
    loadFeedStatesMutation(i) {
      n({
        loaded: !0,
        feedStates: i.feedStates.reduce((a, s) => ((a[s.id] = s), a), {}),
      });
    },
    modifyFeedStateMutation(i) {
      n("feedStates", i.id, i);
    },
    fetchResourceErrored() {
      return r.error;
    },
  });
  return { data: t, methods: o };
}
const Vd = () => ({ loaded: !1, unreadCounts: {} });
function JS(e, t) {
  const [n, r] = Un(Vd()),
    [o] = tr(
      () => e.data.currentUserId,
      () => Le("getUnreadCounts", {}),
      {
        key: "markers",
        autoRefresh: { refreshInterval: 9e5, focusThrottleInterval: 6e5 },
      }
    );
  ie(
    pe(o, (a) => {
      a && i.loadMarkersMutation(a);
    })
  ),
    ie(
      pe(
        () => e.data.currentUserId,
        (a) => {
          a || i.resetMarkersMutation();
        }
      )
    ),
    ie(
      pe(
        () => o.error,
        (a) => {
          a &&
            e.methods.reportErrorAction(void 0, { ignoreNetworkError: !0 })(a);
        }
      )
    );
  const i = oo({
    resetMarkersMutation() {
      r(Vd());
    },
    loadMarkersMutation(a) {
      r({
        loaded: !0,
        unreadCounts: a.unreadCounts.reduce(
          (s, c) => ((s[c.subscriptionId] = c.count), s),
          {}
        ),
      });
    },
    setUnreadCountMutation(a, s) {
      r("unreadCounts", a, s);
    },
    decUnreadCountMutation(a, s) {
      var c;
      r(
        "unreadCounts",
        a,
        Math.max(0, ((c = n.unreadCounts[a]) != null ? c : 0) - s)
      );
    },
    markStreamAsReadMutation(a) {
      a.type === K.SUBSCRIPTION
        ? this.setUnreadCountMutation(a.id, 0)
        : a.type === K.CATEGORY &&
          t.subscriptions.methods
            .getCategorySubscriptions(a.id)
            .forEach((s) => this.setUnreadCountMutation(s, 0));
    },
    getCategoryUnreadCounts: L(() => {
      if (!n.loaded) return {};
      const a = {};
      for (const [s, c] of Object.entries(
        t.subscriptions.data.subscriptionCategories
      ))
        for (const u of c) a[u] || (a[u] = 0), (a[u] += n.unreadCounts[s] || 0);
      return a;
    }),
    getStreamUnreadCount(a) {
      return a.type === K.CATEGORY
        ? this.getCategoryUnreadCounts()[a.id]
        : n.unreadCounts[a.id];
    },
    fetchResourceErrored() {
      return o.error;
    },
  });
  return { data: n, methods: i };
}
var An = ((e) => (
  (e[(e.FEED = 0)] = "FEED"), (e[(e.UNKNOWN = 1)] = "UNKNOWN"), e
))(An || {});
const [Wt, Ol] = Un({ type: 1 });
function ta(e) {
  ie(
    pe(e, (t) => {
      Ol(t || { type: 1 });
    })
  ),
    De(() => {
      Ol({ type: 1 });
    });
}
function eE(e) {
  const t = Object.fromEntries(
      Object.values(e.categories)
        .filter((o) => o.label !== Cn.ALL)
        .map((o) => [o.id, []])
    ),
    n = [];
  for (const [o, i] of Object.entries(e.subscriptionCategories)) {
    for (const a of i) {
      const s = t[a];
      s &&
        (e.subscriptions[o]
          ? s.push(o)
          : console.error("Invalid subscription id", o));
    }
    i.length === 1 &&
      (e.subscriptions[o]
        ? n.push(o)
        : console.error("Invalid subscription id", o));
  }
  const r = fd(Object.entries(t), (o) => {
    var i;
    return (i = e.categories[o[0]]) == null ? void 0 : i.label;
  });
  for (const o of r)
    o[1] = fd(o[1], (i) => {
      var a;
      return (a = e.subscriptions[i]) == null ? void 0 : a.title;
    });
  return { categorized: r, uncategorized: n };
}
function tE(e, t) {
  const n = [];
  for (const [r, o] of e.categorized)
    if ((n.push({ type: K.CATEGORY, id: r }), t.includes(r)))
      for (const i of o) n.push({ type: K.SUBSCRIPTION, id: i });
  for (const r of e.uncategorized) n.push({ type: K.SUBSCRIPTION, id: r });
  return n;
}
function nE(e, t) {
  const n = Wt.type === An.FEED ? Wt.streamId : void 0,
    r = tE(e.subscriptions.uiSubscriptions(), t);
  let o = n ? r.findIndex((a) => Ic(a, n)) : -1;
  o = o < 0 ? 0 : o + 1;
  const i = [...r, ...r];
  for (; o < i.length; o++) {
    const a = i[o],
      s = e.markers.methods.getStreamUnreadCount(a);
    if (s && s > 0) return n && Ic(n, a) ? void 0 : a;
  }
}
const Wd = () => ({
  loaded: !1,
  version: -1,
  subscriptions: {},
  categories: {},
  feedToSubscription: {},
  subscriptionCategories: {},
});
function rE(e, t) {
  const [n, r] = Un(Wd()),
    [o, { removeCache: i, refetch: a }] = tr(
      () => e.data.currentUserId,
      () => Le("getSubscriptions", void 0),
      { key: "subscriptions.v3", cacheTime: ks, staleTime: bf }
    );
  ie(
    pe(o, (u) => {
      u && s.loadSubscriptionsMutation(u);
    })
  ),
    ie(
      pe(
        () => e.data.currentUserId,
        (u) => {
          u || s.resetSubscriptionsMutation();
        }
      )
    ),
    ie(
      pe(
        () => o.error,
        (u) => {
          u && e.methods.reportErrorAction()(u);
        }
      )
    );
  const s = oo({
      resetSubscriptionsMutation() {
        r(Wd());
      },
      loadSubscriptionsMutation(u) {
        var g, f;
        const d = {
          loaded: !0,
          version: u.version,
          categories: {},
          subscriptions: {},
          feedToSubscription: {},
          subscriptionCategories: {},
        };
        for (const m of u.categories) d.categories[m.id] = m;
        for (const m of u.subscriptions)
          (d.subscriptions[m.id] = m), (d.feedToSubscription[m.feedId] = m.id);
        for (const m of u.subscriptionCategories) {
          const y = d.subscriptions[m.subscriptionId];
          W(y),
            ((g = d.subscriptionCategories)[(f = y.id)] || (g[f] = [])).push(
              m.categoryId
            );
        }
        r(Xa(d, { merge: !0, key: "id" }));
      },
      addSubscriptionMutation(u) {
        r(
          ut((d) => {
            (d.subscriptions[u.id] = u),
              (d.feedToSubscription[u.feedId] = u.id),
              (d.subscriptionCategories[u.id] = [
                this.getSystemCategory(Cn.ALL).id,
              ]);
          })
        );
      },
      modifySubscriptionMutation(u) {
        r(
          ut((d) => {
            const g = d.subscriptions[u.id];
            W(g), Object.assign(g, u);
          })
        );
      },
      removeSubscriptionMutation(u) {
        r(
          ut((d) => {
            delete d.subscriptions[u],
              delete d.feedToSubscription[u],
              delete d.subscriptionCategories[u];
          })
        );
      },
      addCategoryMutation(u) {
        r(
          ut((d) => {
            d.categories[u.id] = u;
          })
        );
      },
      modifyCategoryMutation(u) {
        r(
          ut((d) => {
            const g = d.categories[u.id];
            g && Object.assign(g, u);
          })
        );
      },
      removeCategoryMutation(u) {
        r(
          ut((d) => {
            delete d.categories[u];
            for (const g of Object.values(d.subscriptionCategories)) Wi(g, u);
          })
        );
      },
      addSubscriptionToCategoryMutation(u, d) {
        r(
          ut((g) => {
            var f;
            ((f = g.subscriptionCategories)[d] || (f[d] = [])).push(u);
          })
        );
      },
      removeSubscriptionFromCategoryMutation(u, d) {
        r(
          ut((g) => {
            var f;
            Wi((f = g.subscriptionCategories)[d] || (f[d] = []), u);
          })
        );
      },
      async refetchAction() {
        a();
      },
      async clearSubscriptionsCache() {
        const u = e.data.currentUserId;
        W(u), await i(u);
      },
      async addSubscriptionAction(u) {
        const d = await it("addSubscription", { feedId: u });
        d.ok
          ? d.httpStatus === 201 &&
            (this.addSubscriptionMutation(d.result.subscription),
            t.markers.methods.setUnreadCountMutation(
              d.result.subscription.id,
              d.result.unreadCount
            ),
            t.feedStates.methods.modifyFeedStateMutation(d.result.feedState),
            await this.clearSubscriptionsCache())
          : d.httpStatus === Ui
          ? e.methods.notifyError(
              h(
                "You have exceeded the number of subscriptions your plan allows"
              )
            )
          : Yr(d);
      },
      async importRssItemAction(u) {
        const d = await it("addSubscription", { feedUrl: u.url });
        if (!d.ok) {
          if (d.httpStatus === Ui)
            return (
              e.methods.notifyError(
                h(
                  "You have exceeded the number of subscriptions your plan allows"
                )
              ),
              { httpStatus: d.httpStatus }
            );
          if (d.httpStatus === 400) return { httpStatus: d.httpStatus };
          Yr(d);
        }
        const { subscription: g, unreadCount: f } = d.result;
        this.addSubscriptionMutation(g),
          t.markers.methods.setUnreadCountMutation(g.id, f),
          t.feedStates.methods.modifyFeedStateMutation(d.result.feedState),
          await this.clearSubscriptionsCache();
        for (const m of u.categories) {
          let y = this.getCategoryByLabel(m);
          y || (y = await this.createCategoryAction(m)),
            y && (await this.addSubscriptionToCategoryAction(y, g));
        }
        return { httpStatus: d.httpStatus, subscription: g };
      },
      async modifySubscriptionAction(u) {
        const d = await Le("modifySubscription", u);
        return (
          this.modifySubscriptionMutation(d),
          await this.clearSubscriptionsCache(),
          d
        );
      },
      async removeSubscriptionAction(u) {
        await Le("removeSubscription", { subscriptionId: u }),
          this.removeSubscriptionMutation(u),
          await this.clearSubscriptionsCache(),
          t.markers.methods.setUnreadCountMutation(u, 0);
      },
      async createCategoryAction(u) {
        const d = await it("createCategory", { label: u });
        if (d.ok)
          return (
            this.addCategoryMutation(d.result),
            await this.clearSubscriptionsCache(),
            d.result
          );
        if (d.httpStatus === Ui) {
          e.methods.notifyError(h("Max category count exceeded"));
          return;
        } else Yr(d);
      },
      async deleteCategoryAction(u, d) {
        if (d) {
          const g = Object.keys(n.subscriptions).filter((f) => {
            const m = n.subscriptionCategories[f];
            return m.includes(u) && m.length === 2;
          });
          for (const f of g) await this.removeSubscriptionAction(f);
        }
        await Le("deleteCategory", { categoryId: u }),
          this.removeCategoryMutation(u),
          await this.clearSubscriptionsCache();
      },
      async modifyCategoryAction(u) {
        const d = await Le("modifyCategory", u);
        return (
          this.modifyCategoryMutation(d),
          await this.clearSubscriptionsCache(),
          d
        );
      },
      async addSubscriptionToCategoryAction(u, d) {
        (n.subscriptionCategories[d.id] || []).includes(u.id) ||
          (await Le("addSubscriptionToCategory", {
            categoryId: u.id,
            subscriptionId: d.id,
          }),
          this.addSubscriptionToCategoryMutation(u.id, d.id),
          await this.clearSubscriptionsCache());
      },
      async removeSubscriptionFromCategoryAction(u, d) {
        (n.subscriptionCategories[d.id] || []).includes(u.id) &&
          (await Le("removeSubscriptionFromCategory", {
            categoryId: u.id,
            subscriptionId: d.id,
          }),
          this.removeSubscriptionFromCategoryMutation(u.id, d.id),
          await this.clearSubscriptionsCache());
      },
      getSubscriptionByFeedId(u) {
        for (const d of Object.values(n.subscriptions))
          if (d.feedId === u) return d;
      },
      getCategoryByLabel(u) {
        for (const d of Object.values(n.categories))
          if (mh(d.label, u)) return d;
      },
      getSystemCategory(u) {
        const d = this.getCategoryByLabel(u);
        return W(d), d;
      },
      getCategorySubscriptions(u) {
        const d = n.subscriptionCategories;
        return Object.entries(d)
          .filter(([, g]) => g.includes(u))
          .map(([g]) => g);
      },
      fetchResourceErrored() {
        return o.error;
      },
    }),
    c = L(() => eE(n));
  return { data: n, uiSubscriptions: c, methods: s };
}
function mh(e, t) {
  return e.trim().toLowerCase() === t.trim().toLowerCase();
}
const Gd = () => ({ loaded: !1, version: -1, tags: {} });
function oE(e) {
  const [t, n] = Un(Gd()),
    [r, { removeCache: o, refetch: i }] = tr(
      () => e.data.currentUserId,
      () => Le("getTags", void 0),
      { key: "tags", cacheTime: ks, staleTime: xs }
    );
  ie(
    pe(r, (s) => {
      s && a.loadTagsMutation(s);
    })
  ),
    ie(
      pe(
        () => e.data.currentUserId,
        (s) => {
          s || a.resetTagsMutation();
        }
      )
    ),
    ie(
      pe(
        () => r.error,
        (s) => {
          s && e.methods.reportErrorAction()(s);
        }
      )
    );
  const a = oo({
    getTagByLabel(s) {
      for (const c of Object.values(t.tags)) if (mh(c.label, s)) return c;
    },
    getSystemTag(s) {
      const c = this.getTagByLabel(s);
      return W(c, `No system tag: ${s}`), c;
    },
    getReadLaterTagId: L(() => {
      var s;
      return (s = Object.values(t.tags).find(
        (c) => c.label === co.READ_LATER
      )) == null
        ? void 0
        : s.id;
    }),
    resetTagsMutation() {
      n(Gd());
    },
    loadTagsMutation(s) {
      const c = {};
      for (const u of s.tags) c[u.id] = u;
      n({ loaded: !0, version: s.version, tags: c });
    },
    addTagMutation(s) {
      n("tags", s.id, s);
    },
    modifyTagMutation(s) {
      n("tags", s.id, s);
    },
    removeTagMutation(s) {
      n("tags", s, void 0);
    },
    async refetchAction() {
      t.loaded && i();
    },
    async clearTagsCacheAction() {
      W(e.data.currentUserId), await o(e.data.currentUserId);
    },
    async createTagAction(s) {
      const c = await it("createTag", { label: s });
      c.ok
        ? c.httpStatus === 201 &&
          (this.addTagMutation(c.result), await this.clearTagsCacheAction())
        : c.httpStatus === Ui
        ? e.methods.notifyError(h("Max tag count exceeded"))
        : Yr(c);
    },
    async modifyTagAction(s) {
      const c = await Le("modifyTag", s);
      return this.modifyTagMutation(c), await this.clearTagsCacheAction(), c;
    },
    async deleteTagAction(s) {
      W(t.tags[s]),
        await Le("deleteTag", { tagId: s }),
        this.removeTagMutation(s),
        await this.clearTagsCacheAction();
    },
    fetchResourceErrored() {
      return r.error;
    },
  });
  return { data: t, methods: a };
}
const jd = () => ({ versions: void 0 });
function iE(e, t) {
  const [n, r] = Un(jd()),
    [o] = tr(
      () => e.data.currentUserId,
      () => Le("getVersions", void 0),
      {
        key: "versions",
        autoRefresh: { refreshInterval: 18e4, focusThrottleInterval: 15e3 },
      }
    );
  ie(
    pe(o, (a) => {
      a &&
        (i.loadVersionsMutation(a),
        i
          .refetchVersionMismatchedResourcesAction()
          .catch(e.methods.reportErrorAction()));
    })
  ),
    ie(
      pe(
        () => e.data.currentUserId,
        (a) => {
          a || i.resetVersionsMutation();
        }
      )
    ),
    ie(
      pe(
        () => o.error,
        (a) => {
          a && e.methods.reportErrorAction()(a);
        }
      )
    );
  const i = oo({
    resetVersionsMutation() {
      r(jd());
    },
    loadVersionsMutation(a) {
      r({ versions: a });
    },
    fetchResourceErrored() {
      return o.error;
    },
    async refetchVersionMismatchedResourcesAction() {
      if (!n.versions) return;
      const a = [];
      t.subscriptions.data.loaded &&
        t.subscriptions.data.version < n.versions.subscriptions &&
        a.push(t.subscriptions.methods.refetchAction()),
        t.tags.data.loaded &&
          t.tags.data.version < n.versions.tags &&
          a.push(t.tags.methods.refetchAction()),
        t.preferences.data.loaded &&
          t.preferences.data.preferences.version < n.versions.preferences &&
          a.push(t.preferences.methods.refetchAction()),
        await Promise.all(a);
    },
  });
  return { data: n, methods: i };
}
function aE() {
  const e = YS(),
    t = {};
  return (
    Object.assign(t, {
      core: e,
      versions: iE(e, t),
      subscriptions: rE(e, t),
      tags: oE(e),
      preferences: HS(e),
      markers: JS(e, t),
      feedStates: QS(e),
    }),
    t
  );
}
const se = on();
function sE(e) {
  const t = aE();
  return (
    ie(() => {
      t.core.data.currentUserId &&
        (t.core.data.state !== Ht.USER_LOADED &&
        t.versions.data.versions &&
        t.core.data.currentUser &&
        t.subscriptions.data.loaded &&
        t.tags.data.loaded &&
        t.preferences.data.loaded &&
        t.markers.data.loaded &&
        t.feedStates.data.loaded
          ? t.core.methods.setAppStateMutation(Ht.USER_LOADED)
          : t.core.data.state === Ht.USER_LOADING &&
            ((!t.core.data.currentUser &&
              t.core.methods.fetchCurrentUserResourceErrored()) ||
              (!t.versions.data.versions &&
                t.versions.methods.fetchResourceErrored()) ||
              (!t.subscriptions.data.loaded &&
                t.subscriptions.methods.fetchResourceErrored()) ||
              (!t.tags.data.loaded && t.tags.methods.fetchResourceErrored()) ||
              (!t.preferences.data.loaded &&
                t.preferences.methods.fetchResourceErrored()) ||
              (!t.markers.data.loaded &&
                t.markers.methods.fetchResourceErrored()) ||
              (!t.feedStates.data.loaded &&
                t.feedStates.methods.fetchResourceErrored())) &&
            t.core.methods.setAppStateMutation(Ht.USER_LOAD_ERROR));
    }),
    l(se.Provider, {
      value: t,
      get children() {
        return e.children;
      },
    })
  );
}
function Xt(e, t) {
  return Qi(() => {
    const n = () => {
        const s = localStorage.getItem(e);
        return s != null ? JSON.parse(s) : s != null ? s : void 0;
      },
      [r, o] = N(n());
    return [
      () => {
        var s;
        return (s = r()) != null ? s : t;
      },
      (s) => {
        const c = o(s);
        return (
          c == null
            ? localStorage.removeItem(e)
            : localStorage.setItem(e, JSON.stringify(s)),
          c
        );
      },
    ];
  });
}
const uo = /^www2\./.test(location.hostname)
    ? "//nettools2.oxyry.com"
    : /\.cn$/.test(location.hostname)
    ? "//nettools1.oxyry.com"
    : "//nettools3.oxyry.com",
  ot =
    '"PingFang SC", "HarmonyOS Sans SC", MiSans, "Noto Sans CJK SC", "Noto Sans SC", "Hiragino Sans GB", "Microsoft YaHei"',
  yh = { label: "Default", type: "default" },
  Lc = [
    yh,
    { label: "serif", type: "system", cssFontFamily: "serif" },
    {
      label: "Georgia",
      type: "system",
      cssFontFamily: `Georgia, ${ot}, serif`,
    },
    {
      label: "Spectral",
      type: "google",
      args: "family=Spectral:wght@400;500;700&display=swap",
      cssFontFamily: `Spectral, ${ot}, serif`,
      letterSpacing: "-0.0117em",
    },
    {
      label: "Literata",
      type: "google",
      args: "family=Literata:wght@400;500;700&display=swap",
      cssFontFamily: `Literata, ${ot}, serif`,
    },
    {
      label: "Merriweather",
      type: "google",
      args: "family=Merriweather:wght@400;500;700&display=swap",
      cssFontFamily: `"Merriweather", ${ot}, serif`,
    },
    {
      label: "Lora",
      type: "google",
      args: "family=Lora:wght@400;500;700&display=swap",
      cssFontFamily: `"Lora", ${ot}, serif`,
    },
    {
      label: "Bitter",
      type: "google",
      args: "family=Bitter:wght@400;500;700&display=swap",
      cssFontFamily: `Bitter, ${ot}, serif`,
    },
    {
      label: "Arvo",
      type: "google",
      args: "family=Arvo:wght@400;500;700&display=swap",
      cssFontFamily: `"Arvo", ${ot}, serif`,
    },
    {
      label: "EB Garamond",
      type: "google",
      args: "family=EB+Garamond:wght@400;500;700&display=swap",
      cssFontFamily: `"EB Garamond", ${ot}, serif`,
    },
    {
      label: "Source Serif Pro",
      type: "google",
      args: "family=Source+Serif+Pro:wght@400;500;700&display=swap",
      cssFontFamily: `"Source Serif Pro", ${ot}, serif`,
    },
    {
      label: "IBM Plex Serif",
      type: "google",
      args: "family=IBM+Plex+Serif:wght@400;500;700&display=swap",
      cssFontFamily: `"IBM Plex Serif", ${ot}, serif`,
    },
    {
      label: "Bookerly",
      type: "parsed",
      cssFontFamily: `Bookerly, ${ot}, serif`,
      cssText: `
    @font-face {
      font-family: 'Bookerly';
      font-weight: normal;
      font-style: normal;
      font-display: swap;
      src: url('/fonts/bookerly/BookerlyLCD_W_Rg.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Bookerly';
      font-weight: normal;
      font-style: italic;
      font-display: swap;
      src: url('/fonts/bookerly/BookerlyLCD_W_RgIt.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Bookerly';
      font-weight: bold;
      font-style: normal;
      font-display: swap;
      src: url('/fonts/bookerly/BookerlyLCD_W_Bd.woff2') format('woff2');
    }

    @font-face {
      font-family: 'Bookerly';
      font-weight: bold;
      font-style: italic;
      font-display: swap;
      src: url('/fonts/bookerly/BookerlyLCD_W_BdIt.woff2') format('woff2');
    }
    `,
    },
    {
      label: "Fira Sans",
      type: "google",
      args: "family=Fira+Sans:wght@400;500;700&display=swap",
      cssFontFamily: `"Fira Sans", ${ot}, sans-serif`,
    },
    {
      label: "Source Sans Pro",
      type: "google",
      args: "family=Source+Sans+Pro:wght@400;500;700&display=swap",
      cssFontFamily: `"Source Sans Pro", ${ot}, sans-serif`,
    },
    {
      label: "Lato",
      type: "google",
      args: "family=Lato:wght@400;500;700&display=swap",
      cssFontFamily: `Lato, ${ot}, sans-serif`,
    },
    {
      label: "Montserrat",
      type: "google",
      args: "family=Montserrat:wght@400;500;700&display=swap",
      cssFontFamily: `Montserrat, ${ot}, sans-serif`,
    },
    {
      label: "Raleway",
      type: "google",
      args: "family=Raleway:wght@400;500;700&display=swap",
      cssFontFamily: `Raleway, ${ot}, sans-serif`,
    },
    {
      label: "Ubuntu",
      type: "google",
      args: "family=Ubuntu:wght@400;500;700&display=swap",
      cssFontFamily: `Ubuntu, ${ot}, sans-serif`,
    },
    {
      label: "Open Sans",
      type: "google",
      args: "family=Open+Sans:wght@400;500;700&display=swap",
      cssFontFamily: `Open Sans, ${ot}, sans-serif`,
    },
    {
      label: "Jost",
      type: "google",
      args: "family=Jost:wght@400;500;700&display=swap",
      cssFontFamily: `Jost, ${ot}, sans-serif`,
    },
    {
      label: "IBM Plex Sans",
      type: "google",
      args: "family=IBM+Plex+Sans:wght@400;500;700&display=swap",
      cssFontFamily: `"IBM Plex Sans", ${ot}, sans-serif`,
    },
    {
      label: "思源宋体",
      type: "google",
      args: "family=Noto+Serif+SC:wght@400;700&display=swap",
      cssFontFamily: '"Noto Serif SC", sans-serif',
    },
    {
      label: "思源黑体",
      type: "google",
      args: "family=Noto+Sans+SC:wght@400;700&display=swap",
      cssFontFamily: '"Noto Sans SC", sans-serif',
    },
    {
      label: "霞鹜文楷",
      type: "parsed",
      cssFontFamily: '"LXGW WenKai Screen", sans-serif',
      cssLink: `${uo}/jsdelivr/npm/lxgw-wenkai-screen-webfont@1.6.0/style.css`,
    },
  ],
  lE = gE(),
  cE = fE();
function uE(e) {
  lE(e.cssText), cE(e.cssLink);
}
function ph(e) {
  if (e.type === "default") return { cssFontFamily: "inherit" };
  if (e.type === "system") return { cssFontFamily: e.cssFontFamily };
  if (e.type === "google")
    return {
      cssLink: hE(e.args),
      cssFontFamily: e.cssFontFamily,
      letterSpacing: e.letterSpacing,
    };
  if (e.type === "custom") return dE(e.value);
  if (e.type === "parsed") return e;
  W(!1);
}
function dE(e) {
  if (/@font-face/.test(e)) {
    const t = /font-family\s*:\s*(.+?)\s*;/.exec(e);
    if (t) {
      const n = `${t[1]}, sans-serif`;
      return { cssText: e, cssFontFamily: n };
    }
  } else if (/^[\w\s'",]+$/.test(e)) return { cssFontFamily: e };
  return {};
}
function gE() {
  let e;
  return (t) => {
    e ||
      ((e = document.createElement("style")),
      e.setAttribute("type", "text/css"),
      document.head.appendChild(e)),
      (e.textContent = t != null ? t : "");
  };
}
function fE() {
  let e;
  return (t) => {
    t
      ? e
        ? (e.href = t)
        : ((e = document.createElement("link")),
          e.setAttribute("type", "text/css"),
          e.setAttribute("rel", "stylesheet"),
          (e.href = t),
          document.head.appendChild(e))
      : (e == null || e.remove(), (e = void 0));
  };
}
function hE(e) {
  return `${
    cc() || wf() || Sf()
      ? `${uo}/google-fonts-css2`
      : "https://fonts.googleapis.com/css2"
  }?${e}`;
}
const _a = [10, 11, 12, 13, 14, 15, 16, 17, 18, 20, 22, 24, 26, 28, 30],
  vh = 16,
  Oa = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2],
  bh = 1.8,
  Na = [1, 2, 3, 4, 5, 6, 7, 8, 9],
  wh = 6,
  mE = 3,
  yE = 0,
  pE = 6;
var hn = ((e) => (
  (e[(e.SYSTEM = 0)] = "SYSTEM"),
  (e[(e.LIGHT = 1)] = "LIGHT"),
  (e[(e.DARK = 2)] = "DARK"),
  e
))(hn || {});
const mu = Xt("localPreferenceCurrentThemeType", 0),
  Sh = Xt("localPreferenceImageLazyLoading", !1),
  yu = Xt("localPreferenceFontFamily.v2", yh);
function Eh() {
  const [e] = yu();
  return L(() => {
    var t;
    return (t = Lc.find((n) => n.label === e().label)) != null ? t : e();
  });
}
function vE() {
  return L(() => {
    var n;
    const e = Eh(),
      t = ph(e());
    return {
      fontFamily: t.cssFontFamily,
      letterSpacing: (n = t.letterSpacing) != null ? n : "0.015em",
    };
  });
}
const pu = Xt("localPreferenceFontSize", vh),
  Ch = Xt("localPreferenceLineHeight", bh),
  Ah = Xt("localPreferenceContentWidth", wh);
function bE() {
  const { getViewportSize: e } = Uo(),
    [t] = Ah();
  return L(() => (e() === iu.MOBILE ? "750px" : `${20 + t() * 5}rem`));
}
const vu = Xt("localPreferenceSummaryLines", mE);
var ze = ((e) => (
  (e[(e.LIST = 0)] = "LIST"),
  (e[(e.MAGAZINE = 1)] = "MAGAZINE"),
  (e[(e.COLUMN = 2)] = "COLUMN"),
  e
))(ze || {});
const Ih = Xt("localPreferenceEntryListLayout", screen.width >= ou ? 2 : 1),
  xh = Xt("localPreferenceEntryListShowThumbnail", !0),
  kh = Xt("localPreferenceOneTapPageDown", !1),
  Th = Xt("localPreferenceExpandedCategories", []);
async function wE(e, t, n) {
  const [r, o] = e;
  let i = [...r()];
  i.includes(t) ? Wi(i, t) : i.push(t), (i = i.filter((a) => a in n)), o(i);
}
function as(e, t) {
  const [n, r] = e,
    o = bu(_a, n(), vh, t);
  o && r(o);
}
function Yd(e, t) {
  const [n, r] = e,
    o = bu(Oa, n(), bh, t);
  o && r(o);
}
function qd(e, t) {
  const [n, r] = e,
    o = bu(Na, n(), wh, t);
  o && r(o);
}
function SE() {
  const [e] = pu();
  $(() => {
    let t = Math.max(e(), 12);
    (t = t >= 24 ? 18 : t >= 14 ? 16 : 14),
      (document.documentElement.style.fontSize = `${t}px`);
  });
}
function EE() {
  ie(() => {
    const e = Eh(),
      t = ph(e());
    uE(t);
  });
}
function CE() {
  SE(), EE();
}
function bu(e, t, n, r) {
  let o = e.indexOf(t);
  return o === -1 && (o = e.indexOf(n)), W(o !== -1), e[o + r];
}
function AE() {
  throw new TypeError("Test View Error :)");
}
var IE = w(
  "<div><div><div>Primary</div><div>Primary Container</div><div>Secondary</div><div>Secondary Container</div><div>Tertiary</div><div>Tertiary Container</div><div>Error</div><div>Error Container</div></div><div><div>Red</div><div>Red Container</div><div>Pink</div><div>Pink Container</div><div>Purple</div><div>Purple Container</div><div>Blue</div><div>Blue Container</div><div>Cyan</div><div>Cyan Container</div><div>Teal</div><div>Teal Container</div><div>Green</div><div>Green Container</div><div>Yellow</div><div>Yellow Container</div><div>Orange</div><div>Orange Container</div><div>Brown</div><div>Brown Container</div></div><div><div>Background</div></div><div><div>Surface</div><div>Surface Variant</div><div>Surface 1</div><div>Surface 2</div><div>Surface 3</div><div>Surface 4</div><div>Surface 5</div></div><div><div>Outline</div><div>Outline Variant</div><div>On Surface Hint"
);
function xE() {
  const e = Pt(),
    t = kE();
  return (() => {
    var n = IE(),
      r = n.firstChild,
      o = r.firstChild,
      i = o.nextSibling,
      a = i.nextSibling,
      s = a.nextSibling,
      c = s.nextSibling,
      u = c.nextSibling,
      d = u.nextSibling,
      g = d.nextSibling,
      f = r.nextSibling,
      m = f.firstChild,
      y = m.nextSibling,
      b = y.nextSibling,
      v = b.nextSibling,
      S = v.nextSibling,
      A = S.nextSibling,
      k = A.nextSibling,
      T = k.nextSibling,
      E = T.nextSibling,
      P = E.nextSibling,
      M = P.nextSibling,
      x = M.nextSibling,
      _ = x.nextSibling,
      R = _.nextSibling,
      z = R.nextSibling,
      J = z.nextSibling,
      ne = J.nextSibling,
      G = ne.nextSibling,
      Q = G.nextSibling,
      ye = Q.nextSibling,
      B = f.nextSibling,
      le = B.firstChild,
      Se = B.nextSibling,
      Ie = Se.firstChild,
      ae = Ie.nextSibling,
      Ce = ae.nextSibling,
      we = Ce.nextSibling,
      te = we.nextSibling,
      be = te.nextSibling,
      fe = be.nextSibling,
      re = Se.nextSibling,
      Be = re.firstChild,
      Ke = Be.nextSibling,
      Mt = Ke.nextSibling;
    return (
      $(
        (C) => {
          var Vn = t().colorBlockContainer,
            rr = t().block,
            ln = e().color.primary,
            In = e().color.onPrimary,
            or = t().block,
            xn = e().color.primaryContainer,
            kn = e().color.onPrimaryContainer,
            Pr = t().block,
            ir = e().color.secondary,
            Mr = e().color.onSecondary,
            $r = t().block,
            cn = e().color.secondaryContainer,
            ar = e().color.onSecondaryContainer,
            Tn = t().block,
            sr = e().color.tertiary,
            ht = e().color.onTertiary,
            go = t().block,
            lr = e().color.tertiaryContainer,
            Rr = e().color.onTertiaryContainer,
            fo = t().block,
            Wn = e().color.error,
            Dr = e().color.onError,
            V = t().block,
            de = e().color.errorContainer,
            $e = e().color.onErrorContainer,
            Ze = t().colorBlockContainer,
            mt = t().block,
            $t = e().color.red,
            _r = e().color.onRed,
            li = t().block,
            cr = e().color.redContainer,
            ur = e().color.onRedContainer,
            ci = t().block,
            ui = e().color.pink,
            ho = e().color.onPink,
            la = t().block,
            mo = e().color.pinkContainer,
            di = e().color.onPinkContainer,
            ca = t().block,
            gi = e().color.purple,
            fi = e().color.onPurple,
            ua = t().block,
            hi = e().color.purpleContainer,
            mi = e().color.onPurpleContainer,
            da = t().block,
            yi = e().color.blue,
            Or = e().color.onBlue,
            ga = t().block,
            pi = e().color.blueContainer,
            vi = e().color.onBlueContainer,
            fa = t().block,
            bi = e().color.cyan,
            wi = e().color.onCyan,
            U = t().block,
            ce = e().color.cyanContainer,
            Ne = e().color.onCyanContainer,
            Ye = t().block,
            yt = e().color.teal,
            pt = e().color.onTeal,
            un = t().block,
            yo = e().color.tealContainer,
            po = e().color.onTealContainer,
            me = t().block,
            et = e().color.green,
            Zt = e().color.onGreen,
            Gn = t().block,
            dn = e().color.greenContainer,
            Ln = e().color.onGreenContainer,
            Si = t().block,
            Nr = e().color.yellow,
            vo = e().color.onYellow,
            Ei = t().block,
            bo = e().color.yellowContainer,
            wo = e().color.onYellowContainer,
            So = t().block,
            Eo = e().color.orange,
            Co = e().color.onOrange,
            Fu = t().block,
            Ys = e().color.orangeContainer,
            qs = e().color.onOrangeContainer,
            Bu = t().block,
            Xs = e().color.brown,
            Ks = e().color.onBrown,
            Uu = t().block,
            Zs = e().color.brownContainer,
            Qs = e().color.onBrownContainer,
            zu = t().colorBlockContainer,
            Hu = t().block,
            Js = e().color.background,
            el = e().color.onBackground,
            Vu = t().colorBlockContainer,
            Wu = t().block,
            tl = e().color.surface,
            nl = e().color.onSurface,
            Gu = t().block,
            rl = e().color.surfaceVariant,
            ol = e().color.onSurfaceVariant,
            ju = t().block,
            il = e().surface(1),
            al = e().color.onSurface,
            Yu = t().block,
            sl = e().surface(2),
            ll = e().color.onSurface,
            qu = t().block,
            cl = e().surface(3),
            ul = e().color.onSurface,
            Xu = t().block,
            dl = e().surface(4),
            gl = e().color.onSurface,
            Ku = t().block,
            fl = e().surface(5),
            hl = e().color.onSurface,
            Zu = t().colorBlockContainer,
            Qu = t().block,
            ml = e().color.surface,
            yl = e().color.outline,
            Ju = t().block,
            pl = e().color.surface,
            vl = e().color.outlineVariant,
            ed = t().block,
            bl = e().color.surface,
            wl = e().color.onSurfaceHint;
          return (
            Vn !== C.e && I(r, (C.e = Vn)),
            rr !== C.t && I(o, (C.t = rr)),
            ln !== C.a &&
              ((C.a = ln) != null
                ? o.style.setProperty("background", ln)
                : o.style.removeProperty("background")),
            In !== C.o &&
              ((C.o = In) != null
                ? o.style.setProperty("color", In)
                : o.style.removeProperty("color")),
            or !== C.i && I(i, (C.i = or)),
            xn !== C.n &&
              ((C.n = xn) != null
                ? i.style.setProperty("background", xn)
                : i.style.removeProperty("background")),
            kn !== C.s &&
              ((C.s = kn) != null
                ? i.style.setProperty("color", kn)
                : i.style.removeProperty("color")),
            Pr !== C.h && I(a, (C.h = Pr)),
            ir !== C.r &&
              ((C.r = ir) != null
                ? a.style.setProperty("background", ir)
                : a.style.removeProperty("background")),
            Mr !== C.d &&
              ((C.d = Mr) != null
                ? a.style.setProperty("color", Mr)
                : a.style.removeProperty("color")),
            $r !== C.l && I(s, (C.l = $r)),
            cn !== C.u &&
              ((C.u = cn) != null
                ? s.style.setProperty("background", cn)
                : s.style.removeProperty("background")),
            ar !== C.c &&
              ((C.c = ar) != null
                ? s.style.setProperty("color", ar)
                : s.style.removeProperty("color")),
            Tn !== C.w && I(c, (C.w = Tn)),
            sr !== C.m &&
              ((C.m = sr) != null
                ? c.style.setProperty("background", sr)
                : c.style.removeProperty("background")),
            ht !== C.f &&
              ((C.f = ht) != null
                ? c.style.setProperty("color", ht)
                : c.style.removeProperty("color")),
            go !== C.y && I(u, (C.y = go)),
            lr !== C.g &&
              ((C.g = lr) != null
                ? u.style.setProperty("background", lr)
                : u.style.removeProperty("background")),
            Rr !== C.p &&
              ((C.p = Rr) != null
                ? u.style.setProperty("color", Rr)
                : u.style.removeProperty("color")),
            fo !== C.b && I(d, (C.b = fo)),
            Wn !== C.T &&
              ((C.T = Wn) != null
                ? d.style.setProperty("background", Wn)
                : d.style.removeProperty("background")),
            Dr !== C.A &&
              ((C.A = Dr) != null
                ? d.style.setProperty("color", Dr)
                : d.style.removeProperty("color")),
            V !== C.O && I(g, (C.O = V)),
            de !== C.I &&
              ((C.I = de) != null
                ? g.style.setProperty("background", de)
                : g.style.removeProperty("background")),
            $e !== C.S &&
              ((C.S = $e) != null
                ? g.style.setProperty("color", $e)
                : g.style.removeProperty("color")),
            Ze !== C.W && I(f, (C.W = Ze)),
            mt !== C.C && I(m, (C.C = mt)),
            $t !== C.B &&
              ((C.B = $t) != null
                ? m.style.setProperty("background", $t)
                : m.style.removeProperty("background")),
            _r !== C.v &&
              ((C.v = _r) != null
                ? m.style.setProperty("color", _r)
                : m.style.removeProperty("color")),
            li !== C.k && I(y, (C.k = li)),
            cr !== C.x &&
              ((C.x = cr) != null
                ? y.style.setProperty("background", cr)
                : y.style.removeProperty("background")),
            ur !== C.j &&
              ((C.j = ur) != null
                ? y.style.setProperty("color", ur)
                : y.style.removeProperty("color")),
            ci !== C.q && I(b, (C.q = ci)),
            ui !== C.z &&
              ((C.z = ui) != null
                ? b.style.setProperty("background", ui)
                : b.style.removeProperty("background")),
            ho !== C.P &&
              ((C.P = ho) != null
                ? b.style.setProperty("color", ho)
                : b.style.removeProperty("color")),
            la !== C.H && I(v, (C.H = la)),
            mo !== C.F &&
              ((C.F = mo) != null
                ? v.style.setProperty("background", mo)
                : v.style.removeProperty("background")),
            di !== C.M &&
              ((C.M = di) != null
                ? v.style.setProperty("color", di)
                : v.style.removeProperty("color")),
            ca !== C.D && I(S, (C.D = ca)),
            gi !== C.R &&
              ((C.R = gi) != null
                ? S.style.setProperty("background", gi)
                : S.style.removeProperty("background")),
            fi !== C.E &&
              ((C.E = fi) != null
                ? S.style.setProperty("color", fi)
                : S.style.removeProperty("color")),
            ua !== C.L && I(A, (C.L = ua)),
            hi !== C.N &&
              ((C.N = hi) != null
                ? A.style.setProperty("background", hi)
                : A.style.removeProperty("background")),
            mi !== C.G &&
              ((C.G = mi) != null
                ? A.style.setProperty("color", mi)
                : A.style.removeProperty("color")),
            da !== C.U && I(k, (C.U = da)),
            yi !== C.K &&
              ((C.K = yi) != null
                ? k.style.setProperty("background", yi)
                : k.style.removeProperty("background")),
            Or !== C.V &&
              ((C.V = Or) != null
                ? k.style.setProperty("color", Or)
                : k.style.removeProperty("color")),
            ga !== C.Y && I(T, (C.Y = ga)),
            pi !== C.J &&
              ((C.J = pi) != null
                ? T.style.setProperty("background", pi)
                : T.style.removeProperty("background")),
            vi !== C.Q &&
              ((C.Q = vi) != null
                ? T.style.setProperty("color", vi)
                : T.style.removeProperty("color")),
            fa !== C.Z && I(E, (C.Z = fa)),
            bi !== C.X &&
              ((C.X = bi) != null
                ? E.style.setProperty("background", bi)
                : E.style.removeProperty("background")),
            wi !== C._ &&
              ((C._ = wi) != null
                ? E.style.setProperty("color", wi)
                : E.style.removeProperty("color")),
            U !== C.$ && I(P, (C.$ = U)),
            ce !== C.te &&
              ((C.te = ce) != null
                ? P.style.setProperty("background", ce)
                : P.style.removeProperty("background")),
            Ne !== C.tt &&
              ((C.tt = Ne) != null
                ? P.style.setProperty("color", Ne)
                : P.style.removeProperty("color")),
            Ye !== C.ta && I(M, (C.ta = Ye)),
            yt !== C.to &&
              ((C.to = yt) != null
                ? M.style.setProperty("background", yt)
                : M.style.removeProperty("background")),
            pt !== C.ti &&
              ((C.ti = pt) != null
                ? M.style.setProperty("color", pt)
                : M.style.removeProperty("color")),
            un !== C.tn && I(x, (C.tn = un)),
            yo !== C.ts &&
              ((C.ts = yo) != null
                ? x.style.setProperty("background", yo)
                : x.style.removeProperty("background")),
            po !== C.th &&
              ((C.th = po) != null
                ? x.style.setProperty("color", po)
                : x.style.removeProperty("color")),
            me !== C.tr && I(_, (C.tr = me)),
            et !== C.td &&
              ((C.td = et) != null
                ? _.style.setProperty("background", et)
                : _.style.removeProperty("background")),
            Zt !== C.tl &&
              ((C.tl = Zt) != null
                ? _.style.setProperty("color", Zt)
                : _.style.removeProperty("color")),
            Gn !== C.tu && I(R, (C.tu = Gn)),
            dn !== C.tc &&
              ((C.tc = dn) != null
                ? R.style.setProperty("background", dn)
                : R.style.removeProperty("background")),
            Ln !== C.tw &&
              ((C.tw = Ln) != null
                ? R.style.setProperty("color", Ln)
                : R.style.removeProperty("color")),
            Si !== C.tm && I(z, (C.tm = Si)),
            Nr !== C.tf &&
              ((C.tf = Nr) != null
                ? z.style.setProperty("background", Nr)
                : z.style.removeProperty("background")),
            vo !== C.ty &&
              ((C.ty = vo) != null
                ? z.style.setProperty("color", vo)
                : z.style.removeProperty("color")),
            Ei !== C.tg && I(J, (C.tg = Ei)),
            bo !== C.tp &&
              ((C.tp = bo) != null
                ? J.style.setProperty("background", bo)
                : J.style.removeProperty("background")),
            wo !== C.tb &&
              ((C.tb = wo) != null
                ? J.style.setProperty("color", wo)
                : J.style.removeProperty("color")),
            So !== C.tT && I(ne, (C.tT = So)),
            Eo !== C.tA &&
              ((C.tA = Eo) != null
                ? ne.style.setProperty("background", Eo)
                : ne.style.removeProperty("background")),
            Co !== C.tO &&
              ((C.tO = Co) != null
                ? ne.style.setProperty("color", Co)
                : ne.style.removeProperty("color")),
            Fu !== C.tI && I(G, (C.tI = Fu)),
            Ys !== C.tS &&
              ((C.tS = Ys) != null
                ? G.style.setProperty("background", Ys)
                : G.style.removeProperty("background")),
            qs !== C.tW &&
              ((C.tW = qs) != null
                ? G.style.setProperty("color", qs)
                : G.style.removeProperty("color")),
            Bu !== C.tC && I(Q, (C.tC = Bu)),
            Xs !== C.tB &&
              ((C.tB = Xs) != null
                ? Q.style.setProperty("background", Xs)
                : Q.style.removeProperty("background")),
            Ks !== C.tv &&
              ((C.tv = Ks) != null
                ? Q.style.setProperty("color", Ks)
                : Q.style.removeProperty("color")),
            Uu !== C.tk && I(ye, (C.tk = Uu)),
            Zs !== C.tx &&
              ((C.tx = Zs) != null
                ? ye.style.setProperty("background", Zs)
                : ye.style.removeProperty("background")),
            Qs !== C.tj &&
              ((C.tj = Qs) != null
                ? ye.style.setProperty("color", Qs)
                : ye.style.removeProperty("color")),
            zu !== C.tq && I(B, (C.tq = zu)),
            Hu !== C.tz && I(le, (C.tz = Hu)),
            Js !== C.tP &&
              ((C.tP = Js) != null
                ? le.style.setProperty("background", Js)
                : le.style.removeProperty("background")),
            el !== C.tH &&
              ((C.tH = el) != null
                ? le.style.setProperty("color", el)
                : le.style.removeProperty("color")),
            Vu !== C.tF && I(Se, (C.tF = Vu)),
            Wu !== C.tM && I(Ie, (C.tM = Wu)),
            tl !== C.tD &&
              ((C.tD = tl) != null
                ? Ie.style.setProperty("background", tl)
                : Ie.style.removeProperty("background")),
            nl !== C.tR &&
              ((C.tR = nl) != null
                ? Ie.style.setProperty("color", nl)
                : Ie.style.removeProperty("color")),
            Gu !== C.tE && I(ae, (C.tE = Gu)),
            rl !== C.tL &&
              ((C.tL = rl) != null
                ? ae.style.setProperty("background", rl)
                : ae.style.removeProperty("background")),
            ol !== C.tN &&
              ((C.tN = ol) != null
                ? ae.style.setProperty("color", ol)
                : ae.style.removeProperty("color")),
            ju !== C.tG && I(Ce, (C.tG = ju)),
            il !== C.tU &&
              ((C.tU = il) != null
                ? Ce.style.setProperty("background", il)
                : Ce.style.removeProperty("background")),
            al !== C.tK &&
              ((C.tK = al) != null
                ? Ce.style.setProperty("color", al)
                : Ce.style.removeProperty("color")),
            Yu !== C.tV && I(we, (C.tV = Yu)),
            sl !== C.tY &&
              ((C.tY = sl) != null
                ? we.style.setProperty("background", sl)
                : we.style.removeProperty("background")),
            ll !== C.tJ &&
              ((C.tJ = ll) != null
                ? we.style.setProperty("color", ll)
                : we.style.removeProperty("color")),
            qu !== C.tQ && I(te, (C.tQ = qu)),
            cl !== C.tZ &&
              ((C.tZ = cl) != null
                ? te.style.setProperty("background", cl)
                : te.style.removeProperty("background")),
            ul !== C.tX &&
              ((C.tX = ul) != null
                ? te.style.setProperty("color", ul)
                : te.style.removeProperty("color")),
            Xu !== C.t_ && I(be, (C.t_ = Xu)),
            dl !== C.t$ &&
              ((C.t$ = dl) != null
                ? be.style.setProperty("background", dl)
                : be.style.removeProperty("background")),
            gl !== C.ae &&
              ((C.ae = gl) != null
                ? be.style.setProperty("color", gl)
                : be.style.removeProperty("color")),
            Ku !== C.at && I(fe, (C.at = Ku)),
            fl !== C.aa &&
              ((C.aa = fl) != null
                ? fe.style.setProperty("background", fl)
                : fe.style.removeProperty("background")),
            hl !== C.ao &&
              ((C.ao = hl) != null
                ? fe.style.setProperty("color", hl)
                : fe.style.removeProperty("color")),
            Zu !== C.ai && I(re, (C.ai = Zu)),
            Qu !== C.an && I(Be, (C.an = Qu)),
            ml !== C.as &&
              ((C.as = ml) != null
                ? Be.style.setProperty("background", ml)
                : Be.style.removeProperty("background")),
            yl !== C.ah &&
              ((C.ah = yl) != null
                ? Be.style.setProperty("color", yl)
                : Be.style.removeProperty("color")),
            Ju !== C.ar && I(Ke, (C.ar = Ju)),
            pl !== C.ad &&
              ((C.ad = pl) != null
                ? Ke.style.setProperty("background", pl)
                : Ke.style.removeProperty("background")),
            vl !== C.al &&
              ((C.al = vl) != null
                ? Ke.style.setProperty("color", vl)
                : Ke.style.removeProperty("color")),
            ed !== C.au && I(Mt, (C.au = ed)),
            bl !== C.ac &&
              ((C.ac = bl) != null
                ? Mt.style.setProperty("background", bl)
                : Mt.style.removeProperty("background")),
            wl !== C.aw &&
              ((C.aw = wl) != null
                ? Mt.style.setProperty("color", wl)
                : Mt.style.removeProperty("color")),
            C
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
          d: void 0,
          l: void 0,
          u: void 0,
          c: void 0,
          w: void 0,
          m: void 0,
          f: void 0,
          y: void 0,
          g: void 0,
          p: void 0,
          b: void 0,
          T: void 0,
          A: void 0,
          O: void 0,
          I: void 0,
          S: void 0,
          W: void 0,
          C: void 0,
          B: void 0,
          v: void 0,
          k: void 0,
          x: void 0,
          j: void 0,
          q: void 0,
          z: void 0,
          P: void 0,
          H: void 0,
          F: void 0,
          M: void 0,
          D: void 0,
          R: void 0,
          E: void 0,
          L: void 0,
          N: void 0,
          G: void 0,
          U: void 0,
          K: void 0,
          V: void 0,
          Y: void 0,
          J: void 0,
          Q: void 0,
          Z: void 0,
          X: void 0,
          _: void 0,
          $: void 0,
          te: void 0,
          tt: void 0,
          ta: void 0,
          to: void 0,
          ti: void 0,
          tn: void 0,
          ts: void 0,
          th: void 0,
          tr: void 0,
          td: void 0,
          tl: void 0,
          tu: void 0,
          tc: void 0,
          tw: void 0,
          tm: void 0,
          tf: void 0,
          ty: void 0,
          tg: void 0,
          tp: void 0,
          tb: void 0,
          tT: void 0,
          tA: void 0,
          tO: void 0,
          tI: void 0,
          tS: void 0,
          tW: void 0,
          tC: void 0,
          tB: void 0,
          tv: void 0,
          tk: void 0,
          tx: void 0,
          tj: void 0,
          tq: void 0,
          tz: void 0,
          tP: void 0,
          tH: void 0,
          tF: void 0,
          tM: void 0,
          tD: void 0,
          tR: void 0,
          tE: void 0,
          tL: void 0,
          tN: void 0,
          tG: void 0,
          tU: void 0,
          tK: void 0,
          tV: void 0,
          tY: void 0,
          tJ: void 0,
          tQ: void 0,
          tZ: void 0,
          tX: void 0,
          t_: void 0,
          t$: void 0,
          ae: void 0,
          at: void 0,
          aa: void 0,
          ao: void 0,
          ai: void 0,
          an: void 0,
          as: void 0,
          ah: void 0,
          ar: void 0,
          ad: void 0,
          al: void 0,
          au: void 0,
          ac: void 0,
          aw: void 0,
        }
      ),
      n
    );
  })();
}
const kE = q(() => ({
  colorBlockContainer: {
    marginBottom: "1rem",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  block: { padding: "0.5rem", minHeight: 50 },
}));
var Et = ((e) => (
  (e.ENTERING = "entering"),
  (e.ENTERED = "entered"),
  (e.EXITING = "exiting"),
  (e.EXITED = "exited"),
  e
))(Et || {});
function Os(e) {
  const t = F({}, e),
    [n, r] = N(t.in ? "entered" : "exited");
  function o(a) {
    a != null && (a === 0 ? requestAnimationFrame(i) : setTimeout(i, a));
  }
  function i() {
    var a, s;
    n() === "entering"
      ? (r("entered"), (a = t.onEntered) == null || a.call(t))
      : n() === "exiting" &&
        (r("exited"), (s = t.onExited) == null || s.call(t));
  }
  return (
    ie(
      pe(
        () => t.in,
        (a) => {
          var s, c, u;
          if (a) {
            if (!t.appare && n() === "entered") return;
            const d = (s = e.enterDuration) != null ? s : e.duration;
            r("entering"),
              o(d),
              requestAnimationFrame(() => {
                var g;
                (g = t.onEntering) == null || g.call(t, i);
              });
          } else if (n() === "entering" || n() === "entered") {
            const d = (c = e.exitDuration) != null ? c : e.duration;
            r("exiting"), o(d), (u = t.onExiting) == null || u.call(t, i);
          }
        }
      )
    ),
    L(() => e.children(n))
  );
}
let Io;
function TE() {
  return (
    Io ||
      ((Io = document.getElementById("portal")),
      W(Io),
      (Io.onclick = function () {}),
      document.body.appendChild(Io)),
    Io
  );
}
function na(e) {
  return l(U0, {
    get mount() {
      return TE();
    },
    get children() {
      return e.children;
    },
  });
}
const kr = {
    APP_BAR: 2,
    FOCUSED: 3,
    STACKING_CONTEXT: 5,
    POSITIONER: 10,
    OVERLAY: 20,
    TOASTER: 30,
  },
  Xd = on(kr.STACKING_CONTEXT);
function Zr(e) {
  const t = F({ value: kr.STACKING_CONTEXT }, e),
    n = Y(Xd),
    r = Math.max(t.value, n),
    o = r + 1;
  return l(Xd.Provider, {
    value: o,
    get children() {
      return e.children(r);
    },
  });
}
function LE(e = !1) {
  let t = "";
  const n = document.body.style.overflow,
    r = window.innerWidth - document.documentElement.clientWidth;
  if (e && r > 0) {
    const o = parseInt(
      getComputedStyle(document.body).getPropertyValue("padding-right"),
      10
    );
    (t = document.body.style.paddingRight),
      (document.body.style.paddingRight = `${o + r}px`);
  }
  (document.body.style.overflow = "hidden"),
    Ja &&
      ((document.body.style.touchAction = "none"),
      (document.body.style.webkitOverflowScrolling = "none")),
    De(() => {
      (document.body.style.overflow = n),
        (document.body.style.paddingRight = t),
        Ja &&
          ((document.body.style.touchAction = ""),
          (document.body.style.webkitOverflowScrolling = ""));
    });
}
function PE() {
  return LE(), null;
}
var ME = w("<div data-is-overlay>");
const yr = Li;
function Lh(e) {
  const t = F(
    { unmountOnExit: !0, shouldCloseOnClick: !0, shouldCloseOnEscapePress: !0 },
    e
  );
  let n, r;
  const o = $E(),
    i = () => {
      var y;
      (y = e.onClose) == null || y.call(e);
    },
    a = (y) => {
      y.key === "Escape" && t.shouldCloseOnEscapePress && i();
    },
    s = () =>
      requestAnimationFrame(() => {
        r && document.activeElement && t.isShown && nu(r);
      }),
    c = () =>
      requestAnimationFrame(() => {
        if (!n || !r || !document.activeElement || r.contains(n)) return;
        const y = r.contains(document.activeElement);
        (document.activeElement === document.body || y) && n.focus();
      }),
    u = (y) => {
      document.body.addEventListener("keydown", a, !1);
      const b = r.animate(
        [{ background: mn }, { background: "rgba(0, 0, 0, 0.3)" }],
        { duration: yr, easing: "ease", fill: "forwards" }
      );
      b.onfinish = y;
    },
    d = () => {
      var y;
      (n = document.activeElement), s(), (y = t.onEntered) == null || y.call(t);
    },
    g = (y) => {
      document.body.removeEventListener("keydown", a, !1);
      const b = r.animate(
        [{ background: "rgba(0, 0, 0, 0.3)" }, { background: mn }],
        { duration: yr, easing: "ease" }
      );
      b.onfinish = y;
    },
    f = () => {
      var y;
      c(), (y = t.onExited) == null || y.call(t);
    };
  De(() => {
    document.body.removeEventListener("keydown", a, !1);
  });
  const m = (y) => {
    y.target !== y.currentTarget || !t.shouldCloseOnClick || i();
  };
  return l(Os, {
    appare: !0,
    get in() {
      return t.isShown;
    },
    onEntering: u,
    onEntered: d,
    onExiting: g,
    onExited: f,
    children: (y) =>
      l(D, {
        get when() {
          return y() !== Et.EXITED || !t.unmountOnExit;
        },
        get children() {
          return l(na, {
            get children() {
              return l(Zr, {
                get value() {
                  return kr.OVERLAY;
                },
                children: (b) =>
                  (() => {
                    var v = ME();
                    v.$$click = m;
                    var S = r;
                    return (
                      typeof S == "function" ? tt(S, v) : (r = v),
                      b != null
                        ? v.style.setProperty("z-index", b)
                        : v.style.removeProperty("z-index"),
                      p(v, () => e.children({ getState: y, close: i }), null),
                      p(
                        v,
                        (() => {
                          var A = L(() => y() !== Et.EXITED);
                          return () => A() && l(PE, {});
                        })(),
                        null
                      ),
                      $(
                        (A) => {
                          var k = H(
                              o().container,
                              e.containerClassName,
                              y() === Et.EXITED && o().containerExited
                            ),
                            T = y() !== Et.EXITED;
                          return (
                            k !== A.e && I(v, (A.e = k)),
                            T !== A.t &&
                              Xe(v, "data-overlay-active", (A.t = T)),
                            A
                          );
                        },
                        { e: void 0, t: void 0 }
                      ),
                      v
                    );
                  })(),
              });
            },
          });
        },
      }),
  });
}
const $E = q(() => ({
  container: { ...$s, contain: "strict" },
  containerExited: { width: 0, height: 0, overflow: "hidden" },
}));
Bn(["click"]);
const Kd = on();
function zn(e) {
  const [t, n] = Ve(e, [
      "component",
      "class",
      "level",
      "levelUp",
      "transparent",
      "shadow",
    ]),
    r = Y(Kd),
    o = L(() => {
      var u, d, g;
      return Math.min(
        ov,
        (g = t.level) != null
          ? g
          : ((u = r == null ? void 0 : r.getCurrentLevel()) != null ? u : 0) +
              ((d = t.levelUp) != null ? d : 0)
      );
    }),
    i = Pt(),
    a = L(() => Ot(i().surface(o()), t.transparent ? 0.85 : 1)),
    s = L(() =>
      io({
        background: a(),
        color: i().color.onSurface,
        backdropFilter: t.transparent ? "blur(12px)" : void 0,
        webkitBackdropFilter: t.transparent ? "blur(12px)" : void 0,
        ...(t.shadow ? i().elevationShadowStyle(o()) : void 0),
      })
    ),
    c = { getCurrentLevel: o };
  return l(Kd.Provider, {
    value: c,
    get children() {
      return l(
        jt,
        F(
          {
            get component() {
              var u;
              return (u = t.component) != null ? u : "div";
            },
            get class() {
              return H("surface", s(), t.class);
            },
          },
          n
        )
      );
    },
  });
}
function j(e) {
  const t = F(
      { variant: "bodyMedium", gutterBottom: !1, noWrap: !1, paragraph: !1 },
      e
    ),
    [n, r] = Ve(t, [
      "class",
      "variant",
      "align",
      "color",
      "component",
      "display",
      "gutterBottom",
      "noWrap",
      "paragraph",
    ]),
    o = Pt(),
    i = n.component || (n.paragraph ? "p" : RE[n.variant]);
  W(i);
  const a = () =>
    io({
      marginTop: 0,
      marginBottom: 0,
      ...(n.variant ? o().typescale[`${n.variant}Style`] : void 0),
      color: n.color && o().color[n.color],
      ...(n.noWrap ? yn : void 0),
      ...(n.gutterBottom ? { marginBottom: "0.625rem" } : void 0),
      ...(n.paragraph ? { marginBottom: "1rem" } : void 0),
      ...(n.align ? { textAlign: n.align } : void 0),
      ...(n.display ? { display: n.display } : void 0),
    });
  return l(
    jt,
    F(
      {
        component: i,
        get class() {
          return H(a(), n.class);
        },
      },
      r
    )
  );
}
const RE = {
  displayLarge: "h1",
  displayMedium: "h2",
  displaySmall: "h3",
  headlineLarge: "h2",
  headlineMedium: "h3",
  headlineSmall: "h4",
  titleLarge: "h3",
  titleMedium: "h4",
  titleSmall: "h5",
  labelLarge: "div",
  labelMedium: "div",
  labelSmall: "div",
  bodyLarge: "p",
  bodyMedium: "p",
  bodySmall: "p",
};
var Nl = w("<div>"),
  DE = w("<div tabindex=-1 data-autofocus><div>");
function an(e) {
  const t = F(
      {
        cancelLabel: h("Cancel"),
        confirmLabel: h("Confirm"),
        hasCancel: !0,
        hasClose: !0,
        hasFooter: !0,
        hasHeader: !0,
        minHeightContent: 50,
        shouldCloseOnEscapePress: !0,
        shouldCloseOnOverlayClick: !0,
        sideOffset: "16px",
        topOffset: "12vmin",
        width: 560,
      },
      e
    ),
    n = `calc(100% - ${t.sideOffset} * 2)`,
    r = `calc(100% - ${t.topOffset} * 2)`,
    o = _E(),
    i = (c) => {
      var u;
      t.isConfirmDisabled || (u = t.onConfirm) == null || u.call(t),
        c.preventDefault();
    },
    a = (c) => {
      if (!(!t.header && !t.hasHeader))
        return (() => {
          var u = Nl();
          return (
            p(
              u,
              l(D, {
                get when() {
                  return !t.header;
                },
                get fallback() {
                  return t.header(c);
                },
                get children() {
                  return [
                    l(j, {
                      get class() {
                        return o().title;
                      },
                      variant: "titleMedium",
                      get children() {
                        return t.title;
                      },
                    }),
                    L(() => t.titleControls),
                    L(
                      () =>
                        L(() => !!t.hasClose)() &&
                        l(Z, {
                          variant: "tonal",
                          icon: so,
                          size: "small",
                          color: "neutralVariant",
                          onClick: () => {
                            var d;
                            (d = t.onCancel) == null || d.call(t);
                          },
                        })
                    ),
                  ];
                },
              })
            ),
            $(() => I(u, o().header)),
            u
          );
        })();
    },
    s = (c) => {
      if (!(!t.footer && !t.hasFooter))
        return (() => {
          var u = Nl();
          return (
            p(
              u,
              l(D, {
                get when() {
                  return !t.footer;
                },
                get fallback() {
                  return t.footer(c);
                },
                get children() {
                  var d = Nl();
                  return (
                    p(
                      d,
                      (() => {
                        var g = L(() => !!t.hasCancel);
                        return () =>
                          g() &&
                          l(Z, {
                            variant: "tonal",
                            color: "neutral",
                            tabIndex: 0,
                            onClick: () => {
                              var f;
                              (f = t.onCancel) == null || f.call(t);
                            },
                            get children() {
                              return t.cancelLabel;
                            },
                          });
                      })(),
                      null
                    ),
                    p(
                      d,
                      l(Z, {
                        type: "submit",
                        tabIndex: 0,
                        get class() {
                          return H({ marginLeft: "0.75rem" });
                        },
                        variant: "filled",
                        get color() {
                          return t.confirmButtonColor;
                        },
                        get isLoading() {
                          return t.isConfirmLoading;
                        },
                        get disabled() {
                          return t.isConfirmDisabled;
                        },
                        get children() {
                          return t.confirmLabel;
                        },
                      }),
                      null
                    ),
                    $(() => I(d, o().footer)),
                    d
                  );
                },
              })
            ),
            u
          );
        })();
    };
  return l(Lh, {
    get isShown() {
      return t.isShown;
    },
    get containerClassName() {
      return o().container;
    },
    get shouldCloseOnClick() {
      return t.shouldCloseOnOverlayClick;
    },
    get shouldCloseOnEscapePress() {
      return t.shouldCloseOnEscapePress;
    },
    get onExited() {
      return t.onCloseComplete;
    },
    get onEntered() {
      return t.onOpenComplete;
    },
    get onClose() {
      return t.onCancel;
    },
    children: (c) =>
      l(zn, {
        component: "form",
        get class() {
          return H(
            o().dialog,
            {
              width: t.width,
              maxWidth: n,
              maxHeight: r,
              margin: `${t.topOffset} ${t.sideOffset}`,
            },
            c.getState() === Et.ENTERING && o().dialogEntering,
            c.getState() === Et.EXITING && o().dialogExiting
          );
        },
        level: 2,
        "data-is-dialog": !0,
        onSubmit: i,
        get children() {
          return [
            L(() => a(c)),
            (() => {
              var u = DE(),
                d = u.firstChild;
              return (
                p(d, () => t.children(c)),
                $(
                  (g) => {
                    var f = o().contentWrapper,
                      m = H(
                        { minHeight: t.minHeightContent },
                        o().content,
                        t.contentContainerClassName
                      );
                    return (
                      f !== g.e && I(u, (g.e = f)),
                      m !== g.t && I(d, (g.t = m)),
                      g
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                u
              );
            })(),
            L(() => s(c)),
          ];
        },
      }),
  });
}
Ft(`
@keyframes Dialog-openAnimation {
  from {
    transform: scale(0.95);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes Dialog-closeAnimation {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(0.95);
    opacity: 0;
  }
}
`);
const _E = q((e) => ({
  container: {
    display: "flex",
    alignItems: "flex-start",
    [vr]: { alignItems: "center" },
    justifyContent: "center",
  },
  dialog: {
    display: "flex",
    flexDirection: "column",
    contain: "content",
    ...e.elevationShadowStyle(4),
    borderRadius: e.sharp.large,
  },
  header: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    padding: "0.5rem 0.5rem 0.5rem 1.25rem",
  },
  contentWrapper: {
    overflow: "auto",
    overscrollBehavior: "contain",
    padding: "0.5rem 1.25rem 0",
    outline: "none",
  },
  content: {},
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "1.25rem",
  },
  title: { flex: 1 },
  dialogEntering: { animation: `Dialog-openAnimation ${yr}ms ${ue} both` },
  dialogExiting: { animation: `Dialog-closeAnimation ${yr}ms ${Vf} both` },
}));
function Ph(e) {
  const t = F({ confirmLabel: h("Close"), width: 480 }, e);
  return l(an, {
    get isShown() {
      return t.isShown;
    },
    hasFooter: !1,
    hasClose: !0,
    hasCancel: !1,
    get title() {
      return t.title;
    },
    get confirmLabel() {
      return t.confirmLabel;
    },
    get width() {
      return t.width;
    },
    get onConfirm() {
      return t.onClose;
    },
    get onCancel() {
      return t.onClose;
    },
    children: () => t.children,
  });
}
var OE = w("<div><div>");
const NE = { short: 3e3, medium: 6e3, long: 1e4 };
let xo;
function ss(e) {
  e = F({ fixed: !1 }, e);
  let t;
  const n = FE(),
    r = () => {
      e.open && e.onClose();
    };
  let o;
  const i = (u) => {
    var d;
    e.open &&
      (o != null && window.clearTimeout(o),
      (o = window.setTimeout(
        () => {
          (o = void 0), t.matches(":hover") ? i(2) : r();
        },
        u != null
          ? u
          : NE[(d = e.duration) != null ? d : e.actionText ? "long" : "short"]
      )));
  };
  ie(
    pe(
      () => e.open,
      () => {
        e.open && (xo && xo !== r && xo(), (xo = r), i());
      }
    )
  ),
    De(() => {
      xo === r && (xo = void 0);
    });
  const a = () => {
    i();
  };
  return l(Os, {
    get in() {
      return e.open;
    },
    appare: !0,
    onEntering: (u) => {
      const d = t.animate(
        [
          { opacity: 0, transform: `translateY(24px) ${$i}` },
          { opacity: 1, transform: `translateY(0) ${$i}` },
        ],
        { duration: Ld }
      );
      d.onfinish = u;
    },
    onExiting: (u) => {
      const d = t.animate(
        [
          { opacity: 1, transform: `translateY(0) ${$i}` },
          { opacity: 0, transform: `translateY(24px) ${$i}` },
        ],
        { duration: Ld }
      );
      d.onfinish = u;
    },
    children: (u) =>
      l(na, {
        get children() {
          return l(Zr, {
            get value() {
              return kr.TOASTER;
            },
            children: (d) =>
              l(D, {
                get when() {
                  return u() !== Et.EXITED;
                },
                get children() {
                  var g = OE(),
                    f = g.firstChild;
                  g.$$pointerdown = a;
                  var m = t;
                  return (
                    typeof m == "function" ? tt(m, g) : (t = g),
                    d != null
                      ? g.style.setProperty("z-index", d)
                      : g.style.removeProperty("z-index"),
                    p(f, () => e.children),
                    p(
                      g,
                      l(D, {
                        get when() {
                          return e.actionText;
                        },
                        get children() {
                          return l(Z, {
                            get class() {
                              return n().action;
                            },
                            variant: "text",
                            inverse: !0,
                            size: "small",
                            edge: "end",
                            get onClick() {
                              return e.onAction;
                            },
                            get children() {
                              return e.actionText;
                            },
                          });
                        },
                      }),
                      null
                    ),
                    $(
                      (y) => {
                        var b = H(n().root),
                          v = H(
                            n().message,
                            e.actionText
                              ? n().messageWithAction
                              : n().messageWithoutAction
                          );
                        return (
                          b !== y.e && I(g, (y.e = b)),
                          v !== y.t && I(f, (y.t = v)),
                          y
                        );
                      },
                      { e: void 0, t: void 0 }
                    ),
                    g
                  );
                },
              }),
          });
        },
      }),
  });
}
const $i = "translateX(calc(50vw - 50%))",
  FE = q((e) => ({
    root: {
      position: "fixed",
      bottom: "1.5rem",
      transform: $i,
      maxWidth: "min(70ch, calc(100vw - 3rem))",
      padding: "0.5rem 0.5rem 0.5rem 1rem",
      minHeight: "3rem",
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "0.5rem",
      background: e.color.inverseSurface,
      color: e.color.inverseOnSurface,
      borderRadius: e.sharp.extraSmall,
      ...e.elevationShadowStyle(3),
    },
    message: {
      flex: "1 1 18ch",
      overflowWrap: "break-word",
      ...e.typescale.bodyMediumStyle,
      ...jf(2),
    },
    messageWithAction: { minWidth: "18ch" },
    messageWithoutAction: { paddingRight: "0.5rem" },
    action: { marginLeft: "auto", paddingLeft: "1rem" },
  }));
Bn(["pointerdown"]);
function Jt(e) {
  const [t, n] = N(!1),
    r = L(() => t() || e.on),
    o = Ki(() => r() && e.children);
  return (
    ie(
      pe(o, (i) => {
        n(!!i);
      })
    ),
    l(D, {
      get when() {
        return r();
      },
      get children() {
        return o();
      },
    })
  );
}
const BE = new Intl.DateTimeFormat([], {
    dateStyle: "medium",
    timeStyle: "short",
    hourCycle: "h23",
  }),
  Mh = new Intl.DateTimeFormat([], {
    year: "numeric",
    month: "short",
    day: "numeric",
  }),
  UE = new Intl.DateTimeFormat([], { month: "short", day: "numeric" });
function zE(e, t = "full") {
  const n = new Date(e),
    r = new Date(),
    o = Math.floor((r.getTime() - n.getTime()) / 1e3);
  if (n.getFullYear() !== r.getFullYear()) return Mh.format(n);
  if (n.getTime() < HE()) return UE.format(n);
  if (n.getTime() < VE()) return h("Yesterday");
  const i = Math.floor(o / 3600);
  if (i >= 1) return t === "full" ? h("%s hours ago", i) : `${i}h`;
  const a = Math.floor(o / 60);
  return a >= 1
    ? t === "full"
      ? h("%s minutes ago", a)
      : `${a}m`
    : `${Math.floor(o)}s`;
}
function HE() {
  const e = new Date();
  return e.setDate(e.getDate() - 1), e.setHours(0, 0, 0, 0);
}
function VE() {
  const e = new Date();
  return e.setHours(0, 0, 0, 0), e.getTime();
}
const $h = on();
function WE(e) {
  const [t, n] = N(Date.now()),
    o = { getCurrentTime: s0(t) },
    i = 3e4;
  let a = Date.now();
  const s = () => {
      n(Date.now()), (a = Date.now());
    },
    c = setInterval(s, i),
    u = () => {
      document.visibilityState === "visible" &&
        Math.abs(Date.now() - a) > i &&
        s();
    };
  return (
    document.addEventListener("visibilitychange", u),
    De(() => {
      clearInterval(c), document.removeEventListener("visibilitychange", u);
    }),
    l($h.Provider, {
      value: o,
      get children() {
        return e.children;
      },
    })
  );
}
function GE() {
  return Y($h);
}
function jE(e) {
  const t = GE();
  return W(t), L(() => (t.getCurrentTime(), zE(e.to, e.format)));
}
function Qr(e, t, n = () => window, r) {
  let o;
  const i = (s) => {
      W(s), W(!o), (o = s), s.addEventListener(e, t, r);
    },
    a = () => {
      o && (o.removeEventListener(e, t, r), (o = void 0));
    };
  De(a),
    ie(
      pe(n, (s) => {
        a(), s && i(s);
      })
    );
}
const Zd = (e) => ["INPUT", "SELECT", "TEXTAREA"].includes(e.target.tagName),
  wu = (e) => document.querySelector(e) != null,
  Qd = wu.bind(void 0, "[data-is-menu]"),
  Jd = wu.bind(void 0, "[data-is-dialog]");
wu.bind(void 0, "[data-overlay-active]");
function YE(e) {
  typeof e == "string" && (e = [e]);
  const t = [];
  for (const n of e.map((r) => r.trim())) {
    const r = { ctrlKey: !1, altKey: !1, shiftKey: !1, metaKey: !1 },
      o = n
        .split("+")
        .map((a) => a.trim())
        .filter(Boolean);
    let i = n.endsWith("+") ? "+" : o.pop();
    if ((i === "Space" && (i = " "), !i)) throw new Error(`${n}`);
    for (const a of o) {
      if (!["ctrl", "alt", "shift", "meta"].includes(a)) throw new Error(a);
      r[a + "Key"] = !0;
    }
    t.push({ key: i, ...r });
  }
  return t;
}
function qE(e, t, n) {
  return (
    e.key === t.key &&
    e.ctrlKey === t.ctrlKey &&
    e.altKey === t.altKey &&
    e.shiftKey === t.shiftKey &&
    e.metaKey === t.metaKey &&
    (!n || n(e))
  );
}
function XE(e, t) {
  for (const n of t)
    if (YE(n[0]).some((o) => qE(e, o, n[2]))) {
      n[1](e) !== !1 && (e.preventDefault(), e.stopPropagation());
      break;
    }
}
function ti(e, t) {
  Qr(
    "keydown",
    (r) => {
      XE(r, t);
    },
    e === "global" ? () => document.body : e
  );
}
const KE = h("Qi Reader"),
  ls = "disable-pointer-events",
  Pc = "enable-pointer-events";
Ft(`
.${ls} { pointer-events: none; }
.${Pc} { pointer-events: auto; }
`);
function ZE(e, t) {
  const n = () => {
      const o = t();
      document.body.classList.add(ls),
        o.forEach((i) => {
          i && i.classList.add(Pc);
        });
    },
    r = () => {
      const o = t();
      document.body.classList.remove(ls),
        o.forEach((i) => {
          i && i.classList.remove(Pc);
        });
    };
  ie(() => {
    e() ? n() : r();
  }),
    De(() => {
      r();
    });
}
function QE() {
  return document.body.classList.contains(ls);
}
const JE = "data-is-hidden",
  cs = "data-focus-area",
  Fl = "focusArea",
  e5 = 1,
  t5 = 3;
function eg() {
  const e = document.activeElement;
  if (
    QE() ||
    (e && e.closest(`#portal, [${cs}]`)) ||
    !(!e || e === document.body)
  )
    return;
  const t = Array.from(document.querySelectorAll(`[${cs}]:not([${JE}])`));
  t.sort((n, r) => Number(n.dataset[Fl]) - Number(r.dataset[Fl]));
  for (const n of t)
    if (n.dataset[Fl] !== "-1") {
      const r = n.hasAttribute("tabindex") ? n : n.querySelector("[tabindex]");
      r == null || r.focus();
      break;
    }
}
function n5() {
  const e = by();
  return (
    xf(window, ["focusout", "keyup", "mouseup"], () => {
      setTimeout(eg, 250);
    }),
    ie(
      pe(e, (t) => {
        t || setTimeout(eg, 500);
      })
    ),
    null
  );
}
function Vt(e, t) {
  var n, r;
  switch (t.type) {
    case K.SUBSCRIPTION:
      return `/subscriptions/${encodeURIComponent(t.id)}`;
    case K.FEED:
      return `/feeds/${encodeURIComponent(t.id)}`;
    case K.CATEGORY: {
      const o =
        (n = e.subscriptions.data.categories[t.id]) == null ? void 0 : n.label;
      return o === Cn.ALL || t.id === Cn.ALL
        ? "/"
        : `/categories/${encodeURIComponent(o != null ? o : t.id)}`;
    }
    case K.TAG: {
      const o = (r = e.tags.data.tags[t.id]) == null ? void 0 : r.label;
      return `/tags/${encodeURIComponent(o != null ? o : t.id)}`;
    }
  }
}
function Mc(e, t) {
  switch (t.type) {
    case K.SUBSCRIPTION:
      return e.subscriptions.data.subscriptions[t.id] != null;
    case K.CATEGORY:
      return pS.includes(t.id) || e.subscriptions.data.categories[t.id] != null;
    case K.TAG:
      return bS.includes(t.id) || e.tags.data.tags[t.id] != null;
    case K.FEED:
      return !1;
  }
}
function Rh(e, t) {
  return W(t), Vt(e, { type: K.SUBSCRIPTION, id: t });
}
function r5(e, t) {
  return W(t), Vt(e, { type: K.CATEGORY, id: t });
}
function Dh(e, t, n) {
  return `${zr(Vt(e, t))}entries/${encodeURIComponent(n)}`;
}
var o5 = w("<b>");
const Su = Xt("lastView");
function i5(e) {
  const [, t] = Su();
  ie(pe(e, (n) => t({ streamId: n })));
}
function a5(e, t, n) {
  const [r, o] = Su(),
    i = r();
  if (!i) return;
  o({ ...i, entryId: e(), entryTitle: t() });
  const a = () => {
      const u = n(),
        d = u && u.scrollTop > 0 ? u.scrollTop : void 0;
      o({ ...i, entryId: e(), entryTitle: t(), scrollTop: d });
    },
    s = () => {
      document.visibilityState === "hidden" && a();
    },
    c = () => {
      a();
    };
  Lt(() => {
    document.addEventListener("visibilitychange", s),
      window.addEventListener("blur", c);
  }),
    De(() => {
      document.removeEventListener("visibilitychange", s),
        window.removeEventListener("blur", c);
    }),
    De(() => {
      o({ ...i, entryId: void 0, scrollTop: void 0 });
    });
}
let zt,
  _h = !1;
function s5() {
  const [e] = Su();
  (zt = e()), location.pathname === "/" && (_h = !0);
}
function l5() {
  if (!Kr || !_h || !zt || !zt.entryId) return;
  const [e, t] = N(!0),
    n = Y(se);
  return l(ss, {
    get open() {
      return e();
    },
    duration: "long",
    actionText: "Open",
    onAction: () => {
      t(!1), W(zt && zt.entryId);
      const o = zi(zt.streamId);
      if (!Mc(n, o)) return;
      const i = Dh(n, o, zt.entryId);
      location.pathname !== i && Qn(i);
    },
    onClose: () => t(!1),
    get children() {
      return [
        L(() => h("Recent read:")),
        " ",
        (() => {
          var o = o5();
          return (
            p(o, () => {
              var i;
              return (i = zt.entryTitle) != null ? i : h("No title");
            }),
            o
          );
        })(),
      ];
    },
  });
}
function c5(e) {
  if (Kr) {
    if (!zt || location.pathname !== "/") return;
    const t = zi(zt.streamId);
    if (!Mc(e, t)) return;
    Qn(Vt(e, t));
  } else if (location.pathname === "/") {
    const t = e.preferences.data.preferences.globalPreferences.startPage,
      n = t && Mc(e, zi(t)) ? Vt(e, zi(t)) : r5(e, Cn.ALL);
    Qn(n, { replace: !0 });
  }
}
let tg = !1;
function u5(e, t) {
  if (tg || ((tg = !0), !zt || !zt.scrollTop || zt.entryId !== e)) return;
  const n = zt.scrollTop;
  Lt(() => {
    const r = t();
    r && Hf(r, n);
  });
}
var d5 = w("<span>/"),
  g5 = w("<span>+"),
  f5 = w("<kbd>?"),
  h5 = w("<kbd>↑"),
  m5 = w("<kbd>↓"),
  y5 = w("<kbd>←"),
  p5 = w("<kbd>→"),
  v5 = w("<kbd>O"),
  b5 = w("<kbd>Enter"),
  w5 = w("<kbd>A"),
  S5 = w("<kbd>X"),
  E5 = w("<kbd>R"),
  C5 = w("<kbd>G"),
  ng = w("<kbd>M"),
  Bl = w("<kbd>Shift"),
  rg = w("<kbd>,"),
  A5 = w("<kbd>B"),
  og = w("<kbd>V"),
  I5 = w("<kbd>Click"),
  x5 = w("<kbd>N"),
  k5 = w("<kbd>P"),
  T5 = w("<kbd>I"),
  L5 = w("<kbd>Y"),
  P5 = w("<kbd>C"),
  M5 = w("<kbd>="),
  $5 = w("<kbd>-"),
  R5 = w("<kbd>F"),
  D5 = w(
    "<div><table><caption> </caption><tbody></tbody></table><table><caption> </caption><tbody></tbody></table><table><caption> </caption><tbody></tbody></table><table><caption> </caption><tbody>"
  ),
  _5 = w("<kbd>K"),
  O5 = w("<kbd>J"),
  N5 = w("<kbd>H"),
  F5 = w("<kbd>L"),
  B5 = w("<tr><td><div></div></td><td>"),
  U5 = w("<div>");
function z5() {
  const e = Oh(),
    t = () =>
      (() => {
        var r = d5();
        return $(() => I(r, e().sp)), r;
      })(),
    n = () =>
      (() => {
        var r = g5();
        return $(() => I(r, e().plus)), r;
      })();
  return (() => {
    var r = D5(),
      o = r.firstChild,
      i = o.firstChild;
    i.firstChild;
    var a = i.nextSibling,
      s = o.nextSibling,
      c = s.firstChild;
    c.firstChild;
    var u = c.nextSibling,
      d = s.nextSibling,
      g = d.firstChild;
    g.firstChild;
    var f = g.nextSibling,
      m = d.nextSibling,
      y = m.firstChild;
    y.firstChild;
    var b = y.nextSibling;
    return (
      p(i, () => h("Global"), null),
      p(
        a,
        l(Ue, {
          get description() {
            return h("Keyboard shortcuts");
          },
          get children() {
            return f5();
          },
        }),
        null
      ),
      p(
        a,
        l(Ue, {
          get description() {
            return h("Navigate through feeds and entries");
          },
          get more() {
            return [_5(), O5(), N5(), F5()];
          },
          get children() {
            return [h5(), m5(), y5(), p5()];
          },
        }),
        null
      ),
      p(
        a,
        l(Ue, {
          get description() {
            return h("Open item");
          },
          get children() {
            return [v5(), l(t, {}), b5()];
          },
        }),
        null
      ),
      p(
        a,
        l(Ue, {
          get description() {
            return h("Add feeds");
          },
          get children() {
            return w5();
          },
        }),
        null
      ),
      p(c, () => h("Feed list"), null),
      p(
        u,
        l(Ue, {
          get description() {
            return h("Expand/collapse folder");
          },
          get children() {
            return S5();
          },
        })
      ),
      p(g, () => h("Article list"), null),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Refresh");
          },
          get children() {
            return E5();
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Open next feed");
          },
          get children() {
            return C5();
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Mark above as read");
          },
          get children() {
            return ng();
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Mark all as read");
          },
          get children() {
            return [Bl(), l(n, {}), ng()];
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Toggle read/unread for the selected entry");
          },
          get children() {
            return rg();
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Toggle show unread only");
          },
          get children() {
            return A5();
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Open the sidebar");
          },
          get children() {
            return l(Rd, {
              get class() {
                return e().gesture;
              },
            });
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Feed article list: Toggle unread only");
          },
          get children() {
            return l(Rl, {
              get class() {
                return e().gesture;
              },
            });
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Tagged article list: Remove from list");
          },
          get children() {
            return l(Rl, {
              get class() {
                return e().gesture;
              },
            });
          },
        }),
        null
      ),
      p(
        f,
        l(Ue, {
          get description() {
            return h("Open original");
          },
          get children() {
            return [og(), l(t, {}), Bl(), l(n, {}), I5()];
          },
        }),
        null
      ),
      p(y, () => h("Article view"), null),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Next article");
          },
          get children() {
            return x5();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Previous article");
          },
          get children() {
            return k5();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Open original");
          },
          get children() {
            return og();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Load full content");
          },
          get children() {
            return T5();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Toggle read later");
          },
          get children() {
            return L5();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Toggle read/unread");
          },
          get children() {
            return rg();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Copy article URL");
          },
          get children() {
            return [Bl(), l(n, {}), P5()];
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Increase font size");
          },
          get children() {
            return M5();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Decrease font size");
          },
          get children() {
            return $5();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Toggle fullscreen");
          },
          get children() {
            return R5();
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Back to article list");
          },
          get children() {
            return l(Rd, {
              get class() {
                return e().gesture;
              },
            });
          },
        }),
        null
      ),
      p(
        b,
        l(Ue, {
          get description() {
            return h("Next article");
          },
          get children() {
            return l(Rl, {
              get class() {
                return e().gesture;
              },
            });
          },
        }),
        null
      ),
      $(
        (v) => {
          var S = e().root,
            A = e().list,
            k = e().title,
            T = e().list,
            E = e().title,
            P = e().list,
            M = e().title,
            x = e().list,
            _ = e().title;
          return (
            S !== v.e && I(r, (v.e = S)),
            A !== v.t && I(o, (v.t = A)),
            k !== v.a && I(i, (v.a = k)),
            T !== v.o && I(s, (v.o = T)),
            E !== v.i && I(c, (v.i = E)),
            P !== v.n && I(d, (v.n = P)),
            M !== v.s && I(g, (v.s = M)),
            x !== v.h && I(m, (v.h = x)),
            _ !== v.r && I(y, (v.r = _)),
            v
          );
        },
        {
          e: void 0,
          t: void 0,
          a: void 0,
          o: void 0,
          i: void 0,
          n: void 0,
          s: void 0,
          h: void 0,
          r: void 0,
        }
      ),
      r
    );
  })();
}
function Ue(e) {
  const t = Oh();
  return (() => {
    var n = B5(),
      r = n.firstChild,
      o = r.firstChild,
      i = r.nextSibling;
    return (
      p(o, () => e.children),
      p(
        r,
        l(D, {
          keyed: !0,
          get when() {
            return e.more;
          },
          children: (a) =>
            (() => {
              var s = U5();
              return p(s, a), $(() => I(s, t().shortcuts)), s;
            })(),
        }),
        null
      ),
      p(i, () => e.description),
      $(
        (a) => {
          var s = t().item,
            c = t().shortcutsContainer,
            u = t().shortcuts,
            d = t().description;
          return (
            s !== a.e && I(n, (a.e = s)),
            c !== a.t && I(r, (a.t = c)),
            u !== a.a && I(o, (a.a = u)),
            d !== a.o && I(i, (a.o = d)),
            a
          );
        },
        { e: void 0, t: void 0, a: void 0, o: void 0 }
      ),
      n
    );
  })();
}
const Oh = q((e) => ({
  root: {
    paddingBottom: "1rem",
    [`@media (min-width: ${ou}px)`]: { columns: "3 300px", columnGap: "1rem" },
  },
  list: { marginBottom: "2rem", borderCollapse: "collapse" },
  item: {},
  title: {
    marginBottom: "0.5rem",
    textAlign: "left",
    ...e.typescale.titleMediumStyle,
  },
  shortcutsContainer: { padding: "0.25rem 1rem 0.25rem 0" },
  shortcuts: {
    display: "flex",
    alignItems: "center",
    margin: "0.25rem 0",
    " kbd": {
      margin: "0 0.25rem",
      padding: "0.15em 0.375em",
      color: e.color.onSurface,
      borderRadius: e.sharp.extraSmall,
      ...e.typescale.labelLargeStyle,
      ...e.elevationShadowStyle(1),
      fontFamily: "monospace",
    },
  },
  sp: { margin: "0 0.25rem", color: e.color.onSurfaceHint },
  plus: { margin: "0 0.25rem", color: e.color.onSurfaceVariant },
  description: { maxWidth: "10rem", ...e.typescale.labelMediumStyle },
  gesture: { color: e.color.onSurfaceVariant },
}));
function H5(e, t = !1) {
  const n = window.matchMedia(e),
    [r, o] = mp(t, () => n.matches);
  return Wr(n, "change", () => o(n.matches)), r;
}
function V5(e) {
  return H5("(prefers-color-scheme: dark)", e);
}
var W5 = yp(V5.bind(void 0, !1));
function G5(e) {
  const t = W5(),
    [n] = mu(),
    r = L(() =>
      n() === hn.LIGHT
        ? Ti[0].lightTheme
        : n() === hn.DARK || t()
        ? Ti[0].darkTheme
        : Ti[0].lightTheme
    );
  return (
    ie(
      pe(r, (o) => {
        var i;
        (document.documentElement.style.colorScheme =
          o.type === pr.LIGHT ? "light" : "dark"),
          (document.documentElement.style.accentColor = o.color.primary),
          (document.body.style.backgroundColor = o.color.background),
          (document.body.style.color = o.color.onBackground),
          (i = document.querySelector("meta[name=theme-color]")) == null ||
            i.setAttribute("content", o.color.background);
      })
    ),
    l(Nf.Provider, {
      value: r,
      get children() {
        return e.children;
      },
    })
  );
}
var j5 = w("<a>");
function Pe(e) {
  const t = F(
      { color: "primary", openInNew: !1, openInNewMark: e.openInNew },
      e
    ),
    [n, r] = Ve(t, [
      "native",
      "class",
      "color",
      "openInNew",
      "openInNewMark",
      "children",
    ]),
    o = Pt(),
    i = Y5(),
    a = at(),
    s = () => (n.color === "inherit" ? "inherit" : o().color[n.color]),
    c = () =>
      e.textDecoration == null
        ? n.color === "inherit"
          ? "underline"
          : "none"
        : e.textDecoration
        ? "underline"
        : "none",
    u = () =>
      e.textDecoration == null || e.textDecoration ? "underline" : "none",
    d = L(() =>
      io({
        ":link": { color: s(), textDecoration: c() },
        ":visited": { color: s(), textDecoration: c() },
        ":hover": {
          color: n.color === "inherit" ? o().color.primary : s(),
          textDecoration: u(),
        },
        ":active": {
          color: n.color === "inherit" ? o().color.primary : s(),
          textDecoration: u(),
        },
      })
    ),
    g = (f) => {
      !n.openInNew &&
        !n.native &&
        r.href &&
        (f.preventDefault(), f.stopPropagation(), a(r.href));
    };
  return (() => {
    var f = j5();
    return (
      Je(
        f,
        F(
          {
            get class() {
              return H(d(), n.class);
            },
          },
          () =>
            n.openInNew ? { target: "_blank", "data-native": !0 } : void 0,
          {
            get "data-native"() {
              return n.native;
            },
            onClick: g,
          },
          r
        ),
        !1,
        !0
      ),
      p(f, () => n.children, null),
      p(
        f,
        (() => {
          var m = L(() => !!n.openInNewMark);
          return () =>
            m() && [
              " ",
              l(eh, {
                get class() {
                  return i().openInNewIcon;
                },
              }),
            ];
        })(),
        null
      ),
      f
    );
  })();
}
const Y5 = q(() => ({
  openInNewIcon: { verticalAlign: "text-top", width: "0.75em", height: "auto" },
}));
var ig = w("<div>");
function ke(e) {
  const [t, n] = Ve(F({}, e), [
      "class",
      "label",
      "start",
      "end",
      "center",
      "group",
    ]),
    r = q5();
  return (() => {
    var o = ig();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(
                r().root,
                e.group && r().section,
                e.start && r().start,
                e.end && r().end,
                e.center && r().center,
                t.class
              );
            },
          },
          n
        ),
        !1,
        !0
      ),
      p(
        o,
        l(D, {
          get when() {
            return t.label;
          },
          keyed: !0,
          children: (i) =>
            (() => {
              var a = ig();
              return p(a, i), $(() => I(a, r().label)), a;
            })(),
        }),
        null
      ),
      p(o, () => e.children, null),
      o
    );
  })();
}
const q5 = q((e) => ({
  root: { marginTop: "1rem", marginBottom: "1rem" },
  section: { marginTop: "2rem", marginBottom: "2rem" },
  start: { marginTop: 0 },
  end: { marginBottom: 0 },
  center: { textAlign: "center" },
  label: {
    ...yn,
    margin: "0 0 1rem",
    color: e.color.onSurfaceVariant,
    textTransform: "uppercase",
    ...e.typescale.labelSmallStyle,
  },
}));
var X5 = w('<section><div style="margin:1rem 0">'),
  K5 = w("<pre>URL: <br><br>");
function $c(e) {
  var f;
  const [t, n] = N(!1),
    r = Z5(),
    o = e.title || h("Application error");
  e.error && console.error("AppError:", e.error);
  const i = () => {
      window.location.reload();
    },
    a = (m) => {
      m.preventDefault(), window.location.replace("/");
    },
    s = () => {
      confirm(h("WARNING: All local preferences will be deleted, continue?")) &&
        (t() ||
          (n(!0),
          localStorage.clear(),
          Promise.all([gh()]).finally(() => {
            window.location.replace("/");
          })));
    },
    c = "lastAppErrorTime",
    u = 3e4,
    d = Number((f = localStorage.getItem(c)) != null ? f : 0),
    g = Date.now() - d < u;
  return (
    Lt(() => {
      localStorage.setItem(c, String(Date.now()));
    }),
    (() => {
      var m = X5(),
        y = m.firstChild;
      return (
        p(
          y,
          l(rs, {
            get class() {
              return r().icon;
            },
          })
        ),
        p(
          m,
          l(j, {
            variant: "headlineMedium",
            color: "error",
            align: "center",
            gutterBottom: !0,
            children: o,
          }),
          null
        ),
        p(
          m,
          l(D, {
            get when() {
              return e.subtitle;
            },
            get children() {
              return l(j, {
                color: "error",
                get children() {
                  return e.subtitle;
                },
              });
            },
          }),
          null
        ),
        p(
          m,
          l(ke, {
            get class() {
              return r().buttons;
            },
            group: !0,
            end: !0,
            get children() {
              return [
                l(Z, {
                  style: { "margin-bottom": "1rem" },
                  variant: "filled",
                  full: !0,
                  onClick: i,
                  get children() {
                    return h("Retry");
                  },
                }),
                l(D, {
                  get when() {
                    return location.pathname !== "/";
                  },
                  get children() {
                    return l(Z, {
                      style: { "margin-bottom": "1rem" },
                      variant: "outlined",
                      full: !0,
                      onClick: a,
                      get children() {
                        return h("Go home");
                      },
                    });
                  },
                }),
                l(D, {
                  when: g,
                  get children() {
                    return l(Z, {
                      variant: "outlined",
                      color: "error",
                      full: !0,
                      get isLoading() {
                        return t();
                      },
                      onClick: s,
                      get children() {
                        return h("Clear local data");
                      },
                    });
                  },
                }),
              ];
            },
          }),
          null
        ),
        p(
          m,
          l(ke, {
            get class() {
              return r().footer;
            },
            get children() {
              return l(Pe, {
                href: "https://github.com/oxyry/qireader/issues",
                color: "inherit",
                openInNew: !0,
                openInNewMark: !1,
                get children() {
                  return h("Bug tracker");
                },
              });
            },
          }),
          null
        ),
        p(
          m,
          l(D, {
            keyed: !0,
            get when() {
              return e.error;
            },
            children: (b) =>
              (() => {
                var v = K5(),
                  S = v.firstChild,
                  A = S.nextSibling,
                  k = A.nextSibling;
                return (
                  p(v, () => window.location.toString(), A),
                  p(v, () => String(b), k),
                  p(v, () => (b == null ? void 0 : b.stack), null),
                  $(() => I(v, r().stack)),
                  v
                );
              })(),
          }),
          null
        ),
        $(() => I(m, r().root)),
        m
      );
    })()
  );
}
const Z5 = q((e) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    minHeight: "100vh",
  },
  icon: { width: "6rem", height: "6rem", color: e.color.error },
  buttons: {
    alignSelf: "center",
    margin: "2rem 0",
    width: "100%",
    "max-width": "320px",
  },
  stack: {
    margin: "1rem 0",
    maxHeight: 100,
    maxWidth: "100%",
    padding: "0.25rem",
    overflow: "auto",
    background: e.color.surfaceVariant,
    color: e.color.onSurfaceVariant,
    border: `1px solid ${e.color.outlineVariant}`,
    ...e.typescale.bodySmallStyle,
  },
  footer: { color: e.color.onSurfaceVariant, ...e.typescale.bodySmallStyle },
}));
function Q5(e) {
  const t = Y(se);
  return l(v0, {
    fallback: (n) => l($c, { error: n }),
    get children() {
      return l(D, {
        keyed: !0,
        get when() {
          return t.core.data.fatalError;
        },
        get fallback() {
          return e.children;
        },
        children: (n) =>
          l($c, {
            get title() {
              return h("Oops! Something went wrong.");
            },
            get subtitle() {
              return n.message;
            },
            get error() {
              return n.error;
            },
          }),
      });
    },
  });
}
var J5 = w("<div>"),
  eC = w("<div><div>");
const tC = 15e3;
function nC(e) {
  const t = Y(se),
    [n, r] = N(!1),
    o = () =>
      t.core.data.state === Ht.LOADING || t.core.data.state === Ht.USER_LOADING;
  let i;
  const a = rC();
  ie(
    pe(o, (c) => {
      r(!1),
        c &&
          (clearTimeout(i),
          (i = setTimeout(() => {
            r(!0);
          }, tC)));
    })
  );
  const s = () => {
    window.location.reload();
  };
  return l(qo, {
    get fallback() {
      return e.children;
    },
    get children() {
      return [
        l(kt, {
          get when() {
            return o();
          },
          get children() {
            var c = eC(),
              u = c.firstChild;
            return (
              p(u, l(ao, {})),
              p(
                c,
                l(D, {
                  get when() {
                    return n();
                  },
                  get children() {
                    var d = J5();
                    return (
                      p(
                        d,
                        l(Z, {
                          variant: "text",
                          size: "small",
                          iconBefore: oh,
                          onClick: s,
                          get children() {
                            return h("Reload");
                          },
                        })
                      ),
                      $(() => I(d, a().appLoadingButton)),
                      d
                    );
                  },
                }),
                null
              ),
              $(() => I(c, a().appLoading)),
              c
            );
          },
        }),
        l(kt, {
          get when() {
            return t.core.data.state === Ht.USER_LOAD_ERROR;
          },
          get children() {
            return l($c, {
              get title() {
                return h("Failed to fetch user data");
              },
              get subtitle() {
                return h(
                  "Please check your internet connection and try again."
                );
              },
            });
          },
        }),
      ];
    },
  });
}
const rC = q(() => ({
  appLoading: {
    ...$s,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  appLoadingButton: {
    ...zb,
    display: "flex",
    justifyContent: "center",
    marginBottom: "1.5rem",
  },
}));
Kr && (document.title = KE);
function oC(e) {
  var r;
  const t = Y(se);
  ap(at()),
    s5(),
    (r = document.getElementById("app-loading")) == null || r.remove(),
    Lt(() => {
      t.core.methods
        .initAppAction()
        .catch(t.core.methods.reportErrorAction(void 0, { fatal: !0 }));
    });
  let n = !1;
  return (
    ie(
      pe(
        () => t.core.data.state,
        (o) => {
          o === Ht.USER_LOADED && (n || ((n = !0), c5(t)));
        }
      )
    ),
    ti("global", [
      [
        "shift+?",
        () => t.core.methods.setShowShortcutsDialogMutation(!0),
        (o) => !Zd(o) && !Qd() && !Jd(),
      ],
      ["a", () => Qn("/discover"), (o) => !Zd(o) && !Qd() && !Jd()],
    ]),
    l(WE, {
      get children() {
        return l(G5, {
          get children() {
            return l(Q5, {
              get children() {
                return l(nC, {
                  get children() {
                    return [
                      l(n5, {}),
                      L(() => e.children),
                      l(D, {
                        keyed: !0,
                        get when() {
                          return t.core.data.message;
                        },
                        children: (o) =>
                          l(ss, {
                            get open() {
                              return o.open;
                            },
                            get duration() {
                              return o.duration;
                            },
                            onClose: () => {
                              t.core.methods.clearNotificationMutation();
                            },
                            get children() {
                              return o.message;
                            },
                          }),
                      }),
                      l(Jt, {
                        get on() {
                          return t.core.data.showShortcutsDialog;
                        },
                        get children() {
                          return l(Ph, {
                            get isShown() {
                              return t.core.data.showShortcutsDialog;
                            },
                            get title() {
                              return h("Keyboard shortcuts");
                            },
                            width: "auto",
                            hasFooter: !1,
                            onClose: () =>
                              t.core.methods.setShowShortcutsDialogMutation(!1),
                            get children() {
                              return l(z5, {});
                            },
                          });
                        },
                      }),
                      l(l5, {}),
                    ];
                  },
                });
              },
            });
          },
        });
      },
    })
  );
}
var iC = w("<div><div>"),
  ag = w("<div>");
const aC = {
    info: "primary",
    success: "green",
    warning: "orange",
    error: "error",
  },
  sC = { info: void 0, success: Mw, warning: rs, error: rs };
function Nt(e) {
  e = F({ variant: "tonal", severity: "info", inverse: !1 }, e);
  const t = Pt(),
    n = lC(),
    r = () => aC[e.severify],
    o = L(() =>
      e.inverse
        ? t().color.inverseSurface
        : e.variant === "filled"
        ? t().color[r()]
        : t().color[`${r()}Container`]
    ),
    i = L(() =>
      e.inverse
        ? t().color.inverseOnSurface
        : e.variant === "filled"
        ? t().color[`on${Bo(r())}`]
        : t().color[`on${Bo(r())}Container`]
    ),
    a = () => (e.noIcon ? void 0 : sC[e.severify]),
    s = L(() => io({ background: o(), color: i() }));
  return (() => {
    var c = iC(),
      u = c.firstChild;
    return (
      p(
        c,
        l(D, {
          keyed: !0,
          get when() {
            return a();
          },
          children: (d) =>
            (() => {
              var g = ag();
              return p(g, l(d, { size: 22 })), $(() => I(g, n().icon)), g;
            })(),
        }),
        u
      ),
      p(u, () => e.children),
      p(
        c,
        l(D, {
          get when() {
            return e.onClose;
          },
          get fallback() {
            return (() => {
              var d = ag();
              return p(d, () => e.actions), $(() => I(d, n().actions)), d;
            })();
          },
          get children() {
            return l(Z, {
              get class() {
                return n().closeButton;
              },
              variant: "text",
              color: "neutralVariant",
              get inverse() {
                return e.inverse;
              },
              icon: so,
              size: "small",
              edge: "end",
              get onClick() {
                return e.onClose;
              },
            });
          },
        }),
        null
      ),
      $(
        (d) => {
          var g = H(n().root, s(), e.class),
            f = n().message;
          return g !== d.e && I(c, (d.e = g)), f !== d.t && I(u, (d.t = f)), d;
        },
        { e: void 0, t: void 0 }
      ),
      c
    );
  })();
}
const lC = q((e) => ({
    root: {
      margin: "0 0 1.5rem",
      padding: "0.75rem 1rem",
      display: "flex",
      alignItems: "flex-start",
      flexWrap: "wrap",
      gap: "0.75rem",
      borderRadius: e.sharp.medium,
    },
    rootWithActions: { flexWrap: "wrap" },
    icon: { flexShrink: 0, alignSelf: "flex-start", padding: "0.25rem 0" },
    message: {
      flex: 1,
      alignSelf: "center",
      minWidth: 200,
      ...e.typescale.labelLargeStyle,
    },
    closeButton: { flex: "0 0 auto", marginLeft: "0.5rem" },
    actions: {
      marginLeft: "auto",
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
    },
  })),
  sn = document.createElement("div");
sn.style.position = "fixed";
sn.style.left = "0";
sn.style.top = "0";
sn.style.width = "1rem";
sn.style.height = "1rem";
sn.style.pointerEvents = "none";
sn.style.contain = "strict";
sn.style.visibility = "hidden";
document.body.appendChild(sn);
function Nh(e) {
  return Fh(e);
}
const [BT, cC] = N(Nh(sn.clientWidth)),
  uC = new ResizeObserver((e) => {
    for (const t of e) {
      if (t.target !== sn) return;
      const n = t.contentBoxSize[0];
      n && cC(Nh(n.blockSize));
    }
  });
uC.observe(sn);
function Re(...e) {
  return e.length === 1
    ? `${Fh(e[0] / 16)}rem`
    : e.length === 2
    ? `${Re(e[0])} ${Re(e[1])}`
    : e.length === 3
    ? `${Re(e[0])} ${Re(e[1])} ${Re(e[2])}`
    : e.length === 4
    ? `${Re(e[0])} ${Re(e[1])} ${Re(e[2])} ${Re(e[3])}`
    : W(!1);
}
function Fh(e) {
  return Math.round(e * 1e5) / 1e5;
}
var dC = w("<div><span></span><span>"),
  gC = w("<div><label><input size=4><span data-is-state-layer>"),
  sg = w("<span>"),
  fC = w("<span data-is-label>");
function At(e) {
  const t = hC();
  return (() => {
    var n = gC(),
      r = n.firstChild,
      o = r.firstChild,
      i = o.nextSibling;
    return (
      p(
        r,
        l(D, {
          get when() {
            return e.prefix;
          },
          keyed: !0,
          children: (a) =>
            (() => {
              var s = sg();
              return p(s, a), $(() => I(s, t().prefix)), s;
            })(),
        }),
        o
      ),
      Je(
        o,
        F(
          {
            get class() {
              return H(t().textInput, !e.label && t().textInputNoLabel);
            },
            get placeholder() {
              return e.placeholder || " ";
            },
          },
          () => e.inputProps
        ),
        !1,
        !1
      ),
      p(
        r,
        l(D, {
          get when() {
            return e.label;
          },
          keyed: !0,
          children: (a) =>
            (() => {
              var s = fC();
              return (
                p(s, a),
                $(() => I(s, H(t().label, e.outlined && t().labelOutlined))),
                s
              );
            })(),
        }),
        i
      ),
      p(
        r,
        l(D, {
          get when() {
            return e.suffix;
          },
          keyed: !0,
          children: (a) =>
            (() => {
              var s = sg();
              return p(s, a), $(() => I(s, t().suffix)), s;
            })(),
        }),
        i
      ),
      p(
        n,
        l(D, {
          get when() {
            return e.supportingTextBody || e.supportingTextCounter;
          },
          get children() {
            var a = dC(),
              s = a.firstChild,
              c = s.nextSibling;
            return (
              p(s, () => e.supportingTextBody),
              p(c, () => e.supportingTextCounter),
              $(
                (u) => {
                  var d = t().supportingText,
                    g = t().supportingTextBody,
                    f = t().supportingTextCounter;
                  return (
                    d !== u.e && I(a, (u.e = d)),
                    g !== u.t && I(s, (u.t = g)),
                    f !== u.a && I(c, (u.a = f)),
                    u
                  );
                },
                { e: void 0, t: void 0, a: void 0 }
              ),
              a
            );
          },
        }),
        null
      ),
      $(
        (a) => {
          var u;
          var s = H(t().root, e.full && t().full, e.className),
            c = H(
              t().inputWrapper,
              e.outlined && t().inputWrapperOutlined,
              !e.label && t().inputWrapperNoLabel,
              ((u = e.inputProps) == null ? void 0 : u.type) === "search" &&
                t().inputWrapperTypeSearch
            );
          return s !== a.e && I(n, (a.e = s)), c !== a.t && I(r, (a.t = c)), a;
        },
        { e: void 0, t: void 0 }
      ),
      n
    );
  })();
}
const lg = 56,
  hC = q((e) => ({
    root: {
      [`@media (width > ${Ps}px)`]: { maxWidth: "32ch" },
      margin: Re(12, 0),
    },
    full: { width: "100%", maxWidth: "none !important" },
    inputWrapper: {
      display: "flex",
      overflow: "hidden",
      alignItems: "center",
      position: "relative",
      height: Re(lg),
      paddingTop: Re(8),
      paddingBottom: Re(8),
      paddingLeft: Re(12),
      paddingRight: Re(12),
      background: e.color.surfaceVariant,
      borderRadius: e.sharp.extraSmall,
      cursor: "text",
      ":hover": { boxShadow: `inset 0 0 0 1px ${e.color.outline}` },
      ":focus-within": {
        boxShadow: `inset 0 0 0 2px ${e.color.primary}`,
        "> [data-is-state-layer]": { opacity: 0 },
      },
      ">[data-is-state-layer]": {
        ...En,
        background: e.color.onSurface,
        opacity: 0,
        pointerEvents: "none",
        transition: "200ms",
      },
      "@media (hover: hover)": {
        ":hover": { "> [data-is-state-layer]": { opacity: wc } },
      },
    },
    inputWrapperNoLabel: {
      height: Re(40),
      paddingTop: Re(5),
      paddingBottom: Re(5),
    },
    inputWrapperOutlined: {
      boxShadow: `inset 0 0 0 1px ${e.color.outline}`,
      background: "transparent",
      ":hover": { boxShadow: `inset 0 0 0 2px ${e.color.onSurface}` },
      "> [data-is-state-layer]": { display: "none" },
    },
    inputWrapperTypeSearch: { borderRadius: e.sharp.full },
    label: {
      position: "absolute",
      top: `calc(${Re(lg)} / 2 - ${e.typescale.labelLargeLineHeight} / 2)`,
      left: Re(12),
      color: e.color.onSurfaceVariant,
      ...e.typescale.labelLargeStyle,
      transformOrigin: "0 0",
      transform: "translate(0, 0)",
      transition: "all 0.2s ease",
      pointerEvents: "none",
    },
    labelOutlined: {},
    textInput: {
      appearance: "none",
      flex: 1,
      alignSelf: "flex-end",
      padding: 0,
      minWidth: 0,
      border: "none !important",
      background: "transparent",
      outline: "none",
      color: e.color.onSurface,
      caretColor: e.color.primary,
      ...e.typescale.bodyLargeStyle,
      "::placeholder": { color: e.color.onSurfaceVariant },
      "&::-webkit-search-cancel-button, &:::-webkit-search-decoration": {
        appearance: "none",
      },
      "&:autofill, &:-webkit-autofill": {
        transition: "background-color 9999s ease-in-out 0s !important",
        webkitTextFillColor: `${e.color.onSurface} !important`,
      },
      ":not(:placeholder-shown) + [data-is-label]": {
        color: e.color.onSurfaceVariant,
        transform: "scale(0.8)",
        top: Re(8),
      },
      ":focus + [data-is-label]": {
        color: e.color.primary,
        transform: "scale(0.8)",
        top: Re(8),
      },
    },
    textInputNoLabel: { alignSelf: "center" },
    prefix: { zIndex: 1, marginRight: Re(16), color: e.color.onSurfaceVariant },
    suffix: { zIndex: 1, marginLeft: Re(16), color: e.color.onSurfaceVariant },
    supportingText: {
      display: "flex",
      gap: "16px",
      margin: "4px 12px",
      color: "rgba(0, 0, 0, 0.5)",
      ...e.typescale.bodySmallStyle,
    },
    supportingTextBody: { flex: 1 },
    supportingTextCounter: { flexShrink: 0 },
  }));
function lt(e, { once: t = !1 } = {}) {
  const [n, r] = N(),
    [o, i] = N(!1),
    [a, s] = N(!1),
    c = () => o() || (t && a());
  return {
    getIsBusy: c,
    getError: n,
    setError: r,
    execute: async (...d) => {
      if (!c())
        return (
          i(!0),
          r(void 0),
          e(...d)
            .then((g) => {
              g ? r(g) : s(!0);
            })
            .finally(() => {
              i(!1);
            })
        );
    },
  };
}
function ni(e) {
  return pC(e);
}
const mC = "id__";
let yC = 0;
function pC(e) {
  return (e == null ? mC : e) + String(yC++);
}
function vC(e) {
  const t = Y(se),
    { getIsBusy: n, execute: r } = lt(async () => {
      var a;
      await t.core.methods.deleteUserAction(),
        t.core.methods.notifySuccess(h("Account has been marked for deletion")),
        (a = e.onDelete) == null || a.call(e);
    });
  return l(an, {
    get isShown() {
      return e.isShown;
    },
    hasClose: !0,
    get hasCancel() {
      return !n();
    },
    get confirmLabel() {
      return h("Delete");
    },
    confirmButtonColor: "error",
    get isConfirmLoading() {
      return n();
    },
    onCancel: () => {
      var a;
      (a = e.onCancel) == null || a.call(e);
    },
    onConfirm: () => {
      r().catch(t.core.methods.reportErrorAction());
    },
    children: () => [
      l(j, {
        variant: "titleMedium",
        gutterBottom: !0,
        get children() {
          return h("Delete account?");
        },
      }),
      l(Nt, {
        severify: "error",
        get children() {
          return h(
            "This will delete all of your data including feeds, saved articles, and more. This cannot be undone."
          );
        },
      }),
      l(j, {
        variant: "bodySmall",
        color: "onSurfaceVariant",
        get children() {
          return h(
            "When you confirm, your account will be logged out and will be deleted within one day."
          );
        },
      }),
    ],
  });
}
var Bh = w("<div>");
const Eu = "blank-space";
function us(e) {
  const [t, n] = Ve(e, ["class", "levelUp", "transparent", "shadow"]),
    r = (i) => {
      var s;
      i.target &&
        i.target instanceof Element &&
        i.target.closest(`.${Eu}`) &&
        ((s = e.onClickOnBlankSpace) == null || s.call(e));
    },
    o = bC();
  return l(
    zn,
    F(
      {
        component: "nav",
        get class() {
          return H(o().root, e.shadow && o().shadow, t.class);
        },
        get levelUp() {
          return t.levelUp;
        },
        get transparent() {
          return t.transparent;
        },
        get onClick() {
          return e.onClickOnBlankSpace ? r : void 0;
        },
      },
      n
    )
  );
}
const je = ts.medium + 16,
  bC = q((e) => ({
    root: {
      zIndex: kr.APP_BAR,
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: je,
      padding: "0 0.5rem",
      contain: "content",
      transition: `background-color ${he}ms ease`,
    },
    shadow: { boxShadow: e.appBarShadow },
  }));
function Cu() {
  const e = wC();
  return (() => {
    var t = Bh();
    return $(() => I(t, H(Eu, e().root))), t;
  })();
}
const wC = q({
  root: { alignSelf: "stretch", flex: "1 100 1rem", minWidth: "0.5rem" },
});
q({ root: { alignSelf: "stretch", flexShrink: 1, width: "1rem" } });
function Tr(e) {
  const t = SC();
  return (() => {
    var n = Bh();
    return p(n, () => e.children), $(() => I(n, H(Eu, t().root, e.class))), n;
  })();
}
const SC = q(() => ({
  root: {
    flex: "10 10",
    overflow: "hidden",
    alignSelf: "stretch",
    display: "flex",
    alignItems: "center",
  },
}));
function EC(e) {
  const t = CC();
  return l(j, {
    get class() {
      return H(t().root, e.class);
    },
    variant: "titleMedium",
    get children() {
      return e.children;
    },
  });
}
const CC = q(() => ({
  root: { ...yn, margin: 0, padding: "0 0.5rem", maxWidth: "20rem" },
}));
var AC = w("<div><div><div>");
function IC(e) {
  const t = F({ delay: 0 }, e),
    [n, r] = N(!1),
    o = xC();
  let i;
  const a = () => {
    i && (window.clearTimeout(i), (i = void 0));
  };
  return (
    ie(() => {
      a(),
        t.loading
          ? (i = window.setTimeout(() => {
              r(!0);
            }, t.delay))
          : r(!1);
    }),
    (() => {
      var s = AC(),
        c = s.firstChild,
        u = c.firstChild;
      return (
        $(
          (d) => {
            var g = H(o().root, t.class),
              f = H(o().barOuter, n() && o().barMoving),
              m = H(o().bar, n() && o().barWidth);
            return (
              g !== d.e && I(s, (d.e = g)),
              f !== d.t && I(c, (d.t = f)),
              m !== d.a && I(u, (d.a = m)),
              d
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        s
      );
    })()
  );
}
Ft(`
@keyframes LinearProgress-bar-moving {
  0% {
    left:0%;
  }
  100% {
    left:100%;
  }
}

@keyframes LinearProgress-bar-width {
  0% {
    width: 1em;
  }
  100% {
    width: 2em;
  }
}
`);
const xC = q((e) => ({
  root: { position: "relative", height: 2, contain: "strict" },
  barOuter: { position: "absolute", left: 0, top: 0, bottom: 0 },
  bar: {
    margin: "0 auto",
    height: "100%",
    borderRadius: 10,
    background: e.color.primary,
  },
  barMoving: { animation: "LinearProgress-bar-moving 3s linear infinite" },
  barWidth: {
    animation: "LinearProgress-bar-width 1s linear infinite alternate",
  },
}));
function Uh(...e) {
  return fp(e);
}
var kC = w("<div>");
function Lr(e) {
  const [t, n] = N(0);
  let r;
  const o = TC(),
    i = () => t() > 0,
    a = () => {
      const c = r.scrollHeight > r.clientHeight ? r : window;
      xv(c);
    };
  return (
    Lt(() => {
      e.autoFocus && r.focus();
    }),
    Qr(
      "scroll",
      Ls(100, () => {
        const s = r.scrollTop;
        n(s);
      }),
      () => r,
      { passive: !0 }
    ),
    l(
      zn,
      F(
        {
          ref(s) {
            var c = Uh(e.ref, (u) => (r = u));
            typeof c == "function" && c(s);
          },
          get class() {
            return H("app-layout", o().root, e.class);
          },
          get level() {
            return e.level;
          },
          get levelUp() {
            return e.levelUp;
          },
          component: "div",
          "data-app-layout": !0,
          tabIndex: -1,
        },
        () => e.rootProps,
        {
          get children() {
            return [
              L(
                () =>
                  L(() => !!(Av && e.fixPageDown && e.renderTopBar))() &&
                  (() => {
                    var s = kC();
                    return (
                      s.style.setProperty("opacity", "0"),
                      s.style.setProperty("z-index", "0"),
                      s.style.setProperty("position", "fixed"),
                      s.style.setProperty("top", "0"),
                      s.style.setProperty("left", "0"),
                      s.style.setProperty("width", "100%"),
                      `${je}px` != null
                        ? s.style.setProperty("height", `${je}px`)
                        : s.style.removeProperty("height"),
                      s.style.setProperty("pointer-events", "none"),
                      s
                    );
                  })()
              ),
              L(
                () =>
                  L(() => !!e.renderTopBar)() &&
                  l(us, {
                    get class() {
                      return o().topAppBar;
                    },
                    get levelUp() {
                      return e.elevateAppBar && i() ? 2 : 0;
                    },
                    get shadow() {
                      return i();
                    },
                    get transparent() {
                      return L(() => !!e.elevateAppBar)() && i();
                    },
                    onClickOnBlankSpace: a,
                    get children() {
                      return [
                        L(
                          () =>
                            L(() => !!e.renderPreTitle)() && e.renderPreTitle()
                        ),
                        L(() => L(() => !!e.renderTitle)() && e.renderTitle()),
                        L(() => e.renderTopBar()),
                      ];
                    },
                  })
              ),
              l(IC, {
                get class() {
                  return o().progressBar;
                },
                get loading() {
                  return e.loading;
                },
                delay: 500,
              }),
              L(() => e.children),
              L(
                () =>
                  L(() => !!e.renderBottomBar)() &&
                  l(us, {
                    get class() {
                      return o().bottomAppBar;
                    },
                    get children() {
                      return e.renderBottomBar();
                    },
                  })
              ),
            ];
          },
        }
      )
    )
  );
}
const TC = q(() => ({
  root: {
    ...En,
    contain: "strict",
    overflow: "auto",
    overscrollBehavior: "contain",
    outline: "none",
  },
  progressBar: { position: "sticky", top: je, zIndex: 1 },
  topAppBar: { ...Gf, position: "sticky", willChange: "transform" },
  bottomAppBar: { flexShrink: 0 },
}));
var LC = w("<div>");
function Gt(e) {
  const [t, n] = Ve(F({ size: "wide", center: !1 }, e), [
      "center",
      "class",
      "size",
      "fullHeight",
      "hasAppBar",
    ]),
    r = PC(),
    o = () => r()[t.size];
  return (() => {
    var i = LC();
    return (
      Je(
        i,
        F(
          {
            get class() {
              return H(
                r().common,
                t.center && r().center,
                t.fullHeight && t.hasAppBar && r().fullHeightWithAppBar,
                o(),
                t.class
              );
            },
          },
          n
        ),
        !1,
        !1
      ),
      i
    );
  })();
}
const PC = q({
  common: {
    boxSizing: "border-box",
    paddingTop: "1rem",
    paddingLeft: "1rem",
    paddingRight: "1rem",
    paddingBottom: "1.5rem",
  },
  fullHeightWithAppBar: {
    height: `calc(100vh - ${je}px - 2px)`,
    display: "flex",
    flexDirection: "column",
  },
  center: { margin: "0 auto 0" },
  full: {},
  wide: { maxWidth: 960 },
  medium: { maxWidth: 680 },
  narrow: { [Nv]: { maxWidth: "360px" } },
});
function Kt(e, t = !0) {
  if (Kr) return;
  const n = document.title;
  ie(() => {
    document.title = e();
  }),
    De(() => {
      t && (document.title = n);
    });
}
function Au(e) {
  const [t, n] = N(e);
  return [
    t,
    (o) => {
      const i = t();
      return n(typeof o == "boolean" ? o : !i), i;
    },
  ];
}
function MC(e) {
  return typeof e == "function";
}
function Iu() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
function $C(e, t) {
  return (
    t && (MC(t) ? t(e) : t[0](t[1], e)), e == null ? void 0 : e.defaultPrevented
  );
}
var vt = ((e) => (
  (e[(e.LEFT = 0)] = "LEFT"),
  (e[(e.RIGHT = 1)] = "RIGHT"),
  (e[(e.UP = 2)] = "UP"),
  (e[(e.DOWN = 3)] = "DOWN"),
  e
))(vt || {});
const cg = 15;
class RC {
  constructor(t, n) {
    Te(this, "isMultiTouch");
    Te(this, "startPointX", 0);
    Te(this, "startPointY", 0);
    Te(this, "isPan", !1);
    Te(this, "lastPanPosition");
    Te(this, "lastPinchLength");
    Te(this, "lastPinchCenter");
    Te(this, "lastPointDown");
    Te(this, "moveHistory", []);
    Te(this, "tapCount", 0);
    Te(this, "pointers", []);
    Te(this, "isPointerDown", !1);
    Te(this, "singleTapTimeoutId");
    Te(this, "longTapTimeoutId");
    Te(this, "handlePointerDownEvent", (t) => {
      var n, r;
      (t.pointerType === "mouse" && t.button !== 0) ||
        ((r = (n = this.options).pointerdown) == null || r.call(n, t),
        this.pointers.push(t),
        this.clearSingleTapTimeout(),
        this.clearLongTapTimeout(),
        (this.moveHistory.length = 0),
        this.pointers.length === 1
          ? ((this.isPointerDown = !0),
            (t.target && t.target instanceof HTMLElement
              ? t.target
              : this.element
            ).setPointerCapture(t.pointerId),
            (this.startPointX = this.point1.x),
            (this.startPointY = this.point1.y),
            (this.isPan = !1),
            (this.lastPanPosition = void 0),
            this.tapCount++,
            (!this.lastPointDown ||
              Math.abs(this.point1.x - this.lastPointDown.x) > 30 ||
              Math.abs(this.point1.y - this.lastPointDown.y) > 30) &&
              (this.tapCount = 1),
            this.tapCount === 1 &&
              (this.longTapTimeoutId = window.setTimeout(() => {
                var i, a;
                (this.tapCount = 0),
                  (a = (i = this.options).longTap) == null || a.call(i, t);
              }, 500)))
          : this.pointers.length === 2 &&
            ((this.tapCount = 0),
            (this.lastPinchLength = Ul(this.point1, this.point2)),
            (this.lastPinchCenter = void 0)),
        (this.lastPointDown = this.point1));
    });
    Te(this, "handlePointerMoveEvent", (t) => {
      var r, o, i, a, s, c, u, d, g;
      if (!this.isPointerDown || (Bf && t.x < -50)) return;
      (o = (r = this.options).pointermove) == null || o.call(r, t),
        this.modifyPointers(t, "update");
      const n = { x: this.pointers[0].clientX, y: this.pointers[0].clientY };
      if (this.pointers.length === 1) {
        const f = this.getPanProperties(t);
        if (
          (!this.isPan &&
            f.distance > ((i = this.options.panThreshold) != null ? i : 15) &&
            ((this.isPan = !0),
            (this.tapCount = 0),
            this.clearLongTapTimeout(),
            (s = (a = this.options).panStart) == null || s.call(a, t, f)),
          this.isPan)
        ) {
          (u = (c = this.options).panMove) == null || u.call(c, t, f),
            (this.lastPanPosition = { x: n.x, y: n.y });
          const m = this.moveHistory[this.moveHistory.length - 1];
          if (m == null || Date.now() - m.time > cg)
            for (
              this.moveHistory.push({
                ...this.point1,
                time: Date.now(),
                pointerId: this.pointers[0].pointerId,
              });
              this.moveHistory.length > 1e3 / cg;

            )
              this.moveHistory.shift();
        }
      } else if (this.pointers.length === 2) {
        const f = { x: this.pointers[1].clientX, y: this.pointers[1].clientY },
          m = DC(n, f);
        this.lastPinchLength != null &&
          ((g = (d = this.options).pinch) == null ||
            g.call(d, t, {
              centerX: m.x,
              centerY: m.y,
              centerDeltaX: this.lastPinchCenter
                ? m.x - this.lastPinchCenter.x
                : 0,
              centerDeltaY: this.lastPinchCenter
                ? m.y - this.lastPinchCenter.y
                : 0,
              scale: Math.min(10, Ul(n, f) / this.lastPinchLength),
            })),
          (this.lastPinchLength = Ul(n, f)),
          (this.lastPinchCenter = m),
          (this.lastPanPosition = void 0);
      }
    });
    Te(this, "handlePointerUpEvent", (t) => {
      var n, r, o, i, a, s, c, u;
      this.isPointerDown &&
        ((r = (n = this.options).pointerup) == null || r.call(n, t),
        this.modifyPointers(t, "delete"),
        this.clearLongTapTimeout(),
        this.pointers.length === 0 &&
          ((this.isPointerDown = !1),
          this.tapCount === 0
            ? this.isPan &&
              ((i = (o = this.options).panEnd) == null ||
                i.call(o, t, this.getPanProperties(t)))
            : t.defaultPrevented ||
              ((s = (a = this.options).tap) == null || s.call(a, t),
              this.tapCount === 1
                ? (this.singleTapTimeoutId = window.setTimeout(() => {
                    var d, g;
                    (this.tapCount = 0),
                      (g = (d = this.options).singleTap) == null ||
                        g.call(d, t);
                  }, 250))
                : this.tapCount > 1 &&
                  ((this.tapCount = 0),
                  (u = (c = this.options).doubleTap) == null ||
                    u.call(c, t)))));
    });
    Te(this, "handlePointerCancelEvent", (t) => {
      var n, r;
      (this.isPointerDown = !1),
        (r = (n = this.options).pointercancel) == null || r.call(n, t),
        (this.tapCount = 0),
        this.clearLongTapTimeout(),
        (this.pointers.length = 0);
    });
    Te(this, "handleWheelEvent", (t) => {
      var n, r;
      (r = (n = this.options).wheel) == null ||
        r.call(n, t, { scale: t.deltaY > 0 ? 1 / 1.1 : 1.1 });
    });
    (this.element = t),
      (this.options = n),
      (this.isMultiTouch = n.pinch != null),
      this.bindEventListener();
  }
  modifyPointers(t, n) {
    for (let r = 0; r < this.pointers.length; r++)
      this.pointers[r].pointerId === t.pointerId &&
        (n === "update"
          ? (this.pointers[r] = t)
          : n === "delete" && this.pointers.splice(r, 1));
  }
  get point1() {
    return { x: this.pointers[0].clientX, y: this.pointers[0].clientY };
  }
  get point2() {
    return { x: this.pointers[1].clientX, y: this.pointers[1].clientY };
  }
  getPanProperties(t) {
    const n = t.clientX - this.startPointX,
      r = t.clientY - this.startPointY,
      o = Math.abs(n),
      i = Math.abs(r),
      a = Math.hypot(o, i),
      s = gs(ds(n, r)),
      c = gs(ds(n, r), 20),
      u = this.lastPanPosition ? t.clientX - this.lastPanPosition.x : 0,
      d = this.lastPanPosition ? t.clientY - this.lastPanPosition.y : 0;
    let g = 0,
      f = 0,
      m = 0,
      y = 0;
    const b = this.moveHistory.find(
      (v) => v.pointerId === t.pointerId && v.time > Date.now() - 250
    );
    if (b) {
      const v = Date.now() - b.time;
      if (v > 0) {
        const S = t.clientX - b.x,
          A = t.clientY - b.y;
        (g = Math.round((S / v) * 100) / 100),
          (f = Math.round((A / v) * 100) / 100),
          (m = Math.abs(g)),
          (y = Math.abs(f));
      }
    }
    return {
      direction: s,
      directionForHSwiping: c,
      displacementX: n,
      displacementY: r,
      distanceX: o,
      distanceY: i,
      distance: a,
      deltaX: u,
      deltaY: d,
      speedX: g,
      speedY: f,
      velocityX: m,
      velocityY: y,
    };
  }
  clearSingleTapTimeout() {
    this.singleTapTimeoutId &&
      (clearTimeout(this.singleTapTimeoutId),
      (this.singleTapTimeoutId = void 0));
  }
  clearLongTapTimeout() {
    this.longTapTimeoutId &&
      (clearTimeout(this.longTapTimeoutId), (this.longTapTimeoutId = void 0));
  }
  bindEventListener() {
    this.element.addEventListener("pointerdown", this.handlePointerDownEvent),
      this.element.addEventListener("pointermove", this.handlePointerMoveEvent),
      this.element.addEventListener("pointerup", this.handlePointerUpEvent),
      this.element.addEventListener(
        "pointercancel",
        this.handlePointerCancelEvent
      ),
      this.element.addEventListener("wheel", this.handleWheelEvent);
  }
  unbindEventListener() {
    this.element.removeEventListener(
      "pointerdown",
      this.handlePointerDownEvent
    ),
      this.element.removeEventListener(
        "pointermove",
        this.handlePointerMoveEvent
      ),
      this.element.removeEventListener("pointerup", this.handlePointerUpEvent),
      this.element.removeEventListener(
        "pointercancel",
        this.handlePointerCancelEvent
      ),
      this.element.removeEventListener("wheel", this.handleWheelEvent);
  }
  reset() {
    (this.isPointerDown = !1),
      (this.pointers.length = 0),
      this.clearSingleTapTimeout(),
      this.clearLongTapTimeout();
  }
  destroy() {
    this.unbindEventListener();
  }
}
function DC(e, t) {
  const n = (e.x + t.x) / 2,
    r = (e.y + t.y) / 2;
  return { x: n, y: r };
}
function Ul(e, t) {
  const n = e.x - t.x,
    r = e.y - t.y;
  return Math.hypot(n, r);
}
function ds(e, t) {
  let r = (Math.atan2(t, e) * 180) / Math.PI;
  return r > 360 && (r -= 360), r < 0 && (r += 360), r;
}
function gs(e, t = 0) {
  return e >= 45 - t && e < 135 + t
    ? 2
    : e >= 135 + t && e < 225 - t
    ? 0
    : e >= 225 - t && e < 315 + t
    ? 3
    : 1;
}
const ug = 15;
class _C {
  constructor(t, n) {
    Te(this, "startPointX", 0);
    Te(this, "startPointY", 0);
    Te(this, "isPan", !1);
    Te(this, "lastTouch");
    Te(this, "moveHistory", []);
    Te(this, "isPointerDown", !1);
    Te(this, "handleTouchStartEvent", (t) => {
      var r, o;
      (o = (r = this.options).touchstart) == null || o.call(r, t);
      const n = dg(t);
      if (!n) {
        this.cancel();
        return;
      }
      (this.moveHistory.length = 0),
        (this.isPointerDown = !0),
        (this.startPointX = n.clientX),
        (this.startPointY = n.clientY),
        (this.isPan = !1),
        (this.lastTouch = void 0);
    });
    Te(this, "handleTouchMoveEvent", (t) => {
      var o, i, a, s, c, u, d;
      if (
        ((i = (o = this.options).touchmove) == null || i.call(o, t),
        !this.isPointerDown)
      )
        return;
      const n = dg(t);
      if (!n) return;
      if (Bf && n.clientX < -50) {
        this.cancel();
        return;
      }
      const r = this.getPanProperties(n);
      if (
        (!this.isPan &&
          r.distance > ((a = this.options.panThreshold) != null ? a : 15) &&
          ((this.isPan = !0),
          (c = (s = this.options).panStart) == null || c.call(s, t, r)),
        this.isPan)
      ) {
        (d = (u = this.options).panMove) == null || d.call(u, t, r),
          (this.lastTouch = n);
        const g = this.moveHistory[this.moveHistory.length - 1];
        if (g == null || Date.now() - g.time > ug)
          for (
            this.moveHistory.push({
              x: n.clientX,
              y: n.clientY,
              time: Date.now(),
            });
            this.moveHistory.length > 1e3 / ug;

          )
            this.moveHistory.shift();
      }
    });
    Te(this, "handleTouchEndEvent", (t) => {
      var n, r, o, i;
      (r = (n = this.options).touchend) == null || r.call(n, t),
        this.isPointerDown &&
          ((this.isPointerDown = !1),
          this.isPan &&
            (W(this.lastTouch),
            (i = (o = this.options).panEnd) == null ||
              i.call(o, t, this.getPanProperties(this.lastTouch))));
    });
    Te(this, "handleTouchCancelEvent", (t) => {
      var n, r;
      (r = (n = this.options).touchcancel) == null || r.call(n, t),
        this.cancel();
    });
    (this.element = t), (this.options = n), this.bindEventListener();
  }
  getPanProperties(t) {
    W(t);
    const n = t.clientX - this.startPointX,
      r = t.clientY - this.startPointY,
      o = Math.abs(n),
      i = Math.abs(r),
      a = Math.hypot(o, i),
      s = gs(ds(n, r)),
      c = gs(ds(n, r), 20),
      u = this.lastTouch ? t.clientX - this.lastTouch.clientX : 0,
      d = this.lastTouch ? t.clientY - this.lastTouch.clientY : 0;
    let g = 0,
      f = 0,
      m = 0,
      y = 0;
    const b = this.moveHistory.find((v) => v.time > Date.now() - 250);
    if (b) {
      const v = Date.now() - b.time;
      if (v > 0) {
        const S = t.clientX - b.x,
          A = t.clientY - b.y;
        (g = Math.round((S / v) * 100) / 100),
          (f = Math.round((A / v) * 100) / 100),
          (m = Math.abs(g)),
          (y = Math.abs(f));
      }
    }
    return {
      direction: s,
      directionForHSwiping: c,
      displacementX: n,
      displacementY: r,
      distanceX: o,
      distanceY: i,
      distance: a,
      deltaX: u,
      deltaY: d,
      speedX: g,
      speedY: f,
      velocityX: m,
      velocityY: y,
    };
  }
  bindEventListener() {
    this.element.addEventListener("touchstart", this.handleTouchStartEvent),
      this.element.addEventListener("touchmove", this.handleTouchMoveEvent),
      this.element.addEventListener("touchend", this.handleTouchEndEvent),
      this.element.addEventListener("touchcancel", this.handleTouchCancelEvent);
  }
  unbindEventListener() {
    this.element.removeEventListener("touchstart", this.handleTouchStartEvent),
      this.element.removeEventListener("touchmove", this.handleTouchMoveEvent),
      this.element.removeEventListener("touchend", this.handleTouchEndEvent),
      this.element.removeEventListener(
        "touchcancel",
        this.handleTouchCancelEvent
      );
  }
  cancel() {
    var t, n;
    this.isPointerDown &&
      ((n = (t = this.options).panCancel) == null || n.call(t)),
      (this.isPointerDown = !1);
  }
  destroy() {
    this.unbindEventListener();
  }
}
function dg(e) {
  return e.touches.length === 1 && e.touches.length === e.targetTouches.length
    ? e.targetTouches[0]
    : void 0;
}
var OC = w("<div><div>"),
  gg = w("<div>");
const zh = "data-is-swipeable-item";
function NC(e) {
  const [t, n] = Ve(e, [
      "ref",
      "class",
      "contentClassName",
      "layerBackground",
      "leftActionIcon",
      "leftActiveActionIcon",
      "rightActionIcon",
      "rightActiveActionIcon",
      "leftActionColor",
      "rightActionColor",
      "isLeftActionDisabled",
      "isRightActionDisabled",
      "onLeftAction",
      "onRightAction",
      "onTap",
      "children",
    ]),
    [r, o] = N(),
    [i, a] = N(!1);
  let s,
    c,
    u = !1;
  const d = FC(),
    g = () => {
      (u = !0), o(), (s.style.willChange = "transform");
    },
    f = (S) => {
      a(S.detail.isActive),
        o(
          S.detail.isActive &&
            S.detail.direction === vt.RIGHT &&
            !t.isLeftActionDisabled
            ? 0
            : S.detail.isActive &&
              S.detail.direction === vt.LEFT &&
              !t.isRightActionDisabled
            ? 1
            : void 0
        );
      const A = Math.max(
        t.rightActionIcon ? -Oo : 0,
        Math.min(t.leftActionIcon ? Oo : 0, S.detail.displacementX)
      );
      (c.style.transition = ""), (c.style.transform = `translate(${A}px, 0)`);
    },
    m = (S) => {
      var A, k;
      (c.style.transition = "transform 500ms"),
        (c.style.transform = "translate(0, 0)"),
        b(),
        r() === 0
          ? (A = t.onLeftAction) == null || A.call(t)
          : r() === 1 && ((k = t.onRightAction) == null || k.call(t));
    },
    y = () => {
      o(),
        (c.style.transition = "transform 500ms"),
        (c.style.transform = "translate(0, 0)"),
        b();
    },
    b = () => {
      (u = !1),
        c.addEventListener("transitionend", v, { once: !0 }),
        c.addEventListener("transitioncancel", v, { once: !0 });
    },
    v = () => {
      u || ((s.style.willChange = ""), o());
    };
  return l(Ir, {
    component: "div",
    get class() {
      return H(d().root, t.class);
    },
    get layerBackground() {
      return t.layerBackground;
    },
    disableFocusBackground: !0,
    get componentProps() {
      return {
        ref: (S) => {
          (s = S), typeof t.ref == "function" ? t.ref(S) : (t.ref = S);
        },
        style: "overflow: hidden",
        [zh]: !0,
        "on:Tap": t.onTap,
        "on:SwipeStart": g,
        "on:SwipeMove": f,
        "on:SwipeEnd": m,
        "on:SwipeCancel": y,
        ...n,
      };
    },
    get children() {
      var S = OC(),
        A = S.firstChild,
        k = c;
      return (
        typeof k == "function" ? tt(k, S) : (c = S),
        p(
          S,
          l(D, {
            get when() {
              return (
                L(() => !t.isLeftActionDisabled)() &&
                ((i() && t.leftActiveActionIcon) || t.leftActionIcon)
              );
            },
            keyed: !0,
            children: (T) =>
              (() => {
                var E = gg();
                return (
                  p(E, l(jt, { component: T, size: 24 })),
                  $(() =>
                    I(
                      E,
                      H(
                        d().action,
                        d().leftAction,
                        r() === 0 && d().actionActive,
                        r() === 0 && { background: t.leftActionColor }
                      )
                    )
                  ),
                  E
                );
              })(),
          }),
          A
        ),
        p(A, () => t.children),
        p(
          S,
          l(D, {
            get when() {
              return (
                L(() => !t.isRightActionDisabled)() &&
                ((i() && t.rightActiveActionIcon) || t.rightActionIcon)
              );
            },
            keyed: !0,
            children: (T) =>
              (() => {
                var E = gg();
                return (
                  p(E, l(jt, { component: T, size: 24 })),
                  $(() =>
                    I(
                      E,
                      H(
                        d().action,
                        d().rightAction,
                        r() === 1 && d().actionActive,
                        r() === 1 && { background: t.rightActionColor }
                      )
                    )
                  ),
                  E
                );
              })(),
          }),
          null
        ),
        $(
          (T) => {
            var E = d().inner,
              P = H(d().content, t.contentClassName);
            return (
              E !== T.e && I(S, (T.e = E)), P !== T.t && I(A, (T.t = P)), T
            );
          },
          { e: void 0, t: void 0 }
        ),
        S
      );
    },
  });
}
const FC = q((e) => ({
  root: { overflow: "hidden", userSelect: "none" },
  inner: { display: "flex" },
  content: { flex: 1, overflow: "hidden" },
  action: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: Oo,
    background: e.color.surfaceVariant,
    color: e.color.onSurfaceVariant,
    transition: "background-color 300ms",
  },
  actionActive: { color: e.color.onPrimary },
  leftAction: { marginLeft: -Oo },
  rightAction: { marginRight: -Oo },
}));
var fg = w("<div>"),
  BC = w("<div><div>"),
  UC = w("<div data-is=swipe-action-view>");
const Rc = "data-disable-tap-event",
  Oo = 64;
function Ns(e) {
  const [t, n] = Ve(e, [
      "leftActionIcon",
      "rightActionIcon",
      "onLeftAction",
      "onRightAction",
      "viewSwipeDisabled",
      "viewEl",
      "onViewSwipeStart",
      "onViewSwipeLeftEnd",
      "onViewSwipeRightEnd",
      "onViewSwipeMove",
      "onViewSwipeCancel",
      "childLeftAction",
      "childRightAction",
      "disabled",
      "class",
      "onClick",
      "children",
    ]),
    [r, o] = N(!1);
  let i,
    a,
    s,
    c,
    u = !1,
    d,
    g,
    f;
  const m = (A) => {
      if (!A.target || !(A.target instanceof HTMLElement)) return;
      const k = A.target.closest(`[${zh}]`);
      return k != null ? k : void 0;
    },
    y = (A) => {
      $C(A, t.onClick), b();
      const k = m(A);
      !k ||
        (A.target instanceof HTMLElement &&
          A.target.closest(`[${Rc}]`) != null) ||
        k.dispatchEvent(new CustomEvent("Tap", { detail: A }));
    },
    b = () => {
      var A;
      (u = !1),
        g === 1
          ? t.viewSwipeDisabled ||
            (A = t.onViewSwipeCancel) == null ||
            A.call(t)
          : g === 0
          ? (o(!1),
            s &&
              ((s.style.transition = "transform 500ms"),
              (s.style.transform = "translateX(0)"),
              (s.ontransitionend = () => {
                a && (a.style.display = "none");
              })))
          : g === 2 &&
            f &&
            (f == null || f.dispatchEvent(new CustomEvent("SwipeCancel")),
            (f = void 0));
    };
  Lt(() => {
    c = new _C(i, {
      panThreshold: 20,
      panStart(A, k) {
        var T;
        t.disabled ||
          HC(i, A) ||
          ![vt.LEFT, vt.RIGHT].includes(k.directionForHSwiping) ||
          ((d = k.directionForHSwiping),
          (g =
            (d === vt.RIGHT && t.onLeftAction) ||
            (d === vt.LEFT && t.onRightAction)
              ? 0
              : (d === vt.RIGHT && t.onViewSwipeRightEnd) ||
                (d === vt.LEFT && t.onViewSwipeLeftEnd)
              ? 1
              : (d === vt.RIGHT && t.childLeftAction) ||
                (d === vt.LEFT && t.childRightAction)
              ? 2
              : void 0),
          g != null &&
            ((u = !0),
            o(!1),
            g === 1
              ? (T = t.onViewSwipeStart) == null || T.call(t)
              : g === 2 &&
                ((f = m(A)),
                f == null || f.dispatchEvent(new CustomEvent("SwipeStart")))));
      },
      panMove(A, k) {
        var P;
        if (!u) return;
        if (
          (W(d != null),
          A.preventDefault(),
          g !== 1 && k.direction !== vt.LEFT && k.direction !== vt.RIGHT)
        ) {
          b();
          return;
        }
        const T = g === 1 ? 1 : 0.75;
        let E = k.displacementX * T;
        if (
          ((E =
            d === vt.LEFT
              ? Math.min(E, 0)
              : d === vt.RIGHT
              ? Math.max(E, 0)
              : E),
          g === 1)
        )
          t.viewSwipeDisabled ||
            (P = t.onViewSwipeMove) == null ||
            P.call(t, E);
        else {
          const M = g === 2 ? Oo : Fa,
            x = Math.min(M, Math.max(-M, E)),
            _ = E <= -M || E >= M;
          g === 2
            ? f &&
              f.dispatchEvent(
                new CustomEvent("SwipeMove", {
                  detail: { displacementX: E, isActive: _, direction: d },
                })
              )
            : g === 0 &&
              (o(_),
              s &&
                (v(),
                (s.style.transition = "background-color 200ms"),
                (s.style.transform = `translateX(${x}px)`)));
        }
      },
      panEnd(A, k) {
        var T, E;
        u &&
          ((u = !1),
          g === 1
            ? t.viewSwipeDisabled ||
              (t.onViewSwipeRightEnd
                ? k.displacementX > 64 && k.speedX >= -0.25
                  ? t.onViewSwipeRightEnd()
                  : (T = t.onViewSwipeCancel) == null || T.call(t)
                : t.onViewSwipeLeftEnd &&
                  (k.displacementX < -64 && k.speedX <= 0.25
                    ? t.onViewSwipeLeftEnd()
                    : (E = t.onViewSwipeCancel) == null || E.call(t)))
            : g === 0
            ? r()
              ? (setTimeout(() => {
                  o(!1), a && (a.style.display = "none");
                }, 250),
                requestAnimationFrame(() => {
                  var P, M;
                  d === vt.RIGHT
                    ? (P = t.onLeftAction) == null || P.call(t)
                    : d === vt.LEFT &&
                      ((M = t.onRightAction) == null || M.call(t));
                }))
              : b()
            : g === 2 &&
              f &&
              f.dispatchEvent(
                new CustomEvent("SwipeEnd", {
                  detail: { displacementX: k.displacementX },
                })
              ));
      },
      panCancel() {
        u && ((u = !1), b());
      },
    });
  });
  const v = () => {
    var T, E;
    if (!a) return;
    const { left: A, right: k } =
      (E =
        (T = t.viewEl) == null ? void 0 : T.call(t).getBoundingClientRect()) !=
      null
        ? E
        : { left: 0, right: 0 };
    (a.style.display = "block"),
      (a.style.left = `${A}px`),
      (a.style.width = `${k - A}px`);
  };
  De(() => {
    c == null || c.destroy();
  });
  const S = zC();
  return (() => {
    var A = UC();
    A.$$click = y;
    var k = i;
    return (
      typeof k == "function" ? tt(k, A) : (i = A),
      Je(
        A,
        F(
          {
            get class() {
              return H(S().root, t.class);
            },
          },
          n
        ),
        !1,
        !0
      ),
      p(A, () => t.children, null),
      p(
        A,
        l(D, {
          get when() {
            return (
              navigator.maxTouchPoints > 0 &&
              (t.leftActionIcon || t.rightActionIcon)
            );
          },
          get children() {
            return l(na, {
              get children() {
                var T = BC(),
                  E = T.firstChild,
                  P = a;
                typeof P == "function" ? tt(P, T) : (a = T);
                var M = s;
                return (
                  typeof M == "function" ? tt(M, E) : (s = E),
                  p(
                    E,
                    l(D, {
                      get when() {
                        return t.leftActionIcon;
                      },
                      get children() {
                        var x = fg();
                        return (
                          p(
                            x,
                            l(jt, {
                              get component() {
                                return t.leftActionIcon;
                              },
                              get class() {
                                return S().icon;
                              },
                            })
                          ),
                          $(() =>
                            I(
                              x,
                              H(
                                S().marker,
                                S().markerLeft,
                                r() && S().markerActive
                              )
                            )
                          ),
                          x
                        );
                      },
                    }),
                    null
                  ),
                  p(
                    E,
                    l(D, {
                      get when() {
                        return t.rightActionIcon;
                      },
                      get children() {
                        var x = fg();
                        return (
                          p(
                            x,
                            l(jt, {
                              get component() {
                                return t.rightActionIcon;
                              },
                              get class() {
                                return S().icon;
                              },
                            })
                          ),
                          $(() =>
                            I(
                              x,
                              H(
                                S().marker,
                                S().markerRight,
                                r() && S().markerActive
                              )
                            )
                          ),
                          x
                        );
                      },
                    }),
                    null
                  ),
                  $(
                    (x) => {
                      var _ = S().markerContainer,
                        R = S().markerContainerInner;
                      return (
                        _ !== x.e && I(T, (x.e = _)),
                        R !== x.t && I(E, (x.t = R)),
                        x
                      );
                    },
                    { e: void 0, t: void 0 }
                  ),
                  T
                );
              },
            });
          },
        }),
        null
      ),
      A
    );
  })();
}
const Fa = 64,
  zl = 128,
  zC = q((e) => ({
    root: {},
    markerContainer: {
      overflow: "hidden",
      position: "fixed",
      height: zl,
      top: `calc(50vh - ${zl / 2}px - ${je / 2}px)`,
      pointerEvents: "none",
    },
    markerContainerInner: {
      position: "absolute",
      width: `calc(100% + ${Fa}px * 2)`,
      left: -Fa,
      top: 0,
      bottom: 0,
    },
    marker: {
      position: "absolute",
      top: 0,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: Fa,
      height: zl,
      background: e.color.primaryContainer,
      color: e.color.onSurface,
    },
    markerLeft: {
      left: 0,
      borderRadius: `0 ${e.sharp.full} ${e.sharp.full} 0`,
      " svg": { marginLeft: "-0.65rem" },
    },
    markerRight: {
      right: 0,
      borderRadius: `${e.sharp.full} 0 0 ${e.sharp.full}`,
      " svg": { marginRight: "-0.65rem" },
    },
    markerActive: { background: e.color.primary, color: e.color.onPrimary },
    icon: { width: "2rem", height: "2rem" },
  }));
function HC(e, t) {
  const n = t.target;
  if (n === e) return !1;
  const r = (i) => {
    const a = window.getComputedStyle(i).overflowX;
    return a !== "visible" && a !== "hidden" && i.scrollWidth > i.clientWidth;
  };
  if (r(n)) return !0;
  let o = n.parentElement;
  for (; o && o !== e; ) {
    if (r(o)) return !0;
    o = o.parentElement;
  }
  return !1;
}
Bn(["click"]);
function fs(e) {
  const t = () => {
      const a = e();
      return a ? { width: a.clientWidth, height: a.clientHeight } : void 0;
    },
    [n, r] = N(t()),
    o = Ls(150, r, { noLeading: !1, noTrailing: !1 }),
    i = new ResizeObserver((a) => {
      for (const s of a)
        if (s.target === e()) {
          o(t());
          break;
        }
    });
  return (
    ie(() => {
      i.disconnect();
      const a = e();
      a && i.observe(a);
    }),
    De(() => {
      i.disconnect();
    }),
    n
  );
}
var Hh = ((e) => ((e[(e.LEFT = 0)] = "LEFT"), (e[(e.RIGHT = 1)] = "RIGHT"), e))(
  Hh || {}
);
function Vh(e) {
  const t = F({ width: 260, position: 0, unmountOnExit: !0 }, e);
  let n;
  const r = VC();
  return l(Lh, {
    get isShown() {
      return t.isShown;
    },
    get unmountOnExit() {
      return t.unmountOnExit;
    },
    onExited: () => {
      var i;
      (i = t.onCloseComplete) == null || i.call(t),
        n.contains(document.activeElement) && Pv();
    },
    get onEntered() {
      return t.onOpenComplete;
    },
    get onClose() {
      return t.onClose;
    },
    children: (i) =>
      l(zn, {
        level: 2,
        ref(a) {
          var s = n;
          typeof s == "function" ? s(a) : (n = a);
        },
        get class() {
          return H(
            r().pane,
            t.class,
            r()[t.position],
            i.getState() === Et.ENTERING && r()[`${t.position}-entering`],
            i.getState() === Et.EXITING && r()[`${t.position}-exiting`],
            i.getState() === Et.EXITED && r().hidden
          );
        },
        get style() {
          return { width: `${t.width}px` };
        },
        tabIndex: -1,
        get children() {
          return e.children(i);
        },
      }),
  });
}
Ft(`
@keyframes SideSheet-anchoredLeftSlideInAnimation {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes SideSheet-anchoredLeftSlideOutAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
@keyframes SideSheet-anchoredRightSlideInAnimation {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
}
@keyframes SideSheet-anchoredRightSlideOutAnimation {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
}
`);
const VC = q((e) => ({
  pane: {
    contain: "strict",
    position: "fixed",
    ...e.elevationShadowStyle(1),
    overflow: "hidden auto",
    overscrollBehavior: "contain",
    boxShadow: e.swipeableViewShadow,
    scrollbarWidth: "thin",
    ...ru(e, !0),
  },
  hidden: { left: "-100%" },
  0: { height: "100%", maxWidth: "82vw", left: 0, right: "auto" },
  "0-entering": {
    animation: `SideSheet-anchoredLeftSlideInAnimation ${yr}ms ${ue} both`,
  },
  "0-exiting": {
    animation: `SideSheet-anchoredLeftSlideOutAnimation ${yr}ms ${ue} both`,
  },
  1: { height: "100%", maxWidth: "82vw", right: 0, left: "auto" },
  "1-entering": {
    animation: `SideSheet-anchoredRightSlideInAnimation ${yr}ms ${ue} both`,
  },
  "1-exiting": {
    animation: `SideSheet-anchoredRightSlideOutAnimation ${yr}ms ${ue} both`,
  },
}));
let WC = () => ({
  emit(e, ...t) {
    for (let n = 0, r = this.events[e] || [], o = r.length; n < o; n++)
      r[n](...t);
  },
  events: {},
  on(e, t) {
    var n;
    return (
      ((n = this.events)[e] || (n[e] = [])).push(t),
      () => {
        var r;
        this.events[e] =
          (r = this.events[e]) == null ? void 0 : r.filter((o) => t !== o);
      }
    );
  },
});
const Jr = WC();
function xu(e, t) {
  const n = Jr.on(e, t);
  De(n);
}
const hs = Math.min,
  qr = Math.max,
  ms = Math.round,
  Aa = Math.floor,
  br = (e) => ({ x: e, y: e }),
  GC = { left: "right", right: "left", bottom: "top", top: "bottom" },
  jC = { start: "end", end: "start" };
function hg(e, t, n) {
  return qr(e, hs(t, n));
}
function zo(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function wr(e) {
  return e.split("-")[0];
}
function Fs(e) {
  return e.split("-")[1];
}
function ku(e) {
  return e === "x" ? "y" : "x";
}
function Wh(e) {
  return e === "y" ? "height" : "width";
}
function ra(e) {
  return ["top", "bottom"].includes(wr(e)) ? "y" : "x";
}
function Gh(e) {
  return ku(ra(e));
}
function YC(e, t, n) {
  n === void 0 && (n = !1);
  const r = Fs(e),
    o = Gh(e),
    i = Wh(o);
  let a =
    o === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
      ? "bottom"
      : "top";
  return t.reference[i] > t.floating[i] && (a = ys(a)), [a, ys(a)];
}
function qC(e) {
  const t = ys(e);
  return [Dc(e), t, Dc(t)];
}
function Dc(e) {
  return e.replace(/start|end/g, (t) => jC[t]);
}
function XC(e, t, n) {
  const r = ["left", "right"],
    o = ["right", "left"],
    i = ["top", "bottom"],
    a = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? o : r) : t ? r : o;
    case "left":
    case "right":
      return t ? i : a;
    default:
      return [];
  }
}
function KC(e, t, n, r) {
  const o = Fs(e);
  let i = XC(wr(e), n === "start", r);
  return (
    o && ((i = i.map((a) => a + "-" + o)), t && (i = i.concat(i.map(Dc)))), i
  );
}
function ys(e) {
  return e.replace(/left|right|bottom|top/g, (t) => GC[t]);
}
function ZC(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function QC(e) {
  return typeof e != "number"
    ? ZC(e)
    : { top: e, right: e, bottom: e, left: e };
}
function ps(e) {
  return {
    ...e,
    top: e.y,
    left: e.x,
    right: e.x + e.width,
    bottom: e.y + e.height,
  };
}
function mg(e, t, n) {
  let { reference: r, floating: o } = e;
  const i = ra(t),
    a = Gh(t),
    s = Wh(a),
    c = wr(t),
    u = i === "y",
    d = r.x + r.width / 2 - o.width / 2,
    g = r.y + r.height / 2 - o.height / 2,
    f = r[s] / 2 - o[s] / 2;
  let m;
  switch (c) {
    case "top":
      m = { x: d, y: r.y - o.height };
      break;
    case "bottom":
      m = { x: d, y: r.y + r.height };
      break;
    case "right":
      m = { x: r.x + r.width, y: g };
      break;
    case "left":
      m = { x: r.x - o.width, y: g };
      break;
    default:
      m = { x: r.x, y: r.y };
  }
  switch (Fs(t)) {
    case "start":
      m[a] -= f * (n && u ? -1 : 1);
      break;
    case "end":
      m[a] += f * (n && u ? -1 : 1);
      break;
  }
  return m;
}
const JC = async (e, t, n) => {
  const {
      placement: r = "bottom",
      strategy: o = "absolute",
      middleware: i = [],
      platform: a,
    } = n,
    s = i.filter(Boolean),
    c = await (a.isRTL == null ? void 0 : a.isRTL(t));
  let u = await a.getElementRects({ reference: e, floating: t, strategy: o }),
    { x: d, y: g } = mg(u, r, c),
    f = r,
    m = {},
    y = 0;
  for (let b = 0; b < s.length; b++) {
    const { name: v, fn: S } = s[b],
      {
        x: A,
        y: k,
        data: T,
        reset: E,
      } = await S({
        x: d,
        y: g,
        initialPlacement: r,
        placement: f,
        strategy: o,
        middlewareData: m,
        rects: u,
        platform: a,
        elements: { reference: e, floating: t },
      });
    (d = A != null ? A : d),
      (g = k != null ? k : g),
      (m = { ...m, [v]: { ...m[v], ...T } }),
      E &&
        y <= 50 &&
        (y++,
        typeof E == "object" &&
          (E.placement && (f = E.placement),
          E.rects &&
            (u =
              E.rects === !0
                ? await a.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: o,
                  })
                : E.rects),
          ({ x: d, y: g } = mg(u, f, c))),
        (b = -1));
  }
  return { x: d, y: g, placement: f, strategy: o, middlewareData: m };
};
async function jh(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: o, platform: i, rects: a, elements: s, strategy: c } = e,
    {
      boundary: u = "clippingAncestors",
      rootBoundary: d = "viewport",
      elementContext: g = "floating",
      altBoundary: f = !1,
      padding: m = 0,
    } = zo(t, e),
    y = QC(m),
    v = s[f ? (g === "floating" ? "reference" : "floating") : g],
    S = ps(
      await i.getClippingRect({
        element:
          (n = await (i.isElement == null ? void 0 : i.isElement(v))) == null ||
          n
            ? v
            : v.contextElement ||
              (await (i.getDocumentElement == null
                ? void 0
                : i.getDocumentElement(s.floating))),
        boundary: u,
        rootBoundary: d,
        strategy: c,
      })
    ),
    A = g === "floating" ? { ...a.floating, x: r, y: o } : a.reference,
    k = await (i.getOffsetParent == null
      ? void 0
      : i.getOffsetParent(s.floating)),
    T = (await (i.isElement == null ? void 0 : i.isElement(k)))
      ? (await (i.getScale == null ? void 0 : i.getScale(k))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    E = ps(
      i.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await i.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: s,
            rect: A,
            offsetParent: k,
            strategy: c,
          })
        : A
    );
  return {
    top: (S.top - E.top + y.top) / T.y,
    bottom: (E.bottom - S.bottom + y.bottom) / T.y,
    left: (S.left - E.left + y.left) / T.x,
    right: (E.right - S.right + y.right) / T.x,
  };
}
const eA = function (e) {
  return (
    e === void 0 && (e = {}),
    {
      name: "flip",
      options: e,
      async fn(t) {
        var n, r;
        const {
            placement: o,
            middlewareData: i,
            rects: a,
            initialPlacement: s,
            platform: c,
            elements: u,
          } = t,
          {
            mainAxis: d = !0,
            crossAxis: g = !0,
            fallbackPlacements: f,
            fallbackStrategy: m = "bestFit",
            fallbackAxisSideDirection: y = "none",
            flipAlignment: b = !0,
            ...v
          } = zo(e, t);
        if ((n = i.arrow) != null && n.alignmentOffset) return {};
        const S = wr(o),
          A = wr(s) === s,
          k = await (c.isRTL == null ? void 0 : c.isRTL(u.floating)),
          T = f || (A || !b ? [ys(s)] : qC(s));
        !f && y !== "none" && T.push(...KC(s, b, y, k));
        const E = [s, ...T],
          P = await jh(t, v),
          M = [];
        let x = ((r = i.flip) == null ? void 0 : r.overflows) || [];
        if ((d && M.push(P[S]), g)) {
          const J = YC(o, a, k);
          M.push(P[J[0]], P[J[1]]);
        }
        if (
          ((x = [...x, { placement: o, overflows: M }]),
          !M.every((J) => J <= 0))
        ) {
          var _, R;
          const J = (((_ = i.flip) == null ? void 0 : _.index) || 0) + 1,
            ne = E[J];
          if (ne)
            return {
              data: { index: J, overflows: x },
              reset: { placement: ne },
            };
          let G =
            (R = x
              .filter((Q) => Q.overflows[0] <= 0)
              .sort((Q, ye) => Q.overflows[1] - ye.overflows[1])[0]) == null
              ? void 0
              : R.placement;
          if (!G)
            switch (m) {
              case "bestFit": {
                var z;
                const Q =
                  (z = x
                    .map((ye) => [
                      ye.placement,
                      ye.overflows
                        .filter((B) => B > 0)
                        .reduce((B, le) => B + le, 0),
                    ])
                    .sort((ye, B) => ye[1] - B[1])[0]) == null
                    ? void 0
                    : z[0];
                Q && (G = Q);
                break;
              }
              case "initialPlacement":
                G = s;
                break;
            }
          if (o !== G) return { reset: { placement: G } };
        }
        return {};
      },
    }
  );
};
async function tA(e, t) {
  const { placement: n, platform: r, elements: o } = e,
    i = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)),
    a = wr(n),
    s = Fs(n),
    c = ra(n) === "y",
    u = ["left", "top"].includes(a) ? -1 : 1,
    d = i && c ? -1 : 1,
    g = zo(t, e);
  let {
    mainAxis: f,
    crossAxis: m,
    alignmentAxis: y,
  } = typeof g == "number"
    ? { mainAxis: g, crossAxis: 0, alignmentAxis: null }
    : { mainAxis: 0, crossAxis: 0, alignmentAxis: null, ...g };
  return (
    s && typeof y == "number" && (m = s === "end" ? y * -1 : y),
    c ? { x: m * d, y: f * u } : { x: f * u, y: m * d }
  );
}
const nA = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: o, y: i, placement: a, middlewareData: s } = t,
            c = await tA(t, e);
          return a === ((n = s.offset) == null ? void 0 : n.placement) &&
            (r = s.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: o + c.x, y: i + c.y, data: { ...c, placement: a } };
        },
      }
    );
  },
  rA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: o } = t,
            {
              mainAxis: i = !0,
              crossAxis: a = !1,
              limiter: s = {
                fn: (v) => {
                  let { x: S, y: A } = v;
                  return { x: S, y: A };
                },
              },
              ...c
            } = zo(e, t),
            u = { x: n, y: r },
            d = await jh(t, c),
            g = ra(wr(o)),
            f = ku(g);
          let m = u[f],
            y = u[g];
          if (i) {
            const v = f === "y" ? "top" : "left",
              S = f === "y" ? "bottom" : "right",
              A = m + d[v],
              k = m - d[S];
            m = hg(A, m, k);
          }
          if (a) {
            const v = g === "y" ? "top" : "left",
              S = g === "y" ? "bottom" : "right",
              A = y + d[v],
              k = y - d[S];
            y = hg(A, y, k);
          }
          const b = s.fn({ ...t, [f]: m, [g]: y });
          return { ...b, data: { x: b.x - n, y: b.y - r } };
        },
      }
    );
  },
  oA = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        options: e,
        fn(t) {
          const { x: n, y: r, placement: o, rects: i, middlewareData: a } = t,
            { offset: s = 0, mainAxis: c = !0, crossAxis: u = !0 } = zo(e, t),
            d = { x: n, y: r },
            g = ra(o),
            f = ku(g);
          let m = d[f],
            y = d[g];
          const b = zo(s, t),
            v =
              typeof b == "number"
                ? { mainAxis: b, crossAxis: 0 }
                : { mainAxis: 0, crossAxis: 0, ...b };
          if (c) {
            const k = f === "y" ? "height" : "width",
              T = i.reference[f] - i.floating[k] + v.mainAxis,
              E = i.reference[f] + i.reference[k] - v.mainAxis;
            m < T ? (m = T) : m > E && (m = E);
          }
          if (u) {
            var S, A;
            const k = f === "y" ? "width" : "height",
              T = ["top", "left"].includes(wr(o)),
              E =
                i.reference[g] -
                i.floating[k] +
                ((T && ((S = a.offset) == null ? void 0 : S[g])) || 0) +
                (T ? 0 : v.crossAxis),
              P =
                i.reference[g] +
                i.reference[k] +
                (T ? 0 : ((A = a.offset) == null ? void 0 : A[g]) || 0) -
                (T ? v.crossAxis : 0);
            y < E ? (y = E) : y > P && (y = P);
          }
          return { [f]: m, [g]: y };
        },
      }
    );
  };
function Sr(e) {
  return Yh(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function en(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function nr(e) {
  var t;
  return (t = (Yh(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function Yh(e) {
  return e instanceof Node || e instanceof en(e).Node;
}
function Jn(e) {
  return e instanceof Element || e instanceof en(e).Element;
}
function Nn(e) {
  return e instanceof HTMLElement || e instanceof en(e).HTMLElement;
}
function yg(e) {
  return typeof ShadowRoot == "undefined"
    ? !1
    : e instanceof ShadowRoot || e instanceof en(e).ShadowRoot;
}
function oa(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: o } = rn(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
    !["inline", "contents"].includes(o)
  );
}
function iA(e) {
  return ["table", "td", "th"].includes(Sr(e));
}
function Tu(e) {
  const t = Lu(),
    n = rn(e);
  return (
    n.transform !== "none" ||
    n.perspective !== "none" ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    ["transform", "perspective", "filter"].some((r) =>
      (n.willChange || "").includes(r)
    ) ||
    ["paint", "layout", "strict", "content"].some((r) =>
      (n.contain || "").includes(r)
    )
  );
}
function aA(e) {
  let t = Ho(e);
  for (; Nn(t) && !Bs(t); ) {
    if (Tu(t)) return t;
    t = Ho(t);
  }
  return null;
}
function Lu() {
  return typeof CSS == "undefined" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
function Bs(e) {
  return ["html", "body", "#document"].includes(Sr(e));
}
function rn(e) {
  return en(e).getComputedStyle(e);
}
function Us(e) {
  return Jn(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
}
function Ho(e) {
  if (Sr(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (yg(e) && e.host) || nr(e);
  return yg(t) ? t.host : t;
}
function qh(e) {
  const t = Ho(e);
  return Bs(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : Nn(t) && oa(t)
    ? t
    : qh(t);
}
function Xi(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = qh(e),
    i = o === ((r = e.ownerDocument) == null ? void 0 : r.body),
    a = en(o);
  return i
    ? t.concat(
        a,
        a.visualViewport || [],
        oa(o) ? o : [],
        a.frameElement && n ? Xi(a.frameElement) : []
      )
    : t.concat(o, Xi(o, [], n));
}
function Xh(e) {
  const t = rn(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const o = Nn(e),
    i = o ? e.offsetWidth : n,
    a = o ? e.offsetHeight : r,
    s = ms(n) !== i || ms(r) !== a;
  return s && ((n = i), (r = a)), { width: n, height: r, $: s };
}
function Pu(e) {
  return Jn(e) ? e : e.contextElement;
}
function No(e) {
  const t = Pu(e);
  if (!Nn(t)) return br(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: o, $: i } = Xh(t);
  let a = (i ? ms(n.width) : n.width) / r,
    s = (i ? ms(n.height) : n.height) / o;
  return (
    (!a || !Number.isFinite(a)) && (a = 1),
    (!s || !Number.isFinite(s)) && (s = 1),
    { x: a, y: s }
  );
}
const sA = br(0);
function Kh(e) {
  const t = en(e);
  return !Lu() || !t.visualViewport
    ? sA
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function lA(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== en(e)) ? !1 : t;
}
function eo(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(),
    i = Pu(e);
  let a = br(1);
  t && (r ? Jn(r) && (a = No(r)) : (a = No(e)));
  const s = lA(i, n, r) ? Kh(i) : br(0);
  let c = (o.left + s.x) / a.x,
    u = (o.top + s.y) / a.y,
    d = o.width / a.x,
    g = o.height / a.y;
  if (i) {
    const f = en(i),
      m = r && Jn(r) ? en(r) : r;
    let y = f,
      b = y.frameElement;
    for (; b && r && m !== y; ) {
      const v = No(b),
        S = b.getBoundingClientRect(),
        A = rn(b),
        k = S.left + (b.clientLeft + parseFloat(A.paddingLeft)) * v.x,
        T = S.top + (b.clientTop + parseFloat(A.paddingTop)) * v.y;
      (c *= v.x),
        (u *= v.y),
        (d *= v.x),
        (g *= v.y),
        (c += k),
        (u += T),
        (y = en(b)),
        (b = y.frameElement);
    }
  }
  return ps({ width: d, height: g, x: c, y: u });
}
const cA = [":popover-open", ":modal"];
function Zh(e) {
  return cA.some((t) => {
    try {
      return e.matches(t);
    } catch (n) {
      return !1;
    }
  });
}
function uA(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: o } = e;
  const i = o === "fixed",
    a = nr(r),
    s = t ? Zh(t.floating) : !1;
  if (r === a || (s && i)) return n;
  let c = { scrollLeft: 0, scrollTop: 0 },
    u = br(1);
  const d = br(0),
    g = Nn(r);
  if (
    (g || (!g && !i)) &&
    ((Sr(r) !== "body" || oa(a)) && (c = Us(r)), Nn(r))
  ) {
    const f = eo(r);
    (u = No(r)), (d.x = f.x + r.clientLeft), (d.y = f.y + r.clientTop);
  }
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - c.scrollLeft * u.x + d.x,
    y: n.y * u.y - c.scrollTop * u.y + d.y,
  };
}
function dA(e) {
  return Array.from(e.getClientRects());
}
function Qh(e) {
  return eo(nr(e)).left + Us(e).scrollLeft;
}
function gA(e) {
  const t = nr(e),
    n = Us(e),
    r = e.ownerDocument.body,
    o = qr(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    i = qr(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let a = -n.scrollLeft + Qh(e);
  const s = -n.scrollTop;
  return (
    rn(r).direction === "rtl" && (a += qr(t.clientWidth, r.clientWidth) - o),
    { width: o, height: i, x: a, y: s }
  );
}
function fA(e, t) {
  const n = en(e),
    r = nr(e),
    o = n.visualViewport;
  let i = r.clientWidth,
    a = r.clientHeight,
    s = 0,
    c = 0;
  if (o) {
    (i = o.width), (a = o.height);
    const u = Lu();
    (!u || (u && t === "fixed")) && ((s = o.offsetLeft), (c = o.offsetTop));
  }
  return { width: i, height: a, x: s, y: c };
}
function hA(e, t) {
  const n = eo(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    o = n.left + e.clientLeft,
    i = Nn(e) ? No(e) : br(1),
    a = e.clientWidth * i.x,
    s = e.clientHeight * i.y,
    c = o * i.x,
    u = r * i.y;
  return { width: a, height: s, x: c, y: u };
}
function pg(e, t, n) {
  let r;
  if (t === "viewport") r = fA(e, n);
  else if (t === "document") r = gA(nr(e));
  else if (Jn(t)) r = hA(t, n);
  else {
    const o = Kh(e);
    r = { ...t, x: t.x - o.x, y: t.y - o.y };
  }
  return ps(r);
}
function Jh(e, t) {
  const n = Ho(e);
  return n === t || !Jn(n) || Bs(n)
    ? !1
    : rn(n).position === "fixed" || Jh(n, t);
}
function mA(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = Xi(e, [], !1).filter((s) => Jn(s) && Sr(s) !== "body"),
    o = null;
  const i = rn(e).position === "fixed";
  let a = i ? Ho(e) : e;
  for (; Jn(a) && !Bs(a); ) {
    const s = rn(a),
      c = Tu(a);
    !c && s.position === "fixed" && (o = null),
      (
        i
          ? !c && !o
          : (!c &&
              s.position === "static" &&
              !!o &&
              ["absolute", "fixed"].includes(o.position)) ||
            (oa(a) && !c && Jh(e, a))
      )
        ? (r = r.filter((d) => d !== a))
        : (o = s),
      (a = Ho(a));
  }
  return t.set(e, r), r;
}
function yA(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: o } = e;
  const a = [...(n === "clippingAncestors" ? mA(t, this._c) : [].concat(n)), r],
    s = a[0],
    c = a.reduce((u, d) => {
      const g = pg(t, d, o);
      return (
        (u.top = qr(g.top, u.top)),
        (u.right = hs(g.right, u.right)),
        (u.bottom = hs(g.bottom, u.bottom)),
        (u.left = qr(g.left, u.left)),
        u
      );
    }, pg(t, s, o));
  return {
    width: c.right - c.left,
    height: c.bottom - c.top,
    x: c.left,
    y: c.top,
  };
}
function pA(e) {
  const { width: t, height: n } = Xh(e);
  return { width: t, height: n };
}
function vA(e, t, n) {
  const r = Nn(t),
    o = nr(t),
    i = n === "fixed",
    a = eo(e, !0, i, t);
  let s = { scrollLeft: 0, scrollTop: 0 };
  const c = br(0);
  if (r || (!r && !i))
    if (((Sr(t) !== "body" || oa(o)) && (s = Us(t)), r)) {
      const g = eo(t, !0, i, t);
      (c.x = g.x + t.clientLeft), (c.y = g.y + t.clientTop);
    } else o && (c.x = Qh(o));
  const u = a.left + s.scrollLeft - c.x,
    d = a.top + s.scrollTop - c.y;
  return { x: u, y: d, width: a.width, height: a.height };
}
function vg(e, t) {
  return !Nn(e) || rn(e).position === "fixed"
    ? null
    : t
    ? t(e)
    : e.offsetParent;
}
function em(e, t) {
  const n = en(e);
  if (!Nn(e) || Zh(e)) return n;
  let r = vg(e, t);
  for (; r && iA(r) && rn(r).position === "static"; ) r = vg(r, t);
  return r &&
    (Sr(r) === "html" ||
      (Sr(r) === "body" && rn(r).position === "static" && !Tu(r)))
    ? n
    : r || aA(e) || n;
}
const bA = async function (e) {
  const t = this.getOffsetParent || em,
    n = this.getDimensions;
  return {
    reference: vA(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, ...(await n(e.floating)) },
  };
};
function wA(e) {
  return rn(e).direction === "rtl";
}
const SA = {
  convertOffsetParentRelativeRectToViewportRelativeRect: uA,
  getDocumentElement: nr,
  getClippingRect: yA,
  getOffsetParent: em,
  getElementRects: bA,
  getClientRects: dA,
  getDimensions: pA,
  getScale: No,
  isElement: Jn,
  isRTL: wA,
};
function EA(e, t) {
  let n = null,
    r;
  const o = nr(e);
  function i() {
    var s;
    clearTimeout(r), (s = n) == null || s.disconnect(), (n = null);
  }
  function a(s, c) {
    s === void 0 && (s = !1), c === void 0 && (c = 1), i();
    const { left: u, top: d, width: g, height: f } = e.getBoundingClientRect();
    if ((s || t(), !g || !f)) return;
    const m = Aa(d),
      y = Aa(o.clientWidth - (u + g)),
      b = Aa(o.clientHeight - (d + f)),
      v = Aa(u),
      A = {
        rootMargin: -m + "px " + -y + "px " + -b + "px " + -v + "px",
        threshold: qr(0, hs(1, c)) || 1,
      };
    let k = !0;
    function T(E) {
      const P = E[0].intersectionRatio;
      if (P !== c) {
        if (!k) return a();
        P
          ? a(!1, P)
          : (r = setTimeout(() => {
              a(!1, 1e-7);
            }, 100));
      }
      k = !1;
    }
    try {
      n = new IntersectionObserver(T, { ...A, root: o.ownerDocument });
    } catch (E) {
      n = new IntersectionObserver(T, A);
    }
    n.observe(e);
  }
  return a(!0), i;
}
function CA(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: o = !0,
      ancestorResize: i = !0,
      elementResize: a = typeof ResizeObserver == "function",
      layoutShift: s = typeof IntersectionObserver == "function",
      animationFrame: c = !1,
    } = r,
    u = Pu(e),
    d = o || i ? [...(u ? Xi(u) : []), ...Xi(t)] : [];
  d.forEach((S) => {
    o && S.addEventListener("scroll", n, { passive: !0 }),
      i && S.addEventListener("resize", n);
  });
  const g = u && s ? EA(u, n) : null;
  let f = -1,
    m = null;
  a &&
    ((m = new ResizeObserver((S) => {
      let [A] = S;
      A &&
        A.target === u &&
        m &&
        (m.unobserve(t),
        cancelAnimationFrame(f),
        (f = requestAnimationFrame(() => {
          var k;
          (k = m) == null || k.observe(t);
        }))),
        n();
    })),
    u && !c && m.observe(u),
    m.observe(t));
  let y,
    b = c ? eo(e) : null;
  c && v();
  function v() {
    const S = eo(e);
    b &&
      (S.x !== b.x ||
        S.y !== b.y ||
        S.width !== b.width ||
        S.height !== b.height) &&
      n(),
      (b = S),
      (y = requestAnimationFrame(v));
  }
  return (
    n(),
    () => {
      var S;
      d.forEach((A) => {
        o && A.removeEventListener("scroll", n),
          i && A.removeEventListener("resize", n);
      }),
        g == null || g(),
        (S = m) == null || S.disconnect(),
        (m = null),
        c && cancelAnimationFrame(y);
    }
  );
}
const AA = rA,
  IA = eA,
  xA = oA,
  kA = (e, t, n) => {
    const r = new Map(),
      o = { platform: SA, ...n },
      i = { ...o.platform, _c: r };
    return JC(e, t, { ...o, platform: i });
  };
function TA() {}
const LA = "data-top-layer";
function PA(e, t) {
  let n,
    r = TA;
  const o = () => Ev(t()),
    i = (g) => {
      var f;
      return (f = e.onPointerDownOutside) == null ? void 0 : f.call(e, g);
    },
    a = (g) => {
      var f;
      return (f = e.onFocusOutside) == null ? void 0 : f.call(e, g);
    },
    s = (g) => {
      var f;
      return (f = e.onInteractOutside) == null ? void 0 : f.call(e, g);
    },
    c = (g) => {
      var m;
      const f = g.target;
      return !(f instanceof HTMLElement) ||
        f.closest(`[${LA}]`) ||
        !yc(o(), f) ||
        yc(t(), f)
        ? !1
        : !((m = e.shouldExcludeElement) != null && m.call(e, f));
    },
    u = (g) => {
      function f() {
        const m = t(),
          y = g.target;
        !m || !y || !c(g) || (i(g), s(g));
      }
      g.pointerType === "touch"
        ? (o().removeEventListener("click", f),
          (r = f),
          o().addEventListener("click", f, { once: !0 }))
        : f();
    },
    d = (g) => {
      const f = t(),
        m = g.target;
      !f || !m || !c(g) || (a(g), s(g));
    };
  ie(() => {
    var g;
    ((g = e.isDisabled) != null && g.call(e)) ||
      ((n = window.setTimeout(() => {
        o().addEventListener("pointerdown", u, !0);
      }, 0)),
      o().addEventListener("focusin", d, !0),
      De(() => {
        window.clearTimeout(n),
          o().removeEventListener("click", r),
          o().removeEventListener("pointerdown", u, !0),
          o().removeEventListener("focusin", d, !0);
      }));
  });
}
const zs = on();
function MA(e) {
  const t = F({ offset: 4 }, e),
    [n, r] = N(!1),
    [o, i] = N(),
    [a, s] = N();
  let c;
  const u = () => {
      const M = a(),
        x = o();
      !M ||
        !x ||
        kA(M, x, {
          placement: "bottom",
          middleware: [
            nA(t.offset),
            IA(),
            AA({ crossAxis: !0, padding: 8, limiter: xA() }),
          ],
        }).then(({ x: _, y: R }) => {
          Object.assign(x.style, { left: `${_}px`, top: `${R}px` });
        });
    },
    d = () => {
      const M = a();
      W(M);
      const x = o();
      W(x), c == null || c(), (c = CA(M, x, u));
    };
  De(() => {
    c == null || c();
  });
  const g = (M) => (
      n() && M && M.preventDefault(),
      requestAnimationFrame(() => {
        const x = o();
        x && document.activeElement && n() && nu(x);
      })
    ),
    f = () =>
      requestAnimationFrame(() => {
        const M = o(),
          x = a();
        if (x == null || M == null || document.activeElement == null) return;
        const _ = M.contains(document.activeElement);
        (document.activeElement === document.body || _) && x.focus();
      }),
    m = () => {
      var M;
      n() ||
        (r(!0),
        document.body.addEventListener("keydown", S, !1),
        (M = t.onOpen) == null || M.call(t));
    },
    y = () => {
      var M;
      n() &&
        (r(!1),
        f(),
        document.body.removeEventListener("keydown", S, !1),
        (M = t.onClose) == null || M.call(t));
    },
    b = () => (n() ? y() : m()),
    v = () => {
      u();
    },
    S = (M) => (M.key === "Escape" ? y() : void 0);
  De(() => {
    document.body.removeEventListener("keydown", S, !1);
  });
  const A = () => {
      const M = o();
      W(M),
        d(),
        M.removeAttribute("data-exiting"),
        M.setAttribute("data-entering", "");
    },
    k = () => {
      var x;
      const M = o();
      W(M),
        M.removeAttribute("data-entering"),
        g(),
        (x = t.onOpenComplete) == null || x.call(t);
    },
    T = () => {
      const M = o();
      W(M), M.setAttribute("data-exiting", "");
    },
    E = () => {
      c == null || c(), (c = void 0);
    },
    P = { isShown: n, open: m, close: y, toggle: b, update: v };
  return (
    PA(
      {
        isDisabled: () => !n(),
        shouldExcludeElement(M) {
          return yc(o(), M);
        },
        onInteractOutside() {
          y();
        },
      },
      () => a()
    ),
    ZE(
      () => n(),
      () => [a(), o()]
    ),
    l(zs.Provider, {
      value: P,
      get children() {
        return [
          l(Zr, {
            get value() {
              return kr.POSITIONER;
            },
            children: (M) =>
              l(Os, {
                get in() {
                  return n();
                },
                get duration() {
                  return e.duration;
                },
                onEntering: A,
                onEntered: k,
                onExiting: T,
                onExited: E,
                children: (x) =>
                  l(D, {
                    get when() {
                      return x() !== Et.EXITED;
                    },
                    get children() {
                      return l(na, {
                        get children() {
                          return t.children({
                            ref: (_) => {
                              i(_);
                            },
                            zIndex: M,
                            context: P,
                          });
                        },
                      });
                    },
                  }),
              }),
          }),
          L(() => e.referenceElement({ ref: s, context: P })),
        ];
      },
    })
  );
}
var Hl = w("<span>");
function Ee(e) {
  const t = Y(zs),
    n = Pt(),
    r = (a) => {
      var c;
      if (e.disabled) return;
      a.preventDefault(),
        ((c = e.onClick) == null ? void 0 : c.call(e)) !== !1 &&
          (t == null || t.close());
    },
    o = Mu(),
    i = () =>
      e.type === "checkbox"
        ? e.checked
          ? nh
          : th
        : e.type === "radio"
        ? e.checked
          ? qi
          : Yi
        : W(e.type == null);
  return l(Ir, {
    get class() {
      return H(o().root, e.disabled && o().disabled);
    },
    get disabled() {
      return e.disabled;
    },
    get layerBackground() {
      return n().color.primary;
    },
    component: "div",
    componentProps: { onClick: r },
    get children() {
      return [
        l(D, {
          get when() {
            return !e.noIcon;
          },
          get children() {
            var a = Hl();
            return (
              p(
                a,
                l(jt, {
                  get component() {
                    return e.icon;
                  },
                  size: 24,
                })
              ),
              $(() =>
                I(
                  a,
                  H(
                    o().leftIcon,
                    e.isDangerous && o().dangerous,
                    e.disabled && o().disabled
                  )
                )
              ),
              a
            );
          },
        }),
        (() => {
          var a = Hl();
          return (
            p(a, () => e.text),
            $(() => I(a, H(o().text, e.isDangerous && o().dangerous))),
            a
          );
        })(),
        (() => {
          var a = Hl();
          return (
            p(
              a,
              l(D, {
                get when() {
                  return e.isLoading;
                },
                get fallback() {
                  return l(jt, {
                    get component() {
                      return i();
                    },
                    size: 24,
                  });
                },
                get children() {
                  return l(ao, { size: 24 });
                },
              })
            ),
            $(() =>
              I(
                a,
                H(
                  o().rightIcon,
                  (e.type === "checkbox" || e.type === "radio") &&
                    o().checkMark,
                  e.checked && o().checkMarkChecked,
                  e.disabled && o().disabled
                )
              )
            ),
            a
          );
        })(),
      ];
    },
  });
}
const _c = 44,
  Ri = 16,
  Oc = 16,
  Mu = q((e) => ({
    root: {
      ...Vb,
      ...e.typescale.labelLargeStyle,
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      minHeight: Re(_c),
      padding: Re(0, Oc, 0, Ri),
      textAlign: "left",
    },
    controlRoot: {
      display: "flex",
      alignItems: "center",
      minHeight: Re(_c),
      padding: `0 ${Re(Oc)} 0 ${Re(Ri)}`,
    },
    controlLabel: {
      flex: "1 0",
      marginRight: "2rem",
      ...e.typescale.labelLargeStyle,
    },
    disabled: { color: Ot(e.color.onSurface, 0.38) },
    leftIcon: {
      display: "flex",
      width: "1.5rem",
      marginRight: Re(Ri),
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      color: e.color.onSurfaceVariant,
    },
    rightIcon: {
      display: "flex",
      width: "1.5rem",
      marginLeft: Re(Ri),
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      color: e.color.onSurfaceVariant,
    },
    checkMark: { color: e.color.onSurfaceVariant },
    checkMarkChecked: { color: e.color.primary },
    text: { flex: 1, paddingRight: "1rem", whiteSpace: "nowrap" },
    value: {
      marginRight: "-0.5rem",
      color: e.color.onSurfaceHint,
      ...e.typescale.labelMediumStyle,
    },
    dangerous: { color: e.color.error },
  }));
var $A = w("<div>");
const $u = on();
function Vo(e) {
  const [t, n] = N("/"),
    [r, o] = N(0),
    i = Y(zs),
    a = (m) => {
      const y = t().match(/\//g).length - m.match(/\//g).length,
        b = y < 0 ? 1 : y > 0 ? 2 : 0;
      o(b), n(m);
    },
    s = () => {
      a(t().replace(/[-.\w]+\/$/, ""));
    };
  let c;
  const u = (m) => {
      m.target === c && o(0);
    },
    d = { getPath: t, updatePath: a, back: s };
  ie(
    pe(t, () => {
      i == null || i.update();
    })
  );
  const g = RA(),
    f = (m) => {
      switch (m) {
        case 0:
          return "";
        case 1:
          return g().directionForwordStyle;
        case 2:
          return g().directionBackwordStyle;
      }
    };
  return l($u.Provider, {
    value: d,
    get children() {
      return l(zn, {
        get class() {
          return g().root;
        },
        level: 2,
        shadow: !0,
        "data-is-menu": !0,
        get children() {
          var m = $A();
          m.addEventListener("animationend", u);
          var y = c;
          return (
            typeof y == "function" ? tt(y, m) : (c = m),
            p(m, () => e.children(t())),
            $(() => I(m, H(g().inner, f(r())))),
            m
          );
        },
      });
    },
  });
}
const Nc = 0.375,
  RA = q((e) => ({
    root: {
      boxSizing: "border-box",
      padding: `${Nc}rem 0`,
      contain: "content",
      borderRadius: e.sharp.extraSmall,
      cursor: "default",
      userSelect: "none",
      " hr": { margin: "0.375rem 0.5rem" },
      " hr:last-child": { display: "none" },
      " hr:first-child": { display: "none" },
    },
    inner: {
      display: "flex",
      flexDirection: "column",
      maxHeight: `calc(100vh - 80px - ${je}px)`,
      maxWidth: "90vw",
      minWidth: "12rem",
      overflowX: "hidden",
      overflowY: "auto",
    },
    directionForwordStyle: { animation: St.slideLeftIn20.cssText },
    directionBackwordStyle: { animation: St.slideRightIn20.cssText },
  }));
var DA = w("<div><span>");
function ri(e) {
  const t = Y($u),
    n = (o) => {
      o.preventDefault(), t.back();
    },
    r = _A();
  return [
    (() => {
      var o = DA(),
        i = o.firstChild;
      return (
        p(
          o,
          l(Z, {
            get class() {
              return r().backButton;
            },
            variant: "text",
            icon: os,
            onClick: n,
          }),
          i
        ),
        p(i, () => e.title),
        $(
          (a) => {
            var s = r().header,
              c = r().title;
            return (
              s !== a.e && I(o, (a.e = s)), c !== a.t && I(i, (a.t = c)), a
            );
          },
          { e: void 0, t: void 0 }
        ),
        o
      );
    })(),
    L(() => e.children),
  ];
}
const _A = q((e) => ({
  header: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    paddingBottom: `${Nc}rem`,
    marginBottom: `${Nc}rem`,
    borderBottom: `1px solid ${e.color.outlineVariant}`,
  },
  backButton: { margin: "0 0.375rem !important" },
  title: { flex: 1, ...e.typescale.titleMediumStyle },
}));
function tm() {
  const [e, t] = mu(),
    n = (r) => (t(r), !1);
  return l(ri, {
    get title() {
      return h("Theme");
    },
    get children() {
      return [
        l(Ee, {
          get text() {
            return h("Automatic");
          },
          type: "radio",
          noIcon: !0,
          get checked() {
            return e() === hn.SYSTEM;
          },
          onClick: () => n(hn.SYSTEM),
        }),
        l(Ee, {
          get text() {
            return h("Light theme");
          },
          type: "radio",
          noIcon: !0,
          get checked() {
            return e() === hn.LIGHT;
          },
          onClick: () => n(hn.LIGHT),
        }),
        l(Ee, {
          get text() {
            return h("Dark theme");
          },
          type: "radio",
          noIcon: !0,
          get checked() {
            return e() === hn.DARK;
          },
          onClick: () => n(hn.DARK),
        }),
      ];
    },
  });
}
var Ia = w("<span>");
function Wo(e) {
  const t = Y($u),
    n = Pt(),
    r = (i) => {
      i.preventDefault(), !e.disabled && t.updatePath(e.path);
    },
    o = Mu();
  return l(Ir, {
    get class() {
      return H(o().root, e.disabled && o().disabled);
    },
    get disabled() {
      return e.disabled;
    },
    get layerBackground() {
      return n().color.primary;
    },
    component: "div",
    componentProps: { onClick: r },
    get children() {
      return [
        l(D, {
          get when() {
            return !e.noIcon;
          },
          get children() {
            var i = Ia();
            return (
              p(
                i,
                l(jt, {
                  get component() {
                    return e.icon;
                  },
                  size: 24,
                })
              ),
              $(() => I(i, H(o().leftIcon, e.disabled && o().disabled))),
              i
            );
          },
        }),
        (() => {
          var i = Ia();
          return p(i, () => e.text), $(() => I(i, o().text)), i;
        })(),
        l(D, {
          get when() {
            return e.value;
          },
          get children() {
            var i = Ia();
            return p(i, () => e.value), $(() => I(i, o().value)), i;
          },
        }),
        (() => {
          var i = Ia();
          return p(i, l(Rs, {})), $(() => I(i, o().rightIcon)), i;
        })(),
      ];
    },
  });
}
function nm(e) {
  const [t] = mu(),
    n = () =>
      t() === hn.LIGHT
        ? h("Light")
        : t() === hn.DARK
        ? h("Dark")
        : h("Automatic");
  return l(Wo, {
    icon: Qw,
    get text() {
      return h("Theme");
    },
    get value() {
      return n();
    },
    get path() {
      return e.path;
    },
  });
}
var OA = w("<div>");
function Go(e) {
  const [t, n] = Ve(e, ["renderDropdown"]),
    r = NA();
  return l(MA, {
    duration: he,
    referenceElement: (o) =>
      l(
        Z,
        F(
          {
            ref(i) {
              var a = o.ref;
              typeof a == "function" ? a(i) : (o.ref = i);
            },
            get active() {
              return o.context.isShown();
            },
            onClick: (i) => {
              i.preventDefault(), o.context.toggle();
            },
          },
          n
        )
      ),
    children: (o) =>
      (() => {
        var i = OA(),
          a = o.ref;
        return (
          typeof a == "function" ? tt(a, i) : (o.ref = i),
          i.style.setProperty("position", "absolute"),
          i.style.setProperty("width", "max-content"),
          i.style.setProperty("top", "0"),
          i.style.setProperty("left", "0"),
          p(i, () => t.renderDropdown(o.context)),
          $(
            (s) => {
              var c = r().dropdown,
                u = o.zIndex;
              return (
                c !== s.e && I(i, (s.e = c)),
                u !== s.t &&
                  ((s.t = u) != null
                    ? i.style.setProperty("z-index", u)
                    : i.style.removeProperty("z-index")),
                s
              );
            },
            { e: void 0, t: void 0 }
          ),
          i
        );
      })(),
  });
}
const NA = q({
  dropdown: {
    "[data-entering]": { animation: St.slideDownIn20.cssText },
    "[data-exiting]": { animation: St.slideUpOut20.cssText, opacity: "0" },
  },
});
var FA = w("<hr>");
function tn(e) {
  const t = BA();
  return (() => {
    var n = FA();
    return $(() => I(n, H(t().root, e.class))), n;
  })();
}
const BA = q((e) => ({
  root: {
    clear: "both",
    margin: "0.375rem 0",
    borderTop: `1px solid ${e.color.outlineVariant}`,
    borderBottom: "none",
    borderLeft: "none",
    borderRight: "none",
  },
}));
var UA = w("<div>");
function Rn(e) {
  const [t, n] = Ve(e, ["class", "children"]),
    r = zA();
  return (() => {
    var o = UA();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !0
      ),
      p(o, () => t.children),
      o
    );
  })();
}
const zA = q((e) => ({
  root: {
    margin: "0.25rem 0 0.5rem",
    display: "block",
    color: e.color.onSurfaceHint,
    ...e.typescale.bodySmallStyle,
  },
}));
var HA = w("<span>"),
  VA = w("<label>");
function Fc(e) {
  const [t, n] = Ve(e, ["class", "children"]),
    r = WA();
  return (() => {
    var o = VA();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !0
      ),
      p(o, () => e.children, null),
      p(
        o,
        l(D, {
          get when() {
            return e.markText;
          },
          get children() {
            var i = HA();
            return p(i, () => e.markText), $(() => I(i, r().markText)), i;
          },
        }),
        null
      ),
      o
    );
  })();
}
const WA = q((e) => ({
    root: {
      margin: "0.375rem 0",
      display: "block",
      color: e.color.onSurfaceVariant,
      ...e.typescale.labelLargeStyle,
      userSelect: "none",
      webkitUserSelect: "none",
    },
    markText: { marginLeft: "0.375rem", color: e.color.onSurfaceHint },
  })),
  GA = 5;
function jA(e) {
  const t = (n) => {
    var r;
    (r = e.onChange) == null || r.call(e, n);
  };
  return l(Qe, {
    get each() {
      return Array(GA)
        .fill(0)
        .map((n, r) => r);
    },
    children: (n) =>
      l(YA, {
        index: n,
        get fill() {
          return e.value != null && n <= e.value - 1;
        },
        get onClick() {
          return t.bind(void 0, n + 1);
        },
      }),
  });
}
function YA(e) {
  const t = qA();
  return l(jt, {
    get component() {
      return e.fill ? dS : uS;
    },
    get class() {
      return H(t().star, e.fill && t().starFilled);
    },
    size: 32,
    get onClick() {
      return e.onClick;
    },
  });
}
const qA = q((e) => ({
  star: {
    color: e.color.onSurfaceVariant,
    cursor: "pointer",
    transition: "200ms",
    ":hover": { transform: "scale(1.2)" },
    ":active": { transform: "scale(1)" },
  },
  starFilled: { color: e.color.primary },
}));
var XA = w("<textarea>");
function KA(e) {
  const [t, n] = Ve(F({ size: "medium" }, e), ["class"]),
    r = ZA();
  return (() => {
    var o = XA();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !1
      ),
      o
    );
  })();
}
const ZA = q((e) => ({
  root: {
    boxSizing: "border-box",
    padding: "0.5rem",
    width: "100%",
    height: "6rem",
    minHeight: "3rem",
    background: e.color.surfaceVariant,
    color: e.color.onSurface,
    boxShadow: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: mn,
    borderRadius: e.sharp.extraSmall,
    lineHeight: 1.25,
    fontSize: "1rem",
    appearance: "none",
    outline: "0",
    transitionDuration: `${he}ms`,
    transitionProperty: "background-color,border-color",
    ":focus": {
      background: e.color.surface,
      borderColor: e.color.primary,
      boxShadow: `0 0 0 3px ${e.color.primaryContainer}`,
    },
    "::placeholder": { color: e.color.onSurfaceVariant, fontSize: "0.875rem" },
  },
}));
function QA(e) {
  let t;
  const [n, r] = N(),
    o = Y(se),
    { getIsBusy: i, execute: a } = lt(async () => {
      await Le("sendFeedback", { rating: n(), comment: t.value }),
        o.core.methods.notifySuccess(h("Feedback sent"));
    }),
    s = () => {
      a().then(e.onClose).catch(o.core.methods.reportErrorAction());
    },
    c = (u) => {
      r(u);
    };
  return l(an, {
    get title() {
      return h("Feedback");
    },
    get isShown() {
      return e.isShown;
    },
    hasClose: !0,
    hasCancel: !1,
    width: 360,
    get confirmLabel() {
      return h("Send");
    },
    get isConfirmLoading() {
      return i();
    },
    onConfirm: s,
    get onCancel() {
      return e.onClose;
    },
    children: () => [
      l(ke, {
        group: !0,
        start: !0,
        get children() {
          return [
            l(Fc, {
              get children() {
                return h("Rate your experience");
              },
            }),
            l(jA, {
              get value() {
                return n();
              },
              onChange: c,
            }),
          ];
        },
      }),
      l(ke, {
        get children() {
          return [
            l(Fc, {
              get markText() {
                return h("(Optional)");
              },
              get children() {
                return h("Comment");
              },
            }),
            l(KA, {
              ref(u) {
                var d = t;
                typeof d == "function" ? d(u) : (t = u);
              },
              style: "resize:vertical",
              get placeholder() {
                return h("Enter your message");
              },
              maxLength: 32e3,
            }),
          ];
        },
      }),
      l(ke, {
        end: !0,
        get children() {
          return l(Rn, {
            get children() {
              return [
                L(() =>
                  h(
                    "If you want to discuss publicly or track progress, you can use"
                  )
                ),
                " ",
                l(Pe, {
                  href: "https://github.com/oxyry/qireader/issues",
                  openInNew: !0,
                  get children() {
                    return h("Github Issues.");
                  },
                }),
              ];
            },
          });
        },
      }),
    ],
  });
}
function rm(e, t, n, { topPadding: r = 0, bottomPadding: o = 0 } = {}) {
  t[0];
  const i = e.scrollTop,
    a = e.clientHeight;
  if (n === "down")
    for (let s = 0; s < t.length; s++) {
      const c = t[s],
        d = c.offsetTop - i + c.offsetHeight;
      if (d > r) {
        const g = c.offsetHeight - d + r;
        return { index: s, item: c, distance: g };
      }
    }
  else {
    W(n === "up");
    for (let s = t.length - 1; s >= 0; s--) {
      const c = t[s],
        u = c.offsetTop - i,
        d = u + c.offsetHeight;
      if (u < a - o) {
        const g = d - a + o;
        return { index: s, item: c, distance: g };
      }
    }
  }
}
function om(
  e,
  t,
  {
    topPadding: n = 0,
    bottomPadding: r = 0,
    minVisible: o = 16,
    scrollMargin: i = 8,
  } = {}
) {
  const a = e.scrollTop,
    s = e.clientHeight,
    c = t.offsetTop - a,
    u = c + t.offsetHeight;
  if (c < n) {
    const d = -(n - c + i);
    return u > n + o
      ? { type: "partial", scrollAmount: d, minVisible: o }
      : { type: "outside", scrollAmount: d, minVisible: o };
  } else
    return u <= s - r - o
      ? { type: "inside", scrollAmount: 0, minVisible: o }
      : c < s - r - o
      ? { type: "partial", scrollAmount: u - s + r + o, minVisible: o }
      : {
          type: "outside",
          scrollAmount: c - s + r + o + t.offsetHeight,
          minVisible: o,
        };
}
function Hs(e, t, n = {}) {
  var o, i;
  const r = om(e, t, n);
  if ((r.type === "outside" || n.forceAlign) && n.align) {
    if (n.align === "start") {
      let a = e.scrollTop + r.scrollAmount;
      r.scrollAmount > 0 &&
        (a +=
          e.clientHeight -
          t.offsetHeight -
          ((o = n.topPadding) != null ? o : 0) -
          r.minVisible -
          ((i = n.alignTopMargin) != null ? i : 0)),
        e.scroll({ top: a, behavior: n.behavior });
    } else t.scrollIntoView({ block: n.align, behavior: n.behavior });
    return !0;
  } else if (r.type === "outside" || r.type === "partial")
    return (
      e.scroll({ top: e.scrollTop + r.scrollAmount, behavior: n.behavior }), !0
    );
  return !1;
}
function im(e, t, n = {}) {
  var i, a;
  const r = e.querySelectorAll("[data-is-navitem]"),
    o = rm(e, r, t === "up" ? "down" : "up", n);
  if (o) {
    if (t === "up") {
      let s =
          e.scrollTop - (e.clientHeight - ((i = n.topPadding) != null ? i : 0)),
        c = !0;
      if (o.distance > 0) {
        const u = s + (o.item.offsetHeight - o.distance) + 16;
        e.scrollTop - u > e.clientHeight * 0.3 && ((s = u), (c = !1));
      } else c = !1;
      c && (s += 50), e.scroll({ top: s, behavior: n.behavior });
    } else if (t === "down") {
      let s =
          e.scrollTop + e.clientHeight - ((a = n.topPadding) != null ? a : 0),
        c = !0;
      if (o.distance > 0) {
        const u = s - (o.item.offsetHeight - o.distance) - 8;
        u - e.scrollTop > e.clientHeight * 0.3 && ((s = u), (c = !1));
      }
      c && (s -= 50), e.scroll({ top: s, behavior: n.behavior });
    }
  }
}
function bg(e, t) {
  W(e.hasAttribute("data-is-navitem"));
  const n = e.closest("[data-is-navitem-container]");
  W(n);
  const r = Array.from(n.querySelectorAll("[data-is-navitem]")),
    o = r.indexOf(e);
  W(o >= 0);
  const i = t === "down" ? o + 1 : o - 1;
  return r[i];
}
function am(e, t, n, r = {}) {
  var i;
  let o =
    (i = document.activeElement) == null
      ? void 0
      : i.closest("[data-is-navitem]");
  return o && t.contains(o)
    ? o
    : ((o = n != null ? n : t.querySelector("[data-navitem-active]")),
      o
        ? (o.focus({ preventScroll: !0 }), Hs(e, o, r), o)
        : vs(e, t, "down", r));
}
function vs(e, t, n, r = {}) {
  var g, f, m;
  const o = "lastNavAt",
    a = Date.now() - ((g = zf(e, o)) != null ? g : 0) < 1e3;
  bc(e, o, Date.now());
  let s;
  const c =
    (m =
      (f = document.activeElement) == null
        ? void 0
        : f.closest("[data-is-navitem]")) != null
      ? m
      : t.querySelector("[data-navitem-active]");
  let u = n,
    d = !1;
  if (c && t.contains(c)) {
    const y = om(e, c, r);
    (d = y.type === "inside" || y.type === "partial"),
      (a || d) && ((s = bg(c, n)), (u = void 0));
  }
  if (!s && u) {
    const y = rm(e, t.querySelectorAll("[data-is-navitem]"), u, r);
    y &&
      (y.distance > y.item.offsetHeight * 0.25
        ? (s = bg(y.item, u))
        : (s = y.item));
  }
  if (s)
    return (
      s.focus({ preventScroll: !0 }),
      Hs(e, s, { ...r, behavior: d || !a ? r.behavior : "auto" }),
      s
    );
  e.scrollBy({
    top: n === "down" ? 200 : -200,
    behavior: a ? "auto" : r.behavior,
  });
}
function bs(e) {
  const t = Is();
  ie(pe(() => `${t.pathname}${t.search}${t.hash}`, e, { defer: !0 }));
}
var JA = w("<b>Android:"),
  e4 = w("<b>iOS:"),
  t4 = w("<b>Microsoft Edge:");
function n4(e) {
  return l(an, {
    get title() {
      return h("Install app");
    },
    get isShown() {
      return e.isShown;
    },
    hasFooter: !1,
    get onCancel() {
      return e.onClose;
    },
    children: () => [
      l(j, {
        variant: "bodyMedium",
        style: "margin-bottom: 1.5rem",
        get children() {
          return h(
            "This app uses PWA technology, you can use it from a web browser without installation, or installed and used like native apps."
          );
        },
      }),
      l(j, {
        variant: "titleMedium",
        gutterBottom: !0,
        get children() {
          return h("How to install");
        },
      }),
      l(j, {
        variant: "bodyMedium",
        gutterBottom: !0,
        get children() {
          return [
            JA(),
            " ",
            L(() =>
              h('Open the main browser menu and tap "Add to Home Screen".')
            ),
            Pa === "zh-Hans" &&
              "使用第三方浏览器如 Chrome/Edge 可能需要先在系统权限设置里为这个 App 打开“创建桌面快捷方式”权限。",
          ];
        },
      }),
      l(j, {
        variant: "bodyMedium",
        gutterBottom: !0,
        get children() {
          return [
            e4(),
            " ",
            L(() =>
              h(
                'Tap the "Share" button, scroll down and tap "Add to Home Screen".'
              )
            ),
          ];
        },
      }),
      l(j, {
        variant: "bodyMedium",
        gutterBottom: !0,
        get children() {
          return [
            t4(),
            " ",
            L(() =>
              h('Open the main browser menu and tap "Apps" → "Install".')
            ),
          ];
        },
      }),
    ],
  });
}
var fr = w("<div>");
function Ru(e) {
  const t = r4();
  return (() => {
    var n = fr();
    return (
      p(
        n,
        (() => {
          var r = L(() => !!e.title);
          return () =>
            r() &&
            (() => {
              var o = fr();
              return (
                p(
                  o,
                  l(j, {
                    get class() {
                      return t().title;
                    },
                    variant: "titleSmall",
                    get children() {
                      return e.title;
                    },
                  }),
                  null
                ),
                p(
                  o,
                  l(D, {
                    keyed: !0,
                    get when() {
                      return e.actions;
                    },
                    children: (i) =>
                      (() => {
                        var a = fr();
                        return p(a, i), $(() => I(a, t().actions)), a;
                      })(),
                  }),
                  null
                ),
                $(() => I(o, t().titleBar)),
                o
              );
            })();
        })(),
        null
      ),
      p(n, () => e.children, null),
      $(() =>
        I(
          n,
          H(
            t().root,
            e.edge === "top" && t().top,
            e.edge === "bottom" && t().bottom,
            e.class
          )
        )
      ),
      n
    );
  })();
}
const r4 = q((e) => ({
  root: {
    marginTop: "1rem",
    marginBottom: "1rem",
    marginLeft: "0.75rem",
    marginRight: "0.75rem",
  },
  top: { margin: "0.5rem 0.75rem 1rem" },
  bottom: { margin: "1rem 0.75rem 0.5rem" },
  titleBar: {
    display: "flex",
    alignItems: "center",
    margin: "0.25rem 0rem 0.25rem 0rem",
  },
  actions: { flexShrink: 0 },
  title: { flex: 1, color: e.color.onSurfaceVariant },
}));
function ia(e) {
  const t = Pt(),
    n = o4();
  let r;
  const o = (s) => {
      var c;
      s.preventDefault(),
        s.stopPropagation(),
        (c = e.onExpandButtonClick) == null || c.call(e);
    },
    i = () => {
      var s;
      r.blur(), (s = e.onClick) == null || s.call(e);
    };
  ti(
    () => r,
    [
      [
        ["Enter", "o"],
        () => {
          i();
        },
      ],
      [
        ["x"],
        () => {
          var s;
          (s = e.onExpandButtonClick) == null || s.call(e);
        },
      ],
    ]
  );
  const a = () =>
    typeof e.icon == "string"
      ? (() => {
          var s = fr();
          return (
            $(
              (c) => {
                var u = `url(${e.icon})`,
                  d = n().imageIcon;
                return (
                  u !== c.e &&
                    ((c.e = u) != null
                      ? s.style.setProperty("background-image", u)
                      : s.style.removeProperty("background-image")),
                  d !== c.t && I(s, (c.t = d)),
                  c
                );
              },
              { e: void 0, t: void 0 }
            ),
            s
          );
        })()
      : e.expandable
      ? null
      : e.icon
      ? l(jt, {
          get component() {
            return e.icon;
          },
          size: 20,
        })
      : null;
  return l(Ir, {
    get class() {
      return H(n().root, e.indent && n().indent, e.active && n().active);
    },
    get layerBackground() {
      return t().color.primary;
    },
    disableFocusBackground: !0,
    component: "div",
    get componentProps() {
      return {
        ref: (s) => {
          r = s;
        },
        tabIndex: 0,
        onClick: i,
        "data-is-navitem": !0,
        "data-navitem-active": e.active ? !0 : void 0,
      };
    },
    get children() {
      return [
        l(D, {
          get when() {
            return e.expandable;
          },
          get children() {
            var s = fr();
            return (
              (s.$$click = o),
              p(
                s,
                l(Rs, {
                  get class() {
                    return H(
                      n().expandButton,
                      e.expanded ? n().expandButtonOpen : n().expandButtonClose
                    );
                  },
                  size: 20,
                })
              ),
              $(() => I(s, H(n().expandButtonOuter))),
              s
            );
          },
        }),
        l(D, {
          keyed: !0,
          get when() {
            return a();
          },
          children: (s) =>
            (() => {
              var c = fr();
              return p(c, s), $(() => I(c, n().iconOuter)), c;
            })(),
        }),
        (() => {
          var s = fr();
          return (
            p(s, () => e.label),
            $(() =>
              I(
                s,
                H(
                  n().label,
                  e.bold && n().bold,
                  e.inactive && n().inactive,
                  e.hasError && n().error
                )
              )
            ),
            s
          );
        })(),
        l(D, {
          get when() {
            return e.badge != null;
          },
          get children() {
            var s = fr();
            return p(s, () => e.badge), $(() => I(s, n().badge)), s;
          },
        }),
      ];
    },
  });
}
const wg = Iu() ? 2.375 : 2,
  o4 = q((e) => ({
    root: {
      height: `${wg}rem`,
      margin: "1px 0",
      display: "flex",
      alignItems: "center",
      paddingRight: "0.5rem",
      borderRadius: e.sharp.extraSmall,
      userSelect: "none",
      webkitUserSelect: "none",
      contentVisibility: "auto",
      ...qf(e),
    },
    active: {
      background: e.color.primaryContainer,
      color: e.color.onPrimaryContainer,
    },
    error: { color: e.color.error },
    inactive: { color: e.color.onSurfaceHint },
    indent: { paddingLeft: "1rem" },
    iconOuter: {
      flexShrink: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      marginRight: "0.5rem",
      color: e.color.onSurfaceVariant,
    },
    imageIcon: {
      width: 16,
      height: 16,
      backgroundPosition: "center center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "contain",
      borderRadius: e.sharp.extraSmall,
    },
    expandButtonOuter: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 32,
      height: `${wg}rem`,
      marginRight: "0.5rem",
      fill: e.color.onSurfaceVariant,
      cursor: "pointer",
      ":hover": { color: e.color.primary },
      ":active": { color: e.color.primary },
    },
    expandButton: { transition: "transform 200ms ease" },
    expandButtonOpen: { transform: "rotate(90deg)" },
    expandButtonClose: {},
    bold: { fontWeight: 700 },
    label: { ...yn, ...e.typescale.labelLargeStyle, flex: 1 },
    badge: {
      flexShrink: 0,
      margin: "0 0 0 0.5rem",
      padding: "0.125rem 0",
      color: e.color.onSurfaceHint,
      ...e.typescale.labelMediumStyle,
    },
  }));
Bn(["click"]);
function i4(e, { width: t, height: n, quality: r } = {}) {
  return `${uo}/image?url=${encodeURIComponent(
    e
  )}&width=${t}&height=${n}&quality=${r}`;
}
function Vs(e, t) {
  const n = new URL(e);
  return `${uo}/favicon?domain=${n.host}&size=${t}`;
}
function a4(e) {
  const t = Y(se),
    n = () => t.subscriptions.data.subscriptions,
    r = () => t.subscriptions.data.categories,
    o = () => t.markers.data.unreadCounts,
    i = at(),
    [a, s] = Th(),
    c = () => {
      e.toggleSidebar(!1), i("/discover");
    },
    u = (y) => {
      wE([a, s], y.id, t.subscriptions.data.categories).catch(
        t.core.methods.reportErrorAction()
      );
    },
    d = () => {
      e.toggleSidebar(!1), i("/import");
    },
    g = () => {
      e.toggleSidebar(!1), i("/export");
    },
    f = () =>
      l(Vo, {
        children: () => [
          l(Ee, {
            get text() {
              return h("Import…");
            },
            onClick: d,
          }),
          l(Ee, {
            get text() {
              return h("Export…");
            },
            onClick: g,
          }),
        ],
      }),
    m = () => [
      l(Z, {
        variant: "text",
        color: "neutral",
        size: "small",
        icon: uu,
        edge: "start",
        onClick: c,
      }),
      l(Go, {
        variant: "text",
        color: "neutral",
        size: "small",
        icon: au,
        edge: "end",
        renderDropdown: f,
      }),
    ];
  return l(Ru, {
    get class() {
      return e.class;
    },
    get title() {
      return h("Feeds");
    },
    get edge() {
      return e.edge;
    },
    get actions() {
      return m();
    },
    get children() {
      return [
        l(Qe, {
          get each() {
            return t.subscriptions.uiSubscriptions().categorized;
          },
          children: (y) => {
            const b = r()[y[0]];
            if (!b) return;
            const v = () => a().includes(b.id);
            return [
              l(s4, {
                item: y,
                category: b,
                get expanded() {
                  return v();
                },
                get unreadCount() {
                  return Ra(t.markers.methods.getCategoryUnreadCounts()[b.id]);
                },
                get onCategoryClick() {
                  return e.onCategoryClick;
                },
                onToggleExpandingState: u,
              }),
              l(D, {
                get when() {
                  return v();
                },
                get children() {
                  return l(Qe, {
                    get each() {
                      return y[1];
                    },
                    children: (S) => {
                      const A = n()[S];
                      if (A)
                        return l(Sg, {
                          subscription: A,
                          indent: !0,
                          get unreadCount() {
                            return Ra(o()[S]);
                          },
                          get onSubscriptionClick() {
                            return e.onSubscriptionClick;
                          },
                        });
                    },
                  });
                },
              }),
            ];
          },
        }),
        l(Qe, {
          get each() {
            return t.subscriptions.uiSubscriptions().uncategorized;
          },
          children: (y) => {
            const b = n()[y];
            if (b)
              return l(Sg, {
                subscription: b,
                get unreadCount() {
                  return Ra(o()[y]);
                },
                get onSubscriptionClick() {
                  return e.onSubscriptionClick;
                },
              });
          },
        }),
      ];
    },
  });
}
function s4(e) {
  const t = () =>
    Wt.type === An.FEED &&
    Wt.streamId.type === K.CATEGORY &&
    Wt.streamId.id === e.category.id;
  return l(ia, {
    get label() {
      return e.category.label;
    },
    expandable: !0,
    get expanded() {
      return e.expanded;
    },
    get badge() {
      return e.unreadCount;
    },
    get bold() {
      return e.unreadCount != null && e.unreadCount > 0;
    },
    get active() {
      return t();
    },
    onExpandButtonClick: () => {
      var r;
      (r = e.onToggleExpandingState) == null || r.call(e, e.category);
    },
    get onClick() {
      var r;
      return (r = e.onCategoryClick) == null
        ? void 0
        : r.bind(void 0, e.category);
    },
  });
}
function Sg(e) {
  const t = Y(se),
    n = () =>
      Wt.type === An.FEED &&
      Wt.streamId.type === K.SUBSCRIPTION &&
      Wt.streamId.id === e.subscription.id,
    r = L(() => {
      var i;
      return (i = t.feedStates.data.feedStates[e.subscription.feedId]) == null
        ? void 0
        : i.hasErrors;
    }),
    o = L(() => {
      var i;
      return (i = t.feedStates.data.feedStates[e.subscription.feedId]) == null
        ? void 0
        : i.inactive;
    });
  return l(ia, {
    get label() {
      return Gi(e.subscription.title);
    },
    get icon() {
      var i;
      return Vs(
        (i = e.subscription.homePageUrl) != null ? i : e.subscription.feedUrl,
        32
      );
    },
    get indent() {
      return e.indent;
    },
    get badge() {
      return e.unreadCount;
    },
    get bold() {
      return e.unreadCount != null && e.unreadCount > 0;
    },
    get active() {
      return n();
    },
    get hasError() {
      return r();
    },
    get inactive() {
      return o();
    },
    get onClick() {
      var i;
      return (i = e.onSubscriptionClick) == null
        ? void 0
        : i.bind(void 0, e.subscription);
    },
  });
}
function l4(e) {
  const t = Y(se),
    n = () =>
      Object.values(t.tags.data.tags).filter((o) => !o.label.startsWith(lo)),
    r = sp((o) => Vt(t, { type: K.TAG, id: o.label }), !0);
  return l(D, {
    keyed: !0,
    get when() {
      return n();
    },
    children: (o) =>
      l(D, {
        get when() {
          return o.length > 0;
        },
        get children() {
          return l(Ru, {
            get title() {
              return h("Tags");
            },
            get children() {
              return l(Qe, {
                each: o,
                children: (i) =>
                  l(ia, {
                    get label() {
                      return i.label;
                    },
                    icon: ns,
                    bold: !0,
                    get active() {
                      return r(i);
                    },
                    get onClick() {
                      var a;
                      return (a = e.onTagClick) == null
                        ? void 0
                        : a.bind(void 0, i);
                    },
                  }),
              });
            },
          });
        },
      }),
  });
}
var c4 = w(
  "<dl><dt>Twitter</dt><dd></dd><dt></dt><dd></dd><dt></dt><dd></dd><dt></dt><dd></dd><dt></dt><dd>&nbsp;"
);
function sm() {
  const e = u4();
  return l(Gt, {
    size: "medium",
    center: !0,
    get children() {
      return [
        l(j, {
          variant: "displayLarge",
          align: "center",
          gutterBottom: !0,
          get children() {
            return h("Qi Reader");
          },
        }),
        l(j, {
          variant: "titleLarge",
          align: "center",
          color: "onSurfaceHint",
          gutterBottom: !0,
          get children() {
            return h("A modern web RSS reader");
          },
        }),
        (() => {
          var t = c4(),
            n = t.firstChild,
            r = n.nextSibling,
            o = r.nextSibling,
            i = o.nextSibling,
            a = i.nextSibling,
            s = a.nextSibling,
            c = s.nextSibling,
            u = c.nextSibling,
            d = u.nextSibling,
            g = d.nextSibling,
            f = g.firstChild;
          return (
            p(
              r,
              l(Pe, {
                href: "https://twitter.com/qireaderapp",
                openInNew: !0,
                openInNewMark: !1,
                children: "@qireaderapp",
              })
            ),
            p(o, () => h("Email")),
            p(
              i,
              l(Pe, {
                href: "mailto:oxyry.com+qireader@gmail.com?subject=QiReader Feedback",
                openInNew: !0,
                native: !0,
                openInNewMark: !1,
                children: "oxyry.com+qireader@gmail.com",
              })
            ),
            p(a, () => h("Discuss and bug reporting")),
            p(
              s,
              l(Pe, {
                href: "https://github.com/oxyry/qireader/issues",
                openInNew: !0,
                openInNewMark: !1,
                children: "github.com/oxyry/qireader/issues",
              })
            ),
            p(c, () => h("Mirror sites")),
            p(
              u,
              l(Pe, {
                href: "/china",
                get children() {
                  return h("China mirror");
                },
              })
            ),
            p(d, () => h("Logo Download")),
            p(
              g,
              l(Pe, {
                href: "/icon.svg",
                openInNew: !0,
                openInNewMark: !1,
                children: "svg",
              }),
              f
            ),
            p(
              g,
              l(Pe, {
                href: "/icon512.png",
                openInNew: !0,
                openInNewMark: !1,
                children: "png",
              }),
              null
            ),
            $(() => I(t, e().list)),
            t
          );
        })(),
        L(
          () =>
            L(() => !0)() &&
            l(j, {
              variant: "bodySmall",
              color: "onSurfaceVariant",
              paragraph: !0,
              get children() {
                return h(
                  "Last build: %s",
                  new Date(1715784815736).toLocaleString()
                );
              },
            })
        ),
      ];
    },
  });
}
const u4 = q((e) => ({
  logoImage: { width: 256, height: 256 },
  list: {
    margin: "3rem 0 2rem",
    " dt": {
      color: e.color.onSurfaceVariant,
      textTransform: "uppercase",
      ...e.typescale.labelLargeStyle,
    },
    " dd": {
      margin: "0 0 1.5rem",
      ...e.typescale.bodyMediumStyle,
      overflowWrap: "break-word",
    },
  },
}));
function d4(e) {
  return l(an, {
    get title() {
      return h("About");
    },
    get isShown() {
      return e.isShown;
    },
    hasClose: !0,
    hasCancel: !1,
    hasFooter: !1,
    get onCancel() {
      return e.onClose;
    },
    children: () => l(sm, {}),
  });
}
var Ws = ((e) => (
  (e[(e.PERMANENT = 0)] = "PERMANENT"), (e[(e.TEMPORARY = 1)] = "TEMPORARY"), e
))(Ws || {});
function Du(e) {
  const t = Y(se),
    n = at(),
    r = g4();
  let o;
  const [i, a] = N(!1),
    [s, c] = N(!1),
    [u, d] = N(!1),
    g = Y(oi),
    f = (Q) => {
      e.toggleSidebar(!1),
        g.getSidebarType() === Dn.FLOOR
          ? requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  n(Q);
                }, 10);
              });
            })
          : n(Q);
    },
    m = () => {
      f(Vt(t, { type: K.CATEGORY, id: Cn.ALL }));
    },
    y = (Q) => {
      f(Vt(t, { type: K.CATEGORY, id: Q.label }));
    },
    b = (Q) => {
      f(Vt(t, { type: K.SUBSCRIPTION, id: Q.id }));
    },
    v = (Q) => {
      f(Vt(t, { type: K.TAG, id: Q.id }));
    },
    S = () => {
      v(t.tags.methods.getSystemTag(co.READ_LATER));
    },
    A = () => {
      f("/settings");
    },
    k = () => {
      f("/plans");
    },
    T = () => {
      t.core.methods.logoutAction().catch(t.core.methods.reportErrorAction());
    },
    E = () => {
      t.core.methods.notifyInfo(
        `Version: 18.1.2 (${new Date(1715784815736).toLocaleString()})`
      );
    },
    P = () => {
      vs(o, o, "down", { topPadding: je, behavior: "smooth" });
    },
    M = () => {
      vs(o, o, "up", { topPadding: je, behavior: "smooth" });
    },
    x = (Q) => {
      im(o, Q, { topPadding: je, behavior: "smooth" });
    },
    _ = () => {
      const Q = e.variant === 1 && !e.toggleSidebar(!0);
      am(o, o, void 0, { topPadding: je, behavior: Q ? "auto" : "smooth" });
    },
    R = () => {
      Jr.emit("focusEntryList");
    },
    z = () => {
      Jr.emit("focusArticleView");
    },
    J = () => {
      location.reload();
    };
  xu("focusSidebar", _),
    bs(() => {
      c(!1), a(!1);
    }),
    Lt(() => {
      requestAnimationFrame(() => {
        const Q = o.querySelector("[data-navitem-active]");
        Q && Hs(o, Q, { topPadding: je, behavior: "auto", align: "center" });
      });
    }),
    ti(
      () => o,
      [
        [["l", "ArrowRight"], R],
        ["shift+L", z],
        [["j", "ArrowDown"], P],
        [["k", "ArrowUp"], M],
        [["PageUp", "shift+Space"], () => x("up")],
        [["PageDown", "Space"], () => x("down")],
      ]
    );
  const ne = () =>
    l(Vo, {
      children: (Q) => {
        if (Q === "/")
          return [
            l(Ee, {
              get text() {
                return h("Settings");
              },
              icon: du,
              onClick: A,
            }),
            l(nm, { path: "/theme/" }),
            l(Ee, {
              get text() {
                return h("Plans");
              },
              icon: Sw,
              onClick: k,
            }),
            l(tn, {}),
            l(Ee, {
              get text() {
                return h("Keyboard shortcuts");
              },
              icon: rh,
              onClick: () => t.core.methods.setShowShortcutsDialogMutation(!0),
            }),
            l(Ee, {
              get text() {
                return h("Feedback");
              },
              icon: Hw,
              onClick: () => {
                c(!0);
              },
            }),
            l(Ee, {
              get text() {
                return h("About");
              },
              icon: Pw,
              onClick: () => void d(!0),
            }),
            l(tn, {}),
            l(D, {
              get when() {
                return !Kr || !1;
              },
              get children() {
                return l(Ee, {
                  get text() {
                    return h("Install app");
                  },
                  icon: tS,
                  onClick: () => {
                    a(!0);
                  },
                });
              },
            }),
            l(D, {
              get when() {
                return Kr || !1;
              },
              get children() {
                return l(Ee, {
                  get text() {
                    return h("Refresh app");
                  },
                  icon: oh,
                  onClick: J,
                });
              },
            }),
            l(Ee, {
              get text() {
                return h("Log out");
              },
              icon: Uw,
              onClick: T,
            }),
          ];
        if (Q === "/theme/") return l(tm, {});
        W(!1);
      },
    });
  return l(Lr, {
    ref(Q) {
      var ye = Uh(e.ref, (B) => (o = B));
      typeof ye == "function" && ye(Q);
    },
    get class() {
      return H(r().root, e.class);
    },
    rootProps: { "data-is-navitem-container": !0 },
    renderTopBar: () => [
      l(Qf, {
        get class() {
          return r().logo;
        },
        size: 28,
        onDblClick: E,
      }),
      l(Cu, {}),
      l(ii, { type: "dock" }),
      l(Go, {
        variant: "text",
        color: "neutral",
        icon: Nw,
        edge: "end",
        renderDropdown: ne,
      }),
    ],
    elevateAppBar: !1,
    get levelUp() {
      return g.getSidebarType() === Dn.FLOOR ? 0 : 2;
    },
    get children() {
      return [
        l(Ns, {
          get class() {
            return r().swipeArea;
          },
          get onViewSwipeStart() {
            return g.onSidebarSwipeStart;
          },
          get onViewSwipeMove() {
            return g.onSidebarSwipeMove;
          },
          get onViewSwipeLeftEnd() {
            return g.onSidebarSwipeLeftEnd;
          },
          get onViewSwipeCancel() {
            return g.onSidebarSwipeCancel;
          },
          get children() {
            return [
              l(Ru, {
                edge: "top",
                get children() {
                  return [l(f4, { onClick: m }), l(h4, { onClick: S })];
                },
              }),
              l(l4, { onTagClick: v }),
              l(a4, {
                get toggleSidebar() {
                  return e.toggleSidebar;
                },
                get class() {
                  return r().subscriptionList;
                },
                onCategoryClick: y,
                onSubscriptionClick: b,
              }),
            ];
          },
        }),
        l(Jt, {
          get on() {
            return i();
          },
          get children() {
            return l(n4, {
              get isShown() {
                return i();
              },
              onClose: () => a(!1),
            });
          },
        }),
        l(Jt, {
          get on() {
            return s();
          },
          get children() {
            return l(QA, {
              get isShown() {
                return s();
              },
              onClose: () => {
                c(!1);
              },
            });
          },
        }),
        l(Jt, {
          get on() {
            return u();
          },
          get children() {
            return l(d4, {
              get isShown() {
                return u();
              },
              onClose: () => {
                d(!1);
              },
            });
          },
        }),
      ];
    },
  });
}
const g4 = q((e) => ({
  root: { ...En, overflow: "auto", scrollbarWidth: "thin", ...ru(e, !0) },
  logo: { margin: "0 0.5rem" },
  swipeArea: { minHeight: `calc(100% - ${je}px - 2px - 1rem - 8px)` },
  subscriptionList: { marginBottom: 0, paddingBottom: "0.75rem" },
}));
function f4(e) {
  const t = Y(se),
    n = () =>
      Wt.type === An.FEED &&
      Wt.streamId.type === K.CATEGORY &&
      Wt.streamId.id === t.subscriptions.methods.getSystemCategory(Cn.ALL).id,
    r = L(() =>
      Object.values(t.markers.data.unreadCounts).reduce((o, i) => o + i, 0)
    );
  return l(ia, {
    get label() {
      return h("All");
    },
    icon: Fw,
    get bold() {
      return r() > 0;
    },
    get badge() {
      return Ra(r());
    },
    get active() {
      return n();
    },
    get onClick() {
      return e.onClick;
    },
  });
}
function h4(e) {
  const t = Y(se),
    n = () =>
      Wt.type === An.FEED &&
      Wt.streamId.type === K.TAG &&
      Wt.streamId.id === t.tags.methods.getSystemTag(co.READ_LATER).id;
  return l(ia, {
    get label() {
      return h("Read Later");
    },
    icon: Lw,
    get active() {
      return n();
    },
    bold: !0,
    get onClick() {
      return e.onClick;
    },
  });
}
function m4(e) {
  return l(Vh, {
    get isShown() {
      return e.isShown;
    },
    unmountOnExit: !1,
    onClose: () => {
      e.toggleSidebar(!1);
    },
    children: () =>
      l(Du, {
        get variant() {
          return Ws.TEMPORARY;
        },
        get toggleSidebar() {
          return e.toggleSidebar;
        },
      }),
  });
}
const y4 = 500,
  p4 = Qi(() => {
    const [e, t] = N(!1);
    let n;
    return (
      Wr(
        window,
        "keydown",
        () => {
          t(!0), n && clearTimeout(n), (n = setTimeout(() => t(!1), y4));
        },
        { capture: !0 }
      ),
      e
    );
  });
function v4(e) {
  let t;
  const n = p4();
  xf(
    () =>
      e.isShown() && e.shouldCloseOnEscapePress ? e.containerEl() : void 0,
    "keydown",
    (c) => {
      var u;
      c.key === "Escape" &&
        e.shouldCloseOnEscapePress &&
        ((u = e.onClose) == null || u.call(e));
    }
  );
  const o = () => (
      (t = document.activeElement),
      requestAnimationFrame(() => {
        e.containerEl() &&
          document.activeElement &&
          e.isShown() &&
          (n()
            ? nu(e.containerEl())
            : e.containerEl().focus({ preventScroll: !0 }));
      })
    ),
    i = () =>
      requestAnimationFrame(() => {
        if (
          !t ||
          !e.containerEl() ||
          !document.activeElement ||
          e.containerEl().contains(t)
        )
          return;
        const c = e.containerEl().contains(document.activeElement);
        (document.activeElement === document.body || c) && t.focus();
      });
  ie(
    pe(
      e.isShown,
      (c) => {
        c ? a() : s();
      },
      { defer: !0 }
    )
  );
  const a = () => {
      o();
    },
    s = () => {
      i();
    };
}
var b4 = w("<div>");
function w4(e) {
  let t, n;
  const r = Y(oi),
    o = S4();
  return (
    v4({
      isShown: () => e.isShown,
      containerEl: () => n,
      shouldCloseOnEscapePress: !0,
      onClose: () => {
        r.toggleSidebar(!1);
      },
    }),
    l(zn, {
      ref(a) {
        var s = t;
        typeof s == "function" ? s(a) : (t = a);
      },
      get class() {
        return o().root;
      },
      level: 3,
      get "oncapture:click"() {
        return e.onClick;
      },
      get children() {
        var a = b4();
        return (
          p(
            a,
            l(Du, {
              ref(s) {
                var c = n;
                typeof c == "function" ? c(s) : (n = s);
              },
              get variant() {
                return Ws.TEMPORARY;
              },
              get toggleSidebar() {
                return e.toggleSidebar;
              },
            })
          ),
          $(() => I(a, o().inner)),
          a
        );
      },
    })
  );
}
const S4 = q(() => ({
  root: { ...En },
  inner: { ...Hb, width: `var(${Xr})` },
}));
var E4 = w("<div>");
const C4 = Xt("resizable", {});
function lm(e) {
  const [, t] = Ve(e, ["ref", "class", "resizableName", "defaultSize"]),
    [n, r] = C4();
  function o(u) {
    return n()[u];
  }
  function i(u, d) {
    r({ ...n(), [u]: d });
  }
  const a =
    o(e.resizableName) != null ? `${o(e.resizableName)}px` : e.defaultSize;
  let s;
  const c = () => {
    const u = s.clientWidth;
    u !== o(e.resizableName) && i(e.resizableName, u);
  };
  return (() => {
    var u = E4();
    return (
      (u.$$pointerup = c),
      tt((d) => {
        (s = d), typeof e.ref == "function" ? e.ref(d) : (e.ref = d);
      }, u),
      Je(
        u,
        F(
          {
            get class() {
              return H(e.class, { resize: "horizontal" });
            },
            get style() {
              return {
                width: a,
                "min-width": e.minSize,
                "max-width": e.maxSize,
              };
            },
          },
          t
        ),
        !1,
        !1
      ),
      u
    );
  })();
}
Bn(["pointerup"]);
function A4(e) {
  const t = I4();
  return l(zn, {
    get class() {
      return t().root;
    },
    level: 1,
    get children() {
      return l(lm, {
        get class() {
          return t().resizable;
        },
        resizableName: "sidebar",
        defaultSize: "15rem",
        minSize: "12rem",
        maxSize: "50vw",
        get children() {
          return l(Du, {
            get variant() {
              return Ws.PERMANENT;
            },
            get toggleSidebar() {
              return e.toggleSidebar;
            },
          });
        },
      });
    },
  });
}
const I4 = q((e) => ({
  root: {
    overflow: "hidden",
    borderRight: `1px solid ${e.color.outlineVariant}`,
  },
  resizable: { position: "relative", height: "100%", overflow: "hidden" },
}));
var Eg = w("<div>"),
  Dn = ((e) => (
    (e[(e.FLOAT = 1)] = "FLOAT"),
    (e[(e.PERMANENT = 2)] = "PERMANENT"),
    (e[(e.FLOOR = 3)] = "FLOOR"),
    e
  ))(Dn || {});
const x4 = Xt("sidebar"),
  oi = on();
function k4(e) {
  const [t, n] = Au(!1),
    [r, o] = N(),
    [i, a] = N(),
    s = Y(se),
    { getViewportSize: c } = Uo(),
    [u, d] = x4(),
    g = fs(r);
  ie(() => {
    const B = g();
    B
      ? document.body.style.setProperty("--root-height", `${B.height}px`)
      : document.body.style.removeProperty("--root-height");
  });
  const f = fs(i),
    m = () => {
      var B;
      return (B = f()) == null ? void 0 : B.width;
    },
    y = L(() => c() >= iu.DESKTOP),
    b = () => {
      v() === 2 ? (d(1), n(!0), requestAnimationFrame(() => n(!1))) : d(2);
    },
    v = L(() => (y() && u() === 2 ? 2 : Iu() ? 3 : 1)),
    S = T4(),
    A = () => {
      delete i().dataset[xa];
    },
    k = (B) => {
      i().style.setProperty(Kn, `${Math.max(0, B)}px`);
    },
    T = () => {
      (i().dataset[xa] = "true"), i().style.setProperty(Kn, "0vw");
    },
    E = () => {
      n(!0);
    },
    P = () => {
      delete i().dataset[xa];
    },
    M = (B) => {
      i().style.setProperty(Kn, `calc(var(${Xr}) + ${Math.min(0, B)}px)`);
    },
    x = () => {
      (i().dataset[xa] = "true"), i().style.setProperty(Kn, `var(${Xr})`);
    },
    _ = () => {
      n(!1);
    },
    R = () => {
      i().style.setProperty(Kn, `var(${Xr})`);
    },
    z = () => {
      i().style.setProperty(Kn, "0vw");
    },
    J = () => {
      n(!1);
    };
  let ne = 0;
  const G = () => {
      ne = Date.now();
    },
    Q = () => Date.now() - ne < 250,
    ye = {
      getSidebarType: v,
      getIsSidebarShown: t,
      getContentWidth: m,
      toggleSidebar: n,
      getSidebarDockable: y,
      dockSidebar: b,
      onMainViewSwipeStart: A,
      onMainViewSwipeRightEnd: E,
      onMainViewSwipeMove: k,
      onMainViewSwipeCancel: T,
      onSidebarSwipeStart: P,
      onSidebarSwipeLeftEnd: _,
      onSidebarSwipeMove: M,
      onSidebarSwipeCancel: x,
    };
  return l(D, {
    get when() {
      return s.core.data.state === Ht.USER_LOADED;
    },
    get fallback() {
      return e.children;
    },
    get children() {
      return [
        l(_s, { name: "AppFrame" }),
        (() => {
          var B = Eg();
          return (
            tt(o, B),
            p(
              B,
              l(oi.Provider, {
                value: ye,
                get children() {
                  return [
                    l(qo, {
                      get children() {
                        return [
                          l(kt, {
                            get when() {
                              return v() === 1;
                            },
                            get children() {
                              return l(m4, {
                                get isShown() {
                                  return t();
                                },
                                toggleSidebar: n,
                              });
                            },
                          }),
                          l(kt, {
                            get when() {
                              return v() === 2;
                            },
                            get children() {
                              return l(A4, { toggleSidebar: n });
                            },
                          }),
                          l(kt, {
                            get when() {
                              return v() === 3;
                            },
                            get children() {
                              return l(w4, {
                                get isShown() {
                                  return t();
                                },
                                toggleSidebar: n,
                                onClick: G,
                              });
                            },
                          }),
                        ];
                      },
                    }),
                    l(Zr, {
                      children: (le) =>
                        l(Os, {
                          get in() {
                            return t();
                          },
                          duration: jr,
                          get exitDuration() {
                            return Q() ? 0 : jr;
                          },
                          onEntered: R,
                          onExited: z,
                          children: (Se) =>
                            (() => {
                              var Ie = Eg();
                              return (
                                tt(a, Ie),
                                le != null
                                  ? Ie.style.setProperty("z-index", le)
                                  : Ie.style.removeProperty("z-index"),
                                Je(
                                  Ie,
                                  F(
                                    {
                                      get class() {
                                        return H(
                                          S().container,
                                          v() === 3 && S().containerAboveFloor,
                                          v() === 3 &&
                                            (Se() === Et.ENTERING
                                              ? S().floorEntering
                                              : Se() === Et.ENTERED
                                              ? S().floorEntered
                                              : Se() === Et.EXITING
                                              ? Q()
                                                ? void 0
                                                : S().floorExiting
                                              : Se() === Et.EXITED
                                              ? Q()
                                                ? S()
                                                    .floorExitedWithoutAnimation
                                                : S().floorExited
                                              : void 0),
                                          v() === 3 && S().floorSwiping
                                        );
                                      },
                                    },
                                    { [cs]: t5 }
                                  ),
                                  !1,
                                  !0
                                ),
                                p(Ie, () => e.children, null),
                                p(
                                  Ie,
                                  l(D, {
                                    get when() {
                                      return (
                                        L(() => v() === 3)() &&
                                        Se() === Et.ENTERED
                                      );
                                    },
                                    get children() {
                                      return l(Zr, {
                                        children: (ae) =>
                                          l(Ns, {
                                            style: { "z-index": ae },
                                            get class() {
                                              return S().swipeBackdrop;
                                            },
                                            onViewSwipeStart: P,
                                            onViewSwipeMove: M,
                                            onViewSwipeLeftEnd: _,
                                            onViewSwipeCancel: x,
                                            onClick: J,
                                          }),
                                      });
                                    },
                                  }),
                                  null
                                ),
                                Ie
                              );
                            })(),
                        }),
                    }),
                  ];
                },
              })
            ),
            $(() => I(B, S().root)),
            B
          );
        })(),
      ];
    },
  });
}
const cm = "data-sidebar-swipe-cancel",
  xa = Af(cm),
  Kn = "--sidebar-swipe-offset",
  Xr = "--floor-sidebar-width",
  um = "FloorSidebar-entering",
  dm = "FloorSidebar-exiting";
Ft(`
@keyframes ${um} {
  from {
    transform: translateX(var(${Kn}, 0vw));
    pointer-events: none;
  }
  to {
    transform: translateX(var(${Xr}));
    pointer-events: auto;
  }
}
@keyframes ${dm} {
  from {
    transform: translateX(var(${Kn}, var(${Xr})));
    pointer-events: none;
  }
  to {
    transform: translateX(0vw);
    pointer-events: auto;
  }
}
`);
const T4 = q((e) => ({
  root: {
    ...$s,
    display: "flex",
    alignItems: "stretch",
    "--floor-sidebar-width": "min(calc(100vw - 3.5rem), 20rem)",
  },
  container: {
    position: "relative",
    flex: 1,
    overflow: "hidden",
    backgroundColor: e.color.background,
    [`[${cm}]`]: { transition: `transform ${jr}ms ease-out` },
  },
  containerAboveFloor: { boxShadow: e.swipeableViewShadow },
  floorSwiping: { transform: `translateX(var(${Kn}, 0vw))` },
  floorEntering: { animation: `${um} ${jr}ms ${Fv} forwards` },
  floorEntered: { animation: `transform: translateX(var(${Xr}))` },
  floorExiting: { animation: `${dm} ${jr}ms ease-out forwards` },
  floorExited: { animation: "transform: translateX(0vw)" },
  floorExitedWithoutAnimation: { transition: "none !important" },
  swipeBackdrop: { ...En },
}));
function ii(e) {
  e = F({ type: "toggle" }, e);
  const t = Mn(Y(oi));
  return l(D, {
    get when() {
      return L(() => e.type === "toggle")()
        ? [Dn.FLOAT, Dn.FLOOR].includes(t.getSidebarType())
        : t.getSidebarDockable();
    },
    get children() {
      return l(Z, {
        variant: "text",
        color: "neutral",
        get icon() {
          return L(() => e.type === "toggle")() ||
            t.getSidebarType() === Dn.PERMANENT
            ? $d
            : rS;
        },
        get title() {
          return L(() => e.type === "dock")()
            ? L(() => t.getSidebarType() === Dn.PERMANENT)()
              ? h("Hide sidebar")
              : h("Dock sidebar")
            : void 0;
        },
        edge: "start",
        onClick: () => {
          e.type === "toggle" ? t.toggleSidebar() : t.dockSidebar();
        },
      });
    },
  });
}
var L4 = w("<div><div>");
function ai(e) {
  const t = Y(se),
    n = at(),
    r = wy(() => "/login"),
    o = P4();
  return [
    (() => {
      var i = L4(),
        a = i.firstChild;
      return (
        p(
          i,
          l(Pe, {
            get class() {
              return o().logo;
            },
            href: "/",
            color: "inherit",
            textDecoration: !1,
            get children() {
              return l(Qf, { width: "auto", height: 36 });
            },
          }),
          a
        ),
        p(
          i,
          l(D, {
            get when() {
              return !t.core.data.currentUser;
            },
            get children() {
              return l(Pe, {
                style: "margin-right: 1rem",
                href: "/plans",
                get children() {
                  return h("Plans");
                },
              });
            },
          }),
          null
        ),
        p(
          i,
          l(D, {
            get when() {
              return L(() => !t.core.data.currentUser)() && !r();
            },
            get children() {
              return l(Pe, {
                href: "/login",
                get children() {
                  return h("Log in");
                },
              });
            },
          }),
          null
        ),
        p(
          i,
          l(D, {
            get when() {
              return t.core.data.currentUser;
            },
            get children() {
              return l(Z, {
                variant: "text",
                color: "neutral",
                icon: $w,
                onClick: () => {
                  n("/");
                },
              });
            },
          }),
          null
        ),
        $(
          (s) => {
            var c = o().appHeader,
              u = o().space;
            return (
              c !== s.e && I(i, (s.e = c)), u !== s.t && I(a, (s.t = u)), s
            );
          },
          { e: void 0, t: void 0 }
        ),
        i
      );
    })(),
    L(() => e.children),
  ];
}
const P4 = q(() => ({
  appHeader: { margin: "1.25rem", display: "flex", alignItems: "center" },
  logo: { display: "flex", alignItems: "center" },
  space: { flex: 1 },
  content: { marginTop: "2rem" },
}));
var M4 = w("<div>");
function aa(e) {
  const t = $4();
  return l(ai, {
    get children() {
      return l(Gt, {
        size: "narrow",
        center: !0,
        get children() {
          return [
            L(
              () =>
                L(() => !!e.renderTitle)() &&
                l(j, {
                  variant: "headlineLarge",
                  get class() {
                    return t().title;
                  },
                  gutterBottom: !0,
                  get children() {
                    return e.renderTitle();
                  },
                })
            ),
            L(
              () =>
                L(() => !!e.renderSubtitle)() &&
                l(j, {
                  get class() {
                    return t().subtitle;
                  },
                  color: "onSurfaceVariant",
                  gutterBottom: !0,
                  get children() {
                    return e.renderSubtitle();
                  },
                })
            ),
            (() => {
              var n = M4();
              return p(n, () => e.children), $(() => I(n, t().content)), n;
            })(),
          ];
        },
      });
    },
  });
}
const $4 = q(() => ({
  title: {
    marginTop: "4rem",
    "@media (max-width: 600px)": { marginTop: "2rem !important" },
  },
  subtitle: {},
  content: { marginTop: "2rem" },
}));
var R4 = w("<form action=/api/session method=post><div>");
function gm() {
  const e = Y(se),
    [t, n] = N(""),
    [r, o] = N(""),
    i = at();
  e.core.data.state === Ht.USER_LOADED && i("/", { replace: !0 });
  const {
      getIsBusy: a,
      getError: s,
      execute: c,
    } = lt(async () => {
      if (await e.core.methods.loginAction(t(), r())) i("/", { replace: !0 });
      else return h("Incorrect email or password.");
    }),
    u = (f) => {
      n(f.currentTarget.value);
    },
    d = (f) => {
      o(f.currentTarget.value);
    },
    g = (f) => {
      f.preventDefault(), c().catch(e.core.methods.reportErrorAction());
    };
  return (
    Kt(() => Yt(h("Login"))),
    l(aa, {
      renderTitle: () => h("Log in"),
      renderSubtitle: () => [
        L(() => h("Don't have an account?")),
        " ",
        l(Pe, {
          href: "/register",
          get children() {
            return [L(() => h("Sign up")), " →"];
          },
        }),
      ],
      get children() {
        var f = R4(),
          m = f.firstChild;
        return (
          f.addEventListener("submit", g),
          p(
            f,
            l(D, {
              keyed: !0,
              get when() {
                return s();
              },
              children: (y) => l(Nt, { severify: "error", children: y }),
            }),
            m
          ),
          p(
            f,
            l(ke, {
              get children() {
                return l(At, {
                  get label() {
                    return h("Email");
                  },
                  get inputProps() {
                    return {
                      type: "email",
                      name: "email",
                      value: t(),
                      required: !0,
                      autofocus: !0,
                      onInput: u,
                      onChange: u,
                    };
                  },
                  full: !0,
                });
              },
            }),
            m
          ),
          p(
            f,
            l(ke, {
              get children() {
                return l(At, {
                  get label() {
                    return h("Password");
                  },
                  get inputProps() {
                    return {
                      type: "password",
                      name: "password",
                      value: r(),
                      required: !0,
                      onInput: d,
                      onChange: d,
                    };
                  },
                  full: !0,
                });
              },
            }),
            m
          ),
          p(
            f,
            l(ke, {
              group: !0,
              end: !0,
              get children() {
                return l(Z, {
                  variant: "filled",
                  type: "submit",
                  get isLoading() {
                    return a();
                  },
                  full: !0,
                  get children() {
                    return h("Log in");
                  },
                });
              },
            }),
            m
          ),
          p(
            m,
            l(Pe, {
              href: "/reset-password",
              color: "onSurfaceVariant",
              get children() {
                return h("Forgot password?");
              },
            })
          ),
          $(() =>
            I(
              m,
              H({
                marginTop: "3rem",
                textAlign: "center",
                fontSize: "0.875rem",
              })
            )
          ),
          f
        );
      },
    })
  );
}
function fm(e) {
  const t = Y(se);
  return l(qo, {
    get children() {
      return [
        l(kt, {
          get when() {
            return t.core.data.state === Ht.LOGGED_OUT;
          },
          get children() {
            var n;
            return (n = e.fallback) != null ? n : l(gm, {});
          },
        }),
        l(kt, {
          get when() {
            return t.core.data.state === Ht.USER_LOADED;
          },
          get children() {
            return e.children;
          },
        }),
      ];
    },
  });
}
function Hn(e) {
  return (t) =>
    l(fm, {
      get children() {
        return l(e, t);
      },
    });
}
q((e) => ({
  page: { animation: St.slideDownIn10.cssText },
  section: { margin: "0 0 1.5rem" },
  items: { display: "flex", flexWrap: "wrap" },
  item: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    margin: "0 0.75rem 0.75rem 0",
    width: "9rem",
    "@media (max-width: 24rem)": { width: "100%" },
    height: "6.5rem",
    padding: "0.75rem",
    background: e.color.surfaceVariant,
    color: e.color.onSurfaceVariant,
    borderRadius: e.sharp.medium,
    textDecoration: "none",
    userSelect: "none",
    webkitUserSelect: "none",
    cursor: "pointer",
    ":link": { color: "inherit" },
    ":active": { color: "inherit" },
  },
  itemIcon: {
    flexShrink: 0,
    width: "2.5rem",
    height: "2.5rem",
    color: e.color.onSurfaceVariant,
  },
  itemLabel: {
    overflowWrap: "break-word",
    color: e.color.onSurfaceVariant,
    ...e.typescale.labelLargeStyle,
  },
}));
const sa = q(() => ({
  page: { animation: St.slideUpIn10.cssText },
  form: { marginLeft: "0.5rem", marginRight: "0.5rem" },
}));
var D4 = w("<form method=post>");
function _4() {
  const e = Y(se),
    t = e.core.data.currentUser;
  W(t);
  const [n, r] = N(t.displayName),
    [o, i] = N(t.email),
    a = ni(),
    [s, c] = N(!1),
    {
      getIsBusy: u,
      getError: d,
      execute: g,
    } = lt(async () => {
      const A = await it("updateUser", { displayName: n(), email: o() });
      if (A.ok)
        e.core.methods.setCurrentUserMutation(A.result),
          e.core.methods.notifySuccess(h("User updated"));
      else {
        if (A.errorCode === "EMAIL_EXISTS")
          return h("An account with this email already exists.");
        if (A.errorCode === "INVALID_EMAIL") return h("Invalid email address.");
        throw new Error(A.errorCode);
      }
    }),
    f = (A) => {
      r(A.currentTarget.value);
    },
    m = (A) => {
      i(A.currentTarget.value);
    },
    y = (A) => {
      A.preventDefault(), g().catch(e.core.methods.reportErrorAction());
    },
    b = () => {
      c(!0);
    },
    v = () => {
      c(!1);
    },
    S = sa();
  return [
    (() => {
      var A = D4();
      return (
        A.addEventListener("submit", y),
        Xe(A, "id", a),
        p(
          A,
          (() => {
            var k = L(() => !!d());
            return () =>
              k() &&
              l(Nt, {
                severify: "error",
                get children() {
                  return d();
                },
              });
          })(),
          null
        ),
        p(
          A,
          l(At, {
            get label() {
              return h("Display name");
            },
            outlined: !0,
            get inputProps() {
              return {
                value: n(),
                required: !0,
                maxLength: 64,
                onInput: f,
                onChange: f,
              };
            },
          }),
          null
        ),
        p(
          A,
          l(At, {
            get label() {
              return h("Email");
            },
            outlined: !0,
            get inputProps() {
              return {
                type: "email",
                value: o(),
                required: !0,
                maxLength: 64,
                onInput: m,
                onChange: m,
              };
            },
          }),
          null
        ),
        p(
          A,
          l(ke, {
            group: !0,
            end: !0,
            get children() {
              return l(Z, {
                variant: "filled",
                type: "submit",
                get isLoading() {
                  return u();
                },
                get children() {
                  return h("Save");
                },
              });
            },
          }),
          null
        ),
        p(
          A,
          l(ke, {
            group: !0,
            get children() {
              return l(Z, {
                variant: "tonal",
                color: "error",
                onClick: b,
                get children() {
                  return h("Delete account");
                },
              });
            },
          }),
          null
        ),
        $(() => I(A, S().form)),
        A
      );
    })(),
    l(vC, {
      get isShown() {
        return s();
      },
      onCancel: v,
    }),
  ];
}
var O4 = w("<form method=post>");
function N4() {
  const e = Y(se),
    [t, n] = N(""),
    [r, o] = N(""),
    i = ni(),
    {
      getIsBusy: a,
      getError: s,
      execute: c,
    } = lt(async () => {
      if (t() !== r())
        return h("Your password and confirmation password do not match.");
      const m = await it("updateUser", { password: t() });
      if (m.ok)
        e.core.methods.setCurrentUserMutation(m.result),
          e.core.methods.notifySuccess(h("Password updated")),
          e.core.methods.logoutAction().then(() => {
            Qn("/login");
          });
      else {
        if (m.errorCode === "INVALID_PASSWORD")
          return h("Passwords must be at least %s characters in length.", _o);
        throw new Error(m.errorCode);
      }
    }),
    u = (m) => {
      n(m.currentTarget.value);
    },
    d = (m) => {
      o(m.currentTarget.value);
    },
    g = (m) => {
      m.preventDefault(), c().catch(e.core.methods.reportErrorAction());
    },
    f = sa();
  return (() => {
    var m = O4();
    return (
      m.addEventListener("submit", g),
      Xe(m, "id", i),
      p(
        m,
        (() => {
          var y = L(() => !!s());
          return () =>
            y() &&
            l(Nt, {
              severify: "error",
              get children() {
                return s();
              },
            });
        })(),
        null
      ),
      p(
        m,
        l(At, {
          get label() {
            return h("New Password");
          },
          outlined: !0,
          get inputProps() {
            return {
              type: "password",
              name: "password",
              value: t(),
              required: !0,
              maxLength: Ac,
              minLength: _o,
              onInput: u,
              onChange: u,
            };
          },
        }),
        null
      ),
      p(
        m,
        l(At, {
          get label() {
            return h("Repeat Password");
          },
          outlined: !0,
          get inputProps() {
            return {
              type: "password",
              value: r(),
              required: !0,
              maxLength: Ac,
              minLength: _o,
              onInput: d,
              onChange: d,
            };
          },
        }),
        null
      ),
      p(
        m,
        l(ke, {
          group: !0,
          end: !0,
          get children() {
            return l(Z, {
              variant: "filled",
              type: "submit",
              get isLoading() {
                return a();
              },
              get children() {
                return h("Save");
              },
            });
          },
        }),
        null
      ),
      $(() => I(m, f().form)),
      m
    );
  })();
}
const F4 = {
  af: "Afrikaans",
  ar: "Arabic",
  ca: "Catalan",
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文 ",
  da: "Danish",
  en: "English",
  fi: "Finnish",
  fr: "French",
  de: "German",
  gu: "Gujarati",
  he: "Hebrew",
  hi: "Hindi",
  is: "Icelandic",
  ga: "Irish",
  it: "Italian",
  ja: "Japanese",
  ml: "Malayalam",
  mr: "Marathi",
  pt: "Portuguese",
  es: "Spanish",
  sv: "Swedish",
  ta: "Tamil",
  cy: "Welsh",
};
var B4 = w("<input>");
const Cg = "check-state-changed";
function U4(e) {
  const t = F({ type: "checkbox" }, e),
    [n, r] = Ve(t, ["ref", "class"]),
    [o, i] = N(!!t.checked),
    a = Pt(),
    s = z4();
  let c;
  Qr(
    "click",
    () => {
      if ((i(c.checked), t.name))
        for (const d of Array.from(
          document.querySelectorAll(`input[type=${t.type}][name=${t.name}]`)
        ))
          d !== c && d.dispatchEvent(new CustomEvent(Cg));
    },
    () => c
  ),
    Qr(
      Cg,
      () => {
        i(c.checked);
      },
      () => c
    );
  const u = () =>
    t.type === "checkbox"
      ? o()
        ? nh
        : th
      : t.type === "radio"
      ? o()
        ? qi
        : Yi
      : W(!1);
  return l(Ir, {
    get class() {
      return H(s().root, n.class);
    },
    component: "label",
    componentProps: {},
    get layerBackground() {
      return a().color.primary;
    },
    get disabled() {
      return r.disabled;
    },
    get children() {
      return [
        (() => {
          var d = B4();
          return (
            tt((g) => {
              (c = g), typeof n.ref == "function" ? n.ref(g) : (n.ref = g);
            }, d),
            Je(
              d,
              F(
                {
                  get class() {
                    return s().checkbox;
                  },
                },
                r
              ),
              !1,
              !1
            ),
            d
          );
        })(),
        l(jt, {
          get component() {
            return u();
          },
          get class() {
            return H(
              s().icon,
              o() && s().iconChecked,
              r.disabled && s().iconDisabled
            );
          },
        }),
      ];
    },
  });
}
const z4 = q((e) => ({
  root: {
    width: "2.5rem",
    height: "2.5rem",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: e.sharp.full,
  },
  checkbox: { display: "none" },
  icon: { width: "1.5rem", height: "1.5rem", color: e.color.onSurfaceVariant },
  iconChecked: { color: e.color.primary },
  iconDisabled: { color: e.color.onSurface, opacity: 0.38 },
}));
var H4 = w("<div><label>");
function wn(e) {
  const [, t] = Ve(e, ["labelProps"]),
    n = ni(),
    r = V4();
  return (() => {
    var o = H4(),
      i = o.firstChild;
    return (
      p(
        o,
        l(
          U4,
          F(
            {
              get class() {
                return r().checkbox;
              },
              id: n,
            },
            t
          )
        ),
        i
      ),
      Xe(i, "for", n),
      Je(
        i,
        F(
          {
            get class() {
              return r().label;
            },
          },
          () => e.labelProps
        ),
        !1,
        !0
      ),
      p(i, () => e.children),
      $(() =>
        I(o, H("checkbox-with-label", r().root, e.inline && r().rootInline))
      ),
      o
    );
  })();
}
const V4 = q((e) => ({
  root: {
    display: "flex",
    alignItems: "center",
    "~.checkbox-with-label": { marginTop: "-0.5rem" },
  },
  rootInline: { display: "inline-flex" },
  checkbox: { flex: "0 0 auto", marginLeft: "-0.5rem" },
  label: {
    flex: "1",
    padding: "0.25rem 0",
    cursor: "pointer",
    userSelect: "none",
    ...e.typescale.labelLargeStyle,
  },
}));
var W4 = w("<select>");
function Ur(e) {
  const t = F({ size: "medium" }, e),
    [n, r] = Ve(t, ["class", "size", "inline", "full"]),
    o = G4();
  return (() => {
    var i = W4();
    return (
      Je(
        i,
        F(
          {
            get class() {
              return H(
                o().root,
                n.inline && o().inline,
                n.size === "small" ? o().sizeSmall : void 0,
                r.disabled && o().disabled,
                n.class
              );
            },
          },
          r
        ),
        !1,
        !1
      ),
      i
    );
  })();
}
const G4 = q((e) => ({
  root: {
    boxSizing: "border-box",
    height: ts.medium,
    padding: "0 0.5rem",
    background: e.color.surfaceVariant,
    color: e.color.onSurface,
    boxShadow: "none",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: mn,
    borderRadius: e.sharp.extraSmall,
    lineHeight: "normal",
    fontSize: "1rem",
    outline: "0",
    transition: `${he}ms`,
    ":focus": {
      borderColor: e.color.primary,
      boxShadow: `0 0 0 3px ${e.color.primaryContainer}`,
    },
  },
  disabled: { opacity: 0.38, cursor: "not-allowed" },
  inline: { height: "auto", verticalAlign: "middle" },
  sizeSmall: {
    padding: "0.375rem",
    height: ts.small,
    ...e.typescale.labelMediumStyle,
  },
  full: { width: "100%" },
}));
function hm(e) {
  return [5, 25, 50, 100, 200, 300].map((t) => [
    t,
    t <= 5
      ? !0
      : t <= 50
      ? [nt.PRO, nt.PRO_PLUS].includes(e.plan)
      : t > 50
      ? e.plan === nt.PRO_PLUS
      : !1,
    t <= 5 ? void 0 : t <= 50 ? "(Pro)" : t > 50 ? "(Pro+)" : void 0,
  ]);
}
var j4 = w("<li>&nbsp;"),
  Ag = w("<li>"),
  Y4 = w("<details>"),
  q4 = w("<div class=my-1>"),
  X4 = w("<option value=1>"),
  K4 = w(
    "<div class=pl-10 style=line-height:1.8><div class=my-1></div><div class=my-1></div><div class=my-1>"
  ),
  Z4 = w("<form method=post autocomplete=off>"),
  ka = w("<option>"),
  Q4 = w("<option> ");
function J4() {
  const e = Y(se),
    t = ni(),
    n = () => e.core.data.currentUser,
    r = () => n().ebookSendFrom,
    o = () => n().ebookNetDiskUrl,
    i = () => n().plan !== nt.FREE,
    [a, s] = N(n().ebookSendTo),
    [c, u] = N(n().ebookAutoSendEnabled),
    [d, g] = N(n().ebookKeepLinks),
    [f, m] = N(n().ebookAppendQrCode),
    [y, b] = N(n().ebookLanguage || "en"),
    [v, S] = N(n().ebookAutoSendInterval),
    [A, k] = N(n().ebookAutoSendHour),
    [T, E] = N(n().ebookAutoSendMinArticles),
    [P, M] = N(n().ebookAutoSendMaxArticles),
    { getIsBusy: x, execute: _ } = lt(async () => {
      const ae = await e.core.methods.updateUserAction({
        ebookSendTo: a(),
        ebookKeepLinks: d(),
        ebookAppendQrCode: f(),
        ebookLanguage: y(),
        ebookAutoSendEnabled: c(),
        ebookAutoSendInterval: v(),
        ebookAutoSendHour: A(),
        ebookAutoSendMinArticles: T(),
        ebookAutoSendMaxArticles: P(),
      });
      if (ae.ok) e.core.methods.notifySuccess(h("Preferences updated"));
      else throw new Error(ae.errorCode);
    }),
    R = (ae) => {
      s(ae.currentTarget.value);
    },
    z = (ae) => {
      g(ae.currentTarget.checked);
    },
    J = (ae) => {
      m(ae.currentTarget.checked);
    },
    ne = (ae) => {
      b(ae.currentTarget.value);
    },
    G = (ae) => {
      u(ae.currentTarget.checked);
    },
    Q = (ae) => {
      S(Number(ae.currentTarget.value));
    },
    ye = (ae) => {
      k(Number(ae.currentTarget.value));
    },
    B = (ae) => {
      E(Number(ae.currentTarget.value));
    },
    le = (ae) => {
      M(Number(ae.currentTarget.value));
    },
    Se = (ae) => {
      ae.preventDefault(), _().catch(e.core.methods.reportErrorAction());
    },
    Ie = sa();
  return (() => {
    var ae = Z4();
    return (
      ae.addEventListener("submit", Se),
      Xe(ae, "id", t),
      p(
        ae,
        l(ke, {
          get label() {
            return h("Downloads");
          },
          group: !0,
          start: !0,
          get children() {
            return [
              l(Rn, {
                get children() {
                  return h(
                    "The generated eBook files will be placed in the web disk space below. You can download it using your web browser. Files are retained for 72 hours."
                  );
                },
              }),
              l(j, {
                variant: "labelLarge",
                get children() {
                  return [
                    L(() => h("Web disk URL:")),
                    " ",
                    l(j, {
                      variant: "labelLarge",
                      color: "green",
                      component: "strong",
                      get children() {
                        return l(Pe, {
                          get href() {
                            return o();
                          },
                          openInNew: !0,
                          openInNewMark: !0,
                          get children() {
                            return o();
                          },
                        });
                      },
                    }),
                  ];
                },
              }),
            ];
          },
        }),
        null
      ),
      p(
        ae,
        l(ke, {
          get label() {
            return h("Email address");
          },
          group: !0,
          get children() {
            return [
              l(At, {
                get label() {
                  return h("Send to");
                },
                outlined: !0,
                get inputProps() {
                  return {
                    value: a(),
                    type: "email",
                    maxLength: 64,
                    onInput: R,
                    onChange: R,
                  };
                },
              }),
              l(Rn, {
                get children() {
                  return h(
                    "(Optional) You can fill in your Kindle email address or any personal email address here. The ePub file will be sent as an attachment."
                  );
                },
              }),
              l(j, {
                variant: "labelLarge",
                get children() {
                  return [
                    L(() => h("Send from:")),
                    " ",
                    l(j, {
                      variant: "labelLarge",
                      color: "green",
                      component: "strong",
                      get children() {
                        return r();
                      },
                    }),
                  ];
                },
              }),
              l(Rn, {
                get children() {
                  return h(
                    "To make sure our emails gets delivered to your Inbox, you may need to add this email address to your Safe Sender List / Contact List. "
                  );
                },
              }),
              (() => {
                var Ce = Y4();
                return (
                  p(
                    Ce,
                    l(j, {
                      component: "summary",
                      variant: "labelLarge",
                      color: "primary",
                      gutterBottom: !0,
                      get children() {
                        return h("Instructions for Amazon Kindle");
                      },
                    }),
                    null
                  ),
                  p(
                    Ce,
                    l(j, {
                      component: "ol",
                      variant: "bodyMedium",
                      get children() {
                        return [
                          (() => {
                            var we = j4(),
                              te = we.firstChild;
                            return (
                              p(we, () => h("Open the page"), te),
                              p(
                                we,
                                l(Pe, {
                                  href: "https://www.amazon.com/myk",
                                  target: "_blank",
                                  rel: "nofollow",
                                  native: !0,
                                  get children() {
                                    return h(
                                      "Amazon.com: Kindle Personal Document Settings"
                                    );
                                  },
                                }),
                                null
                              ),
                              p(
                                we,
                                () =>
                                  h(
                                    ', then open the "Preferences" tab, and expand the "Personal Document Settings" section.'
                                  ),
                                null
                              ),
                              we
                            );
                          })(),
                          (() => {
                            var we = Ag();
                            return (
                              p(we, () =>
                                h(
                                  'Add "%s" to the "Approved Personal Document E-mail List".',
                                  r()
                                )
                              ),
                              we
                            );
                          })(),
                          (() => {
                            var we = Ag();
                            return (
                              p(we, () =>
                                h(
                                  'Under "Send-to-Kindle Email Settings" find your Kindle email address and add it to the input box above.'
                                )
                              ),
                              we
                            );
                          })(),
                        ];
                      },
                    }),
                    null
                  ),
                  Ce
                );
              })(),
            ];
          },
        }),
        null
      ),
      p(
        ae,
        l(ke, {
          get label() {
            return h("File options");
          },
          group: !0,
          get children() {
            return [
              l(wn, {
                type: "checkbox",
                get checked() {
                  return d();
                },
                onClick: z,
                get children() {
                  return h("Keep links");
                },
              }),
              l(wn, {
                type: "checkbox",
                get checked() {
                  return f();
                },
                onClick: J,
                get children() {
                  return h("Add a QR code at the end of each article");
                },
              }),
              (() => {
                var Ce = q4();
                return (
                  p(
                    Ce,
                    l(j, {
                      variant: "labelLarge",
                      component: "span",
                      get children() {
                        return [L(() => h("Language")), ":", " "];
                      },
                    }),
                    null
                  ),
                  p(
                    Ce,
                    l(Ur, {
                      get value() {
                        return y();
                      },
                      inline: !0,
                      onChange: ne,
                      get children() {
                        return l(Qe, {
                          get each() {
                            return Object.entries(F4);
                          },
                          children: (we) =>
                            (() => {
                              var te = ka();
                              return (
                                p(te, () => we[1]),
                                $(() => (te.value = we[0])),
                                te
                              );
                            })(),
                        });
                      },
                    }),
                    null
                  ),
                  Ce
                );
              })(),
            ];
          },
        }),
        null
      ),
      p(
        ae,
        l(ke, {
          get label() {
            return h("Scheduled sending");
          },
          group: !0,
          end: !0,
          get children() {
            return [
              l(wn, {
                type: "checkbox",
                get checked() {
                  return c();
                },
                get disabled() {
                  return !i();
                },
                onClick: G,
                get children() {
                  return h("Send new articles automatically (Paid users only)");
                },
              }),
              (() => {
                var Ce = K4(),
                  we = Ce.firstChild,
                  te = we.nextSibling,
                  be = te.nextSibling;
                return (
                  p(
                    we,
                    l(j, {
                      variant: "labelLarge",
                      component: "span",
                      get children() {
                        return [L(() => h("Interval")), ":", " "];
                      },
                    }),
                    null
                  ),
                  p(
                    we,
                    l(Ur, {
                      get value() {
                        return v();
                      },
                      inline: !0,
                      get disabled() {
                        return !i();
                      },
                      onChange: Q,
                      get children() {
                        return [
                          (() => {
                            var fe = X4();
                            return p(fe, () => h("Every day")), fe;
                          })(),
                          l(Qe, {
                            each: [2, 3, 4, 5, 7, 10, 15],
                            children: (fe) =>
                              (() => {
                                var re = ka();
                                return (
                                  (re.value = fe),
                                  p(re, () => h("Every %s days", fe)),
                                  re
                                );
                              })(),
                          }),
                        ];
                      },
                    }),
                    null
                  ),
                  p(
                    we,
                    l(j, {
                      variant: "labelLarge",
                      component: "span",
                      get children() {
                        return [" ", L(() => h("at")), " "];
                      },
                    }),
                    null
                  ),
                  p(
                    we,
                    l(Ur, {
                      get value() {
                        return A();
                      },
                      inline: !0,
                      get disabled() {
                        return !i();
                      },
                      onChange: ye,
                      get children() {
                        return l(Qe, {
                          get each() {
                            return Array.from({ length: 24 }).map(
                              (fe, re) => re
                            );
                          },
                          children: (fe) =>
                            (() => {
                              var re = ka();
                              return (re.value = fe), p(re, () => eI(fe)), re;
                            })(),
                        });
                      },
                    }),
                    null
                  ),
                  p(we, () => tI(n().timezoneOffset), null),
                  p(
                    te,
                    l(j, {
                      variant: "labelLarge",
                      component: "span",
                      get children() {
                        return [
                          L(() => h("Minimum number of articles")),
                          ":",
                          " ",
                        ];
                      },
                    }),
                    null
                  ),
                  p(
                    te,
                    l(Ur, {
                      get value() {
                        return T();
                      },
                      inline: !0,
                      get disabled() {
                        return !i();
                      },
                      onChange: B,
                      get children() {
                        return l(Qe, {
                          each: [1, 5, 10, 25],
                          children: (fe) =>
                            (() => {
                              var re = ka();
                              return (re.value = fe), p(re, fe), re;
                            })(),
                        });
                      },
                    }),
                    null
                  ),
                  p(
                    be,
                    l(j, {
                      variant: "labelLarge",
                      component: "span",
                      get children() {
                        return [
                          L(() => h("Maximum number of articles")),
                          ":",
                          " ",
                        ];
                      },
                    }),
                    null
                  ),
                  p(
                    be,
                    l(Ur, {
                      get value() {
                        return P();
                      },
                      inline: !0,
                      get disabled() {
                        return !i();
                      },
                      onChange: le,
                      get children() {
                        return l(Qe, {
                          get each() {
                            return hm(e.core.data.currentUser);
                          },
                          children: ([fe, re, Be]) =>
                            (() => {
                              var Ke = Q4(),
                                Mt = Ke.firstChild;
                              return (
                                (Ke.value = fe),
                                (Ke.disabled = !re),
                                p(Ke, fe, Mt),
                                p(Ke, re ? "" : Be, null),
                                Ke
                              );
                            })(),
                        });
                      },
                    }),
                    null
                  ),
                  Ce
                );
              })(),
              l(Rn, {
                class: "my-2",
                get children() {
                  return h(
                    'By default, all subscriptions will be sent. To send only specific subscriptions, please create a category named "%s" and add the desired subscriptions to it.',
                    yS
                  );
                },
              }),
            ];
          },
        }),
        null
      ),
      p(
        ae,
        l(ke, {
          group: !0,
          end: !0,
          get children() {
            return l(Z, {
              variant: "filled",
              type: "submit",
              get isLoading() {
                return x();
              },
              get children() {
                return h("Save");
              },
            });
          },
        }),
        null
      ),
      $(() => I(ae, Ie().form)),
      ae
    );
  })();
}
function eI(e) {
  return e === 0
    ? h("midnight")
    : e <= 11
    ? h("%s am", e)
    : e === 12
    ? h("noon")
    : h("%s pm", e - 12);
}
function tI(e) {
  const t = e > 0 ? "-" : "+",
    n = Math.floor(Math.abs(e) / 60),
    r = Math.abs(e) % 60;
  return t + Ig(n) + ":" + Ig(r);
}
function Ig(e) {
  return (e < 10 ? "0" : "") + String(e);
}
var nI = w("<form method=post autocomplete=off>");
function rI() {
  const e = Y(se),
    t = ni(),
    [n, r] = Sh(),
    [o, i] = kh(),
    [a, s] = N(n()),
    [c, u] = N(
      e.preferences.methods.getGlobalPreference("autoLoadWebpageText")
    ),
    [d, g] = N(o()),
    { getIsBusy: f, execute: m } = lt(async () => {
      r(a()),
        i(d()),
        await e.preferences.methods.updateGlobalPreferencesAction({
          autoLoadWebpageText: c(),
        }),
        e.core.methods.notifySuccess(h("Preferences updated"));
    }),
    y = (k) => {
      u(k.currentTarget.checked);
    },
    b = (k) => {
      s(k.currentTarget.checked);
    },
    v = (k) => {
      g(k.currentTarget.checked);
    },
    S = (k) => {
      k.preventDefault(), m().catch(e.core.methods.reportErrorAction());
    },
    A = sa();
  return (() => {
    var k = nI();
    return (
      k.addEventListener("submit", S),
      Xe(k, "id", t),
      p(
        k,
        l(ke, {
          group: !0,
          get children() {
            return [
              l(wn, {
                type: "checkbox",
                get checked() {
                  return c();
                },
                onClick: y,
                get children() {
                  return h("Auto-load webpage text");
                },
              }),
              l(Rn, {
                get children() {
                  return h(
                    "Use heuristic algorithms to automatically load full text from summary-only feeds. You can overwrite it for each feed."
                  );
                },
              }),
            ];
          },
        }),
        null
      ),
      p(
        k,
        l(D, {
          when: oI,
          get children() {
            return l(ke, {
              group: !0,
              get children() {
                return [
                  l(wn, {
                    type: "checkbox",
                    get checked() {
                      return a();
                    },
                    onClick: b,
                    get children() {
                      return h("Image lazy loading on this device");
                    },
                  }),
                  l(Rn, {
                    get children() {
                      return h(
                        "Load image only when they appear in the browser's viewport."
                      );
                    },
                  }),
                ];
              },
            });
          },
        }),
        null
      ),
      p(
        k,
        l(ke, {
          group: !0,
          get children() {
            return [
              l(wn, {
                type: "checkbox",
                get checked() {
                  return d();
                },
                onClick: v,
                get children() {
                  return h("Single tap to page down");
                },
              }),
              l(Rn, {
                get children() {
                  return h(
                    "When this option is enabled, click on the right 1/5 of the image to enter the image zoom mode."
                  );
                },
              }),
            ];
          },
        }),
        null
      ),
      p(
        k,
        l(ke, {
          group: !0,
          end: !0,
          get children() {
            return l(Z, {
              variant: "filled",
              type: "submit",
              get isLoading() {
                return f();
              },
              get children() {
                return h("Save");
              },
            });
          },
        }),
        null
      ),
      $(() => I(k, A().form)),
      k
    );
  })();
}
const oI = "loading" in HTMLImageElement.prototype;
var iI = w("<form method=post autocomplete=off>");
function aI() {
  const e = Y(se),
    t = ni(),
    [n, r] = N(e.preferences.methods.getGlobalPreference("unreadOnly")),
    [o, i] = N(!1),
    { getIsBusy: a, execute: s } = lt(async () => {
      await e.preferences.methods.updateGlobalPreferencesAction(
        { unreadOnly: n() },
        { resetUnreadOnly: o() }
      ),
        e.core.methods.notifySuccess(h("Preferences updated")),
        i(!1);
    }),
    c = (f) => {
      r(f.currentTarget.checked);
    },
    u = (f) => {
      i(f.currentTarget.checked);
    },
    d = (f) => {
      f.preventDefault(), s().catch(e.core.methods.reportErrorAction());
    },
    g = sa();
  return (() => {
    var f = iI();
    return (
      f.addEventListener("submit", d),
      Xe(f, "id", t),
      p(
        f,
        l(ke, {
          get label() {
            return h("Filter");
          },
          group: !0,
          get children() {
            return l(ke, {
              get children() {
                return [
                  l(wn, {
                    type: "checkbox",
                    get checked() {
                      return n();
                    },
                    onClick: c,
                    get children() {
                      return h("Show unread articles only");
                    },
                  }),
                  l(Rn, {
                    get children() {
                      return h("You can overwrite it for each feed.");
                    },
                  }),
                  l(wn, {
                    type: "checkbox",
                    get checked() {
                      return o();
                    },
                    onClick: u,
                    get children() {
                      return h("Reset the unread only settings of all feeds");
                    },
                  }),
                ];
              },
            });
          },
        }),
        null
      ),
      p(
        f,
        l(ke, {
          group: !0,
          end: !0,
          get children() {
            return l(Z, {
              variant: "filled",
              type: "submit",
              get isLoading() {
                return a();
              },
              get children() {
                return h("Save");
              },
            });
          },
        }),
        null
      ),
      $(() => I(f, g().form)),
      f
    );
  })();
}
const mm = [
  {
    path: "/general",
    title: h("Name and Email"),
    icon: Rw,
    group: "account",
    pageComponent: _4,
  },
  {
    path: "/password",
    title: h("Password"),
    icon: Dw,
    group: "account",
    pageComponent: N4,
  },
  {
    path: "/interface/article-listing",
    title: h("Article Listing"),
    icon: _w,
    group: "interface",
    pageComponent: aI,
  },
  {
    path: "/interface/article-contents",
    title: h("Article contents"),
    icon: lu,
    group: "interface",
    pageComponent: rI,
  },
  {
    path: "/ebook",
    title: h("eBook & Kindle"),
    icon: gu,
    group: "ebook",
    pageComponent: J4,
  },
];
var sI = w("<div>");
function lI(e) {
  const [t, n] = Ve(e, ["class"]),
    r = cI();
  return (() => {
    var o = sI();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !1
      ),
      o
    );
  })();
}
const cI = q((e) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    color: e.color.onSurfaceHint,
  },
}));
var uI = w("<div>");
function dI(e) {
  const [t, n] = Ve(e, ["class"]),
    r = gI();
  return (() => {
    var o = uI();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !1
      ),
      o
    );
  })();
}
const gI = q((e) => ({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "1rem",
    flex: 1,
  },
}));
var fI = w("<div>");
function hI(e) {
  const [t, n] = Ve(e, ["class"]),
    r = mI();
  return (() => {
    var o = fI();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !1
      ),
      o
    );
  })();
}
const mI = q((e) => ({
  root: {
    margin: "0.5rem 0",
    overflow: "auto",
    borderRadius: e.sharp.medium,
    ...e.elevationShadowStyle(1),
  },
}));
var yI = w("<div>");
function pI(e) {
  const [t, n] = Ve(e, ["class"]),
    r = vI();
  return (() => {
    var o = yI();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !1
      ),
      o
    );
  })();
}
const vI = q((e) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexShrink: 0,
    boxSizing: "border-box",
    width: "2rem",
    color: e.color.onSurfaceVariant,
    '& input[type="radio"],& input[type="checkbox"]': {
      width: "1.5rem",
      height: "1.5rem",
    },
  },
}));
var bI = w("<div>");
function wI(e) {
  const [t, n] = Ve(e, ["class"]),
    r = SI();
  return (() => {
    var o = bI();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !1
      ),
      o
    );
  })();
}
const SI = q((e) => ({
  root: { ...e.typescale.bodyLargeStyle, color: e.color.onSurfaceVariant },
}));
var EI = w("<div>");
function CI(e) {
  const [t, n] = Ve(e, ["class"]),
    r = AI();
  return (() => {
    var o = EI();
    return (
      Je(
        o,
        F(
          {
            get class() {
              return H(r().root, t.class);
            },
          },
          n
        ),
        !1,
        !1
      ),
      o
    );
  })();
}
const AI = q((e) => ({ root: { minWidth: "10rem", flex: 1 } }));
function II(e, t) {
  return F(e, t);
}
var xI = w("<div>");
function kI(e) {
  e = II({ stateful: !1, as: "div" }, e);
  const [t, n] = Ve(e, ["as", "class", "stateful", "children"]),
    r = TI(),
    o = Pt();
  return l(D, {
    get when() {
      return t.stateful;
    },
    get fallback() {
      return (() => {
        var i = xI();
        return (
          Je(
            i,
            F(
              {
                get class() {
                  return H(r().root, t.class);
                },
              },
              n
            ),
            !1,
            !1
          ),
          i
        );
      })();
    },
    get children() {
      return l(Ir, {
        get component() {
          return t.as;
        },
        get class() {
          return H(r().root, t.class);
        },
        get layerBackground() {
          return o().color.onSurface;
        },
        componentProps: n,
        get children() {
          return t.children;
        },
      });
    },
  });
}
const TI = q((e) => ({
  root: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    padding: "0.875rem 0.75rem 0.875rem 1rem",
    background: e.surface(1),
    borderTop: `1px solid ${e.color.outlineVariant}`,
    ":first-child": { borderTop: "none" },
  },
}));
var LI = w("<div>");
const xg = /^\/settings\b/,
  PI = Hn((e) => {
    const t = Is(),
      [n, r] = N("none"),
      o = MI(),
      i = L(() => {
        for (const d of mm) if (lp(t.pathname, ym(d.path))) return d;
      }),
      a = () => {
        var d, g;
        return (g = (d = i()) == null ? void 0 : d.title) != null
          ? g
          : h("Settings");
      };
    ie(
      pe(
        () => t.pathname,
        (d, g) => {
          r($I(g, d));
        }
      )
    );
    const s = () => {
        r("none");
      },
      c = (d) => {
        switch (d) {
          case "forward":
            return o().directionForwordStyle;
          case "backward":
            return is ? "" : o().directionBackwordStyle;
          default:
            return "";
        }
      },
      u = () => [
        l(gS, {}),
        l(Tr, {
          get children() {
            return a();
          },
        }),
      ];
    return (
      Kt(() => Yt(a())),
      l(Lr, {
        renderTopBar: u,
        get children() {
          return l(Gt, {
            get class() {
              return o().container;
            },
            size: "medium",
            get children() {
              var d = LI();
              return (
                d.addEventListener("animationend", s),
                p(d, () => e.children),
                $(() => I(d, H(o().containerInner, c(n())))),
                d
              );
            },
          });
        },
      })
    );
  }),
  MI = q(() => ({
    container: { overflowX: "hidden" },
    containerInner: { overflowX: "auto" },
    directionForwordStyle: { animation: St.slideLeftIn402d.cssText },
    directionBackwordStyle: { animation: St.slideRightIn402d.cssText },
  }));
function $I(e, t) {
  if (!e) return "none";
  const n = xg.test(e) ? e.match(/\//g).length : 1,
    r = xg.test(t) ? t.match(/\//g).length : 1;
  return r > n ? "forward" : r < n ? "backward" : "none";
}
function ym(e) {
  return `${pm}${e}`;
}
var RI = w("<div style=margin-bottom:1.5rem>");
function DI(e) {
  const t = at(),
    n = L(() => Object.entries(ep(e.items, (o) => o.group))),
    r = (o) => {
      t(ym(o.path));
    };
  return l(Qe, {
    get each() {
      return n();
    },
    children: (o) =>
      (() => {
        var i = RI();
        return (
          p(
            i,
            l(hI, {
              get children() {
                return l(Qe, {
                  get each() {
                    return o[1];
                  },
                  children: (a) =>
                    l(kI, {
                      stateful: !0,
                      onClick: [r, a],
                      get children() {
                        return [
                          l(pI, {
                            get children() {
                              return l(a.icon, { size: 24 });
                            },
                          }),
                          l(dI, {
                            get children() {
                              return l(CI, {
                                get children() {
                                  return l(wI, {
                                    get children() {
                                      return a.title;
                                    },
                                  });
                                },
                              });
                            },
                          }),
                          l(lI, {
                            get children() {
                              return l(Rs, {});
                            },
                          }),
                        ];
                      },
                    }),
                });
              },
            })
          ),
          i
        );
      })(),
  });
}
const pm = "/settings";
function _I(e) {
  return l(We, {
    path: pm,
    component: PI,
    get children() {
      return [
        l(We, {
          path: "/",
          component: () =>
            l(DI, {
              get items() {
                return e.items;
              },
            }),
        }),
        l(Qe, {
          get each() {
            return e.items;
          },
          children: (t) =>
            l(We, {
              get path() {
                return t.path;
              },
              get component() {
                return t.pageComponent;
              },
            }),
        }),
      ];
    },
  });
}
var OI = w("<div><span>&copy; ");
function Gs() {
  var c;
  const e = Y(se),
    n = Ef((c = e.core.data.currentUser) == null ? void 0 : c.email);
  let r = 0;
  const o = NI(),
    i = new Date().getFullYear(),
    a = i === 2021 ? i : `2021 - ${i}`,
    s = () => {
      var u;
      if (r++ > 3) {
        const d = (u = prompt("Debug Command")) == null ? void 0 : u.trim();
        d && GS(d);
      }
    };
  return (() => {
    var u = OI(),
      d = u.firstChild;
    return (
      d.firstChild,
      (d.$$click = s),
      p(d, a, null),
      p(
        u,
        l(Pe, {
          href: "/about",
          color: "inherit",
          textDecoration: !1,
          get children() {
            return h("About");
          },
        }),
        null
      ),
      p(
        u,
        l(Pe, {
          href: "/privacy-policy",
          color: "inherit",
          textDecoration: !1,
          get children() {
            return h("Privacy");
          },
        }),
        null
      ),
      p(
        u,
        l(Pe, {
          href: "https://github.com/oxyry/qireader/issues",
          openInNew: !0,
          openInNewMark: !1,
          color: "inherit",
          textDecoration: !1,
          get children() {
            return h("Feedback");
          },
        }),
        null
      ),
      p(
        u,
        l(Pe, {
          href: "/china",
          color: "inherit",
          textDecoration: !1,
          get children() {
            return n ? "中国镜像" : h("China mirror");
          },
        }),
        null
      ),
      $(() => I(u, o().footer)),
      u
    );
  })();
}
const NI = q((e) => ({
  footer: {
    margin: "3rem 0.25rem",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.5rem",
    userSelect: "none",
    color: e.color.onSurfaceVariant,
    ...e.typescale.bodySmallStyle,
  },
}));
Bn(["click"]);
function FI() {
  return (
    Kt(() => Yt(h("About"))),
    l(ai, {
      get children() {
        return [l(sm, {}), l(Gs, {})];
      },
    })
  );
}
const BI = 300,
  Vl = 100;
var Bc = ((e) => (
  (e[(e.NONE = 0)] = "NONE"),
  (e[(e.BACKWARD = 1)] = "BACKWARD"),
  (e[(e.FORWARD = 2)] = "FORWARD"),
  e
))(Bc || {});
const kg = () => ({
  streamId: void 0,
  entryIds: void 0,
  entries: {},
  unreadOnly: void 0,
  requestId: 0,
  pageSize: 30,
  end: !0,
  isLoading: !1,
  loadError: void 0,
  isLoadingNextPage: !1,
  loadNextPageError: void 0,
  isLoadingNew: !1,
  loadNewError: void 0,
  activeEntryId: void 0,
  openActiveEntryDirection: 0,
  loadActiveEntryRequestId: 0,
  isLoadingActiveEntry: !1,
  loadActiveEntryError: void 0,
});
function UI(e) {
  const [t, n] = Un(kg()),
    r = Y(se);
  W(!(e.streamId().type === K.TAG && e.unreadOnly())),
    ie(
      pe([e.streamId, e.unreadOnly], () => {
        s.loadAction({
          streamId: e.streamId(),
          unreadOnly: e.unreadOnly(),
        }).catch(
          r.core.methods.reportErrorAction(h("Failed to load new article list"))
        );
      })
    );
  function o(c, u, d = {}) {
    const g = c.entries.reduce((f, m) => ((f[m.id] = m), f), {});
    if (u === "merge") W(!d.reconcile), n("entries", g);
    else {
      W(u === "replace");
      const f = s.getActiveEntry(),
        m = t.streamId && Ic(t.streamId, zi(c.id));
      d.reconcile && m ? n("entries", Xa(g, { key: "id" })) : n({ entries: g }),
        t.activeEntryId &&
          f &&
          !t.entries[t.activeEntryId] &&
          n("entries", f.id, f);
    }
  }
  function i(c) {
    return Mn(pn(t).entries[c.id]);
  }
  function a(c) {
    const u = pn(t).entries;
    return c.map((d) => Mn(u[d.id]));
  }
  const s = {
    getFirstEntry() {
      var u;
      const c = (u = t.entryIds) == null ? void 0 : u[0];
      return c ? t.entries[c] : void 0;
    },
    getEntryList() {
      return W(t.entryIds), t.entryIds.map((c) => Mn(t.entries[c]));
    },
    getActiveEntry() {
      return t.activeEntryId ? t.entries[t.activeEntryId] : void 0;
    },
    getActiveEntryIndex() {
      return !t.entryIds || !t.activeEntryId
        ? -1
        : t.entryIds.findIndex((c) => c === t.activeEntryId);
    },
    loadRequestMutation(c) {
      n(
        ut((u) => {
          Object.assign(u, kg()),
            (u.streamId = c.streamId),
            (u.unreadOnly = c.unreadOnly),
            u.requestId++,
            (u.isLoading = !0);
        })
      );
    },
    reloadRequestMutation() {
      W(t.streamId),
        n(
          ut((c) => {
            c.requestId++, (c.isLoading = !0);
          })
        );
    },
    loadFromCacheMutation(c) {
      c.requestId === t.requestId &&
        (t.entryIds ||
          Zn(() => {
            o(c.stream, "replace", { reconcile: !0 }),
              n(
                "entryIds",
                c.stream.entries.map((u) => u.id)
              );
          }));
    },
    loadSuccessMutation(c) {
      c.requestId === t.requestId &&
        Zn(() => {
          n({ isLoading: !1, end: c.stream.entries.length < t.pageSize }),
            o(c.stream, "replace", { reconcile: !0 }),
            n(
              "entryIds",
              c.stream.entries.map((u) => u.id)
            );
        });
    },
    loadErrorMutation(c) {
      c.requestId === t.requestId && n({ isLoading: !1, loadError: c.error });
    },
    loadNewRequestMutation() {
      W(!t.isLoadingNew), n({ isLoadingNew: !0, loadNewError: void 0 });
    },
    loadNewSuccessMutation(c) {
      c.requestId === t.requestId &&
        Zn(() => {
          o(c.stream, "merge"),
            n(
              ut((u) => {
                W(u.entryIds),
                  u.entryIds.unshift(...c.stream.entries.map((d) => d.id)),
                  u.entryIds.splice(BI),
                  c.stream.entries.length >= Vl && u.entryIds.splice(Vl),
                  (u.isLoadingNew = !1),
                  (u.loadNewError = void 0);
              })
            );
        });
    },
    loadNewErrorMutation(c) {
      c.requestId === t.requestId &&
        n({ isLoadingNew: !1, loadNewError: c.error });
    },
    loadNextPageRequestMutation() {
      W(!t.isLoadingNextPage),
        n({ isLoadingNextPage: !0, loadNextPageError: void 0 });
    },
    loadNextPageSuccessMutation(c) {
      c.requestId === t.requestId &&
        Zn(() => {
          o(c.stream, "merge"),
            n(
              ut((u) => {
                W(u.entryIds),
                  u.entryIds.push(...c.stream.entries.map((d) => d.id)),
                  (u.isLoadingNextPage = !1),
                  (u.loadNextPageError = void 0),
                  (u.end = c.stream.entries.length < u.pageSize);
              })
            );
        });
    },
    loadNextPageErrorMutation(c) {
      c.requestId === t.requestId &&
        n({ isLoadingNextPage: !1, loadNextPageError: c.error });
    },
    loadActiveEntryRequestMutation(c) {
      var f, m;
      const u =
          (f = t.entryIds) == null
            ? void 0
            : f.findIndex((y) => y === t.activeEntryId),
        d =
          (m = t.entryIds) == null
            ? void 0
            : m.findIndex((y) => y === c.entryId),
        g =
          u != null && u !== -1 && d != null && d !== -1 ? (u < d ? 2 : 1) : 0;
      n({
        loadActiveEntryRequestId: t.loadActiveEntryRequestId + 1,
        activeEntryId: c.entryId,
        openActiveEntryDirection: g,
        isLoadingActiveEntry: !0,
        loadActiveEntryError: void 0,
      });
    },
    loadActiveEntrySuccessMutation(c) {
      c.requestId === t.loadActiveEntryRequestId &&
        Zn(() => {
          n({ isLoadingActiveEntry: !1 }),
            n("entries", c.entry.id, Xa(c.entry));
        });
    },
    loadActiveEntryErrorMutation(c) {
      c.requestId === t.loadActiveEntryRequestId &&
        n({ isLoadingActiveEntry: !1, loadActiveEntryError: c.error });
    },
    clearActiveEntryMutation() {
      n({
        activeEntryId: void 0,
        openActiveEntryDirection: 0,
        isLoadingActiveEntry: !1,
        loadActiveEntryError: void 0,
      });
    },
    markAllEntriesAsReadMutation() {
      n(
        ut((c) => {
          W(c.streamId && c.entryIds);
          for (const u of c.entryIds) {
            const d = c.entries[u];
            d && (d.status = Ge.READ);
          }
          r.markers.methods.markStreamAsReadMutation(c.streamId);
        })
      );
    },
    markEntriesAsReadMutation(c) {
      n(
        ut((u) => {
          var g;
          const d = new Map();
          for (const f of Object.values(u.entries))
            if (c.entryIds.includes(f.id) && f.status === Ge.UNREAD) {
              f.status = Ge.READ;
              const m = f.origin.feedId;
              m && d.set(m, ((g = d.get(m)) != null ? g : 0) + 1);
            }
          d.forEach((f, m) => {
            const y = r.subscriptions.methods.getSubscriptionByFeedId(m);
            y && r.markers.methods.decUnreadCountMutation(y.id, f);
          });
        })
      );
    },
    markEntryAsUnreadMutation(c) {
      n(
        ut((u) => {
          const d = u.entries[c.entryId];
          if (!d || d.status === Ge.UNREAD) return;
          d.status = Ge.UNREAD;
          const g = d.origin.feedId;
          if (g) {
            const f = r.subscriptions.methods.getSubscriptionByFeedId(g);
            f && r.markers.methods.decUnreadCountMutation(f.id, -1);
          }
        })
      );
    },
    addTagToEntryMutation(c) {
      n(
        ut((u) => {
          W(u.entryIds);
          const d = u.entries[c.entryId];
          W(d),
            d.tagIds.includes(c.tagId) ||
              (d.tagIds.push(c.tagId),
              W(u.streamId),
              u.streamId.type === K.TAG &&
                u.streamId.id === c.tagId &&
                !u.entryIds.includes(c.entryId) &&
                u.entryIds.unshift(d.id));
        })
      );
    },
    removeTagFromEntryMutation(c) {
      n(
        ut((u) => {
          var g;
          W(u.entryIds);
          const d = u.entries[c.entryId];
          W(d),
            d.tagIds.includes(c.tagId) &&
              (Wi(d.tagIds, c.tagId),
              ((g = u.streamId) == null ? void 0 : g.type) === K.TAG &&
                u.streamId.id === c.tagId &&
                Wi(u.entryIds, d.id));
        })
      );
    },
    async loadBaseAction(c) {
      const u = t.requestId;
      let d;
      try {
        d = await Le("getStream", {
          id: $n(c.streamId),
          unreadOnly: c.unreadOnly,
          count: t.pageSize,
        });
      } catch (g) {
        throw (this.loadErrorMutation({ requestId: u, error: g }), g);
      }
      this.loadSuccessMutation({ requestId: u, stream: d }),
        VI(d, c.unreadOnly).catch(r.core.methods.reportErrorAction()),
        Wl(d).catch(r.core.methods.reportErrorAction());
    },
    async reloadBaseAction() {
      W(t.streamId && t.unreadOnly != null),
        this.reloadRequestMutation(),
        await this.loadBaseAction({
          streamId: t.streamId,
          unreadOnly: t.unreadOnly,
        });
    },
    async loadAction(c) {
      this.loadRequestMutation({
        streamId: c.streamId,
        unreadOnly: c.unreadOnly,
      });
      const u = t.requestId,
        d = async () => {
          const f = await WI(c.streamId, c.unreadOnly);
          f && this.loadFromCacheMutation({ requestId: u, stream: f });
        },
        g = async () => {
          await this.loadBaseAction(c);
        };
      await d(), await g();
    },
    async reloadAction() {
      await this.reloadBaseAction();
    },
    async loadNewAction() {
      if ((W(t.streamId && t.entryIds), t.isLoading || t.isLoadingNew)) return;
      if (t.entryIds.length === 0)
        return await this.reloadBaseAction(), t.entryIds.length;
      this.loadNewRequestMutation();
      const c = t.requestId,
        u = Mn(this.getFirstEntry()).timestamp;
      let d;
      try {
        d = await Le("getStream", {
          id: $n(t.streamId),
          unreadOnly: t.unreadOnly,
          newerThan: u,
          count: Vl,
        });
      } catch (g) {
        throw (this.loadNewErrorMutation({ requestId: c, error: g }), g);
      }
      return (
        this.loadNewSuccessMutation({ requestId: c, stream: d }),
        Wl(d).catch(r.core.methods.reportErrorAction()),
        d.entries.length
      );
    },
    async loadNextPageAction() {
      if (
        (W(t.streamId && t.entryIds),
        t.isLoadingNextPage || t.entryIds.length === 0)
      )
        return;
      this.loadNextPageRequestMutation();
      const c = t.requestId,
        u = Mn(t.entries[t.entryIds[t.entryIds.length - 1]]).timestamp;
      let d;
      try {
        d = await Le("getStream", {
          id: $n(t.streamId),
          unreadOnly: t.unreadOnly,
          olderThan: u,
          count: t.pageSize,
        });
      } catch (g) {
        throw (this.loadNextPageErrorMutation({ requestId: c, error: g }), g);
      }
      this.loadNextPageSuccessMutation({ requestId: c, stream: d }),
        Wl(d).catch(r.core.methods.reportErrorAction());
    },
    async loadActiveEntryAction(c) {
      W(t.streamId && t.entryIds),
        this.loadActiveEntryRequestMutation({ entryId: c.entryId });
      const u = t.loadActiveEntryRequestId;
      let d = t.entries[c.entryId];
      if (d) this.loadActiveEntrySuccessMutation({ requestId: u, entry: d });
      else {
        try {
          d = await Le("getEntry", {
            streamId: $n(t.streamId),
            entryId: c.entryId,
          });
        } catch (g) {
          throw (
            (this.loadActiveEntryErrorMutation({ requestId: u, error: g }), g)
          );
        }
        this.loadActiveEntrySuccessMutation({ requestId: u, entry: d });
      }
    },
    clearActiveEntryAction() {
      this.clearActiveEntryMutation();
    },
    async markEntriesAsReadAction(c) {
      if (c.entryIds.length === 0) return;
      W(t.entryIds),
        await Le("markAsRead", { type: "entries", entryIds: c.entryIds }),
        this.markEntriesAsReadMutation({ entryIds: c.entryIds });
      const u = Object.values(pn(t).entries).filter((d) =>
        c.entryIds.includes(d.id)
      );
      Po(u).catch(r.core.methods.reportErrorAction());
    },
    async markEntryAsUnreadAction(c) {
      W(t.entryIds),
        await Le("markAsUnread", { entryId: c }),
        this.markEntryAsUnreadMutation({ entryId: c });
      const u = pn(t).entries[c];
      u && Po([u]).catch(r.core.methods.reportErrorAction());
    },
    async markAllEntriesAsReadAction() {
      var g;
      if (!((g = t.entryIds) != null && g.length)) return;
      W(t.streamId);
      const c = t.streamId;
      W(c.type !== K.TAG);
      const u = Object.values(t.entries).filter((f) => f.status === Ge.UNREAD),
        d = Mn(this.getFirstEntry()).timestamp;
      await Le(
        "markAsRead",
        c.type === K.CATEGORY
          ? { type: "category", categoryId: c.id, asOf: d }
          : { type: "subscription", subscriptionId: c.id, asOf: d }
      ),
        this.markAllEntriesAsReadMutation(),
        Po(a(u)).catch(r.core.methods.reportErrorAction());
    },
    async addTagToEntryAction(c) {
      const u = t.entries[c.entryId];
      W(u);
      const d = r.tags.data.tags[c.tagId];
      W(d),
        !u.tagIds.includes(d.id) &&
          (this.addTagToEntryMutation({ entryId: u.id, tagId: d.id }),
          await Le("addTagToEntry", {
            entryType: u.isSaved ? Mi.SAVED : Mi.FEED,
            entryId: u.id,
            tagId: d.id,
          }),
          Po([i(u)]).catch(r.core.methods.reportErrorAction()));
    },
    async removeTagFromEntryAction(c) {
      const u = t.entries[c.entryId];
      W(u);
      const d = r.tags.data.tags[c.tagId];
      W(d),
        u.tagIds.includes(d.id) &&
          (W(t.streamId),
          this.removeTagFromEntryMutation({ entryId: u.id, tagId: d.id }),
          await Le("removeTagFromEntry", {
            tagId: d.id,
            entryType: t.streamId.type === K.TAG ? Mi.SAVED : Mi.FEED,
            entryId: u.id,
          }),
          Po([i(u)]).catch(r.core.methods.reportErrorAction()));
    },
  };
  return { data: t, methods: s };
}
const si = on();
function _u(e) {
  return `entry-content:${e}`;
}
let Uc;
async function Wl(e) {
  (Uc = (async () => {
    const t = [];
    for (const n of e.entries)
      !Ba.includes(n.id) && !(await $S(_u(n.id))) && t.push(n.id);
    if (t.length) {
      const n = await it("getEntryContents", { streamId: e.id, entryIds: t });
      n.ok && (await vm(n.result));
    }
  })()),
    await Uc;
}
async function zI(e, t) {
  var r, o;
  await Uc;
  let n = await Hi(_u(t));
  if (n == null) {
    const i = await it("getEntryContents", { streamId: e, entryIds: [t] });
    if (i.ok)
      await vm(i.result),
        (n =
          (o = (r = i.result[0]) == null ? void 0 : r.content) != null
            ? o
            : "");
    else throw new Error(`HTTP Error ${i.httpStatus}`);
  }
  return n;
}
const Ba = [];
async function vm(e) {
  Ba.length > 5e3 && Ba.splice(0, 1e3), Ba.push(...e.map((t) => t.id));
  for (const t of e) {
    const n = t.content || "";
    await fu(_u(t.id), n, 864e5 * 30);
  }
}
function bm(e, t) {
  return `stream:${e}-${t}`;
}
const HI = 30;
async function VI(e, t) {
  const n = e.entries.slice(0, HI);
  await Po(n);
  const r = { id: e.id, entryIds: n.map((o) => o.id) };
  await fu(bm(e.id, t), r, 864e5 * 30);
}
async function WI(e, t) {
  const n = await Hi(bm($n(e), t));
  if (!n) return;
  const r = [],
    o = await GI(n.entryIds, e.type === K.TAG);
  for (const a of o)
    !a ||
      (e.type !== K.TAG && t && a.status === Ge.READ) ||
      (e.type === K.TAG && !a.tagIds.includes(e.id)) ||
      r.push(a);
  return { id: n.id, entries: r };
}
function wm(e, t) {
  return `${t ? "savedentry" : "entry"}:${e}:v2`;
}
async function Po(e) {
  await hu(
    e.map((t) => [wm(t.id, t.isSaved), t]),
    864e5 * 30
  );
}
async function GI(e, t) {
  return await FS(e.map((n) => wm(n, t)));
}
const jI = { [Cn.ALL]: h("All feeds") };
function YI(e) {
  return jI[e];
}
function qI(e) {
  return e.label.startsWith(lo) ? YI(e.label) : e.label;
}
const XI = { [co.READ_LATER]: h("Read Later") };
function KI(e) {
  return XI[e];
}
function ZI(e) {
  return e.label.startsWith(lo) ? KI(e.label) : e.label;
}
function $o(e) {
  return e.crawledAt > Date.now() - 864e5 * fS;
}
function QI(e) {
  const [t, n] = N(e.category.label),
    r = Y(se),
    o = (g) => {
      const f = r.subscriptions.methods.getCategoryByLabel(g);
      return f && f.id !== e.category.id;
    },
    {
      getIsBusy: i,
      getError: a,
      execute: s,
    } = lt(async () => {
      if (o(t())) return h("A category with this label already exists.");
      const g = await r.subscriptions.methods.modifyCategoryAction({
        categoryId: e.category.id,
        label: t(),
      });
      e.onModify(g.label);
    }),
    c = (g) => {
      const f = g.currentTarget.value;
      n(f);
    };
  return l(an, {
    get isShown() {
      return e.isShown;
    },
    width: 360,
    hasClose: !0,
    get hasCancel() {
      return !i();
    },
    get confirmLabel() {
      return h("Save");
    },
    get isConfirmLoading() {
      return i();
    },
    onCancel: () => {
      e.onCancel();
    },
    onConfirm: () => {
      s().catch(r.core.methods.reportErrorAction());
    },
    children: () =>
      l(ke, {
        end: !0,
        get children() {
          return [
            L(
              () =>
                L(() => !!a())() &&
                l(Nt, {
                  severify: "error",
                  get children() {
                    return a();
                  },
                })
            ),
            l(At, {
              get label() {
                return h("Label");
              },
              get inputProps() {
                return {
                  value: t(),
                  required: !0,
                  autofocus: !0,
                  onInput: c,
                  onChange: c,
                };
              },
              full: !0,
              outlined: !0,
            }),
          ];
        },
      }),
  });
}
function JI(e) {
  const t = Y(se),
    { getIsBusy: n, execute: r } = lt(async () => {
      const a = e.category.label;
      await t.subscriptions.methods.deleteCategoryAction(e.category.id, !0),
        t.core.methods.notifySuccess(h("Category '%s' Deleted", a)),
        e.onDelete();
    });
  return l(an, {
    get isShown() {
      return e.isShown;
    },
    hasClose: !0,
    get hasCancel() {
      return !n();
    },
    get confirmLabel() {
      return h("Delete");
    },
    confirmButtonColor: "error",
    get isConfirmLoading() {
      return n();
    },
    onCancel: () => {
      e.onCancel();
    },
    onConfirm: () => {
      r().catch(t.core.methods.reportErrorAction());
    },
    children: () => [
      l(j, {
        variant: "titleMedium",
        gutterBottom: !0,
        get children() {
          return h("Delete category '%s'?", e.category.label);
        },
      }),
      l(j, {
        variant: "bodyMedium",
        color: "onSurfaceVariant",
        get children() {
          return h("This will unsubscribe all feeds from this folder.");
        },
      }),
    ],
  });
}
const e3 =
  "data:image/svg+xml,%3csvg%20width='122'%20height='104'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20fill='none'%20fill-rule='evenodd'%3e%3cg%20fill-rule='nonzero'%20fill='%23C3CBD6'%3e%3cpath%20d='M15%2082.3a.8.8%200%201%201%200-1.6h70a.8.8%200%201%201%200%201.6H15Zm74%200a.8.8%200%201%201%200-1.6h2.5a.8.8%200%201%201%200%201.6H89Zm9%200a.8.8%200%201%201%200-1.6h9a.8.8%200%201%201%200%201.6h-9Zm-60%207.5a.8.8%200%201%201%200-1.6h7a.8.8%200%201%201%200%201.6h-7Zm11.5%200a.8.8%200%201%201%200-1.6H80a.8.8%200%201%201%200%201.6H49.5ZM94.2%2062c0-1%201.6-1%201.6%200v3c0%20.4-.4.8-.8.8h-3c-1%200-1-1.6%200-1.6h2.2V62Zm1.6%206c0%201-1.6%201-1.6%200v-3c0-.4.4-.8.8-.8h3c1%200%201%201.6%200%201.6h-2.2V68ZM18.2%2038c0-1%201.6-1%201.6%200v3c0%20.4-.4.8-.8.8h-3c-1%200-1-1.6%200-1.6h2.2V38Zm74.1-25.3H95c1%200%201%201.6%200%201.6h-2.7V17c0%201-1.6%201-1.6%200v-2.7H88c-1%200-1-1.6%200-1.6h2.7V10c0-1%201.6-1%201.6%200v2.7ZM19.8%2044c0%201-1.6%201-1.6%200v-3c0-.4.4-.8.8-.8h3c1%200%201%201.6%200%201.6h-2.2V44ZM28.3%2070.3c.5-.4%201.2.3.7.8l-1%201c-.3.2-.6.2-.8%200l-1-1c-.5-.5.2-1.2.7-.8l.7.8.7-.8Zm-1.4%202.9c-.5.4-1.2-.3-.7-.7l1-1.1c.2-.2.5-.2.7%200l1.1%201c.5.5-.2%201.2-.7.8l-.7-.7-.7.7ZM37%2018c.5-.5%201.2.2.7.7l-1%201c-.2.3-.5.3-.7%200l-1.1-1c-.5-.5.2-1.2.7-.7l.7.7.7-.7Zm-1.4%202.8c-.5.5-1.2-.2-.7-.7l1-1c.3-.2.6-.2.8%200l1%201c.5.5-.2%201.2-.7.7l-.7-.7-.7.7Z'/%3e%3c/g%3e%3cpath%20d='m75.5%2043%205.3%202.1-1.1%202.8a2%202%200%200%201-2.6%201.1l-17.6-7a2%202%200%200%201-1.1-2.7l1.1-2.8%204.4%201.8c-4-2.2-5.3-4.9-4-8A13%2013%200%200%201%2084%2040c-1.3%203.1-4.1%204.2-8.5%203l-5.8-2.4c-2.3-.7-4.3-1.5-5.8-2.3Z'%20stroke='%23C3CBD6'%20stroke-width='1.6'%20fill='%23F5F7F9'/%3e%3cpath%20stroke='%23C3CAD7'%20stroke-width='1.6'%20fill='%23FFF'%20d='M53.5%2029.6%2089%2043.9l-2.4%206L51%2035.5z'/%3e%3cpath%20d='M58.9%2036.8a1.5%201.5%200%201%201%201-2.8%201.5%201.5%200%200%201-1%202.8Zm6.4%202.6a1.5%201.5%200%201%201%201.2-2.8%201.5%201.5%200%200%201-1.2%202.8Zm8.4%203.4a1.5%201.5%200%201%201%201.1-2.8%201.5%201.5%200%200%201-1.1%202.8Zm6.5%202.6a1.5%201.5%200%201%201%201.1-2.8%201.5%201.5%200%200%201-1.1%202.8Z'%20fill='%23C3CAD7'/%3e%3cpath%20d='M56.5%2043.1a.5.5%200%201%201%20.6.8L47%2052a.5.5%200%201%201-.6-.8l10.2-8ZM43.6%2053.2a.5.5%200%201%201%20.7.8l-2%201.5a.5.5%200%201%201-.6-.8l2-1.5Zm-4%203.2a.5.5%200%201%201%20.6.8l-5.8%204.5a.5.5%200%201%201-.6-.8l5.8-4.5ZM78.3%2052a.5.5%200%200%200-1%200L80%2067a.5.5%200%200%200%201-.2l-2.8-14.9ZM53%2042.2a.5.5%200%201%201%20.3.9l-5.5%202.4a.5.5%200%201%201-.3-1l5.5-2.3ZM80.7%2055.2a.5.5%200%201%201%201-.4l2.7%206.8a.5.5%200%201%201-1%20.4l-2.7-6.8Z'%20fill='%23C3CAD7'%20fill-rule='nonzero'/%3e%3cpath%20d='m51.7%2065.3-5%202.2-1-2.3%202.5-8%202.4-1%202.6%206%201.3-.5.9%202.1-1.3.5.8%201.9-2.4%201-.8-1.9Zm-.9-2L49.5%2060l-1.3%204.2%202.6-1ZM59.1%2059.6c-.5-2-.5-3.5%200-4.5.6-1%201.6-1.6%203-2A5%205%200%200%201%2064%2053a3.3%203.3%200%200%201%202.2%201l.6%201%201%202.4c.4%201.9.4%203.4%200%204.4-.4%201-1.4%201.8-3%202.1-.9.3-1.6.3-2.2.2-.6-.2-1.2-.5-1.6-1-.4-.3-.7-.7-1-1.4a11%2011%200%200%201-.8-2.1Zm2.9-.7c.3%201.3.7%202.2%201%202.6.4.4.8.6%201.2.5l.7-.5c.2-.3.3-.7.2-1.1%200-.5%200-1.2-.3-2.1a7.5%207.5%200%200%200-1-2.8c-.4-.4-.8-.5-1.3-.4-.5.1-.8.4-.9%201%200%20.5%200%201.4.4%202.8ZM67%2075.1l-4.4-3%201.3-2%208.2-2.4%202.1%201.5-3.7%205.5%201.1.7-1.2%202-1.2-.8-1%201.6-2.2-1.4%201-1.7Zm1.4-1.9%201.9-2.8-4.3%201.2%202.4%201.6Z'%20fill='%23C3CBD6'%20fill-rule='nonzero'/%3e%3c/g%3e%3c/svg%3e";
var t3 = w("<div><img>");
function to() {
  const e = at(),
    t = n3();
  return l(aa, {
    get children() {
      var n = t3(),
        r = n.firstChild;
      return (
        Xe(r, "src", e3),
        p(
          n,
          l(j, {
            variant: "headlineMedium",
            get children() {
              return h("Page Not Found");
            },
          }),
          null
        ),
        p(
          n,
          l(ke, {
            group: !0,
            end: !0,
            get children() {
              return l(Z, {
                variant: "filled",
                size: "large",
                onClick: () => {
                  e("/", { replace: !0 });
                },
                get children() {
                  return h("Go to Homepage");
                },
              });
            },
          }),
          null
        ),
        $(
          (o) => {
            var i = t().root,
              a = t().image;
            return (
              i !== o.e && I(n, (o.e = i)), a !== o.t && I(r, (o.t = a)), o
            );
          },
          { e: void 0, t: void 0 }
        ),
        n
      );
    },
  });
}
const n3 = q({
  root: { textAlign: "center" },
  image: { width: "70%", maxWidth: "15rem" },
});
function Sm(e) {
  const t = Y(se),
    n = F({ isDangerous: !1, width: 360 }, e),
    [r, o] = N(!1);
  return l(an, {
    get isShown() {
      return n.isShown;
    },
    hasClose: !0,
    get hasCancel() {
      return !r();
    },
    get title() {
      return n.title;
    },
    get confirmLabel() {
      return n.confirmLabel;
    },
    get width() {
      return n.width;
    },
    get isConfirmLoading() {
      return r();
    },
    get confirmButtonColor() {
      return n.isDangerous ? "error" : "primary";
    },
    onCancel: () => {
      n.onCancel();
    },
    onConfirm: () => {
      r() ||
        (o(!0),
        n
          .process()
          .catch(t.core.methods.reportErrorAction())
          .finally(() => {
            o(!1);
          }));
    },
    children: () => n.children,
  });
}
function r3(e, t, { loadInterval: n = 3e5, scrollOffset: r = 300 }) {
  let o = 0,
    i = Date.now();
  const a = () => {
    o < r && Date.now() - i > n && ((i = Date.now()), t());
  };
  Qr(
    "scroll",
    () => {
      const s = e();
      if (!s) return;
      const c = "scrollY" in s ? s.scrollY : s.scrollTop;
      c < o && c < r && a(), (o = c <= 0 ? 0 : c);
    },
    e,
    { passive: !0 }
  ),
    uh({ refreshInterval: n, onRefresh: a });
}
var zc = () => {},
  Tg = (e, t) => t();
function o3(e, t) {
  const n = He(e),
    r = n ? [n] : [],
    { onEnter: o = Tg, onExit: i = Tg } = t,
    [a, s] = N(t.appear ? [] : r),
    [c] = Wg();
  let u,
    d = !1;
  function g(y, b) {
    if (!y) return b && b();
    (d = !0),
      i(y, () => {
        Zn(() => {
          (d = !1), s((v) => v.filter((S) => S !== y)), b && b();
        });
      });
  }
  function f(y) {
    const b = u;
    if (!b) return y && y();
    (u = void 0), s((v) => [b, ...v]), o(b, y != null ? y : zc);
  }
  const m =
    t.mode === "out-in"
      ? (y) => d || g(y, f)
      : t.mode === "in-out"
      ? (y) => f(() => g(y))
      : (y) => {
          g(y), f();
        };
  return (
    ec(
      (y) => {
        const b = e();
        return He(c)
          ? (c(), y)
          : (b !== y && ((u = b), Zn(() => He(() => m(y)))), b);
      },
      t.appear ? void 0 : n
    ),
    a
  );
}
function i3(e, t) {
  const n = He(e),
    { onChange: r } = t;
  let o = new Set(t.appear ? void 0 : n);
  const i = new WeakSet(),
    [a, s] = N([], { equals: !1 }),
    [c] = Wg(),
    u =
      t.exitMethod === "remove"
        ? zc
        : (g) => {
            s((f) => (f.push.apply(f, g), f));
            for (const f of g) i.delete(f);
          },
    d =
      t.exitMethod === "remove"
        ? zc
        : t.exitMethod === "keep-index"
        ? (g, f, m) => g.splice(m, 0, f)
        : (g, f) => g.push(f);
  return L(
    (g) => {
      const f = a(),
        m = e();
      if ((m[Ha], He(c))) return c(), g;
      if (f.length) {
        const y = g.filter((b) => !f.includes(b));
        return (
          (f.length = 0),
          r({
            list: y,
            added: [],
            removed: [],
            unchanged: y,
            finishRemoved: u,
          }),
          y
        );
      }
      return He(() => {
        const y = new Set(m),
          b = m.slice(),
          v = [],
          S = [],
          A = [];
        for (const T of m) (o.has(T) ? A : v).push(T);
        let k = !v.length;
        for (let T = 0; T < g.length; T++) {
          const E = g[T];
          y.has(E) || (i.has(E) || (S.push(E), i.add(E)), d(b, E, T)),
            k && E !== b[T] && (k = !1);
        }
        return !S.length && k
          ? g
          : (r({
              list: b,
              added: v,
              removed: S,
              unchanged: A,
              finishRemoved: u,
            }),
            (o = y),
            b);
      });
    },
    t.appear ? [] : n.slice()
  );
}
var ws = (e) => e instanceof Element;
function Hc(e, t) {
  if (t(e)) return e;
  if (typeof e == "function" && !e.length) return Hc(e(), t);
  if (Array.isArray(e)) {
    const n = [];
    for (const r of e) {
      const o = Hc(r, t);
      o && (Array.isArray(o) ? n.push.apply(n, o) : n.push(o));
    }
    return n.length ? n : null;
  }
  return null;
}
function a3(e, t = ws, n = ws) {
  const r = L(e),
    o = L(() => Hc(r(), t));
  return (
    (o.toArray = () => {
      const i = o();
      return Array.isArray(i) ? i : i ? [i] : [];
    }),
    o
  );
}
function Vc(e, t) {
  if (t(e)) return e;
  if (typeof e == "function" && !e.length) return Vc(e(), t);
  if (Array.isArray(e))
    for (const n of e) {
      const r = Vc(n, t);
      if (r) return r;
    }
  return null;
}
function s3(e, t = ws, n = ws) {
  const r = L(e);
  return L(() => Vc(r(), t));
}
function Em(e) {
  return L(() => {
    const t = e.name || "s";
    return {
      enterActive: (e.enterActiveClass || t + "-enter-active").split(" "),
      enter: (e.enterClass || t + "-enter").split(" "),
      enterTo: (e.enterToClass || t + "-enter-to").split(" "),
      exitActive: (e.exitActiveClass || t + "-exit-active").split(" "),
      exit: (e.exitClass || t + "-exit").split(" "),
      exitTo: (e.exitToClass || t + "-exit-to").split(" "),
      move: (e.moveClass || t + "-move").split(" "),
    };
  });
}
function Cm(e) {
  requestAnimationFrame(() => requestAnimationFrame(e));
}
function Am(e, t, n, r) {
  const { onBeforeEnter: o, onEnter: i, onAfterEnter: a } = t;
  o == null || o(n),
    n.classList.add(...e.enter),
    n.classList.add(...e.enterActive),
    queueMicrotask(() => {
      if (!n.parentNode) return r == null ? void 0 : r();
      i == null || i(n, () => s());
    }),
    Cm(() => {
      n.classList.remove(...e.enter),
        n.classList.add(...e.enterTo),
        (!i || i.length < 2) &&
          (n.addEventListener("transitionend", s),
          n.addEventListener("animationend", s));
    });
  function s(c) {
    (!c || c.target === n) &&
      (r == null || r(),
      n.removeEventListener("transitionend", s),
      n.removeEventListener("animationend", s),
      n.classList.remove(...e.enterActive),
      n.classList.remove(...e.enterTo),
      a == null || a(n));
  }
}
function Im(e, t, n, r) {
  const { onBeforeExit: o, onExit: i, onAfterExit: a } = t;
  if (!n.parentNode) return r == null ? void 0 : r();
  o == null || o(n),
    n.classList.add(...e.exit),
    n.classList.add(...e.exitActive),
    i == null || i(n, () => s()),
    Cm(() => {
      n.classList.remove(...e.exit),
        n.classList.add(...e.exitTo),
        (!i || i.length < 2) &&
          (n.addEventListener("transitionend", s),
          n.addEventListener("animationend", s));
    });
  function s(c) {
    (!c || c.target === n) &&
      (r == null || r(),
      n.removeEventListener("transitionend", s),
      n.removeEventListener("animationend", s),
      n.classList.remove(...e.exitActive),
      n.classList.remove(...e.exitTo),
      a == null || a(n));
  }
}
var l3 = { inout: "in-out", outin: "out-in" },
  c3 = (e) => {
    const t = Em(e);
    return o3(
      s3(() => e.children),
      {
        mode: l3[e.mode],
        appear: e.appear,
        onEnter(n, r) {
          Am(t(), e, n, r);
        },
        onExit(n, r) {
          Im(t(), e, n, r);
        },
      }
    );
  },
  u3 = (e) => {
    const t = Em(e);
    return i3(a3(() => e.children).toArray, {
      appear: e.appear,
      exitMethod: "keep-index",
      onChange({ added: n, removed: r, finishRemoved: o, list: i }) {
        const a = t();
        for (const c of n) Am(a, e, c);
        const s = [];
        for (const c of i)
          c.isConnected &&
            (c instanceof HTMLElement || c instanceof SVGElement) &&
            s.push({ el: c, rect: c.getBoundingClientRect() });
        queueMicrotask(() => {
          const c = [];
          for (const { el: u, rect: d } of s)
            if (u.isConnected) {
              const g = u.getBoundingClientRect(),
                f = d.left - g.left,
                m = d.top - g.top;
              (f || m) &&
                ((u.style.transform = `translate(${f}px, ${m}px)`),
                (u.style.transitionDuration = "0s"),
                c.push(u));
            }
          document.body.offsetHeight;
          for (const u of c) {
            let d = function (g) {
              (g.target === u || /transform$/.test(g.propertyName)) &&
                (u.removeEventListener("transitionend", d),
                u.classList.remove(...a.move));
            };
            u.classList.add(...a.move),
              (u.style.transform = u.style.transitionDuration = ""),
              u.addEventListener("transitionend", d);
          }
        });
        for (const c of r) Im(a, e, c, () => o([c]));
      },
    });
  };
function xm(e, t) {
  let n = !1;
  const r = () => {
    n || ((n = !0), t());
  };
  e.addEventListener("transitionend", r, { once: !0 }),
    e.addEventListener("animationend", r, { once: !0 });
  const o = getComputedStyle(e),
    i = Lg(o.animationDuration) || Lg(o.transitionDuration);
  i ? window.setTimeout(r, i) : r();
}
function Lg(e) {
  if (!e) return;
  e = e.split(",")[0];
  const t = /^([\d.]+)s$/.exec(e);
  if (t) return Number(t[1]) * 1e3;
  const n = /^([\d.]+)ms$/.exec(e);
  if (n) return Number(n[1]);
}
function d3(e, t) {
  $(() => {
    e.innerHTML = "";
    const n = t();
    n && e.append(n.content);
  });
}
function Ou(e, t) {
  const n = () => {
    e ? e().scroll(0, 0) : window.scrollTo(0, 0);
  };
  t ? ie(pe(t, n)) : requestAnimationFrame(n);
}
function g3(e) {
  e.querySelectorAll("img").forEach((t) => {
    var i;
    let n = t.parentElement;
    if (n != null && n.closest("table,ul,ol,dl,aside,blockquote,pre")) return;
    let r = t;
    (n == null ? void 0 : n.tagName) === "PICTURE" &&
      ((r = n), (n = n.parentElement)),
      (n == null ? void 0 : n.tagName) === "A" &&
        n.childElementCount === 1 &&
        !Pg(n) &&
        ((r = n), (n = n.parentElement));
    let o = !1;
    if (!/\b(stat|analysis)\b/.test(t.src))
      if (
        (n == null ? void 0 : n.tagName) === "FIGURE" ||
        (["P", "DIV"].includes(
          (i = n == null ? void 0 : n.tagName) != null ? i : ""
        ) &&
          (n == null ? void 0 : n.childElementCount) === 1 &&
          !Pg(n))
      )
        n.classList.add("big-image-wrapper"),
          t.classList.add("big-image"),
          (o = !0);
      else {
        if (n && !["DIV", "P", "SECTION"].includes(n.tagName)) return;
        const a = $g(r, "previousSibling");
        if (a && Mg(a)) return;
        const s = $g(r, "nextSibling");
        if (s && Mg(s)) return;
        const c = document.createElement("div");
        c.classList.add("big-image-wrapper"),
          (n != null ? n : e).replaceChild(c, r),
          t.classList.add("big-image"),
          c.appendChild(r),
          (o = !0);
      }
    o && (km(t) || t.addEventListener("load", y3));
  }),
    e.querySelectorAll("td").forEach((t) => {
      var n;
      t.childElementCount === 1 &&
        ((n = t.firstElementChild) == null ? void 0 : n.tagName) === "PRE" &&
        t.classList.add("article-content__code-cell");
    });
}
function Pg(e) {
  return Array.from(e.childNodes).some((t) => {
    var n;
    return (
      t.nodeName === "#text" && ((n = t.nodeValue) == null ? void 0 : n.trim())
    );
  });
}
const f3 = new Set(["br"]);
function Mg(e) {
  var t;
  return (
    (e.nodeName === "#text" && !!((t = e.nodeValue) != null && t.trim())) ||
    (!f3.has(e.nodeName) && $v.has(e.nodeName))
  );
}
function h3(e) {
  var t;
  return (
    (e.nodeName === "#text" && !((t = e.nodeValue) != null && t.trim())) ||
    e.nodeName === "#comment"
  );
}
function $g(e, t) {
  for (let n = e[t]; n != null; n = n[t]) if (n && !h3(n)) return n;
}
const m3 = 500;
function km(e) {
  if (e.naturalWidth && e.naturalWidth > m3)
    return e.style.setProperty("--natural-width", `${e.naturalWidth}px`), !0;
}
function y3(e) {
  e.currentTarget instanceof HTMLImageElement && km(e.currentTarget);
}
const p3 = "head, base, meta, link, style, object, script, frameset, form";
function v3(e, t, n) {
  const r = document.createElement("template");
  return (
    (r.innerHTML = t),
    b3(r.content),
    w3(r.content),
    S3(r.content),
    A3(r.content),
    P3(r.content),
    E3(r.content),
    e && C3(r.content, e),
    n == null || n(r.content),
    r
  );
}
function b3(e) {
  e.querySelectorAll(p3).forEach((t) => t.remove());
}
function w3(e) {
  e.querySelectorAll("img").forEach((t) => (t.referrerPolicy = "no-referrer"));
}
function S3(e) {
  const t = (o, i) => {
      var a;
      for (const s of i) {
        const c = o.getAttribute(s);
        if (c && /^(\/|\.|http)/.test(c))
          return (
            o.setAttribute(
              "data-debug-original-src",
              (a = o.getAttribute("src")) != null ? a : ""
            ),
            o.setAttribute("src", c),
            !0
          );
      }
    },
    n = ["data-src"].concat(
      ["lazy", "original", "origin", "orig", "source"].reduce(
        (o, i) => (o.push(i, `${i}-src`, `data-${i}`, `data-${i}-src`), o),
        []
      )
    ),
    r = /placeholder|loading/;
  e.querySelectorAll("img").forEach((o) => {
    const i = o.getAttributeNames(),
      a = i.filter((c) => n.includes(c));
    if (t(o, a)) return;
    for (const c of [/src|lazy|source|orig/, /img|image|pic/]) {
      const u = i.filter((d) => d !== "src" && c.test(d));
      if (t(o, u)) return;
    }
    const s = o.getAttribute("src");
    (!s || r.test(s)) && t(o, i);
  });
}
function E3(e) {
  e.querySelectorAll("a[href]").forEach((t) => {
    (t.target = "_blank"), (t.dataset.native = "native");
  });
}
function C3(e, t) {
  e.querySelectorAll("a[href]").forEach((n) => {
    const r = n.getAttribute("href");
    r && $a(r) && n.setAttribute("href", gd(r, t));
  }),
    e.querySelectorAll("img").forEach((n) => {
      const r = n.getAttribute("srcset");
      r && $a(r) && n.removeAttribute("srcset");
      const o = n.getAttribute("src");
      o && $a(o) && n.setAttribute("src", gd(o, t));
    });
}
function A3(e) {
  e.querySelectorAll("*").forEach((t) => {
    t instanceof HTMLElement &&
      (I3(t),
      (t.style.display = ""),
      (t.style.position = ""),
      (t.style.float = ""),
      (t.style.padding = ""),
      (t.style.width = ""),
      (t.style.minWidth = ""),
      (t.style.maxWidth = ""),
      (t.style.height = ""),
      (t.style.minHeight = ""),
      (t.style.maxHeight = ""),
      (t.style.animation = ""),
      (t.style.transition = ""),
      (t.style.touchAction = ""),
      (t.style.pointerEvents = ""));
  });
}
function I3(e) {
  e.className &&
    (e.className = Array.from(e.classList)
      .map((t) => `u-${t}`)
      .join(" "));
}
const x3 = new Set(["audio", "video", "img", "source"]),
  k3 = new Set(["action", "background", "dynsrc", "href", "lowsrc", "src"]),
  T3 = /^(?:\w+script|data):/i,
  L3 = /[\x00-\x20\xA0\u1680\u180E\u2000-\u2029\u205f\u3000]/g;
function P3(e) {
  e.querySelectorAll("*").forEach((t) => {
    const n = [];
    for (let r = t.attributes.length - 1; r >= 0; r--) {
      const o = t.attributes[r],
        i = o.name.toLowerCase();
      (i.startsWith("on") || (k3.has(i) && T3.test(o.value.replace(L3, "")))) &&
        !(
          i === "src" &&
          o.value.startsWith("data:") &&
          x3.has(t.tagName.toLowerCase())
        ) &&
        n.push(o.name);
    }
    for (const r of n) t.removeAttribute(r);
  });
}
function M3(e, t, n, r) {
  return v3(e, t, (o) => {
    o.querySelectorAll("pre").forEach((i) => {
      i.setAttribute("tabindex", "-1");
    }),
      o.querySelectorAll("img").forEach((i) => {
        i.classList.add("user-image"),
          i.getAttribute("src") === n &&
            i.classList.add("user-image-thumbnail");
      }),
      o.querySelectorAll("table").forEach((i) => {
        const a = document.createElement("div");
        (a.className = "article-table-wrapper"),
          a.setAttribute("tabindex", "-1"),
          $3(i, a);
      }),
      r.imageLazyLoading &&
        o.querySelectorAll("img").forEach((i) => (i.loading = "lazy")),
      g3(o);
  });
}
function $3(e, t) {
  e.parentNode.insertBefore(t, e), t.appendChild(e);
}
const R3 = [
  /\byoutube\.com$/,
  /\btwitter\.com$/,
  /\binstagram\.com$/,
  /\breddit\.com$/,
  /\bpinterest\.com$/,
  /\bquora\.com$/,
  /\bfacebook\.com$/,
  /\bgithub\.com$/,
  /\bxiaohongshu\.com$/,
  /\bbilibili\.com$/,
  /\bfc2\.com$/,
  /\btumblr\.com$/,
  /\btoutiao\.com$/,
  /\byouku\.com$/,
  /\bnetflix\.com$/,
  /\bpornhub\.com$/,
  /\btiktok\.com$/,
  /\bmastodon\.social$/,
  /\bthreads\.net$/,
  /\bweibo\.com$/,
];
function D3(e) {
  let t;
  try {
    t = new URL(e).hostname;
  } catch (n) {
    return !0;
  }
  return R3.some((n) => n.test(t));
}
const _3 = 80,
  O3 = 100,
  N3 = 0;
function F3(e, t, n) {
  const r = B3(e);
  return r &&
    r.topDistance > t + O3 &&
    (r.hiddenHeight > _3 || r.hiddenHeight > r.imageRect.height * 0.2)
    ? r.topDistance - t - N3
    : n;
}
function B3(e) {
  const t = e.getBoundingClientRect(),
    n = e.querySelectorAll("img.big-image");
  for (let r = 0; r < n.length; r++) {
    const o = n[r],
      i = o.getBoundingClientRect();
    if (i.top > t.bottom) break;
    if (i.top < i.bottom && i.bottom > t.bottom) {
      const a = i.bottom - t.bottom,
        s = i.top - t.top;
      return { image: o, imageRect: i, hiddenHeight: a, topDistance: s };
    }
  }
}
var U3 = w("<div>");
function Ua(e) {
  const t = (o) => (e.format ? e.format(o) : String(o)),
    n = Mu(),
    r = z3();
  return (() => {
    var o = U3();
    return (
      p(
        o,
        l(j, {
          variant: "labelLarge",
          get class() {
            return H(r().label, e.disabled && n().disabled);
          },
          get children() {
            return e.text;
          },
        }),
        null
      ),
      p(
        o,
        l(Z, {
          variant: "text",
          color: "neutral",
          icon: Ow,
          size: "small",
          get disabled() {
            return e.isDecrementDisabled;
          },
          get onClick() {
            return e.onDecrement;
          },
        }),
        null
      ),
      p(
        o,
        l(j, {
          variant: "labelLarge",
          get class() {
            return r().value;
          },
          get children() {
            return t(e.value);
          },
        }),
        null
      ),
      p(
        o,
        l(Z, {
          variant: "text",
          color: "neutral",
          icon: uu,
          size: "small",
          get disabled() {
            return e.isIncrementDisabled;
          },
          get onClick() {
            return e.onIncrement;
          },
        }),
        null
      ),
      $(() => I(o, r().root)),
      o
    );
  })();
}
const z3 = q((e) => ({
  root: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    minHeight: Re(_c),
    padding: `0 ${Re(Oc)} 0 ${Re(Ri)}`,
  },
  label: { flex: "1 0", marginRight: "2rem" },
  value: {
    margin: "0 0.25rem",
    padding: "0.125rem 0.25rem",
    minWidth: "2rem",
    textAlign: "center",
    background: e.color.surfaceVariant,
    border: `1px solid ${e.color.outline}`,
    color: e.color.onSurfaceVariant,
    borderRadius: e.sharp.extraSmall,
  },
}));
function H3() {
  const e = at(),
    { isTabletViewportSize: t } = Uo(),
    [n] = yu(),
    [r, o] = Ah(),
    [i, a] = pu(),
    [s, c] = Ch();
  return l(ri, {
    get title() {
      return h("View options");
    },
    get children() {
      return [
        l(nm, { path: "/view-options/theme/" }),
        l(tn, {}),
        l(Wo, {
          get text() {
            return h("Font family");
          },
          noIcon: !0,
          get value() {
            return n().label;
          },
          path: "/view-options/font-family/",
        }),
        l(Ua, {
          get text() {
            return h("Font size");
          },
          get value() {
            return i();
          },
          onIncrement: () => as([i, a], 1),
          get isIncrementDisabled() {
            return i() === _a[_a.length - 1];
          },
          onDecrement: () => as([i, a], -1),
          get isDecrementDisabled() {
            return i() === _a[0];
          },
        }),
        l(Ua, {
          get text() {
            return h("Line height");
          },
          get value() {
            return s();
          },
          onIncrement: () => Yd([s, c], 1),
          get isIncrementDisabled() {
            return s() === Oa[Oa.length - 1];
          },
          onDecrement: () => Yd([s, c], -1),
          get isDecrementDisabled() {
            return s() === Oa[0];
          },
        }),
        l(D, {
          get when() {
            return t();
          },
          get children() {
            return l(Ua, {
              get text() {
                return h("Content width");
              },
              get value() {
                return r();
              },
              onIncrement: () => qd([r, o], 1),
              get isIncrementDisabled() {
                return r() === Na[Na.length - 1];
              },
              onDecrement: () => qd([r, o], -1),
              get isDecrementDisabled() {
                return r() === Na[0];
              },
            });
          },
        }),
        l(tn, {}),
        l(Ee, {
          get text() {
            return h("More options…");
          },
          icon: du,
          onClick: () => {
            e("/settings/interface/article-contents");
          },
        }),
      ];
    },
  });
}
var V3 = w("<video controls preload=metadata loop>"),
  W3 = w("<iframe allowfullscreen>");
function G3(e) {
  const t = () => {
      var r;
      return ((r = e.entry.attachments) != null ? r : []).filter((o) =>
        e.filter(o.mimeType)
      );
    },
    n = j3();
  return l(Qe, {
    get each() {
      return t();
    },
    children: (r) =>
      l(D, {
        get when() {
          return q3(r);
        },
        get fallback() {
          return l(D, {
            get when() {
              return /^video\//.test(r.mimeType);
            },
            get children() {
              var o = V3();
              return (
                $(
                  (i) => {
                    var a = H(n().player, n().video),
                      s = r.url;
                    return (
                      a !== i.e && I(o, (i.e = a)),
                      s !== i.t && Xe(o, "src", (i.t = s)),
                      i
                    );
                  },
                  { e: void 0, t: void 0 }
                ),
                o
              );
            },
          });
        },
        children: (o) =>
          (() => {
            var i = W3();
            return (
              $(
                (a) => {
                  var s = n().player,
                    c = o();
                  return (
                    s !== a.e && I(i, (a.e = s)),
                    c !== a.t && Xe(i, "src", (a.t = c)),
                    a
                  );
                },
                { e: void 0, t: void 0 }
              ),
              i
            );
          })(),
      }),
  });
}
const j3 = q(() => ({
    player: {
      marginTop: 0,
      marginBottom: "1rem",
      width: "100%",
      height: 480,
      border: "none",
      [vr]: { height: 240 },
    },
    video: { backgroundColor: "#000" },
  })),
  Y3 = [/^youtu\.be$/, /\.youtube\.com$/];
function q3(e) {
  if (e.foreignId && X3(e.url, Y3))
    return `https://www.youtube.com/embed/${e.foreignId}`;
}
function X3(e, t) {
  let n;
  try {
    n = new URL(e).hostname;
  } catch (r) {
    return !1;
  }
  return t.some((r) => r.test(n));
}
var K3 = w("<div>");
function Tm(e) {
  const t = Z3();
  return (() => {
    var n = K3();
    return p(n, () => e.children), $(() => I(n, t().root)), n;
  })();
}
const Z3 = q({
  root: { flex: "1 1 auto", overflow: "hidden auto", minHeight: "8rem" },
});
function Q3() {
  const [e, t] = yu(),
    n = (r) => {
      const o = Lc.find((i) => i.label === r);
      o && t(o);
    };
  return l(ri, {
    get title() {
      return h("Font family");
    },
    get children() {
      return l(Tm, {
        get children() {
          return l(Qe, {
            each: Lc,
            children: (r) =>
              l(Ee, {
                type: "radio",
                get text() {
                  return r.label;
                },
                noIcon: !0,
                get checked() {
                  return r.label === e().label;
                },
                onClick: () => n(r.label),
              }),
          });
        },
      });
    },
  });
}
var J3 = w("<div>"),
  ex = w("<div><img referrerpolicy=no-referrer>");
function tx(e) {
  let t, n, r;
  const o = Y(se),
    [i, a] = N(!1),
    s = nx(),
    c = () => {
      n.addEventListener("touchstart", (b) => {
        b.preventDefault();
      });
    },
    u = () => {
      t.animate([{ opacity: 0 }], {
        fill: "none",
        duration: 200,
        easing: "ease-out",
      }).finished.finally(() => {
        e.onClose();
      });
    },
    d = () => {
      c();
      const b = Math.min(3e3, n.naturalWidth),
        v = Math.ceil(b * (n.naturalHeight / n.naturalWidth)),
        S = t.clientWidth,
        A = t.clientHeight,
        k = Math.min(1, S / b),
        T = Math.min(1, A / v),
        E = Math.min(k, T),
        P = 10,
        x = v * E < A / 2 ? Math.min(E * 4, A / v) : E * 2.5;
      let _ = E,
        R = 0,
        z = 0;
      const J = (ne) => {
        const G = b * _,
          Q = v * _;
        (R = G <= S ? (S - G) / 2 : Math.max(-(G - S), Math.min(0, R))),
          (z = Q <= A ? (A - Q) / 2 : Math.max(-(Q - A), Math.min(0, z))),
          (n.style.transition = ne || ""),
          (n.style.transform = `matrix(${_}, 0, 0, ${_}, ${R}, ${z})`);
      };
      (n.style.display = "block"),
        (n.style.width = `${b}px`),
        (n.style.height = `${v}px`),
        (n.style.opacity = "0"),
        (n.style.transformOrigin = "left top"),
        a(!0),
        (_ *= 0.7),
        J(),
        setTimeout(() => {
          (_ = E), (n.style.opacity = "1"), J("300ms");
        }, 50),
        (r = new RC(n, {
          panThreshold: 8,
          pointerdown(ne) {
            ne.preventDefault();
          },
          singleTap() {
            u();
          },
          doubleTap(ne) {
            const G = _ <= E ? x / _ : E / _;
            (R -= (G - 1) * (ne.clientX - R)),
              (z -= (G - 1) * (ne.clientY - z)),
              (_ *= G),
              J("500ms ease-out");
          },
          panMove(ne, G) {
            (R += G.deltaX), (z += G.deltaY), J();
          },
          panEnd(ne, G) {
            const le = Math.min(5, G.velocityX) ** 2 / 0.008,
              Se = Math.min(5, G.velocityY) ** 2 / (2 * 2 * 0.002),
              Ie = (G.velocityX + G.velocityY) / 2 / 0.002;
            (R += le * Math.sign(G.speedX)),
              (z += Se * Math.sign(G.speedY)),
              J(`${Ie}ms ease-out`);
          },
          pinch(ne, G) {
            const Q = _ * G.scale;
            Q > P
              ? ((G.scale = P / _), (_ = P))
              : Q < E
              ? ((G.scale = E / _), (_ = E))
              : (_ = Q),
              (R -= (G.scale - 1) * (G.centerX - R) - G.centerDeltaX),
              (z -= (G.scale - 1) * (G.centerY - z) - G.centerDeltaY),
              J();
          },
          wheel(ne, G) {
            ne.preventDefault();
            const Q = _ * G.scale;
            Q > P
              ? ((G.scale = P / _), (_ = P))
              : Q < E
              ? ((G.scale = E / _), (_ = E))
              : (_ = Q),
              (R -= (G.scale - 1) * (ne.clientX - R)),
              (z -= (G.scale - 1) * (ne.clientY - z)),
              J();
          },
        }));
    },
    g = () => {
      o.core.methods.notifyError(h("Couldn't load image")), e.onClose();
    };
  De(() => {
    r == null || r.destroy();
  });
  const f = (b) => {
    b.target === t && u();
  };
  Qr("keyup", (b) => {
    b.key === "Escape" && u();
  });
  const y = () =>
    l(us, {
      get class() {
        return s().topBar;
      },
      get children() {
        return [
          l(Cu, {}),
          l(Z, {
            variant: "filled",
            color: "neutral",
            transparent: !0,
            icon: Yw,
            get href() {
              return e.imageInfo.src;
            },
            download: "",
            target: "_blank",
          }),
          l(Z, {
            variant: "filled",
            color: "neutral",
            transparent: !0,
            icon: so,
            edge: "end",
            onClick: u,
          }),
        ];
      },
    });
  return l(Zr, {
    get value() {
      return kr.OVERLAY;
    },
    children: (b) =>
      l(na, {
        get children() {
          var v = ex(),
            S = v.firstChild;
          v.$$click = f;
          var A = t;
          typeof A == "function" ? tt(A, v) : (t = v),
            b != null
              ? v.style.setProperty("z-index", b)
              : v.style.removeProperty("z-index"),
            p(v, y, S),
            S.addEventListener("error", g),
            S.addEventListener("load", d);
          var k = n;
          return (
            typeof k == "function" ? tt(k, S) : (n = S),
            p(
              v,
              l(D, {
                get when() {
                  return !i();
                },
                get children() {
                  var T = J3();
                  return p(T, l(ao, {})), $(() => I(T, s().spinnerOuter)), T;
                },
              }),
              null
            ),
            $(
              (T) => {
                var E = s().root,
                  P = s().image,
                  M = e.imageInfo.src,
                  x = e.imageInfo.srcset,
                  _ = e.imageInfo.sizes;
                return (
                  E !== T.e && I(v, (T.e = E)),
                  P !== T.t && I(S, (T.t = P)),
                  M !== T.a && Xe(S, "src", (T.a = M)),
                  x !== T.o && Xe(S, "srcset", (T.o = x)),
                  _ !== T.i && Xe(S, "sizes", (T.i = _)),
                  T
                );
              },
              { e: void 0, t: void 0, a: void 0, o: void 0, i: void 0 }
            ),
            v
          );
        },
      }),
  });
}
const nx = q((e) => ({
  root: {
    ...$s,
    overflow: "hidden",
    background: Ot(e.color.scrim, 0.9),
    animation: St.fadeInSlow.cssText,
    touchAction: "none",
  },
  topBar: { position: "sticky", top: 0, background: mn },
  image: { position: "absolute", left: 0, top: 0, display: "none" },
  spinnerOuter: {
    ...En,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
Bn(["click"]);
var rx = w("<img width=32 height=32>"),
  Ai = w("<div>"),
  ox = w("<div><div></div><div>"),
  Ta = w("<option>"),
  ix = w("<form>"),
  ax = w("<div style=margin-top:0.5rem>");
function Lm(e) {
  const t = Y(se),
    n = L(() =>
      t.preferences.methods.getSubscriptionStreamPreferences(
        { type: K.SUBSCRIPTION, id: e.subscription.id },
        "articleViewType"
      )
    ),
    r = L(() => {
      var v, S;
      return (S =
        (v = t.feedStates.data.feedStates[e.subscription.feedId]) == null
          ? void 0
          : v.supportsEmbedding) != null
        ? S
        : !0;
    }),
    o = L(() =>
      t.preferences.methods.getGlobalPreference("autoLoadWebpageText")
    ),
    [i, a] = N(!1);
  let s;
  const c = () => {
      a(!0), s.focus();
    },
    u = () => {
      const v = s.value.trim();
      if (!v || v === e.subscription.originalTitle) {
        d();
        return;
      }
      t.subscriptions.methods
        .modifySubscriptionAction({
          subscriptionId: e.subscription.id,
          title: v,
        })
        .catch(t.core.methods.reportErrorAction()),
        a(!1);
    },
    d = () => {
      t.subscriptions.methods
        .modifySubscriptionAction({
          subscriptionId: e.subscription.id,
          resetTitle: !0,
        })
        .catch(t.core.methods.reportErrorAction()),
        a(!1);
    },
    g = (v) => {
      const S = v.currentTarget,
        A = Number(S.value);
      t.preferences.methods
        .updateSubscriptionPreferencesAction(e.subscription.id, {
          articleViewType: A,
        })
        .catch(t.core.methods.reportErrorAction());
    },
    f = sx(),
    m = () =>
      l(us, {
        get class() {
          return f().topBar;
        },
        get children() {
          return [
            l(D, {
              keyed: !0,
              get when() {
                return e.subscription.homePageUrl;
              },
              children: (v) =>
                (() => {
                  var S = rx();
                  return (
                    $(
                      (A) => {
                        var k = f().icon,
                          T = Vs(v, 32);
                        return (
                          k !== A.e && I(S, (A.e = k)),
                          T !== A.t && Xe(S, "src", (A.t = T)),
                          A
                        );
                      },
                      { e: void 0, t: void 0 }
                    ),
                    S
                  );
                })(),
            }),
            l(Tr, {
              get children() {
                return h("Feed properties");
              },
            }),
            l(Cu, {}),
            l(Z, {
              variant: "text",
              color: "neutral",
              icon: so,
              edge: "end",
              onClick: () => e.toggle(),
            }),
          ];
        },
      }),
    y = (v, S) =>
      (() => {
        var A = Ai();
        return (
          p(
            A,
            l(j, {
              variant: "labelMedium",
              color: "secondary",
              gutterBottom: !0,
              children: v,
            }),
            null
          ),
          p(A, S, null),
          $(() => I(A, f().section)),
          A
        );
      })(),
    b = (v, S) =>
      (() => {
        var A = ox(),
          k = A.firstChild,
          T = k.nextSibling;
        return (
          p(k, v),
          p(T, S),
          $(
            (E) => {
              var P = f().itemWithAction,
                M = f().itemWithActionContent,
                x = f().itemWithActionActions;
              return (
                P !== E.e && I(A, (E.e = P)),
                M !== E.t && I(k, (E.t = M)),
                x !== E.a && I(T, (E.a = x)),
                E
              );
            },
            { e: void 0, t: void 0, a: void 0 }
          ),
          A
        );
      })();
  return l(Vh, {
    get isShown() {
      return e.isShown;
    },
    get class() {
      return f().root;
    },
    width: 360,
    get position() {
      return Hh.RIGHT;
    },
    onClose: () => {
      e.toggle(!1);
    },
    children: () => [
      L(m),
      L(() =>
        y(
          L(() => h("Title")),
          l(D, {
            get when() {
              return i();
            },
            get fallback() {
              return b(
                L(() => e.subscription.title),
                l(Z, {
                  variant: "text",
                  color: "neutral",
                  icon: Jw,
                  size: "small",
                  edge: "end",
                  get title() {
                    return h("Rename");
                  },
                  onClick: c,
                })
              );
            },
            get children() {
              return [
                (() => {
                  var v = ix();
                  return (
                    v.addEventListener("submit", u),
                    p(
                      v,
                      l(At, {
                        get inputProps() {
                          return {
                            ref: (S) => {
                              s = S;
                            },
                            value: e.subscription.title,
                            required: !0,
                          };
                        },
                        full: !0,
                        outlined: !0,
                        get suffix() {
                          return l(Z, {
                            type: "submit",
                            variant: "text",
                            icon: su,
                            size: "small",
                            edge: "end",
                            get title() {
                              return h("Save");
                            },
                          });
                        },
                      })
                    ),
                    v
                  );
                })(),
                l(D, {
                  get when() {
                    return (
                      e.subscription.title !== e.subscription.originalTitle
                    );
                  },
                  get children() {
                    var v = ax();
                    return (
                      p(
                        v,
                        l(Z, {
                          variant: "tonal",
                          size: "small",
                          edge: "start",
                          onClick: d,
                          get children() {
                            return h("Use original title");
                          },
                        })
                      ),
                      v
                    );
                  },
                }),
              ];
            },
          })
        )
      ),
      l(D, {
        get when() {
          return e.subscription.title !== e.subscription.originalTitle;
        },
        get children() {
          var v = Ai();
          return (
            p(
              v,
              l(j, {
                variant: "labelMedium",
                color: "onSurfaceVariant",
                gutterBottom: !0,
                get children() {
                  return h("Original title");
                },
              }),
              null
            ),
            p(
              v,
              l(j, {
                get children() {
                  return e.subscription.originalTitle;
                },
              }),
              null
            ),
            $(() => I(v, f().section)),
            v
          );
        },
      }),
      (() => {
        var v = Ai();
        return (
          p(
            v,
            l(Fc, {
              get children() {
                return h("Default view");
              },
            }),
            null
          ),
          p(
            v,
            l(Ur, {
              get value() {
                return n();
              },
              full: !0,
              onChange: g,
              get children() {
                return [
                  (() => {
                    var S = Ta();
                    return (
                      p(S, () => h("Use global setting")),
                      $(() => (S.value = _e.AUTO)),
                      S
                    );
                  })(),
                  (() => {
                    var S = Ta();
                    return (
                      p(S, () => h("Feed text")),
                      $(() => (S.value = _e.FEED_TEXT)),
                      S
                    );
                  })(),
                  (() => {
                    var S = Ta();
                    return (
                      p(S, () => h("Webpage text")),
                      $(() => (S.value = _e.WEBPAGE_TEXT)),
                      S
                    );
                  })(),
                  (() => {
                    var S = Ta();
                    return (
                      p(S, () => h("Inline webpage")),
                      $(() => (S.disabled = !r())),
                      $(() => (S.value = _e.WEBPAGE)),
                      S
                    );
                  })(),
                ];
              },
            }),
            null
          ),
          p(
            v,
            l(D, {
              get when() {
                return n() === _e.AUTO;
              },
              get children() {
                return l(Rn, {
                  get children() {
                    return [
                      L(() => h("Global setting:")),
                      " ",
                      l(Pe, {
                        href: "/settings/interface/article-contents",
                        color: "inherit",
                        get children() {
                          return L(() => !!o())()
                            ? h("Auto-load webpage text")
                            : h("Feed text");
                        },
                      }),
                    ];
                  },
                });
              },
            }),
            null
          ),
          $(() => I(v, f().section)),
          v
        );
      })(),
      (() => {
        var v = Ai();
        return (
          p(
            v,
            l(D, {
              keyed: !0,
              get when() {
                return e.subscription.homePageUrl;
              },
              children: (S) => [
                l(j, {
                  variant: "labelMedium",
                  color: "onSurfaceVariant",
                  gutterBottom: !0,
                  get children() {
                    return h("Website");
                  },
                }),
                l(j, {
                  get class() {
                    return f().value;
                  },
                  gutterBottom: !0,
                  get children() {
                    return l(Pe, {
                      href: S,
                      color: "inherit",
                      openInNew: !0,
                      get children() {
                        return e.subscription.homePageUrl;
                      },
                    });
                  },
                }),
              ],
            }),
            null
          ),
          p(
            v,
            l(D, {
              keyed: !0,
              get when() {
                return e.subscription.description;
              },
              children: (S) =>
                l(j, {
                  variant: "bodyMedium",
                  color: "onSurfaceVariant",
                  children: S,
                }),
            }),
            null
          ),
          $(() => I(v, f().section)),
          v
        );
      })(),
      (() => {
        var v = Ai();
        return (
          p(
            v,
            l(j, {
              variant: "labelMedium",
              color: "onSurfaceVariant",
              gutterBottom: !0,
              get children() {
                return h("RSS");
              },
            }),
            null
          ),
          p(
            v,
            l(j, {
              get class() {
                return f().value;
              },
              get children() {
                return l(Pe, {
                  get href() {
                    return e.subscription.feedUrl;
                  },
                  color: "inherit",
                  openInNew: !0,
                  get children() {
                    return e.subscription.feedUrl;
                  },
                });
              },
            }),
            null
          ),
          $(() => I(v, f().section)),
          v
        );
      })(),
    ],
  });
}
const sx = q((e) => ({
  root: {},
  topBar: { ...Gf, position: "sticky" },
  icon: { borderRadius: e.sharp.extraSmall },
  section: { margin: "1rem 0 2rem", padding: "0 1rem" },
  value: { fontWeight: 500, overflowWrap: "break-word" },
  itemWithAction: { display: "flex", alignItems: "center" },
  itemWithActionContent: { flex: "1", marginRight: "0.25rem" },
  itemWithActionActions: {
    flex: "0 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "right",
  },
}));
var lx = w("<div>");
function cx(e) {
  const t = F({ editMode: !1 }, e);
  let n;
  const r = Y(zs),
    o = ux(),
    i = (a) => {
      var s, c;
      if (a.key === "Enter") (s = t.onCommit) == null || s.call(t);
      else if (a.key === "Escape") (c = t.onCancel) == null || c.call(t);
      else return;
      a.stopPropagation();
    };
  return (
    ie(
      pe(
        () => t.editMode,
        () => {
          r == null || r.update(), t.editMode && (n == null || n.focus());
        },
        { defer: !0 }
      )
    ),
    l(D, {
      get when() {
        return t.editMode && !t.disabled;
      },
      get fallback() {
        return l(Ee, {
          get icon() {
            return t.icon;
          },
          get text() {
            return t.text;
          },
          get disabled() {
            return t.disabled;
          },
          onClick: () => {
            var a;
            return (a = t.onClick) == null || a.call(t), !1;
          },
        });
      },
      get children() {
        var a = lx();
        return (
          p(
            a,
            l(At, {
              get className() {
                return o().edit;
              },
              outlined: !0,
              get placeholder() {
                return t.placeholder;
              },
              get inputProps() {
                return {
                  ref: (s) => {
                    n = s;
                  },
                  value: t.value,
                  size: 8,
                  maxLength: t.maxLength,
                  disabled: t.isLoading,
                  onInput: t.onChange,
                  onChange: t.onChange,
                  onKeyDown: i,
                };
              },
              get suffix() {
                return l(D, {
                  get when() {
                    return !t.isLoading;
                  },
                  get fallback() {
                    return l(ao, { size: 20 });
                  },
                  get children() {
                    return l(Z, {
                      variant: "text",
                      icon: su,
                      size: "small",
                      edge: "start",
                      get disabled() {
                        var s;
                        return !((s = t.value) != null && s.trim());
                      },
                      get onClick() {
                        return t.onCommit;
                      },
                    });
                  },
                });
              },
            })
          ),
          $(() => I(a, o().root)),
          a
        );
      },
    })
  );
}
const ux = q(() => ({
  root: {
    flexShrink: 0,
    display: "flex",
    alignItems: "center",
    height: "2.5rem",
    padding: "0 0.5rem 0 0.5rem",
  },
  edit: { flex: 1, minWidth: "10rem" },
}));
var dx = w("<div>");
function Pm(e) {
  const [t, n] = N(!1),
    [r, o] = N(!1),
    [i, a] = N(""),
    [s, c] = N(),
    u = Y(se),
    d = gx(),
    g = () => {
      n(!0);
    },
    f = () => {
      n(!1), a("");
    },
    m = (v) => {
      a(v.currentTarget.value);
    },
    y = () => {
      !e.onAdd ||
        !i() ||
        r() ||
        (o(!0),
        e
          .onAdd(i())
          .then((v) => {
            v !== !1 && (n(!1), a(""));
          })
          .catch(u.core.methods.reportErrorAction())
          .finally(() => {
            o(!1);
          }));
    },
    b = (v) => {
      if (e.onChange)
        return (
          c(v.label),
          e.onChange(v).finally(() => {
            c(void 0);
          }),
          !1
        );
    };
  return [
    l(D, {
      get when() {
        return e.items.length === 0 && e.help;
      },
      get children() {
        var v = dx();
        return p(v, () => e.help), $(() => I(v, d().help)), v;
      },
    }),
    l(Tm, {
      get children() {
        return l(Qe, {
          get each() {
            return e.items;
          },
          children: (v) =>
            l(Ee, {
              type: "checkbox",
              get text() {
                return v.label;
              },
              noIcon: !0,
              get checked() {
                return v.checked;
              },
              get isLoading() {
                return v.label === s();
              },
              get onClick() {
                return b.bind(void 0, v);
              },
            }),
        });
      },
    }),
    L(
      (() => {
        var v = L(() => !!e.inputMenuItemLabel);
        return () =>
          v() && [
            l(D, {
              get when() {
                return e.items.length > 0 || e.help;
              },
              get children() {
                return l(tn, {});
              },
            }),
            l(cx, {
              icon: uu,
              get text() {
                return e.inputMenuItemLabel;
              },
              get placeholder() {
                return e.inputPlaceholder;
              },
              get editMode() {
                return t();
              },
              get isLoading() {
                return r();
              },
              get value() {
                return i();
              },
              get maxLength() {
                return e.inputMaxLength;
              },
              onClick: g,
              onCancel: f,
              onChange: m,
              onCommit: y,
            }),
          ];
      })()
    ),
  ];
}
const gx = q({
  help: {
    margin: "0 auto",
    padding: "0.5rem",
    maxWidth: "12rem",
    textAlign: "center",
  },
});
function Rg(e) {
  const t = Y(se),
    n = Y(si),
    r = () => Object.values(t.tags.data.tags),
    o = () =>
      r()
        .filter((c) => !c.label.startsWith(lo))
        .map((c) => ({
          checked: e.entry.tagIds.includes(c.id),
          label: c.label,
        })),
    i = async (c) => {
      await t.tags.methods
        .createTagAction(c)
        .catch(t.core.methods.reportErrorAction());
    },
    a = async (c) => {
      const u = r().find((d) => d.label === c.label);
      W(u),
        c.checked
          ? await n.methods
              .removeTagFromEntryAction({ entryId: e.entry.id, tagId: u.id })
              .catch(t.core.methods.reportErrorAction())
          : await n.methods
              .addTagToEntryAction({ entryId: e.entry.id, tagId: u.id })
              .catch(t.core.methods.reportErrorAction());
    },
    s = [
      L(
        (() => {
          var c = L(() => !e.asSubMenu);
          return () =>
            c() &&
            l(j, {
              variant: "titleSmall",
              gutterBottom: !0,
              get children() {
                return h("Tags");
              },
            });
        })()
      ),
      l(j, {
        variant: "bodySmall",
        color: "onSurfaceVariant",
        get children() {
          return h("Organize your saved articles by tags.");
        },
      }),
    ];
  return l(Pm, {
    help: s,
    get items() {
      return o();
    },
    get inputMenuItemLabel() {
      return h("New Tag");
    },
    get inputPlaceholder() {
      return h("Tag label");
    },
    inputMaxLength: sh,
    onAdd: i,
    onChange: a,
  });
}
var fx = w("<audio>"),
  Dg = w("<div>");
function hx(e) {
  const t = Y(se),
    [n] = tc(() => e.word, px);
  let r;
  const o = mx();
  ie(
    pe(
      () => n.error,
      (c) => {
        c && t.core.methods.reportErrorAction()(c);
      }
    )
  );
  const i = () => {
    var u;
    const c = (u = n()) == null ? void 0 : u.voice;
    return c ? yx(c) : void 0;
  };
  function a() {
    e.onClose();
  }
  function s() {
    !r || !i() || ((r.currentTime = 0), r.play());
  }
  return l(an, {
    width: 360,
    onCancel: a,
    get isShown() {
      return e.isShown;
    },
    get title() {
      var c;
      return ((c = n()) == null ? void 0 : c.word) || e.word;
    },
    get titleControls() {
      return l(D, {
        keyed: !0,
        get when() {
          return i();
        },
        children: (c) => [
          l(Z, {
            get class() {
              return o().playVoiceButton;
            },
            variant: "text",
            icon: Ww,
            get title() {
              return h("Play");
            },
            onClick: s,
          }),
          (() => {
            var u = fx(),
              d = r;
            return (
              typeof d == "function" ? tt(d, u) : (r = u), Xe(u, "src", c), u
            );
          })(),
        ],
      });
    },
    hasFooter: !1,
    children: () =>
      (() => {
        var c = Dg();
        return (
          p(
            c,
            l(D, {
              get when() {
                return n.loading;
              },
              get children() {
                var u = Dg();
                return p(u, l(ao, {})), $(() => I(u, o().loading)), u;
              },
            }),
            null
          ),
          p(
            c,
            l(D, {
              keyed: !0,
              get when() {
                return n();
              },
              children: (u) =>
                l(j, {
                  get class() {
                    return o().explanation;
                  },
                  get children() {
                    return u.content || "找不到单词解释。";
                  },
                }),
            }),
            null
          ),
          $(() => I(c, o().content)),
          c
        );
      })(),
  });
}
const mx = q(() => ({
    content: { minWidth: 240 },
    loading: { padding: "1rem", textAlign: "center" },
    explanation: { padding: "0 0 1rem", whiteSpace: "pre-wrap" },
    playVoiceButton: {},
  })),
  yx = (e) => `${uo}/word-voices/${e[0]}/${e}.mp3`;
async function px(e) {
  if (!e) return;
  const t = await window.fetch(`${uo}/dict?word=${encodeURIComponent(e)}`, {
    method: "GET",
    headers: { accept: "application/json" },
  });
  if (t.ok) return await t.json();
  throw new Error(`HTTP Error: ${t.status}`);
}
const vx = `${uo}/text?url=<URL>&keep-classes=1`;
async function bx(e) {
  const t = await fetch(vx.replace("<URL>", encodeURIComponent(e)));
  if (!t.ok) throw new Error(`HTTP Error ${t.status}`);
  const n = await t.json();
  if (!n.content) throw new Error("Unable to extract full content");
  return n.content;
}
var wx = w(
    '<div><iframe referrerpolicy=origin sandbox="allow-same-origin allow-popups allow-downloads allow-forms allow-scripts">'
  ),
  Sx = w(
    "<article><div><div></div><h1></h1><div></div></div><div><div></div><div>"
  ),
  Ex = w("<div class=transient-focus-ring>"),
  Gl = w("<span>"),
  Cx = w("<div>");
function Ax(e) {
  let t, n, r;
  const o = Y(se),
    [i, a] = N(),
    [s, c] = N(!1),
    u = Y(oi),
    d = Y(si),
    g = L(() => {
      var U;
      return ((U = d.data.streamId) == null ? void 0 : U.type) === K.TAG;
    }),
    f = L(() =>
      e.entry.origin.feedId == null
        ? void 0
        : o.subscriptions.methods.getSubscriptionByFeedId(e.entry.origin.feedId)
    ),
    m = L(() => {
      var U, ce;
      return e.entry.origin.feedId &&
        (ce =
          (U = o.feedStates.data.feedStates[e.entry.origin.feedId]) == null
            ? void 0
            : U.isPartial) != null
        ? ce
        : !1;
    }),
    y = L(() => e.entry.url && !D3(e.entry.url) && m()),
    b = L(() => {
      var U, ce;
      return e.entry.origin.feedId &&
        (ce =
          (U = o.feedStates.data.feedStates[e.entry.origin.feedId]) == null
            ? void 0
            : U.supportsEmbedding) != null
        ? ce
        : !0;
    }),
    v = L(() => {
      const U = o.preferences.methods.getGlobalPreference("autoLoadWebpageText")
          ? _e.AUTO
          : _e.FEED_TEXT,
        ce = f();
      if (ce) {
        const Ne = o.preferences.methods.getSubscriptionStreamPreferences(
          { type: K.SUBSCRIPTION, id: ce.id },
          "articleViewType"
        );
        if (Ne !== _e.AUTO) return Ne;
      }
      return U;
    }),
    [S, A] = N(_e.FEED_TEXT),
    [k, T] = N(!1),
    [E, P] = N(),
    [M, x] = N(!1),
    _ = () => e.entry.url,
    [R, z] = N(),
    [J, ne] = Au(!1),
    [G, Q] = N(!1),
    ye = Y(Nu),
    B = o.tags.methods.getSystemTag(co.READ_LATER),
    le = () => e.entry.tagIds.includes(B.id),
    Se = () => e.entry.tagIds.some((U) => U !== B.id),
    Ie = bE(),
    ae = vE(),
    [Ce, we] = pu(),
    [te] = Ch(),
    [be] = kh(),
    [fe] = Sh(),
    re = Ix(),
    Be = () => d.methods.getActiveEntryIndex() > 0,
    Ke = () => {
      var U, ce;
      return (
        d.methods.getActiveEntryIndex() <
        ((ce = (U = d.data.entryIds) == null ? void 0 : U.length) != null
          ? ce
          : 0) -
          1
      );
    };
  a5(
    () => e.entry.id,
    () => e.entry.title || e.entry.summary,
    () => t
  ),
    u5(e.entry.id, () => t);
  const Mt = kx(e.entry.id, () => t),
    C = fs(() => t),
    Vn = () => {
      const U = C();
      return U && U.width > 480;
    },
    [rr] = tc(
      () => e.entry,
      async (U) => {
        const ce = d.data.streamId;
        if (!ce) return "";
        try {
          return (await zI($n(ce), U.id)) || U.summary || h("(No content)");
        } catch (Ne) {
          return h("Error: %s", Ne);
        }
      }
    ),
    [ln] = tc(
      () => {
        var U;
        return (
          S() === _e.WEBPAGE_TEXT && ((U = e.entry.url) != null ? U : null)
        );
      },
      async (U) => {
        let ce;
        try {
          ce = await bx(U);
        } catch (Ne) {
          o.core.methods.reportErrorAction(h("Load full content failed."))(Ne),
            In();
          return;
        }
        return ce;
      }
    ),
    In = () => {
      A(_e.FEED_TEXT), T(!1);
    },
    or = () => {
      A(_e.WEBPAGE_TEXT), T(!1);
    };
  let xn;
  const kn = () => {
      A(_e.WEBPAGE),
        T(!0),
        xn != null && (window.clearTimeout(xn), (xn = void 0)),
        (xn = window.setTimeout(() => {
          T(!1);
        }, 7e3));
    },
    Pr = () => {
      S() === _e.WEBPAGE_TEXT ? In() : or();
    },
    ir = () => {
      S() === _e.WEBPAGE ? In() : kn();
    },
    Mr = () => {
      g() ||
        d.methods
          .markEntriesAsReadAction({ entryIds: [e.entry.id] })
          .catch(o.core.methods.reportErrorAction());
    },
    $r = () => {
      g() ||
        ($o(e.entry) &&
          d.methods
            .markEntryAsUnreadAction(e.entry.id)
            .catch(o.core.methods.reportErrorAction()));
    },
    cn = (U) => {
      g() ||
        (e.entry.status === Ge.READ
          ? $o(e.entry) &&
            d.methods
              .markEntryAsUnreadAction(e.entry.id)
              .then(() => {
                U && o.core.methods.notifySuccess(h("Marked as unread"));
              })
              .catch(o.core.methods.reportErrorAction())
          : d.methods
              .markEntriesAsReadAction({ entryIds: [e.entry.id] })
              .then(() => {
                U && o.core.methods.notifySuccess(h("Marked as read"));
              })
              .catch(o.core.methods.reportErrorAction()));
    },
    ar = () => {
      cn(!0);
    },
    Tn = () => {
      e.entry.url && window.open(e.entry.url, "_blank");
    },
    sr = () => {
      ye.toggleFullscreen();
    },
    ht = () => {
      Ke() ? ye.openNextEntry(!1) : c(!0);
    },
    go = () => {
      Be()
        ? ye.openNextEntry(!0)
        : o.core.methods.notifyInfo(h("No more articles"));
    },
    lr = () => {
      ye.openNextFeed() && c(!1);
    },
    Rr = () => {
      navigator.share &&
        navigator
          .share({
            title: e.entry.title,
            text: e.entry.title,
            url: e.entry.url,
          })
          .catch((U) => {
            console.log("Share error", U);
          });
    },
    fo = () => {
      const U = Or();
      U &&
        (o.core.methods.notifyInfo(h("Sending eBook…")),
        Le("sendEntryAsEbook", { entry: e.entry, content: U.innerHTML })
          .then(() => {
            o.core.methods.clearNotificationMutation(), Q(!0);
          })
          .catch(o.core.methods.reportErrorAction()));
    },
    Wn = () => {
      u.toggleSidebar(!1),
        t.focus(),
        t.hasAttribute(Pi) && (t.removeAttribute(Pi), t.offsetWidth),
        t.setAttribute(Pi, "1");
    },
    Dr = () => {
      t.removeAttribute(Pi);
    },
    V = (U) =>
      U.length > 1 && U.length < 50 && /^([\w\s]+)$/i.test(U) ? (P(U), !0) : !1,
    de = () => {
      E() && x(!0);
    },
    $e = () => {
      var U;
      (U = document.getSelection()) == null || U.removeAllRanges();
    };
  let Ze;
  Qr(
    "selectionchange",
    () => {
      Ze && (window.clearTimeout(Ze), (Ze = void 0));
      const U = document.getSelection();
      if ((U == null ? void 0 : U.rangeCount) === 1) {
        const ce = U.getRangeAt(0);
        if (!ce.collapsed) {
          const Ne = ce.toString().trim();
          if (Ne && V(Ne)) {
            P(Ne);
            return;
          }
        }
      }
      Ze = window.setTimeout(() => {
        M() || P(void 0);
      }, 300);
    },
    () => document
  );
  const $t = () => {
      le()
        ? d.methods
            .removeTagFromEntryAction({ entryId: e.entry.id, tagId: B.id })
            .catch(o.core.methods.reportErrorAction())
        : d.methods
            .addTagToEntryAction({ entryId: e.entry.id, tagId: B.id })
            .catch(o.core.methods.reportErrorAction());
    },
    _r = () => {
      e.entry.url
        ? navigator.clipboard &&
          navigator.clipboard
            .writeText(e.entry.url)
            .catch(o.core.methods.reportErrorAction())
        : o.core.methods.notifyInfo(h("The article has no link"));
    },
    li = (U) => {
      const ce = Ce() * te(),
        Ne = 3,
        Ye = Math.min(ce * Ne, t.clientHeight / 4),
        yt = U === "up" ? -Ye : Ye;
      vc(t, yt, { duration: Math.min(250, Ne * 30) });
    };
  let cr;
  const ur = (U, ce = !1) => {
      ce = !1;
      const Ne = 48,
        Ye = t,
        yt = t.clientHeight - je - Ne,
        pt = U === "up" ? -yt : ce ? F3(t, je, yt) : yt;
      U === "down" &&
        (cr && (clearTimeout(cr), (cr = void 0)),
        (r.style.transition = ""),
        (r.style.top = "0px"),
        (r.style.top = `${Math.min(
          Ye.scrollTop + Ye.clientHeight,
          Ye.scrollHeight - r.offsetHeight / 2
        )}px`),
        (r.style.opacity = "1"),
        (cr = setTimeout(() => {
          (r.style.transition = "opacity 250ms ease-in"),
            (r.style.opacity = "0"),
            (r.style.top = "0px");
        }, 1500))),
        vc(Ye, pt, {
          duration: 250,
          onFinished() {
            Ye.scrollBy({ top: U === "up" ? -1 : 1, behavior: "smooth" });
          },
        });
    },
    ci = () => {
      Jr.emit("focusEntryList");
    },
    ui = () => {
      Jr.emit("focusSidebar");
    };
  let ho = !1;
  const la = () => {
    ho = Ml();
  };
  function mo() {
    e.asColumn || ih(), e.onClose();
  }
  function di() {
    var U;
    (U = e.onViewSwipeRightEnd) == null || U.call(e), mo();
  }
  const ca = (U) => {
      let ce = !1;
      if (
        U.target &&
        U.target instanceof HTMLImageElement &&
        U.target.clientWidth > 120 &&
        U.target.clientHeight > 32 &&
        U.target.classList.contains("user-image")
      ) {
        const Ne = !be() || xx(U);
        if (
          (U.target.closest("a[href]") instanceof HTMLAnchorElement &&
            (U.preventDefault(), (ce = !0)),
          Ne)
        ) {
          mi({
            src: U.target.src,
            srcset: U.target.srcset,
            sizes: U.target.sizes,
          });
          return;
        }
      }
      be() &&
        U.target &&
        U.target instanceof Element &&
        (ce ||
          !U.target.closest(
            "a, video, audio, button, input, textarea, summary, object"
          )) &&
        gi();
    },
    gi = () => {
      !ho && !Ml() && ur("down", !0);
    },
    fi = () => {
      T(!1);
    },
    ua = () => {
      T(!1);
    },
    hi = (U) => {
      const ce = U.target;
      if (
        ce.tagName === "PRE" ||
        ce.classList.contains("article-table-wrapper")
      )
        return !1;
      ci();
    },
    mi = (U) => {
      z(U);
    },
    da = () => {
      z(void 0);
    },
    yi = () =>
      S() === _e.FEED_TEXT
        ? rr.loading
        : S() === _e.WEBPAGE_TEXT
        ? ln.loading
        : S() === _e.WEBPAGE
        ? k()
        : !1,
    Or = L(() => {
      const U =
        S() === _e.FEED_TEXT
          ? rr()
          : S() === _e.WEBPAGE_TEXT
          ? ln() || rr()
          : void 0;
      return U
        ? M3(_(), U, e.entry.thumbnail, { imageLazyLoading: fe() })
        : void 0;
    });
  Ou(() => t, [() => e.entry.id]),
    ti(
      () => t,
      [
        [["f", "u"], sr],
        ["shift+H", ui],
        [["h"], ci],
        [["ArrowLeft"], hi],
        ["l", Wn],
        ["n", () => ye.openNextEntry(!1)],
        ["p", () => ye.openNextEntry(!0)],
        [["j"], () => li("down")],
        [["k"], () => li("up")],
        [["PageUp", "shift+Space"], () => ur("up")],
        [["Space"], () => ur("down", !0)],
        [["PageDown"], () => ur("down")],
        ["v", Tn],
        ["i", Pr],
        ["y", $t],
        [",", ar],
        ["shift+C", _r],
        ["=", () => as([Ce, we], 1)],
        ["-", () => as([Ce, we], -1)],
        ["g", lr],
      ]
    ),
    xu("focusArticleView", Wn),
    Dv(() => e.entry.url);
  const ga = fs(i);
  ie(
    pe(ga, () => {
      const U = i();
      if (!U) return;
      const ce = window
        .getComputedStyle(U, null)
        .getPropertyValue("padding-left");
      U.style.setProperty("--content-padding", ce);
    })
  ),
    Lt(() => {
      v() === _e.WEBPAGE_TEXT || (v() === _e.AUTO && y())
        ? or()
        : v() === _e.WEBPAGE && kn();
    }),
    Lt(() => {
      (t.style.pointerEvents = "none"),
        setTimeout(() => {
          t.style.pointerEvents = "";
        }, 300),
        t.focus({ preventScroll: !0 });
    }),
    Lt(() => {
      [Dn.FLOAT, Dn.FLOOR].includes(u.getSidebarType()) && u.toggleSidebar(!1);
    });
  const pi = () =>
      l(Vo, {
        children: (U) => {
          if (U === "/")
            return [
              l(D, {
                get when() {
                  return !Vn();
                },
                get children() {
                  return l(Wo, {
                    path: "/tags/",
                    get text() {
                      return h("Tags");
                    },
                    get icon() {
                      return Se() ? Md : ns;
                    },
                  });
                },
              }),
              l(D, {
                get when() {
                  return !Vn();
                },
                get children() {
                  return l(D, {
                    get when() {
                      return !g();
                    },
                    get children() {
                      return l(D, {
                        get when() {
                          return e.entry.status === Ge.READ;
                        },
                        get fallback() {
                          return l(Ee, {
                            get text() {
                              return h("Mark as read");
                            },
                            icon: qi,
                            onClick: Mr,
                          });
                        },
                        get children() {
                          return l(Ee, {
                            get text() {
                              return h("Mark as unread");
                            },
                            get disabled() {
                              return !$o(e.entry);
                            },
                            icon: Yi,
                            onClick: $r,
                          });
                        },
                      });
                    },
                  });
                },
              }),
              l(D, {
                get when() {
                  return navigator.share;
                },
                get children() {
                  return l(Ee, {
                    get text() {
                      return h("Share");
                    },
                    icon: aS,
                    get disabled() {
                      return !e.entry.url;
                    },
                    onClick: Rr,
                  });
                },
              }),
              l(Ee, {
                get text() {
                  return h("Send as eBook");
                },
                icon: gu,
                get disabled() {
                  return !Or();
                },
                onClick: fo,
              }),
              l(tn, {}),
              l(Ee, {
                get text() {
                  return h("Open in new tab");
                },
                icon: eh,
                get disabled() {
                  return !e.entry.url;
                },
                onClick: Tn,
              }),
              l(Ee, {
                type: "checkbox",
                get text() {
                  return h("Inline webpage view");
                },
                get checked() {
                  return S() === _e.WEBPAGE;
                },
                icon: eS,
                get disabled() {
                  return !e.entry.url || !b();
                },
                onClick: ir,
              }),
              l(D, {
                get when() {
                  return ye.getCanFullscreen();
                },
                get children() {
                  return l(Ee, {
                    type: "checkbox",
                    get text() {
                      return h("Fullscreen");
                    },
                    get icon() {
                      return ye.getIsFullscreen() ? lS : sS;
                    },
                    get checked() {
                      return ye.getIsFullscreen();
                    },
                    get disabled() {
                      return !ye.getCanFullscreen();
                    },
                    onClick: sr,
                  });
                },
              }),
              l(Wo, {
                icon: Iw,
                get text() {
                  return h("View options");
                },
                path: "/view-options/",
              }),
              l(tn, {}),
              l(Ee, {
                get text() {
                  return h("Feed properties…");
                },
                onClick: () => {
                  ne(!0);
                },
              }),
            ];
          if (U === "/tags/")
            return l(ri, {
              get title() {
                return h("Tags");
              },
              get children() {
                return l(Rg, {
                  get entry() {
                    return e.entry;
                  },
                  asSubMenu: !0,
                });
              },
            });
          if (U === "/view-options/") return l(H3, {});
          if (U === "/view-options/theme/") return l(tm, {});
          if (U === "/view-options/font-family/") return l(Q3, {});
        },
      }),
    vi = () =>
      l(Vo, {
        children: () =>
          l(Rg, {
            get entry() {
              return e.entry;
            },
          }),
      }),
    fa = () => [
      l(Z, {
        variant: "text",
        color: "neutral",
        get icon() {
          return e.asColumn ? so : os;
        },
        edge: "start",
        onClick: mo,
      }),
      l(Z, {
        variant: "text",
        color: "neutral",
        icon: xw,
        get title() {
          return h("Previous article");
        },
        get disabled() {
          return !Be();
        },
        onClick: () => ye.openNextEntry(!0),
      }),
      l(Z, {
        variant: "text",
        color: "neutral",
        icon: kw,
        get title() {
          return h("Next article");
        },
        get disabled() {
          return !Ke();
        },
        onClick: () => ye.openNextEntry(!1),
      }),
    ],
    bi = () => l(Tr, {}),
    wi = () => [
      l(D, {
        get when() {
          return E();
        },
        get children() {
          return l(Z, {
            variant: "text",
            color: "neutral",
            icon: Vw,
            get title() {
              return h("Dictionary");
            },
            onClick: de,
          });
        },
      }),
      l(Z, {
        variant: "text",
        get color() {
          return S() === _e.WEBPAGE_TEXT ? "primary" : "neutral";
        },
        get icon() {
          return S() === _e.WEBPAGE_TEXT ? Tw : lu;
        },
        get title() {
          return h("Load webpage text");
        },
        get disabled() {
          return !e.entry.url;
        },
        get isLoading() {
          return S() === _e.WEBPAGE_TEXT && ln.loading;
        },
        onClick: Pr,
      }),
      l(Z, {
        variant: "text",
        get color() {
          return le() ? "orange" : "neutral";
        },
        get icon() {
          return le() ? Ec : cu;
        },
        get title() {
          return h("Read Later");
        },
        onClick: $t,
      }),
      l(D, {
        get when() {
          return Vn();
        },
        get children() {
          return l(Go, {
            variant: "text",
            get color() {
              return Se() ? "primary" : "neutral";
            },
            get icon() {
              return Se() ? Md : ns;
            },
            get title() {
              return h("Tags");
            },
            renderDropdown: vi,
          });
        },
      }),
      l(D, {
        get when() {
          return L(() => !!Vn())() && !g();
        },
        get children() {
          return l(Z, {
            variant: "text",
            get title() {
              return L(() => e.entry.status === Ge.READ)()
                ? h("Mark as unread")
                : h("Mark as read");
            },
            get disabled() {
              return !$o(e.entry);
            },
            get icon() {
              return e.entry.status === Ge.READ ? Yi : qi;
            },
            color: "neutral",
            onClick: () => {
              cn(!1);
            },
          });
        },
      }),
      l(Go, {
        variant: "text",
        color: "neutral",
        icon: au,
        edge: "end",
        renderDropdown: pi,
      }),
    ];
  return (
    Kt(() => Yt(`${e.entry.title} - ${e.streamTitle}`)),
    _s({ name: `ArticleView#${e.entry.id}` }),
    l(Lr, {
      ref(U) {
        var ce = t;
        typeof ce == "function" ? ce(U) : (t = U);
      },
      get rootProps() {
        return { tabIndex: -1, onBlur: Dr, [cs]: e5 };
      },
      get class() {
        return H(re().root, e.class);
      },
      renderTopBar: wi,
      renderTitle: bi,
      renderPreTitle: fa,
      elevateAppBar: !0,
      get loading() {
        return yi();
      },
      get children() {
        return [
          l(qo, {
            get children() {
              return [
                l(kt, {
                  get when() {
                    return S() === _e.WEBPAGE;
                  },
                  get children() {
                    var U = wx(),
                      ce = U.firstChild;
                    ce.addEventListener("error", ua),
                      ce.addEventListener("load", fi);
                    var Ne = n;
                    return (
                      typeof Ne == "function" ? tt(Ne, ce) : (n = ce),
                      $(
                        (Ye) => {
                          var yt = re().webViewWrapper,
                            pt = re().webView,
                            un = e.entry.url ? rp(e.entry.url) : "about:blank";
                          return (
                            yt !== Ye.e && I(U, (Ye.e = yt)),
                            pt !== Ye.t && I(ce, (Ye.t = pt)),
                            un !== Ye.a && Xe(ce, "src", (Ye.a = un)),
                            Ye
                          );
                        },
                        { e: void 0, t: void 0, a: void 0 }
                      ),
                      U
                    );
                  },
                }),
                l(kt, {
                  get when() {
                    return S() === _e.FEED_TEXT || S() === _e.WEBPAGE_TEXT;
                  },
                  get children() {
                    return l(Ns, {
                      get class() {
                        return re().articleSwipeArea;
                      },
                      get disabled() {
                        return Ml();
                      },
                      rightActionIcon: Bw,
                      onRightAction: () => ht(),
                      leftActionIcon: os,
                      get onLeftAction() {
                        return e.asColumn ? () => go() : void 0;
                      },
                      viewEl: () => t,
                      get onViewSwipeStart() {
                        return e.onViewSwipeStart;
                      },
                      get onViewSwipeMove() {
                        return e.onViewSwipeMove;
                      },
                      onViewSwipeRightEnd: di,
                      get viewSwipeDisabled() {
                        return e.asColumn;
                      },
                      get onViewSwipeCancel() {
                        return e.onViewSwipeCancel;
                      },
                      get children() {
                        var U = Sx(),
                          ce = U.firstChild,
                          Ne = ce.firstChild,
                          Ye = Ne.nextSibling,
                          yt = Ye.nextSibling,
                          pt = ce.nextSibling,
                          un = pt.firstChild,
                          yo = un.nextSibling;
                        p(
                          Ne,
                          l(D, {
                            get when() {
                              return f();
                            },
                            get fallback() {
                              return (() => {
                                var me = Gl();
                                return (
                                  p(me, () => Gi(e.streamTitle)),
                                  $(() =>
                                    I(
                                      me,
                                      H(
                                        re().origin,
                                        re().originTitle,
                                        re().originPlainText
                                      )
                                    )
                                  ),
                                  me
                                );
                              })();
                            },
                            keyed: !0,
                            children: (me) =>
                              l(Pe, {
                                get class() {
                                  return H(re().origin, re().originLink);
                                },
                                get href() {
                                  return Rh(o, me.id);
                                },
                                color: "inherit",
                                textDecoration: !1,
                                get children() {
                                  return [
                                    (() => {
                                      var et = Gl();
                                      return (
                                        $(
                                          (Zt) => {
                                            var Ln;
                                            var Gn = re().originIcon,
                                              dn = `url(${Vs(
                                                (Ln = me.homePageUrl) != null
                                                  ? Ln
                                                  : me.feedUrl,
                                                48
                                              )})`;
                                            return (
                                              Gn !== Zt.e && I(et, (Zt.e = Gn)),
                                              dn !== Zt.t &&
                                                ((Zt.t = dn) != null
                                                  ? et.style.setProperty(
                                                      "background-image",
                                                      dn
                                                    )
                                                  : et.style.removeProperty(
                                                      "background-image"
                                                    )),
                                              Zt
                                            );
                                          },
                                          { e: void 0, t: void 0 }
                                        ),
                                        et
                                      );
                                    })(),
                                    (() => {
                                      var et = Gl();
                                      return (
                                        p(et, () => Gi(me.title)),
                                        $(() => I(et, re().originTitle)),
                                        et
                                      );
                                    })(),
                                  ];
                                },
                              }),
                          })
                        ),
                          p(
                            Ye,
                            l(D, {
                              get when() {
                                return e.entry.url;
                              },
                              get fallback() {
                                var me;
                                return Ni(
                                  (me = e.entry.title) != null ? me : ""
                                );
                              },
                              keyed: !0,
                              children: (me) =>
                                l(Pe, {
                                  href: me,
                                  color: "inherit",
                                  textDecoration: !1,
                                  openInNew: !0,
                                  openInNewMark: !1,
                                  get children() {
                                    var et;
                                    return Ni(
                                      (et = e.entry.title) != null ? et : ""
                                    );
                                  },
                                }),
                            })
                          ),
                          p(
                            ce,
                            l(D, {
                              get when() {
                                return e.entry.author;
                              },
                              keyed: !0,
                              children: (me) =>
                                (() => {
                                  var et = Cx();
                                  return (
                                    p(et, me),
                                    $(() => I(et, re().metaBottom)),
                                    et
                                  );
                                })(),
                            }),
                            yt
                          ),
                          p(yt, () => BE.format(e.entry.publishedAt)),
                          (pt.$$touchstart = la),
                          (pt.$$click = ca),
                          tt(a, pt),
                          p(
                            pt,
                            l(G3, {
                              get entry() {
                                return e.entry;
                              },
                              filter: (me) =>
                                /^video\/|application\/x-shockwave-flash/.test(
                                  me
                                ),
                            }),
                            un
                          );
                        var po = r;
                        return (
                          typeof po == "function" ? tt(po, un) : (r = un),
                          tt(d3, yo, () => Or()),
                          $(
                            (me) => {
                              var et = H(
                                  re().article,
                                  Mt
                                    ? void 0
                                    : d.data.openActiveEntryDirection ===
                                      Bc.FORWARD
                                    ? St.slideUpIn402d.cssClass
                                    : d.data.openActiveEntryDirection ===
                                      Bc.BACKWARD
                                    ? St.slideDownIn402d.cssClass
                                    : void 0
                                ),
                                Zt = ae().fontFamily,
                                Gn = `${Ce()}px`,
                                dn = te(),
                                Ln = ae().letterSpacing,
                                Si = H(
                                  re().articleHeader,
                                  re().articleContentBlock
                                ),
                                Nr = Ie(),
                                vo = re().overline,
                                Ei = re().title,
                                bo = re().metaBottom,
                                wo = H(
                                  re().articleBody,
                                  re().articleContentBlock
                                ),
                                So = Ie(),
                                Eo = re().scrollIndicator,
                                Co = H(re().articleText);
                              return (
                                et !== me.e && I(U, (me.e = et)),
                                Zt !== me.t &&
                                  ((me.t = Zt) != null
                                    ? U.style.setProperty("font-family", Zt)
                                    : U.style.removeProperty("font-family")),
                                Gn !== me.a &&
                                  ((me.a = Gn) != null
                                    ? U.style.setProperty("font-size", Gn)
                                    : U.style.removeProperty("font-size")),
                                dn !== me.o &&
                                  ((me.o = dn) != null
                                    ? U.style.setProperty("line-height", dn)
                                    : U.style.removeProperty("line-height")),
                                Ln !== me.i &&
                                  ((me.i = Ln) != null
                                    ? U.style.setProperty("letter-spacing", Ln)
                                    : U.style.removeProperty("letter-spacing")),
                                Si !== me.n && I(ce, (me.n = Si)),
                                Nr !== me.s &&
                                  ((me.s = Nr) != null
                                    ? ce.style.setProperty("max-width", Nr)
                                    : ce.style.removeProperty("max-width")),
                                vo !== me.h && I(Ne, (me.h = vo)),
                                Ei !== me.r && I(Ye, (me.r = Ei)),
                                bo !== me.d && I(yt, (me.d = bo)),
                                wo !== me.l && I(pt, (me.l = wo)),
                                So !== me.u &&
                                  ((me.u = So) != null
                                    ? pt.style.setProperty("max-width", So)
                                    : pt.style.removeProperty("max-width")),
                                Eo !== me.c && I(un, (me.c = Eo)),
                                Co !== me.w && I(yo, (me.w = Co)),
                                me
                              );
                            },
                            {
                              e: void 0,
                              t: void 0,
                              a: void 0,
                              o: void 0,
                              i: void 0,
                              n: void 0,
                              s: void 0,
                              h: void 0,
                              r: void 0,
                              d: void 0,
                              l: void 0,
                              u: void 0,
                              c: void 0,
                              w: void 0,
                            }
                          ),
                          U
                        );
                      },
                    });
                  },
                }),
              ];
            },
          }),
          Ex(),
          l(Jt, {
            get on() {
              return M();
            },
            get children() {
              return l(hx, {
                get isShown() {
                  return M();
                },
                get word() {
                  return E() || "";
                },
                onClose: () => {
                  x(!1), P(void 0), $e();
                },
              });
            },
          }),
          l(D, {
            get when() {
              return R();
            },
            keyed: !0,
            children: (U) => l(tx, { imageInfo: U, onClose: da }),
          }),
          l(Jt, {
            get on() {
              return J();
            },
            get children() {
              return l(D, {
                keyed: !0,
                get when() {
                  return f();
                },
                children: (U) =>
                  l(Lm, {
                    subscription: U,
                    get isShown() {
                      return J();
                    },
                    toggle: ne,
                  }),
              });
            },
          }),
          l(ss, {
            get open() {
              return s();
            },
            get actionText() {
              return h("Next feed");
            },
            onClose: () => {
              c(!1);
            },
            onAction: () => {
              lr();
            },
            duration: "medium",
            get children() {
              return h("No more articles");
            },
          }),
          l(ss, {
            get open() {
              return G();
            },
            get actionText() {
              return h("Download");
            },
            onClose: () => {
              Q(!1);
            },
            onAction: () => {
              var U;
              window.open(
                (U = o.core.data.currentUser) == null
                  ? void 0
                  : U.ebookNetDiskUrl,
                "_blank"
              );
            },
            duration: "long",
            get children() {
              return h("Ebook sent");
            },
          }),
        ];
      },
    })
  );
}
Ft(`
@keyframes WebView-spinnerRotate {
  40% { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}
`);
const Ix = q((e) => ({
  root: { ...Wb(e) },
  article: {
    wordBreak: "break-word",
    overflowWrap: "break-word",
    cursor: "auto",
    marginTop: "1rem",
  },
  articleSwipeArea: { minHeight: `calc(100% - ${je}px - 2px - 1rem - 8px)` },
  articleContentBlock: {
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0 clamp(1.25rem, 5%, 3rem)",
    boxSizing: "border-box",
  },
  articleHeader: { marginBottom: "1.5em" },
  articleBody: {},
  articleText: {
    paddingBottom: "5rem",
    " img": { maxWidth: "100%", height: "auto" },
    "& h1 img, & h2 img, & h3 img, & h4 img, & h5 img, & h6 img": {
      height: "1.75em",
      verticalAlign: "middle",
    },
    " img.u-avatar": { maxWidth: "4em" },
    " .big-image-wrapper": {
      marginLeft: "calc(0px - var(--content-padding, 0px))",
      marginRight: 0,
      boxSizing: "border-box",
      width: "calc(100% + var(--content-padding, 0px) * 2)",
      " .big-image": {
        width: "calc(var(--natural-width) * 2)",
        maxWidth: "100%",
        display: "block",
        margin: "0 auto",
      },
    },
    " video": { width: "100%", height: "auto" },
    " iframe": {
      width: "100%",
      height: 480,
      border: "none",
      [vr]: { height: 240 },
    },
    " code": { fontFamily: "monospace" },
    " pre": {
      padding: "0.75em",
      overflow: "auto",
      background: e.surface(1),
      fontSize: "0.875em",
      lineHeight: 1.5,
      whiteSpace: "pre",
      tabSize: 2,
      fontFamily: "monospace",
      "& .u-keyword, & .u-selector, & .u-tag, & .u-rule, & .u-hljs-keyword, & .u-hljs-selector-class":
        { color: e.color.blue },
      "& .u-comment, & .u-hljs-comment": {
        color: e.color.onSurfaceHint,
        fontStyle: "italic",
      },
      "& .u-string, & .u-attr-value, & .u-hljs-string": {
        color: e.color.orange,
      },
      "& .u-number, & .u-constant": { color: e.color.purple },
      "& .u-typename, & .u-property, & .u-attr, & .u-attr-name, & .u-hljs-attr, & .u-hljs-attribute":
        { color: e.color.teal },
    },
    " .u-highlight": {
      background: e.surface(1),
      " tr": { height: "auto" },
      " td": { padding: 0, verticalAlign: "top", " pre": { margin: 0 } },
      "& td.u-gutter, & td.u-rouge-gutter": {
        minWidth: "2rem",
        width: "2rem",
        padding: 0,
        color: e.color.onSurfaceHint,
      },
    },
    " h1": {
      margin: "2em 0 1em",
      lineHeight: 1.2,
      fontSize: "1.5em",
      fontWeight: 700,
    },
    " h2": {
      margin: "2em 0 1em",
      lineHeight: 1.25,
      fontSize: "1.375em",
      fontWeight: 700,
    },
    " h3": {
      margin: "2em 0 1em",
      lineHeight: 1.25,
      fontSize: "1.25em",
      fontWeight: 700,
    },
    " h4": {
      margin: "2em 0 1em",
      lineHeight: 1.375,
      fontSize: "1.125em",
      fontWeight: 700,
    },
    " h5": {
      margin: "2em 0 1em",
      lineHeight: 1.375,
      fontSize: "1em",
      fontWeight: 700,
    },
    " h6": {
      margin: "2em 0 1em",
      lineHeight: 1.375,
      fontSize: "1em",
      fontWeight: 700,
    },
    " h1+h1": { marginTop: "1em" },
    " h2+h2": { marginTop: "1em" },
    " h3+h3": { marginTop: "1em" },
    " h4+h4": { marginTop: "1em" },
    " h5+h5": { marginTop: "1em" },
    " h6+h6": { marginTop: "1em" },
    " h1:first-child": { marginTop: "1rem" },
    " h2:first-child": { marginTop: "1rem" },
    " h3:first-child": { marginTop: "1rem" },
    " h4:first-child": { marginTop: "1rem" },
    " h5:first-child": { marginTop: "1rem" },
    " h6:first-child": { marginTop: "1rem" },
    " ul": { paddingLeft: "2em" },
    " ol": { paddingLeft: "2em" },
    " figure": { margin: "1rem 0" },
    " figcaption": {
      margin: "0.5rem 1.5rem 0",
      color: e.color.onSurfaceVariant,
      textAlign: "center",
      fontSize: "0.75em",
      fontStyle: "italic",
    },
    " a:link": {
      color: e.color.primary,
      textDecorationLine: "none",
      textDecorationStyle: "solid",
      textDecorationColor: e.color.primary,
    },
    " a:visited": {
      color: e.color.primary,
      textDecorationColor: e.color.onSurface,
    },
    " a:hover": {
      color: e.color.primary,
      textDecorationLine: "underline",
      textDecorationColor: e.color.primary,
    },
    " a:active": {
      color: e.color.primary,
      textDecorationLine: "underline",
      textDecorationColor: e.color.primary,
    },
    " blockquote": {
      margin: "1.5rem 0",
      paddingLeft: "0.75rem",
      borderLeft: `0.3125em solid ${e.color.surfaceVariant}`,
      color: e.color.onSurfaceVariant,
    },
    " .article-table-wrapper": { width: "100%", overflow: "auto" },
    " table": {
      border: "none",
      borderCollapse: "collapse",
      margin: 0,
      minWidth: 512,
      width: "100%",
    },
    " tr": {
      borderBottom: `1px solid ${e.color.outlineVariant}`,
      borderTop: 0,
      height: "3em",
    },
    " tr:last-of-type": { borderBottom: 0 },
    " th": {
      minWidth: "8em",
      textAlign: "left",
      fontSize: "0.875em",
      fontWeight: 700,
      lineHeight: "1.5em",
      paddingRight: "1.5em",
      paddingLeft: 0,
      border: "none",
      verticalAlign: "middle",
    },
    " td": {
      minWidth: "8em",
      border: "none",
      textAlign: "left",
      lineHeight: 1.5,
      padding: "1em 1.5em 1em 0em",
    },
    " td.article-content__code-cell": { minWidth: "auto" },
    " hr": {
      margin: "2em auto",
      width: "70%",
      border: 0,
      height: 2,
      background: e.color.outlineVariant,
    },
  },
  overline: {
    marginBottom: "0.25rem",
    display: "flex",
    alignItems: "center",
    lineHeight: 1.2,
    fontSize: "0.875em",
    color: e.color.onSurfaceVariant,
  },
  origin: { overflow: "hidden" },
  originLink: { display: "flex", alignItems: "center" },
  originIcon: {
    ...Yf,
    flexShrink: 0,
    marginRight: "0.375em",
    width: 24,
    height: 24,
    borderRadius: e.sharp.extraSmall,
  },
  originPlainText: { color: e.color.onSurfaceVariant },
  originTitle: { ...yn, fontWeight: 400 },
  title: {
    margin: "0.25rem 0",
    lineHeight: 1.2,
    fontSize: "1.75em",
    [vr]: { fontSize: "1.5em" },
  },
  metaBottom: {
    margin: "0.25rem 0",
    color: e.color.onSurfaceHint,
    fontSize: "0.75em",
    lineHeight: 1.2,
  },
  webViewWrapper: { ...En, top: je },
  webView: {
    position: "absolute",
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
  },
  selectionPopupButton: { margin: 0, borderRadius: 0 },
  scrollIndicator: {
    position: "absolute",
    border: "8px solid transparent",
    borderLeft: `10px solid ${
      pc
        ? e.type === pr.LIGHT
          ? xt(e.palette.green.tone(40))
          : e.color.onSurface
        : "aqua"
    } !important`,
    mixBlendMode: pc ? "normal" : "difference",
    marginLeft: -16,
    marginTop: -8,
    opacity: 0,
  },
}));
function xx(e) {
  if (!e.target || !(e.target instanceof HTMLImageElement)) return;
  const t = e.clientX,
    n = e.clientY,
    r = e.target.getBoundingClientRect(),
    o = r.x + r.width * 0.8,
    i = r.x + r.width;
  return t >= o && t <= i && n >= r.y && n <= r.y + r.height;
}
let Br, Ii;
function kx(e, t) {
  if (navigator.maxTouchPoints <= 1) return;
  const n =
    (Br == null ? void 0 : Br.entryId) === e
      ? Br.scrollTop
      : (Ii == null ? void 0 : Ii.entryId) === e
      ? Ii.scrollTop
      : 0;
  return (
    Lt(() => {
      const r = t();
      r && n && Hf(r, n);
    }),
    De(() => {
      (Ii = Br), (Br = void 0);
      const r = t();
      r && (Br = { entryId: e, scrollTop: r.scrollTop });
    }),
    !!n
  );
}
Bn(["click", "touchstart"]);
var Tx = w("<div>");
function _g(e) {
  let t;
  const n = Y(se),
    r = Y(Nu),
    o = Lx(),
    { useHasNavBackUaVisualTransition: i } = ah(),
    { isMobileViewportSize: a } = Uo(),
    s = Y(si);
  ie(
    pe(
      [() => s.data.entryIds, () => e.entryId, () => s.data.activeEntryId],
      ([b, v, S]) => {
        b &&
          (v
            ? S !== v &&
              s.methods
                .loadActiveEntryAction({ entryId: v })
                .catch(
                  n.core.methods.reportErrorAction(
                    h("Failed to load article content.")
                  )
                )
            : s.methods.clearActiveEntryAction());
      }
    )
  ),
    De(() => {
      s.methods.clearActiveEntryAction();
    });
  const c = () => {
      delete t.dataset[Og];
    },
    [u, d] = N(!1),
    g = (b) => {
      d(!1), t.style.setProperty(es, `${Math.max(0, b)}px`);
    },
    f = () => {
      (t.dataset[Og] = "true"), t.style.setProperty(es, "0");
    },
    m = () => {
      d(!0);
    },
    y = St.usePageSlideIn();
  return l(Zr, {
    children: (b) =>
      l(c3, {
        get enterActiveClass() {
          return e.asColumn ? St.slideUpIn20.cssClass : y.cssClass;
        },
        get exitActiveClass() {
          return L(() => !!e.asColumn)()
            ? St.slideDownOut20.cssClass
            : L(() => !!i())()
            ? void 0
            : L(() => !!u())()
            ? St.pageSwipeSlideRightOutFull.cssClass
            : a()
            ? St.pageSlideRightOutFull.cssClass
            : St.slideRightOut40.cssClass;
        },
        onExit: xm,
        get children() {
          return l(D, {
            get when() {
              return e.entryId;
            },
            get children() {
              var v = Tx(),
                S = t;
              return (
                typeof S == "function" ? tt(S, v) : (t = v),
                b != null
                  ? v.style.setProperty("z-index", b)
                  : v.style.removeProperty("z-index"),
                p(
                  v,
                  l(D, {
                    get when() {
                      return s.methods.getActiveEntry();
                    },
                    keyed: !0,
                    children: (A) =>
                      l(Ax, {
                        get class() {
                          return o().content;
                        },
                        get streamTitle() {
                          return r.title();
                        },
                        entry: A,
                        get asColumn() {
                          return e.asColumn;
                        },
                        get onClose() {
                          return e.onClose;
                        },
                        onViewSwipeStart: c,
                        onViewSwipeMove: g,
                        onViewSwipeRightEnd: m,
                        onViewSwipeCancel: f,
                      }),
                  })
                ),
                $(() =>
                  I(
                    v,
                    H(
                      "article-page",
                      o().root,
                      Iu() &&
                        r.getEntryListLayout() !== ze.COLUMN &&
                        o().rootAboveFloor,
                      r.getIsFullscreen() && o().fullscreen
                    )
                  )
                ),
                v
              );
            },
          });
        },
      }),
  });
}
const Mm = "data-view-swipe-cancel",
  Og = Af(Mm),
  Lx = q((e) => ({
    root: {
      ...En,
      background: e.color.surface,
      transform: `translateX(var(${es}, 0px))`,
      [`[${Mm}]`]: { transition: `transform ${jr}ms ease-out` },
    },
    rootAboveFloor: { boxShadow: e.swipeableViewShadow },
    fullscreen: { position: "fixed" },
    content: { ...En, overflow: "hidden auto", scrollbarGutter: "stable" },
  }));
function Px(e, t, n, r) {
  if (typeof IntersectionObserver != "function") return;
  const o = (a) => {
    n(a[0]);
  };
  let i;
  ie(
    pe(e, (a, s) => {
      i || (i = new IntersectionObserver(o, { root: t(), ...r })),
        s && i.unobserve(s),
        a && i.observe(a);
    })
  ),
    De(() => {
      i == null || i.disconnect();
    });
}
var ko = w("<div>"),
  Mx = w("<p>"),
  xi = w("<span>"),
  Ng = w("<span><span>");
const $m = "data-stream-item-entry-id",
  $x = "streamItemEntryId",
  Rm = 130,
  Wc = 78;
var za = ((e) => (
  (e[(e.SINGLE_LINE = 0)] = "SINGLE_LINE"),
  (e[(e.MAGAZINE = 1)] = "MAGAZINE"),
  e
))(za || {});
function Rx(e) {
  const t = Y(se),
    n = Pt(),
    r = Dx(),
    o = Y(si),
    [i] = vu();
  let a;
  const s = () => e.entry.id === o.data.activeEntryId,
    c = () => e.streamId.type === K.TAG,
    u = () => e.entry.tagIds.includes(t.tags.methods.getReadLaterTagId()),
    d = () =>
      (e.entry.title && e.summaryLines > 0 && e.entry.summary) || void 0,
    g = (x) => {
      x.detail.shiftKey &&
      !x.detail.altKey &&
      !x.detail.ctrlKey &&
      !x.detail.metaKey
        ? f()
        : e.onOpenEntry(e.entry, !1);
    },
    f = () => {
      e.entry.url && window.open(e.entry.url, "_blank") && m();
    },
    m = () => {
      c() ||
        (e.entry.status === Ge.UNREAD &&
          o.methods
            .markEntriesAsReadAction({ entryIds: [e.entry.id] })
            .catch(t.core.methods.reportErrorAction()));
    },
    y = () => {
      c() ||
        (e.entry.status === Ge.READ &&
          $o(e.entry) &&
          o.methods
            .markEntryAsUnreadAction(e.entry.id)
            .catch(t.core.methods.reportErrorAction()));
    },
    b = () => {
      const x = t.tags.data.tags[e.streamId.id];
      x &&
        o.methods
          .removeTagFromEntryAction({ entryId: e.entry.id, tagId: x.id })
          .catch(t.core.methods.reportErrorAction());
    },
    v = () => {
      c() || (e.entry.status === Ge.READ ? y() : m());
    },
    S = (x) => {
      const _ = t.tags.methods.getSystemTag(co.READ_LATER);
      x
        ? o.methods
            .addTagToEntryAction({ entryId: e.entry.id, tagId: _.id })
            .catch(t.core.methods.reportErrorAction())
        : o.methods
            .removeTagFromEntryAction({ entryId: e.entry.id, tagId: _.id })
            .catch(t.core.methods.reportErrorAction());
    };
  ti(
    () => a,
    [
      [
        ["Enter", "o"],
        () => {
          e.onOpenEntry(e.entry, !0);
        },
      ],
      ["v", f],
      [",", v],
    ]
  );
  const A = e.entry.thumbnail
      ? i4(e.entry.thumbnail, { width: Rm * 2, height: Wc * 2, quality: 50 })
      : void 0,
    k = (x) =>
      (() => {
        var _ = ko();
        return (
          Je(
            _,
            F(
              {
                get class() {
                  return H(
                    r().title,
                    x.baseClass,
                    e.entry.status === Ge.READ ? x.readClass : x.unreadClass
                  );
                },
              },
              () => ({ [$m]: e.entry.id })
            ),
            !1,
            !0
          ),
          p(_, () => x.children, null),
          p(
            _,
            (() => {
              var R = L(() => !!e.entry.title);
              return () =>
                R()
                  ? Ni(e.entry.title)
                  : (() => {
                      var z = L(() => !!e.entry.summary);
                      return () =>
                        z() ? Ni(e.entry.summary) : h("(No title)");
                    })();
            })(),
            null
          ),
          _
        );
      })(),
    T = (x) =>
      l(D, {
        keyed: !0,
        get when() {
          return d();
        },
        children: (_) =>
          (() => {
            var R = Mx();
            return p(R, () => Ni(_)), $(() => I(R, H(r().summary, x))), R;
          })(),
      }),
    E = (x, _ = "short") =>
      (() => {
        var R = xi();
        return (
          p(
            R,
            l(jE, {
              get to() {
                return e.entry.crawledAt;
              },
              format: _,
            })
          ),
          $(() => I(R, H(r().time, x))),
          R
        );
      })(),
    P = () => [
      (() => {
        var x = xi();
        return (
          p(
            x,
            l(Z, {
              variant: "text",
              size: "small",
              get icon() {
                return u() ? Ec : cu;
              },
              get color() {
                return u() ? "orange" : "neutral";
              },
              onClick: () => S(!u()),
            })
          ),
          $(() => I(x, r().singleLineAction)),
          x
        );
      })(),
      l(D, {
        get when() {
          return e.streamId.type !== K.SUBSCRIPTION;
        },
        get children() {
          var x = ko();
          return (
            p(
              x,
              l(D, {
                keyed: !0,
                get when() {
                  return e.subscription;
                },
                get fallback() {
                  return l(D, {
                    keyed: !0,
                    get when() {
                      return e.subscriptionTitle;
                    },
                    children: (_) => _,
                  });
                },
                children: (_) =>
                  l(
                    Pe,
                    F(
                      {
                        get class() {
                          return r().singleLineOriginLink;
                        },
                        color: "inherit",
                        textDecoration: !1,
                        get href() {
                          return Vt(t, { type: K.SUBSCRIPTION, id: _.id });
                        },
                      },
                      { [Rc]: !0 },
                      {
                        get children() {
                          return _.title;
                        },
                      }
                    )
                  ),
              })
            ),
            $(() =>
              I(
                x,
                H(
                  r().singleLineOrigin,
                  e.entry.status === Ge.READ && r().singleLineOriginRead
                )
              )
            ),
            x
          );
        },
      }),
      (() => {
        var x = ko();
        return (
          p(
            x,
            l(k, {
              get baseClass() {
                return H(
                  r().singleLineTitle,
                  d() ? "" : r().singleLineTitleNoSummary
                );
              },
              get readClass() {
                return r().singleLineTitleRead;
              },
              get unreadClass() {
                return r().singleLineTitleUnread;
              },
            }),
            null
          ),
          p(x, () => T(r().singleLineSummary), null),
          p(x, () => E(r().singleLineTime), null),
          $(() => I(x, r().singleLineText)),
          x
        );
      })(),
    ],
    M = () => [
      l(D, {
        get when() {
          return e.streamId.type !== K.SUBSCRIPTION;
        },
        get children() {
          var x = ko();
          return (
            p(
              x,
              l(D, {
                keyed: !0,
                get when() {
                  return e.subscription;
                },
                get fallback() {
                  return l(D, {
                    keyed: !0,
                    get when() {
                      return e.subscriptionTitle;
                    },
                    children: (_) =>
                      (() => {
                        var R = Ng(),
                          z = R.firstChild;
                        return (
                          p(z, () => Gi(_)),
                          $(
                            (J) => {
                              var ne = H(
                                  r().magazineOrigin,
                                  r().magazineOriginNotLink
                                ),
                                G = r().magazineOriginTitle;
                              return (
                                ne !== J.e && I(R, (J.e = ne)),
                                G !== J.t && I(z, (J.t = G)),
                                J
                              );
                            },
                            { e: void 0, t: void 0 }
                          ),
                          R
                        );
                      })(),
                  });
                },
                children: (_) =>
                  l(
                    Pe,
                    F(
                      {
                        get class() {
                          return r().magazineOrigin;
                        },
                        color: "inherit",
                        textDecoration: !1,
                        get href() {
                          return Vt(t, { type: K.SUBSCRIPTION, id: _.id });
                        },
                      },
                      { [Rc]: !0 },
                      {
                        get children() {
                          return [
                            (() => {
                              var R = xi();
                              return (
                                $(
                                  (z) => {
                                    var G;
                                    var J = r().metaMagazineOriginIcon,
                                      ne = `url(${Vs(
                                        (G = _.homePageUrl) != null
                                          ? G
                                          : _.feedUrl,
                                        48
                                      )})`;
                                    return (
                                      J !== z.e && I(R, (z.e = J)),
                                      ne !== z.t &&
                                        ((z.t = ne) != null
                                          ? R.style.setProperty(
                                              "background-image",
                                              ne
                                            )
                                          : R.style.removeProperty(
                                              "background-image"
                                            )),
                                      z
                                    );
                                  },
                                  { e: void 0, t: void 0 }
                                ),
                                R
                              );
                            })(),
                            (() => {
                              var R = xi();
                              return (
                                p(R, () => Gi(_.title)),
                                $(() => I(R, r().magazineOriginTitle)),
                                R
                              );
                            })(),
                          ];
                        },
                      }
                    )
                  ),
              })
            ),
            $(() => I(x, r().magazineOverline)),
            x
          );
        },
      }),
      l(D, {
        get when() {
          return e.showThumbnail && A;
        },
        get children() {
          var x = ko();
          return (
            `url(${A})` != null
              ? x.style.setProperty("background-image", `url(${A})`)
              : x.style.removeProperty("background-image"),
            $(() => I(x, r().magazineThumbnail)),
            x
          );
        },
      }),
      l(k, {
        get baseClass() {
          return H(
            r().magazineTitle,
            e.asMainList && r().magazineTitleInMainList
          );
        },
        get readClass() {
          return r().magazineTitleRead;
        },
        get unreadClass() {
          return r().magazineTitleUnread;
        },
        get children() {
          return l(D, {
            get when() {
              return u();
            },
            get fallback() {
              return l(D, {
                get when() {
                  return e.entry.status === Ge.UNREAD;
                },
                get children() {
                  var x = Ng(),
                    _ = x.firstChild;
                  return (
                    $(
                      (R) => {
                        var z = r().magazineMark,
                          J = H(r().magazineMarkIcon, r().magazineUnreadMark);
                        return (
                          z !== R.e && I(x, (R.e = z)),
                          J !== R.t && I(_, (R.t = J)),
                          R
                        );
                      },
                      { e: void 0, t: void 0 }
                    ),
                    x
                  );
                },
              });
            },
            get children() {
              var x = xi();
              return (
                p(
                  x,
                  l(Ec, {
                    get class() {
                      return H(r().magazineMarkIcon, r().magazineBookmarkMark);
                    },
                    size: 16,
                  })
                ),
                $(() => I(x, r().magazineMark)),
                x
              );
            },
          });
        },
      }),
      (() => {
        var x = ko();
        return (
          p(x, () => E(r().magazineTime)), $(() => I(x, r().magazineMeta)), x
        );
      })(),
      L(() => T(H(r().magazineSummary, { webkitLineClamp: i() }))),
    ];
  return l(NC, {
    ref(x) {
      var _ = a;
      typeof _ == "function" ? _(x) : (a = x);
    },
    get class() {
      return H(
        "list-entry",
        r().root,
        e.layout === 0 && r().singleLineRoot,
        e.layout === 1 && r().magazineRoot,
        s() && r().active
      );
    },
    get layerBackground() {
      return n().color.primary;
    },
    get rightActionIcon() {
      return c() ? Ds : e.entry.status === Ge.READ ? Yi : qi;
    },
    get rightActionColor() {
      return L(() => !!c())() ? n().color.error : n().color.primary;
    },
    get isRightActionDisabled() {
      return c() ? !1 : e.entry.status === Ge.READ && !$o(e.entry);
    },
    get onRightAction() {
      return c() ? b : e.entry.status === Ge.READ ? y : m;
    },
    get contentClassName() {
      return H(
        r().content,
        e.layout === 0 && r().singleLineContent,
        e.layout === 1 && r().magazineContent
      );
    },
    "data-is-navitem": !0,
    get "data-navitem-active"() {
      return s() ? !0 : void 0;
    },
    "data-is-entry": !0,
    get "data-entry-id"() {
      return e.entry.id;
    },
    tabIndex: 0,
    onTap: g,
    get children() {
      return [
        l(_s, { name: "EntryView" }),
        l(qo, {
          get children() {
            return [
              l(kt, {
                get when() {
                  return e.layout === 0;
                },
                get children() {
                  return P();
                },
              }),
              l(kt, {
                get when() {
                  return e.layout === 1;
                },
                get children() {
                  return M();
                },
              }),
            ];
          },
        }),
      ];
    },
  });
}
const Dx = q((e) => ({
  root: {
    contain: "content",
    userSelect: "none",
    webkitUserSelect: "none",
    cursor: "pointer",
    ...qf(e),
  },
  singleLineRoot: { borderRadius: e.sharp.extraSmall },
  magazineRoot: { margin: "0 0 0.5rem", borderRadius: e.sharp.medium },
  active: {
    background: e.color.secondaryContainer,
    color: e.color.onSecondaryContainer,
  },
  content: {},
  singleLineContent: {
    padding: "0.125rem 0.875rem",
    display: "flex",
    alignItems: "stretch",
    ...e.typescale.bodyMediumStyle,
  },
  magazineContent: { padding: "0.75rem 0.75rem 0.75rem 1.5rem" },
  singleLineAction: {
    marginRight: "0.5rem",
    display: "flex",
    alignItems: "center",
  },
  singleLineOrigin: {
    minWidth: "4rem",
    maxWidth: "8rem",
    marginRight: "min(8%, 1.5rem)",
    overflow: "hidden",
    flex: "1 2 10rem",
    display: "flex",
    alignItems: "center",
  },
  singleLineOriginLink: { ...yn, padding: "0.5rem 0", display: "inline-block" },
  singleLineOriginRead: { color: e.color.onSurfaceHint },
  magazineOverline: {
    margin: "0 0 0.25rem",
    display: "flex",
    alignItems: "center",
    ...e.typescale.labelLargeStyle,
  },
  singleLineText: {
    flex: "1 1 30rem",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
  },
  title: {},
  singleLineTitle: { ...yn },
  singleLineTitleNoSummary: { flex: 1 },
  singleLineTitleRead: { color: e.color.onSurfaceHint },
  singleLineTitleUnread: { fontWeight: 700 },
  magazineTitle: {
    position: "relative",
    margin: "0 0 0.25rem",
    ...e.typescale.titleMediumStyle,
    wordBreak: "break-word",
    fontWeight: 700,
  },
  magazineTitleInMainList: {
    ...e.typescale.titleLargeStyle,
    fontSize: 18,
    fontWeight: 700,
  },
  magazineTitleRead: {},
  magazineTitleUnread: {},
  summary: {},
  singleLineSummary: {
    margin: "0 0 0 0.5rem",
    flex: "1 1 0",
    ...yn,
    color: e.color.onSurfaceHint,
  },
  magazineSummary: {
    ...e.typescale.bodySmallStyle,
    ...jf(3),
    marginTop: "0.375rem",
    color: e.color.onSurfaceVariant,
    wordBreak: "break-word",
  },
  magazineMark: {
    float: "left",
    marginLeft: "-1.5rem",
    width: "1.5rem",
    textAlign: "center",
  },
  magazineMarkIcon: { verticalAlign: "middle" },
  magazineUnreadMark: {
    display: "inline-block",
    width: 10,
    height: 10,
    background: e.color.primary,
    borderRadius: "100%",
  },
  magazineBookmarkMark: { color: e.color.orange },
  magazineThumbnail: {
    float: "right",
    clear: "both",
    margin: "0 0 0.5rem 0.5rem",
    width: "30%",
    maxWidth: Rm,
    minWidth: Wc,
    height: Wc,
    backgroundColor: e.surface(1),
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: e.sharp.small,
  },
  time: { color: e.color.onSurfaceVariant, whiteSpace: "nowrap" },
  singleLineTime: {
    flexShrink: 0,
    marginLeft: "min(5%, 2rem)",
    display: "flex",
    alignItems: "center",
    color: e.color.onSurfaceVariant,
  },
  magazineTime: {},
  magazineOrigin: { ...yn, display: "flex", alignItems: "center" },
  magazineOriginNotLink: { color: e.color.onSurfaceVariant },
  magazineOriginTitle: { ...yn, maxWidth: "12rem" },
  metaMagazineOriginIcon: {
    ...Yf,
    marginRight: "0.25rem",
    width: 24,
    height: 24,
    borderRadius: e.sharp.extraSmall,
  },
  magazineMeta: {
    display: "flex",
    alignItems: "center",
    ...e.typescale.bodySmallStyle,
  },
}));
var _x = w("<div style=display:flex>"),
  Ox = w("<div>");
function Nx(e) {
  const t = Y(se),
    [n, r] = N(),
    o = Fx(),
    i = Y(si),
    a = L(
      () =>
        !!i.methods.getEntryList().filter((s) => s.status === Ge.UNREAD).length
    );
  return (
    Px(
      n,
      () => e.containerEl,
      (s) => {
        var c, u;
        s.isIntersecting &&
          ((u = (c = i.data.entryIds) == null ? void 0 : c.length) != null
            ? u
            : 0) < 500 &&
          e.onLoadMore();
      },
      { rootMargin: "0px 0px 100% 0px" }
    ),
    [
      l(_s, { name: "EntryListView" }),
      l(u3, {
        name: "list-entry",
        get exitActiveClass() {
          return e.streamId.type === K.TAG
            ? "list-entry-exit-slide-out"
            : "list-entry-exit-collapse";
        },
        onExit: xm,
        get children() {
          return l(Qe, {
            get each() {
              return i.data.entryIds;
            },
            children: (s) => {
              const c = Mn(i.data.entries[s]),
                u = c.origin.feedId
                  ? t.subscriptions.methods.getSubscriptionByFeedId(
                      c.origin.feedId
                    )
                  : void 0;
              return l(Rx, {
                get streamId() {
                  return e.streamId;
                },
                subscription: u,
                get subscriptionTitle() {
                  return c.origin.feedTitle;
                },
                entry: c,
                get layout() {
                  return e.entryViewLayout;
                },
                get asMainList() {
                  return e.asMainList;
                },
                get showThumbnail() {
                  return e.showThumbnail;
                },
                get summaryLines() {
                  return e.summaryLines;
                },
                get onOpenEntry() {
                  return e.onOpenEntry;
                },
              });
            },
          });
        },
      }),
      l(D, {
        get when() {
          return !i.data.isLoading;
        },
        get children() {
          return l(D, {
            get when() {
              return i.data.end;
            },
            get fallback() {
              return l(Z, {
                ref: r,
                get class() {
                  return o().showMoreButton;
                },
                variant: "tonal",
                full: !0,
                get isLoading() {
                  return i.data.isLoadingNextPage;
                },
                get onClick() {
                  return e.onLoadMore;
                },
                get children() {
                  return h("Show More");
                },
              });
            },
            get children() {
              var s = Ox();
              return (
                p(
                  s,
                  l(D, {
                    get when() {
                      var c;
                      return (
                        i.data.unreadOnly &&
                        ((c = i.data.streamId) == null ? void 0 : c.type) !==
                          K.TAG
                      );
                    },
                    get fallback() {
                      return l(j, {
                        variant: "bodySmall",
                        color: "onSurfaceHint",
                        get children() {
                          return h("No more items");
                        },
                      });
                    },
                    get children() {
                      return l(D, {
                        get when() {
                          var c;
                          return (c = i.data.entryIds) == null
                            ? void 0
                            : c.length;
                        },
                        get fallback() {
                          return [
                            l(j, {
                              variant: "labelLarge",
                              color: "onSurfaceHint",
                              style: { "padding-top": `calc(33vh - ${je}px)` },
                              gutterBottom: !0,
                              get children() {
                                return h("Nothing unread");
                              },
                            }),
                            l(Z, {
                              variant: "outlined",
                              color: "neutralVariant",
                              get onClick() {
                                return e.onShowAll;
                              },
                              get children() {
                                return h("Show All");
                              },
                            }),
                          ];
                        },
                        get children() {
                          return [
                            l(j, {
                              variant: "labelMedium",
                              color: "onSurfaceHint",
                              gutterBottom: !0,
                              style: { "user-select": "none" },
                              get children() {
                                return h("No more items");
                              },
                            }),
                            l(D, {
                              get when() {
                                return a();
                              },
                              get fallback() {
                                return l(Z, {
                                  variant: "outlined",
                                  color: "neutral",
                                  full: !0,
                                  get onClick() {
                                    return e.onGoToNextFeed;
                                  },
                                  get children() {
                                    return h("Next feed");
                                  },
                                });
                              },
                              get children() {
                                var c = _x();
                                return (
                                  p(
                                    c,
                                    l(D, {
                                      get when() {
                                        return navigator.maxTouchPoints >= 1;
                                      },
                                      get children() {
                                        return l(Z, {
                                          variant: "text",
                                          icon: Jf,
                                          color: "neutral",
                                          get onClick() {
                                            return e.onMarkAllAsRead;
                                          },
                                        });
                                      },
                                    }),
                                    null
                                  ),
                                  p(
                                    c,
                                    l(Z, {
                                      variant: "outlined",
                                      color: "neutral",
                                      full: !0,
                                      get onClick() {
                                        return e.onGoToNextFeed;
                                      },
                                      get children() {
                                        return h("Next feed");
                                      },
                                    }),
                                    null
                                  ),
                                  c
                                );
                              },
                            }),
                          ];
                        },
                      });
                    },
                  })
                ),
                $(() => I(s, o().noMoreMessage)),
                s
              );
            },
          });
        },
      }),
    ]
  );
}
const Fx = q({
  showMoreButton: { marginTop: "1rem" },
  noMoreMessage: {
    marginTop: "2rem",
    paddingBottom: "1.5rem",
    textAlign: "center",
  },
});
Ft(`
.list-entry {
  transition-property: opacity,transform,height;
  transition-duration: 250ms;
  transition-timing-function: ease-out;
}
.list-entry-enter {
  opacity: 0;
  transform: translateY(-36px);
}
.list-entry-exit-slide-out {
  opacity: 0;
  transform: translateX(-100%);
}
.list-entry-exit-collapse {
  height: 0px;
  transition-duration: 0ms;
  transition-timing-function: step-start;
}
`);
var Bx = w("<option> ");
function Ux(e) {
  var b;
  const t = Y(se),
    [n, r] = N(
      ((b = t.core.data.currentUser) == null ? void 0 : b.plan) === nt.FREE
        ? 5
        : 50
    ),
    [o, i] = N(!0),
    [a, s] = N(!0),
    { getIsBusy: c, execute: u } = lt(async () => {
      const v = await Le("sendStreamAsEbook", {
        title: e.streamTitle,
        streamId: e.streamId,
        count: n(),
        unreadOnly: o(),
        markAsRead: a(),
      });
      v.entryIds.length > 0
        ? (t.core.methods.notifySuccess(h("Ebook sent")),
          e.onMarkAsRead(v.entryIds))
        : t.core.methods.notifyError(h("No articles to send")),
        e.onClose();
    }),
    d = (v) => {
      i(v.currentTarget.checked);
    },
    g = (v) => {
      s(v.currentTarget.checked);
    },
    f = (v) => {
      r(Number(v.currentTarget.value));
    };
  return l(an, {
    get title() {
      return h("Send as eBook");
    },
    get isShown() {
      return e.isShown;
    },
    width: 360,
    hasClose: !0,
    get hasCancel() {
      return !c();
    },
    get confirmLabel() {
      return h("Send");
    },
    get isConfirmLoading() {
      return c();
    },
    onCancel: () => {
      e.onClose();
    },
    onConfirm: () => {
      u().catch(t.core.methods.reportErrorAction());
    },
    children: () => [
      l(Nt, {
        severify: "info",
        get actions() {
          return l(Z, {
            href: "/settings/ebook",
            variant: "outlined",
            size: "small",
            get children() {
              return h("View");
            },
          });
        },
        get children() {
          return h("Ebook receiving email and online download address.");
        },
      }),
      l(j, {
        variant: "labelLarge",
        component: "span",
        get children() {
          return [L(() => h("Max. number of articles")), ":", " "];
        },
      }),
      l(Ur, {
        get value() {
          return n();
        },
        inline: !0,
        onChange: f,
        get children() {
          return l(Qe, {
            get each() {
              return hm(t.core.data.currentUser);
            },
            children: ([v, S, A]) =>
              (() => {
                var k = Bx(),
                  T = k.firstChild;
                return (
                  (k.value = v),
                  (k.disabled = !S),
                  p(k, v, T),
                  p(k, S ? "" : A, null),
                  k
                );
              })(),
          });
        },
      }),
      l(wn, {
        type: "checkbox",
        get checked() {
          return o();
        },
        onClick: d,
        get children() {
          return h("Send unread only");
        },
      }),
      l(wn, {
        type: "checkbox",
        get checked() {
          return a();
        },
        onClick: g,
        get children() {
          return h("Mark sent articles as read");
        },
      }),
    ],
  });
}
function zx(e) {
  const t = at(),
    [n, r] = Ih(),
    [o, i] = xh(),
    [a, s] = vu();
  return l(ri, {
    get title() {
      return h("View options");
    },
    get children() {
      return [
        l(Ee, {
          get text() {
            return h("List");
          },
          type: "radio",
          icon: qw,
          get checked() {
            return n() === ze.LIST;
          },
          onClick: () => {
            r(ze.LIST);
          },
        }),
        l(Ee, {
          get text() {
            return h("Magazine");
          },
          type: "radio",
          icon: Kw,
          get checked() {
            return n() === ze.MAGAZINE;
          },
          onClick: () => {
            r(ze.MAGAZINE);
          },
        }),
        l(Ee, {
          get text() {
            return h("Column");
          },
          type: "radio",
          icon: Zw,
          get checked() {
            return n() === ze.COLUMN;
          },
          get disabled() {
            return !e.supportsColumnLayout;
          },
          onClick: () => {
            r(ze.COLUMN);
          },
        }),
        l(tn, {}),
        l(Ee, {
          get text() {
            return h("Show thumbnail");
          },
          type: "checkbox",
          noIcon: !0,
          get checked() {
            return o();
          },
          onClick: () => (i(!o()), !1),
        }),
        l(Ua, {
          get text() {
            return h("Summary lines");
          },
          get value() {
            return a();
          },
          onIncrement: () => s(a() + 1),
          get isIncrementDisabled() {
            return a() >= pE;
          },
          onDecrement: () => s(a() - 1),
          get isDecrementDisabled() {
            return a() <= yE;
          },
        }),
        l(tn, {}),
        l(Ee, {
          get text() {
            return h("More options…");
          },
          icon: du,
          onClick: () => {
            t("/settings/interface/article-listing");
          },
        }),
      ];
    },
  });
}
var Hx = w("<span>"),
  Vx = w("<div><div>"),
  jl = w("<div>");
const Nu = on();
function js(e) {
  const t = Y(se),
    [n, r] = N(!1),
    o = L(() => Object.keys(t.subscriptions.data.subscriptions).length === 0),
    [i, a] = N(!1),
    [s, c] = N(!1),
    u = L(() => {
      var V;
      return (V = t.preferences.methods.getStreamPreferences(
        e.streamId
      ).unreadOnly) != null
        ? V
        : t.preferences.methods.getGlobalPreference("unreadOnly");
    }),
    d = () => (e.streamId.type === K.TAG ? !1 : u()),
    [g, f] = N(!1),
    m = Pt(),
    y = at(),
    b = Y(oi),
    [v] = Ih(),
    [S] = xh(),
    [A] = vu(),
    [k] = Th(),
    [T, E] = N(),
    [P, M] = N(),
    x = UI({ streamId: () => e.streamId, unreadOnly: d }),
    _ = L(() => {
      var V, de;
      return (
        ((de = (V = x.data.entryIds) == null ? void 0 : V.length) != null
          ? de
          : 0) === 0
      );
    });
  i5(() => $n(e.streamId));
  const R = L(() => {
      const V = b.getContentWidth();
      return V != null && V >= 720;
    }),
    z = L(() => {
      let V = v();
      return V === ze.COLUMN && !R() && (V = ze.MAGAZINE), V;
    }),
    J = L(
      () =>
        t.preferences.methods.getGlobalPreference("startPage") ===
        $n(e.streamId)
    ),
    ne = () => {
      t.preferences.methods
        .updateGlobalPreferencesAction({ startPage: J() ? "" : $n(e.streamId) })
        .catch(t.core.methods.reportErrorAction());
    },
    G = () => b.getSidebarType() === Dn.PERMANENT || z() === ze.COLUMN,
    Q = L(() => (G() ? n() : !1)),
    ye = () => {
      r((V) => !V);
    };
  ie(() => {
    G() || r(!1);
  });
  const B = () => {
      const V = () => {
          var $e;
          return ($e = x.methods.getFirstEntry()) == null ? void 0 : $e.id;
        },
        de = V();
      x.methods
        .reloadAction()
        .then(() => {
          const $e = V();
          $e != null &&
            de === $e &&
            t.core.methods.notifyInfo(h("No new articles"));
        })
        .catch(
          t.core.methods.reportErrorAction(h("Failed to load new article list"))
        ),
        T().scrollTo(0, 0);
    },
    le = async (V = !0) => {
      await x.methods.markAllEntriesAsReadAction(),
        V && t.core.methods.notifySuccess(h("Marked all as read")),
        a(!1);
    };
  function Se() {
    const V = nE(t, k());
    return V
      ? (y(Vt(t, V)), !0)
      : (t.core.methods.notifyInfo(h("No unread feed")), !1);
  }
  function Ie() {
    le().catch(t.core.methods.reportErrorAction());
  }
  const ae = (V = !1) => {
      V &&
        t.core.methods.notifyInfo(
          u() ? h("Show all articles") : h("Show read only articles")
        ),
        e.streamId.type === K.CATEGORY
          ? t.preferences.methods
              .updateCategoryPreferencesAction(e.streamId.id, {
                unreadOnly: !u(),
              })
              .catch(t.core.methods.reportErrorAction())
          : e.streamId.type === K.SUBSCRIPTION &&
            t.preferences.methods
              .updateSubscriptionPreferencesAction(e.streamId.id, {
                unreadOnly: !u(),
              })
              .catch(t.core.methods.reportErrorAction());
    },
    Ce = () => {
      const V = P().querySelectorAll(`[${$m}]`);
      if (!V.length) return;
      let de = Sv(V, "bottom", je);
      de || (de = { element: V[V.length - 1], full: !0, pageScrollAmount: 0 }),
        W(de);
      const $e = de.element.dataset[$x];
      if ((W($e), !x.data.entryIds)) return;
      let Ze = x.data.entryIds.findIndex(($t) => $t === $e);
      if ((de.full || Ze--, Ze < 0)) return;
      const mt = x.methods
        .getEntryList()
        .filter(($t, _r) => $t.status === Ge.UNREAD && _r <= Ze)
        .map(($t) => $t.id);
      mt.length
        ? (f(!0),
          x.methods
            .markEntriesAsReadAction({ entryIds: mt })
            .then(() => {
              t.core.methods.notifySuccess(
                h("Marked %s entries as read", mt.length)
              );
            })
            .catch(t.core.methods.reportErrorAction())
            .finally(() => {
              f(!1);
            }))
        : t.core.methods.notifyInfo(h("No unread entries above"));
    },
    we = () => {
      a(!0);
    },
    te = () => {
      a(!1);
    },
    be = () => {
      x.methods
        .loadNewAction()
        .catch(
          t.core.methods.reportErrorAction(void 0, { ignoreNetworkError: !0 })
        );
    },
    fe = () => {
      x.methods.loadNextPageAction().catch(t.core.methods.reportErrorAction());
    },
    re = () => {
      c(!0);
    },
    Be = (V) => {
      x.methods
        .markEntriesAsReadAction({ entryIds: V })
        .catch(t.core.methods.reportErrorAction());
    };
  let Ke = !1;
  const Mt = (V, de) => {
      (Ke = de),
        V.status === Ge.UNREAD &&
          x.methods
            .markEntriesAsReadAction({ entryIds: [V.id] })
            .catch(t.core.methods.reportErrorAction()),
        He(() => {
          W(x.data.streamId),
            y(Dh(t, x.data.streamId, V.id), {
              scroll: !1,
              replace: x.data.activeEntryId != null,
            });
        });
    },
    C = (V = !1) => {
      var mt;
      const $e = x.methods.getActiveEntryIndex() + (V ? -1 : 1),
        Ze = (mt = x.data.entryIds) == null ? void 0 : mt[$e];
      Ze && Mt(Mn(x.data.entries[Ze]), Ke);
    },
    Vn = () => {
      const V = In();
      V ? Mt(V, Ke) : t.core.methods.notifyInfo(h("No more unread articles"));
    },
    rr = () => {
      const V = In();
      V && V.thumbnail && Lv(V.thumbnail);
    },
    ln = (V) => P().querySelector(`[data-entry-id="${V}"]`),
    In = () => {
      if (!x.data.entryIds) return;
      const V = x.methods.getActiveEntryIndex(),
        de = x.data.entryIds.find(
          ($e, Ze) => Mn(x.data.entries[$e]).status === Ge.UNREAD && Ze > V
        );
      return de ? x.data.entries[de] : void 0;
    },
    or = (V, de = {}) => {
      const $e = ln(V);
      if ($e) return Hs(T(), $e, { topPadding: je, alignTopMargin: 8, ...de });
    },
    xn = (V) => {
      const de = ln(V);
      de &&
        de.animate(
          [
            { backgroundColor: Ot(m().color.primary, Sc) },
            { backgroundColor: "transparent" },
          ],
          { fill: "none", duration: 1e3, easing: Bv }
        );
    },
    kn = (V) => {
      vs(T(), P(), V, { topPadding: je, behavior: "smooth" }),
        z() !== ze.COLUMN && cn();
    },
    Pr = () => {
      z() !== ze.COLUMN && cn(),
        r(!1),
        b.toggleSidebar(!1),
        requestAnimationFrame(() => {
          setTimeout(() => {
            am(T(), P(), void 0, { topPadding: je }) || ir();
          }, 10);
        });
    },
    ir = () => {
      Jr.emit("focusSidebar");
    },
    Mr = () => {
      Jr.emit("focusArticleView");
    },
    $r = (V) => {
      im(T(), V, { topPadding: je, behavior: "smooth" });
    },
    cn = () => {
      e.entryId && Cf(Vt(t, e.streamId));
    };
  xu("focusEntryList", Pr),
    Kt(() => Yt(e.title)),
    r3(T, be, {}),
    bs(() => {
      a(!1), c(!1);
    }),
    ti(T, [
      [["h", "ArrowLeft"], ir],
      [["l", "ArrowRight"], Mr],
      [["j", "ArrowDown"], kn.bind(void 0, "down")],
      [["k", "ArrowUp"], kn.bind(void 0, "up")],
      [["PageUp", "shift+Space"], () => $r("up")],
      [["PageDown", "Space"], () => $r("down")],
      ["b", () => ae(!0)],
      ["r", B],
      ["m", Ce],
      ["shift+M", () => Ie()],
      ["g", Se],
    ]);
  let ar,
    Tn = !1;
  ie(
    pe(
      () => x.data.activeEntryId,
      (V, de) => {
        if (V) {
          const $e = or(V, {
            align: z() === ze.COLUMN ? "start" : "center",
            forceAlign: Tn,
            behavior: z() === ze.COLUMN ? "smooth" : "auto",
          });
          z() !== ze.COLUMN && !Tn && $e && (Tn = !0);
        }
        if ((V || ((Tn = !1), r(!1)), V && !de && (ar = V), !V && de)) {
          const $e = ln(de);
          if (!$e) return;
          or(de, { align: "center", behavior: "instant" }),
            Ke &&
              !(() => {
                var mt;
                return (
                  document.activeElement &&
                  ((mt = P()) == null
                    ? void 0
                    : mt.contains(document.activeElement))
                );
              })() &&
              $e.focus(),
            (is && de === ar) || xn(de);
        }
      }
    )
  ),
    ie(
      pe(
        () => x.data.activeEntryId,
        () => {
          rr();
        }
      )
    ),
    ie(
      pe(
        () => x.data.activeEntryId,
        () => {
          if (!x.data.entryIds) return;
          const V = x.methods.getActiveEntryIndex();
          V >= 0 && x.data.entryIds.length - V < 5 && fe();
        }
      )
    );
  const sr = () =>
      l(Vo, {
        children: (V) => {
          var de;
          if (V === "/")
            return [
              l(Ee, {
                get text() {
                  return h("Refresh");
                },
                icon: jw,
                onClick: B,
              }),
              l(D, {
                get when() {
                  return e.streamId.type !== K.TAG;
                },
                get children() {
                  return l(Ee, {
                    get text() {
                      return h("Mark all as read");
                    },
                    icon: Aw,
                    get disabled() {
                      return _();
                    },
                    onClick: we,
                  });
                },
              }),
              l(D, {
                get when() {
                  return e.streamId.type !== K.TAG;
                },
                get children() {
                  return l(Ee, {
                    get text() {
                      return h("Send as eBook");
                    },
                    icon: gu,
                    onClick: re,
                  });
                },
              }),
              l(tn, {}),
              l(D, {
                get when() {
                  return e.streamId.type !== K.TAG;
                },
                get children() {
                  return l(Ee, {
                    get text() {
                      return h("Unread Only");
                    },
                    type: "checkbox",
                    get checked() {
                      return u();
                    },
                    onClick: () => ae(),
                  });
                },
              }),
              l(D, {
                when: !Kr,
                get children() {
                  return l(Ee, {
                    get text() {
                      return h("Set as start page");
                    },
                    type: "checkbox",
                    get checked() {
                      return J();
                    },
                    onClick: ne,
                  });
                },
              }),
              l(Wo, {
                path: "/view-options/",
                get text() {
                  return h("View options");
                },
              }),
              L(() => {
                var $e;
                return ($e = e.renderAppMenuContent) == null
                  ? void 0
                  : $e.call(e);
              }),
            ];
          if (V === "/view-options/")
            return l(zx, {
              get supportsColumnLayout() {
                return R();
              },
            });
          if (V)
            return (de = e.onRenderAppMenuSubMenu) == null
              ? void 0
              : de.call(e, V);
        },
      }),
    ht = Wx(),
    go = () => l(ii, {}),
    lr = () =>
      l(Tr, {
        get children() {
          return [
            l(EC, {
              get class() {
                return ht().appBarTitleText;
              },
              get children() {
                return e.title;
              },
            }),
            l(D, {
              get when() {
                return e.streamId.type !== K.TAG;
              },
              get children() {
                var V = Hx();
                return (
                  p(V, () => {
                    var de;
                    return (de = t.markers.methods.getStreamUnreadCount(
                      e.streamId
                    )) != null
                      ? de
                      : "0";
                  }),
                  $(() => I(V, ht().appBarTitleUnreadCount)),
                  V
                );
              },
            }),
          ];
        },
      }),
    Rr = () => [
      L(
        (() => {
          var V = L(() => e.streamId.type !== K.TAG);
          return () =>
            V() &&
            l(Z, {
              variant: "text",
              color: "neutral",
              icon: Jf,
              get title() {
                return h("Mark above as read");
              },
              get disabled() {
                return _();
              },
              get isLoading() {
                return g();
              },
              onClick: Ce,
            });
        })()
      ),
      l(Go, {
        variant: "text",
        color: "neutral",
        icon: au,
        edge: "end",
        renderDropdown: sr,
      }),
    ],
    fo = {
      title() {
        return e.title;
      },
      getCanFullscreen: G,
      getIsFullscreen: Q,
      setIsFullscreen: r,
      toggleFullscreen: ye,
      getEntryListLayout: z,
      focusNextItem: kn,
      openNextEntry: C,
      openNextUnreadEntry: Vn,
      openNextFeed: Se,
    },
    Wn = () => {
      const V = () =>
        z() === ze.COLUMN
          ? za.MAGAZINE
          : z() === ze.LIST
          ? za.SINGLE_LINE
          : z() === ze.MAGAZINE
          ? za.MAGAZINE
          : W(!1);
      return l(Lr, {
        ref: E,
        get class() {
          return H(z() === ze.COLUMN && ht().leftColumn);
        },
        get loading() {
          return x.data.isLoading || x.data.isLoadingNew;
        },
        fixPageDown: !0,
        renderTopBar: Rr,
        renderPreTitle: go,
        renderTitle: lr,
        get elevateAppBar() {
          return z() !== ze.COLUMN;
        },
        rootProps: { tabIndex: -1 },
        get children() {
          return l(Ns, {
            get class() {
              return ht().swipeActionView;
            },
            childRightAction: !0,
            get onViewSwipeStart() {
              return b.onMainViewSwipeStart;
            },
            get onViewSwipeMove() {
              return b.onMainViewSwipeMove;
            },
            get onViewSwipeRightEnd() {
              return b.onMainViewSwipeRightEnd;
            },
            get onViewSwipeCancel() {
              return b.onMainViewSwipeCancel;
            },
            get children() {
              return l(Gt, {
                ref: M,
                get class() {
                  return ht().container;
                },
                get size() {
                  return z() === ze.LIST ? "wide" : "medium";
                },
                center: !0,
                "data-is-navitem-container": !0,
                get children() {
                  return [
                    L(() => {
                      var de;
                      return (de = e.renderListHeader) == null
                        ? void 0
                        : de.call(e);
                    }),
                    l(D, {
                      get when() {
                        return o();
                      },
                      get fallback() {
                        return l(D, {
                          get when() {
                            return (
                              x.data.loadError &&
                              !x.data.entryIds &&
                              !x.data.isLoading
                            );
                          },
                          get fallback() {
                            return l(D, {
                              get when() {
                                return x.data.entryIds;
                              },
                              get children() {
                                return l(Nx, {
                                  get streamId() {
                                    return e.streamId;
                                  },
                                  get entryViewLayout() {
                                    return V();
                                  },
                                  get asMainList() {
                                    return z() !== ze.COLUMN;
                                  },
                                  get showThumbnail() {
                                    return S();
                                  },
                                  get summaryLines() {
                                    return A();
                                  },
                                  get containerEl() {
                                    return T();
                                  },
                                  onShowAll: () => ae(),
                                  onOpenEntry: Mt,
                                  onLoadMore: fe,
                                  onMarkAllAsRead: () => {
                                    Ie();
                                  },
                                  onGoToNextFeed: Se,
                                });
                              },
                            });
                          },
                          get children() {
                            var de = jl();
                            return (
                              p(
                                de,
                                l(Z, {
                                  onClick: B,
                                  get children() {
                                    return h("Reload Page");
                                  },
                                })
                              ),
                              $(() => I(de, ht().empty)),
                              de
                            );
                          },
                        });
                      },
                      get children() {
                        var de = Vx(),
                          $e = de.firstChild;
                        return (
                          p(
                            de,
                            l(j, {
                              variant: "labelLarge",
                              gutterBottom: !0,
                              get children() {
                                return h("You don’t subscribe any feeds yet");
                              },
                            }),
                            $e
                          ),
                          p(
                            $e,
                            l(Z, {
                              variant: "filled",
                              href: "/discover",
                              get children() {
                                return h("Add content");
                              },
                            }),
                            null
                          ),
                          p(
                            $e,
                            l(Z, {
                              variant: "tonal",
                              href: "/import",
                              get children() {
                                return h("Import OPML");
                              },
                            }),
                            null
                          ),
                          $(
                            (Ze) => {
                              var mt = ht().empty,
                                $t = ht().buttons;
                              return (
                                mt !== Ze.e && I(de, (Ze.e = mt)),
                                $t !== Ze.t && I($e, (Ze.t = $t)),
                                Ze
                              );
                            },
                            { e: void 0, t: void 0 }
                          ),
                          de
                        );
                      },
                    }),
                  ];
                },
              });
            },
          });
        },
      });
    },
    Dr = () =>
      (() => {
        var V = jl();
        return (
          p(
            V,
            l(_g, {
              get entryId() {
                return e.entryId;
              },
              asColumn: !0,
              onClose: cn,
            }),
            null
          ),
          p(
            V,
            l(D, {
              get when() {
                return e.entryId == null;
              },
              get children() {
                return l(j, {
                  variant: "labelLarge",
                  color: "onSurfaceHint",
                  get children() {
                    return h("No selection");
                  },
                });
              },
            }),
            null
          ),
          $(() => I(V, ht().rightColumn)),
          V
        );
      })();
  return l(si.Provider, {
    value: x,
    get children() {
      return l(Nu.Provider, {
        value: fo,
        get children() {
          return [
            (() => {
              var V = jl();
              return (
                p(
                  V,
                  l(D, {
                    get when() {
                      return z() === ze.COLUMN;
                    },
                    get fallback() {
                      return Wn();
                    },
                    get children() {
                      return l(lm, {
                        get class() {
                          return ht().leftColumnResizable;
                        },
                        resizableName: "entryListColumn",
                        defaultSize: "30%",
                        minSize: "18rem",
                        maxSize: "50%",
                        get children() {
                          return Wn();
                        },
                      });
                    },
                  }),
                  null
                ),
                p(
                  V,
                  l(D, {
                    get when() {
                      return z() === ze.COLUMN;
                    },
                    get fallback() {
                      return l(_g, {
                        get entryId() {
                          return e.entryId;
                        },
                        asColumn: !1,
                        onClose: cn,
                      });
                    },
                    get children() {
                      return Dr();
                    },
                  }),
                  null
                ),
                $(() => I(V, H(z() === ze.COLUMN && ht().twoColumnContainer))),
                V
              );
            })(),
            l(Jt, {
              get on() {
                return i();
              },
              get children() {
                return l(Sm, {
                  get isShown() {
                    return i();
                  },
                  onCancel: te,
                  process: le,
                  get children() {
                    return l(j, {
                      variant: "titleMedium",
                      get children() {
                        return h("Mark all as read?");
                      },
                    });
                  },
                });
              },
            }),
            l(Jt, {
              get on() {
                return s();
              },
              get children() {
                return l(Ux, {
                  get streamTitle() {
                    return e.title;
                  },
                  get streamId() {
                    return $n(e.streamId);
                  },
                  get isShown() {
                    return s();
                  },
                  onMarkAsRead: Be,
                  onClose: () => {
                    c(!1);
                  },
                });
              },
            }),
          ];
        },
      });
    },
  });
}
const Wx = q((e) => ({
  twoColumnContainer: { display: "flex", height: "100%" },
  leftColumn: {
    ...En,
    borderRight: `1px solid ${e.color.outlineVariant}`,
    scrollbarWidth: "thin",
    ...ru(e, !0),
  },
  leftColumnResizable: { position: "relative", overflow: "hidden" },
  rightColumn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    position: "relative",
    background: e.color.background,
    color: e.color.onBackground,
  },
  container: { paddingLeft: "0.75rem", paddingRight: "0.75rem" },
  empty: { marginTop: "3rem", textAlign: "center" },
  swipeActionView: { minHeight: `calc(100% - ${je}px - 2px - 1rem - 8px)` },
  buttons: {
    margin: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
  },
  appBarTitleText: {},
  appBarTitleUnreadCount: {
    flexShrink: 0,
    marginLeft: "0.75rem",
    color: e.color.onSurfaceHint,
    fontWeight: 400,
  },
}));
function Dm(e) {
  const t = at(),
    n = ro(),
    r = () => ({ type: K.CATEGORY, id: e.category.id }),
    [o, i] = N(!1),
    [a, s] = N(!1),
    c = () => qI(e.category),
    u = () => {
      i(!0);
    },
    d = () => {
      i(!1);
    },
    g = () => {
      t("/", { replace: !0 });
    },
    f = () => {
      s(!0);
    },
    m = () => {
      s(!1);
    },
    y = (v) => {
      s(!1), t(`/categories/${encodeURIComponent(v)}`, { replace: !0 });
    };
  return (
    bs(() => void i(!1)),
    bs(() => void s(!1)),
    [
      l(js, {
        get title() {
          return c();
        },
        get streamId() {
          return r();
        },
        get entryId() {
          return n.entryId;
        },
        renderAppMenuContent: () =>
          L(
            (() => {
              var v = L(() => !vS(e.category.label));
              return () =>
                v() && [
                  l(tn, {}),
                  l(Ee, {
                    get text() {
                      return h("Rename…");
                    },
                    onClick: f,
                  }),
                  l(Ee, {
                    get text() {
                      return h("Delete");
                    },
                    icon: Ds,
                    isDangerous: !0,
                    onClick: u,
                  }),
                ];
            })()
          ),
      }),
      l(Jt, {
        get on() {
          return o();
        },
        get children() {
          return l(JI, {
            get isShown() {
              return o();
            },
            get category() {
              return e.category;
            },
            onCancel: d,
            onDelete: g,
          });
        },
      }),
      l(Jt, {
        get on() {
          return a();
        },
        get children() {
          return l(QI, {
            get isShown() {
              return a();
            },
            get category() {
              return e.category;
            },
            onCancel: m,
            onModify: y,
          });
        },
      }),
    ]
  );
}
const Gx = Hn(function () {
    const t = Y(se),
      n = ro(),
      r = () =>
        t.subscriptions.methods.getCategoryByLabel(decodeURIComponent(n.label));
    return (
      ta(() => {
        const o = r();
        return o && { type: An.FEED, streamId: { type: K.CATEGORY, id: o.id } };
      }),
      l(D, {
        keyed: !0,
        get when() {
          return r();
        },
        get fallback() {
          return l(to, {});
        },
        children: (o) => l(Dm, { category: o }),
      })
    );
  }),
  jx = Hn(() => {
    const e = Y(se),
      t = () => e.subscriptions.methods.getSystemCategory(Cn.ALL);
    return (
      ta(() => ({
        type: An.FEED,
        streamId: {
          type: K.CATEGORY,
          id: e.subscriptions.methods.getSystemCategory(Cn.ALL).id,
        },
      })),
      l(Dm, {
        get category() {
          return t();
        },
      })
    );
  });
var Yx = w("<b>qireader.com"),
  qx = w("<code style=font-size:1.5em>qireader.com.cn");
function Xx() {
  return (
    Kt(() => Yt("中国直联镜像")),
    Ou(),
    l(ai, {
      get children() {
        return l(Gt, {
          size: "medium",
          center: !0,
          get children() {
            return [
              l(j, {
                variant: "headlineLarge",
                align: "center",
                style: "margin-bottom: 1.5rem",
                children: "中国用户必读",
              }),
              l(j, {
                variant: "bodyLarge",
                get children() {
                  return [
                    "Qi Reader 永久域名是 ",
                    Yx(),
                    "，永久域名并未为中国大陆的网络优化， 如果你是从中国大陆访问请使用中国加速域名。加速域名和主域名共享帐号和数据。 当前中国加速域名是：",
                  ];
                },
              }),
              l(j, {
                variant: "bodyLarge",
                style: "margin: 2rem 0",
                align: "center",
                get children() {
                  return l(Pe, {
                    href: "https://www.qireader.com.cn",
                    color: "green",
                    native: !0,
                    get children() {
                      return qx();
                    },
                  });
                },
              }),
              l(Nt, {
                severify: "warning",
                get children() {
                  return [
                    "注意加速域名未来有可能会更换， 如果访问不了加速域名请打开永久域名 qireader.com/china 页面（可从主页页脚进入）取得最新加速域名。 如果因网络原因打不开主站可以访问",
                    " ",
                    l(Pe, {
                      href: "https://github.com/oxyry/qireader",
                      native: !0,
                      openInNew: !0,
                      children: "github.com/oxyry/qireader",
                    }),
                    "取得加速域名 。",
                  ];
                },
              }),
            ];
          },
        });
      },
    })
  );
}
var Kx = w("<form method=post>");
function Zx() {
  const [e, t] = N(""),
    n = Y(se),
    r = at(),
    {
      getIsBusy: o,
      getError: i,
      execute: a,
    } = lt(async () => {
      const u = await it("codeLogin", { code: e() });
      if (u.ok)
        n.core.methods
          .initUserAction(u.result.id)
          .then(() => {
            r("/", { replace: !0 });
          })
          .catch(n.core.methods.reportErrorAction(void 0, { fatal: !0 }));
      else {
        if (u.errorCode === "INCORRECT_CODE")
          return h("The code is invalid or has expired.");
        Yr(u);
      }
    }),
    s = (u) => {
      t(u.currentTarget.value);
    },
    c = (u) => {
      u.preventDefault(), a().catch(n.core.methods.reportErrorAction());
    };
  return (
    Kt(() => Yt(h("Login Code"))),
    l(aa, {
      renderTitle: () => h("Login Code"),
      renderSubtitle: () =>
        L(() =>
          h(
            "Check your email address and enter the login code that we sent to you"
          )
        ),
      get children() {
        return [
          L(
            () =>
              L(() => !!i())() &&
              l(Nt, {
                severify: "error",
                get children() {
                  return i();
                },
              })
          ),
          (() => {
            var u = Kx();
            return (
              u.addEventListener("submit", c),
              p(
                u,
                l(ke, {
                  get children() {
                    return l(At, {
                      get placeholder() {
                        return h("6-digit code");
                      },
                      get inputProps() {
                        return {
                          name: "code",
                          value: e(),
                          required: !0,
                          maxLength: 6,
                          disabled: o(),
                          onInput: s,
                          onChange: s,
                        };
                      },
                      full: !0,
                    });
                  },
                }),
                null
              ),
              p(
                u,
                l(ke, {
                  group: !0,
                  end: !0,
                  get children() {
                    return l(Z, {
                      variant: "filled",
                      type: "submit",
                      get isLoading() {
                        return o();
                      },
                      full: !0,
                      get children() {
                        return h("Log in");
                      },
                    });
                  },
                }),
                null
              ),
              u
            );
          })(),
        ];
      },
    })
  );
}
function Qx() {}
var Jx = w("<li><h3><span>"),
  ek = w("<p>"),
  tk = w("<h1>"),
  nk = w("<h2>"),
  rk = w("<div>"),
  ok = w(
    '<div><svg width=1450 height=860 viewBox="-10 -10 1470 880"><mask id=frameMaskRounded><rect x=10 y=10 width=360 height=640 rx=40 fill=white></rect></mask><filter id=frameShadow color-interpolation-filters=sRGB><feDropShadow dx=0 dy=2 stddeviation=4 flood-opacity=0.325></feDropShadow></filter><rect x=0 y=0 width=1260 height=860 rx=30 fill=#dedede style=filter:url(#frameShadow)></rect><image x=30 y=30 width=1200 height=800 href=./screenshot.desktop.en.png></image><g transform="translate(1070 200)"><rect x=0 y=0 width=380 height=660 rx=50 stroke=#909090 stroke-width=2 style=filter:url(#frameShadow)></rect><rect x=10 y=10 width=386 height=640 fill=#fff mask=url(#frameMaskRounded)></rect><image x=10 y=10 width=360 height=640 href=/screenshot.mobile.article.en.png mask=url(#frameMaskRounded)></image><rect x=120 y=638 width=170 height=5 rx=2 fill=#000>'
  ),
  ik = w("<ul>");
function ak() {
  const e = Y(se),
    [t, n] = N(!1),
    r = sk();
  function o() {
    n(!0),
      e.core.methods
        .createDemoAccountAction()
        .catch(e.core.methods.reportErrorAction());
  }
  const i = (a) =>
    (() => {
      var s = Jx(),
        c = s.firstChild,
        u = c.firstChild;
      return (
        p(
          c,
          l(jt, {
            get component() {
              return a.icon;
            },
            get class() {
              return r().featureIcon;
            },
          }),
          u
        ),
        p(u, () => a.title),
        p(
          s,
          (() => {
            var d = L(() => !!a.detail);
            return () =>
              d() &&
              (() => {
                var g = ek();
                return (
                  p(g, () => a.detail), $(() => I(g, r().featureDetail)), g
                );
              })();
          })(),
          null
        ),
        $(
          (d) => {
            var g = r().featureItem,
              f = r().featureTitle,
              m = r().featureTitleText;
            return (
              g !== d.e && I(s, (d.e = g)),
              f !== d.t && I(c, (d.t = f)),
              m !== d.a && I(u, (d.a = m)),
              d
            );
          },
          { e: void 0, t: void 0, a: void 0 }
        ),
        s
      );
    })();
  return l(ai, {
    get children() {
      return [
        l(Gt, {
          center: !0,
          get children() {
            return [
              (() => {
                var a = tk();
                return p(a, () => h("Qi Reader")), $(() => I(a, r().title)), a;
              })(),
              (() => {
                var a = nk();
                return (
                  p(a, () => h("A modern web RSS reader")),
                  $(() => I(a, r().subtitle)),
                  a
                );
              })(),
              (() => {
                var a = rk();
                return (
                  p(
                    a,
                    l(D, {
                      get when() {
                        return !t();
                      },
                      get children() {
                        return l(Z, {
                          class: "mx-0",
                          variant: "filled",
                          href: "/register",
                          get children() {
                            return h("Sign up");
                          },
                        });
                      },
                    }),
                    null
                  ),
                  p(
                    a,
                    l(Z, {
                      class: "mx-0",
                      variant: "outlined",
                      get isLoading() {
                        return t();
                      },
                      onClick: o,
                      get children() {
                        return h("Try demo");
                      },
                    }),
                    null
                  ),
                  $(() => I(a, r().buttons)),
                  a
                );
              })(),
            ];
          },
        }),
        l(Gt, {
          center: !0,
          get children() {
            var a = ok(),
              s = a.firstChild;
            return (
              $(
                (c) => {
                  var u = r().screenshot,
                    d = r().screenshotImg;
                  return (
                    u !== c.e && I(a, (c.e = u)),
                    d !== c.t && Xe(s, "class", (c.t = d)),
                    c
                  );
                },
                { e: void 0, t: void 0 }
              ),
              a
            );
          },
        }),
        l(Gt, {
          size: "medium",
          center: !0,
          get children() {
            return [
              (() => {
                var a = ik();
                return (
                  p(
                    a,
                    () =>
                      i({
                        title: h("Cross platform"),
                        icon: zw,
                        detail: h(
                          "Installable Web-App (Add to home screen), work on any platform including both desktop and mobile devices."
                        ),
                      }),
                    null
                  ),
                  p(
                    a,
                    () =>
                      i({
                        title: h("Read Later"),
                        icon: cu,
                        detail: h("Save articles in one click."),
                      }),
                    null
                  ),
                  p(
                    a,
                    () =>
                      i({
                        title: h("Article tags"),
                        icon: ns,
                        detail: h(
                          "Tags are perfect for saving related articles."
                        ),
                      }),
                    null
                  ),
                  p(
                    a,
                    () =>
                      i({
                        title: h("Full-Text"),
                        icon: lu,
                        detail: h(
                          "Fetch full-text of an article for feeds that only offer partial-content."
                        ),
                      }),
                    null
                  ),
                  p(
                    a,
                    () =>
                      i({
                        title: h("Ebooks & Amazon Kindle"),
                        icon: $l,
                        detail: h(
                          "Email articles as eBooks. Pushes to Kindle automatically and on schedule."
                        ),
                      }),
                    null
                  ),
                  p(
                    a,
                    () =>
                      i({
                        title: h("Keyboard shortcuts"),
                        icon: rh,
                        detail: h("Faster than using a mouse."),
                      }),
                    null
                  ),
                  p(
                    a,
                    () =>
                      i({
                        title: h("OPML Import / Export"),
                        icon: $l,
                        detail: h("Import sources from other RSS readers."),
                      }),
                    null
                  ),
                  p(
                    a,
                    () =>
                      i({
                        title: h("Dark mode"),
                        icon: $l,
                        detail: h("Reduced eye strain."),
                      }),
                    null
                  ),
                  $(() => I(a, r().featureList)),
                  a
                );
              })(),
              l(Gs, {}),
            ];
          },
        }),
      ];
    },
  });
}
const sk = q((e) => ({
  title: {
    margin: "2rem 0 0.1rem",
    textAlign: "center",
    fontSize: 98,
    lineHeight: 1.1,
    "@media (max-width: 600px)": { fontSize: "56px" },
  },
  subtitle: {
    margin: "1rem 0 1rem",
    textAlign: "center",
    fontSize: 36,
    fontWeight: 500,
    lineHeight: 1.2,
    color: e.color.onSurfaceVariant,
    "@media (max-width: 600px)": { fontSize: "18px !important" },
  },
  buttons: {
    margin: "4rem 0",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "0.75rem",
    [vr]: { margin: "2rem 0" },
  },
  screenshot: {
    display: "flex",
    justifyContent: "center",
    margin: "4rem 0rem",
    [vr]: { margin: "2rem 0rem" },
  },
  screenshotImg: {
    boxSizing: "content-box",
    maxWidth: "calc(100vw - 3rem)",
    height: "auto",
  },
  featureList: {
    padding: "0 1rem",
    listStyle: "none",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gridGap: "1rem",
  },
  featureItem: { margin: "0" },
  featureIcon: {
    boxSizing: "content-box",
    width: 24,
    height: 24,
    padding: "0.5rem",
    margin: "0 0.75rem 0 0",
    verticalAlign: "middle",
    background: e.color.surfaceVariant,
    color: e.color.onSurfaceVariant,
    borderRadius: e.sharp.full,
  },
  featureTitle: { margin: "0 0 1rem", ...e.typescale.titleLargeStyle },
  featureTitleText: { verticalAlign: "middle" },
  featureDetail: {
    color: e.color.onSurfaceVariant,
    ...e.typescale.bodyMediumStyle,
  },
}));
function lk() {
  return l(fm, {
    get fallback() {
      return l(ak, {});
    },
    get children() {
      return l(jx, {});
    },
  });
}
function _m(e) {
  const t = Y(se),
    n = () => Object.values(t.subscriptions.data.categories),
    r = () => t.subscriptions.data.subscriptionCategories,
    o = () =>
      n()
        .filter((s) => !s.label.startsWith(lo))
        .map((s) => ({
          checked: (r()[e.subscription.id] || []).includes(s.id),
          label: s.label,
        }));
  return l(Pm, {
    get items() {
      return o();
    },
    get inputMenuItemLabel() {
      return h("New category");
    },
    get inputPlaceholder() {
      return h("Category label");
    },
    inputMaxLength: mS,
    onAdd: async (s) => {
      await t.subscriptions.methods
        .createCategoryAction(s)
        .catch(t.core.methods.reportErrorAction());
    },
    onChange: async (s) => {
      const c = n().find((u) => u.label === s.label);
      W(c),
        s.checked
          ? await t.subscriptions.methods
              .removeSubscriptionFromCategoryAction(c, e.subscription)
              .catch(t.core.methods.reportErrorAction())
          : await t.subscriptions.methods
              .addSubscriptionToCategoryAction(c, e.subscription)
              .catch(t.core.methods.reportErrorAction());
    },
  });
}
var ck = w("<form>"),
  Om = w("<div>"),
  uk = w("<div><div>"),
  dk = w("<h3>");
const gk = Hn(function () {
    let t;
    const [n, r] = N(""),
      [o, i] = N(),
      [a, s] = N(),
      [c, u] = N(!1),
      d = Y(se),
      {
        getIsBusy: g,
        getError: f,
        setError: m,
        execute: y,
      } = lt(async (E) => {
        i(void 0), s(void 0), u(!1);
        const P = await it("search", { text: E });
        if (P.ok)
          if ("feed" in P.result) s(P.result.feed);
          else {
            if (P.result.links.length === 0)
              return {
                errorMessage: h("This web page doesn't have an RSS feed."),
              };
            i(P.result.links);
          }
        else
          return {
            errorMessage: h("Failed to fetch page."),
            errorDetail: `HTTP Error ${P.httpStatus}: ${P.detail}`,
          };
      }),
      b = fk();
    Lt(() => {
      var M;
      const P =
        (M = new URLSearchParams(location.search).get("search")) == null
          ? void 0
          : M.trim();
      P && ((t.value = P), y(P).catch(d.core.methods.reportErrorAction()));
    }),
      Lt(() => {
        t.focus();
      });
    const v = (E) => {
        r(E.currentTarget.value.trim());
      },
      S = () => {
        r(""), m(), i(void 0), s(void 0), t.focus();
      },
      A = (E) => {
        E.preventDefault(), y(n()).catch(d.core.methods.reportErrorAction());
      },
      k = (E) => {
        r(E.url), y(E.url).catch(d.core.methods.reportErrorAction());
      },
      T = () => [
        l(ii, {}),
        l(Tr, {
          get children() {
            return h("Add feeds");
          },
        }),
      ];
    return (
      Kt(() => Yt(h("Discover"))),
      l(Lr, {
        renderTopBar: T,
        get children() {
          return l(Gt, {
            class: "pt-0",
            size: "medium",
            center: !0,
            get children() {
              return [
                (() => {
                  var E = ck();
                  return (
                    E.addEventListener("submit", A),
                    p(
                      E,
                      l(At, {
                        className: "my-0",
                        get placeholder() {
                          return h("Search by RSS link");
                        },
                        get inputProps() {
                          return {
                            ref: (P) => {
                              t = P;
                            },
                            type: "search",
                            name: "search",
                            value: n(),
                            disabled: g(),
                            required: !0,
                            onInput: v,
                            onChange: v,
                          };
                        },
                        get prefix() {
                          return l(cS, { size: 20 });
                        },
                        get suffix() {
                          return l(D, {
                            get when() {
                              return n();
                            },
                            get children() {
                              return l(Z, {
                                variant: "text",
                                type: "button",
                                size: "small",
                                get disabled() {
                                  return g() || !n();
                                },
                                get isLoading() {
                                  return g();
                                },
                                loadingSpinner: !0,
                                icon: so,
                                edge: "end",
                                onClick: S,
                              });
                            },
                          });
                        },
                        full: !0,
                      })
                    ),
                    $(() => I(E, b().searchForm)),
                    E
                  );
                })(),
                l(D, {
                  keyed: !0,
                  get when() {
                    return f();
                  },
                  children: (E) =>
                    l(Nt, {
                      severify: "error",
                      get actions() {
                        return (
                          L(() => !!E.errorDetail)() &&
                          l(Z, {
                            variant: "text",
                            size: "small",
                            onClick: () => u(!0),
                            get children() {
                              return h("Detail");
                            },
                          })
                        );
                      },
                      get children() {
                        return [
                          L(() => E.errorMessage),
                          l(D, {
                            get when() {
                              return c() && E.errorDetail;
                            },
                            get children() {
                              return l(j, {
                                variant: "bodySmall",
                                color: "error",
                                get children() {
                                  return E.errorDetail;
                                },
                              });
                            },
                          }),
                        ];
                      },
                    }),
                }),
                (() => {
                  var E = Om();
                  return (
                    p(
                      E,
                      l(D, {
                        keyed: !0,
                        get when() {
                          return o();
                        },
                        children: (P) =>
                          l(zn, {
                            get class() {
                              return b().feedLinks;
                            },
                            levelUp: 1,
                            shadow: !0,
                            get children() {
                              return l(Qe, {
                                each: P,
                                children: (M) => l(hk, { link: M, onClick: k }),
                              });
                            },
                          }),
                      }),
                      null
                    ),
                    p(
                      E,
                      l(D, {
                        keyed: !0,
                        get when() {
                          return a();
                        },
                        children: (P) => l(yk, { feed: P }),
                      }),
                      null
                    ),
                    $(() => I(E, b().searchResult)),
                    E
                  );
                })(),
                l(D, {
                  get when() {
                    return L(() => !n() && !o())() && !a();
                  },
                  get children() {
                    return l(j, {
                      color: "onSurfaceVariant",
                      align: "center",
                      get children() {
                        return [
                          L(() => h("Import sample feeds:")),
                          " ",
                          l(j, {
                            display: "inline",
                            color: "onSurfaceVariant",
                            align: "center",
                            get children() {
                              return l(Pe, {
                                href: "/import/featured/en",
                                get children() {
                                  return h("English");
                                },
                              });
                            },
                          }),
                          ", ",
                          l(j, {
                            display: "inline",
                            color: "onSurfaceVariant",
                            align: "center",
                            get children() {
                              return l(Pe, {
                                href: "/import/featured/zh-hans",
                                get children() {
                                  return h("Chinese");
                                },
                              });
                            },
                          }),
                        ];
                      },
                    });
                  },
                }),
              ];
            },
          });
        },
      })
    );
  }),
  fk = q((e) => ({
    searchForm: { flex: 1, display: "flex", marginBottom: "1rem" },
    searchResult: {},
    feedLinks: {
      margin: "1.5rem 0",
      overflow: "hidden",
      borderRadius: e.sharp.medium,
    },
  }));
function hk(e) {
  const t = mk(),
    n = Pt(),
    r = (o) => {
      o.preventDefault(), e.onClick(e.link);
    };
  return l(Ir, {
    component: "a",
    get class() {
      return t().root;
    },
    get layerBackground() {
      return n().color.primary;
    },
    get componentProps() {
      return { href: e.link.url, onClick: r };
    },
    get children() {
      return [
        (() => {
          var o = uk(),
            i = o.firstChild;
          return (
            p(
              o,
              (() => {
                var a = L(() => !!e.link.title);
                return () =>
                  a() &&
                  (() => {
                    var s = dk();
                    return (
                      p(s, () => e.link.title), $(() => I(s, t().title)), s
                    );
                  })();
              })(),
              i
            ),
            p(i, () => e.link.url),
            $(
              (a) => {
                var s = t().body,
                  c = t().url;
                return (
                  s !== a.e && I(o, (a.e = s)), c !== a.t && I(i, (a.t = c)), a
                );
              },
              { e: void 0, t: void 0 }
            ),
            o
          );
        })(),
        l(Rs, {
          get class() {
            return t().arrow;
          },
          size: 24,
        }),
      ];
    },
  });
}
const mk = q((e) => ({
  root: {
    padding: "0.75rem 0.75rem 0.75rem 1rem",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  body: {
    minWidth: 0,
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  arrow: { flexShrink: 0, color: e.color.onSurfaceVariant },
  title: {
    margin: "0 0 0.25rem",
    color: e.color.primary,
    ...e.typescale.titleMediumStyle,
  },
  url: {
    ...yn,
    color: e.color.onSurfaceVariant,
    ...e.typescale.labelMediumStyle,
  },
}));
function yk(e) {
  const t = Y(se),
    n = () => t.subscriptions.methods.getSubscriptionByFeedId(e.feed.id),
    r = at(),
    o = pk(),
    { getIsBusy: i, execute: a } = lt(async () => {
      await t.subscriptions.methods.addSubscriptionAction(e.feed.id);
    }),
    s = () => {
      n() || a().catch(t.core.methods.reportErrorAction());
    },
    c = () =>
      l(D, {
        keyed: !0,
        get when() {
          return n();
        },
        children: (u) => l(Vo, { children: () => l(_m, { subscription: u }) }),
      });
  return l(zn, {
    get class() {
      return o().root;
    },
    levelUp: 1,
    shadow: !0,
    get children() {
      return [
        l(j, {
          variant: "titleMedium",
          gutterBottom: !0,
          get children() {
            return L(() => !!e.feed.homePageUrl)()
              ? l(Pe, {
                  native: !0,
                  get href() {
                    return e.feed.homePageUrl;
                  },
                  target: "_blank",
                  get children() {
                    return e.feed.title;
                  },
                })
              : e.feed.title;
          },
        }),
        l(j, {
          color: "onSurfaceVariant",
          gutterBottom: !0,
          get children() {
            return e.feed.description;
          },
        }),
        l(j, {
          variant: "bodySmall",
          get children() {
            return l(Pe, {
              native: !0,
              get href() {
                return e.feed.feedUrl;
              },
              target: "_blank",
              get children() {
                return e.feed.feedUrl;
              },
            });
          },
        }),
        (() => {
          var u = Om();
          return (
            p(
              u,
              l(D, {
                keyed: !0,
                get when() {
                  return n();
                },
                get fallback() {
                  return l(Z, {
                    variant: "filled",
                    get isLoading() {
                      return i();
                    },
                    edge: "start",
                    onClick: s,
                    get children() {
                      return h("Subscribe");
                    },
                  });
                },
                children: (d) => [
                  l(Z, {
                    onClick: () => {
                      r(Rh(t, d.id));
                    },
                    get children() {
                      return h("View");
                    },
                  }),
                  l(Go, {
                    variant: "tonal",
                    iconAfter: nS,
                    renderDropdown: c,
                    get children() {
                      return h("Category");
                    },
                  }),
                ],
              })
            ),
            $(() => I(u, o().controls)),
            u
          );
        })(),
      ];
    },
  });
}
const pk = q((e) => ({
  root: { padding: "0.75rem 1rem", borderRadius: e.sharp.medium },
  controls: { marginTop: "1rem", display: "flex", alignItems: "center" },
}));
function vk(e) {
  const t = e.core.data.currentUser,
    n = [];
  n.push(
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<opml version="1.0">',
    "  <head>",
    `    <title>Subscriptions of ${dr(t.displayName)} (${dr(
      t.email
    )}) from QiReader [https://www.qireader.com]</title>`,
    "  </head>",
    "  <body>"
  );
  const r = e.subscriptions.data,
    o = (i, a) => {
      i.map((s) => {
        const c = r.subscriptions[s];
        W(c),
          n.push(
            `${new Array(a).fill(" ").join("")}<outline text="${dr(
              c.title
            )}" title="${dr(c.title)}" type="rss" xmlUrl="${dr(c.feedUrl)}" ${
              c.homePageUrl ? `htmlUrl="${dr(c.homePageUrl)}"` : ""
            } />`
          );
      });
    };
  return (
    e.subscriptions.uiSubscriptions().categorized.map((i) => {
      const a = r.categories[i[0]];
      W(a),
        n.push(`  <outline text="${dr(a.label)}" title="${dr(a.label)}">`),
        o(i[1], 4),
        n.push("  </outline>");
    }),
    o(e.subscriptions.uiSubscriptions().uncategorized, 2),
    n.push("  </body>", "</opml>"),
    n.join(`
`)
  );
}
function dr(e) {
  return e.replace(/[<>&'"]/g, function (t) {
    switch (t) {
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "&":
        return "&amp;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        W(!1);
    }
  });
}
var bk = w("<div style=margin-top:2rem>");
const wk = Hn(function () {
  const t = Y(se),
    n = () => {
      const o = vk(t);
      Sk(o, `QiReader subscriptions - ${new Date().toDateString()}.opml`);
    },
    r = () => [
      l(ii, {}),
      l(Tr, {
        get children() {
          return h("Export feeds");
        },
      }),
    ];
  return (
    Kt(() => Yt(h("Export OPML"))),
    l(Lr, {
      renderTopBar: r,
      get children() {
        return l(Gt, {
          size: "medium",
          get children() {
            return [
              l(j, {
                variant: "headlineMedium",
                gutterBottom: !0,
                get children() {
                  return h("Export OPML");
                },
              }),
              l(j, {
                color: "onSurfaceVariant",
                gutterBottom: !0,
                get children() {
                  return h(
                    "OPML (Outline Processor Markup Language) is a format which allows you to share the RSS sources you are following in your account with other applications."
                  );
                },
              }),
              (() => {
                var o = bk();
                return (
                  p(
                    o,
                    l(Z, {
                      variant: "filled",
                      onClick: n,
                      get children() {
                        return h("Download your OPML");
                      },
                    })
                  ),
                  o
                );
              })(),
            ];
          },
        });
      },
    })
  );
});
function Sk(e, t) {
  const n = document.createElement("a");
  document.body.appendChild(n), (n.style.display = "none");
  const r = new Blob([e], { type: "octet/stream" }),
    o = window.URL.createObjectURL(r);
  (n.href = o),
    (n.download = t),
    n.dispatchEvent(
      new MouseEvent("click", { bubbles: !0, cancelable: !0, view: window })
    ),
    setTimeout(() => {
      window.URL.revokeObjectURL(o), n.remove();
    }, 500);
}
const Ek = (e) => (t, n) => {
    const r = t.getData("text/uri-list");
    if (r) {
      (e.onUri || Oi)(r, n);
      return;
    }
    if (t.files && t.files.length) {
      (e.onFiles || Oi)(Array.from(t.files), n);
      return;
    }
    if ("clipboardData" in n) {
      const o = n.clipboardData.getData("text");
      (e.onText || Oi)(o, n);
      return;
    }
  },
  Ck = (e = {}) => {
    const [t, n] = N(!1),
      r = Ek(e),
      o = (d) => {
        d.preventDefault(), n(!0);
      },
      i = (d) => {
        d.preventDefault(), n(!0);
      },
      a = () => {
        n(!1);
      },
      s = () => {
        n(!1);
      },
      c = (d) => {
        d.preventDefault(), n(!1), r(d.dataTransfer, d);
      },
      u = (d) => {
        r(d.clipboardData, d);
      };
    return (
      Lt(() => {
        document.addEventListener("dragover", o),
          document.addEventListener("dragenter", i),
          document.addEventListener("dragleave", a),
          document.addEventListener("dragexit", s),
          document.addEventListener("drop", c),
          e.onText && document.addEventListener("paste", u);
      }),
      De(() => {
        document.removeEventListener("dragover", o),
          document.removeEventListener("dragenter", i),
          document.removeEventListener("dragleave", a),
          document.removeEventListener("dragexit", s),
          document.removeEventListener("drop", c),
          document.removeEventListener("paste", u);
      }),
      { isDragOver: t }
    );
  };
var Ak = w("<input type=file>");
function Ik(e) {
  let t;
  const n = xk(),
    r = (s) => {
      const c = s[0];
      if (
        ((e.namePattern && !e.namePattern.test(c.name)) ||
          (e.mimetypePattern && !e.mimetypePattern.test(c.type))) &&
        e.onUnsupportedFile
      ) {
        e.onUnsupportedFile(c);
        return;
      }
      e.onUpload(c);
    },
    o = () => {
      t.click();
    },
    i = (s) => {
      s.currentTarget.files && r(Array.from(s.currentTarget.files));
    },
    { isDragOver: a } = Ck({ onFiles: (s) => r(s) });
  return [
    (() => {
      var s = Ak();
      s.addEventListener("change", i);
      var c = t;
      return (
        typeof c == "function" ? tt(c, s) : (t = s),
        $(
          (u) => {
            var d = n().hidden,
              g = e.accept;
            return (
              d !== u.e && I(s, (u.e = d)),
              g !== u.t && Xe(s, "accept", (u.t = g)),
              u
            );
          },
          { e: void 0, t: void 0 }
        ),
        s
      );
    })(),
    l(zn, {
      get class() {
        return H(n().root, a() && n().dragOver);
      },
      levelUp: 2,
      get children() {
        return [
          l(Z, {
            variant: "filled",
            onClick: o,
            get children() {
              return e.buttonLabel;
            },
          }),
          l(j, {
            get class() {
              return n().hintText;
            },
            color: "onSurfaceVariant",
            get children() {
              return e.dragLabel;
            },
          }),
        ];
      },
    }),
  ];
}
const xk = q((e) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: "1rem 0",
    padding: "3rem 1rem",
    border: "2px dashed",
    borderColor: e.color.outlineVariant,
    borderRadius: e.sharp.medium,
  },
  hintText: { marginTop: "0.5rem" },
  dragOver: { borderColor: e.color.secondary },
  hidden: { display: "none" },
}));
var kk = w("<li><div></div><div>"),
  Fg = w("<ul>"),
  Tk = w("<li>"),
  Lk = w("<span>(<!>)"),
  Pk = w("<header><div>");
const Mk = Hn(function () {
  const t = Y(se),
    [n, r] = N(void 0),
    {
      getError: o,
      setError: i,
      getIsBusy: a,
      execute: s,
    } = lt(async (f) => {
      const m = await f.text(),
        y = await it("parseOpml", { opml: m });
      if (y.ok) r(y.result.items);
      else return h("Invalid OPML");
    }),
    c = (f) => {
      s(f).catch(t.core.methods.reportErrorAction());
    },
    u = () => {
      i(h("File type not supported!"));
    },
    d = () => {
      r(void 0);
    },
    g = () => [
      l(ii, {}),
      l(Tr, {
        get children() {
          return h("Import feeds");
        },
      }),
    ];
  return (
    Kt(() => Yt(h("Import feeds"))),
    l(Lr, {
      renderTopBar: g,
      get loading() {
        return a();
      },
      autoFocus: !0,
      get children() {
        return l(Gt, {
          size: "medium",
          center: !0,
          get children() {
            return [
              l(D, {
                keyed: !0,
                get when() {
                  return o();
                },
                children: (f) => l(Nt, { severify: "error", children: f }),
              }),
              l(D, {
                get when() {
                  return !a();
                },
                get children() {
                  return l(D, {
                    keyed: !0,
                    get when() {
                      return n();
                    },
                    get fallback() {
                      return l(Ik, {
                        get buttonLabel() {
                          return h("Choose OPML file");
                        },
                        get dragLabel() {
                          return h("or drag an OPML file here");
                        },
                        accept: ".opml,.xml,text/*",
                        onUpload: c,
                        onUnsupportedFile: u,
                      });
                    },
                    children: (f) => l(Nm, { rssItems: f, onClose: d }),
                  });
                },
              }),
            ];
          },
        });
      },
    })
  );
});
function Nm(e) {
  const t = Y(se),
    [n, r] = N(!1);
  let o;
  const [i, a] = Un({});
  function s(E) {
    var P;
    return (P = i[E]) != null ? P : 0;
  }
  function c(E) {
    const P = Object.values(t.subscriptions.data.subscriptions).map(
      (M) => M.feedUrl
    );
    a(Object.fromEntries(E.map((M) => [M.url, P.includes(M.url) ? 1 : 0])));
  }
  function u() {
    a(
      ut((E) => {
        for (const [P, M] of Object.entries(E)) M === 0 && (E[P] = 3);
      })
    );
  }
  function d() {
    a(
      ut((E) => {
        for (const [P, M] of Object.entries(E)) M === 3 && (E[P] = 0);
      })
    );
  }
  function g(E) {
    var x;
    const P = (x = i[E.url]) != null ? x : 0,
      M = P === 0 || P === 4 ? 3 : P;
    a(E.url, M);
  }
  function f(E, P) {
    a(E.url, P);
  }
  async function m(E) {
    if (E.find((M) => s(M.url) === 2)) return;
    const P = E.find((M) => s(M.url) === 3);
    if (P)
      return (
        f(P, 2),
        t.subscriptions.methods
          .importRssItemAction(P)
          .then(({ httpStatus: M, subscription: x }) => {
            x ? f(P, 1) : M === Ui ? (f(P, 0), d()) : f(P, 4);
          })
          .catch((M) => {
            throw (f(P, 4), M);
          })
      );
  }
  c(e.rssItems);
  const y = L(
      () => e.rssItems.length - Object.values(i).filter((E) => E === 1).length
    ),
    b = L(() => e.rssItems.find((E) => s(E.url) === 3)),
    v = (E) => {
      r(!1), g(E);
    },
    S = () => {
      r(!0), u();
    },
    A = () => {
      r(!1), d();
    };
  ie(() => {
    m(e.rssItems).catch(t.core.methods.reportErrorAction()),
      n() &&
        setTimeout(() => {
          const E = Object.entries(i).find(([P, M]) => M === 2);
          if (E) {
            const P = o.querySelector(`[data-url="${E[0]}"]`);
            P && Cv(P);
          }
        }, 100);
  });
  const k = $k(),
    T = (E) => {
      const P = () => s(E.url);
      return (() => {
        var M = kk(),
          x = M.firstChild,
          _ = x.nextSibling;
        return (
          p(
            x,
            l(j, {
              variant: "titleSmall",
              get children() {
                return E.text;
              },
            }),
            null
          ),
          p(
            x,
            l(j, {
              get class() {
                return k().itemUrl;
              },
              variant: "bodySmall",
              color: "onSurfaceVariant",
              get children() {
                return l(Pe, {
                  get href() {
                    return E.url;
                  },
                  color: "inherit",
                  textDecoration: !1,
                  openInNew: !0,
                  openInNewMark: !1,
                  get children() {
                    return E.url;
                  },
                });
              },
            }),
            null
          ),
          p(
            x,
            (() => {
              var R = L(() => !!E.categories.length);
              return () =>
                R()
                  ? (() => {
                      var z = Fg();
                      return (
                        p(
                          z,
                          l(Qe, {
                            get each() {
                              return E.categories;
                            },
                            children: (J) =>
                              (() => {
                                var ne = Tk();
                                return (
                                  p(ne, J), $(() => I(ne, k().categoryItem)), ne
                                );
                              })(),
                          })
                        ),
                        $(() => I(z, k().categoryList)),
                        z
                      );
                    })()
                  : null;
            })(),
            null
          ),
          p(
            _,
            l(qo, {
              get children() {
                return [
                  l(kt, {
                    get when() {
                      return P() === 0;
                    },
                    get children() {
                      return l(Z, {
                        variant: "tonal",
                        get onClick() {
                          return v.bind(void 0, E);
                        },
                        size: "small",
                        edge: "end",
                        get children() {
                          return h("Import");
                        },
                      });
                    },
                  }),
                  l(kt, {
                    get when() {
                      return P() === 2;
                    },
                    get children() {
                      return l(ao, { size: 20 });
                    },
                  }),
                  l(kt, {
                    get when() {
                      return P() === 3;
                    },
                    get children() {
                      return l(Gw, {
                        get class() {
                          return k().queuingIcon;
                        },
                        size: 20,
                      });
                    },
                  }),
                  l(kt, {
                    get when() {
                      return P() === 1;
                    },
                    get children() {
                      return l(su, {
                        get class() {
                          return k().doneIcon;
                        },
                        size: 20,
                      });
                    },
                  }),
                  l(kt, {
                    get when() {
                      return P() === 4;
                    },
                    get children() {
                      return l(Z, {
                        get onClick() {
                          return v.bind(void 0, E);
                        },
                        size: "small",
                        color: "error",
                        edge: "end",
                        get children() {
                          return h("Error");
                        },
                      });
                    },
                  }),
                ];
              },
            })
          ),
          $(
            (R) => {
              var z = k().item,
                J = E.url,
                ne = k().itemInfo,
                G = k().itemControls;
              return (
                z !== R.e && I(M, (R.e = z)),
                J !== R.t && Xe(M, "data-url", (R.t = J)),
                ne !== R.a && I(x, (R.a = ne)),
                G !== R.o && I(_, (R.o = G)),
                R
              );
            },
            { e: void 0, t: void 0, a: void 0, o: void 0 }
          ),
          M
        );
      })();
    };
  return [
    (() => {
      var E = Pk(),
        P = E.firstChild;
      return (
        p(
          E,
          l(j, {
            get class() {
              return k().headerText;
            },
            variant: "headlineMedium",
            get children() {
              return [
                L(() => h("New feeds")),
                " ",
                (() => {
                  var M = Lk(),
                    x = M.firstChild,
                    _ = x.nextSibling;
                  return (
                    _.nextSibling, p(M, y, _), $(() => I(M, k().numNewItems)), M
                  );
                })(),
              ];
            },
          }),
          P
        ),
        p(
          P,
          (() => {
            var M = L(() => !!b());
            return () =>
              M()
                ? l(Z, {
                    variant: "filled",
                    color: "error",
                    onClick: A,
                    get children() {
                      return h("Stop all");
                    },
                  })
                : l(Z, {
                    variant: "filled",
                    get disabled() {
                      return y() === 0;
                    },
                    onClick: S,
                    get children() {
                      return h("Import all");
                    },
                  });
          })(),
          null
        ),
        p(
          P,
          l(Z, {
            variant: "tonal",
            icon: so,
            color: "neutral",
            get onClick() {
              return e.onClose;
            },
          }),
          null
        ),
        $(
          (M) => {
            var x = k().header,
              _ = k().headerControls;
            return (
              x !== M.e && I(E, (M.e = x)), _ !== M.t && I(P, (M.t = _)), M
            );
          },
          { e: void 0, t: void 0 }
        ),
        E
      );
    })(),
    (() => {
      var E = Fg(),
        P = o;
      return (
        typeof P == "function" ? tt(P, E) : (o = E),
        p(
          E,
          l(Qe, {
            get each() {
              return e.rssItems;
            },
            children: T,
          })
        ),
        $(() => I(E, k().list)),
        E
      );
    })(),
  ];
}
const $k = q((e) => ({
    header: {
      position: "sticky",
      top: je,
      padding: "0.5rem 0 1rem",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-between",
      alignItems: "center",
      background: e.color.surface,
      zIndex: kr.APP_BAR,
    },
    headerText: {},
    numNewItems: { fontWeight: 400, color: e.color.onSurfaceHint },
    headerControls: { display: "flex", alignItems: "center" },
    list: {
      padding: 0,
      listStyle: "none",
      border: `1px solid ${e.color.outlineVariant}`,
      borderRadius: e.sharp.medium,
    },
    item: {
      display: "flex",
      margin: 0,
      padding: "0.75rem 1rem 0.75rem 0.75rem",
      borderBottom: `1px solid ${e.color.outlineVariant}`,
      ":last-child": { borderBottom: "none" },
    },
    itemInfo: { flex: 1, overflow: "hidden" },
    itemUrl: { wordBreak: "break-all" },
    itemControls: {
      flexShrink: 0,
      minWidth: "5rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    categoryList: {
      listStyle: "none",
      margin: "0.25rem 0 0",
      padding: 0,
      ...e.typescale.labelMediumStyle,
    },
    categoryItem: {
      display: "inline-block",
      marginRight: "0.25rem",
      padding: "0.125rem 0.5rem",
      border: `1px solid ${e.color.outline}`,
      color: e.color.onSurface,
      borderRadius: 1e3,
    },
    doneIcon: { color: e.color.secondary },
    queuingIcon: { color: e.color.onSurfaceVariant },
  })),
  Rk = Hn(function () {
    const t = Y(se),
      n = ro();
    if (!n.feedSet) return l(to, {});
    const [r, o] = N(),
      [i, a] = N(!1),
      s = at(),
      c = () => {
        s("/");
      };
    return (
      Kt(() => Yt(h("Import feeds"))),
      ie(
        pe(
          () => n.feedSet,
          () => {
            a(!0),
              o(void 0),
              Le("getFeaturedFeeds", { feedSet: n.feedSet })
                .then((d) => {
                  o(d.items);
                })
                .catch(t.core.methods.reportErrorAction())
                .finally(() => {
                  a(!1);
                });
          }
        )
      ),
      l(Lr, {
        renderTopBar: () => [
          l(ii, {}),
          l(Tr, {
            get children() {
              return h("Import feeds");
            },
          }),
        ],
        get loading() {
          return i();
        },
        get children() {
          return l(Gt, {
            size: "medium",
            center: !0,
            get children() {
              return l(D, {
                keyed: !0,
                get when() {
                  return r();
                },
                children: (d) => l(Nm, { rssItems: d, onClose: c }),
              });
            },
          });
        },
      })
    );
  });
var Dk = w("<div><div>");
function _k(e) {
  const t = Ok();
  function n(r) {
    e.onChange(r);
  }
  return (() => {
    var r = Dk(),
      o = r.firstChild;
    return (
      p(
        o,
        l(Qe, {
          get each() {
            return e.items;
          },
          children: (i) =>
            l(Z, {
              get class() {
                return H(t().item);
              },
              get variant() {
                return i.value === e.value ? "filled" : "text";
              },
              size: "small",
              get onClick() {
                return n.bind(void 0, i.value);
              },
              get children() {
                return i.label;
              },
            }),
        })
      ),
      $(
        (i) => {
          var a = H(t().root, e.center && t().center, e.className),
            s = t().inner;
          return a !== i.e && I(r, (i.e = a)), s !== i.t && I(o, (i.t = s)), i;
        },
        { e: void 0, t: void 0 }
      ),
      r
    );
  })();
}
const Ok = q((e) => ({
  root: { margin: "1rem 0", display: "flex" },
  center: { justifyContent: "center" },
  inner: {
    padding: 4,
    background: e.color.surfaceVariant,
    borderRadius: e.sharp.full,
    whiteSpace: "nowrap",
  },
  item: {
    margin: "0 0.125rem",
    borderRadius: e.sharp.full,
    ":first-child": { marginLeft: 0 },
    ":last-child": { marginRight: 0 },
  },
}));
var Nk = w(
    "<form method=post target=_top><input type=hidden name=hosted_button_id><input type=hidden name=cmd value=_s-xclick><input type=hidden name=return><input type=hidden name=cancel_return><input type=hidden name=custom>"
  ),
  Yl = w("<div><span>"),
  Fk = w(
    "<div><div><div><span></span></div><div style=display:none></div><div style=display:none>"
  ),
  Bk = w("<p>"),
  ql = w("<div>"),
  Uk = w("<span>"),
  zk = w("<form method=post><div>"),
  Hk = w("<img src=/weixin-pay-qrcode.png>"),
  Vk = w(
    "<strong> 付款留言处填写你在本站的登录邮箱（受字数限制没填写完整也可）：<b>"
  ),
  Xl = w("<br>"),
  Wk = w(
    '<a href="https://store.lizhi.io/site/products/id/587?cid=i8bxw12r"target=_blank rel=nofollow><img src=/lizhi-store.svg style=vertical-align:middle width=140 height=52>'
  ),
  Gk = w("<b><code>weijarz"),
  jk = w("<div style=text-align:center>");
const Yk = {
  [nt.FREE]: h("Basic"),
  [nt.PRO]: h("Pro"),
  [nt.PRO_PLUS]: h("Pro+"),
};
function qk() {
  var G, Q, ye;
  const e = Y(se),
    [t, n] = N(!1),
    [r, o] = N(""),
    i = () => e.core.data.currentUser,
    a = Ef((G = i()) == null ? void 0 : G.email),
    [s, c] = N(
      ((Q = i()) == null ? void 0 : Q.payMethod) === fn.PAYPAL
        ? !1
        : ((ye = i()) == null ? void 0 : ye.payMethod) === fn.MANUAL
        ? !0
        : a
    ),
    u = () => (s() ? fn.MANUAL : fn.PAYPAL),
    [d, g] = N(u() === fn.PAYPAL ? _t.QUARTERLY : _t.M12),
    [f, m] = N(!1),
    y = Xk(),
    b = [
      { label: h("Quarterly"), value: _t.QUARTERLY },
      { label: h("Annual"), value: _t.ANNUAL },
    ],
    v = [
      { label: "一年", value: _t.M12 },
      { label: "二年", value: _t.M24 },
      { label: "五年", value: _t.M60 },
    ],
    S = `${document.location.origin}/api/paypal-pdt`,
    A = `${document.location.origin}/plans`,
    k = (B) => {
      g(B);
    },
    T = (B) => {
      const le = B.currentTarget.checked;
      c(le), g(le ? _t.M12 : _t.QUARTERLY);
    },
    {
      getIsBusy: E,
      getError: P,
      execute: M,
    } = lt(async () => {
      const B = await e.core.methods.redeemAction(r());
      if (B === "USER_NOT_EXPIRED") return "当前套餐未过期。";
      if (B === "INVALID_CODE") return "无效的兑换码。";
      if (B === "BEEN_USED") return "兑换码已被使用。";
      if (B) throw new Error(B);
      o(""),
        n(!1),
        e.core.methods
          .refetchCurrentUserAction()
          .catch(e.core.methods.reportErrorAction()),
        e.core.methods.notifySuccess("账号升级成功！");
    }),
    x = (B) => {
      o(B.currentTarget.value);
    },
    _ = (B) => {
      B.preventDefault(), M().catch(e.core.methods.reportErrorAction());
    },
    R = l(ke, {
      center: !0,
      get children() {
        return l(wn, {
          inline: !0,
          get checked() {
            return s();
          },
          onChange: T,
          get children() {
            return [
              " ",
              L(() => (L(() => !!cc())() ? "我是中国用户" : h("China user"))),
            ];
          },
        });
      },
    }),
    z = cc() || a;
  Ou(),
    Lt(() => {
      e.core.methods
        .refetchCurrentUserAction()
        .catch(e.core.methods.reportErrorAction());
    });
  const J = (B) => (
      W(i()),
      (() => {
        var le = Nk(),
          Se = le.firstChild,
          Ie = Se.nextSibling,
          ae = Ie.nextSibling,
          Ce = ae.nextSibling,
          we = Ce.nextSibling;
        return (
          Xe(le, "action", `${Ud}/cgi-bin/webscr`),
          (ae.value = S),
          (Ce.value = A),
          p(
            le,
            l(Z, {
              type: "submit",
              name: "submit",
              get children() {
                return h("Upgrade");
              },
            }),
            null
          ),
          $(
            () =>
              (Se.value =
                d() === _t.QUARTERLY
                  ? B.paypalButtonIdBilledQuarterly
                  : B.paypalButtonIdBilledAnnual)
          ),
          $(() => (we.value = i().id)),
          le
        );
      })()
    ),
    ne = (B) =>
      (() => {
        var le = Fk(),
          Se = le.firstChild,
          Ie = Se.firstChild,
          ae = Ie.firstChild,
          Ce = Ie.nextSibling,
          we = Ce.nextSibling;
        return (
          p(
            le,
            l(j, {
              variant: "titleLarge",
              gutterBottom: !0,
              get color() {
                return B.type === nt.FREE ? "onSurface" : "orange";
              },
              get children() {
                return Yk[B.type];
              },
            }),
            Se
          ),
          p(
            le,
            (() => {
              var te = L(() => B.priceBilledQuarterly === "0");
              return () =>
                te()
                  ? (() => {
                      var be = Bk();
                      return (
                        p(be, () => h("Free")),
                        $(() => I(be, H(y().price, y().priceFree))),
                        be
                      );
                    })()
                  : (() => {
                      var be = ql();
                      return (
                        p(
                          be,
                          (() => {
                            var fe = L(() => !!s());
                            return () =>
                              fe()
                                ? (() => {
                                    var re = L(() => d() === _t.M12);
                                    return () =>
                                      re()
                                        ? `一年 ￥${B.priceChina12Months}`
                                        : d() === _t.M24
                                        ? `二年 ￥${B.priceChina24Months}`
                                        : `五年 ￥${B.priceChina60Months}`;
                                  })()
                                : [
                                    "$",
                                    L(() =>
                                      d() === _t.QUARTERLY
                                        ? B.priceBilledQuarterly
                                        : B.priceBilledAnnual
                                    ),
                                    (() => {
                                      var re = Uk();
                                      return (
                                        p(re, () => h("/month")),
                                        $(() => I(re, y().priceUnit)),
                                        re
                                      );
                                    })(),
                                  ];
                          })()
                        ),
                        $(() => I(be, y().price)),
                        be
                      );
                    })();
            })(),
            Se
          ),
          p(
            Ie,
            l(Ea, {
              size: 20,
              get class() {
                return y().featureCheckMark;
              },
            }),
            ae
          ),
          p(ae, () => h("Up to %s feeds", B.feeds)),
          p(
            Se,
            l(D, {
              get when() {
                return B.type === nt.FREE;
              },
              get children() {
                var te = Yl(),
                  be = te.firstChild;
                return (
                  p(
                    te,
                    l(Ea, {
                      size: 20,
                      get class() {
                        return y().featureCheckMark;
                      },
                    }),
                    be
                  ),
                  p(be, () => h("Maximum of %s articles in one eBook", 5)),
                  $(
                    (fe) => {
                      var re = y().feature,
                        Be = y().featureText;
                      return (
                        re !== fe.e && I(te, (fe.e = re)),
                        Be !== fe.t && I(be, (fe.t = Be)),
                        fe
                      );
                    },
                    { e: void 0, t: void 0 }
                  ),
                  te
                );
              },
            }),
            Ce
          ),
          p(
            Se,
            l(D, {
              get when() {
                return B.type === nt.PRO;
              },
              get children() {
                var te = Yl(),
                  be = te.firstChild;
                return (
                  p(
                    te,
                    l(Ea, {
                      size: 20,
                      get class() {
                        return y().featureCheckMark;
                      },
                    }),
                    be
                  ),
                  p(be, () => h("Maximum of %s articles in one eBook", 50)),
                  $(
                    (fe) => {
                      var re = y().feature,
                        Be = y().featureText;
                      return (
                        re !== fe.e && I(te, (fe.e = re)),
                        Be !== fe.t && I(be, (fe.t = Be)),
                        fe
                      );
                    },
                    { e: void 0, t: void 0 }
                  ),
                  te
                );
              },
            }),
            Ce
          ),
          p(
            Se,
            l(D, {
              get when() {
                return B.type === nt.PRO_PLUS;
              },
              get children() {
                var te = Yl(),
                  be = te.firstChild;
                return (
                  p(
                    te,
                    l(Ea, {
                      size: 20,
                      get class() {
                        return y().featureCheckMark;
                      },
                    }),
                    be
                  ),
                  p(be, () => h("Maximum of %s articles in one eBook", 300)),
                  $(
                    (fe) => {
                      var re = y().feature,
                        Be = y().featureText;
                      return (
                        re !== fe.e && I(te, (fe.e = re)),
                        Be !== fe.t && I(be, (fe.t = Be)),
                        fe
                      );
                    },
                    { e: void 0, t: void 0 }
                  ),
                  te
                );
              },
            }),
            Ce
          ),
          p(
            Ce,
            (() => {
              var te = L(() => !!B.imageProxy);
              return () => (te() ? ["✓ ", L(() => h("Image proxy"))] : void 0);
            })()
          ),
          p(
            we,
            (() => {
              var te = L(() => !!B.premiumFonts);
              return () =>
                te() ? ["✓ ", L(() => h("Premium fonts"))] : void 0;
            })()
          ),
          p(
            le,
            l(D, {
              keyed: !0,
              get when() {
                return (
                  L(() => {
                    var te;
                    return (
                      B.type !== nt.FREE && !((te = i()) != null && te.isDemo)
                    );
                  })() && i()
                );
              },
              children: (te) =>
                l(D, {
                  get when() {
                    return te.plan === nt.FREE;
                  },
                  get fallback() {
                    return l(D, {
                      get when() {
                        return te.plan === B.type;
                      },
                      get fallback() {
                        return l(D, {
                          get when() {
                            return (
                              te.payMethod === fn.PAYPAL && te.isPlanCancelled
                            );
                          },
                          get children() {
                            return J(B);
                          },
                        });
                      },
                      get children() {
                        return [
                          (() => {
                            var be = ql();
                            return (
                              p(be, () => h("Your plan")),
                              $(() => I(be, y().activeLabel)),
                              be
                            );
                          })(),
                          l(D, {
                            get when() {
                              return (
                                (te.payMethod === fn.PAYPAL &&
                                  te.isPlanCancelled) ||
                                te.payMethod === fn.MANUAL
                              );
                            },
                            get children() {
                              return l(j, {
                                variant: "labelSmall",
                                color: "green",
                                align: "center",
                                gutterBottom: !0,
                                get children() {
                                  return (
                                    L(() => !!te.planEndedAt)() &&
                                    h(
                                      "Expires on %s",
                                      Mh.format(te.planEndedAt)
                                    )
                                  );
                                },
                              });
                            },
                          }),
                          l(D, {
                            get when() {
                              return te.payMethod === fn.PAYPAL;
                            },
                            get fallback() {
                              return l(j, {
                                align: "center",
                                get children() {
                                  return l(Z, {
                                    variant: "text",
                                    color: "primary",
                                    size: "small",
                                    onClick: () => {
                                      m(!0);
                                    },
                                    children: "延期",
                                  });
                                },
                              });
                            },
                            get children() {
                              return l(D, {
                                get when() {
                                  return !te.isPlanCancelled;
                                },
                                get children() {
                                  return l(Pe, {
                                    style:
                                      "margin-top: 0.25rem; font-size: 14px",
                                    get href() {
                                      return `${Ud}/cgi-bin/webscr?cmd=_subscr-find&alias=${
                                        d() === _t.QUARTERLY
                                          ? B.paypalCancelIdBilledQuarterly
                                          : B.paypalCancelIdBilledAnnual
                                      }`;
                                    },
                                    native: !0,
                                    get children() {
                                      return h("Cancel");
                                    },
                                  });
                                },
                              });
                            },
                          }),
                        ];
                      },
                    });
                  },
                  get children() {
                    return l(D, {
                      get when() {
                        return u() === fn.PAYPAL;
                      },
                      get fallback() {
                        return l(Z, {
                          onClick: () => {
                            m(!0);
                          },
                          get children() {
                            return h("Upgrade");
                          },
                        });
                      },
                      get children() {
                        return J(B);
                      },
                    });
                  },
                }),
            }),
            null
          ),
          $(
            (te) => {
              var be = y().plan,
                fe = y().featureList,
                re = y().feature,
                Be = y().featureText;
              return (
                be !== te.e && I(le, (te.e = be)),
                fe !== te.t && I(Se, (te.t = fe)),
                re !== te.a && I(Ie, (te.a = re)),
                Be !== te.o && I(ae, (te.o = Be)),
                te
              );
            },
            { e: void 0, t: void 0, a: void 0, o: void 0 }
          ),
          le
        );
      })();
  return [
    l(ai, {
      get children() {
        return l(Gt, {
          center: !0,
          get children() {
            return [
              l(j, {
                variant: "headlineLarge",
                align: "center",
                gutterBottom: !0,
                get children() {
                  return h("Choose your plan");
                },
              }),
              l(j, {
                variant: "labelMedium",
                style: "margin-bottom: 2rem",
                color: "onSurfaceHint",
                align: "center",
                get children() {
                  return h("Save over 20% when you select annual billing");
                },
              }),
              z && R,
              l(_k, {
                get value() {
                  return d();
                },
                get items() {
                  return s() ? v : b;
                },
                center: !0,
                onChange: k,
              }),
              (() => {
                var B = ql();
                return (
                  p(
                    B,
                    l(Qe, {
                      get each() {
                        return Object.values(WS);
                      },
                      children: (le) => ne(le),
                    })
                  ),
                  $(() => I(B, y().planList)),
                  B
                );
              })(),
              !z && R,
              l(j, {
                variant: "bodySmall",
                align: "center",
                color: "onSurfaceVariant",
                get children() {
                  return h(
                    "We support payments via Paypal, Alipay, and Weixin."
                  );
                },
              }),
              l(D, {
                get when() {
                  var B;
                  return (B = i()) == null ? void 0 : B.isDemo;
                },
                get children() {
                  return l(j, {
                    variant: "bodySmall",
                    align: "center",
                    color: "error",
                    get children() {
                      return [
                        "⚠️ ",
                        L(() =>
                          h(
                            "This is a demo account and does not support upgrade plans."
                          )
                        ),
                      ];
                    },
                  });
                },
              }),
              l(D, {
                get when() {
                  return L(() => !!t())() && s();
                },
                get fallback() {
                  return l(ke, {
                    center: !0,
                    get children() {
                      return l(D, {
                        get when() {
                          var B;
                          return (
                            L(() => !!(i() && s()))() &&
                            !((B = i()) != null && B.isDemo)
                          );
                        },
                        get children() {
                          return l(Z, {
                            variant: "text",
                            size: "small",
                            onClick: () => {
                              n(!0);
                            },
                            get children() {
                              return h("Use redeem code");
                            },
                          });
                        },
                      });
                    },
                  });
                },
                get children() {
                  return l(ke, {
                    center: !0,
                    get children() {
                      var B = zk(),
                        le = B.firstChild;
                      return (
                        B.addEventListener("submit", _),
                        le.style.setProperty("margin-bottom", "0.25rem"),
                        le.style.setProperty("display", "flex"),
                        le.style.setProperty("justify-content", "center"),
                        le.style.setProperty("align-items", "center"),
                        p(
                          le,
                          l(At, {
                            placeholder: "兑换码",
                            outlined: !0,
                            get inputProps() {
                              return {
                                style: { width: "12rem" },
                                value: r(),
                                required: !0,
                                maxLength: 18,
                                onInput: x,
                                onChange: x,
                              };
                            },
                            get suffix() {
                              return l(Z, {
                                variant: "text",
                                type: "submit",
                                size: "small",
                                edge: "end",
                                get isLoading() {
                                  return E();
                                },
                                children: "兑换",
                              });
                            },
                          })
                        ),
                        p(
                          B,
                          l(D, {
                            get when() {
                              return P();
                            },
                            get children() {
                              return l(j, {
                                variant: "bodySmall",
                                color: "error",
                                get children() {
                                  return P();
                                },
                              });
                            },
                          }),
                          null
                        ),
                        B
                      );
                    },
                  });
                },
              }),
              l(Gs, {}),
            ];
          },
        });
      },
    }),
    l(Jt, {
      get on() {
        return f();
      },
      get children() {
        return l(Ph, {
          title: "付款",
          get isShown() {
            return f();
          },
          width: 640,
          onClose: () => {
            m(!1);
          },
          get children() {
            return [
              (() => {
                var B = Hk();
                return $(() => I(B, y().qrcode)), B;
              })(),
              (() => {
                var B = jk();
                return (
                  p(
                    B,
                    l(j, {
                      color: "onSurfaceVariant",
                      paragraph: !0,
                      gutterBottom: !0,
                      children: "微信扫上面的收款码， 付相应的金额",
                    }),
                    null
                  ),
                  p(
                    B,
                    l(j, {
                      color: "error",
                      paragraph: !0,
                      gutterBottom: !0,
                      get children() {
                        var le = Vk(),
                          Se = le.firstChild,
                          Ie = Se.nextSibling;
                        return (
                          p(
                            le,
                            l(rs, {
                              style: "vertical-align: bottom",
                              get class() {
                                return y().blink;
                              },
                              size: 24,
                            }),
                            Se
                          ),
                          p(Ie, () => i().email),
                          le
                        );
                      },
                    }),
                    null
                  ),
                  p(
                    B,
                    l(j, {
                      color: "onSurfaceVariant",
                      paragraph: !0,
                      gutterBottom: !0,
                      get children() {
                        return ["或从合作方购买", Xl(), Wk()];
                      },
                    }),
                    null
                  ),
                  p(
                    B,
                    l(j, {
                      variant: "bodySmall",
                      color: "onSurfaceVariant",
                      paragraph: !0,
                      get children() {
                        return [
                          "不方便扫码的用户或支付宝用户可加客服微信",
                          " ",
                          Gk(),
                          " ",
                          "发红包并留言登录邮箱。",
                          Xl(),
                          "国外微信用户可能无法扫码付款，可以添加微信发红包。",
                          Xl(),
                          "你的账号一般会在半小时内升级，如果八小时内没有升级请联系微信客服。",
                        ];
                      },
                    }),
                    null
                  ),
                  B
                );
              })(),
            ];
          },
        });
      },
    }),
  ];
}
const Xk = q((e) => ({
  planList: {
    margin: "1.5rem 0",
    display: "flex",
    alignItems: "stretch",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1.5rem",
    [vr]: { flexDirection: "column", alignItems: "center" },
  },
  plan: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "14rem",
    padding: "1rem 1rem",
    background: e.surface(1),
    borderRadius: e.sharp.medium,
    ...e.elevationShadowStyle(3),
    [vr]: { width: "100%", maxWidth: "20rem" },
  },
  price: {
    margin: "0.5rem 0 0",
    textAlign: "center",
    ...e.typescale.labelLargeStyle,
  },
  priceFree: {},
  priceUnit: {
    marginLeft: "0.25rem",
    color: e.color.onSurfaceVariant,
    ...e.typescale.labelSmallStyle,
  },
  featureList: {
    flex: 1,
    alignSelf: "stretch",
    margin: "1rem 0 1rem",
    color: e.color.onSurfaceVariant,
    ...e.typescale.bodyMediumStyle,
  },
  activeLabel: {
    alignSelf: "stretch",
    padding: "0.5rem",
    marginBottom: "0.25rem",
    background: e.color.orangeContainer,
    color: e.color.onOrangeContainer,
    textAlign: "center",
    borderRadius: e.sharp.small,
    ...e.typescale.labelLargeStyle,
  },
  feature: { display: "flex", gap: "0.5rem", marginBottom: "0.25rem" },
  featureCheckMark: {
    flexShrink: 0,
    marginTop: 2,
    color: xt(e.palette.green.tone(e.type === pr.LIGHT ? 70 : 50)),
  },
  featureText: { flex: 1 },
  qrcode: {
    display: "block",
    margin: "0 auto 1rem",
    width: "100%",
    maxWidth: 220,
    borderRadius: e.sharp.medium,
  },
  blink: {
    animation: "blinker 0.6s cubic-bezier(1, 0, 0, 1) infinite alternate",
  },
}));
Ft(`
  @keyframes blinker { to { opacity: 0; } }
`);
var Kk = w("<h2>We keep your private information private"),
  Zk = w("<h2>Information we collect"),
  Qk = w("<h4>Basic Information"),
  Jk = w("<h4>User generated information"),
  eT = w("<h4>Log Data"),
  tT = w("<h2>Cookies"),
  nT = w("<h2>Analytics"),
  rT = w("<a href=https://umami.is/ rel=nofollow target=_blank>Umami"),
  oT = w("<h2>Third party services"),
  iT = w("<h2>How do we use your information"),
  aT = w("<h4>Provide, personalize and improve QiReader"),
  sT = w("<h4>Communicate with You"),
  lT = w("<h2>Sharing of information"),
  cT = w("<h2>Security of information"),
  uT = w("<h2>Your rights");
function dT() {
  return (
    Kt(() => Yt(h("Privacy Policy"))),
    l(ai, {
      get children() {
        return l(Gt, {
          size: "medium",
          center: !0,
          get children() {
            return [
              l(j, {
                class: "mb-10",
                variant: "displayLarge",
                align: "center",
                get children() {
                  return h("Privacy Policy");
                },
              }),
              Kk(),
              "When you use QiReader, you’re trusting us with some of your information. We understand that this is a big responsibility and we work hard to protect your information and put you in control. This Privacy Policy is meant to help you understand what information we collect, why we collect it and how you can update, manage, export and delete your information. Last updated: 15 August 2023",
              Zk(),
              "We collect information to run the service, prevent abuse, and to provide better products to all our users.",
              Qk(),
              "To register as a user with QiReader, you will be asked to sign in using your email address. Your email address will be used for identification purposes and is linked to your QiReader account across all devices where you use QiReader.",
              Jk(),
              "When you use QiReader you will naturally create data, in the form of your feeds, preferences, folders, starred posts, and similar things. These are stored on QiReader’s servers, and may be able to identify you personally.",
              eT(),
              "Using QiReader creates log data. This data is used to debug issues and provider customer support. This Log Data may include information such as your device IP address, device name, operating system version, the time and date of your use of the Service, and other statistics.",
              tT(),
              "We use a cookie in the browser to authenticate your API requests.",
              nT(),
              "We use the open source",
              " ",
              rT(),
              " ",
              "for analytics. We do not share our analytics data with third parties.",
              oT(),
              "The app does use third-party services that may collect information used to identify you. - Paypal.com",
              iT(),
              aT(),
              "We use the information we have to develop, test and improve QiReader.",
              sT(),
              "We may use your email address to communicate with you about QiReader, let you know about changes to our policies and terms, ask your feedback, and timely report any possible security issue if found. We also use your information to respond to you when you contact us.",
              lT(),
              "We do not sell any of your information to anyone, and we never will. We also do not share your information with third-parties. However, the data we collect is stored and processed on cloud infrastructures. Our main servers are located in USA (DigitalOcean). There are few servers in USA/China HongKong used as cdn reverse proxy.",
              cT(),
              "We do our best to keep your information safe. First, we minimize the data we collect. Second, we use safe protocols for communication and transferring data (such as HTTPS). Passwords are stored encrypted using RSA. We will do everything we reasonably can to prevent security breaches.",
              uT(),
              "Under the European General Data Protection Regulation (EU-GDPR), you have the right to access, rectify, export and erase your data. To perform any of these actions, or if you want to delete your account completely (and remove all your settings and preferences from our partner servers), you can use the in-app option in the settings. Please note that the deletion of your account will remove your data from QiReader and deactivate QiReader on your devices.",
              l(Gs, {}),
            ];
          },
        });
      },
    })
  );
}
var gT = w("<form action=/_api/session method=post>");
function fT() {
  const e = Y(se),
    [t, n] = N(""),
    [r, o] = N(""),
    i = at();
  e.core.data.state === Ht.USER_LOADED && i("/", { replace: !0 });
  const {
      getIsBusy: a,
      getError: s,
      execute: c,
    } = lt(async () => {
      const f = await e.core.methods.registerAction(t(), r());
      if (f.ok) {
        try {
          await e.core.methods.initUserAction(f.result.id);
        } catch (m) {
          e.core.methods.reportErrorAction(void 0, { fatal: !0 })(m);
          return;
        }
        i("/", { replace: !0 });
      } else {
        if (f.errorCode === "EMAIL_EXISTS")
          return h("An account with this email already exists.");
        if (f.errorCode === "INVALID_EMAIL") return h("Invalid email address.");
        if (f.errorCode === "INVALID_PASSWORD")
          return h("Passwords must be at least %s characters in length.", _o);
        throw new Error(f.errorCode);
      }
    }),
    u = (f) => {
      n(f.currentTarget.value);
    },
    d = (f) => {
      o(f.currentTarget.value);
    },
    g = (f) => {
      f.preventDefault(), c().catch(e.core.methods.reportErrorAction());
    };
  return (
    Kt(() => Yt(h("Sign up"))),
    l(aa, {
      renderTitle: () => h("Sign up"),
      renderSubtitle: () => [
        L(() => h("Already have an account?")),
        " ",
        l(Pe, {
          href: "/login",
          get children() {
            return [L(() => h("Log in")), " →"];
          },
        }),
      ],
      get children() {
        return [
          L(
            () =>
              L(() => !!/beta/.test(location.host))() &&
              l(Nt, {
                severify: "warning",
                children: "TEST SITE, DO NOT USE 测试站点，请勿使用",
              })
          ),
          (() => {
            var f = gT();
            return (
              f.addEventListener("submit", g),
              p(
                f,
                l(D, {
                  keyed: !0,
                  get when() {
                    return s();
                  },
                  children: (m) => l(Nt, { severify: "error", children: m }),
                }),
                null
              ),
              p(
                f,
                l(ke, {
                  get children() {
                    return l(At, {
                      get label() {
                        return h("Email");
                      },
                      get inputProps() {
                        return {
                          type: "email",
                          name: "email",
                          value: t(),
                          required: !0,
                          maxLength: hS,
                          onInput: u,
                          onChange: u,
                        };
                      },
                      full: !0,
                    });
                  },
                }),
                null
              ),
              p(
                f,
                l(ke, {
                  get children() {
                    return l(At, {
                      get label() {
                        return h("Password");
                      },
                      get inputProps() {
                        return {
                          type: "password",
                          name: "password",
                          value: r(),
                          required: !0,
                          maxLength: Ac,
                          minLength: _o,
                          onInput: d,
                          onChange: d,
                        };
                      },
                      full: !0,
                      get supportingTextCounter() {
                        return `${r().trim().length} / ${_o}`;
                      },
                    });
                  },
                }),
                null
              ),
              p(
                f,
                l(ke, {
                  group: !0,
                  end: !0,
                  get children() {
                    return l(Z, {
                      variant: "filled",
                      type: "submit",
                      full: !0,
                      get isLoading() {
                        return a();
                      },
                      get children() {
                        return h("Create account");
                      },
                    });
                  },
                }),
                null
              ),
              f
            );
          })(),
        ];
      },
    })
  );
}
var hT = w('<form action=""method=post>');
function mT() {
  const [e, t] = N(""),
    n = Y(se),
    r = at(),
    {
      getIsBusy: o,
      getError: i,
      execute: a,
    } = lt(async () => {
      const u = await it("resetPassword", { email: e() });
      if (u.ok) r("/login/code");
      else {
        if (u.errorCode === "EMAIL_NOT_EXIST")
          return h("An account with this email does not exists.");
        throw new Error(u.errorCode);
      }
    }),
    s = (u) => {
      t(u.currentTarget.value);
    },
    c = (u) => {
      u.preventDefault(), a().catch(n.core.methods.reportErrorAction());
    };
  return (
    Kt(() => Yt(h("Reset Password"))),
    l(aa, {
      renderTitle: () => h("Reset Password"),
      renderSubtitle: () =>
        L(() =>
          h(
            "If you have forgotten your password enter your email address and we send you a verification code then you can login to change your password"
          )
        ),
      get children() {
        return [
          l(D, {
            keyed: !0,
            get when() {
              return i();
            },
            children: (u) => l(Nt, { severify: "error", children: u }),
          }),
          (() => {
            var u = hT();
            return (
              u.addEventListener("submit", c),
              p(
                u,
                l(ke, {
                  get children() {
                    return l(At, {
                      get placeholder() {
                        return h("Email");
                      },
                      get inputProps() {
                        return {
                          type: "email",
                          name: "email",
                          value: e(),
                          required: !0,
                          onInput: s,
                          onChange: s,
                        };
                      },
                      full: !0,
                    });
                  },
                }),
                null
              ),
              p(
                u,
                l(ke, {
                  group: !0,
                  end: !0,
                  get children() {
                    return l(Z, {
                      variant: "filled",
                      type: "submit",
                      full: !0,
                      get isLoading() {
                        return o();
                      },
                      get children() {
                        return h("Send code");
                      },
                    });
                  },
                }),
                null
              ),
              u
            );
          })(),
        ];
      },
    })
  );
}
var yT = w("<div>");
function Fm(e) {
  const t = Y(se),
    n = () => (e.feed ? e.feed.id : e.subscription.feedId),
    r = () => {
      var i;
      return (i = t.feedStates.data.feedStates[n()]) == null
        ? void 0
        : i.hasErrors;
    },
    [o] = tr(
      () => r() && n(),
      async (i) => Le("getFeedState", { id: i }),
      { staleTime: vf }
    );
  return l(D, {
    get when() {
      return o();
    },
    children: (i) =>
      l(Nt, {
        severify: "error",
        get actions() {
          return l(Z, {
            variant: "text",
            size: "small",
            get href() {
              return (e.feed || e.subscription).feedUrl;
            },
            edge: "end",
            "data-native": !0,
            target: "_blank",
            get children() {
              return h("View source");
            },
          });
        },
        get children() {
          return [
            (() => {
              var a = yT();
              return (
                $(
                  () =>
                    (a.innerHTML = h(
                      "There are issues with this feed. Please check it and resubscribe if necessary."
                    ))
                ),
                a
              );
            })(),
            l(D, {
              get when() {
                return i().errorMsg;
              },
              get children() {
                return l(j, {
                  variant: "bodySmall",
                  color: "error",
                  get children() {
                    return i().errorMsg;
                  },
                });
              },
            }),
          ];
        },
      }),
  });
}
function Bm(e) {
  const t = Y(se),
    n = () => ({ type: K.SUBSCRIPTION, id: e.subscription.id }),
    [r, o] = N(!1),
    [i, a] = Au(!1),
    s = at(),
    c = () => {
      o(!0);
    },
    u = () => {
      o(!1);
    },
    d = async () => {
      await t.subscriptions.methods.removeSubscriptionAction(e.subscription.id),
        t.core.methods.notifySuccess(h("Feed unsubscribed")),
        s("/", { replace: !0 });
    },
    g = () => {
      a(!0);
    };
  return [
    l(js, {
      get title() {
        return e.subscription.title;
      },
      get streamId() {
        return n();
      },
      get entryId() {
        return e.entryId;
      },
      renderAppMenuContent: () => [
        l(tn, {}),
        l(Wo, {
          path: "/move-to/",
          get text() {
            return h("Move to");
          },
        }),
        l(Ee, {
          get text() {
            return h("Feed properties…");
          },
          onClick: g,
        }),
        l(Ee, {
          get text() {
            return h("Unsubscribe");
          },
          icon: Ds,
          isDangerous: !0,
          onClick: c,
        }),
      ],
      onRenderAppMenuSubMenu: (b) => {
        if (b === "/move-to/")
          return l(ri, {
            get title() {
              return h("Move to");
            },
            get children() {
              return l(_m, {
                get subscription() {
                  return e.subscription;
                },
              });
            },
          });
      },
      renderListHeader: () =>
        l(Fm, {
          get subscription() {
            return e.subscription;
          },
        }),
    }),
    l(Jt, {
      get on() {
        return r();
      },
      get children() {
        return l(Sm, {
          get isShown() {
            return r();
          },
          get confirmLabel() {
            return h("Unsubscribe");
          },
          isDangerous: !0,
          onCancel: u,
          process: d,
          get children() {
            return l(j, {
              variant: "titleMedium",
              align: "center",
              get children() {
                return h("Unsubscribe from '%s'?", e.subscription.title);
              },
            });
          },
        });
      },
    }),
    l(Jt, {
      get on() {
        return i();
      },
      get children() {
        return l(Lm, {
          get subscription() {
            return e.subscription;
          },
          get isShown() {
            return i();
          },
          toggle: a,
        });
      },
    }),
  ];
}
const pT = Hn(function () {
  const t = Y(se),
    n = ro(),
    r = () =>
      t.subscriptions.data.subscriptions[decodeURIComponent(n.subscriptionId)];
  return (
    ta(() => {
      const o = r();
      return (
        o && { type: An.FEED, streamId: { type: K.SUBSCRIPTION, id: o.id } }
      );
    }),
    l(D, {
      keyed: !0,
      get when() {
        return r();
      },
      get fallback() {
        return l(to, {});
      },
      children: (o) =>
        l(Bm, {
          subscription: o,
          get entryId() {
            return n.entryId;
          },
        }),
    })
  );
});
function vT(e) {
  const t = Y(se),
    { getIsBusy: n, execute: r } = lt(async () => {
      await t.tags.methods.deleteTagAction(e.tag.id),
        t.core.methods.notifySuccess(h("Tag deleted")),
        e.onDelete();
    });
  return l(an, {
    get isShown() {
      return e.isShown;
    },
    hasClose: !0,
    get hasCancel() {
      return !n();
    },
    get confirmLabel() {
      return h("Delete");
    },
    confirmButtonColor: "error",
    get isConfirmLoading() {
      return n();
    },
    onCancel: () => {
      e.onCancel();
    },
    onConfirm: () => {
      r().catch(t.core.methods.reportErrorAction());
    },
    children: () => [
      l(j, {
        variant: "titleMedium",
        gutterBottom: !0,
        get children() {
          return h("Delete tag '%s'?", e.tag.label);
        },
      }),
      l(j, {
        variant: "bodyMedium",
        color: "onSurfaceVariant",
        get children() {
          return h("This will remove all articles from this tag.");
        },
      }),
    ],
  });
}
function bT(e) {
  const t = Y(se),
    [n, r] = N(e.tag.label),
    {
      getIsBusy: o,
      getError: i,
      execute: a,
    } = lt(async () => {
      if (s(n())) return h("A tag with this label already exists.");
      const g = await t.tags.methods.modifyTagAction({
        tagId: e.tag.id,
        label: n(),
      });
      e.onModify(g.label);
    }),
    s = (g) => {
      const f = t.tags.methods.getTagByLabel(g);
      return f && f.id !== e.tag.id;
    },
    c = (g) => {
      const f = g.currentTarget.value;
      r(f);
    };
  return l(an, {
    get isShown() {
      return e.isShown;
    },
    width: 360,
    hasClose: !0,
    get hasCancel() {
      return !o();
    },
    get confirmLabel() {
      return h("Save");
    },
    get isConfirmLoading() {
      return o();
    },
    onCancel: () => {
      e.onCancel();
    },
    onConfirm: () => {
      a().catch(t.core.methods.reportErrorAction());
    },
    children: () =>
      l(ke, {
        end: !0,
        get children() {
          return [
            l(D, {
              keyed: !0,
              get when() {
                return i();
              },
              children: (g) => l(Nt, { severify: "error", children: g }),
            }),
            l(At, {
              get label() {
                return h("Label");
              },
              get inputProps() {
                return {
                  value: n(),
                  required: !0,
                  maxlength: sh,
                  autofocus: !0,
                  onInput: c,
                  onChange: c,
                };
              },
              full: !0,
              outlined: !0,
            }),
          ];
        },
      }),
  });
}
function wT(e) {
  const t = at(),
    n = ro(),
    r = () => ({ type: K.TAG, id: e.tag.id }),
    [o, i] = N(!1),
    [a, s] = N(!1),
    c = () => {
      i(!0);
    },
    u = () => {
      i(!1);
    },
    d = () => {
      t("/", { replace: !0 });
    },
    g = () => {
      s(!0);
    },
    f = () => {
      s(!1);
    },
    m = (b) => {
      s(!1), t(`/tags/${encodeURIComponent(b)}`);
    };
  return [
    l(js, {
      get streamId() {
        return r();
      },
      get entryId() {
        return n.entryId;
      },
      get title() {
        return ZI(e.tag);
      },
      renderAppMenuContent: () =>
        wS(e.tag.label)
          ? void 0
          : [
              l(Ee, {
                get text() {
                  return h("Rename…");
                },
                onClick: g,
              }),
              l(Ee, {
                get text() {
                  return h("Delete");
                },
                icon: Ds,
                isDangerous: !0,
                onClick: c,
              }),
            ],
    }),
    l(vT, {
      get isShown() {
        return o();
      },
      get tag() {
        return e.tag;
      },
      onCancel: u,
      onDelete: d,
    }),
    l(bT, {
      get isShown() {
        return a();
      },
      get tag() {
        return e.tag;
      },
      onCancel: f,
      onModify: m,
    }),
  ];
}
const ST = Hn(function () {
  const t = Y(se),
    n = ro(),
    r = () => t.tags.methods.getTagByLabel(decodeURIComponent(n.label));
  return (
    ta(() => {
      const o = r();
      return o && { type: An.FEED, streamId: { type: K.TAG, id: o.id } };
    }),
    l(D, {
      keyed: !0,
      get when() {
        return r();
      },
      get fallback() {
        return l(to, {});
      },
      children: (o) => l(wT, { tag: o }),
    })
  );
});
function ET(e) {
  const t = () => ({ type: K.FEED, id: e.feed.id });
  return l(js, {
    get title() {
      return e.feed.title;
    },
    get streamId() {
      return t();
    },
    get entryId() {
      return e.entryId;
    },
    renderAppMenuContent: () => l(tn, {}),
    renderListHeader: () =>
      l(Fm, {
        get feed() {
          return e.feed;
        },
      }),
  });
}
const CT = Hn(function () {
  const t = Y(se),
    n = ro(),
    r = L(() =>
      t.subscriptions.data.feedToSubscription[n.feedId]
        ? { type: K.SUBSCRIPTION, id: n.feedId }
        : { type: K.FEED, id: n.feedId }
    ),
    o = () => {
      const a = r();
      if (a.type === K.SUBSCRIPTION)
        return t.subscriptions.data.subscriptions[a.id];
    },
    [i] = tr(
      () => decodeURIComponent(n.feedId),
      async (a) => {
        if (r().type !== K.FEED) return;
        const s = await it("getFeed", { id: a });
        if (!s.ok) {
          if (s.errorCode === "NOT_FOUND_OR_BAD") return;
          W(!1);
        }
        return s.result;
      },
      { key: "feed", cacheTime: 864e5 * 30, staleTime: 9e5, autoRefresh: !0 }
    );
  return (
    ta(() => {
      const a = o();
      if (a)
        return (
          a && { type: An.FEED, streamId: { type: K.SUBSCRIPTION, id: a.id } }
        );
    }),
    [
      l(D, {
        keyed: !0,
        get when() {
          return L(() => r().type === K.SUBSCRIPTION)() && o();
        },
        get fallback() {
          return l(to, {});
        },
        children: (a) =>
          l(Bm, {
            subscription: a,
            get entryId() {
              return n.entryId;
            },
          }),
      }),
      l(D, {
        keyed: !0,
        get when() {
          return L(() => r().type === K.FEED)() && i();
        },
        get fallback() {
          return l(to, {});
        },
        children: (a) =>
          l(ET, {
            feed: a,
            get entryId() {
              return n.entryId;
            },
          }),
      }),
    ]
  );
});
function AT() {
  return l(Oy, {
    root: oC,
    get children() {
      return [
        l(We, { path: "/debug", component: Qx }),
        l(We, { path: "/theme", component: xE }),
        l(We, { path: "/register", component: fT }),
        l(We, { path: "/login", component: gm }),
        l(We, { path: "/reset-password", component: mT }),
        l(We, { path: "/login/code", component: Zx }),
        l(We, { path: "/plans", component: qk }),
        l(We, { path: "/about", component: FI }),
        l(We, { path: "/privacy-policy", component: dT }),
        l(We, { path: "/china", component: Xx }),
        l(We, { path: "/__error__", component: AE }),
        l(We, {
          path: "/",
          component: k4,
          get children() {
            return [
              l(We, { path: "/discover", component: gk }),
              l(We, { path: "/import", component: Mk }),
              l(We, { path: "/import/featured/:feedSet", component: Rk }),
              l(We, { path: "/export", component: wk }),
              l(_I, { items: mm }),
              l(We, { path: "/:_entries?/:entryId?", component: lk }),
              l(We, {
                path: "/subscriptions/:subscriptionId/:_entries?/:entryId?",
                component: pT,
              }),
              l(We, {
                path: "/feeds/:feedId/:_entries?/:entryId?",
                component: CT,
              }),
              l(We, {
                path: "/categories/:label/:_entries?/:entryId?",
                component: Gx,
              }),
              l(We, {
                path: "/tags/:label/:_entries?/:entryId?",
                component: ST,
              }),
            ];
          },
        }),
        l(We, { path: "/*all", component: to }),
      ];
    },
  });
}
function IT() {
  return (
    ah(),
    CE(),
    l(sE, {
      get children() {
        return l(AT, {});
      },
    })
  );
}
const xT = "/admin/debug/web-error",
  kT = /ResizeObserver/;
function TT() {
  (window.onerror = function (e, t, n, r, o) {
    const i = {
      page: window.location.toString(),
      message: String(e),
      source: t,
      lineno: n,
      colno: r,
      error: o == null ? void 0 : o.stack,
    };
    !i.source || !i.source.startsWith("http") || kT.test(i.message) || Bg(i);
  }),
    window.addEventListener("unhandledrejection", function (e) {
      const t = {
        page: window.location.toString(),
        message: Ug(e.reason) ? e.reason.message : String(e.reason),
        source: "Promise",
        error: Ug(e.reason) ? e.reason.stack : void 0,
      };
      Bg(t);
    });
}
function LT(e) {
  const t = JSON.stringify(e);
  fetch(xT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: t,
  })
    .then((n) => {
      n.ok || console.error("Send error data failed");
    })
    .catch((n) => {
      console.error("Send error data failed:", n);
    });
}
const Bg = Ls(864e5, LT, { noTrailing: !0 });
function Ug(e) {
  return e instanceof Error;
}
function PT() {
  Ft(MT() + $T() + RT());
}
const Um = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10];
function zm(e, t) {
  const n = [];
  for (const r of Um) {
    const o = (r * 4) / 16;
    n.push(`
      .${t}-${r} { ${e}: ${o}rem !important; }
      .${t}x-${r} { ${e}-left: ${o}rem !important; ${e}-right: ${o}rem !important; }
      .${t}y-${r} { ${e}-top: ${o}rem !important; ${e}-bottom: ${o}rem !important; }
      .${t}t-${r} { ${e}-top: ${o}rem !important; }
      .${t}r-${r} { ${e}-right: ${o}rem !important; }
      .${t}b-${r} { ${e}-bottom: ${o}rem !important; }
      .${t}l-${r} { ${e}-left: ${o}rem !important; }
    `);
  }
  return n.join(`
`);
}
function MT() {
  return zm("padding", "p");
}
function $T() {
  return (
    zm("margin", "m") +
    `
    .m-auto	{ margin: auto !important; }
    .mx-auto	{ margin-left: auto !important; margin-right: auto !important; }
    .my-auto	{ margin-top: auto !important; margin-bottom: auto !important; }
    .mt-auto	{ margin-top: auto !important; }
    .mr-auto	{ margin-right: auto !important; }
    .mb-auto	{ margin-bottom: auto !important; }
    .ml-auto	{ margin-left: auto !important; }
  `
  );
}
function RT() {
  const e = [];
  for (const t of Um) {
    const n = (t * 4) / 16;
    e.push(`
      .space-x-${t} > * + * { margin-left: ${n}rem !important; }
      .space-y-${t} > * + * { margin-top: ${n}rem !important; }
    `);
  }
  return (
    e.push(`
    .space-x-px > * + * { margin-left: 1px !important; }
    .space-y-px > * + * { margin-top: 1px !important; }
  `),
    e.join(`
`)
  );
}
Ft(`
*,
::before,
::after {
	box-sizing: border-box;
}

html {
	line-height: 1.15;
	tab-size: 2;
}

body {
	margin: 0;
	font-family: system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
	text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html, body {
  overscroll-behavior: contain;
	cursor: default;
}

* {
  -webkit-tap-highlight-color: transparent;
}

body {
	overflow-x: hidden;
	-webkit-touch-callout: none;
}

details>summary {
	cursor: pointer;
}

.user-image-hidden .user-image {
	display: none;
}
.user-image-hidden .user-image-thumbnail {
	display: inline;
}
`); // 优化后的代码示例
(function () {
  "use strict";

  // 为了提高可读性和可维护性，重命名一些函数和变量
  function initialize() {
    performInitialTasks();
    triggerDatabaseCleanup();
    setupHistoryScrollRestoration();
    setupRootClickHandler();
    initializeTimedTasks();
    setupServiceWorkerUpdate();
  }

  function performInitialTasks() {
    // 假设 tf, PT, TT 是一些初始化函数
    tf();
    PT();
    TT();
  }

  function triggerDatabaseCleanup() {
    // 清理数据库的逻辑保持不变
    setTimeout(() => {
      window.indexedDB.deleteDatabase("app-cache");
      window.indexedDB.deleteDatabase("user-cache");
    }, 30000); // 使用常量替代魔术数字
  }

  function setupHistoryScrollRestoration() {
    history.scrollRestoration = "manual";
  }

  function setupRootClickHandler() {
    const rootElement = document.getElementById("root");
    rootElement.onclick = function () {}; // 空函数，可能是为了阻止默认行为
  }

  function initializeTimedTasks() {
    // 使用常量替代硬编码的值，提高可配置性
    const intervals = [
      30, 60, 120, 300, 600, 900, 1800, 3600, 7200, 86400, 259200,
    ];
    P0(() => l(IT, {}), document.getElementById("root")); // 假设 P0, l, IT 是已定义的

    // 重新组织 setTimeout 调用以提高代码清晰度
    intervals.forEach((interval) => {
      setTimeout(
        () => Xc(`${interval === 30 ? "New" : "Old"}Client${interval}s`),
        interval * 1000
      );
    });
  }

  function setupServiceWorkerUpdate() {
    let needsRefresh = false; // 使用更具描述性的命名

    const updateServiceWorker = cy({
      onNeedRefresh() {
        console.debug("sw:onNeedRefresh");
        needsRefresh = true;
      },
    });

    window._updateServiceWorker = async function () {
      if (needsRefresh) {
        console.debug("sw: updating");
        try {
          await updateServiceWorker(true); // 添加 try-catch 包裹异步操作
        } catch (error) {
          console.error("Error updating service worker:", error);
        }
      } else {
        window.location.reload();
      }
    };
  }

// 异步数据获取逻辑
async function fetchUserData() {
  try {
    const response = await fetch('http://localhost:8080/session');
    if (!response.ok) {
      throw new Error(`Http status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('User Data:', data.user); // 获取 data 内的 user 属性
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

async function fetchMarkersData() {
  try {
    const response = await fetch('http://localhost:8080/markers');
    if (!response.ok) {
      throw new Error(`Http status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Markers Data:', data.unread); // 获取 data 内的 unread 属性
  } catch (error) {
    console.error('Error fetching markers data:', error);
  }
}

// 初始化函数，包含初始服务工作者设置和数据获取调用
function initialize() {
  setupServiceWorkerUpdate(); // Initialize service worker update logic
  fetchUserData(); // Call user data fetch function
  fetchMarkersData(); // Call markers data fetch function
}



  // 初始化函数调用
  initialize();
})();
