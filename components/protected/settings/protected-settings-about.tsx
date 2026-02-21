"use client";

import { updateAboutPage } from "@/actions/about/update-about-page";
import type { AboutPageRow } from "@/actions/about/get-about-page";
import WysiwygEditor from "@/components/protected/editor/wysiwyg/wysiwyg-editor";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC, useState } from "react";
import toast from "react-hot-toast";

const EMPTY_HTML = "<p></p>";

interface ProtectedSettingsAboutProps {
  initialAbout: AboutPageRow | null;
}

const ProtectedSettingsAbout: FC<ProtectedSettingsAboutProps> = ({
  initialAbout,
}) => {
  const [lastSaved, setLastSaved] = useState<boolean | null>(null);

  async function handleDebouncedUpdate(editor: { getHTML: () => string } | undefined) {
    if (!editor) return;
    const html = editor.getHTML();
    if (!html || html === EMPTY_HTML) return;
    const result = await updateAboutPage(html);
    if (result.success) {
      setLastSaved(true);
      toast.success("About page saved");
    } else {
      toast.error(result.error ?? "Failed to save");
    }
  }

  const defaultValue = initialAbout?.content?.trim() || EMPTY_HTML;

  return (
    <Card>
      <CardHeader>
        <CardTitle>About page content</CardTitle>
        <CardDescription>
          Edit the content shown on the public /about page. Only admins can edit.
          Changes are saved automatically as you type.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <WysiwygEditor
          defaultValue={defaultValue}
          className="relative w-full min-h-[320px] max-w-2xl border border-input rounded-md bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
          onDebouncedUpdate={handleDebouncedUpdate}
          debounceDuration={1200}
        />
        {lastSaved === true && (
          <p className="mt-2 text-sm text-muted-foreground">Saved.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default ProtectedSettingsAbout;
