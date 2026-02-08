import React, { useState, useEffect } from 'react';
import { AnalyticsStats } from '../services/analytics';
import { analyticsService } from '../services/analytics';
import { BarChart3, Users, Eye, Globe, Monitor, MapPin, Clock } from 'lucide-react';
import AdminAuth from '../components/AdminAuth';
import DataManagement from '../components/DataManagement';
import { formatTimestamp } from '../utils/formatters';

const AnalyticsContent: React.FC = () => {
  const [stats, setStats] = useState<AnalyticsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState(30);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const analyticsData = await analyticsService.getAnalyticsStats(timeRange);
      setStats(analyticsData);
    } catch (err) {
      setError('Failed to load analytics data. Please check your Firebase configuration.');
      console.error('Analytics error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDataDeleted = () => {
    // Refresh analytics data after deletion
    loadAnalytics();
  };

  const StatCard: React.FC<{ title: string; value: number; icon: React.ReactNode; color: string }> = ({
    title,
    value,
    icon,
    color
  }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value.toLocaleString()}</p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: `${color}20` }}>
          {React.cloneElement(icon as React.ReactElement, { 
            className: "w-6 h-6", 
            style: { color } 
          })}
        </div>
      </div>
    </div>
  );

  const ChartCard: React.FC<{ title: string; data: { label: string; value: number }[]; color: string }> = ({
    title,
    data,
    color
  }) => {
    const maxValue = Math.max(...data.map(item => item.value));
    
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className="space-y-3">
          {data.slice(0, 5).map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1 mr-2">{item.label}</span>
              <div className="flex items-center flex-1">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div
                    className="h-2 rounded-full"
                    style={{
                      width: `${(item.value / maxValue) * 100}%`,
                      backgroundColor: color
                    }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white min-w-[2rem]">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-400 dark:border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
          <button
            onClick={loadAnalytics}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">No analytics data available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Website visitor analytics and insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(Number(e.target.value))}
                className="border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
                <option value={365}>Last year</option>
              </select>
              <button
                onClick={loadAnalytics}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <DataManagement onDataDeleted={handleDataDeleted} />

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Page Views"
            value={stats.totalVisitors}
            icon={<Eye />}
            color="#3B82F6"
          />
          <StatCard
            title="Unique Visitors"
            value={stats.uniqueVisitors}
            icon={<Users />}
            color="#10B981"
          />
          <StatCard
            title="Countries"
            value={stats.topCountries.length}
            icon={<Globe />}
            color="#F59E0B"
          />
          <StatCard
            title="Device Types"
            value={stats.deviceTypes.length}
            icon={<Monitor />}
            color="#8B5CF6"
          />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <ChartCard
            title="Top Countries"
            data={stats.topCountries.map(country => ({ label: country.country, value: country.count }))}
            color="#10B981"
          />
          <ChartCard
            title="Device Types"
            data={stats.deviceTypes.map(device => ({ label: device.type, value: device.count }))}
            color="#8B5CF6"
          />
          <ChartCard
            title="Browsers"
            data={stats.browsers.map(browser => ({ label: browser.browser, value: browser.count }))}
            color="#F59E0B"
          />
        </div>

        {/* Recent Visitors Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Visitors</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Time</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>Location</span>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Browser
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {stats.recentVisitors.slice(0, 20).map((visitor, index) => (
                  <tr key={visitor.id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-300">
                      {formatTimestamp(visitor.timestamp)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {visitor.city && visitor.country ? `${visitor.city}, ${visitor.country}` : visitor.country || 'Unknown'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="capitalize">{visitor.deviceType}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {visitor.browser}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const Analytics: React.FC = () => {
  return (
    <AdminAuth>
      <AnalyticsContent />
    </AdminAuth>
  );
};

export default Analytics; 