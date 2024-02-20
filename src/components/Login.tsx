import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  username: z
    .string()
    .min(2)
    .max(50, { message: "Username must be at least 2 characters" }),
  password: z
    .string()
    .min(8)
    .max(50, { message: "Password must be at least 8 charaters" }),
});

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const { username, password } = values;
    if (login(username, password)) {
      navigate("/");
    } else {
      alert("Incorrect information! Please try again.");
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <h1 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Log in to your account
        </h1>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          {" "}
          Welcome back! Please enter your details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="username" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            Log in
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default Login;
