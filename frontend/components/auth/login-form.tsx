"use client"

import * as React from "react"
import { Form, Field as FormischField, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import * as v from "valibot"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import InputPasswordWithToggle from "@/components/form/input-password-with-toggle"

const LoginSchema = v.object({
  phone: v.pipe(
    v.string(),
    v.nonEmpty("Phone number is required."),
    v.minLength(10, "Phone number must be exactly 10 digits."),
    v.maxLength(10, "Phone number must be exactly 10 digits."),
    v.regex(/^0[35789]\d*$/, "Enter a valid Vietnamese mobile number."),
  ),

  password: v.pipe(
    v.string(),
    v.nonEmpty("Password is required."),
    v.maxLength(72, "Password must be at most 72 characters.")
  ),

  rememberMe: v.boolean(),
})

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    schema: LoginSchema,

    initialInput: {
      phone: "",
      password: "",
      rememberMe: false,
    },

    // Show validation errors after the first submit.
    validate: "submit",

    // Update errors as the user corrects the form.
    revalidate: "input",
  })

  const handleSubmit: SubmitHandler<typeof LoginSchema> = (values) => {
    // Runs only after successful validation.
    console.log("Login form values:", values)
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your phone number below to log in to your account.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form of={form} onSubmit={handleSubmit}>
            <FieldGroup>
              {/* Vietnamese phone number */}
              <FormischField of={form} path={["phone"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <FieldLabel htmlFor="phone">Phone number</FieldLabel>

                    <Input
                      {...field.props}
                      id="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel"
                      placeholder="0912345678"
                      maxLength={10}
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                    />

                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({
                          message,
                        }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>

              {/* Password and forgot password */}
              <FormischField of={form} path={["password"]}>
                {(field) => (
                  <Field data-invalid={field.errors !== null}>
                    <div className="flex items-center">
                      <FieldLabel htmlFor="password">Password</FieldLabel>

                      <a
                        href="/forgot-password"
                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      >
                        Forgot password?
                      </a>
                    </div>

                    <InputPasswordWithToggle
                      {...field.props}
                      id="password"
                      autoComplete="current-password"
                      value={field.input ?? ""}
                      aria-invalid={field.errors !== null}
                    />

                    {field.errors && (
                      <FieldError
                        errors={field.errors.map((message) => ({
                          message,
                        }))}
                      />
                    )}
                  </Field>
                )}
              </FormischField>

              {/* Remember me aligned to the right */}
              <div className="flex justify-end">
                <FormischField of={form} path={["rememberMe"]}>
                  {(field) => (
                    <Field orientation="horizontal" className="w-fit">
                      <Checkbox
                        id="rememberMe"
                        className="rounded-sm"
                        checked={field.input ?? false}
                        onCheckedChange={(checked) =>
                          field.onChange(checked === true)
                        }
                        aria-invalid={field.errors !== null}
                      />

                      <FieldLabel
                        htmlFor="rememberMe"
                        className="w-auto font-normal"
                      >
                        Remember me
                      </FieldLabel>
                    </Field>
                  )}
                </FormischField>
              </div>

              {/* Submit and signup link */}
              <Field>
                <Button type="submit" className="w-full">
                  Login
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <a href="/signup" className="underline underline-offset-4">
                    Sign up
                  </a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
