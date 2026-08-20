export default function BioText({ text, className }) {
  if (!text) return null;
  const paragraphs = text.split(/\n{2,}/);

  return (
    <>
      {paragraphs.map((paragraph, i) => (
        <p key={i} className={className}>
          {paragraph}
        </p>
      ))}
    </>
  );
}
