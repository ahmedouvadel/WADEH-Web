import { HttpInterceptorFn } from '@angular/common/http';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = window.localStorage.getItem('token');

  // Define the routes that do not need the Authorization header
  const publicEndpoints = ['/auth/login', '/api/contents', '/api/propositions', '/api/comments', '/api/users','http://apipd.digital.gov.mr', 'http://apipd.digital.gov.mr/send-msg-otp'];
  // Check if the request URL matches any of the public endpoints
  const isPublic = publicEndpoints.some((endpoint) => req.url.includes(endpoint));
  if (!isPublic && myToken) {
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${myToken}`),
    });
    return next(clonedRequest);
  }

  return next(req);
};
