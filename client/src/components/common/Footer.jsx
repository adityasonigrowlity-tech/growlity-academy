import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import Logo from '@/components/common/Logo';

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-20">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Logo className="mb-4" size="md" />
            <p className="text-sm text-muted-foreground mb-4 max-w-xs">
              Empowering millions of learners worldwide with quality education and skills development.
            </p>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-growlity-green hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-growlity-green hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-growlity-green hover:text-white flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-growlity-green hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-muted hover:bg-growlity-green hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/explore" className="hover:text-growlity-green transition-colors">Browse Courses</Link></li>
              <li><Link href="/business" className="hover:text-growlity-green transition-colors">Growlity Business</Link></li>
              <li><Link href="/instructor" className="hover:text-growlity-green transition-colors">Teach on Growlity</Link></li>
              <li><Link href="#" className="hover:text-growlity-green transition-colors">Mobile App</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-growlity-green transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-growlity-green transition-colors">Contact Us</Link></li>
              <li><Link href="#" className="hover:text-growlity-green transition-colors">FAQs</Link></li>
              <li><Link href="#" className="hover:text-growlity-green transition-colors">System Status</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-growlity-green transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-growlity-green transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-growlity-green transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-growlity-green transition-colors">Accessibility</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Growlity Academy. All rights reserved.</p>
          <div className="flex gap-4">
            <select className="bg-transparent border border-border rounded px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-growlity-green/20">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
            </select>
            <select className="bg-transparent border border-border rounded px-3 py-1.5 text-sm outline-none focus:ring-1 focus:ring-growlity-green/20">
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
