"use client";

import { useRouter } from "next/navigation";
import OnboardingScreen from "../screens/OnboardingScreen";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import CreateCircleScreen from "../screens/CreateCircleScreen";
import WelcomeCompleteScreen from "../screens/WelcomeCompleteScreen";
import HomeScreen from "../screens/HomeScreen";
import CirclesScreen from "../screens/CirclesScreen";
import NoCirclesScreen from "../screens/NoCirclesScreen";
import CircleDetailScreen from "../screens/CircleDetailScreen";
import YourTurnScreen from "../screens/YourTurnScreen";
import ContributionScreen from "../screens/ContributionScreen";
import ContributionCompleteScreen from "../screens/ContributionCompleteScreen";
import WalletScreen from "../screens/WalletScreen";
import AddMoneyScreen from "../screens/AddMoneyScreen";
import TransactionDetailsScreen from "../screens/TransactionDetailsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import type { NavRoute } from "../types";

type Screen =
  | "onboarding"
  | "sign-in"
  | "sign-up"
  | "create-circle"
  | "welcome"
  | "home"
  | "circles"
  | "no-circles"
  | "circle-detail"
  | "your-turn"
  | "contribution"
  | "contribution-complete"
  | "wallet"
  | "add-money"
  | "transaction-details"
  | "profile";

interface RouteClientProps {
  screen: Screen;
  circleId?: string;
  transactionId?: string;
}

const navPaths: Record<NavRoute, string> = {
  home: "/home",
  circles: "/circles",
  wallet: "/wallet",
  more: "/profile",
};

export default function RouteClient({ screen, circleId = "family", transactionId = "t1" }: RouteClientProps) {
  const router = useRouter();
  const go = (path: string) => () => router.push(path);
  const navigate = (route: NavRoute) => router.push(navPaths[route]);
  const circlePath = `/circles/${circleId}`;

  switch (screen) {
    case "onboarding":
      return <OnboardingScreen onGetStarted={go("/welcome")} onSignIn={go("/sign-in")} />;
    case "sign-in":
      return <SignInScreen onSubmit={go("/home")} onContinueWithGoogle={go("/home")} onContinueWithApple={go("/home")} onSignUp={go("/sign-up")} />;
    case "sign-up":
      return <SignUpScreen onBack={go("/sign-in")} onSubmit={go("/welcome")} onContinueWithGoogle={go("/welcome")} onContinueWithApple={go("/welcome")} onSignIn={go("/sign-in")} />;
    case "create-circle":
      return <CreateCircleScreen onBack={go("/circles")} onNext={go("/welcome")} />;
    case "welcome":
      return <WelcomeCompleteScreen onGoToHome={go("/home")} />;
    case "home":
      return <HomeScreen onViewCircle={go(circlePath)} onSeeAllCircles={go("/circles")} onNavigate={navigate} />;
    case "circles":
      return <CirclesScreen onCreateCircle={go("/circles/new")} onOpenCircle={(id) => router.push(`/circles/${id}`)} onNavigate={navigate} />;
    case "no-circles":
      return <NoCirclesScreen onBack={go("/home")} onCreateCircle={go("/circles/new")} onJoinCircle={go("/circles")} onNavigate={navigate} />;
    case "circle-detail":
      return <CircleDetailScreen onBack={go("/circles")} onPay={go(`${circlePath}/contribute`)} onNavigate={navigate} />;
    case "your-turn":
      return <YourTurnScreen onBack={go(circlePath)} onNavigate={navigate} />;
    case "contribution":
      return <ContributionScreen onBack={go(circlePath)} onPay={go(`${circlePath}/contribute/complete`)} />;
    case "contribution-complete":
      return <ContributionCompleteScreen onViewCircle={go(circlePath)} onBackToHome={go("/home")} />;
    case "wallet":
      return <WalletScreen onBack={go("/home")} onAddMoney={go("/wallet/add-money")} onOpenTransaction={(id) => router.push(`/wallet/transactions/${id}`)} onNavigate={navigate} />;
    case "add-money":
      return <AddMoneyScreen onBack={go("/wallet")} onContinue={go("/wallet")} />;
    case "transaction-details":
      return <TransactionDetailsScreen onBack={go("/wallet")} transaction={{
        id: transactionId,
        type: "payout",
        title: "Circle payout",
        subtitle: "Family Circle",
        amount: 485000,
        currency: "ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡Ãƒâ€šÃ‚Â¦",
        date: "2026-09-08T12:42:00",
        status: "completed",
        reference: transactionId,
        balanceAfter: 730000,
      }} />;
    case "profile":
      return <ProfileScreen onNavigate={navigate} />;
  }
}