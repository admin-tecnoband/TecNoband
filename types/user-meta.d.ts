interface UserMeta {
  full_name?: string;
  name?: string;
  company?: string;
  avatar?: string;
  avatar_url?: string;
}

declare module "@/types/user-meta" {
  export type { UserMeta };
}
