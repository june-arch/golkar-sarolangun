import { useQuery } from "@tanstack/react-query";

import { postLogin } from "@/controller/admin/admin.service";

export const useLoginAdminQuery = (username: string, password: string) => useQuery(["admin-auth", postLogin({username, password})]); 