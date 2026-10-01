// src/screens/ProfileScreen.tsx
import { User, Shield, Bell, HelpCircle, Info } from "lucide-react";
import Shell from "../components/Shell";
import Avatar from "../components/Avatar";
import MenuRow from "../components/MenuRow";
import BottomNav from "../components/BottomNav";
import type { NavRoute } from "../types";

interface ProfileScreenProps {
  name?: string;
  phone?: string;
  avatarUrl?: string;
  onOpenProfile?: () => void;
  onOpenSecurity?: () => void;
  onOpenNotifications?: () => void;
  onOpenHelp?: () => void;
  onOpenAbout?: () => void;
  onNavigate?: (route: NavRoute) => void;
}

export default function ProfileScreen({
  name = "Ibrahim",
  phone = "+234 801 234 5678",
  avatarUrl,
  onOpenProfile,
  onOpenSecurity,
  onOpenNotifications,
  onOpenHelp,
  onOpenAbout,
  onNavigate,
}: ProfileScreenProps) {
  return (
    <Shell>
      <div className="flex flex-1 flex-col overflow-y-auto px-6 pt-8 pb-4">
        <div className="flex items-center gap-4">
          <Avatar name={name} src={avatarUrl} size={56} />
          <div>
            <h1 className="font-display text-[19px] font-semibold text-ajo-text">{name}</h1>
            <p className="text-[13px] text-ajo-text-muted">{phone}</p>
          </div>
        </div>

        <div className="mt-8">
          <MenuRow icon={<User size={19} />} label="Profile" onClick={onOpenProfile} />
          <MenuRow icon={<Shield size={19} />} label="Security" onClick={onOpenSecurity} />
          <MenuRow icon={<Bell size={19} />} label="Notifications" onClick={onOpenNotifications} />
          <MenuRow icon={<HelpCircle size={19} />} label="Help & Support" onClick={onOpenHelp} />
          <MenuRow icon={<Info size={19} />} label="About Ajo" onClick={onOpenAbout} />
        </div>
      </div>

      <BottomNav active="more" onNavigate={onNavigate} />
    </Shell>
  );
}
