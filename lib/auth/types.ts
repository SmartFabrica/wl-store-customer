import type { AccountType } from "@/lib/validations/auth";

export type UserRow = {
  id: string;
  email: string;
  role: AccountType;
  status: string;
  created_at: string;
  updated_at: string;
};

export type CorporateProfile = {
  company_name: string;
  phone: string;
  address: string | null;
  tax_number: string | null;
  tax_office: string | null;
};

export type IndividualProfile = {
  first_name: string;
  last_name: string;
  phone: string | null;
};

export type CorporateUser = UserRow & {
  role: "corporate";
  profile: CorporateProfile;
};

export type IndividualUser = UserRow & {
  role: "individual";
  profile: IndividualProfile;
};

export type UserAggregate = CorporateUser | IndividualUser;

export const displayName = (user: UserAggregate) =>
  user.role === "corporate"
    ? user.profile.company_name
    : `${user.profile.first_name} ${user.profile.last_name}`;
