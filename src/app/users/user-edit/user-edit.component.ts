import { Component, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { User } from 'models/user';
import { DeleteUserService } from '../delete-user.service';
import { EditUserService } from '../edit-user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  user: User = {
    name: null,
    email: null,
    login: null,
    roles: [],
    isActive: 'true'
  };
  rolesError: Boolean = false;
  showSuccessAlert: Boolean = false;
  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private userService: UserService,
    private deleteUserService: DeleteUserService,
    private editUserService: EditUserService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const userId = params['userid'];
      this.userService
        .getUsers()
        .subscribe(users => this.user = users[userId]);
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
    this.editUserService.editUser(this.user).subscribe({
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
