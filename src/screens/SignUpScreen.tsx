"use client";

import { FormEvent, useState } from "react";
import { ArrowLeft, Check, Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import Shell from "../components/Shell";
import Logo from "../components/Logo";
import TextField from "../components/TextField";
import Button from "../components/Button";
import { AppleIcon, GoogleIcon } from "../components/BrandIcons";

interface SignUpScreenProps {
  onBack?: () => void;
  onSubmit?: (name: string, email: string, phone: string, password: string) => void;
  onSignIn?: () => void;
  onContinueWithGoogle?: () => void;
  onContinueWithApple?: () => void;
}

export default function SignUpScreen({
  onBack,
  onSubmit,
  onSignIn,
  onContinueWithGoogle,
  onContinueWithApple,
}: SignUpScreenProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (acceptedTerms) onSubmit?.(name, email, phone, password);
  }

  return (
    <Shell>
      <div className="relative flex flex-1 flex-col overflow-y-auto px-6 pb-8 pt-7">
        <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-ajo-orange-tint" />
        <div aria-hidden="true" className="absolute -right-5 -top-5 h-32 w-32 rounded-full border-[18px] border-ajo-orange/15" />

        <div className="relative flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            aria-label="Back to sign in"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ajo-border bg-white text-ajo-text transition-colors hover:bg-ajo-cream-dim"
          >
            <ArrowLeft size={18} />
          </button>
          <Logo />
        </div>

        <div className="relative mt-8">
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-ajo-orange">Start saving together</p>
          <h1 className="mt-2 max-w-[280px] font-display text-[31px] font-semibold leading-[1.1] text-ajo-text">
            Your next goal starts here.
          </h1>
          <p className="mt-3 max-w-[310px] text-[14px] leading-relaxed text-ajo-text-muted">
            Create your account and build brighter money habits with your people.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="relative mt-7 flex flex-col gap-4">
          <TextField label="Full name" placeholder="Ibrahim Adeyemi" autoComplete="name" icon={<User size={18} />} value={name} onChange={(event) => setName(event.target.value)} required />
          <TextField label="Email address" type="email" placeholder="you@example.com" autoComplete="email" icon={<Mail size={18} />} value={email} onChange={(event) => setEmail(event.target.value)} required />
          <TextField label="Phone number" type="tel" placeholder="0801 234 5678" autoComplete="tel" icon={<Phone size={18} />} value={phone} onChange={(event) => setPhone(event.target.value)} required />
          <TextField
            label="Create password"
            type={showPassword ? "text" : "password"}
            placeholder="At least 8 characters"
            autoComplete="new-password"
            icon={<Lock size={18} />}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            required
            trailing={
              <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? "Hide password" : "Show password"} className="text-ajo-text-faint">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />

          <button type="button" onClick={() => setAcceptedTerms((value) => !value)} className="mt-1 flex items-start gap-3 text-left" aria-pressed={acceptedTerms}>
            <span className={["mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors", acceptedTerms ? "border-ajo-orange bg-ajo-orange text-white" : "border-ajo-border bg-white"].join(" ")}>
              {acceptedTerms && <Check size={14} strokeWidth={3} />}
            </span>
            <span className="text-[12px] leading-relaxed text-ajo-text-muted">
              I agree to Ajo&apos;s <span className="font-semibold text-ajo-text">Terms of Use</span> and <span className="font-semibold text-ajo-text">Privacy Policy</span>.
            </span>
          </button>

          <Button type="submit" disabled={!acceptedTerms} className="mt-1">Create my account</Button>
        </form>

        <div className="relative my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-ajo-border" />
          <span className="text-[12px] text-ajo-text-faint">or continue with</span>
          <div className="h-px flex-1 bg-ajo-border" />
        </div>

        <div className="relative grid grid-cols-2 gap-3">
          <Button variant="outline" onClick={onContinueWithGoogle} leadingIcon={<GoogleIcon />}>Google</Button>
          <Button variant="outline" onClick={onContinueWithApple} leadingIcon={<AppleIcon />}>Apple</Button>
        </div>

        <p className="relative mt-7 text-center text-[13px] text-ajo-text-muted">
          Already have an account?{" "}
          <button type="button" onClick={onSignIn} className="font-semibold text-ajo-orange">Sign in</button>
        </p>
      </div>
    </Shell>
  );
}