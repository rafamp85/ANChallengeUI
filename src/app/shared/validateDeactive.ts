import { AddAccountComponent } from "../home/components/accounts/add-account.component";
import { EditMyProfileComponent } from "../home/components/profile/edit-myprofile.component";
import { RegisterComponent } from "../home/components/users/register.component";


export function checkDirtyStateProfile( component: EditMyProfileComponent ) {
    if( component.isDirty ) {
        return window.confirm('You have not saved your Profile, do you really want to cancel');
    }
    return true;
}

export function checkDirtyStateRegister( component: RegisterComponent ) {
    if( component.isDirty ) {
        return window.confirm('You have not saved this User, do you really want to cancel');
    }
    return true;
}

export function checkDirtyStateAccount( component: AddAccountComponent ) {
    console.log(component.isDirty);
    if( component.isDirty ) {
        return window.confirm('You have not saved this Account, do you really want to cancel');
    }
    return true;
}