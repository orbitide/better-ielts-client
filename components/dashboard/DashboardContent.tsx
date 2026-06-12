"use client";

import { useEffect, useState } from "react";
import { fetchCurrentUser, fetchBandHistory } from "@/lib/api/user";
import { fetchCurrentStudyPlan } from "@/lib/api/ielts";
import { BandScoreRadar } from "@/components/charts/BandScoreRadar";
import { ProgressOverTime } from "@/components/charts/ProgressOverTime";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { OnlineUsersCard } from "@/components/dashboard/OnlineUsersCard";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { buttonVariants } from "@/components/ui/button-variants";
import { BandBadge } from "@/components/shared/BandBadge";
import { PageHeader } from "@/components/shared/PageHeader";
import { LoadingSkeleton } from "@/components/shared/LoadingSkeleton";
import {
  BookMarked,
  Headphones,
  PenLine,
  Mic,
  Clock,
  ArrowRight,
  TrendingUp,
  ClipboardList,
} from "lucide-react";
import Link from "next/link";
import { formatBand, skillColor, formatDate } from "@/lib/utils/format";
import { cn } from "@/lib/utils";
import type { User, RecentActivity } from "@/lib/types/user";
import type { StudyPlan } from "@/lib/types/study-plan";

export function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);
  const [bandHistory, setBandHistory] = useState<
    Awaited<ReturnType<typeof fetchBandHistory>>
  >([]);
  const [studyPlan, setStudyPlan] = useState<StudyPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    Promise.all([
      fetchCurrentUser(),
      fetchBandHistory(),
      fetchCurrentStudyPlan().catch(() => null),
    ]).then(([userData, bandHistoryData, studyPlanData]) => {
      if (!active) return;
      setUser(userData);
      setBandHistory(bandHistoryData);
      setStudyPlan(studyPlanData as StudyPlan | null);
      setLoading(false);
    });
    return () => {
      active = false;
    };
  }, []);

  if (loading || !user) {
    return <LoadingSkeleton variant="dashboard" />;
  }

  const recentActivity: RecentActivity[] = [];

  const todayPlan = studyPlan
    ? (studyPlan.days.find(
        (d) => d.date === new Date().toISOString().slice(0, 10),
      ) ?? studyPlan.days[studyPlan.days.length - 1])
    : null;

  const pendingTasks =
    todayPlan?.tasks.filter((t) => t.status === "pending") ?? [];
  const completedToday =
    todayPlan?.tasks.filter((t) => t.status === "completed").length ?? 0;
  const totalToday = todayPlan?.tasks.length ?? 0;

  const skills = ["listening", "reading", "writing", "speaking"] as const;
  const weakestSkill = skills.reduce((a, b) =>
    user.currentBand[a] <= user.currentBand[b] ? a : b,
  );
  const weakestGap = user.targetBand - user.currentBand[weakestSkill];

  const skillIcons: Record<string, React.ElementType> = {
    reading: BookMarked,
    listening: Headphones,
    writing: PenLine,
    speaking: Mic,
    vocabulary: ClipboardList,
    "mock-test": ClipboardList,
  };

  const activityIcons: Record<string, React.ElementType> = {
    reading: BookMarked,
    listening: Headphones,
    writing: PenLine,
    speaking: Mic,
    vocabulary: TrendingUp,
  };

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto min-h-full">
      {/* Header */}
      <PageHeader
        title={(() => {
          const hour = new Date().getHours();
          const greeting =
            hour >= 5 && hour < 12
              ? "Good morning"
              : hour >= 12 && hour < 17
                ? "Good afternoon"
                : hour >= 17 && hour < 21
                  ? "Good evening"
                  : "Hello";
          return `${greeting}, ${user.name.split(" ")[0]}`;
        })()}
        description={(() => {
          const now = new Date();
          const hour = now.getHours();
          const dayOfYear = Math.floor(
            (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) /
              86400000,
          );
          const messages =
            hour >= 5 && hour < 12
              ? [
                  "What would you like to work on today?",
                  "A great day to sharpen your skills.",
                  "Your IELTS goal is one session closer.",
                  "Start strong — every practice counts.",
                  "Ready to make progress this morning?",
                ]
              : hour >= 12 && hour < 17
                ? [
                    "Ready to keep the momentum going?",
                    "Halfway through the day — keep it up.",
                    "A focused session now goes a long way.",
                    "What skill would you like to tackle next?",
                    "Consistency builds band scores.",
                  ]
                : hour >= 17 && hour < 21
                  ? [
                      "Let's make the most of this study session.",
                      "A productive evening starts here.",
                      "Wind down the day with some good practice.",
                      "You showed up — that already matters.",
                      "Evening sessions build lasting habits.",
                    ]
                  : [
                      "Ready to prepare for your IELTS journey?",
                      "Burning the midnight oil — make it count.",
                      "Every session brings you closer to your goal.",
                      "Quiet hours, sharp focus.",
                      "The dedicated ones study at any hour.",
                    ];
          return messages[dayOfYear % messages.length];
        })()}
      >
        <Link href="/mock-tests" className={cn(buttonVariants(), "gap-2")}>
          <ClipboardList className="h-4 w-4" />
          Take Mock Test
        </Link>
      </PageHeader>

      {/* Top stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Overall Band</p>
            <p className="text-3xl font-extrabold text-primary">
              {formatBand(user.currentBand.overall)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Target: {formatBand(user.targetBand)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Weakest Skill</p>
            <div className="flex items-center gap-1.5">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-md ${skillColor(weakestSkill)}`}
              >
                {(() => {
                  const Icon = skillIcons[weakestSkill];
                  return <Icon className="h-3.5 w-3.5" />;
                })()}
              </div>
              <p className="text-3xl font-extrabold">
                {formatBand(user.currentBand[weakestSkill])}
              </p>
            </div>
            <p className="text-xs text-muted-foreground mt-1 capitalize">
              {weakestSkill} ·{" "}
              {weakestGap > 0
                ? `+${formatBand(weakestGap)} to target`
                : "At target!"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Study Hours</p>
            <p className="text-3xl font-extrabold">{user.totalStudyHours}</p>
            <p className="text-xs text-muted-foreground mt-1">
              total hours logged
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">Today&apos;s Tasks</p>
            <p className="text-3xl font-extrabold">
              {completedToday}/{totalToday}
            </p>
            <Progress
              value={totalToday > 0 ? (completedToday / totalToday) * 100 : 0}
              className="mt-2 h-1.5"
            />
          </CardContent>
        </Card>
        <OnlineUsersCard />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Skill Breakdown</CardTitle>
            <CardDescription>
              Current band scores across all four skills
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BandScoreRadar
              current={user.currentBand}
              target={user.targetBand}
            />
            <div className="grid grid-cols-2 gap-2 mt-4">
              {(["listening", "reading", "writing", "speaking"] as const).map(
                (skill) => (
                  <div
                    key={skill}
                    className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm"
                  >
                    <span className="capitalize text-muted-foreground">
                      {skill}
                    </span>
                    <BandBadge score={user.currentBand[skill]} />
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Progress Over Time</CardTitle>
            <CardDescription>
              Band score trajectory — last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProgressOverTime data={bandHistory} targetBand={user.targetBand} />
          </CardContent>
        </Card>
      </div>

      {/* Today's plan + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Today's tasks */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Today&apos;s Study Plan</CardTitle>
              <Link
                href="/study-plan"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "gap-1 text-xs",
                )}
              >
                View full plan <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {pendingTasks.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground text-sm">
                All tasks completed for today!
              </div>
            ) : (
              pendingTasks.slice(0, 4).map((task) => {
                const Icon = skillIcons[task.category] ?? BookMarked;
                return (
                  <Link
                    key={task.id}
                    href={task.linkHref}
                    className="flex items-start gap-3 rounded-lg border p-3 hover:bg-accent transition-colors group"
                  >
                    <div
                      className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs ${skillColor(task.category)}`}
                    >
                      <Icon className="h-3.5 w-3.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">
                        {task.title}
                      </p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.durationMinutes}m
                        </span>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${skillColor(task.category)}`}
                        >
                          {task.category}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {recentActivity.map((activity) => {
              const Icon = activityIcons[activity.type] ?? TrendingUp;
              return (
                <Link
                  key={activity.id}
                  href={activity.href}
                  className="flex items-center gap-3 rounded-lg p-2.5 hover:bg-accent transition-colors group"
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${skillColor(activity.type)}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium line-clamp-1">
                      {activity.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(activity.date)}
                    </p>
                  </div>
                  {"score" in activity && activity.score && (
                    <Badge variant="secondary" className="text-xs shrink-0">
                      {activity.score}
                    </Badge>
                  )}
                  {"band" in activity && activity.band && (
                    <BandBadge score={activity.band} className="shrink-0" />
                  )}
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
