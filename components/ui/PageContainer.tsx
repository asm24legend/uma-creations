export default function PageContainer({
  title,
  intro,
  children,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl text-brand sm:text-4xl">{title}</h1>
      {intro && <p className="mt-3 text-ink/70">{intro}</p>}
      <div
        className="mt-8 leading-relaxed
          [&_h2]:mt-8 [&_h2]:font-heading [&_h2]:text-xl
          [&_p]:mt-3
          [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1
          [&_a]:text-brand [&_a]:underline"
      >
        {children}
      </div>
    </div>
  );
}