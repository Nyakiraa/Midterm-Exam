export default function ErrorMessage({ message }) {
  return (
    <div className="text-center text-red-600 bg-red-50 p-3 rounded-lg mt-4">
      ⚠️ {message}
    </div>
  );
}
