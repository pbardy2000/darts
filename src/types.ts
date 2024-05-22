import { FormControl } from '@angular/forms';

export type TypedForm<T extends object> = {
  [K in keyof T]: FormControl<T[K]>;
};
