const Events = require('./Events');

function initStreetNameLoader() {
  const streetElement = document.querySelector('[streetmix-loader]');
  streetElement.addEventListener('streetmix-loader-street-loaded', handleLoaded());
  function handleLoaded() {
    Events.emit('streetloaded', streetElement);
  }
}
module.exports.initStreetNameLoader = initStreetNameLoader;
