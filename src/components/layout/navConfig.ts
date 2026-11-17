import type { Role } from "../../types";
import type { LucideIcon } from "lucide-react";

import {
  Award,
  BookOpen,
  CalendarDays,
  Database,
  History,
  KeyRound,
  LayoutDashboard,
  ListChecks,
  Pencil,
  Trophy,
  User,
} from "lucide-react";
export interface NavItem {
  to: string;
  icon: LucideIcon;
  label: string;
  pillKey?: "expert";
}
export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV: Record<Role, NavSection[]> = {
  participant: [
    {
      title: "Learning",
      items: [
        { to: "/app/participant/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        { to: "/app/participant/learn", icon: BookOpen, label: "Learning Portal" },
        { to: "/app/participant/events", icon: CalendarDays, label: "Live Events" },
        { to: "/app/participant/assess", icon: ListChecks, label: "Self Assessment" },
      ],
    },
    {
      title: "My Record",
      items: [
        { to: "/app/participant/certs", icon: Award, label: "Certifications" },
        { to: "/app/participant/history", icon: History, label: "History & Attempts" },
        // { to: "/app/participant/expert", icon: MessageCircleQuestion, label: "My Questions" },
        { to: "/app/participant/profile", icon: User, label: "Profile" },
      ],
    },
  ],
  trainer: [
    {
      title: "Overview",
      items: [
        { to: "/app/trainer/dashboard", icon: LayoutDashboard, label: "Dashboard" },
        // { to: '/app/trainer/analytics', icon: BarChart3, label: 'Analytics' },
      ],
    },
    {
      title: "Content",
      items: [
        { to: "/app/trainer/topics", icon: BookOpen, label: "Topics & Products" },
        { to: "/app/trainer/builder", icon: Pencil, label: "Content Builder" },
        { to: "/app/trainer/bank", icon: Database, label: "Question Bank" },
      ],
    },
    {
      title: "Examination",
      items: [
        { to: "/app/trainer/exams", icon: ListChecks, label: "Examinations" },
        { to: "/app/trainer/results", icon: Trophy, label: "Results & Leaderboard" },
        { to: "/app/trainer/certs", icon: Award, label: "Certification" },
      ],
    },
    // {
    //   title: "Support",
    //   items: [
    //     {
    //       to: "/app/trainer/expert",
    //       icon: MessageCircleQuestion,
    //       label: "Expert Questions",
    //       pillKey: "expert",
    //     },
    //   ],
    // },
  ],
  admin: [
    {
      title: "Overview",
      items: [{ to: "/app/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" }],
    },
    {
      title: "Users",
      items: [
        { to: "/app/admin/users", icon: User, label: "User Management" },
        { to: "/app/admin/roles", icon: KeyRound, label: "Roles & Access" },
      ],
    },
    // {
    //   title: "Monitoring",
    //   items: [
    //     { to: "/app/admin/active", icon: Activity, label: "Active Users" },
    //     { to: "/app/admin/activity", icon: CalendarDays, label: "Daily Activity" },
    //     { to: "/app/admin/usage", icon: BarChart3, label: "System Usage" },
    //     { to: "/app/admin/audit", icon: ShieldCheck, label: "Audit Logs" },
    //   ],
    // },
  ],
};

export const HOME_ROUTE: Record<Role, string> = {
  participant: "/app/participant/dashboard",
  trainer: "/app/trainer/dashboard",
  admin: "/app/admin/dashboard",
};
