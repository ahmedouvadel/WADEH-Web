import { HttpInterceptorFn } from "@angular/common/http";

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const myToken = window.localStorage.getItem("token");
  if (!req.url.includes("/auth/login")){
    const clonedRequest = req.clone({
      headers: req.headers.set('Authorization','Bearer '+myToken)
      
    });
    return next(clonedRequest);
  }
  return next(req);
};
