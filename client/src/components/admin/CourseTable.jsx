import { useState, useEffect } from 'react';
import { 
  MoreVertical, 
  Edit2, 
  Trash2, 
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { getAdminCourses, deleteAdminCourse, updateAdminCourseStatus } from '@/services/admin.service';
import Link from 'next/link';

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, total: 0, pages: 1 });

  const fetchCourses = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getAdminCourses({ page, limit: 10 });
      if (response.success) {
        setCourses(response.data);
        setPagination(response.pagination);
      }
    } catch (error) {
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this course?')) return;
    
    try {
      const response = await deleteAdminCourse(id);
      if (response.success) {
        toast.success(response.message || 'Course deleted successfully');
        fetchCourses(pagination.page);
      }
    } catch (error) {
      toast.error('Failed to delete course');
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    try {
      const response = await updateAdminCourseStatus(id, newStatus);
      if (response.success) {
        toast.success(`Course ${newStatus === 'published' ? 'published' : 'hidden'} successfully`);
        fetchCourses(pagination.page);
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-50 shadow-none"><CheckCircle2 className="h-3 w-3 mr-1" /> Published</Badge>;
      case 'draft':
        return <Badge className="bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50 shadow-none"><Clock className="h-3 w-3 mr-1" /> Draft</Badge>;
      case 'archived':
        return <Badge className="bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-50 shadow-none"><AlertCircle className="h-3 w-3 mr-1" /> Archived</Badge>;
      default:
        return <Badge variant="outline" className="capitalize">{status}</Badge>;
    }
  };

  if (loading && courses.length === 0) {
    return (
      <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-gray-100 shadow-sm">
        <Loader2 className="h-8 w-8 text-growlity-blue animate-spin mb-4" />
        <p className="text-gray-500 font-medium">Loading courses...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50">
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Course Name</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Status</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Students</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Price</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Last Updated</th>
              <th className="px-6 py-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {courses.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-gray-500 font-medium">
                  No courses found.
                </td>
              </tr>
            ) : (
              courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900 group-hover:text-growlity-blue transition-colors truncate max-w-[200px] block">
                      {course.title}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tight">
                      {course.category?.name || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(course.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">{course.total_students?.toLocaleString('en-US') || 0}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-gray-900">${course.price}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-gray-400">
                    {new Date(course.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-xl hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4 text-gray-400" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 p-1 rounded-xl shadow-xl border-border/50 backdrop-blur-xl">
                        <Link href={`/course/${course.slug}`} target="_blank">
                          <DropdownMenuItem className="rounded-lg gap-2 font-medium">
                            <Eye className="h-4 w-4" /> View Page
                          </DropdownMenuItem>
                        </Link>
                        <Link href={`/admin/courses/${course.id}/edit`}>
                          <DropdownMenuItem className="rounded-lg gap-2 font-medium">
                            <Edit2 className="h-4 w-4" /> Edit
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem 
                          className="rounded-lg gap-2 font-medium"
                          onClick={() => handleStatusToggle(course.id, course.status)}
                        >
                          {course.status === 'published' ? (
                            <><Clock className="h-4 w-4" /> Hide Course</>
                          ) : (
                            <><CheckCircle2 className="h-4 w-4" /> Publish</>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="rounded-lg gap-2 font-medium text-destructive focus:bg-destructive/10"
                          onClick={() => handleDelete(course.id)}
                        >
                          <Trash2 className="h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {/* Footer / Pagination */}
      <div className="px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
         <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
           Showing {courses.length} of {pagination.total} courses
         </span>
         <div className="flex gap-2">
           <Button 
            variant="outline" 
            size="sm" 
            className="rounded-lg h-8 text-xs font-bold"
            disabled={pagination.page <= 1 || loading}
            onClick={() => fetchCourses(pagination.page - 1)}
           >
             Previous
           </Button>
           <Button 
            variant="outline" 
            size="sm" 
            className="rounded-lg h-8 text-xs font-bold bg-white shadow-sm border-gray-200"
            disabled={pagination.page >= pagination.pages || loading}
            onClick={() => fetchCourses(pagination.page + 1)}
           >
             Next
           </Button>
         </div>
      </div>
    </div>
  );
};

export default CourseTable;
