import validator from 'validator';

import { ValueObject } from '../../utils';

export class InvalidOrganizationNameError extends Error {}

export class OrganizationName extends ValueObject<string> {
  public static from(value: string): OrganizationName {
    if (validator.isLength(value, { min: 1, max: 50 })) {
      return new OrganizationName(value);
    }

    throw new InvalidOrganizationNameError('Invalid Organization name');
  }
}
