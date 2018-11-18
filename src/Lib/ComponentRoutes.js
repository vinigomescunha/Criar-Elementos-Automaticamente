import UrlsList from '../Data/UrlList';
export default class ComponentRoutes {

  static browser = window.location;
  static separator = '#';
  static urls = UrlsList.list;
  static defaultPath = UrlsList.list.home;
  static isHash() {
    return ComponentRoutes.separator === '#';
  }
  static getPath() {
    var c = ComponentRoutes;
    var url = c.isHash() ? c.browser.hash : c.browser.pathname;
    return url.replace(new RegExp(c.separator, 'g'), '')
  }
  static getRouteComponent() {
    var c = ComponentRoutes;
    var u = c.getPath();
    return c.urls[u] ? c.urls[u] : c.defaultPath;
  }
  static registerHashState(callback) {
    window.addEventListener('hashchange', callback);
  }
  static getAllUrls() {
    return ComponentRoutes.urls;
  }
}