"use client"

import * as React from "react"
import { Form, Field as FormischField, useForm } from "@formisch/react"
import type { SubmitHandler } from "@formisch/react"
import * as v from "valibot"

import { Button } from "@/components/ui/button"
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

const SignupSchema = v.pipe(
  v.object({
    name: v.pipe(
      v.string(),
      v.trim(),
      v.nonEmpty("Full name is required."),
      v.maxLength(100, "Full name must be at most 100 characters.")
    ),

    phone: v.pipe(
      v.string(),
      v.nonEmpty("Phone number is required."),
      v.regex(/^0[35789]\d{8}$/, "Enter a valid Vietnamese mobile number.")
    ),

    password: v.pipe(
      v.string(),
      v.nonEmpty("Password is required."),
      v.minLength(8, "Password must be at least 8 characters long."),
      v.maxLength(72, "Password must be at most 72 characters.")
    ),

    confirmPassword: v.pipe(
      v.string(),
      v.nonEmpty("Please confirm your password."),
      v.maxLength(72, "Password must be at most 72 characters.")
    ),
  }),

  v.forward(
    v.partialCheck(
      [["password"], ["confirmPassword"]],
      ({ password, confirmPassword }) =>
        password.length === 0 ||
        confirmPassword.length === 0 ||
        password === confirmPassword,
      "Passwords do not match."
    ),
    ["confirmPassword"]
  )
)

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form = useForm({
    schema: SignupSchema,

    initialInput: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },

    // Validate only when the form is submitted the first time.
    validate: "submit",

    // After the first submit, update errors as the user types.
    revalidate: "input",
  })

  const handleSubmit: SubmitHandler<typeof SignupSchema> = (values) => {
    // This handler runs only after successful validation.
    console.log("Signup form values:", values)
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form of={form} onSubmit={handleSubmit}>
          <FieldGroup>
            {/* Full name */}
            <FormischField of={form} path={["name"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="name">Full Name</FieldLabel>

                  <Input
                    {...field.props}
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    autoComplete="name"
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
                    placeholder="0912345678"
                    autoComplete="tel"
                    maxLength={10}
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                  />

                  <FieldDescription>
                    We&apos;ll use this number to contact you.
                  </FieldDescription>

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

            {/* Password */}
            <FormischField of={form} path={["password"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="password">Password</FieldLabel>

                  <Input
                    {...field.props}
                    id="password"
                    type="password"
                    autoComplete="new-password"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                  />

                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>

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

            {/* Confirm password */}
            <FormischField of={form} path={["confirmPassword"]}>
              {(field) => (
                <Field data-invalid={field.errors !== null}>
                  <FieldLabel htmlFor="confirm-password">
                    Confirm Password
                  </FieldLabel>

                  <Input
                    {...field.props}
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    value={field.input ?? ""}
                    aria-invalid={field.errors !== null}
                  />

                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>

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

            {/* Submit */}
            <Field>
              <Button type="submit" className="w-full">
                Create Account
              </Button>

              <FieldDescription className="px-6 text-center">
                Already have an account?{" "}
                <a href="/login" className="underline underline-offset-4">
                  Sign in
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </Form>
      </CardContent>
    </Card>
  )
}
