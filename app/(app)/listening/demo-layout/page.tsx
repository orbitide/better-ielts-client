import { ListeningTestShell } from '@/components/listening/ListeningTestShell'
import { demoListeningLayoutTest } from '@/lib/data/demo-listening-layout'

export const metadata = {
  title: demoListeningLayoutTest.title,
}

export default function ListeningDemoLayoutPage() {
  return <ListeningTestShell test={demoListeningLayoutTest} />
}
