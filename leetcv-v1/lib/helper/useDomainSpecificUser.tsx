import { useSession } from "next-auth/react";

export function useDomainSpecificUser() {
  const { data: session } = useSession();

  const collegeDomain = process.env.NEXT_PUBLIC_MOCK_INTERVIEW_EMAIL_DOMAIN!;
  const allowedDomains = collegeDomain
    ?.split(",")
    .map((domain) => domain.trim());
  const isAllowedUser = allowedDomains?.some((domain) =>
    session?.user?.email?.endsWith(domain)
  );
  return isAllowedUser;
}
