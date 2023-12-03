export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      accounts: {
        Row: {
          id: number;
          usernname: string;
        };
        Insert: {
          id?: never;
          username: string;
        };
        Update: {
          id?: never;
          name?: string; // `not null` columns are optional on .update()
        };
      };
    };
  };
}
