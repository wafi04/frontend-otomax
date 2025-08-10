export const getRoleBadgeVariant = (role: string) => {
  switch (role?.toLowerCase()) {
    case "admin":
      return "destructive";
    case "moderator":
      return "default";
    case "user":
      return "secondary";
    default:
      return "outline";
  }
};
