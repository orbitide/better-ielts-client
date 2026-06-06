export function ExamShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="exam-environment flex h-screen flex-col overflow-hidden bg-[#e5e5e5] dark:bg-[#121212]">
      {children}
    </div>
  )
}
