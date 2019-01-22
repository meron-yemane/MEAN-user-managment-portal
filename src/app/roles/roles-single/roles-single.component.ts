import { Component, OnInit, NgZone } from '@angular/core';
import { Role } from 'models/role';
import { ActivatedRoute } from '@angular/router';
import { EditRoleService } from '../edit-role.service';
import { GetRolesService } from '../get-roles.service';
import { GetPermissionsService } from '../get-permissions.service';

@Component({
  selector: 'app-roles-single',
  templateUrl: './roles-single.component.html',
  styleUrls: ['./roles-single.component.scss']
})
export class RolesSingleComponent implements OnInit {
  role;
  permissions: {};
  permissionsError: Boolean = false;
  showSuccessAlert: Boolean = false;
  constructor(
    private zone: NgZone,
    private route: ActivatedRoute,
    private editRoleService: EditRoleService,
    private getRolesService: GetRolesService,
    private getPermissionsService: GetPermissionsService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const roleId = params['role'];
      this.getRolesService
        .getSingleRole(roleId)
        .subscribe(
          role => this.role = role,
          err => console.log(err),
          () => {
            this.permissions = this.getPermissionsService.getPermissions();
          }
        );
    });
  }

  onCheckBoxChange(event, role) {
    if (this.role.permissions.indexOf(role) > -1) {
      this.role.permissions.splice(this.role.permissions.indexOf(role), 1);
    } else {
      this.role.permissions.push(role);
    }
    this.permissionsError = this.role.permissions.length > 0 ? false : true;
  }

  processRoleEditForm() {
    this.editRoleService.editRole(this.role, this.role.id).subscribe({
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
}
