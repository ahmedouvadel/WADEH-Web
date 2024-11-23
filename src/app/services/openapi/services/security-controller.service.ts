/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { authentication } from '../fn/security-controller/authentication';
import { Authentication$Params } from '../fn/security-controller/authentication';
import { login } from '../fn/security-controller/login';
import { Login$Params } from '../fn/security-controller/login';

@Injectable({ providedIn: 'root' })
export class SecurityControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `login()` */
  static readonly LoginPath = '/auth/login';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `login()` instead.
   *
   * This method doesn't expect any request body.
   */
  login$Response(params: Login$Params, context?: HttpContext): Observable<StrictHttpResponse<{
[key: string]: string;
}>> {
    return login(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `login$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  login(params: Login$Params, context?: HttpContext): Observable<{
[key: string]: string;
}> {
    return this.login$Response(params, context).pipe(
      map((r: StrictHttpResponse<{
[key: string]: string;
}>): {
[key: string]: string;
} => r.body)
    );
  }

  /** Path part for operation `authentication()` */
  static readonly AuthenticationPath = '/auth/profile';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `authentication()` instead.
   *
   * This method doesn't expect any request body.
   */
  authentication$Response(params?: Authentication$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return authentication(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `authentication$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  authentication(params?: Authentication$Params, context?: HttpContext): Observable<void> {
    return this.authentication$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

}
