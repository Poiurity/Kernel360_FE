import { NewsFeed, NewsDetail } from '../types';

export default class Api {
  xhr: XMLHttpRequest;
  url: string;

  constructor(url: string) {
    this.xhr = new XMLHttpRequest();
    this.url = url;
  }

  getRequestWithXHR<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    this.xhr.open('GET', this.url);
    this.xhr.addEventListener('load', () => {
      cb(JSON.parse(this.xhr.response) as AjaxResponse);
    });

    this.xhr.send();
  }

  getRequestWithPromise<AjaxResponse>(cb: (data: AjaxResponse) => void): void {
    fetch(this.url)
      .then(response => response.text())
      .then(text => {
        try {
          const data = JSON.parse(text) as AjaxResponse;
          try {
            cb(data);
          } catch (cbError) {
            console.error('콜백 내부 에러:', cbError);
          }
        } catch (jsonError) {
          console.error('JSON 파싱 실패:', jsonError);
        }
      })
      .catch(err => {
        console.error('데이터 로드 실패:', err);
      });
  }
}

export class NewsFeedApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getDataWithXHR(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithXHR<NewsFeed[]>(cb);
  }

  getDataWithPromise(cb: (data: NewsFeed[]) => void): void {
    return this.getRequestWithPromise<NewsFeed[]>(cb);
  }
}

export class NewsDetailApi extends Api {
  constructor(url: string) {
    super(url);
  }

  getDataWithXHR(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithXHR<NewsDetail>(cb);
  }

  getDataWithPromise(cb: (data: NewsDetail) => void): void {
    return this.getRequestWithPromise<NewsDetail>(cb);
  }
}
