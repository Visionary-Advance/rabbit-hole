'use client'

import { useState, useEffect } from 'react';
import MenuCard from './MenuCard';
import EditCartModal from './EditCartModal';
import { useTranslation } from '@/app/i18n/client';

export default function Menu({ initialCategory = 'All Tea', categoryKey = 0, initialData = null }) {
  const { t } = useTranslation();
  const [menuItems, setMenuItems] = useState(initialData?.items || []);
  const [categories, setCategories] = useState(['All Tea']);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [loading, setLoading] = useState(!initialData);
  const [error, setError] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Determine initial items based on screen size
  const getInitialItems = () => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 1024 ? 6 : 10;
    }
    return 10;
  };

  const [itemsToShow, setItemsToShow] = useState(getInitialItems());

  // Update selected category when initialCategory prop changes
  useEffect(() => {
    setSelectedCategory(initialCategory);
  }, [initialCategory, categoryKey]);

  // Process initial data if provided
  useEffect(() => {
    if (initialData?.items) {
      // Extract unique categories from initial data
      const uniqueCategories = ['All Tea', ...new Set(
        initialData.items
          .map(item => item.category)
          .filter(cat => cat && cat !== 'Uncategorized')
      )];

      console.log('Using server-rendered menu data');
      console.log('Categories:', uniqueCategories);
      console.log('Total items:', initialData.items.length);

      setCategories(uniqueCategories);
      setMenuItems(initialData.items);
      setLoading(false);
    }
  }, [initialData]);

  // Fetch data client-side only if no initial data provided
  useEffect(() => {
    if (initialData) return; // Skip if we have server data

    async function fetchMenuItems() {
      try {
        setLoading(true);
        setError(null);

        console.log('Fetching menu items client-side...');
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
  }, [initialData]);

  // Reset items to show when category or search changes
  useEffect(() => {
    setItemsToShow(getInitialItems());
  }, [selectedCategory, searchQuery]);

  // Update items to show on window resize
  useEffect(() => {
    const handleResize = () => {
      const initial = getInitialItems();
      setItemsToShow(prev => {
        // Only reset if we're at the initial value, otherwise keep user's selection
        if (prev === 6 || prev === 10) {
          return initial;
        }
        return prev;
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter items by selected category and search query
  const filteredItems = menuItems.filter(item => {
    // Category filter
    const matchesCategory = selectedCategory === 'All Tea' || item.category === selectedCategory;

    // Search filter
    const matchesSearch = searchQuery === '' ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Slice items to show only the number specified
  const displayedItems = filteredItems.slice(0, itemsToShow);
  const hasMore = itemsToShow < filteredItems.length;

  const handleLoadMore = () => {
    const increment = typeof window !== 'undefined' && window.innerWidth < 1024 ? 6 : 10;
    setItemsToShow(prev => prev + increment);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
  };

  const closeModal = () => {
    setSelectedItem(null);
  };

  return (
    <section id='menu' className="py-12 md:py-16 px-6 md:px-16 lg:px-32 xl:px-36 bg-black">
      <div className="max-w-6xl mx-auto">
        {/* Menu Header */}
        <div className="text-center mb-8">
          <h2 className="font-quicksand font-bold text-white text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-4">
            {t('menu.title')}
          </h2>
          <p className="text-black-500 max-w-md mx-auto">
            {t('contact.subtitle')}
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
                {category === 'All Tea' ? t('menu.all_tea') : category}
              </button>
            ))}
          </div>
        )}

        {/* Search Bar */}
        {!loading && !error && (
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder={t('menu.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 rounded-full border-2 border-black-300 bg-white text-black-900 placeholder-black-400 focus:outline-none focus:border-primary-green transition-colors"
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-black-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-black-400 hover:text-black-900 transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-green border-t-transparent"></div>
            <p className="text-white mt-4">{t('common.loading')}</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-12 bg-red-900/20 rounded-2xl p-8">
            <p className="text-red-400 font-semibold mb-2">{t('menu.error')}</p>
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
              {displayedItems.map((item) => (
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
                <p className="text-white">{t('menu.no_results')}</p>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={handleLoadMore}
                  className="bg-primary-green text-black-900 px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors"
                >
                  {t('menu.load_more')}
                </button>
                <p className="text-black-500 mt-3 text-sm">
                  Showing {displayedItems.length} of {filteredItems.length} items
                </p>
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