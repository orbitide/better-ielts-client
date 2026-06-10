import type { ListeningLayoutNode } from '@/lib/types/listening'
import { TableNodeView } from './TableNodeView'
import { MCQGroupNodeView } from './MCQGroupNodeView'
import { GapFillNodeView } from './GapFillNodeView'
import { ImageLabelNodeView } from './ImageLabelNodeView'

export function LayoutNodeRenderer({ nodes }: { nodes: ListeningLayoutNode[] }) {
  return (
    <>
      {nodes.map((node) => {
        switch (node.type) {
          case 'table':
            return <TableNodeView key={node.id} node={node} />
          case 'mcq_group':
            return <MCQGroupNodeView key={node.id} node={node} />
          case 'gap_fill':
            return <GapFillNodeView key={node.id} node={node} />
          case 'image_label':
            return <ImageLabelNodeView key={node.id} node={node} />
        }
      })}
    </>
  )
}
