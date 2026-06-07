'use client'

import { useState } from 'react'
import { MessageSquare, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import type { CommunityCategory } from '@/lib/types/community'

const CATEGORIES: CommunityCategory[] = [
  'Strategy',
  'Reading',
  'Listening',
  'Speaking',
  'Vocabulary',
  'Mock Test',
]

export function NewPostDialog() {
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<CommunityCategory>('Strategy')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)

  function reset() {
    setTitle('')
    setCategory('Strategy')
    setContent('')
    setSubmitted(false)
  }

  return (
    <Dialog onOpenChange={(open) => { if (!open) reset() }}>
      <DialogTrigger render={<Button size="sm" className="gap-2 shrink-0" />}>
        <MessageSquare className="h-3.5 w-3.5" />
        New Post
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create a new post</DialogTitle>
          <DialogDescription>
            Share a question or strategy with the community.
          </DialogDescription>
        </DialogHeader>

        {submitted ? (
          <div className="py-6 text-center space-y-2">
            <CheckCircle className="h-10 w-10 text-primary mx-auto" />
            <p className="font-semibold">Post submitted!</p>
            <p className="text-sm text-muted-foreground">
              Your post has been shared with the community.
            </p>
          </div>
        ) : (
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Title</label>
              <Input
                placeholder="What's your question or topic?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={120}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Category</label>
              <Select value={category} onValueChange={(v) => setCategory(v as CommunityCategory)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium">Content</label>
              <Textarea
                placeholder="Share your thoughts, strategies, or questions..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-28"
              />
            </div>
          </div>
        )}

        <DialogFooter showCloseButton>
          {!submitted && (
            <Button
              disabled={!title.trim() || !content.trim()}
              onClick={() => setSubmitted(true)}
            >
              Post
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
