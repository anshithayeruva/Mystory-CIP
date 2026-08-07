import { prisma } from '../prisma/client';
import { AppError } from '../middleware/errorHandler';
import cache from '../lib/redis';
import path from 'path';
import fs from 'fs';

export interface ResourceItem {
  id: string;
  course: string;
  title: string;
  format: string;
  uploadedAt: string;
  downloads: number;
  visibleTo: string;
  category?: string;
  fileUrl?: string;
  filename?: string;
}

const DEFAULT_RESOURCES: ResourceItem[] = [
  {
    id: '1',
    course: 'CSE 301',
    title: 'Graph Algorithms Complete Lecture Notes (Ch 1-6)',
    format: 'PDF (8.4 MB)',
    uploadedAt: 'July 25, 2026',
    downloads: 142,
    visibleTo: 'CSE-A, CSE-B',
    category: 'Lecture Notes'
  },
  {
    id: '2',
    course: 'CSE 302',
    title: 'SQL Query Tuning & Indexing Presentation Deck',
    format: 'PPTX (14.2 MB)',
    uploadedAt: 'July 22, 2026',
    downloads: 98,
    visibleTo: 'CSE-C',
    category: 'Presentation Deck'
  },
  {
    id: '3',
    course: 'CSE 303',
    title: 'Linux Kernel Process Management Reference Guide',
    format: 'PDF (22.1 MB)',
    uploadedAt: 'July 18, 2026',
    downloads: 210,
    visibleTo: 'All Sections',
    category: 'Reference Guide'
  },
  {
    id: '4',
    course: 'CSE 304',
    title: 'Computer Networks Lab Manual - Wireshark Experiments',
    format: 'PDF (5.1 MB)',
    uploadedAt: 'July 15, 2026',
    downloads: 185,
    visibleTo: 'CSE-A, CSE-C',
    category: 'Lab Manual'
  },
  {
    id: '5',
    course: 'CSE 301',
    title: 'Previous Year Mid-Semester Question Papers (2023-2025)',
    format: 'PDF (12.0 MB)',
    uploadedAt: 'July 10, 2026',
    downloads: 320,
    visibleTo: 'All Sections',
    category: 'Exam Papers'
  }
];

let inMemoryStorage: ResourceItem[] = [...DEFAULT_RESOURCES];

export class FacultyResourceService {
  private static async resolveFaculty(userId?: string) {
    if (userId) {
      const faculty = await prisma.facultyProfile.findFirst({
        where: { userId },
        include: { department: true }
      });
      if (faculty) return faculty;
    }
    return prisma.facultyProfile.findFirst({
      include: { department: true }
    });
  }

  private static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  static async getResources(userId?: string) {
    const cacheKey = `faculty:resources:${userId || 'default'}`;

    try {
      if (cache && typeof cache.get === 'function') {
        const cached = await cache.get(cacheKey);
        if (cached) return JSON.parse(cached);
      }
    } catch (err) {
      console.warn('Redis read skipped for resources:', err);
    }

    try {
      if (cache && typeof cache.setex === 'function') {
        await cache.setex(cacheKey, 60, JSON.stringify(inMemoryStorage));
      }
    } catch (err) {
      console.warn('Redis write skipped for resources:', err);
    }

    return inMemoryStorage;
  }

  static async uploadResource(
    userId: string | undefined, 
    data: {
      courseCode: string;
      category: string;
      title: string;
      format?: string;
      visibleTo?: string;
    },
    file?: Express.Multer.File
  ) {
    // Invalidate cache
    try {
      if (cache && typeof cache.del === 'function') {
        await cache.del(`faculty:resources:${userId || 'default'}`);
      }
    } catch (e) {}

    let formatLabel = data.format || 'PDF (6.2 MB)';
    let fileUrl: string | undefined = undefined;
    let filename: string | undefined = undefined;

    if (file) {
      const ext = path.extname(file.originalname).toUpperCase().replace('.', '');
      const sizeStr = this.formatFileSize(file.size);
      formatLabel = `${ext} (${sizeStr})`;
      filename = file.filename;
      fileUrl = `/uploads/resources/${file.filename}`;
    }

    const newRes: ResourceItem = {
      id: String(Date.now()),
      course: data.courseCode || 'CSE 301',
      title: data.title,
      format: formatLabel,
      uploadedAt: 'Just Now',
      downloads: 0,
      visibleTo: data.visibleTo || 'All Sections',
      category: data.category || 'Lecture Notes',
      fileUrl,
      filename
    };

    inMemoryStorage = [newRes, ...inMemoryStorage];

    return newRes;
  }

  static async deleteResource(userId: string | undefined, resourceId: string) {
    // Invalidate cache
    try {
      if (cache && typeof cache.del === 'function') {
        await cache.del(`faculty:resources:${userId || 'default'}`);
      }
    } catch (e) {}

    const target = inMemoryStorage.find(r => r.id === resourceId);
    if (target && target.filename) {
      const filePath = path.join(process.cwd(), 'uploads', 'resources', target.filename);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.warn('Failed to delete resource file from disk:', err);
        }
      }
    }

    inMemoryStorage = inMemoryStorage.filter(r => r.id !== resourceId);

    return { id: resourceId, message: 'Resource deleted successfully' };
  }
}
