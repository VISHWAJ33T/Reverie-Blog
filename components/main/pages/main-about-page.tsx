import type { AboutPageRow } from "@/actions/about/get-about-page";

interface MainAboutPageProps {
  about: AboutPageRow | null;
}

const MainAboutPage = ({ about }: MainAboutPageProps) => {
  const content = about?.content?.trim() || "";

  return (
    <div className="bg-white py-5">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        {content ? (
          <article
            className="prose prose-gray max-w-none prose-headings:font-semibold prose-p:text-gray-600 prose-a:text-sky-600"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-muted-foreground">No content yet.</p>
        )}
      </div>
    </div>
  );
};

export default MainAboutPage;
