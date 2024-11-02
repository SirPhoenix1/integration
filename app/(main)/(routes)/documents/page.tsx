"use client";

import DocumentTabs from "../../_components/document-tabs";

const DocumentsPage = () => {
  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your documents and folders
          </p>
        </div>
      </div>
      <DocumentTabs />
    </div>
  );
};

export default DocumentsPage;
