'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Heart, Star, Clock, Users, TrendingUp, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

export function CourseCard({ course, showProgress }) {
  const { user, isAuthenticated, addToWishlist, removeFromWishlist, addToCart } = useAuth();
  
  const isInWishlist = user?.wishlist?.includes(course.id) || false;
  const isEnrolled = user?.enrolledCourses?.includes(course.id) || false;
  const progress = user?.progress?.[course.id] || 0;

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please log in to add courses to your wishlist');
      return;
    }

    if (isInWishlist) {
      removeFromWishlist(course.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(course.id);
      toast.success('Added to wishlist');
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error('Please log in to add courses to cart');
      return;
    }

    if (isEnrolled) {
      toast.info('You are already enrolled in this course');
      return;
    }

    addToCart(course.id);
    toast.success('Added to cart');
  };

  return (
    <Link href={`/course/${course.id}`}>
      <Card className="group h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 h-8 w-8 rounded-full backdrop-blur-sm z-10 ${
              isInWishlist 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-white/90 text-gray-900 hover:bg-white'
            }`}
            onClick={handleWishlistToggle}
          >
            <Heart className={`h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
          </Button>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
            {course.isTrending && (
              <Badge className="bg-growlity-blue text-white border-none">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
            {course.isBestseller && (
              <Badge className="bg-amber-500 text-white border-none">
                <Crown className="h-3 w-3 mr-1" />
                Bestseller
              </Badge>
            )}
            {course.isSubscriptionOnly && (
              <Badge className="bg-purple-500 text-white border-none">
                Pro Only
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4 flex-1">
          {/* Title */}
          <h3 className="font-semibold line-clamp-2 mb-2 group-hover:text-growlity-green transition-colors">
            {course.title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground mb-2">{course.instructor.name}</p>

          {/* Rating & Stats */}
          <div className="flex items-center gap-3 mb-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-semibold">{course.rating}</span>
              <span className="text-muted-foreground">({course.reviewCount.toLocaleString('en-US')})</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
            <div className="flex items-center gap-1">
              <Users className="h-3.5 w-3.5" />
              {course.studentCount.toLocaleString('en-US')}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {course.duration}
            </div>
          </div>

          {/* Level Badge */}
          <Badge variant="outline" className="text-xs">
            {course.level}
          </Badge>

          {/* Progress Bar (if enrolled) */}
          {showProgress && isEnrolled && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">Your progress</span>
                <span className="text-xs font-semibold">{progress}%</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-growlity-green transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter className="p-4 pt-0 flex items-center justify-between">
          {/* Price */}
          <div className="flex items-center gap-2">
            {course.isSubscriptionOnly ? (
              <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                Subscription
              </Badge>
            ) : (
              <>
                <span className="text-lg font-bold">${course.price}</span>
                {course.originalPrice && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${course.originalPrice}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Add to Cart Button (hidden on hover, shows on mobile) */}
          {!isEnrolled && !course.isSubscriptionOnly && (
            <Button
              size="sm"
              className="lg:opacity-0 lg:group-hover:opacity-100 transition-opacity bg-growlity-green hover:bg-growlity-green-hover text-white"
              onClick={handleAddToCart}
            >
              Add to cart
            </Button>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
