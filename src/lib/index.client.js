export default class Application {

  navigate(url) {
    let { history } = window;

    if (!history.pushState) {
      window.location = url;
      return;
    }

    console.log(url);
    history.pushState({}, null, url);
  }

  start() {
    this.popStateListener = window.addEventListener('popstate', (e) => {
      console.log(window.location.pathname);
    });

    this.clickListener = document.addEventListener('click', (e) => {
      let { target } = e;
      let identifier = target.dataset.navigate;
      let href = target.getAttribute('href');

      if (identifier !== undefined) {
        this.navigate(identifier || href);
        if (href) {
          e.preventDefault();
        }
      }
    });
  }

}