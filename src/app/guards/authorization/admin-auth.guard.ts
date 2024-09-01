import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../../services/user.service";

export const adminAuthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const userService = inject(UserService);

  if(userService.isAdmin()){
    return true;
  }
  router.navigate(['unauthorized']);
  return false;


};
