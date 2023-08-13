export enum ThirdPartyService {}

abstract class CustomUrl {
  readonly host: string;
  apiKey: string;
  query: { [key: string]: string }[] = [];

  constructor(hostname: string) {
    this.host = hostname;
  }

  addApiKey(key: string) {
    this.apiKey = key;
    return this;
  }

  addQuery(param: string, value: string) {
    this.query[param] = value;
    return this;
  }

  url(): string {
    const url = `${this.host}?api_key=${this.apiKey}`;
    let queries: string[] = [];

    this.query.forEach((q) => {
      Object.entries(q).forEach(([key, value]) => {
        queries.push(`${key}=${value}`);
      });
    });

    const queryParams = queries.join('&');

    return `${url}${queryParams}`;
  }
}
