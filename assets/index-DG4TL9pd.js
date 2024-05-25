(function() {
    // Check if the browser supports modulepreload
    const relList = document.createElement("link").relList;
    if (relList && relList.supports && relList.supports("modulepreload")) return;
  
    // Function to process modulepreload links
    function handleModulePreload(link) {
      if (link.ep) return;
      link.ep = true;
      const options = {
        integrity: link.integrity || "",
        referrerPolicy: link.referrerPolicy || "",
      };
  
      if (link.crossOrigin === "use-credentials") {
        options.credentials = "include";
      } else if (link.crossOrigin === "anonymous") {
        options.credentials = "omit";
      } else {
        options.credentials = "same-origin";
      }
  
      fetch(link.href, options);
    }
  
    // Handle existing modulepreload links
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
      handleModulePreload(link);
    }
  
    // Observe the document for new modulepreload links
    new MutationObserver(mutations => {
      for (const mutation of mutations) {
        if (mutation.type === "childList") {
          for (const node of mutation.addedNodes) {
            if (node.tagName === "LINK" && node.rel === "modulepreload") {
              handleModulePreload(node);
            }
          }
        }
      }
    }).observe(document, { childList: true, subtree: true });
  })();
  
  const modulepreload = "modulepreload";
  const toAbsoluteURL = (path) => `/${path}`;
  const loadedResources = {};
  
  const preloadResources = (loadFn, resources = [], force = false) => {
    let promise = Promise.resolve();
  
    if (resources.length > 0) {
      const existingLinks = document.getElementsByTagName("link");
      const nonceElement = document.querySelector("meta[property=csp-nonce]");
      const nonce = (nonceElement && nonceElement.nonce) || nonceElement && nonceElement.getAttribute("nonce");
  
      promise = Promise.all(resources.map(resource => {
        resource = toAbsoluteURL(resource);
        if (loadedResources[resource]) return;
        loadedResources[resource] = true;
  
        const isCSS = resource.endsWith(".css");
        const linkSelector = isCSS ? '[rel="stylesheet"]' : "";
  
        // Skip adding duplicate links
        if (!force) {
          for (let i = existingLinks.length - 1; i >= 0; i--) {
            const link = existingLinks[i];
            if (link.href === resource && (!isCSS || link.rel === "stylesheet")) return;
          }
        }
        // Skip adding preload or stylesheet links if already exists
        if (document.querySelector(`link[href="${resource}"]${linkSelector}`)) return;
  
        // Create and append link
        const link = document.createElement("link");
        link.rel = isCSS ? "stylesheet" : modulepreload;
        if (!isCSS) link.as = "script";
        link.crossOrigin = "";
        link.href = resource;
        if (nonce) link.setAttribute("nonce", nonce);
  
        document.head.appendChild(link);
  
        if (isCSS) {
          return new Promise((resolve, reject) => {
            link.addEventListener("load", resolve);
            link.addEventListener("error", () => reject(new Error(`Unable to preload CSS for ${resource}`)));
          });
        }
      }));
    }
  
    return promise.then(() => loadFn()).catch(error => {
      const event = new Event("vite:preloadError", { cancelable: true });
      event.payload = error;
      window.dispatchEvent(event);
  
      if (!event.defaultPrevented) throw error;
    });
  };
  
  function invariant(condition, message) {
    if (!condition) {
      const error = message === undefined ? new Error("Invariant violation") : new Error(format(message, Array.prototype.slice.call(arguments, 2)));
      error.name = "InvariantViolation";
      throw error;
    }
  }
  
  function format(message) {
    const args = Array.prototype.slice.call(arguments, 1);
    let argIndex = 0;
    return String(message).replace(/%s/g, () => args[argIndex++]);
  }
  
  const startTimestamp = Date.now();
  let currentAppVersion, initialLoad;
  
  function initializeApp(config) {
    initialLoad = config;
    currentAppVersion = parseVersion(config.localAppVersionStr);
    const savedVersionFlag = getVersionFlag();
  
    if (savedVersionFlag) {
      if (window._pwaLoadedLatestScripts) {
        config.loadMainScript();
      } else {
        console.warn(`[PWA] Found app version mismatch flag (${savedVersionFlag}, local=${config.localAppVersionStr}), force loading of latest scripts...`);
        window._pwaLoadedLatestScripts = true;
        window._pwaAppVersion = config.localAppVersionStr;
        window._pwaLoadLatestIndexScript = loadLatestScripts(config.localAppVersionStr, config.loadMainScript);
        loadScript(config.loadLatestIndexScriptUrl);
      }
    } else {
      setTimeout(async () => {
        if (!initialLoad) await checkForUpdates();
      }, 5000);
      config.loadMainScript();
    }
  }
  
  function loadLatestScripts(version, loadMainScript) {
    return function(scriptVersion, scriptUrl) {
      if (version === scriptVersion || document.querySelector(`script[src="${scriptUrl}"]`)) {
        console.debug("[PWA] Same version or script already loaded");
        clearVersionFlag();
        loadMainScript();
      } else {
        const script = document.createElement("script");
        script.type = "module";
        script.src = scriptUrl;
        script.defer = true;
        script.setAttribute("crossorigin", "");
        document.head.appendChild(script);
      }
    };
  }
  
  function versionMismatch(versionStr) {
    const version = parseVersion(versionStr);
    invariant(currentAppVersion);
    if (currentAppVersion[0] < version[0]) {
      console.warn("[PWA] Found major update, reloading app...");
      setVersionFlag("major");
    } else if (currentAppVersion[0] === version[0] && currentAppVersion[1] < version[1]) {
      console.warn("[PWA] Found minor update");
      setVersionFlag("minor");
    } else if (!initialLoad) {
      initialLoad = true;
      if (!window._pwaLoadedLatestScripts || window._pwaAppVersion === versionStr) {
        clearVersionFlag();
      }
    }
  }
  
  const mismatchFlag = "pwaAppVersionMismatch";
  
  function getVersionFlag() {
    return localStorage.getItem(mismatchFlag);
  }
  
  function setVersionFlag(flag) {
    localStorage.setItem(mismatchFlag, flag);
  }
  
  function clearVersionFlag() {
    localStorage.removeItem(mismatchFlag);
    console.debug("[PWA] Removed app version mismatch flag");
  }
  
  async function reloadApp() {
    const timeElapsed = Date.now() - startTimestamp;
    if (window._pwaLoadedLatestScripts && timeElapsed < 1800000) {
      console.error("[PWA] Can not load the latest scripts");
      return;
    }
    setVersionFlag("major");
    if (!getVersionFlag()) {
      console.error("[PWA] Can not set version flag");
      return;
    }
    if (timeElapsed > 10000) {
      alert(`New app updates found. The page will reload to apply the latest version.`);
    }
    forceReload();
  }
  
  async function checkForUpdates() {
    const response = await fetch(initialLoad.versionApiUrl);
    if (response.status === 200) {
      const data = await response.json();
      invariant(currentAppVersion);
      if (parseVersion(data.version)[0] > currentAppVersion[0]) {
        console.error("[PWA] Found major update, reloading app...");
        setVersionFlag("major");
      }
    }
  }
  
  function loadScript(url) {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    script.defer = true;
    script.setAttribute("crossorigin", "");
    document.head.appendChild(script);
  }
  
  function parseVersion(versionStr) {
    const match = /^(\d+)\.(\d+)\.(\d+)$/.exec(versionStr);
    invariant(match);
    return [Number(match[1]), Number(match[2]), Number(match[3])];
  }
  
  function forceReload() {
    const serviceWorkerUpdater = initialLoad.getServiceWorkerUpdater();
    if (serviceWorkerUpdater) {
      setTimeout(() => {
        window.location.reload();
      }, 5000);
      try {
        serviceWorkerUpdater();
      } catch (error) {
        console.error("[PWA] error: update service worker", error);
      }
    } else {
      window.location.reload();
    }
  }
  
  console.info('app:start version=%s, built="%s"', "18.1.2", new Date(1715784815736).toLocaleString());
  initializeApp({
    localAppVersionStr: "18.1.2",
    loadMainScript: () => void preloadResources(() => import("./main-CsyhW9p3.js"), []),
    loadLatestIndexScriptUrl: `/assets/index.js?t=${Date.now()}`,
    versionApiUrl: "/api/app-version",
    getServiceWorkerUpdater: () => window._updateServiceWorker
  });
  
  export { preloadResources as _, versionMismatch as c, invariant as i };