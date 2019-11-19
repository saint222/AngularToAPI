import { FormGroup } from '@angular/forms';

export class CustomValidators {


    static comparePasswords(fb: FormGroup) {
        const compare = fb.get('PasswordConfirmation');
        if (compare.errors == null || 'passwordMismatch' in compare.errors) {
            if (fb.get('Password').value !== compare.value) {
                compare.setErrors({ passwordMismatch: true });
            } else {
                compare.setErrors(null);
            }
        }
    }
}