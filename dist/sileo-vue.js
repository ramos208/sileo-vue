import { reactive as V, markRaw as z, defineComponent as W, ref as L, computed as h, onMounted as K, watch as j, onUnmounted as Q, openBlock as u, createElementBlock as d, normalizeStyle as O, normalizeClass as E, createElementVNode as a, createCommentVNode as w, createBlock as F, resolveDynamicComponent as Y, toDisplayString as D, withModifiers as A, Fragment as P, renderList as N, createVNode as Z, TransitionGroup as _, withCtx as tt, unref as R, createApp as et, h as ot } from "vue";
const m = V([]), x = V({
  position: "top-right",
  duration: 6e3,
  maxToasts: 5
}), st = () => Math.random().toString(36).substring(2, 9);
function G() {
  const o = (t) => {
    const e = {
      type: "default",
      duration: x.duration || 6e3,
      position: x.position || "top-right",
      showProgress: !0,
      closeOnClick: !0,
      swipeToDismiss: !0,
      theme: x.theme
    }, i = typeof t == "string" ? { message: t } : t;
    (x.singleton || i.singleton) && f(), m.length >= (x.maxToasts || 5) && m.shift();
    const n = st(), r = {
      message: "",
      ...e,
      ...i,
      id: n,
      createdAt: Date.now(),
      closing: !1
    };
    return r.icon && typeof r.icon != "string" && (r.icon = z(r.icon)), m.push(r), r.duration && r.duration > 0 && setTimeout(() => {
      y(n);
    }, r.duration), n;
  }, y = (t) => {
    const e = m.find((i) => i.id === t);
    e && (e.closing = !0);
  }, s = (t) => {
    const e = m.findIndex((i) => i.id === t);
    e > -1 && m.splice(e, 1);
  }, f = () => {
    m.forEach((t) => t.closing = !0);
  }, p = (t, e) => {
    const i = m.findIndex((n) => n.id === t);
    if (i !== -1) {
      const n = { ...m[i], ...e };
      typeof e.icon < "u" && e.icon && typeof e.icon != "string" && (n.icon = z(e.icon)), m[i] = n;
    }
  }, g = (t) => Object.assign(x, t), k = Object.assign(o, {
    success: (t) => o(typeof t == "string" ? { message: t, type: "success" } : { ...t, type: "success" }),
    error: (t) => o(typeof t == "string" ? { message: t, type: "error" } : { ...t, type: "error" }),
    warning: (t) => o(typeof t == "string" ? { message: t, type: "warning" } : { ...t, type: "warning" }),
    info: (t) => o(typeof t == "string" ? { message: t, type: "info" } : { ...t, type: "info" }),
    promise: async (t, e) => {
      const i = o(typeof e.loading == "string" ? { message: e.loading, type: "default", duration: 0 } : { ...e.loading, type: "default", duration: 0 });
      try {
        const n = await t, r = typeof e.success == "function" ? e.success(n) : e.success, v = typeof r == "string" ? { message: r, type: "success" } : { ...r, type: "success" };
        return p(i, { ...v, duration: v.duration || 4e3 }), setTimeout(() => y(i), v.duration || 4e3), n;
      } catch (n) {
        const r = typeof e.error == "function" ? e.error(n) : e.error, v = typeof r == "string" ? { message: r, type: "error" } : { ...r, type: "error" };
        throw p(i, { ...v, duration: v.duration || 4e3 }), setTimeout(() => y(i), v.duration || 4e3), n;
      }
    },
    clear: () => m.length = 0,
    config: (t) => Object.assign(x, t)
  });
  return {
    toasts: m,
    config: g,
    addToast: o,
    removeToast: y,
    destroyToast: s,
    clearToasts: f,
    updateToast: p,
    toast: k
  };
}
const M = G(), Tt = M.toast, nt = { class: "sileo-header-pill" }, it = {
  key: 0,
  class: "sileo-sweep-left"
}, at = {
  key: 1,
  class: "sileo-sweep-right"
}, rt = { class: "sileo-icon-wrapper" }, lt = {
  key: 1,
  class: "sileo-emoji"
}, ct = {
  key: 2,
  class: "sileo-default-icon"
}, ut = {
  key: 0,
  class: "sileo-spin",
  viewBox: "0 0 50 50"
}, dt = {
  key: 1,
  class: "sileo-icon-circle bg-success"
}, ft = {
  key: 2,
  class: "sileo-icon-circle bg-error"
}, mt = {
  key: 3,
  class: "sileo-icon-circle bg-warning"
}, yt = {
  key: 4,
  class: "sileo-icon-circle bg-info"
}, gt = {
  key: 0,
  class: "sileo-main-body-animator"
}, vt = { class: "sileo-main-wrapper" }, pt = { class: "sileo-main-body" }, ht = {
  key: 0,
  class: "sileo-message"
}, wt = /* @__PURE__ */ W({
  __name: "Toast",
  props: {
    toast: {}
  },
  emits: ["close", "destroy"],
  setup(o, { emit: y }) {
    const s = o, f = y, p = L(null), g = L(!1), k = L(0), t = L(0), e = L(!1), i = h(() => s.toast.title ? s.toast.title : !s.toast.title && s.toast.message && !s.toast.action ? s.toast.message : null), n = h(() => s.toast.title && s.toast.message || !s.toast.title && s.toast.message && s.toast.action ? s.toast.message : null), r = h(() => !!n.value || !!s.toast.action);
    K(() => {
      r.value && setTimeout(() => {
        e.value = !0;
      }, 500);
    }), j(r, (c, l) => {
      c === !0 && l === !1 && (e.value = !0);
    }), j(() => s.toast.closing, (c) => {
      c === !0 && (r.value && e.value ? (e.value = !1, setTimeout(() => {
        f("destroy");
      }, 700)) : f("destroy"));
    }, { immediate: !0 });
    const v = h(() => s.toast.icon), U = h(() => s.toast.duration === 0 && (s.toast.type === "default" || !s.toast.type)), C = h(() => {
      const c = s.toast.position || "top-right";
      return c.includes("center") ? "center" : c.includes("left") ? "left" : "right";
    }), q = h(() => (s.toast.position || "top-right").includes("top")), H = h(() => {
      const c = t.value, l = Math.max(0, 1 - Math.abs(c) / 300), $ = g.value ? 0.95 : 1, B = C.value === "center" ? "center" : C.value === "left" ? "flex-start" : "flex-end";
      return {
        transform: `translateX(${c}px) scale(${$})`,
        opacity: l,
        transition: g.value ? "none" : "opacity 0.4s ease, transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
        display: "flex",
        flexDirection: "column",
        alignItems: B,
        width: "100%",
        pointerEvents: "auto",
        marginBottom: "16px",
        "--sileo-y-dir": q.value ? "-50px" : "50px"
      };
    }), I = (c) => {
      s.toast.swipeToDismiss && (g.value = !0, k.value = "touches" in c ? c.touches[0].clientX : c.clientX, "touches" in c ? (window.addEventListener("touchmove", b), window.addEventListener("touchend", T)) : (window.addEventListener("mousemove", b), window.addEventListener("mouseup", T)));
    }, b = (c) => {
      if (!g.value) return;
      const l = "touches" in c ? c.touches[0].clientX : c.clientX;
      t.value = (l - k.value) * 0.8;
    }, T = () => {
      g.value && (g.value = !1, Math.abs(t.value) > 100 ? f("close") : t.value = 0, window.removeEventListener("mousemove", b), window.removeEventListener("mouseup", T), window.removeEventListener("touchmove", b), window.removeEventListener("touchend", T));
    };
    return Q(() => {
      window.removeEventListener("mousemove", b), window.removeEventListener("mouseup", T), window.removeEventListener("touchmove", b), window.removeEventListener("touchend", T);
    }), (c, l) => {
      var $, B, S, X;
      return u(), d("div", {
        ref_key: "toastRef",
        ref: p,
        class: E(["sileo-toast-outer", [
          `sileo-type-${o.toast.type || "default"}`,
          `sileo-align-${C.value}`,
          o.toast.theme === "light" ? "sileo-theme-light" : "",
          o.toast.theme === "dark" ? "sileo-theme-dark" : "",
          { "sileo-is-dragging": g.value }
        ]]),
        style: O(H.value),
        onMousedown: I,
        onTouchstart: I
      }, [
        a("div", {
          class: E(["sileo-combined-shape", { "is-expanded": e.value }])
        }, [
          a("div", nt, [
            C.value !== "left" ? (u(), d("div", it)) : w("", !0),
            C.value !== "right" ? (u(), d("div", at)) : w("", !0),
            a("div", rt, [
              typeof o.toast.icon != "string" && o.toast.icon ? (u(), F(Y(v.value), {
                key: 0,
                class: "sileo-custom-icon"
              })) : typeof o.toast.icon == "string" ? (u(), d("span", lt, D(o.toast.icon), 1)) : (u(), d("div", ct, [
                U.value ? (u(), d("svg", ut, [...l[2] || (l[2] = [
                  a("circle", {
                    cx: "25",
                    cy: "25",
                    r: "20",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "5"
                  }, null, -1)
                ])])) : o.toast.type === "success" ? (u(), d("div", dt, [...l[3] || (l[3] = [
                  a("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    class: "sileo-stroke-icon"
                  }, [
                    a("polyline", { points: "20 6 9 17 4 12" })
                  ], -1)
                ])])) : o.toast.type === "error" ? (u(), d("div", ft, [...l[4] || (l[4] = [
                  a("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    class: "sileo-stroke-icon"
                  }, [
                    a("line", {
                      x1: "18",
                      y1: "6",
                      x2: "6",
                      y2: "18"
                    }),
                    a("line", {
                      x1: "6",
                      y1: "6",
                      x2: "18",
                      y2: "18"
                    })
                  ], -1)
                ])])) : o.toast.type === "warning" ? (u(), d("div", mt, [...l[5] || (l[5] = [
                  a("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    class: "sileo-stroke-icon"
                  }, [
                    a("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
                    a("line", {
                      x1: "12",
                      y1: "9",
                      x2: "12",
                      y2: "13"
                    }),
                    a("line", {
                      x1: "12",
                      y1: "17",
                      x2: "12.01",
                      y2: "17"
                    })
                  ], -1)
                ])])) : (u(), d("div", yt, [...l[6] || (l[6] = [
                  a("svg", {
                    viewBox: "0 0 24 24",
                    fill: "none",
                    class: "sileo-stroke-icon"
                  }, [
                    a("circle", {
                      cx: "12",
                      cy: "12",
                      r: "10"
                    }),
                    a("line", {
                      x1: "12",
                      y1: "16",
                      x2: "12",
                      y2: "12"
                    }),
                    a("line", {
                      x1: "12",
                      y1: "8",
                      x2: "12.01",
                      y2: "8"
                    })
                  ], -1)
                ])]))
              ]))
            ]),
            i.value ? (u(), d("span", {
              key: 2,
              class: E(["sileo-title-text", `text-${o.toast.type || "default"}`])
            }, D(i.value), 3)) : w("", !0),
            o.toast.closeOnClick ? (u(), d("button", {
              key: 3,
              class: "sileo-close-btn",
              onClick: l[0] || (l[0] = A((J) => c.$emit("close"), ["stop"]))
            }, [...l[7] || (l[7] = [
              a("svg", {
                viewBox: "0 0 24 24",
                fill: "none"
              }, [
                a("line", {
                  x1: "18",
                  y1: "6",
                  x2: "6",
                  y2: "18"
                }),
                a("line", {
                  x1: "6",
                  y1: "6",
                  x2: "18",
                  y2: "18"
                })
              ], -1)
            ])])) : w("", !0)
          ]),
          r.value ? (u(), d("div", gt, [
            a("div", vt, [
              a("div", pt, [
                a("div", {
                  class: E(["sileo-body-content", { "is-bottom-action": (($ = o.toast.action) == null ? void 0 : $.position) === "bottom" }]),
                  style: O({
                    flexDirection: ((B = o.toast.action) == null ? void 0 : B.position) === "left" ? "row-reverse" : ((S = o.toast.action) == null ? void 0 : S.position) === "bottom" ? "column" : "row",
                    alignItems: ((X = o.toast.action) == null ? void 0 : X.position) === "bottom" ? "flex-start" : "center"
                  })
                }, [
                  n.value ? (u(), d("p", ht, D(n.value), 1)) : w("", !0),
                  o.toast.action ? (u(), d("button", {
                    key: 1,
                    class: E(["sileo-action-trigger", { "is-full-width": o.toast.action.position === "bottom" }]),
                    style: O({ background: o.toast.action.color }),
                    onClick: l[1] || (l[1] = A((J) => o.toast.action.onClick(o.toast.id), ["stop"]))
                  }, D(o.toast.action.label), 7)) : w("", !0)
                ], 6)
              ])
            ])
          ])) : w("", !0)
        ], 2)
      ], 38);
    };
  }
}), xt = { class: "sileo-root-wrapper" }, kt = /* @__PURE__ */ W({
  __name: "ToastContainer",
  setup(o) {
    const { toasts: y, removeToast: s, destroyToast: f } = G(), p = [
      "top-left",
      "top-center",
      "top-right",
      "bottom-left",
      "bottom-center",
      "bottom-right"
    ], g = (t) => y.filter((e) => e.position === t), k = (t) => {
      const e = t.startsWith("top"), i = t.endsWith("left"), n = t.endsWith("center");
      return {
        position: "absolute",
        top: e ? "0" : "auto",
        bottom: e ? "auto" : "0",
        left: i ? "0" : n ? "50%" : "auto",
        right: !i && !n ? "0" : "auto",
        transform: n ? "translateX(-50%)" : "none",
        padding: "24px",
        display: "flex",
        pointerEvents: "none",
        boxSizing: "border-box",
        alignItems: i ? "flex-start" : n ? "center" : "flex-end",
        flexDirection: e ? "column" : "column-reverse"
      };
    };
    return (t, e) => (u(), d("div", xt, [
      (u(), d(P, null, N(p, (i) => a("div", {
        key: i,
        class: E(["sileo-position-container", [`sileo-pos-${i}`]]),
        style: O(k(i))
      }, [
        Z(_, {
          name: "sileo-list",
          tag: "div",
          class: "sileo-stack"
        }, {
          default: tt(() => [
            (u(!0), d(P, null, N(g(i), (n) => (u(), F(wt, {
              key: n.id,
              toast: n,
              onClose: (r) => R(s)(n.id),
              onDestroy: (r) => R(f)(n.id)
            }, null, 8, ["toast", "onClose", "onDestroy"]))), 128))
          ]),
          _: 2
        }, 1024)
      ], 6)), 64))
    ]));
  }
}), Et = {
  install(o, y = {}) {
    if (Object.keys(y).length > 0 && M.toast.config(y), typeof document < "u") {
      const s = "sileo-toast-container";
      let f = document.getElementById(s);
      f || (f = document.createElement("div"), f.id = s, document.body.appendChild(f), et({
        render: () => ot(kt)
      }).mount(f));
    }
    o.config.globalProperties.$toast = M.toast, o.provide("toast", M.toast);
  }
};
export {
  Et as SileoPlugin,
  wt as Toast,
  kt as ToastContainer,
  Tt as toast,
  M as toastManager,
  G as useToast
};
