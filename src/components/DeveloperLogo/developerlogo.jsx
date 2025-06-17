export default function DeveloperLogo({ img, name }) {
  return (
    <div className="w-32 sm:w-36 flex-shrink-0 flex flex-col items-center">
      <div className="h-16 w-full flex items-center justify-center bg-white rounded shadow">
        <img
          src={img}
          alt={name}
          className="max-h-full max-w-[70%] object-contain"
        />
      </div>
      <p className="mt-2 text-xs text-center">{name}</p>
    </div>
  );
}
