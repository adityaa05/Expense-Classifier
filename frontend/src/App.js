import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from 'recharts';
import { 
  ArrowDownToLine, 
  Loader2, 
  BarChart3, 
  List, 
  Sparkles, 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  Target,
  Zap,
  Eye,
  EyeOff,
  Plus,
  X,
  Edit3,
  Trash2,
  Download,
  Upload,
  Settings,
  Bell,
  User,
  Home,
  CreditCard,
  ShoppingBag,
  Car,
  Utensils,
  Gamepad2,
  Heart,
  BookOpen,
  Wifi,
  Phone,
  Shirt,
  Gift,
  Layers,
  Activity,
  PieChart as PieChartIcon,
  BarChart2
} from 'lucide-react';
// Removed experimental visual components

// --- Main App Component ---
export default function App() {
    const [expenses, setExpenses] = useState([]);
    const [view, setView] = useState('dashboard');
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('all');
    const [showAddForm, setShowAddForm] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    // Load expenses from localStorage on component mount
    useEffect(() => {
        const savedExpenses = localStorage.getItem('expenses');
        if (savedExpenses) {
            setExpenses(JSON.parse(savedExpenses));
        }
    }, []);

    // Save expenses to localStorage whenever expenses change
    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = (newExpense) => {
        setExpenses(prevExpenses => [newExpense, ...prevExpenses]);
        setShowAddForm(false);
    };

    const updateExpense = (updatedExpense) => {
        setExpenses(prevExpenses => 
            prevExpenses.map(exp => 
                exp.id === updatedExpense.id ? updatedExpense : exp
            )
        );
        setEditingExpense(null);
    };

    const deleteExpense = (expenseId) => {
        setExpenses(prevExpenses => 
            prevExpenses.filter(exp => exp.id !== expenseId)
        );
    };

    // Filter expenses based on search and category
    const filteredExpenses = useMemo(() => {
        return expenses.filter(expense => {
            const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = filterCategory === 'all' || expense.category === filterCategory;
            return matchesSearch && matchesCategory;
        });
    }, [expenses, searchTerm, filterCategory]);

    // Get unique categories for filter
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(expenses.map(exp => exp.category))];
        return uniqueCategories.sort();
    }, [expenses]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
            {/* Floating Navigation */}
            <FloatingNav 
                view={view}
                setView={setView}
                onAddExpense={() => setShowAddForm(true)}
                onMenuClick={() => setSidebarOpen(true)}
            />

            {/* Main Content */}
            <div className="relative z-10">
                {/* Header */}
                <EtherHeader 
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    filterCategory={filterCategory}
                    setFilterCategory={setFilterCategory}
                    categories={categories}
                />

                {/* Main Content Area */}
                <main className="min-h-screen p-4 md:p-6 lg:p-8">
                    <div className="max-w-7xl mx-auto">
                        {/* Content based on view */}
                        {view === 'dashboard' ? (
                            <EtherDashboard expenses={filteredExpenses} />
                        ) : view === 'transactions' ? (
                            <EtherTransactionList 
                                expenses={filteredExpenses}
                                onEdit={setEditingExpense}
                                onDelete={deleteExpense}
                            />
                        ) : view === 'analytics' ? (
                            <EtherAnalytics expenses={filteredExpenses} />
                        ) : (
                            <EtherTransactionList 
                                expenses={filteredExpenses}
                                onEdit={setEditingExpense}
                                onDelete={deleteExpense}
                            />
                        )}
                    </div>
                </main>
            </div>

            {/* Add/Edit Expense Modal */}
            {(showAddForm || editingExpense) && (
                <EtherModal
                    expense={editingExpense}
                    onClose={() => {
                        setShowAddForm(false);
                        setEditingExpense(null);
                    }}
                    onSave={editingExpense ? updateExpense : addExpense}
                />
            )}
        </div>
    );
}

// --- Sub-components ---

function FloatingNav({ view, setView, onAddExpense, onMenuClick }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'transactions', label: 'Transactions', icon: List },
        { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    ];

    return (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="glass-card-strong rounded-2xl p-2 flex items-center space-x-2">
                {/* Logo */}
                <div className="flex items-center space-x-2 mr-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-bold text-white">ExpenseAI</span>
                </div>

                {/* Navigation Items */}
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setView(item.id)}
                            className={`p-2 rounded-lg transition-all duration-200 ${
                                view === item.id
                                    ? 'bg-white/20 text-white'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                            }`}
                            title={item.label}
                        >
                            <Icon className="w-4 h-4" />
                        </button>
                    );
                })}

                {/* Add Expense Button */}
                <button
                    onClick={onAddExpense}
                    className="ml-2 p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
                    title="Add Expense"
                >
                    <Plus className="w-4 h-4 text-white" />
                </button>
            </div>
        </div>
    );
}

function EtherHeader({ searchTerm, setSearchTerm, filterCategory, setFilterCategory, categories }) {
    return (
        <div className="pt-20 pb-8">
            <div className="max-w-4xl mx-auto">
                {/* Search and Filters */}
                <div className="glass-card-strong rounded-2xl p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        {/* Search */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                            <input
                                type="text"
                                placeholder="Search expenses..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="input-field pl-10"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/60" />
                            <select
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                className="input-field pl-10 pr-8 appearance-none cursor-pointer"
                            >
                                <option value="all">All Categories</option>
                                {categories.map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function EtherDashboard({ expenses }) {
    const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    const transactionCount = expenses.length;
    const averageExpense = transactionCount > 0 ? totalExpenses / transactionCount : 0;
    
    // Calculate monthly spending (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const monthlyExpenses = expenses
        .filter(exp => new Date(exp.date) >= thirtyDaysAgo)
        .reduce((sum, exp) => sum + exp.amount, 0);

    const statsData = [
        {
            color: '#060010',
            title: 'Total Spent',
            description: `₹${totalExpenses.toFixed(2)}`,
            label: 'Expenses',
            icon: DollarSign
        },
        {
            color: '#060010',
            title: 'Transactions',
            description: transactionCount.toString(),
            label: 'Count',
            icon: CreditCard
        },
        {
            color: '#060010',
            title: 'Average',
            description: `₹${averageExpense.toFixed(2)}`,
            label: 'Per Transaction',
            icon: Target
        },
        {
            color: '#060010',
            title: 'This Month',
            description: `₹${monthlyExpenses.toFixed(2)}`,
            label: 'Monthly',
            icon: Calendar
        }
    ];

    if (expenses.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <BarChart3 className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No expenses yet</h3>
                    <p className="text-white/60 mb-6">Start tracking your expenses to see beautiful insights!</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Stats Grid (simplified) */}
            <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                {statsData.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className="stat-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-white/60 text-sm">{stat.label}</p>
                                    <h3 className="text-xl font-bold text-white">{stat.title}</h3>
                                </div>
                                <div className="p-2 bg-white/10 rounded-lg">
                                    <Icon className="w-5 h-5 text-purple-300" />
                                </div>
                            </div>
                            <p className="mt-3 text-2xl font-semibold">{stat.description}</p>
                        </div>
                    );
                })}
            </div>

            {/* Charts Section */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pie Chart */}
                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Spending by Category</h3>
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <PieChartIcon className="w-5 h-5 text-purple-400" />
                            </div>
                        </div>
                        <CategoryPieChart expenses={expenses} />
                    </div>

                    {/* Recent Transactions */}
                    <div className="glass-card p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
                            <div className="p-2 bg-green-500/20 rounded-lg">
                                <Activity className="w-5 h-5 text-green-400" />
                            </div>
                        </div>
                        <RecentTransactions expenses={expenses.slice(0, 5)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
function CategoryPieChart({ expenses }) {
    const categoryData = useMemo(() => {
        const dataMap = expenses.reduce((acc, expense) => {
            const category = expense.category || "Other";
            acc[category] = (acc[category] || 0) + expense.amount;
            return acc;
        }, {});
        return Object.entries(dataMap).map(([name, value]) => ({ name, value }));
    }, [expenses]);
    
    const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f97316', '#ec4899', '#ef4444', '#06b6d4'];

    if (categoryData.length === 0) {
        return (
            <div className="text-center py-8">
                <p className="text-white/60">No data to display</p>
            </div>
        );
    }

    return (
        <ResponsiveContainer width="100%" height={250}>
            <PieChart>
                <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend wrapperStyle={{ color: 'white' }} />
            </PieChart>
        </ResponsiveContainer>
    );
}

function RecentTransactions({ expenses }) {
    return (
        <div className="space-y-3">
            {expenses.map(exp => (
                <div key={exp.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            {getCategoryIcon(exp.category)}
                        </div>
                        <div>
                            <p className="font-medium text-white text-sm">{exp.description}</p>
                            <p className="text-xs text-white/60">{exp.category} • {new Date(exp.date).toLocaleDateString()}</p>
                        </div>
                    </div>
                    <p className="font-bold text-red-400 text-sm">-₹{exp.amount.toFixed(2)}</p>
                </div>
            ))}
        </div>
    );
}

function EtherModal({ expense, onClose, onSave }) {
    const [description, setDescription] = useState(expense?.description || '');
    const [amount, setAmount] = useState(expense?.amount?.toString() || '');
    const [category, setCategory] = useState(expense?.category || '');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const getCategoryFromModel = async (expenseDescription) => {
        const apiUrl = process.env.NODE_ENV === 'production' 
            ? 'https://expense-classifier-api.onrender.com/predict'
            : 'http://127.0.0.1:5000/predict';
            
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ description: expenseDescription })
            });
            if (!response.ok) {
                throw new Error('API call failed. Is the Python server running?');
            }
            const data = await response.json();
            return data.category || "Uncategorized";
        } catch (err) {
            console.error("Model API error:", err);
            setError(err.message);
            return "Uncategorized";
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!description || !amount) {
            setError("Please fill in both description and amount.");
            return;
        }
        setIsSubmitting(true);
        setError('');

        let predictedCategory = category;
        if (!expense) { // Only predict category for new expenses
            predictedCategory = await getCategoryFromModel(description);
        }

        const expenseData = {
            id: expense?.id || new Date().getTime(),
            description,
            amount: parseFloat(amount),
            category: predictedCategory,
            date: expense?.date || new Date(),
        };

        onSave(expenseData);
        setIsSubmitting(false);
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-card-strong rounded-2xl p-6 w-full max-w-md animate-fade-in-scale">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold flex items-center">
                        <Sparkles className="mr-2 text-purple-400" />
                        {expense ? 'Edit Expense' : 'Add New Expense'}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-white/90 mb-2">
                            Description
                        </label>
                        <input
                            type="text"
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="e.g., Coffee with a friend"
                            className="input-field"
                        />
                    </div>
                    
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-white/90 mb-2">
                            Amount (INR)
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="e.g., 150"
                            className="input-field"
                        />
                    </div>

                    {expense && (
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-white/90 mb-2">
                                Category
                            </label>
                            <input
                                type="text"
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                placeholder="e.g., Food & Dining"
                                className="input-field"
                            />
                        </div>
                    )}

                    {error && (
                        <div className="text-red-400 text-sm bg-red-500/30 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div className="flex space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 btn-primary flex items-center justify-center space-x-2"
                        >
                            {isSubmitting ? (
                                <Loader2 className="animate-spin w-5 h-5" />
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    <span>{expense ? 'Update' : 'Add & Categorize'}</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function EtherTransactionList({ expenses, onEdit, onDelete }) {
    const downloadCSV = () => {
        if (!expenses || expenses.length === 0) {
            alert("No data to export.");
            return;
        }

        const headers = ["Date", "Description", "Category", "Amount"];
        const csvRows = [
            headers.join(','),
            ...expenses.map(exp => {
                const date = new Date(exp.date).toLocaleDateString();
                const description = `"${exp.description.replace(/"/g, '""')}"`;
                const category = exp.category;
                const amount = exp.amount;
                return [date, description, category, amount].join(',');
            })
        ];

        const csvString = csvRows.join('\n');
        const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', 'expenses_report.csv');
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    if (expenses.length === 0) {
        return (
            <div className="text-center py-20">
                <div className="glass-card rounded-2xl p-12 max-w-md mx-auto">
                    <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                        <List className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No transactions found</h3>
                    <p className="text-white/60 mb-6">Try adjusting your search or filters to find expenses.</p>
                </div>
            </div>
        );
    }
    
    return (
        <div className="glass-card p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">All Transactions</h3>
                <button onClick={downloadCSV} className="btn-secondary text-sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export CSV
                </button>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-white">
                    <thead className="text-xs text-white/80 uppercase bg-white/10 rounded-lg">
                        <tr>
                            <th scope="col" className="px-6 py-4">Date</th>
                            <th scope="col" className="px-6 py-4">Description</th>
                            <th scope="col" className="px-6 py-4">Category</th>
                            <th scope="col" className="px-6 py-4 text-right">Amount</th>
                            <th scope="col" className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map(exp => (
                            <tr key={exp.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-2">
                                        <Calendar className="w-4 h-4 text-white/60" />
                                        <span>{new Date(exp.date).toLocaleDateString()}</span>
                                    </div>
                                </td>
                                <th scope="row" className="px-6 py-4 font-medium">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                            {getCategoryIcon(exp.category)}
                                        </div>
                                        <span className="whitespace-nowrap">{exp.description}</span>
                                    </div>
                                </th>
                                <td className="px-6 py-4">
                                    <span className="category-badge bg-purple-500/20 text-purple-300 border-purple-500/30">
                                        {exp.category}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-right font-mono text-red-400 font-bold">
                                    -₹{exp.amount.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <div className="flex items-center justify-center space-x-2">
                                        <button
                                            onClick={() => onEdit(exp)}
                                            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => onDelete(exp.id)}
                                            className="p-2 rounded-lg hover:bg-red-500/20 transition-colors text-white/70 hover:text-red-400"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function EtherAnalytics({ expenses }) {
    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-4">Advanced Analytics</h2>
                <p className="text-white/70">Coming soon - Advanced expense analytics and insights</p>
            </div>
        </div>
    );
}

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card p-3 rounded-lg">
                <p className="text-white font-medium">{`${payload[0].name} : ₹${payload[0].value.toFixed(2)}`}</p>
            </div>
        );
    }
    return null;
};

// Helper function to get category icons
function getCategoryIcon(category) {
    const categoryLower = category?.toLowerCase() || '';
    
    if (categoryLower.includes('food') || categoryLower.includes('dining') || categoryLower.includes('restaurant')) {
        return <Utensils className="w-4 h-4" />;
    } else if (categoryLower.includes('transport') || categoryLower.includes('travel') || categoryLower.includes('gas')) {
        return <Car className="w-4 h-4" />;
    } else if (categoryLower.includes('shopping') || categoryLower.includes('retail')) {
        return <ShoppingBag className="w-4 h-4" />;
    } else if (categoryLower.includes('entertainment') || categoryLower.includes('gaming')) {
        return <Gamepad2 className="w-4 h-4" />;
    } else if (categoryLower.includes('health') || categoryLower.includes('medical')) {
        return <Heart className="w-4 h-4" />;
    } else if (categoryLower.includes('education') || categoryLower.includes('book')) {
        return <BookOpen className="w-4 h-4" />;
    } else if (categoryLower.includes('internet') || categoryLower.includes('wifi')) {
        return <Wifi className="w-4 h-4" />;
    } else if (categoryLower.includes('phone') || categoryLower.includes('mobile')) {
        return <Phone className="w-4 h-4" />;
    } else if (categoryLower.includes('clothing') || categoryLower.includes('fashion')) {
        return <Shirt className="w-4 h-4" />;
    } else if (categoryLower.includes('gift') || categoryLower.includes('present')) {
        return <Gift className="w-4 h-4" />;
    } else {
        return <CreditCard className="w-4 h-4" />;
    }
}

// (showcase fully removed)

