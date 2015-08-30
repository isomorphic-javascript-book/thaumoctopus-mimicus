export default class Application {

  navigate(url) {
    let { history } = window;

    if (!history.pushState) {
      window.location = url;
      return;
    }

    console.log(url);
    history.pushState({}, null, null);
  }

  start() {
console.log('START');

    this.popStateListener = window.addEventListener('popstate', (e) => {
      console.log(window.location);
    });

    this.clickListener = document.addEventListener('click', (e) => {
      let { currentTarget } = e;
      let identifier = currentTarget.dataset.navigate;
      let href = currentTarget.getAttribute('href');

      if (typeof identifier !== undefined) {
        this.navigate(identifier || href);
      }

      if (href) {
        e.preventDefault();
      }
    });
  }

}