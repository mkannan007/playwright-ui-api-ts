import { faker, th } from '@faker-js/faker';

export class UserModel {
  private firstName: string;
  private lastName: string;
  private postCode: string;

  constructor() {
    this.firstName = faker.person.firstName();
    this.lastName = faker.person.lastName();
    this.postCode = faker.location.zipCode();
  }

  public setFirstName(): string {
    return this.firstName;
  }

  public setLastName(): string {
    return this.lastName;
  }

  public setPostCode(): string {
    return this.postCode;
  }
}
