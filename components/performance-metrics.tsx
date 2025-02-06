'use client';

import { useEffect } from 'react';

export function PerformanceMetrics() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      try {
        // 监控页面加载性能
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // 发送性能数据到分析服务
            const metric = {
              name: entry.name,
              value: entry.startTime,
              timestamp: new Date().toISOString()
            };
            
            // 可以在这里添加发送到自定义分析服务的逻辑
            console.log(`[Performance] ${JSON.stringify(metric)}`);
          });
        });

        // 监控关键性能指标
        observer.observe({ 
          entryTypes: [
            'navigation',
            'resource',
            'paint',
            'largest-contentful-paint',
            'first-input',
            'layout-shift'
          ] 
        });

        // 监控长任务
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            const metric = {
              duration: entry.duration,
              startTime: entry.startTime,
              timestamp: new Date().toISOString()
            };
            console.log(`[Long Task] ${JSON.stringify(metric)}`);
          });
        });

        longTaskObserver.observe({ entryTypes: ['longtask'] });

        // 监控网络状态
        const reportNetworkStatus = () => {
          if ('connection' in navigator) {
            const connection = (navigator as any).connection;
            console.log(`[Network] Type: ${connection.effectiveType}, RTT: ${connection.rtt}`);
          }
        };

        window.addEventListener('online', reportNetworkStatus);
        window.addEventListener('offline', reportNetworkStatus);

        return () => {
          observer.disconnect();
          longTaskObserver.disconnect();
          window.removeEventListener('online', reportNetworkStatus);
          window.removeEventListener('offline', reportNetworkStatus);
        };
      } catch (error) {
        console.error('[PerformanceMetrics] Error:', error);
      }
    }
    
    return () => {};
  }, []);

  return null;
} 