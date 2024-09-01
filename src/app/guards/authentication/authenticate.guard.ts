import { CanActivateFn, Router } from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../../services/user.service";

export const authenticateGuard: CanActivateFn = (route, state) => {

 const router = inject(Router);
 const userService = inject(UserService)


  if (userService.isLoggedIn()) {
   return true;
  }
    router.navigate(['/login'])
    return false;


};
