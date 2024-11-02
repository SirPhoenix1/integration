"use client";

import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Item } from "./item";
import { cn } from "@/lib/utils";
import { BookOpen, FileIcon } from "lucide-react";

interface DocumentListProps {
  parentFolderId?: Id<"folders">;
  level?: number;
  data?: Doc<"documents">[];
}

export const DocumentList = ({
  parentFolderId,
  level = 0,
}: DocumentListProps) => {
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const onExpand = (folderId: string) => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [folderId]: !prevExpanded[folderId],
    }));
  };

  const folders = useQuery(api.folders.getSidebar, {
    parentFolder: parentFolderId,
  });

  const documents = useQuery(api.documents.getSidebar, {
    parentFolder: parentFolderId,
  });

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined || folders === undefined) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        style={{ paddingLeft: level ? `${level * 12 + 25}px` : undefined }}
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
      >
        No Pages Inside
      </p>
      {folders.map((folder) => (
        <div key={folder._id}>
          <Item
            id={folder._id}
            label={folder.title}
            icon={BookOpen}
            level={level}
            onExpand={() => onExpand(folder._id)}
            expanded={expanded[folder._id]}
          />
          {expanded[folder._id] && (
            <DocumentList parentFolderId={folder._id} level={level + 1} />
          )}
        </div>
      ))}
      {documents.map((document) => (
        <div key={document._id}>
          <Item
            id={document._id}
            label={document.title}
            icon={FileIcon}
            level={level}
            onClick={() => onRedirect(document._id)}
            documentIcon={document.icon}
            active={params.documentId === document._id}
          />
        </div>
      ))}
    </>
  );
};
