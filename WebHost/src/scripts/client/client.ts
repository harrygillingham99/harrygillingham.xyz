//----------------------
// <auto-generated>
//     Generated using the NSwag toolchain v13.17.0.0 (NJsonSchema v10.8.0.0 (Newtonsoft.Json v13.0.0.0)) (http://NSwag.org)
// </auto-generated>
//----------------------

/* tslint:disable */
/* eslint-disable */
// ReSharper disable InconsistentNaming

export interface IClient {
  blog_Summary(
    page: number | null | undefined,
    pageSize: number | null | undefined
  ): Promise<BlogSummaryResponse>;

  blog_ArticleGET(slug: string | null): Promise<Blog>;

  blog_ArticlePOST(blog: Blog): Promise<boolean>;
}

export class Client implements IClient {
  private http: {
    fetch(url: RequestInfo, init?: RequestInit): Promise<Response>;
  };
  private baseUrl: string;
  protected jsonParseReviver: ((key: string, value: any) => any) | undefined =
    undefined;

  constructor(
    baseUrl?: string,
    http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }
  ) {
    this.http = http ? http : (window as any);
    this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : "";
  }

  blog_Summary(
    page: number | null | undefined,
    pageSize: number | null | undefined
  ): Promise<BlogSummaryResponse> {
    let url_ = this.baseUrl + "/api/blog/summary?";
    if (page !== undefined && page !== null)
      url_ += "page=" + encodeURIComponent("" + page) + "&";
    if (pageSize !== undefined && pageSize !== null)
      url_ += "pageSize=" + encodeURIComponent("" + pageSize) + "&";
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processBlog_Summary(_response);
    });
  }

  protected processBlog_Summary(
    response: Response
  ): Promise<BlogSummaryResponse> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 500) {
      return response.text().then((_responseText) => {
        let result500: any = null;
        let resultData500 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result500 = ProblemDetails.fromJS(resultData500);
        return throwException(
          "A server side error occurred.",
          status,
          _responseText,
          _headers,
          result500
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = BlogSummaryResponse.fromJS(resultData200);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<BlogSummaryResponse>(null as any);
  }

  blog_ArticleGET(slug: string | null): Promise<Blog> {
    let url_ = this.baseUrl + "/api/blog/article/{slug}";
    if (slug === undefined || slug === null)
      throw new Error("The parameter 'slug' must be defined.");
    url_ = url_.replace("{slug}", encodeURIComponent("" + slug));
    url_ = url_.replace(/[?&]$/, "");

    let options_: RequestInit = {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processBlog_ArticleGET(_response);
    });
  }

  protected processBlog_ArticleGET(response: Response): Promise<Blog> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 500) {
      return response.text().then((_responseText) => {
        let result500: any = null;
        let resultData500 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result500 = ProblemDetails.fromJS(resultData500);
        return throwException(
          "A server side error occurred.",
          status,
          _responseText,
          _headers,
          result500
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = Blog.fromJS(resultData200);
        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<Blog>(null as any);
  }

  blog_ArticlePOST(blog: Blog): Promise<boolean> {
    let url_ = this.baseUrl + "/api/blog/article";
    url_ = url_.replace(/[?&]$/, "");

    const content_ = JSON.stringify(blog);

    let options_: RequestInit = {
      body: content_,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };

    return this.http.fetch(url_, options_).then((_response: Response) => {
      return this.processBlog_ArticlePOST(_response);
    });
  }

  protected processBlog_ArticlePOST(response: Response): Promise<boolean> {
    const status = response.status;
    let _headers: any = {};
    if (response.headers && response.headers.forEach) {
      response.headers.forEach((v: any, k: any) => (_headers[k] = v));
    }
    if (status === 500) {
      return response.text().then((_responseText) => {
        let result500: any = null;
        let resultData500 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result500 = ProblemDetails.fromJS(resultData500);
        return throwException(
          "A server side error occurred.",
          status,
          _responseText,
          _headers,
          result500
        );
      });
    } else if (status === 200) {
      return response.text().then((_responseText) => {
        let result200: any = null;
        let resultData200 =
          _responseText === ""
            ? null
            : JSON.parse(_responseText, this.jsonParseReviver);
        result200 = resultData200 !== undefined ? resultData200 : <any>null;

        return result200;
      });
    } else if (status !== 200 && status !== 204) {
      return response.text().then((_responseText) => {
        return throwException(
          "An unexpected server error occurred.",
          status,
          _responseText,
          _headers
        );
      });
    }
    return Promise.resolve<boolean>(null as any);
  }
}

export class ProblemDetails implements IProblemDetails {
  type?: string | undefined;
  title?: string | undefined;
  status?: number | undefined;
  detail?: string | undefined;
  instance?: string | undefined;

  [key: string]: any;

  constructor(data?: IProblemDetails) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      for (var property in _data) {
        if (_data.hasOwnProperty(property)) this[property] = _data[property];
      }
      this.type = _data["type"];
      this.title = _data["title"];
      this.status = _data["status"];
      this.detail = _data["detail"];
      this.instance = _data["instance"];
    }
  }

  static fromJS(data: any): ProblemDetails {
    data = typeof data === "object" ? data : {};
    let result = new ProblemDetails();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    for (var property in this) {
      if (this.hasOwnProperty(property)) data[property] = this[property];
    }
    data["type"] = this.type;
    data["title"] = this.title;
    data["status"] = this.status;
    data["detail"] = this.detail;
    data["instance"] = this.instance;
    return data;
  }
}

export interface IProblemDetails {
  type?: string | undefined;
  title?: string | undefined;
  status?: number | undefined;
  detail?: string | undefined;
  instance?: string | undefined;

  [key: string]: any;
}

export class BlogSummaryResponse implements IBlogSummaryResponse {
  summaries?: BlogSummary[];
  hasNextPage?: boolean;

  constructor(data?: IBlogSummaryResponse) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
      if (data.summaries) {
        this.summaries = [];
        for (let i = 0; i < data.summaries.length; i++) {
          let item = data.summaries[i];
          this.summaries[i] =
            item && !(<any>item).toJSON
              ? new BlogSummary(item)
              : <BlogSummary>item;
        }
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      if (Array.isArray(_data["summaries"])) {
        this.summaries = [] as any;
        for (let item of _data["summaries"])
          this.summaries!.push(BlogSummary.fromJS(item));
      }
      this.hasNextPage = _data["hasNextPage"];
    }
  }

  static fromJS(data: any): BlogSummaryResponse {
    data = typeof data === "object" ? data : {};
    let result = new BlogSummaryResponse();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    if (Array.isArray(this.summaries)) {
      data["summaries"] = [];
      for (let item of this.summaries) data["summaries"].push(item.toJSON());
    }
    data["hasNextPage"] = this.hasNextPage;
    return data;
  }
}

export interface IBlogSummaryResponse {
  summaries?: IBlogSummary[];
  hasNextPage?: boolean;
}

export class BlogSummary implements IBlogSummary {
  title?: string;
  description?: string;
  slug?: string;
  id?: string;
  created?: Date;

  constructor(data?: IBlogSummary) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.title = _data["title"];
      this.description = _data["description"];
      this.slug = _data["slug"];
      this.id = _data["id"];
      this.created = _data["created"]
        ? new Date(_data["created"].toString())
        : <any>undefined;
    }
  }

  static fromJS(data: any): BlogSummary {
    data = typeof data === "object" ? data : {};
    let result = new BlogSummary();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["title"] = this.title;
    data["description"] = this.description;
    data["slug"] = this.slug;
    data["id"] = this.id;
    data["created"] = this.created
      ? this.created.toISOString()
      : <any>undefined;
    return data;
  }
}

export interface IBlogSummary {
  title?: string;
  description?: string;
  slug?: string;
  id?: string;
  created?: Date;
}

export class Blog extends BlogSummary implements IBlog {
  markdownContent?: string;

  constructor(data?: IBlog) {
    super(data);
  }

  init(_data?: any) {
    super.init(_data);
    if (_data) {
      this.markdownContent = _data["markdownContent"];
    }
  }

  static fromJS(data: any): Blog {
    data = typeof data === "object" ? data : {};
    let result = new Blog();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["markdownContent"] = this.markdownContent;
    super.toJSON(data);
    return data;
  }
}

export interface IBlog extends IBlogSummary {
  markdownContent?: string;
}

export class BlogConfig implements IBlogConfig {
  defaultPageSize?: number;
  defaultPage?: number;
  linkedInUrl?: string;
  gitHubUrl?: string;

  constructor(data?: IBlogConfig) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }

  init(_data?: any) {
    if (_data) {
      this.defaultPageSize = _data["defaultPageSize"];
      this.defaultPage = _data["defaultPage"];
      this.linkedInUrl = _data["linkedInUrl"];
      this.gitHubUrl = _data["gitHubUrl"];
    }
  }

  static fromJS(data: any): BlogConfig {
    data = typeof data === "object" ? data : {};
    let result = new BlogConfig();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === "object" ? data : {};
    data["defaultPageSize"] = this.defaultPageSize;
    data["defaultPage"] = this.defaultPage;
    data["linkedInUrl"] = this.linkedInUrl;
    data["gitHubUrl"] = this.gitHubUrl;
    return data;
  }
}

export interface IBlogConfig {
  defaultPageSize?: number;
  defaultPage?: number;
  linkedInUrl?: string;
  gitHubUrl?: string;
}

export class SwaggerException extends Error {
  message: string;
  status: number;
  response: string;
  headers: { [key: string]: any };
  result: any;

  constructor(
    message: string,
    status: number,
    response: string,
    headers: { [key: string]: any },
    result: any
  ) {
    super();

    this.message = message;
    this.status = status;
    this.response = response;
    this.headers = headers;
    this.result = result;
  }

  protected isSwaggerException = true;

  static isSwaggerException(obj: any): obj is SwaggerException {
    return obj.isSwaggerException === true;
  }
}

function throwException(
  message: string,
  status: number,
  response: string,
  headers: { [key: string]: any },
  result?: any
): any {
  throw new SwaggerException(message, status, response, headers, result);
}
