if (!self.define) {
    let e,
        i = {};

    const s = (path, base) => (path = new URL(`${path}.js`, base).href, i[path] || new Promise((resolve) => {
        if ("document" in self) {
            const script = document.createElement("script");
            script.src = path;
            script.onload = resolve;
            document.head.appendChild(script);
        } else {
            e = path;
            importScripts(path);
            resolve();
        }
    }).then(() => {
        let module = i[path];
        if (!module) throw new Error(`Module ${path} didn’t register its module`);
        return module;
    }));

    self.define = (dependencies, factory) => {
        const scriptSrc = e || ("document" in self ? document.currentScript.src : "") || location.href;
        if (i[scriptSrc]) return;

        let exports = {};
        const require = dep => s(dep, scriptSrc);
        const module = { uri: scriptSrc, exports: exports, require: require };
        i[scriptSrc] = Promise.all(dependencies.map(dep => module[dep] || require(dep))).then((modules) => {
            factory(...modules);
            return exports;
        });
    };
}

define(["./workbox-7cfec069"], function (workbox) {
    "use strict";

    self.addEventListener("message", (event) => {
        if (event.data && event.data.type === "SKIP_WAITING") {
            self.skipWaiting();
        }
    });

    workbox.precacheAndRoute([
        { url: "assets/index-DG4TL9pd.js", revision: null },
        { url: "assets/main-CsyhW9p3.js", revision: null },
        { url: "assets/workbox-window.prod.es5-WEjqEGHc.js", revision: null },
        { url: "index.html", revision: "41e3276e1d61dc50c41ed7d1e0d4a5e9" },
        { url: "lizhi.html", revision: "175915339fc7c1dfdf6014336bd3835b" },
        { url: "icon192.png", revision: "330d14a5aa642ff8d8c93cff76cd4e51" },
        { url: "icon512.png", revision: "b44f08ef5331226f74905d02b79dea74" },
        { url: "icon192.maskable.png", revision: "942b373f739136eb5ff9df9adc862ef6" },
        { url: "manifest.webmanifest", revision: "184213696a49d7fd2f4f6e6d24d12631" }
    ], {});

    workbox.cleanupOutdatedCaches();

    workbox.registerRoute(
        new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html"), {
            denylist: [/^_/, /^\/(admin|api)\b/]
        })
    );
});