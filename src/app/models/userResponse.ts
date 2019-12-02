export interface UserResponse {
  Data: {
    UserId: number;
    Email: string;
    FirstName: string;
    LastName: string;
  },
  Success: boolean;
}