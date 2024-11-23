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

import { createProposition } from '../fn/proposition-controller/create-proposition';
import { CreateProposition$Params } from '../fn/proposition-controller/create-proposition';
import { deleteProposition } from '../fn/proposition-controller/delete-proposition';
import { DeleteProposition$Params } from '../fn/proposition-controller/delete-proposition';
import { getAllPropositions } from '../fn/proposition-controller/get-all-propositions';
import { GetAllPropositions$Params } from '../fn/proposition-controller/get-all-propositions';
import { getPropositionById } from '../fn/proposition-controller/get-proposition-by-id';
import { GetPropositionById$Params } from '../fn/proposition-controller/get-proposition-by-id';
import { PropositionDto } from '../models/proposition-dto';
import { updateProposition } from '../fn/proposition-controller/update-proposition';
import { UpdateProposition$Params } from '../fn/proposition-controller/update-proposition';

@Injectable({ providedIn: 'root' })
export class PropositionControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `getPropositionById()` */
  static readonly GetPropositionByIdPath = '/api/propositions/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getPropositionById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPropositionById$Response(params: GetPropositionById$Params, context?: HttpContext): Observable<StrictHttpResponse<PropositionDto>> {
    return getPropositionById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getPropositionById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getPropositionById(params: GetPropositionById$Params, context?: HttpContext): Observable<PropositionDto> {
    return this.getPropositionById$Response(params, context).pipe(
      map((r: StrictHttpResponse<PropositionDto>): PropositionDto => r.body)
    );
  }

  /** Path part for operation `updateProposition()` */
  static readonly UpdatePropositionPath = '/api/propositions/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `updateProposition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProposition$Response(params: UpdateProposition$Params, context?: HttpContext): Observable<StrictHttpResponse<PropositionDto>> {
    return updateProposition(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `updateProposition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  updateProposition(params: UpdateProposition$Params, context?: HttpContext): Observable<PropositionDto> {
    return this.updateProposition$Response(params, context).pipe(
      map((r: StrictHttpResponse<PropositionDto>): PropositionDto => r.body)
    );
  }

  /** Path part for operation `deleteProposition()` */
  static readonly DeletePropositionPath = '/api/propositions/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProposition()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProposition$Response(params: DeleteProposition$Params, context?: HttpContext): Observable<StrictHttpResponse<void>> {
    return deleteProposition(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteProposition$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProposition(params: DeleteProposition$Params, context?: HttpContext): Observable<void> {
    return this.deleteProposition$Response(params, context).pipe(
      map((r: StrictHttpResponse<void>): void => r.body)
    );
  }

  /** Path part for operation `getAllPropositions()` */
  static readonly GetAllPropositionsPath = '/api/propositions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllPropositions()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPropositions$Response(params?: GetAllPropositions$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<PropositionDto>>> {
    return getAllPropositions(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllPropositions$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllPropositions(params?: GetAllPropositions$Params, context?: HttpContext): Observable<Array<PropositionDto>> {
    return this.getAllPropositions$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<PropositionDto>>): Array<PropositionDto> => r.body)
    );
  }

  /** Path part for operation `createProposition()` */
  static readonly CreatePropositionPath = '/api/propositions';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `createProposition()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProposition$Response(params: CreateProposition$Params, context?: HttpContext): Observable<StrictHttpResponse<PropositionDto>> {
    return createProposition(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `createProposition$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  createProposition(params: CreateProposition$Params, context?: HttpContext): Observable<PropositionDto> {
    return this.createProposition$Response(params, context).pipe(
      map((r: StrictHttpResponse<PropositionDto>): PropositionDto => r.body)
    );
  }

}
