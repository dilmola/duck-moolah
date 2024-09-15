export default function CardSummary({
  title,
  titleDetail,
  summary,
  imgsrc,
  imgalt,
}) {
  return (
    <div className="rounded-lg p-6 border border-white/10 w-full">
      <div className="flex justify-between md:mb-14 mb-8">
        <div className="text-white font-semibold md:text-4xl text-2xl">{summary}</div>
        <img src={imgsrc} alt={imgalt} className="h-8" />
      </div>
      <h3 className="md:text-2xl text-xl font-thin ">{title}</h3>
      <ul className="list-disc list-inside text-gray-300/35">
        <li className="font-thin">{titleDetail}</li>
      </ul>
    </div>
  );
}
