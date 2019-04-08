import {debounce} from './constant';

export default class ScrollPage {
  constructor(settings) {
    this.settings = Object.assign({
      onPage: () => {},
      onChangeState: () => {},
      offset: 0,
      debounce: 100,
      pageSize: 10
    }, settings);

    this.isBusy = false;
    this.isEnd = false;
    this.isInstalled = false;

    this.paging = {
      page: 0,
      pageSize: this.settings.pageSize,
      list: []
    }
  }

  install() {
    let that = this;

    $(window).on('scroll.scrollPage', debounce(function(){
      if(that.isBusy || that.isEnd){
        return;
      }

      let winPO = window.pageYOffset,
          winIH = window.innerHeight,
          docSH = document.documentElement.scrollHeight;

      if(winPO + winIH >= docSH - that.settings.offset){
        $(window).scrollTop($(window).scrollTop() - 1);
        that.fetchPage();
      }
    }, that.settings.debounce));

    this.isInstalled = true;
  }

  uninstall() {
    this.isInstalled = false;
    $(window).off('scroll.scrollPage');
  }

  busy() {
    this.isBusy = true;
    this.changeState();
  }

  free() {
    this.isBusy = false;
    this.changeState();
  }

  end() {
    this.isEnd = true;
    this.changeState();
  }

  reset(page) {
    this.isBusy = false;
    this.isEnd = false;
    this.paging.page = page;
    this.paging.list = [];
    this.changeState();
    this.fetchPage(page);
  }

  changeState() {
    if (!this.isInstalled) return;
    this.settings.onChangeState({
      isBusy: this.isBusy,
      list: this.paging.list
    });
  }

  fetchPage(page) {
    this.busy();

    if (page === undefined) page = this.paging.page + 1;
    this.settings.onPage({
      page: page,
      pageSize: this.paging.pageSize
    }, (data) => {
      this.free();
      this.paging.page = page;
      this.paging.list = this.paging.list.concat(data);
      this.isEnd = data.length < this.paging.pageSize;
      this.changeState();
    });
  }
}
