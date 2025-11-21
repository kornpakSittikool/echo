import React, { type ButtonHTMLAttributes, type ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
};

const buildClassName = (...classes: Array<string | undefined | false>) =>
  classes.filter(Boolean).join(" ");

export function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth,
  loading,
  iconLeft,
  iconRight,
  type,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const buttonType = type ?? "button";
  const isDisabled = disabled ?? false;
  const isLoading = loading ?? false;

  return (
    <button
      type={buttonType}
      className={buildClassName(
        "button",
        `button--${variant}`,
        `button--${size}`,
        fullWidth && "button--block",
        isLoading && "is-loading",
        className,
      )}
      disabled={isDisabled || isLoading}
      aria-busy={isLoading}
      {...rest}
    >
      {isLoading && (
        <span
          className="button__spinner"
          aria-hidden
        />
      )}

      {iconLeft && (
        <span className="button__icon button__icon--left">
          {iconLeft}
        </span>
      )}

      <span className="button__label">{children}</span>

      {iconRight && (
        <span className="button__icon button__icon--right">
          {iconRight}
        </span>
      )}
    </button>
  );
}
