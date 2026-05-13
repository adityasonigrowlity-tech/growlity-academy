'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Grid,
  Edit2,
  Trash2,
  ChevronRight,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPortal,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog.jsx";
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import adminService from '@/services/admin.service';

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Create/Edit Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', parent_id: '' });
  const [submitting, setSubmitting] = useState(false);

  // Delete Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await adminService.getAdminCategories();
      setCategories(data.data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, parent_id: category.parent_id || '' });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', parent_id: '' });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setSubmitting(true);

      // Create a clean payload for the API
      const payload = {
        name: formData.name.trim(),
        slug: formData.name.toLowerCase().trim()
          .replace(/[^\w\s-]/g, '') // Remove non-word characters
          .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
          .replace(/^-+|-+$/g, ''), // Remove leading/trailing hyphens
        parent_id: formData.parent_id || null
      };

      if (editingCategory) {
        await adminService.updateAdminCategory(editingCategory.id, payload);
        toast.success('Category updated successfully');
      } else {
        await adminService.createAdminCategory(payload);
        toast.success('Category created successfully');
      }
      setIsDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error(error.response?.data?.error || error.response?.data?.message || 'Failed to save category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      setSubmitting(true);
      await adminService.deleteAdminCategory(categoryToDelete.id);
      toast.success('Category deleted successfully');
      setIsDeleteDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error(error.response?.data?.message || 'Failed to delete category');
    } finally {
      setSubmitting(false);
      setCategoryToDelete(null);
    }
  };

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight flex items-center gap-2 sm:gap-3">
            <Grid className="h-6 w-6 sm:h-8 sm:w-8 text-growlity-blue" />
            Category Management
          </h1>
          <p className="text-xs sm:text-base text-gray-500 font-medium">Create and organize course categories.</p>
        </div>
        <Button 
          onClick={() => handleOpenDialog()}
          className="bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold h-10 sm:h-11 px-6 rounded-xl shadow-lg shadow-growlity-blue/20 gap-2 text-sm"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="relative max-w-full sm:max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input 
          placeholder="Search categories..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 h-11 sm:h-12 bg-white border-gray-100 rounded-2xl shadow-sm focus:ring-2 focus:ring-growlity-blue/10 transition-all font-medium text-sm"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-gray-100 uppercase tracking-widest text-[10px] sm:text-xs font-black">
              <TableHead className="text-gray-900 py-4 sm:py-5 pl-4 sm:pl-8">Category Name</TableHead>
              <TableHead className="text-gray-900 py-4 sm:py-5 hidden md:table-cell">Slug</TableHead>
              <TableHead className="text-gray-900 py-4 sm:py-5 hidden sm:table-cell">Parent</TableHead>
              <TableHead className="text-gray-900 py-4 sm:py-5 text-right pr-4 sm:pr-8">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-10 w-10 text-growlity-blue animate-spin" />
                    <p className="text-gray-500 font-bold">Loading categories...</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="h-64 text-center">
                  <div className="flex flex-col items-center gap-3">
                    <AlertCircle className="h-12 w-12 text-gray-300" />
                    <p className="text-gray-500 font-bold">No categories found.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id} className="group hover:bg-gray-50/50 transition-colors border-gray-50">
                  <TableCell className="py-4 sm:py-5 pl-4 sm:pl-8">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-growlity-blue/5 flex items-center justify-center text-growlity-blue">
                        <Grid className="h-4 w-4 sm:h-5 sm:w-5" />
                      </div>
                      <span className="font-bold text-gray-900 text-sm sm:text-base">{category.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="py-4 sm:py-5 font-mono text-[10px] sm:text-xs text-gray-500 hidden md:table-cell">{category.slug}</TableCell>
                  <TableCell className="py-4 sm:py-5 text-gray-500 text-[10px] sm:text-sm hidden sm:table-cell">{category.parent_id || '—'}</TableCell>
                  <TableCell className="py-4 sm:py-5 text-right pr-4 sm:pr-8">
                    <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => handleOpenDialog(category)}
                        className="h-9 w-9 rounded-lg hover:bg-growlity-blue hover:text-white transition-all"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => {
                          setCategoryToDelete(category);
                          setIsDeleteDialogOpen(true);
                        }}
                        className="h-9 w-9 rounded-lg hover:bg-red-500 hover:text-white transition-all text-red-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-3xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black text-gray-900">
              {editingCategory ? 'Edit Category' : 'Add New Category'}
            </DialogTitle>
            <DialogDescription className="font-medium">
              {editingCategory 
                ? 'Update the category details below.' 
                : 'Enter the details for the new category.'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold text-gray-700">Category Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Web Development"
                className="h-12 rounded-xl"
                required
              />
            </div>
            {/* Parent Category can be added here if needed in future */}
            <DialogFooter>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
                className="h-11 rounded-xl font-bold"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={submitting}
                className="bg-growlity-blue hover:bg-growlity-blue-hover text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-growlity-blue/20"
              >
                {submitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {editingCategory ? 'Update Category' : 'Create Category'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="rounded-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black text-gray-900">Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="font-medium">
              This will permanently delete the category <span className="font-bold text-gray-900">"{categoryToDelete?.name}"</span>. 
              This action cannot be undone and will fail if courses are associated with it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="h-11 rounded-xl font-bold">Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={submitting}
              className="bg-red-500 hover:bg-red-600 text-white font-bold h-11 px-6 rounded-xl shadow-lg shadow-red-500/20"
            >
              {submitting ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Delete Category
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
