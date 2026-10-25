"use client"

import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import type { ComponentProps } from "react"

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"

type InputPasswordWithToggleProps = Omit<
  ComponentProps<typeof InputGroupInput>,
  "type"
>

export default function InputPasswordWithToggle({
  ...props
}: InputPasswordWithToggleProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <InputGroup className="bg-background">
      <InputGroupInput {...props} type={showPassword ? "text" : "password"} />

      <InputGroupAddon align="inline-end">
        <InputGroupButton
          type="button"
          size="icon-xs"
          aria-label={showPassword ? "Hide password" : "Show password"}
          aria-pressed={showPassword}
          onClick={() => setShowPassword((current) => !current)}
        >
          {showPassword ? (
            <EyeOffIcon aria-hidden="true" />
          ) : (
            <EyeIcon aria-hidden="true" />
          )}
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  )
}
