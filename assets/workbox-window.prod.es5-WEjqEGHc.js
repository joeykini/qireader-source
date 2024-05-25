try {
    self["workbox:window:7.0.0"] && _();
  } catch (e) {}
  
  function sendMessage(serviceWorker, message) {
    return new Promise((resolve) => {
      const channel = new MessageChannel();
      channel.port1.onmessage = (event) => resolve(event.data);
      serviceWorker.postMessage(message, [channel.port2]);
    });
  }
  
  class Workbox {
    constructor(url, options = {}) {
      this.scriptURL = url;
      this.options = options;
      this.activeServiceWorker = null;
      this.controllingServiceWorker = null;
      this.updateFoundServiceWorker = null;
      this.registration = null;
      this.lastUpdateCheck = 0;
      this.updateCheckInterval = 60 * 1000; // 60 seconds
      this.updateListenerTimeout = null;
      this.stateListeners = new Set();
      this.updateListeners = new Set();
      this.eventTarget = new EventTarget();
  
      navigator.serviceWorker.addEventListener("message", this.handleMessage.bind(this));
  
      this.controllerChangeListener = this.controllerChangeHandler.bind(this);
      navigator.serviceWorker.addEventListener("controllerchange", this.controllerChangeListener);
    }
  
    async register({ immediate = false } = {}) {
      if (!immediate && document.readyState !== "complete") {
        await new Promise((resolve) => window.addEventListener("load", resolve));
      }
  
      this.registration = await navigator.serviceWorker.register(this.scriptURL, this.options);
      this.lastUpdateCheck = performance.now();
      
      if (navigator.serviceWorker.controller) {
        this.controllingServiceWorker = navigator.serviceWorker.controller;
      }
  
      this.registration.addEventListener("updatefound", this.handleUpdateFound.bind(this));
  
      const waitingSW = this.registration.waiting;
      if (waitingSW && this.compareServiceWorkerURLs(waitingSW.scriptURL, this.scriptURL)) {
        this.setUpdateFoundServiceWorker(waitingSW);
      }
  
      return this.registration;
    }
  
    async update() {
      if (this.registration) {
        await this.registration.update();
      }
    }
  
    async getServiceWorker() {
      return this.activeServiceWorker || new Promise((resolve) => {
        this.stateListeners.add(resolve);
      });
    }
  
    async sendMessage(message) {
      const serviceWorker = await this.getServiceWorker();
      return sendMessage(serviceWorker, message);
    }
  
    messageSkipWaiting() {
      if (this.registration && this.registration.waiting) {
        sendMessage(this.registration.waiting, { type: "SKIP_WAITING" });
      }
    }
  
    handleUpdateFound() {
      const serviceWorker = this.registration.installing;
      if (this.compareServiceWorkerURLs(serviceWorker.scriptURL, this.scriptURL)) {
        this.updateFoundServiceWorker = serviceWorker;
        this.setupServiceWorkerStateHandlers(serviceWorker);
      }
    }
  
    setupServiceWorkerStateHandlers(serviceWorker) {
      serviceWorker.addEventListener("statechange", this.serviceWorkerStateHandler.bind(this));
    }
  
    serviceWorkerStateHandler(event) {
      const serviceWorker = event.target;
      const state = serviceWorker.state;
  
      if (state === "installed") {
        this.updateListenerTimeout = setTimeout(() => {
          if (serviceWorker === this.registration.waiting) {
            this.dispatchEvent(new CustomEvent("waiting", { detail: serviceWorker }));
          }
        }, 200);
      } else if (state === "activating") {
        clearTimeout(this.updateListenerTimeout);
        this.dispatchEvent(new CustomEvent("activating", { detail: serviceWorker }));
      }
    }
  
    controllerChangeHandler(event) {
      const controllingSW = navigator.serviceWorker.controller;
      const isExternal = controllingSW !== this.registration.active;
  
      this.dispatchEvent(new CustomEvent("controlling", {
        detail: {
          isExternal,
          sw: controllingSW,
          originalEvent: event,
        },
      }));
  
      if (isExternal) {
        this.activeServiceWorker = controllingSW;
      }
  
      this.resolveControllingServiceWorker();
    }
  
    handleMessage(event) {
      const { data, ports, source } = event;
      this.getServiceWorker().then(() => {
        if (this.updateListeners.has(source)) {
          this.dispatchEvent(new CustomEvent("message", {
            detail: {
              data,
              originalEvent: event,
              ports,
              sw: source,
            },
          }));
        }
      });
    }
  
    compareServiceWorkerURLs(url1, url2) {
      return new URL(url1, location.href).href === new URL(url2, location.href).href;
    }
  
    dispatchEvent(event) {
      this.eventTarget.dispatchEvent(event);
    }
  
    addEventListener(type, listener) {
      this.eventTarget.addEventListener(type, listener);
    }
  
    removeEventListener(type, listener) {
      this.eventTarget.removeEventListener(type, listener);
    }
  
    resolveReadyServiceWorker() {
      this.readyServiceWorker.resolve(this.readyServiceWorker);
    }
  
    resolveControllingServiceWorker() {
      this.controllingServiceWorker.resolve(navigator.serviceWorker.controller);
    }
  }
  
  // Export the Workbox class for use in other modules as needed
  export { Workbox, CustomEvent, sendMessage as messageSW };