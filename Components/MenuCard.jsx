import Image from "next/image";

export default function MenuCard({ item, onClick }) {
  // Format price for display
  const formatPrice = (price) => {
    if (!price) return 'Price varies';
    return `$${price.toFixed(2)}`;
  };

  return (
    <div 
      onClick={() => onClick(item)}
      className="bg-white rounded-3xl p-5 shadow-sm hover:shadow-md transition-all cursor-pointer hover:scale-[1.02]"
    >
      <div className="flex gap-4">
        {/* Item Image (if available) */}
        {/* {item.img && (
          <div className="flex-shrink-0 w-20 h-20 rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={item.img}
              alt={item.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
        )}
         */}
        {/* Item Details */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start gap-3 mb-2">
              <h3 className="font-semibold text-black text-lg md:text-xl">
                {item.name}
              </h3>
              <div className="text-primary-green font-bold text-lg md:text-xl whitespace-nowrap">
                {formatPrice(item.price)}
              </div>
            </div>
            
            {item.description && (
              <p className="text-black-500 text-sm md:text-base leading-relaxed line-clamp-2">
                {item.description}
              </p>
            )}
            
            {/* Show available variations if any */}
            {item.variations && item.variations.length > 1 && (
              <p className="text-black-400 text-xs mt-2">
                {item.variations.length} size options available
              </p>
            )}
            
            {/* Show available modifiers if any */}
            {item.modifiers && item.modifiers.length > 0 && (
              <p className="text-black-400 text-xs mt-1">
                Customizations available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}