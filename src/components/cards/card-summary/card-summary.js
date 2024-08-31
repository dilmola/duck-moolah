export default function CardSummary({
  title,
  titleDetail,
  summary,
  imgsrc,
  imgalt,
}) {
  return (
    <div className="rounded-lg p-6 border border-white/10 w-full">
      <div className="flex justify-between mb-14">
        <div className="text-white font-semibold text-4xl">{summary}</div>
        <img src={imgsrc} alt={imgalt} className="h-8" />
      </div>
      <h3 className="text-2xl font-thin ">{title}</h3>
      <ul className="list-disc list-inside text-gray-300/35">
        <li className="font-thin">{titleDetail}</li>
      </ul>
    </div>
  );
}
