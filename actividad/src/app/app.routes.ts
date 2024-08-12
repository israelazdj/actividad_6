import { Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list/user-list.component';
import { ControlPanelComponent } from './pages/control-panel/control-panel.component';
import { UserviewComponent } from './pages/userview/userview.component';
import { FormComponent } from './pages/form/form.component';
import { CardUserComponent } from './pages/card-user/card-user.component';

export const routes: Routes = [

     {path:"", pathMatch:"full",redirectTo:"control-panel"}, 
    //{path:"home",component:UserListComponent},
    /* {path:'home', component: UserListComponent},
    {path: "user", component: UserviewComponent}, */
    {path:"control-panel",component:ControlPanelComponent , children: [
        {path:"",pathMatch: 'full',redirectTo: 'home'},
        {path:"users/:id",component:CardUserComponent},
        {path:"home", component:UserListComponent},
        {path:"new", component:FormComponent},
        {path:"actualizar-usuario/:id", component:FormComponent}
    ]},
    
    //{path:"**",redirectTo:"home"}
];
