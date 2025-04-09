// components/Dashboard.tsx
import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [animationProgress, setAnimationProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(100);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Sample dashboard metrics
  const metrics = [
    { title: 'Total Instances', value: '24', change: '+2', icon: 'server' },
    { title: 'Storage Used', value: '1.8TB', change: '+0.3TB', icon: 'database' },
    { title: 'Monthly Cost', value: '$2,145', change: '-$125', icon: 'cash' },
    { title: 'Active Users', value: '348', change: '+42', icon: 'users' }
  ];
  
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Welcome to your cloud management portal</p>
      </div>
      
      {/* Metrics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric, index) => (
          <div 
            key={index}
            className="bg-gray-700 overflow-hidden rounded-lg shadow transition-all duration-500 transform hover:scale-105"
            style={{
              opacity: animationProgress === 100 ? 1 : 0,
              transform: `translateY(${animationProgress === 100 ? '0' : '20px'})`,
              transition: `all 0.5s ease-out ${index * 0.1}s`
            }}
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 rounded-md p-3 bg-gray-800">
                  {renderIcon(metric.icon)}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      {metric.title}
                    </dt>
                    <dd>
                      <div className="flex items-baseline">
                        <div className="text-2xl font-semibold text-white">
                          {metric.value}
                        </div>
                        <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                          metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {metric.change}
                        </div>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Recent Activity Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium text-white mb-4">Recent Activity</h2>
        <div className="bg-gray-700 shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {[
                { user: 'Sarah Chen', action: 'deployed a new instance', time: '2 hours ago', severity: 'normal' },
                { user: 'Alex Johnson', action: 'updated firewall rules', time: '5 hours ago', severity: 'warning' },
                { user: 'Maria Garcia', action: 'created a new database', time: '1 day ago', severity: 'normal' },
                { user: 'John Smith', action: 'deleted storage bucket', time: '2 days ago', severity: 'critical' }
              ].map((activity, index) => (
                <div 
                  key={index} 
                  className="flex items-center"
                  style={{
                    opacity: animationProgress === 100 ? 1 : 0,
                    transform: `translateX(${animationProgress === 100 ? '0' : '-20px'})`,
                    transition: `all 0.5s ease-out ${0.4 + index * 0.1}s`
                  }}
                >
                  <div className={`flex-shrink-0 h-3 w-3 rounded-full ${
                    activity.severity === 'critical' ? 'bg-red-400' : 
                    activity.severity === 'warning' ? 'bg-yellow-400' : 'bg-teal-400'
                  }`}></div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-white">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-300"> {activity.action}</span>
                    </p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Resources Section */}
      <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div 
          className="bg-gray-700 rounded-lg shadow"
          style={{
            opacity: animationProgress === 100 ? 1 : 0,
            transform: `translateY(${animationProgress === 100 ? '0' : '20px'})`,
            transition: `all 0.5s ease-out 0.8s`
          }}
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-white mb-4">Resource Utilization</h3>
            
            {['CPU Usage', 'Memory', 'Network', 'Disk I/O'].map((resource, index) => (
              <div key={index} className="mt-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-300">{resource}</div>
                  <div className="text-sm text-teal-300">
                    {Math.floor(Math.random() * 30) + 40}%
                  </div>
                </div>
                <div className="mt-2 w-full bg-gray-600 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal-600 to-teal-400 h-2 rounded-full" 
                    style={{ width: `${Math.floor(Math.random() * 30) + 40}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div 
          className="bg-gray-700 rounded-lg shadow"
          style={{
            opacity: animationProgress === 100 ? 1 : 0,
            transform: `translateY(${animationProgress === 100 ? '0' : '20px'})`,
            transition: `all 0.5s ease-out 1s`
          }}
        >
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-white mb-4">Active Services</h3>
            
            <div className="space-y-3">
              {[
                { name: 'Web Server', status: 'Healthy', instances: 4 },
                { name: 'Database Cluster', status: 'Warning', instances: 2 },
                { name: 'Storage Service', status: 'Healthy', instances: 1 },
                { name: 'Load Balancer', status: 'Healthy', instances: 2 },
                { name: 'Authentication Service', status: 'Critical', instances: 3 }
              ].map((service, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                      service.status === 'Healthy' ? 'bg-green-400' : 
                      service.status === 'Warning' ? 'bg-yellow-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-sm text-gray-300">{service.name}</span>
                  </div>
                  <div className="text-xs text-gray-400">{service.instances} instances</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to render different icons
const renderIcon = (icon: string) => {
  switch (icon) {
    case 'server':
      return (
        <svg className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      );
    case 'database':
      return (
        <svg className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    case 'cash':
      return (
        <svg className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      );
    case 'users':
      return (
        <svg className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    default:
      return null;
  }
};

export default Dashboard;