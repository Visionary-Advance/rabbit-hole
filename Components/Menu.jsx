'use client'

import { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import EditCartModal from './EditCartModal';

export default function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState(['All Tea']);
  const [selectedCategory, setSelectedCategory] = useState('All Tea');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    async function fetchMenuItems() {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Fetching menu items...');
        const response = await fetch('/api/square-items');
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch menu items: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (!data.items || !Array.isArray(data.items)) {
          throw new Error('Invalid data format received from API');
        }
        
        // Extract unique categories
        const uniqueCategories = ['All Tea', ...new Set(
          data.items
            .map(item => item.category)
            .filter(cat => cat && cat !== 'Uncategorized')
        )];
        
        console.log('Categories:', uniqueCategories);
        console.log('Total items:', data.items.length);
        
        setCategories(uniqueCategories);
        setMenuItems(data.items);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching menu items:', err);
        setError(err.message);
        setLoading(false);
      }
    }

    fetchMenuItems();
  }, []);

  // Filter items by selected category
  const filteredItems = selectedCategory === 'All Tea' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section className="py-12 md:py-16 px-6 md:px-16 lg:px-32 xl:px-36 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Menu Header */}
        <div className="text-center mb-8">
          <h2 className="font-quicksand font-bold text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4">
            Our Menu
          </h2>
          <p className="text-black-500 max-w-md mx-auto">
            Something for everyone. Milk teas, fruit teas, toppings & more.
          </p>
        </div>

        {/* Menu Categories */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-secondary text-black-900'
                    : 'bg-black-200 text-black-900 hover:bg-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-green border-t-transparent"></div>
            <p className="text-white mt-4">Loading menu items...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-900/20 rounded-2xl p-8">
            <p className="text-red-400 font-semibold mb-2">Error loading menu</p>
            <p className="text-red-300 text-sm mb-4">{error}</p>
            <p className="text-white text-xs mb-4">
              Please check your browser console for more details
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 bg-primary-green text-black-900 px-6 py-2 rounded-full hover:bg-opacity-90 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {filteredItems.map((item) => (
                <MenuCard 
                  key={item.id} 
                  item={item} 
                  onClick={handleCardClick}
                />
              ))}
            </div>

            {/* No Results Message */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-white">No items found in this category.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for adding item to cart */}
      {selectedItem && (
        <EditCartModal
          item={selectedItem}
          onClose={closeModal}
          editing={false}
        />
      )}
    </section>
  );
}