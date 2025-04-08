
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BriefcaseIcon, TrendingUp, Users, CheckCircle, Filter } from "lucide-react";

// Mock data for charts
const applicationData = [
  { name: "Jan", value: 12 },
  { name: "Feb", value: 19 },
  { name: "Mar", value: 25 },
  { name: "Apr", value: 32 },
  { name: "May", value: 40 },
  { name: "Jun", value: 45 },
  { name: "Jul", value: 52 },
];

const hireRateData = [
  { name: "Jan", applications: 12, hires: 3 },
  { name: "Feb", applications: 19, hires: 5 },
  { name: "Mar", applications: 25, hires: 8 },
  { name: "Apr", applications: 32, hires: 12 },
  { name: "May", applications: 40, hires: 15 },
  { name: "Jun", applications: 45, hires: 17 },
  { name: "Jul", applications: 52, hires: 20 },
];

const sourcesData = [
  { name: "Job Board", value: 40 },
  { name: "Referral", value: 25 },
  { name: "Social Media", value: 15 },
  { name: "Direct", value: 20 },
];

const COLORS = ["#3498db", "#2ecc71", "#f1c40f", "#e74c3c"];

export const KpiWidgets = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">175</span>
                <div className="flex items-center text-green-500 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+24% from last month</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Hire Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">38.4%</span>
                <div className="flex items-center text-green-500 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>+5% from last month</span>
                </div>
              </div>
              <CheckCircle className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Open Positions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">12</span>
                <div className="flex items-center text-gray-500 text-xs mt-1">
                  <span>Across 5 locations</span>
                </div>
              </div>
              <BriefcaseIcon className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Time to Hire (avg)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold">9.2 days</span>
                <div className="flex items-center text-green-500 text-xs mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  <span>-2.3 days from previous</span>
                </div>
              </div>
              <Filter className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Applications Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={applicationData}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#3498db" 
                    strokeWidth={2}
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Application Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourcesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sourcesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Applications vs. Hires</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={hireRateData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="applications" fill="#3498db" name="Applications" />
                <Bar dataKey="hires" fill="#2ecc71" name="Hires" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
