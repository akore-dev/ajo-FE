// src/screens/SignInScreen.tsx
import { FormEvent, useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Shell from "../components/Shell";
import Logo from "../components/Logo";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { GoogleIcon, AppleIcon } from "../components/BrandIcons";

interface SignInScreenProps {
  onSubmit?: (identifier: string, password: string) => void;
  onForgotPassword?: () => void;
  onContinueWithGoogle?: () => void;
  onContinueWithApple?: () => void;
  onSignUp?: () => void;
}

export default function SignInScreen({
  onSubmit,
  onForgotPassword,
  onContinueWithGoogle,
  onContinueWithApple,
  onSignUp,
}: SignInScreenProps) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit?.(identifier, password);
  }

  return (
    <Shell>
      <div className="flex flex-1 flex-col px-6 pt-8 pb-8">
        <Logo />

        <div className="mt-8">
          <h1 className="font-display text-[28px] font-semibold text-ajo-text">
            Welcome back
          </h1>
          <p className="mt-2 text-[15px] text-ajo-text-muted">
            Sign in to continue your journey.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <TextField
            label="Email or phone number"
            type="text"
            inputMode="email"
            placeholder="you@example.com"
            autoComplete="username"
            icon={<Mail size={18} />}
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />

          <div className="flex flex-col gap-1.5">
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              icon={<Lock size={18} />}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="text-ajo-text-faint"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              }
            />
            <button
              type="button"
              onClick={onForgotPassword}
              className="self-end text-[13px] font-medium text-ajo-orange"
            >
              Forgot password?
            </button>
          </div>

          <Button type="submit" variant="primary" className="mt-2">
            Sign in
          </Button>
        </form>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-ajo-border" />
          <span className="text-[13px] text-ajo-text-faint">or</span>
          <div className="h-px flex-1 bg-ajo-border" />
        </div>

        <div className="flex flex-col gap-3">
          <Button
            variant="outline"
            onClick={onContinueWithGoogle}
            leadingIcon={<GoogleIcon />}
          >
            Continue with Google
          </Button>
          <Button
            variant="outline"
            onClick={onContinueWithApple}
            leadingIcon={<AppleIcon />}
          >
            Continue with Apple
          </Button>
        </div>

        <p className="mt-auto pt-8 text-center text-[14px] text-ajo-text-muted">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={onSignUp} className="font-semibold text-ajo-orange">
            Sign up
          </button>
        </p>
      </div>
    </Shell>
  );
}

