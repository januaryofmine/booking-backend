import { UserRole } from "src/common/dto/user.dto";

export interface SearchUser {
   username: string;
   phone: string ;
   email: string;
   take: number;
   skip: number;
}

export interface User {
   id?: string;
   name?: string;
   username?: string;
   email?: string;
   phone?: string;
   password?: string;
   role?: UserRole;
}
