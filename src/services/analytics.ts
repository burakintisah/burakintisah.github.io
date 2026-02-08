import { collection, addDoc, serverTimestamp, query, orderBy, getDocs, where, Timestamp, FieldValue, writeBatch } from 'firebase/firestore';
import { db } from '../config/firebase';

export interface VisitorData {
  id?: string;
  timestamp: Timestamp | FieldValue;
  page: string;
  userAgent: string;
  referrer: string;
  language: string;
  screenResolution: string;
  timezone: string;
  country?: string;
  city?: string;
  ip?: string;
  sessionId: string;
  isNewSession: boolean;
  deviceType: 'mobile' | 'tablet' | 'desktop';
  browser: string;
  os: string;
}

export interface AnalyticsStats {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  topPages: { page: string; count: number }[];
  topCountries: { country: string; count: number }[];
  deviceTypes: { type: string; count: number }[];
  browsers: { browser: string; count: number }[];
  recentVisitors: VisitorData[];
}

export interface DeleteFilters {
  city?: string;
  country?: string;
  startDate?: Date;
  endDate?: Date;
  deviceType?: 'mobile' | 'tablet' | 'desktop';
  browser?: string;
  page?: string;
}

class AnalyticsService {
  private sessionId: string;
  private isNewSession: boolean = true;

  constructor() {
    this.sessionId = this.getOrCreateSessionId();
  }

  private getOrCreateSessionId(): string {
    const existingSessionId = sessionStorage.getItem('analytics_session_id');
    const sessionTimestamp = sessionStorage.getItem('analytics_session_timestamp');
    const now = Date.now();
    
    // Session expires after 30 minutes of inactivity
    if (existingSessionId && sessionTimestamp && (now - parseInt(sessionTimestamp)) < 30 * 60 * 1000) {
      this.isNewSession = false;
      sessionStorage.setItem('analytics_session_timestamp', now.toString());
      return existingSessionId;
    }
    
    const newSessionId = `session_${now}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', newSessionId);
    sessionStorage.setItem('analytics_session_timestamp', now.toString());
    this.isNewSession = true;
    return newSessionId;
  }

  private getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
    const userAgent = navigator.userAgent;
    if (/tablet|ipad|playbook|silk/i.test(userAgent)) {
      return 'tablet';
    }
    if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) {
      return 'mobile';
    }
    return 'desktop';
  }

  private getBrowser(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    if (userAgent.includes('Opera')) return 'Opera';
    return 'Other';
  }

  private getOS(): string {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Windows')) return 'Windows';
    if (userAgent.includes('Mac')) return 'macOS';
    if (userAgent.includes('Linux')) return 'Linux';
    if (userAgent.includes('Android')) return 'Android';
    if (userAgent.includes('iOS')) return 'iOS';
    return 'Other';
  }

  private async getLocationData(): Promise<{ country?: string; city?: string; ip?: string }> {
    try {
      // Check session cache first to avoid repeated API calls
      const cached = sessionStorage.getItem('analytics_location_cache');
      if (cached) {
        return JSON.parse(cached);
      }

      const response = await fetch('https://ipapi.co/json/');
      if (response.ok) {
        const data = await response.json();
        const locationData = {
          country: data.country_name,
          city: data.city,
          ip: data.ip
        };
        sessionStorage.setItem('analytics_location_cache', JSON.stringify(locationData));
        return locationData;
      }
    } catch (error) {
      console.warn('Failed to get location data:', error);
    }
    return {};
  }

  async trackPageView(page: string): Promise<void> {
    try {
      const locationData = await this.getLocationData();
      
      const visitorData: Omit<VisitorData, 'id'> = {
        timestamp: serverTimestamp(),
        page,
        userAgent: navigator.userAgent,
        referrer: document.referrer,
        language: navigator.language,
        screenResolution: `${screen.width}x${screen.height}`,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        sessionId: this.sessionId,
        isNewSession: this.isNewSession,
        deviceType: this.getDeviceType(),
        browser: this.getBrowser(),
        os: this.getOS(),
        ...locationData
      };

      await addDoc(collection(db, 'analytics'), visitorData);
      
      // Reset new session flag after first page view
      this.isNewSession = false;
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }

  async getAnalyticsStats(days: number = 30): Promise<AnalyticsStats> {
    try {
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - days);
      
      const analyticsRef = collection(db, 'analytics');
      const q = query(
        analyticsRef,
        where('timestamp', '>=', startDate),
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const visitors: VisitorData[] = [];
      
      querySnapshot.forEach((doc) => {
        visitors.push({ id: doc.id, ...doc.data() } as VisitorData);
      });

      // Calculate statistics
      const uniqueSessionIds = new Set(visitors.map(v => v.sessionId));
      const pageViews = visitors.length;
      const uniqueVisitors = uniqueSessionIds.size;

      // Top pages
      const pageCount = visitors.reduce((acc, visitor) => {
        acc[visitor.page] = (acc[visitor.page] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const topPages = Object.entries(pageCount)
        .map(([page, count]) => ({ page, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Top countries
      const countryCount = visitors.reduce((acc, visitor) => {
        if (visitor.country) {
          acc[visitor.country] = (acc[visitor.country] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);
      
      const topCountries = Object.entries(countryCount)
        .map(([country, count]) => ({ country, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      // Device types
      const deviceCount = visitors.reduce((acc, visitor) => {
        acc[visitor.deviceType] = (acc[visitor.deviceType] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const deviceTypes = Object.entries(deviceCount)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);

      // Browsers
      const browserCount = visitors.reduce((acc, visitor) => {
        acc[visitor.browser] = (acc[visitor.browser] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const browsers = Object.entries(browserCount)
        .map(([browser, count]) => ({ browser, count }))
        .sort((a, b) => b.count - a.count);

      return {
        totalVisitors: pageViews,
        uniqueVisitors,
        pageViews,
        topPages,
        topCountries,
        deviceTypes,
        browsers,
        recentVisitors: visitors.slice(0, 50)
      };
    } catch (error) {
      console.error('Failed to get analytics stats:', error);
      return {
        totalVisitors: 0,
        uniqueVisitors: 0,
        pageViews: 0,
        topPages: [],
        topCountries: [],
        deviceTypes: [],
        browsers: [],
        recentVisitors: []
      };
    }
  }

  async deleteAnalyticsData(filters: DeleteFilters): Promise<{ deletedCount: number; error?: string }> {
    try {
      const analyticsRef = collection(db, 'analytics');
      
      // Get all documents first, then filter in memory for complex queries
      // This is necessary because Firestore has limitations with compound queries
      let q = query(analyticsRef, orderBy('timestamp', 'desc'));
      
      // If we only have timestamp filters, we can use them in the query
      if (filters.startDate && !filters.city && !filters.country && !filters.deviceType && !filters.browser && !filters.page) {
        q = query(analyticsRef, where('timestamp', '>=', filters.startDate), orderBy('timestamp', 'desc'));
      }
      
      if (filters.endDate && !filters.city && !filters.country && !filters.deviceType && !filters.browser && !filters.page && !filters.startDate) {
        q = query(analyticsRef, where('timestamp', '<=', filters.endDate), orderBy('timestamp', 'desc'));
      }
      
      if (filters.startDate && filters.endDate && !filters.city && !filters.country && !filters.deviceType && !filters.browser && !filters.page) {
        q = query(
          analyticsRef, 
          where('timestamp', '>=', filters.startDate),
          where('timestamp', '<=', filters.endDate),
          orderBy('timestamp', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return { deletedCount: 0 };
      }

      // Filter documents in memory
      const docsToDelete = querySnapshot.docs.filter(doc => {
        const data = doc.data() as VisitorData;
        
        // Apply city filter
        if (filters.city && data.city !== filters.city) {
          return false;
        }
        
        // Apply country filter
        if (filters.country && data.country !== filters.country) {
          return false;
        }
        
        // Apply device type filter
        if (filters.deviceType && data.deviceType !== filters.deviceType) {
          return false;
        }
        
        // Apply browser filter
        if (filters.browser && data.browser !== filters.browser) {
          return false;
        }
        
        // Apply page filter
        if (filters.page && data.page !== filters.page) {
          return false;
        }
        
        // Apply date filters (if not already applied in query)
        if (filters.startDate) {
          const docDate = data.timestamp instanceof Date ? data.timestamp : (data.timestamp as Timestamp).toDate();
          if (docDate < filters.startDate) {
            return false;
          }
        }
        
        if (filters.endDate) {
          const docDate = data.timestamp instanceof Date ? data.timestamp : (data.timestamp as Timestamp).toDate();
          if (docDate > filters.endDate) {
            return false;
          }
        }
        
        return true;
      });

      if (docsToDelete.length === 0) {
        return { deletedCount: 0 };
      }

      // Delete in batches (Firestore batch limit is 500)
      const batch = writeBatch(db);
      let batchCount = 0;
      let totalDeleted = 0;

      for (const docSnapshot of docsToDelete) {
        batch.delete(docSnapshot.ref);
        batchCount++;
        totalDeleted++;

        // Commit batch when it reaches 500 operations
        if (batchCount === 500) {
          await batch.commit();
          batchCount = 0;
        }
      }

      // Commit remaining operations
      if (batchCount > 0) {
        await batch.commit();
      }

      return { deletedCount: totalDeleted };
    } catch (error) {
      console.error('Failed to delete analytics data:', error);
      return { 
        deletedCount: 0, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async getDataPreview(filters: DeleteFilters): Promise<{ count: number; sampleData: VisitorData[] }> {
    try {
      const analyticsRef = collection(db, 'analytics');
      
      // Get all documents first, then filter in memory for complex queries
      let q = query(analyticsRef, orderBy('timestamp', 'desc'));
      
      // If we only have timestamp filters, we can use them in the query
      if (filters.startDate && !filters.city && !filters.country && !filters.deviceType && !filters.browser && !filters.page) {
        q = query(analyticsRef, where('timestamp', '>=', filters.startDate), orderBy('timestamp', 'desc'));
      }
      
      if (filters.endDate && !filters.city && !filters.country && !filters.deviceType && !filters.browser && !filters.page && !filters.startDate) {
        q = query(analyticsRef, where('timestamp', '<=', filters.endDate), orderBy('timestamp', 'desc'));
      }
      
      if (filters.startDate && filters.endDate && !filters.city && !filters.country && !filters.deviceType && !filters.browser && !filters.page) {
        q = query(
          analyticsRef, 
          where('timestamp', '>=', filters.startDate),
          where('timestamp', '<=', filters.endDate),
          orderBy('timestamp', 'desc')
        );
      }

      const querySnapshot = await getDocs(q);
      
      // Filter documents in memory
      const filteredDocs = querySnapshot.docs.filter(doc => {
        const data = doc.data() as VisitorData;
        
        // Apply city filter
        if (filters.city && data.city !== filters.city) {
          return false;
        }
        
        // Apply country filter
        if (filters.country && data.country !== filters.country) {
          return false;
        }
        
        // Apply device type filter
        if (filters.deviceType && data.deviceType !== filters.deviceType) {
          return false;
        }
        
        // Apply browser filter
        if (filters.browser && data.browser !== filters.browser) {
          return false;
        }
        
        // Apply page filter
        if (filters.page && data.page !== filters.page) {
          return false;
        }
        
        // Apply date filters (if not already applied in query)
        if (filters.startDate) {
          const docDate = data.timestamp instanceof Date ? data.timestamp : (data.timestamp as Timestamp).toDate();
          if (docDate < filters.startDate) {
            return false;
          }
        }
        
        if (filters.endDate) {
          const docDate = data.timestamp instanceof Date ? data.timestamp : (data.timestamp as Timestamp).toDate();
          if (docDate > filters.endDate) {
            return false;
          }
        }
        
        return true;
      });

      const sampleData: VisitorData[] = filteredDocs.slice(0, 10).map(doc => ({
        id: doc.id,
        ...doc.data()
      } as VisitorData));
      
      return {
        count: filteredDocs.length,
        sampleData
      };
    } catch (error) {
      console.error('Failed to get data preview:', error);
      return { count: 0, sampleData: [] };
    }
  }

  async getFilterOptions(): Promise<{
    cities: string[];
    countries: string[];
    browsers: string[];
    pages: string[];
  }> {
    try {
      const analyticsRef = collection(db, 'analytics');
      const q = query(analyticsRef, orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const cities = new Set<string>();
      const countries = new Set<string>();
      const browsers = new Set<string>();
      const pages = new Set<string>();
      
      querySnapshot.forEach((doc) => {
        const data = doc.data() as VisitorData;
        
        if (data.city) cities.add(data.city);
        if (data.country) countries.add(data.country);
        if (data.browser) browsers.add(data.browser);
        if (data.page) pages.add(data.page);
      });
      
      return {
        cities: Array.from(cities).sort(),
        countries: Array.from(countries).sort(),
        browsers: Array.from(browsers).sort(),
        pages: Array.from(pages).sort()
      };
    } catch (error) {
      console.error('Failed to get filter options:', error);
      return {
        cities: [],
        countries: [],
        browsers: [],
        pages: []
      };
    }
  }
}

export const analyticsService = new AnalyticsService(); 