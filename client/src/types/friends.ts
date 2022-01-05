export interface IApproveFriendRequestPayload {
  friendRequestId: string;
  friendUserId: string;
}

export enum FriendRequestsStatusEnum {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
}
