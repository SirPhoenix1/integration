"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { FileText, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DocumentTabs() {
  const documents = useQuery(api.documents.getDocuments);
  const router = useRouter();
  const [newDocumentName, setNewDocumentName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");

  const handleCreateDocument = () => {
    setNewDocumentName("");
  };

  const handleUseTemplate = () => {
    setSelectedTemplate("");
  };

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return <div>Loading</div>;
  }

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList>
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="books">Books</TabsTrigger>
        <TabsTrigger value="folders">Folders</TabsTrigger>
        <TabsTrigger value="chapters">Chapters</TabsTrigger>
        <TabsTrigger value="documents">Documents</TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {documents.map((doc) => (
            <Card key={doc._id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {doc.title}
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-xs text-muted-foreground">
                  Created at {new Date(doc._creationTime).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </TabsContent>
      <TabsContent value="books" className="space-y-4"></TabsContent>
      <TabsContent value="folders" className="space-y-4"></TabsContent>
      <TabsContent value="chapters" className="space-y-4"></TabsContent>
      <TabsContent value="documents" className="space-y-4"></TabsContent>
      <div className="mt-6 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Create New Document</CardTitle>
            <CardDescription>Start a new writing project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Button onClick={handleCreateDocument}>
                <Plus className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Tabs>
  );
}
