import { AuthUser, Entity, StorableEntity, UserNotificationType, UserType } from '@project/shared-core';
import { Document } from 'mongoose';

export class UserEntity extends Entity implements StorableEntity<AuthUser> {
  public email: string;
  public firstName: string;
  public lastName: string;
  public dateOfBirth: Date;
  public userType: UserType;
  public passwordHash: string;
  public avatarId: string;
  public registeredAt: Date;
  public subscriptionIds: string[];
  public notificationType: UserNotificationType;

  constructor(user?: AuthUser) {
    super();
    this.populate(user);
  }

  public populate(user?: AuthUser): void {
    if (!user) {
      return;
    }

    this.id = user.id ?? '';
    this.email = user.email;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.dateOfBirth = user.dateOfBirth ?? new Date(0);
    this.userType = user.userType ?? UserType.USER;
    this.passwordHash = user.passwordHash;
    this.avatarId = user.avatarUrl ?? '';
    this.registeredAt = user.registeredAt ?? new Date();
    this.subscriptionIds = user.subscriptions ?? [];
    this.notificationType = user.notificationType ?? UserNotificationType.EMAIL;
  }

  public toPOJO() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      dateOfBirth: this.dateOfBirth,
      userType: this.userType,
      passwordHash: this.passwordHash,
      avatarUrl: this.avatarId,
      registeredAt: this.registeredAt,
      notificationType: this.notificationType,
      subscriptions: this.subscriptionIds,
    };
  }
}
