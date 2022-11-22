import {
  OrganizationDescription,
  OrganizationDescriptionLengthError,
} from './organization-description';

describe('OrganizationDescription', () => {
  it('constructs', () => {
    const description = new OrganizationDescription('hello');
    expect(description.value).toBe('hello');
  });

  it('throws and error when description is too long', () => {
    expect(() => {
      new OrganizationDescription('a'.repeat(5001));
    }).toThrowError(OrganizationDescriptionLengthError);
  });
});
