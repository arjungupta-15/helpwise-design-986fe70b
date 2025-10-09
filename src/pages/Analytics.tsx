import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
  ComposedChart, RadialBarChart, RadialBar, ScatterChart, Scatter,
  FunnelChart, Funnel, LabelList, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer, ReferenceLine, Brush, TooltipProps
} from 'recharts';

// Custom animated tooltip component with dark mode support
const CustomTooltip = ({ active, payload, label, formatter }: TooltipProps<any, any> & { formatter?: (value: any, name: string) => [string, string] }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg animate-in fade-in-0 zoom-in-95 duration-200 backdrop-blur-sm">
        <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {formatter ? formatter(entry.value, entry.name || '')[1] : entry.name}: {' '}
            <span className="font-medium">
              {formatter ? formatter(entry.value, entry.name || '')[0] : entry.value}
            </span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom animated legend
const CustomLegend = ({ payload }: any) => (
  <div className="flex flex-wrap justify-center gap-4 mt-4">
    {payload?.map((entry: any, index: number) => (
      <div key={index} className="flex items-center gap-2 animate-in slide-in-from-bottom-2 duration-300" style={{ animationDelay: `${index * 100}ms` }}>
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
        <span className="text-sm text-gray-600 dark:text-gray-400">{entry.value}</span>
      </div>
    ))}
  </div>
);

// Animation configurations
const chartAnimationConfig = {
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease-out' as const
};

const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger re-animation when time range changes
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [timeRange]);

  // Enhanced mock data with more realistic values
  const generateTicketTrends = () => {
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const baseTickets = 15 + Math.sin(i * 0.5) * 5;
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        created: Math.floor(baseTickets + Math.random() * 10),
        resolved: Math.floor(baseTickets * 0.8 + Math.random() * 8),
        pending: Math.floor(baseTickets * 0.3 + Math.random() * 5),
        satisfaction: 4.2 + Math.random() * 0.6
      };
    });
  };

  const generateCategoryData = () => [
    { name: 'Hardware', value: 35, color: '#8884d8', trend: '+12%' },
    { name: 'Software', value: 28, color: '#82ca9d', trend: '+8%' },
    { name: 'Network', value: 20, color: '#ffc658', trend: '-3%' },
    { name: 'Access', value: 12, color: '#ff7c7c', trend: '+15%' },
    { name: 'Other', value: 5, color: '#8dd1e1', trend: '+2%' }
  ];

  const generatePriorityData = () => [
    { priority: 'Critical', count: 8, color: '#ef4444', avgTime: '2.5h' },
    { priority: 'High', count: 24, color: '#f97316', avgTime: '6.2h' },
    { priority: 'Medium', count: 45, color: '#eab308', avgTime: '1.2d' },
    { priority: 'Low', count: 23, color: '#22c55e', avgTime: '3.5d' }
  ];

  const generateTeamPerformance = () => [
    { member: 'Alice Johnson', resolved: 45, avgTime: 4.2, satisfaction: 4.8, efficiency: 92 },
    { member: 'Bob Smith', resolved: 38, avgTime: 5.1, satisfaction: 4.6, efficiency: 88 },
    { member: 'Carol Davis', resolved: 42, avgTime: 3.8, satisfaction: 4.9, efficiency: 95 },
    { member: 'David Wilson', resolved: 35, avgTime: 6.2, satisfaction: 4.4, efficiency: 82 },
    { member: 'Eva Brown', resolved: 40, avgTime: 4.8, satisfaction: 4.7, efficiency: 90 }
  ];

  const generateResolutionFunnel = () => [
    { stage: 'Submitted', value: 150, color: '#8884d8' },
    { stage: 'Assigned', value: 142, color: '#82ca9d' },
    { stage: 'In Progress', value: 128, color: '#ffc658' },
    { stage: 'Testing', value: 115, color: '#ff7c7c' },
    { stage: 'Resolved', value: 108, color: '#8dd1e1' }
  ];

  const generateSatisfactionTrends = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
    return months.map(month => ({
      month,
      satisfaction: 4.0 + Math.random() * 1.0,
      responses: Math.floor(80 + Math.random() * 40),
      nps: Math.floor(60 + Math.random() * 30)
    }));
  };

  const generateHourlyActivity = () => {
    return Array.from({ length: 24 }, (_, hour) => {
      const peakHours = [9, 10, 11, 14, 15, 16];
      const isPeak = peakHours.includes(hour);
      return {
        hour: `${hour.toString().padStart(2, '0')}:00`,
        tickets: isPeak ? 15 + Math.random() * 10 : 3 + Math.random() * 8,
        avgResponse: isPeak ? 15 + Math.random() * 10 : 25 + Math.random() * 15
      };
    });
  };

  const ticketTrends = generateTicketTrends();
  const categoryData = generateCategoryData();
  const priorityData = generatePriorityData();
  const teamPerformance = generateTeamPerformance();
  const resolutionFunnel = generateResolutionFunnel();
  const satisfactionTrends = generateSatisfactionTrends();
  const hourlyActivity = generateHourlyActivity();

  // Custom formatters for tooltips
  const formatTicketCount = (value: number) => [`${value} tickets`, 'Tickets'];
  const formatTime = (value: number) => [`${value}h`, 'Avg Time'];
  const formatSatisfaction = (value: number) => [`${value.toFixed(1)}/5`, 'Rating'];
  const formatPercentage = (value: number) => [`${value}%`, 'Efficiency'];

  return (
    <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 animate-in fade-in-0 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-full sm:w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="overview" className="space-y-4 sm:space-y-6">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview" className="text-xs sm:text-sm">Overview</TabsTrigger>
          <TabsTrigger value="performance" className="text-xs sm:text-sm">Performance</TabsTrigger>
          <TabsTrigger value="satisfaction" className="text-xs sm:text-sm">Satisfaction</TabsTrigger>
          <TabsTrigger value="activity" className="text-xs sm:text-sm">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Ticket Trends - Enhanced Line Chart */}
            <Card className="animate-in slide-in-from-left-2 duration-700">
              <CardHeader>
                <CardTitle>Ticket Trends</CardTitle>
                <CardDescription>Daily ticket creation and resolution patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                  <LineChart key={animationKey} data={ticketTrends} {...chartAnimationConfig}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-gray-600" />
                    <XAxis dataKey="date" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                    <YAxis stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                    <Tooltip content={<CustomTooltip formatter={formatTicketCount} />} />
                    <Legend content={<CustomLegend />} />
                    <Line 
                      type="monotone" 
                      dataKey="created" 
                      stroke="#8884d8" 
                      strokeWidth={3}
                      dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#8884d8', strokeWidth: 2 }}
                      name="Created"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="resolved" 
                      stroke="#82ca9d" 
                      strokeWidth={3}
                      dot={{ fill: '#82ca9d', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#82ca9d', strokeWidth: 2 }}
                      name="Resolved"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pending" 
                      stroke="#ffc658" 
                      strokeWidth={3}
                      dot={{ fill: '#ffc658', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, stroke: '#ffc658', strokeWidth: 2 }}
                      name="Pending"
                    />
                    <ReferenceLine y={20} stroke="#ef4444" strokeDasharray="5 5" label="Target" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution - Enhanced Pie Chart */}
            <Card className="animate-in slide-in-from-right-2 duration-700">
              <CardHeader>
                <CardTitle>Category Distribution</CardTitle>
                <CardDescription>Ticket breakdown by category with trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                  <PieChart key={animationKey}>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                      innerRadius={30}
                      paddingAngle={5}
                      dataKey="value"
                      {...chartAnimationConfig}
                      className="sm:outerRadius-80 sm:innerRadius-40"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList dataKey="name" position="outside" fontSize={10} className="sm:text-sm dark:fill-gray-300" />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {categoryData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className={`text-xs font-medium ${item.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {item.trend}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
            {/* Priority Distribution - Enhanced Bar Chart */}
            <Card className="animate-in slide-in-from-left-2 duration-700" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Priority Distribution</CardTitle>
                <CardDescription>Tickets by priority level with average resolution time</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                  <BarChart key={animationKey} data={priorityData} {...chartAnimationConfig}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-gray-600" />
                    <XAxis dataKey="priority" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                    <YAxis stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                    <Tooltip content={<CustomTooltip formatter={formatTicketCount} />} />
                    <Bar 
                      dataKey="count" 
                      radius={[4, 4, 0, 0]}
                    >
                      {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList dataKey="avgTime" position="top" />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Resolution Funnel */}
            <Card className="animate-in slide-in-from-right-2 duration-700" style={{ animationDelay: '200ms' }}>
              <CardHeader>
                <CardTitle>Resolution Funnel</CardTitle>
                <CardDescription>Ticket progression through resolution stages</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                  <FunnelChart key={animationKey}>
                    <Funnel
                      dataKey="value"
                      data={resolutionFunnel}
                      isAnimationActive={true}
                      {...chartAnimationConfig}
                    >
                      {resolutionFunnel.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                      <LabelList position="center" fill="#fff" stroke="none" fontSize={10} className="sm:text-sm" />
                    </Funnel>
                    <Tooltip content={<CustomTooltip />} />
                  </FunnelChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4 sm:space-y-6">
          {/* Team Performance - Enhanced Composed Chart */}
          <Card className="animate-in slide-in-from-bottom-2 duration-700">
            <CardHeader>
              <CardTitle>Team Performance Metrics</CardTitle>
              <CardDescription>Individual team member performance and efficiency</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                <ComposedChart key={animationKey} data={teamPerformance} {...chartAnimationConfig}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-gray-600" />
                  <XAxis dataKey="member" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={10} angle={-45} textAnchor="end" height={60} />
                  <YAxis yAxisId="left" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} />
                  <Bar yAxisId="left" dataKey="resolved" fill="#8884d8" radius={[4, 4, 0, 0]} name="Resolved Tickets" />
                  <Line yAxisId="right" type="monotone" dataKey="satisfaction" stroke="#82ca9d" strokeWidth={3} name="Satisfaction" />
                  <Line yAxisId="right" type="monotone" dataKey="efficiency" stroke="#ffc658" strokeWidth={3} name="Efficiency %" />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction" className="space-y-4 sm:space-y-6">
          {/* Satisfaction Trends - Enhanced Area Chart */}
          <Card className="animate-in slide-in-from-bottom-2 duration-700">
            <CardHeader>
              <CardTitle>Customer Satisfaction Trends</CardTitle>
              <CardDescription>Monthly satisfaction ratings and NPS scores</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                <AreaChart key={animationKey} data={satisfactionTrends} {...chartAnimationConfig}>
                  <defs>
                    <linearGradient id="satisfactionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="npsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-gray-600" />
                  <XAxis dataKey="month" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                  <YAxis stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                  <Tooltip content={<CustomTooltip formatter={formatSatisfaction} />} />
                  <Legend content={<CustomLegend />} />
                  <Area
                    type="monotone"
                    dataKey="satisfaction"
                    stroke="#8884d8"
                    fillOpacity={1}
                    fill="url(#satisfactionGradient)"
                    strokeWidth={3}
                    name="Satisfaction Rating"
                  />
                  <Area
                    type="monotone"
                    dataKey="nps"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#npsGradient)"
                    strokeWidth={3}
                    name="NPS Score"
                  />
                  <Brush dataKey="month" height={30} stroke="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4 sm:space-y-6">
          {/* Hourly Activity - Enhanced Scatter Chart */}
          <Card className="animate-in slide-in-from-bottom-2 duration-700">
            <CardHeader>
              <CardTitle>Hourly Activity Patterns</CardTitle>
              <CardDescription>Ticket volume and response times throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300} className="sm:h-[400px]">
                <ScatterChart key={animationKey} data={hourlyActivity} {...chartAnimationConfig}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" className="dark:stroke-gray-600" />
                  <XAxis dataKey="hour" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={10} angle={-45} textAnchor="end" height={60} />
                  <YAxis yAxisId="left" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#6b7280" className="dark:stroke-gray-400" fontSize={12} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend content={<CustomLegend />} />
                  <Scatter yAxisId="left" dataKey="tickets" fill="#8884d8" name="Ticket Volume" />
                  <Scatter yAxisId="right" dataKey="avgResponse" fill="#82ca9d" name="Avg Response Time (min)" />
                </ScatterChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Radial Performance Chart */}
          <Card className="animate-in slide-in-from-bottom-2 duration-700" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle>Performance Radial Chart</CardTitle>
              <CardDescription>Team efficiency visualization</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250} className="sm:h-[300px]">
                <RadialBarChart key={animationKey} cx="50%" cy="50%" innerRadius="20%" outerRadius="80%" data={teamPerformance} {...chartAnimationConfig}>
                  <RadialBar
                    minAngle={15}
                    label={{ position: 'insideStart', fill: '#fff', fontSize: 10 }}
                    background={{ fill: '#f3f4f6' }}
                    clockWise
                    dataKey="efficiency"
                    className="dark:background-gray-700"
                  />
                  <Legend 
                    iconSize={14} 
                    wrapperStyle={{ 
                      top: '50%', 
                      right: '0%', 
                      transform: 'translate(0, -50%)', 
                      lineHeight: '20px',
                      fontSize: '12px'
                    }} 
                  />
                  <Tooltip content={<CustomTooltip formatter={formatPercentage} />} />
                </RadialBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;