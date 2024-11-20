import { UntypedFormControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {
    static emptyTextValidator(control: UntypedFormControl) {
        if (control.value && control.value.trim()) {
            return null;
        } else {
            return { required: true };
        }
    }

    static phoneNumberValidator(control: UntypedFormControl) {
        if (!control.value) {
            return null;
        }
        const pattern = /^[- +()]*[0-9][- +()0-9]*$/;
        if (control.value && pattern.test(control.value)) {
            return null;
        } else {
            return { invalidPhoneNumber: true };
        }
    }

    static numberRageValidator(control: UntypedFormControl) {
        if (!control.value) {
            return null;
        }
        const pattern = /^[0-9 .,\-]+$/;
        if (control.value && pattern.test(control.value)) {
            return null;
        } else {
            return { invalidNumberRange: true };
        }
    }

    // @ts-ignore
    static nameValidator(control: UntypedFormControl): { [key: string]: boolean } {
        const nameRegexp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?]/;
        if (control.value && nameRegexp.test(control.value)) {
            return { invalidName: true };
        }
    }

    static isValidGSTNumber(control: UntypedFormControl) {
        if (!control.value) {
            return null;
        }
        const pattern = /^\d{2}[A-Z]{5}\d{4}[A-Z]{1}[A-Z\d]{1}[Z]{1}[A-Z\d]{1}$/;
        if (control.value && pattern.test(control.value) && control.value.length === 15) {
            return null;
        } else {
            return { invalidGST: true };
        }
    }

    static isValidURL(control: UntypedFormControl) {
        if (!control.value) {
            return null;
        }
        let url;

        try {
            url = new URL(control.value);
        } catch (_) {
            return { invalidUrl: true };
        }

        return url.protocol === "http:" || url.protocol === "https:" ? null : { invalidUrl: true };
    }

    static isValidUPILink(control: UntypedFormControl) {
        if (!control.value) {
            return null;
        }
        const pattern = /^\w.+@\w+$/;
        if (control.value && pattern.test(control.value)) {
            return null;
        } else {
            return { invalidUPILink: true };
        }
    }

    static atLeastOne =
        (validator: ValidatorFn, controls: string[] = null) =>
        (group: UntypedFormGroup): ValidationErrors | null => {
            if (!controls) {
                controls = Object.keys(group.controls);
            }

            const hasAtLeastOne = group && group.controls && controls.some(k => !validator(group.controls[k]));

            return hasAtLeastOne
                ? null
                : {
                      atLeastOne: true,
                  };
        };
}
