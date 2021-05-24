/*if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(
    function(registration) {
      console.log("Berhasil registrasi service worker dengan scope:", registration.scope);
    }).catch(
    function(err) {
      console.log('registrasi gagal')
    })
}
*/
let newWorker

// The click event on the notification
document.getElementById('reload').addEventListener('click', function() {
  newWorker.postMessage({ action: 'skipWaiting' });
});

if ('serviceWorker' in navigator) {
  // Register the service worker
  navigator.serviceWorker.register('/sw.js').then(reg => {
    reg.addEventListener('updatefound', () => {
      // An updated service worker has appeared in reg.installing!
      newWorker = reg.installing;

      newWorker.addEventListener('statechange', () => {

        // Has service worker state changed?
        switch (newWorker.state) {
          case 'installed':

            // There is a new service worker available, show the notification
            if (navigator.serviceWorker.controller) {
              let notification = document.getElementById('notification ');
              notification.className = 'show';
            }

            break;
        }
      })
    })
  })
}

let refreshing;
// The event listener that is fired when the service worker updates
// Here we reload the page
navigator.serviceWorker.addEventListener('controllerchange', function() {
  if (refreshing) return;
  window.location.reload();
  refreshing = true;
});

/* function SW(args) {
  this.button = $(args.button);
  this.toast = $(args.toast);

  this.registerSW();
};

 *SW.prototype.registerSW = function() {
  /*
   *  Register SW dimulai disini
   *  Copy script yang dicantumkan di artikel
   *
  if (!navigator.serviceWorker) return;

  const that = this;

  navigator.serviceWorker.register('/sw.js')
    .then(function(reg) {
      console.info('SW is registered.');

      if (!navigator.serviceWorker.controller) return;

      if (reg.waiting) {
        that.updateReady(reg.waiting);
        return;
      }

      if (reg.installing) {
        that.trackInstall(reg.installing);
        return;
      }

      reg.addEventListener('updatefound', function() {
        that.trackInstall(reg.installing);
      });

      let refreshing;
      navigator.serviceWorker.addEventListener('controllerchange', function() {
        if (refreshing) return;

        window.location.reload();
        refreshing = true;
      });
    })
    .catch(function() {
      console.error('Failed to register SW.');
    });
}

SW.prototype.trackInstall = function(worker) {
  const that = this;

  worker.addEventListener('statechange', function() {
    if (worker.state === 'installed') {
      that.updateReady(worker)
    }
  })
}

SW.prototype.updateReady = function(worker) {
  this.toast.show();

  this.button.on('click', function(event) {
    event.preventDefault();

    worker.postMessage({ action: 'skipWaiting' })
  })
}
*/