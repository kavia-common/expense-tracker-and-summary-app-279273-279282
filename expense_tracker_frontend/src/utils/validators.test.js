import { validators } from './validators';

describe('validators.email', () => {
  test('accepts common valid emails', () => {
    const valid = [
      'test@example.com',
      'user.name+tag@domain.co.uk',
      'USER_name-123+tag@Sub.Domain.CO',
      'a.b-c_d+e@foo-bar.example',
      'first.last@sub.domain.co',
    ];
    valid.forEach((e) => {
      expect(validators.email(e)).toBe(true);
    });
  });

  test('trims input and still validates', () => {
    expect(validators.email('  test@example.com  ')).toBe(true);
  });

  test('rejects clearly invalid emails', () => {
    const invalid = [
      '',
      '   ',
      'noatsymbol.com',
      'user@',
      '@domain.com',
      'user@domain',
      'user@domain.',
      'user@.domain.com',
      'user..name@example.com',
      'user@-domain.com',
      'user@domain-.com',
    ];
    invalid.forEach((e) => {
      expect(validators.email(e)).toBe(false);
    });
  });
});
