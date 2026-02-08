import React, { useState, useEffect } from 'react';
import { analyticsService, DeleteFilters, VisitorData } from '../services/analytics';
import { Trash2, Eye, AlertTriangle, Calendar, MapPin, Monitor, Globe, FileText, Search } from 'lucide-react';
import { formatTimestamp } from '../utils/formatters';

interface DataManagementProps {
  onDataDeleted: () => void;
}

const DataManagement: React.FC<DataManagementProps> = ({ onDataDeleted }) => {
  const [filters, setFilters] = useState<DeleteFilters>({});
  const [preview, setPreview] = useState<{ count: number; sampleData: VisitorData[] }>({ count: 0, sampleData: [] });
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteResult, setDeleteResult] = useState<{ deletedCount: number; error?: string } | null>(null);
  const [filterOptions, setFilterOptions] = useState<{
    cities: string[];
    countries: string[];
    browsers: string[];
    pages: string[];
  }>({ cities: [], countries: [], browsers: [], pages: [] });
  const [loadingOptions, setLoadingOptions] = useState(true);

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      setLoadingOptions(true);
      const options = await analyticsService.getFilterOptions();
      setFilterOptions(options);
    } catch (error) {
      console.error('Failed to load filter options:', error);
    } finally {
      setLoadingOptions(false);
    }
  };

  const handlePreview = async () => {
    if (Object.keys(filters).length === 0) {
      alert('Please select at least one filter to preview data.');
      return;
    }

    setLoading(true);
    try {
      const result = await analyticsService.getDataPreview(filters);
      setPreview(result);
      setShowPreview(true);
    } catch (error) {
      console.error('Failed to preview data:', error);
      alert('Failed to preview data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (Object.keys(filters).length === 0) {
      alert('Please select at least one filter to delete data.');
      return;
    }

    setDeleting(true);
    try {
      const result = await analyticsService.deleteAnalyticsData(filters);
      setDeleteResult(result);
      setShowDeleteConfirm(false);
      setShowPreview(false);
      setFilters({});
      onDataDeleted();
    } catch (error) {
      console.error('Failed to delete data:', error);
      setDeleteResult({ deletedCount: 0, error: 'Failed to delete data. Please try again.' });
    } finally {
      setDeleting(false);
    }
  };

  const handleFilterChange = (key: keyof DeleteFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value || undefined
    }));
    setShowPreview(false);
    setDeleteResult(null);
  };

  const handleDateChange = (key: 'startDate' | 'endDate', value: string) => {
    const newDate = value ? new Date(value) : undefined;
    
    // If setting end date, set it to end of day
    if (key === 'endDate' && newDate) {
      newDate.setHours(23, 59, 59, 999);
    }
    
    // If setting start date, set it to start of day
    if (key === 'startDate' && newDate) {
      newDate.setHours(0, 0, 0, 0);
    }
    
    setFilters(prev => ({
      ...prev,
      [key]: newDate
    }));
    setShowPreview(false);
    setDeleteResult(null);
  };

  const clearFilters = () => {
    setFilters({});
    setShowPreview(false);
    setDeleteResult(null);
  };

  const setQuickFilter = (filterType: string) => {
    setDeleteResult(null);
    setShowPreview(false);
    
    switch (filterType) {
      case 'ankara':
        setFilters({ city: 'Ankara' });
        break;
      case 'today': {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endOfToday = new Date();
        endOfToday.setHours(23, 59, 59, 999);
        setFilters({ startDate: today, endDate: endOfToday });
        break;
      }
      case 'last7days': {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        const now = new Date();
        setFilters({ startDate: sevenDaysAgo, endDate: now });
        break;
      }
      case 'desktop':
        setFilters({ deviceType: 'desktop' });
        break;
      case 'mobile':
        setFilters({ deviceType: 'mobile' });
        break;
    }
  };

  const formatDateForInput = (date?: Date) => {
    if (!date) return '';
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center space-x-2">
            <Trash2 className="w-5 h-5 text-red-500" />
            <span>Data Management</span>
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Delete analytics data based on specific criteria
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={loadFilterOptions}
            disabled={loadingOptions}
            className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200 transition-colors flex items-center space-x-1"
          >
            <Search className="w-4 h-4" />
            <span>{loadingOptions ? 'Loading...' : 'Refresh Options'}</span>
          </button>
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Quick Actions</h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setQuickFilter('ankara')}
            className="px-3 py-1 text-sm bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-900/40 text-red-700 dark:text-red-400 rounded-md transition-colors"
          >
            Delete Ankara Data
          </button>
          <button
            onClick={() => setQuickFilter('today')}
            className="px-3 py-1 text-sm bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/20 dark:hover:bg-orange-900/40 text-orange-700 dark:text-orange-400 rounded-md transition-colors"
          >
            Delete Today's Data
          </button>
          <button
            onClick={() => setQuickFilter('last7days')}
            className="px-3 py-1 text-sm bg-yellow-100 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/40 text-yellow-700 dark:text-yellow-400 rounded-md transition-colors"
          >
            Delete Last 7 Days
          </button>
          <button
            onClick={() => setQuickFilter('desktop')}
            className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/20 dark:hover:bg-blue-900/40 text-blue-700 dark:text-blue-400 rounded-md transition-colors"
          >
            Delete Desktop Data
          </button>
          <button
            onClick={() => setQuickFilter('mobile')}
            className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-900/40 text-green-700 dark:text-green-400 rounded-md transition-colors"
          >
            Delete Mobile Data
          </button>
        </div>
      </div>

      {/* Active Filters Summary */}
      {Object.keys(filters).length > 0 && (
        <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">Active Filters:</h4>
          <div className="flex flex-wrap gap-2">
            {filters.city && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">
                City: {filters.city}
              </span>
            )}
            {filters.country && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">
                Country: {filters.country}
              </span>
            )}
            {filters.deviceType && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">
                Device: {filters.deviceType}
              </span>
            )}
            {filters.browser && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">
                Browser: {filters.browser}
              </span>
            )}
            {filters.page && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">
                Page: {filters.page}
              </span>
            )}
            {filters.startDate && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">
                From: {formatDateForInput(filters.startDate)}
              </span>
            )}
            {filters.endDate && (
              <span className="inline-flex items-center px-2 py-1 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded">
                To: {formatDateForInput(filters.endDate)}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* City Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            City
          </label>
          <select
            value={filters.city || ''}
            onChange={(e) => handleFilterChange('city', e.target.value)}
            disabled={loadingOptions}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
          >
            <option value="">All Cities</option>
            {filterOptions.cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {loadingOptions && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Loading cities...</p>
          )}
        </div>

        {/* Country Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Globe className="w-4 h-4 inline mr-1" />
            Country
          </label>
          <select
            value={filters.country || ''}
            onChange={(e) => handleFilterChange('country', e.target.value)}
            disabled={loadingOptions}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
          >
            <option value="">All Countries</option>
            {filterOptions.countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {loadingOptions && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Loading countries...</p>
          )}
        </div>

        {/* Device Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Monitor className="w-4 h-4 inline mr-1" />
            Device Type
          </label>
          <select
            value={filters.deviceType || ''}
            onChange={(e) => handleFilterChange('deviceType', e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Devices</option>
            <option value="desktop">Desktop</option>
            <option value="mobile">Mobile</option>
            <option value="tablet">Tablet</option>
          </select>
        </div>

        {/* Browser Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Browser
          </label>
          <select
            value={filters.browser || ''}
            onChange={(e) => handleFilterChange('browser', e.target.value)}
            disabled={loadingOptions}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
          >
            <option value="">All Browsers</option>
            {filterOptions.browsers.map(browser => (
              <option key={browser} value={browser}>{browser}</option>
            ))}
          </select>
          {loadingOptions && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Loading browsers...</p>
          )}
        </div>

        {/* Page Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FileText className="w-4 h-4 inline mr-1" />
            Page
          </label>
          <select
            value={filters.page || ''}
            onChange={(e) => handleFilterChange('page', e.target.value)}
            disabled={loadingOptions}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 dark:disabled:bg-gray-600"
          >
            <option value="">All Pages</option>
            {filterOptions.pages.map(page => (
              <option key={page} value={page}>{page}</option>
            ))}
          </select>
          {loadingOptions && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Loading pages...</p>
          )}
        </div>

        {/* Start Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            Start Date
          </label>
          <input
            type="date"
            value={formatDateForInput(filters.startDate)}
            onChange={(e) => handleDateChange('startDate', e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* End Date Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="w-4 h-4 inline mr-1" />
            End Date
          </label>
          <input
            type="date"
            value={formatDateForInput(filters.endDate)}
            onChange={(e) => handleDateChange('endDate', e.target.value)}
            className="w-full border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4 mb-6">
        <button
          onClick={handlePreview}
          disabled={loading || Object.keys(filters).length === 0}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
        >
          <Eye className="w-4 h-4" />
          <span>{loading ? 'Loading...' : 'Preview Data'}</span>
        </button>

        {showPreview && preview.count > 0 && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={deleting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors flex items-center space-x-2"
          >
            <Trash2 className="w-4 h-4" />
            <span>{deleting ? 'Deleting...' : `Delete ${preview.count} Records`}</span>
          </button>
        )}
      </div>

      {/* Preview Results */}
      {showPreview && (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-6">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white mb-3">
            Preview: {preview.count} records match your filters
          </h4>
          
          {preview.count === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">No records match the selected filters.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Time</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Page</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Location</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Device</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {preview.sampleData.map((visitor, index) => (
                    <tr key={visitor.id || index} className="text-sm">
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-300">
                        {formatTimestamp(visitor.timestamp)}
                      </td>
                      <td className="px-4 py-2 text-gray-900 dark:text-gray-300">
                        {visitor.page}
                      </td>
                      <td className="px-4 py-2 text-gray-500 dark:text-gray-400">
                        {visitor.city && visitor.country ? `${visitor.city}, ${visitor.country}` : visitor.country || 'Unknown'}
                      </td>
                      <td className="px-4 py-2 text-gray-500 dark:text-gray-400">
                        <span className="capitalize">{visitor.deviceType}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {preview.count > 10 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Showing first 10 of {preview.count} records
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-red-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Confirm Deletion
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete {preview.count} analytics records? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md transition-colors"
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Result */}
      {deleteResult && (
        <div className={`border rounded-lg p-4 ${
          deleteResult.error 
            ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-500' 
            : 'border-green-300 bg-green-50 dark:bg-green-900/20 dark:border-green-500'
        }`}>
          <div className="flex items-center space-x-2">
            {deleteResult.error ? (
              <AlertTriangle className="w-5 h-5 text-red-500" />
            ) : (
              <Search className="w-5 h-5 text-green-500" />
            )}
            <div>
              {deleteResult.error ? (
                <p className="text-red-700 dark:text-red-400 font-medium">
                  Error: {deleteResult.error}
                </p>
              ) : (
                <p className="text-green-700 dark:text-green-400 font-medium">
                  Successfully deleted {deleteResult.deletedCount} records
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagement; 