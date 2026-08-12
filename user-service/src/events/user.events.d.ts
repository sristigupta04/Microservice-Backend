export declare enum UserEvent {
    USER_CREATED = "USER_CREATED",
    USER_LOGGED_IN = "USER_LOGGED_IN",
    USER_UPDATED = "USER_UPDATED",
    USER_DELETED = "USER_DELETED"
}
export interface UserCreatedEvent {
    event: UserEvent.USER_CREATED;
    data: {
        userId: number;
        email: string;
    };
}
export interface UserLoggedInEvent {
    event: UserEvent.USER_LOGGED_IN;
    data: {
        userId: number;
        email: string;
    };
}
export interface UserUpdatedEvent {
    event: UserEvent.USER_UPDATED;
    data: {
        userId: number;
        email: string;
    };
}
export interface UserDeletedEvent {
    event: UserEvent.USER_DELETED;
    data: {
        userId: number;
    };
}
//# sourceMappingURL=user.events.d.ts.map