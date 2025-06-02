import supabase from './supabaseClient';

const TABLE_NAME = 'items';

export const fetchTransactions = async () => {
  const { data, error } = await supabase.from(TABLE_NAME).select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const addTransaction = async (transaction) => {
  const { data, error } = await supabase.from(TABLE_NAME).insert([transaction]).select();
  if (error) throw error;
  return data[0];
};

export const updateTransaction = async ({ id, ...fields }) => {
  const { data, error } = await supabase.from(TABLE_NAME).update(fields).eq('id', id).select();
  if (error) throw error;
  return data[0];
};

export const deleteTransaction = async (id) => {
  const { error } = await supabase.from(TABLE_NAME).delete().eq('id', id);
  if (error) throw error;
  return id;
};

//




// Fetch categories from “category_definitions” and format them for the frontend
export const fetchCategories = async () => {
  // Query category_name and transaction_type, ordered alphabetically
  const { data, error } = await supabase
    .from('category_definitions')
    .select('category_name, transaction_type')
    .order('category_name', { ascending: true });

  if (error) throw error;

  // Map each row into { value, label, type }
  return data.map((cat) => ({
    value: cat.category_name,
    label: cat.category_name,
    type: cat.transaction_type,
  }));
};

// Fetch summary data (income, expenses, balance) for the current month
export const fetchSummaryData = async () => {
  // Compute start of current month (UTC) and start of next month (UTC)
  const now = new Date();
  const firstDayOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const firstDayOfNextMonth = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)
  );

  // Query “items” for this month, joining to category_definitions to get transaction_type
  const { data, error } = await supabase
    .from('items')
    .select('amount, category_definitions(transaction_type)')
    .gte('created_at', firstDayOfMonth.toISOString())
    .lt('created_at', firstDayOfNextMonth.toISOString());

  if (error) throw error;

  // Sum up income and expense amounts
  let incomeTotal = 0;
  let expenseTotal = 0;

  data.forEach((item) => {
    const type = item.category_definitions.transaction_type;
    const amt = parseFloat(item.amount);

    if (type === 'income') {
      incomeTotal += amt;
    } else if (type === 'expense') {
      expenseTotal += amt;
    }
  });

  return {
    currentMonthIncome: incomeTotal,
    currentMonthExpenses: expenseTotal,
    currentBalance: incomeTotal - expenseTotal,
  };
};

