
// import { cn } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Field,
//   FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"

// export  function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div className={cn("flex flex-col gap-6", className)} {...props}>
//       <Card>
//         <CardHeader>
//           <CardTitle>Login to your account</CardTitle>
//           <CardDescription>
//             Enter your email below to login to your account
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <form>
//             <FieldGroup>
//               <Field>
//                 <FieldLabel htmlFor="email">Email</FieldLabel>
//                 <Input
//                   id="email"
//                   type="email"
//                   placeholder="m@example.com"
//                   required
//                 />
//               </Field>
//               <Field>
//                 <div className="flex items-center">
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                   <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 </div>
//                 <Input id="password" type="password" placeholder="********" required />
//               </Field>
//               <Field>
//                 <Button type="submit">Login</Button>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/lib/auth/hooks/useAuth";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const redirectTo = searchParams.get("from") || "/dashboard";
  
  const login = useLogin();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login.mutateAsync(form);

    // if successful → redirect
    router.push(redirectTo);
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter credentials to continue</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={form.email}
                  onChange={handleChange}
                />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                  value={form.password}
                  onChange={handleChange}
                />
              </Field>

              <Field>
                <Button
                  type="submit"
                  disabled={login.isPending}
                  className="w-full"
                >
                  {login.isPending ? "Logging in..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
