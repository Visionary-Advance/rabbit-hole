"use client";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export default function EditCartModal({
  item,
  selectedSize,
  onClose,
  editing = false,
  existingCartItem = null,
  onSave,
}) {
  
  // Initialize with saved cart data or defaults
  const [size, setSize] = useState(() => {
    if (existingCartItem?.size) {
      return existingCartItem.size;
    }
    // Default to first variation if available
    if (item.variations?.length > 0) {
      const firstVar = item.variations[0];
      return { id: firstVar.id, name: firstVar.name };
    }
    return { id: selectedSize || "", name: "" };
  });

  const [selectedModifiers, setSelectedModifiers] = useState(
    existingCartItem?.modifiers || []
  );
  
  const [specialInstructions, setSpecialInstructions] = useState(
    existingCartItem?.specialInstructions || ""
  );
  
  const [computedPrice, setComputedPrice] = useState(Number(item.price));

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleModifierChange = (mod, isChecked, modifierListName) => {
    setSelectedModifiers((prev) => {
      if (isChecked) {
        if (modifierListName?.toLowerCase().includes("temperature")) {
          // Replace any previous selection in this temperature group
          return [
            ...prev.filter((m) => m.modifierListName !== modifierListName),
            { ...mod, modifierListName },
          ];
        } else {
          return [...prev, { ...mod, modifierListName }];
        }
      } else {
        return prev.filter((m) => m.id !== mod.id);
      }
    });
  };

  useEffect(() => {
    let basePrice = Number(item.price || 0);

    // Find the selected variation and use its price
    const selectedVariation = item.variations?.find((v) => v.id === size.id);
    if (selectedVariation?.price) {
      basePrice = selectedVariation.price;
    }

    const modifiersTotal = selectedModifiers.reduce(
      (sum, mod) => sum + (mod.price || 0),
      0
    );

    setComputedPrice((basePrice + modifiersTotal));
  }, [size, selectedModifiers, item.variations, item.price]);

  const temperatureModifierGroup = item.modifiers?.find((modList) =>
    modList.name.toLowerCase().includes("temperature")
  );

  const otherModifierGroups = item.modifiers?.filter(
    (modList) => !modList.name.toLowerCase().includes("temperature")
  );

  const handleSave = () => {
    const updatedItem = {
      id: item.id,
      name: item.name,
      size: size,
      price: computedPrice,
      img: item.img,
      modifiers: selectedModifiers,
      specialInstructions,
      quantity: existingCartItem?.quantity || 1,
      cartId: existingCartItem?.cartId || uuidv4(),
    };

    if (editing && onSave) {
      // For editing, pass the updated item data to parent
      onSave(updatedItem);
    } else {
      // For adding new item
      addToCart(updatedItem);
      window.dispatchEvent(new Event("cartUpdated"));
    }

    onClose();
  };

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60"
      style={{ margin: 0 }}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="relative bg-white w-[90%] max-w-md rounded-2xl overflow-hidden shadow-lg max-h-[95vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-xl font-bold z-10 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
        >
          ✕
        </button>

        {/* {item.img && (
          <img
            src={item.img}
            alt={item.name}
            className="w-full h-64 object-cover"
          />
        )} */}

        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-2">{item.name}</h2>
          <h2 className="text-2xl font-bold mb-2">${computedPrice.toFixed(2)}</h2>
          <p className="text-sm text-gray-700 mb-4">{item.description}</p>

          {/* Size Selection */}
          {item.variations && item.variations.length > 0 && (
            <div className="mb-4">
              <label className="block font-medium mb-2">Size:</label>
              <div className="flex flex-col gap-2">
                {item.variations.map((variation) => {
                  const name = variation.name || "Unnamed Size";
                  const id = variation.id;
                  const price = variation.price;
                  const displayPrice =
                    typeof price === "number" ? `$${price.toFixed(2)}` : "";

                  return (
                    <label 
                      key={id} 
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        size.id === id 
                          ? 'border-primary-green bg-primary-green/10' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="size"
                        value={id}
                        checked={size.id === id}
                        onChange={() => setSize({ id, name })}
                        className="accent-primary-green w-4 h-4"
                        required
                      />
                      <span className="flex-grow">
                        {name} {displayPrice && `(${displayPrice})`}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Temperature Selector */}
          {temperatureModifierGroup && (
            <div className="mb-4">
              <p className="font-medium mb-2">{temperatureModifierGroup.name}:</p>
              <div className="flex flex-col gap-2">
                {temperatureModifierGroup.modifiers.map((mod) => (
                  <label 
                    key={mod.id} 
                    className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      selectedModifiers.find(
                        (m) => m.modifierListName === temperatureModifierGroup.name
                      )?.id === mod.id
                        ? 'border-primary-green bg-primary-green/10' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="temperature"
                      value={mod.id}
                      checked={
                        selectedModifiers.find(
                          (m) =>
                            m.modifierListName === temperatureModifierGroup.name
                        )?.id === mod.id
                      }
                      onChange={(e) =>
                        handleModifierChange(
                          mod,
                          e.target.checked,
                          temperatureModifierGroup.name
                        )
                      }
                      className="accent-primary-green w-4 h-4"
                      required
                    />
                    <span>{mod.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Customizations Dropdown */}
          {otherModifierGroups?.length > 0 && (
            <details className="mb-6 w-full max-w-md rounded-xl border border-gray-200 bg-white shadow-md p-4 transition-all duration-300">
              <summary className="font-semibold cursor-pointer text-lg text-gray-800 select-none">
                Customize
              </summary>

              <div className="mt-4 space-y-4">
                {otherModifierGroups.map((modList, index) => (
                  <div key={index}>
                    <p className="font-medium text-gray-700 mb-2">
                      {modList.name}:
                    </p>
                    <div className="space-y-2">
                      {Array.isArray(modList.modifiers) &&
                        modList.modifiers.map((mod) => (
                          <label
                            key={mod.id}
                            className="flex items-center gap-3 p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition"
                          >
                            <input
                              type="checkbox"
                              value={mod.id}
                              checked={selectedModifiers.some(
                                (selected) => selected.id === mod.id
                              )}
                              onChange={(e) =>
                                handleModifierChange(
                                  mod,
                                  e.target.checked,
                                  modList.name
                                )
                              }
                              className="accent-indigo-600 w-4 h-4"
                            />
                            <span className="text-gray-800">
                              {mod.name}
                              {mod.price > 0 && (
                                <span className="text-gray-500">
                                  {" "} (+ ${mod.price.toFixed(2)})
                                </span>
                              )}
                            </span>
                          </label>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}

          {/* Special Instructions */}
          <div className="mb-4">
            <label className="block font-medium mb-2">
              Special Instructions:
            </label>
            <textarea
              className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
              rows={3}
              placeholder="Anything we should know?"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
            />
          </div>

          <Button
            text={editing ? "Update Item" : "Add To Cart"}
            width={"w-full"}
            color={"bg-primary-green text-black-900"}
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );

  // Use createPortal to render modal outside of cart container
  return typeof window !== 'undefined' ? 
    createPortal(modalContent, document.body) : 
    null;
}

function addToCart(newItem) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  if (!newItem.cartId) {
    newItem.cartId = uuidv4();
  }

  const existingItemIndex = cart.findIndex(
    (item) =>
      item.id === newItem.id &&
      item.name === newItem.name &&
      item.size.name === newItem.size.name &&
      modifiersMatch(item.modifiers, newItem.modifiers) &&
      item.specialInstructions === newItem.specialInstructions
  );

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += newItem.quantity;
  } else {
    cart.push(newItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
}

function modifiersMatch(mods1, mods2) {
  if (!mods1 || !mods2) return false;
  if (mods1.length !== mods2.length) return false;
  const ids1 = mods1
    .map((m) => m.id)
    .sort()
    .join(",");
  const ids2 = mods2
    .map((m) => m.id)
    .sort()
    .join(",");
  return ids1 === ids2;
}