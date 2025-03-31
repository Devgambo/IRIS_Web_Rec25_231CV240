import React, { useEffect, useState } from 'react';
import { useGetStatisticsQuery } from '@/features/userSliceApi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Users, Calendar, Clock } from 'lucide-react';
import { useAuth } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const StatCard = ({ title, value, icon}) => (
    <Card className="bg-zinc-900 border-zinc-800 text-white shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
            <div className="flex justify-between items-center">
                <div>
                    <p className="text-zinc-400 text-sm font-medium mb-1">{title}</p>
                    <h3 className="text-2xl font-bold">{value}</h3>
                </div>
                <div className="p-3 rounded-full bg-zinc-800">
                    {icon}
                </div>
            </div>
        </CardContent>
    </Card>
);

const Statistics = () => {
    const { getToken } = useAuth();
    const [token, setToken] = useState();
    const [activeView, setActiveView] = useState("chart");
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();

        setLastUpdated(new Date().toLocaleTimeString());

        const interval = setInterval(() => {
            refetch();
            setLastUpdated(new Date().toLocaleTimeString());
        }, 5 * 60 * 1000);

        return () => clearInterval(interval);
    }, [getToken]);

    const { data, isLoading, refetch } = useGetStatisticsQuery({ token }, {
        pollingInterval: 5 * 60 * 1000,
    });

    if (isLoading) {
        return (
            <Card className="w-full bg-zinc-900 border-zinc-800">
                <CardContent className="flex justify-center items-center h-64">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
                </CardContent>
            </Card>
        );
    }

    const stats = data?.data?.statistics || {};

    const chartData = [
        { name: 'Total Infra Bookings', value: stats.totalInfraBookings },
        { name: 'Total Equipment Requests', value: stats.totalEquipmentRequests },
        { name: 'Pending Infra Bookings', value: stats.pendingInfraBookings },
        { name: 'Pending Equipment Requests', value: stats.pendingEquipmentRequests },
        { name: 'Total Users', value: stats.totalUsers },
    ];

    const barData = [
        { name: 'Infra', total: stats.totalInfraBookings, pending: stats.pendingInfraBookings },
        { name: 'Equipment', total: stats.totalEquipmentRequests, pending: stats.pendingEquipmentRequests },
    ];

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-zinc-800 p-3 rounded-md shadow-md border border-zinc-700 text-white">
                    <p className="font-medium">{payload[0].name}: {payload[0].value}</p>
                </div>
            );
        }
        return null;
    };

    const handleRefresh = () => {
        refetch();
        setLastUpdated(new Date().toLocaleTimeString());
    };

    return (
        <div className="space-y-4">
            <Card className="bg-zinc-900 border-zinc-800 text-white shadow-xl">
                <CardHeader className="border-b border-zinc-800">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold">Admin Dashboard Statistics</CardTitle>
                        <div className="flex items-center space-x-2">
                            <span className="text-xs text-zinc-400">Last updated: {lastUpdated}</span>
                            <button
                                onClick={handleRefresh}
                                className="p-2 rounded-full hover:bg-zinc-800 transition-colors"
                                title="Refresh data"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400 hover:text-white transition-colors">
                                    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                                    <path d="M3 3v5h5" />
                                    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
                                    <path d="M16 16h5v5" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <StatCard
                            title="Total Bookings"
                            value={stats.totalInfraBookings}
                            icon={<Calendar className="h-6 w-6 text-blue-400" />}
                        />
                        <StatCard
                            title="Equipment Requests"
                            value={stats.totalEquipmentRequests}
                            icon={<Clock className="h-6 w-6 text-red-400" />}
                        />
                        <StatCard
                            title="Pending Requests"
                            value={stats.pendingInfraBookings + stats.pendingEquipmentRequests}
                            icon={<Clock className="h-6 w-6 text-yellow-400" />}
                        />
                        <StatCard
                            title="Total Users"
                            value={stats.totalUsers}
                            icon={<Users className="h-6 w-6 text-green-400" />}
                        />
                    </div>

                    <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
                        <TabsList className="bg-zinc-800 mb-4 grid w-full grid-cols-2 max-w-xs">
                            <TabsTrigger value="chart" className="data-[state=active]:bg-zinc-700">Pie Chart</TabsTrigger>
                            <TabsTrigger value="bar" className="data-[state=active]:bg-zinc-700">Bar Chart</TabsTrigger>
                        </TabsList>

                        <TabsContent value="chart" className="mt-0">
                            <div className="bg-zinc-800 p-4 rounded-md">
                                <ResponsiveContainer width="100%" height={400}>
                                    <PieChart>
                                        <Pie
                                            data={chartData}
                                            dataKey="value"
                                            nameKey="name"
                                            outerRadius={150}
                                            fill="#8884d8"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                        >
                                            {chartData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend layout="vertical" verticalAlign="middle" align="right" />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>

                        <TabsContent value="bar" className="mt-0">
                            <div className="bg-zinc-800 p-4 rounded-md">
                                <ResponsiveContainer width="100%" height={400}>
                                    <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                                        <XAxis dataKey="name" stroke="#aaa" />
                                        <YAxis stroke="#aaa" />
                                        <Tooltip
                                            content={({ active, payload }) => {
                                                if (active && payload && payload.length) {
                                                    return (
                                                        <div className="bg-zinc-800 p-3 rounded-md shadow-md border border-zinc-700 text-white">
                                                            <p className="font-medium">{payload[0].payload.name}</p>
                                                            {payload.map((entry, index) => (
                                                                <p key={index} style={{ color: entry.color }}>
                                                                    {entry.name}: {entry.value}
                                                                </p>
                                                            ))}
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            }}
                                        />
                                        <Legend />
                                        <Bar dataKey="total" name="Total" fill="#36A2EB" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey="pending" name="Pending" fill="#FF6384" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    );
};

export default Statistics;