import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { UserviewComponent } from './pages/userview/userview.component';
import { FormComponent } from './pages/form/form.component';

export const routes: Routes = [

    {path:"", pathMatch:"full",redirectTo:"home"},
    {path:"home",component:UserListComponent},
    {path:"control-panel",component:ControlPanelComponent , children: [
        {path:"",pathMatch: 'full',redirectTo: 'home'},
        {path:"empleado/:id",component:UserviewComponent},
        {path:"home", component:UserListComponent},
        {path:"nuevo-empleado", component:FormComponent},
        {path:"actualizar-empleado/:id", component:FormComponent}
    ]},
    
    {path:"**",redirectTo:"home"}
];
