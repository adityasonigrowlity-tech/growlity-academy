'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Filter, Search, SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react';
import { CourseCard } from '@/components/common/CourseCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import courseService from '@/services/course.service';

function ExploreContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filters from URL
  const searchQuery = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || '';
  const levelFilter = searchParams.get('level') || '';
  const priceFilter = searchParams.get('price') || 'all';
  const sortBy = searchParams.get('sort') || 'relevance';

  // Fetch Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setCategoriesLoading(true);
        const data = await courseService.getPublicCategories();
        setCategories(data.data || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
      } finally {
        setCategoriesLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Fetch Courses
  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const params = {
        search: searchQuery,
        category: categoryFilter,
        level: levelFilter,
        price: priceFilter,
        sort: sortBy,
      };
      const data = await courseService.getPublicCourses(params);
      setCourses(data.data || []);
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load courses. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, categoryFilter, levelFilter, priceFilter, sortBy]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  // Helper to update URL params
  const updateFilters = (newFilters) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === '' || value === 'all') {
        current.delete(key);
      } else {
        current.set(key, value);
      }
    });

    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  const toggleCategory = (categorySlug) => {
    updateFilters({ category: categoryFilter === categorySlug ? null : categorySlug });
  };

  const toggleLevel = (level) => {
    updateFilters({ level: levelFilter === level ? null : level });
  };

  const setPrice = (price) => {
    updateFilters({ price });
  };

  const setSort = (sort) => {
    updateFilters({ sort });
  };

  const clearFilters = () => {
    router.push(pathname);
  };

  if (!mounted) return null;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
          {categoriesLoading ? (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Loading...
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${category.id}`}
                  checked={categoryFilter === category.slug}
                  onCheckedChange={() => toggleCategory(category.slug)}
                />
                <Label htmlFor={`cat-${category.id}`} className="cursor-pointer text-sm">
                  {category.name}
                </Label>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Level */}
      <div>
        <h3 className="font-semibold mb-3">Level</h3>
        <div className="space-y-2">
          {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
            <div key={level} className="flex items-center gap-2">
              <Checkbox
                id={`level-${level}`}
                checked={levelFilter === level}
                onCheckedChange={() => toggleLevel(level)}
              />
              <Label htmlFor={`level-${level}`} className="cursor-pointer text-sm">
                {level}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold mb-3">Price</h3>
        <div className="space-y-2">
          {[
            { id: 'all', name: 'All Prices' },
            { id: 'free', name: 'Free' },
            { id: 'paid', name: 'Paid' }
          ].map((p) => (
            <div key={p.id} className="flex items-center gap-2">
              <Checkbox
                id={`price-${p.id}`}
                checked={priceFilter === p.id}
                onCheckedChange={() => setPrice(p.id)}
              />
              <Label htmlFor={`price-${p.id}`} className="cursor-pointer text-sm">
                {p.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full mt-4"
        onClick={clearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFDFD] pb-20">
      {/* Header Section */}
      <div className="border-b bg-white/50 backdrop-blur-sm sticky top-0 z-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 text-gray-900 tracking-tight">
              Explore <span className="text-growlity-blue">Courses</span>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-gray-500 font-medium">
              Find the perfect course to advance your professional journey.
            </p>
          </div>
          
          {/* Search Bar & Mobile Controls */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 sm:mt-10">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-growlity-blue transition-colors" />
              <Input
                type="search"
                placeholder="Search for courses, skills, or titles..."
                className="pl-12 h-12 sm:h-14 bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl shadow-sm focus:border-growlity-blue/20 focus:ring-4 focus:ring-growlity-blue/5 transition-all text-sm sm:text-base font-medium"
                value={searchQuery}
                onChange={(e) => updateFilters({ q: e.target.value })}
              />
            </div>
            
            <div className="flex gap-2 w-full sm:w-auto">
              {/* Desktop Sort (Visible on SM and up) */}
              <div className="hidden sm:block">
                <Select value={sortBy} onValueChange={setSort}>
                  <SelectTrigger className="w-[180px] h-14 rounded-2xl border-2 font-bold px-4">
                    <SelectValue placeholder="Sort" />
                  </SelectTrigger>
                  <SelectContent className="rounded-2xl font-medium">
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price Low</SelectItem>
                    <SelectItem value="price-high">Price High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mobile Filter Trigger */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden h-12 sm:h-14 flex-1 sm:flex-none sm:w-14 rounded-xl sm:rounded-2xl border-2 gap-2 font-bold">
                    <SlidersHorizontal className="h-5 w-5" />
                    <span className="sm:hidden">Filters</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="text-left mb-6">
                    <SheetTitle className="text-2xl font-black">Filters</SheetTitle>
                    <SheetDescription>Refine your selection</SheetDescription>
                  </SheetHeader>
                  <div className="sm:px-2">
                    <FilterPanel />
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-12">
          
          {/* Desktop Filters (Sidebar) */}
          <aside className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
                <Filter className="h-5 w-5 text-growlity-blue" />
                <h2 className="font-black text-xl text-gray-900">Filter By</h2>
              </div>
              <FilterPanel />
            </div>
          </aside>

          {/* Activity/Results Area */}
          <div className="flex flex-col gap-6 sm:gap-8">
            {/* Context/Summary Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-gray-400">
                  {loading ? 'Searching...' : `${courses.length} Results`}
                </span>
                {(categoryFilter || levelFilter || priceFilter !== 'all') && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {categoryFilter && (
                      <Badge className="bg-growlity-blue/5 text-growlity-blue hover:bg-growlity-blue/10 border-none px-2.5 py-1 rounded-full gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                        {categories.find((c) => c.slug === categoryFilter)?.name || categoryFilter}
                        <button onClick={() => toggleCategory(categoryFilter)} className="hover:text-black">×</button>
                      </Badge>
                    )}
                    {levelFilter && (
                      <Badge className="bg-purple-50 text-purple-600 hover:bg-purple-100 border-none px-2.5 py-1 rounded-full gap-1.5 font-bold text-[10px] uppercase tracking-wider">
                        {levelFilter}
                        <button onClick={() => toggleLevel(levelFilter)} className="hover:text-black">×</button>
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile Sort Select (Visible only on mobile) */}
              <div className="sm:hidden">
                <Select value={sortBy} onValueChange={setSort}>
                  <SelectTrigger className="w-full h-11 rounded-xl border-gray-200 font-bold bg-white">
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="relevance">Most Relevant</SelectItem>
                    <SelectItem value="popular">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price Low</SelectItem>
                    <SelectItem value="price-high">Price High</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Grid Rendering */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="h-80 sm:h-96 bg-gray-50 rounded-2xl sm:rounded-3xl animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-20 bg-red-50/50 rounded-3xl border border-red-100">
                <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-black text-red-900">Oops! Something went wrong</h3>
                <p className="text-red-600 mb-6 font-medium">{error}</p>
                <Button variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 rounded-xl px-10" onClick={fetchCourses}>Retry Load</Button>
              </div>
            ) : courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {courses.map((course) => (
                  <div key={course.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                    <CourseCard course={course} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-24 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100">
                <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="h-10 w-10 text-gray-200" />
                </div>
                <h3 className="text-2xl font-black text-gray-900 mb-2">No matching courses</h3>
                <p className="text-gray-500 font-medium mb-8 max-w-sm mx-auto">We couldn't find any courses matching your current search or filters.</p>
                <Button onClick={clearFilters} className="bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold h-12 px-10 rounded-xl shadow-xl shadow-growlity-blue/20">Clear Search</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExplorePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
        <Loader2 className="h-12 w-12 text-growlity-blue animate-spin" />
        <p className="text-gray-500 font-black text-xl">Loading Experience...</p>
      </div>
    }>
      <ExploreContent />
    </Suspense>
  );
}
