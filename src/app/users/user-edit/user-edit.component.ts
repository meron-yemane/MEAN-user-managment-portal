import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User } from 'models/user';
import { DeleteUserService } from '../delete-user.service';
import { EditUserService } from '../edit-user.service';
import { GetRolesService } from 'src/app/roles/get-roles.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user;
  roles: {};
  rolesError: Boolean = false;
  showSuccessAlert: Boolean = false;
  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private userService: UserService,
    private deleteUserService: DeleteUserService,
    private editUserService: EditUserService,
    private getRolesService: GetRolesService
  ) { }

  activeRoles = function(obj) {
    const result = [];
    let role;
    for (role = 0; role < obj.length; role++) {
      if (obj[role].isActive === 'true') {
        result.push(obj[role]);
      }
    }
    return result;
  };

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['userid'];
      this.userService
        .getSingleUser(userId)
        .subscribe(user => {
          this.user = user;
        },
          err => console.log(err),
          () => {
            this.getRolesService.getRoles()
            .subscribe((allRoles) => {
              this.roles = this.activeRoles(allRoles);
            });
          }
          );
    });
  }

  onCheckBoxChange(event, role) {
    if (this.user.roles.indexOf(role) > -1) {
      this.user.roles.splice(this.user.roles.indexOf(role), 1);
    } else {
      this.user.roles.push(role);
    }
    this.rolesError = this.user.roles.length > 0 ? false : true;
  }

  processUserEditForm() {
    this.editUserService.editUser(this.user, this.user._id).subscribe({
      next: x => console.log('Observers next value: ' + x),
      error: err => console.log(err),
      complete: () => {
        this.zone.run(() => {
        this.showSuccessAlert = true;
        setTimeout( () => {
          this.showSuccessAlert = false;
        }, 5000);
      });
      }
    });
  }

  processDeleteUser() {
    this.route.params.subscribe(params => {
      const userIdForDeletion = params['userid'];
      this.deleteUserService.deleteUser(userIdForDeletion);
    });
  }
}
