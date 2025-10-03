export default function Button({ 
  text, 
  onClick, 
  width = "w-auto", 
  color = "bg-primary-green text-black-900",
  disabled = false 
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${width} ${color} px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {text}
    </button>
  );
}