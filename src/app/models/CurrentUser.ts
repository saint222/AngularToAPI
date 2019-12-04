export interface CurrentUser {
    Data: {
      UserId: number;
      Email: string;
      FirstName: string;
      LastName: string;
      Role: string;
    },
    Success: boolean;
  }